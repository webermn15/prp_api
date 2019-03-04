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

	matchRegionsToString(match) {
		return this.db.query(`SELECT DISTINCT ON (region_id) region_id AS value, region_name AS label, region_alias FROM regions WHERE LOWER(region_name) LIKE $1`, [`%${match}%`])
	}

	getRegionDataForGame(gameAlias) {
		return this.db.query(`SELECT DISTINCT ON (region_id) region_id AS value, region_name AS label, region_alias FROM regions INNER JOIN rankings ON rankings.ranking_region=region_id WHERE rankings.ranking_game = $1`, [gameAlias])
	}

	getAllGamesForRegion(regionId) {
		return this.db.query(`SELECT DISTINCT ON (game_id) game_id, game_name, game_alias, ranking_id FROM rankings INNER JOIN games ON  games.game_alias=rankings.ranking_game WHERE rankings.ranking_region = $1`, [regionId])
	}
}

module.exports = Regions;