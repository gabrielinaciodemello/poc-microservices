require('./config.env');

const dbconnect = require('./utils/database').connect;
const sbconnect = require('./utils/servicebus').connect;

const bodyParser = require('koa-bodyparser');
const errorsHandler = require('./utils/errorsHandler');
const koa = require('koa');
const routes = require('./routes');

const start = async () => {
	await dbconnect();
	await sbconnect();
	const server = new koa();
	server.listen(process.env.PORT || 3000);
	server.use(bodyParser());
	server.use(errorsHandler);
	routes(server);
};

start();
