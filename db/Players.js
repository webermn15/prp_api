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

}

module.exports = Players;