/* eslint-disable immutable/no-mutation */
process.env.RABBIT_URL = process.env.RABBIT_URL || 'amqp://localhost:5672';
process.env.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
process.env.MONGO_DATABASE = process.env.MONGO_DATABASE || 'MICROSERVICES-USERS';
process.env.PORT = process.env.PORT || 3000;