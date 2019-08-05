const _ = require('koa-route');

const { createUser } = require('./user/controller');

const routes = server => {
	server.use(_.get('/health_check', ctx => {
		// eslint-disable-next-line immutable/no-mutation
		ctx.body = 'OK';
	}));

	server.use(
		_.post('/users', async ctx => {
			const rbody = ctx.request.body; 
			// eslint-disable-next-line
			ctx.body = await createUser(rbody.name, rbody.email);
		})
	);
}; 


// eslint-disable-next-line immutable/no-mutation
module.exports = routes;
