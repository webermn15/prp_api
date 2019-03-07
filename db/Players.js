class Players {
	constructor(db) {
		this.db = db;
	}

	getAllPlayers() {
		return this.db.query(`SELECT * FROM players`)
	}

	getPlayerRecordsById(playerId) {
		return this.db.query(`SELECT players.player_id, players.player_tag, players.sponsor_prefix, rank, rankings.ranking_id, rankings.ranking_game, rankings.ranking_title, regions.region_name, regions.region_alias FROM player_rankings INNER JOIN players ON players.player_id=player_rankings.player INNER JOIN rankings ON rankings.ranking_id=player_rankings.ranking INNER JOIN regions ON regions.region_id=rankings.ranking_region WHERE player = $1`, [playerId])
	}

	matchPlayersToString(match) {
		return this.db.query(`SELECT DISTINCT ON (player_id, ranking_region) player_id AS value, player_tag AS label, sponsor_prefix, ranking_game, region_name AS regions FROM players INNER JOIN player_rankings ON player_rankings.player=player_id INNER JOIN rankings ON rankings.ranking_id=player_rankings.ranking INNER JOIN regions ON regions.region_id=rankings.ranking_region WHERE LOWER(player_tag) LIKE $1`, [`%${match}%`])
	}

	matchPlayersForGameToString(gameAlias, match) {
		return this.db.query(`SELECT DISTINCT ON (player_id) player_id AS value, player_tag AS label, sponsor_prefix FROM players INNER JOIN player_rankings ON player_rankings.player=player_id INNER JOIN rankings ON rankings.ranking_id=player_rankings.ranking WHERE rankings.ranking_game = $1 AND LOWER(player_tag) LIKE $2`, [gameAlias, `%${match}%`])
	}

}

module.exports = Players;