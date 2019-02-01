class Rankings {
	constructor(db) {
		this.db = db;
	}

	getRankingsForRegion(gameId, regionId) {
		return this.db.query(`SELECT * FROM rankings WHERE game = $1 AND region = $2`, [gameId, regionId])
	}

}

module.exports = Rankings;