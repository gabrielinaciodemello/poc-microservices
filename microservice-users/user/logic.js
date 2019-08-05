const { InvalidOperationException } = require('../utils/exceptions');

const isValidEmail = (email = '') => {
	// eslint-disable-next-line no-useless-escape
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
};

const createUser = (
	name,
	email,
	$uuid = require('../utils/utils').uuid
) => {
	if (!/^.{1,50}$/.test(name))
		throw new InvalidOperationException('Invalid name');
	if (!isValidEmail(email))
		throw new InvalidOperationException('Invalid email');
	return {
		_id: $uuid(),
		email: email,
		name: name
	};
};

// eslint-disable-next-line immutable/no-mutation
module.exports = {createUser};
