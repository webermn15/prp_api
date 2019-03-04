class Games {
	constructor(db) {
		this.db = db;
	}

	getAllGames() {
		return this.db.query(`SELECT * FROM games`)
	}

	getCharactersForGame(gameAlias) {
		return this.db.query(`SELECT character_name AS label, game_characters_id AS value, character_image FROM game_characters WHERE character_game = $1`, [gameAlias])
	}

	getAllRegionsForGame(gameAlias) {
		return this.db.query(`SELECT DISTINCT ON (region_id) region_id, region_name, region_alias, level FROM rankings INNER JOIN regions ON ranking_region=region_id WHERE ranking_game = $1`, [gameAlias])
	}

}

module.exports = Games;