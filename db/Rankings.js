class Rankings {
	constructor(db) {
		this.db = db;
	}

	getRankingsForRegion(gameAlias, regionId) {
		return this.db.query(`SELECT rankings.ranking_id, games.game_name, regions.region_name, regions.level, last_ranking, published, ranking_detail, rankings.ranking_image FROM rankings INNER JOIN games ON games.alias=rankings.ranking_game INNER JOIN regions ON regions.region_id=rankings.ranking_region WHERE ranking_game = $1 AND ranking_region = $2`, [gameAlias, regionId])
	}

	getRecentUploads(gameAlias) {
		return this.db.query(`SELECT rankings.ranking_id, games.game_name, regions.region_name, regions.level, last_ranking, published, ranking_detail, rankings.ranking_image FROM rankings INNER JOIN games ON games.alias=rankings.ranking_game INNER JOIN regions ON regions.region_id=rankings.ranking_region WHERE ranking_game = $1 LIMIT 5`, [gameAlias])
	}

}

module.exports = Rankings;