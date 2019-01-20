const DbWrapper = require('./DbWrapper');
const Users = require('./Users');

const db = new DbWrapper();
const userDb = new Users(db);

module.exports = {
	userDb
}