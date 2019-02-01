const DbWrapper = require('./DbWrapper');
const Users = require('./Users');
const Games = require('./Games');

const db = new DbWrapper();
const userDb = new Users(db);
const gamesDb = new Games(db);

module.exports = {
	userDb,
	gamesDb
}