class Players {
	constructor(db) {
		this.db = db;
	}

	getAllPlayers() {
		return this.db.query(`SELECT * FROM players`)
	}

}

module.exports = Players;