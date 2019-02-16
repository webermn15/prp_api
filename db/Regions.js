class Regions {
	constructor(db) {
		this.db = db;
	}

	getAllRegions() {
		return this.db.query(`SELECT * FROM regions`)
	}

	getRegionData(regionAlias) {
		return this.db.query(`SELECT * FROM regions WHERE region_alias = $1`, [regionAlias])
	}

	getRegionDataForGame(gameAlias) {
		return this.db.query(`SELECT DISTINCT ON (region_id) region_id AS value, region_name AS label, region_alias FROM regions INNER JOIN rankings ON rankings.ranking_region=region_id WHERE rankings.ranking_game = $1`, [gameAlias])
	}
}

module.exports = Regions;