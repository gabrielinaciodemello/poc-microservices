const { createUser } = require('../../user/logic');
const { InvalidOperationException } = require('../../utils/exceptions');

describe('createUser', () => {
	it('Should throw a InvalidOperationException when param name is invalid', () => {
		expect(() => createUser('', 'teste@gmail.com')).toThrowError(
			InvalidOperationException
		);
	});

	it('Should throw a InvalidOperationException when param email is invalid', () => {
		expect(() => createUser('teste user', 'teste.gmail.com')).toThrowError(
			InvalidOperationException
		);
	});

	it('Should return new user', () => {
		const mockuuid = () => 'aa30289e-97aa-4d1b-aea5-b3854ac48aeb';

		expect(createUser('teste user', 'teste@gmail.com', mockuuid)).toEqual({
			_id: 'aa30289e-97aa-4d1b-aea5-b3854ac48aeb',
			email: 'teste@gmail.com',
			name: 'teste user'
		});
	});
});
