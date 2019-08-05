const createUser = async (
	name,
	email,
	$createUser = require('./logic').createUser,
	$save = require('../utils/database').save,
	$publish = require('../utils/servicebus').publish
) => {
	const usr = $createUser(name, email);
	await $save('users', usr);
	await $publish('microservices-user.user_created', usr);
	return usr;
};


// eslint-disable-next-line immutable/no-mutation
module.exports = { createUser };
