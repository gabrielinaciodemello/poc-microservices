const database = require('./database');
const retry = require('servicebus-retry');
const servicebus = require('servicebus');
const uuid = require('uuid/v4');

// eslint-disable-next-line immutable/no-let
let bus;
const connect = async () => {
	bus = servicebus.bus({ url: process.env.RABBIT_URL });
	bus.use({
		handleIncoming: async (queueName, message, options, next) => {
			const payload = { ...message.content };
			if(payload.handle) delete payload.handle;
			const dbevent = {
				_id: uuid(),
				event: message.fields.routingKey,
				payload,
				processed: false,
				when: new Date()
			};
			await database.save('events_received', dbevent);
			if(message.content.handle) message.content.handle.ack();
			const newcontent = {...payload, ...{ confirmProcess: async () => { 
				await database.save('events_received', { ...dbevent, ...{ processed: true } });
			}}};
			const newmsg = {...message, ...{ content: newcontent } };
			next(null, queueName, newmsg, options);
		},
		handleOutgoing: async (queueName, message, options, next)=>{
			await database.save('events_sent', {
				_id: uuid(),
				event: queueName,
				payload: message,
				when: new Date()
			});
			next(null, queueName, message, options);
		}
	});
	bus.use(
		retry({
			store: new retry.MemoryStore()
		})
	);
};

// eslint-disable-next-line immutable/no-let
let reprocessActions = {};
const subscribe = (event, action) => {
	if(reprocessActions[event]) throw new Error('Only one subscription is available per event');
	// eslint-disable-next-line immutable/no-mutation
	reprocessActions[event] = action.bind({});
	bus.subscribe(event, { ack: true }, action);
};

const publish = async (event, payload) => bus.publish(event, payload);

const reprocess = async () => {
	const events = await database.find('events_received',{processed: false});
	// eslint-disable-next-line immutable/no-let
	for(let i = 0; i<events.length; i++){
		const evt = events[i];
		const payload = {...evt.payload, ...{ confirmProcess: async () => { 
			await database.save('events_received', { ...evt, ...{ processed: true } });
		}}};
		await reprocessActions[evt.event](payload);
	}
};

// eslint-disable-next-line immutable/no-mutation
module.exports = {connect, publish, reprocess, subscribe};