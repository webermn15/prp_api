class Rankings {
	constructor(db) {
		this.db = db;
	}

	getRankingsForRegion(regionAlias, gameAlias) {
		return this.db.query(`SELECT rankings.ranking_id, games.game_name, regions.region_name, regions.region_alias, regions.level, regions.region_image, last_ranking, published, ranking_title, ranking_detail, rankings.ranking_image FROM rankings INNER JOIN games ON games.game_alias=rankings.ranking_game INNER JOIN regions ON regions.region_id=rankings.ranking_region WHERE region_alias = $1 AND ranking_game = $2 LIMIT 10`, [regionAlias, gameAlias])
	}

	getRecentUploads(gameAlias) {
		return this.db.query(`SELECT rankings.ranking_id, games.game_name, regions.region_name, regions.region_alias, regions.level, last_ranking, published, ranking_title, ranking_detail, rankings.ranking_image FROM rankings INNER JOIN games ON games.game_alias=rankings.ranking_game INNER JOIN regions ON regions.region_id=rankings.ranking_region WHERE ranking_game = $1 LIMIT 5`, [gameAlias])
	}

}

module.exports = Rankings;