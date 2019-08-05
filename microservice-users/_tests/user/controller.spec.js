const { createUser } = require('../../user/controller');

describe('createUser', () => {
	it('Shoud send user to save in database', async () => {
		const mockCreateUser = (name, email) => ({
			_id: 'aa30289e-97aa-4d1b-aea5-b3854ac48aeb',
			name,
			email
		});

		let tableCheck;
		let dataCheck;
		const mockdbsave = async (table, data) => {
			tableCheck = table;
			dataCheck = data;
		};

		let eventCheck;
		let payloadCheck;
		const mockEventPublish = async (event, payload) => {
			eventCheck = event;
			payloadCheck = payload;
		};

		const expectedReturn = {
			_id: 'aa30289e-97aa-4d1b-aea5-b3854ac48aeb',
			name: 'teste user',
			email: 'teste@gmail.com'
		};

		expect(
			await createUser(
				expectedReturn.name,
				expectedReturn.email,
				mockCreateUser,
				mockdbsave,
				mockEventPublish
			)
		).toEqual(expectedReturn);

		expect(tableCheck).toEqual('users');
		expect(dataCheck).toEqual(expectedReturn);

		expect(eventCheck).toEqual('microservices-user.user_created');
		expect(payloadCheck).toEqual(expectedReturn);
	});
});
