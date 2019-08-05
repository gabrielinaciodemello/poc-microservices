require('./config.env');

const dbconnect = require('./utils/database').connect;
const sbconnect = require('./utils/servicebus').connect;
const sbreprocess = require('./utils/servicebus').reprocess;
const sbsubscribe = require('./utils/servicebus').subscribe;

const { save } = require('./utils/database');

const start = async () => {
	await dbconnect();
	await sbconnect();

	sbsubscribe('microservices-user.user_created', async msg => {
		console.log('Vai cavalo', msg);
		await save('users', { _id: msg._id });
		await msg.confirmProcess();
	});

	await sbreprocess();
};

start();
