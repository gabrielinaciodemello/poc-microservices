const mongodb = require('mongodb');

// eslint-disable-next-line immutable/no-let
let conn;
const database = process.env.MONGO_DATABASE;

const connect = async () => {
	conn = await mongodb.MongoClient.connect(process.env.MONGO_URL);
};

const save = async (table, data) => {
	await conn
		.db(database)
		.collection(table)
		.replaceOne({ _id: data._id }, data, { upsert: true });
	return data;
};

const find = async (table, filter) => 
	await conn.db(database).collection(table).find(filter).toArray();



// eslint-disable-next-line immutable/no-mutation
module.exports = {connect, find, save};