class Games {
	constructor(db) {
		this.db = db;
	}

	getAllGames() {
		return this.db.query(`SELECT * FROM games`)
	}

}

module.exports = Games;