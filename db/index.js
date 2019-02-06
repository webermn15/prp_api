const DbWrapper = require('./DbWrapper');
const Users = require('./Users');
const Games = require('./Games');
const Rankings = require('./Rankings');
const Regions = require('./Regions');
const Players = require('./Players');

const db = new DbWrapper();
const userDb = new Users(db);
const gamesDb = new Games(db);
const rankingsDb = new Rankings(db);
const regionsDb = new Regions(db);
const playersDb = new Players(db);

module.exports = {
	userDb,
	gamesDb,
	rankingsDb,
	regionsDb,
	playersDb
}