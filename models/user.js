const db = require('../db');

async function getUser(email) {
	return await db
		.collection('users')
		.get(email)
		.then(user => user.data())
		.catch(err => err);
}

module.exports = {
	getUser
};
