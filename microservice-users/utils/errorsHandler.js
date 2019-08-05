const {
	InvalidOperationException,
	NotFoundException
} = require('./exceptions');

const errorsHandler = async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		if (err instanceof NotFoundException) {
			
			// eslint-disable-next-line immutable/no-mutation
			ctx.status = 404;
			// eslint-disable-next-line immutable/no-mutation
			ctx.body = { error: 'Not Found' };
			return;
		}

		if (err instanceof InvalidOperationException) {
			// eslint-disable-next-line immutable/no-mutation
			ctx.status = 400;
			// eslint-disable-next-line immutable/no-mutation
			ctx.body = { error: err.message };
			return;
		}

		// eslint-disable-next-line immutable/no-mutation
		ctx.status = 500;
		// eslint-disable-next-line immutable/no-mutation
		ctx.body = { error: 'Internal error' };
	}
};


// eslint-disable-next-line immutable/no-mutation
module.exports = errorsHandler;