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

}

module.exports = Games;