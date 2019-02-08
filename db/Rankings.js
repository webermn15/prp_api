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

	getRankingById(rankingId) {
		return this.db.query(`SELECT players.player_tag, players.sponsor_prefix, player, rank, previous_rank, ranking, game_characters.character_name, game_characters.character_image, rankings.ranking_title FROM player_rankings INNER JOIN rankings ON rankings.ranking_id=player_rankings.ranking INNER JOIN players ON players.player_id=player_rankings.player INNER JOIN player_ranking_characters ON player_ranking_characters.player_ranking=player_rankings.player_ranking_id INNER JOIN game_characters ON game_characters.game_characters_id=player_ranking_characters.character_played WHERE ranking = $1 ORDER BY rank ASC`, [rankingId])
	}

}

module.exports = Rankings;