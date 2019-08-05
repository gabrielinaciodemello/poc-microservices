const uuidv4 = require('uuid/v4');

const uuid = () => {
	return uuidv4();
};


// eslint-disable-next-line immutable/no-mutation
module.exports = { uuid };

