const generateAlias = require('../utils/generateRegionAlias');

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
		return this.db.query(`SELECT players.player_tag, players.sponsor_prefix, player, rank, previous_rank, ranking, game_characters.character_name, game_characters.character_image, rankings.ranking_title, player_ranking_characters.main FROM player_rankings INNER JOIN rankings ON rankings.ranking_id=player_rankings.ranking INNER JOIN players ON players.player_id=player_rankings.player INNER JOIN player_ranking_characters ON player_ranking_characters.player_ranking=player_rankings.player_ranking_id INNER JOIN game_characters ON game_characters.game_characters_id=player_ranking_characters.character_played WHERE ranking = $1 ORDER BY rank ASC`, [rankingId])
	}

	insertNewRanking(game, region, date, title, detail, ranks) {
		return new Promise((resolve, reject) => {
			return this.db.transaction((err, client, done) => {

				const shouldAbort = err => {
					if (err) {
						console.log('transaction error: ', err.stack)
						client.query('ROLLBACK', err => {
							if (err) {
								console.log('error rolling back client: ', err.stack)
							}
							done()
							reject(`error: ${err}`)
						})
					}
					return !!err
				}

				client.query('BEGIN', err => {

					if (shouldAbort(err)) {
						return;
					}

					let regionId = region.value;
					const regionAlias = generateAlias(region.label);

					if (region.hasOwnProperty('__isNew__')) {

						client.query(`INSERT INTO regions (region_name, region_alias, level) VALUES ($1, $2, $3) RETURNING region_id`, [region.label, regionAlias, region.level], (errorr, resultt) => {

							if (shouldAbort(errorr)) {
								return;
							}

							regionId = resultt.rows[0].region_id;

							client.query(`INSERT INTO rankings (ranking_region, ranking_game, published, ranking_title, ranking_detail) VALUES ($1, $2, $3, $4, $5) RETURNING ranking_id`, [regionId, game.value, date, title, detail], (e, r) => {

								if (shouldAbort(e)) {
									return;
								}

								const rankingId = r.rows[0].ranking_id;

								for (let i = 0; i < ranks.length; i++) {

									let playerId = ranks[i].player_tag.value;
									const rank = i + 1;

									if (ranks[i].player_tag.hasOwnProperty('__isNew__')) {

										client.query(`INSERT INTO players (player_tag) VALUES ($1) RETURNING player_id`, [ranks[i].player_tag.label], (er, re) => {

											if (shouldAbort(er)) {
												return;
											}

											playerId = re.rows[0].player_id;

											client.query(`INSERT INTO player_rankings (player, ranking, rank) VALUES ($1, $2, $3) RETURNING player_ranking_id`, [playerId, rankingId, rank], (err, res) => {

												if (shouldAbort(err)) {
													return;
												}

												const playerRankingId = res.rows[0].player_ranking_id;

												for (let character of ranks[i].played_characters) {

													const characterId = character.value;

													client.query(`INSERT INTO player_ranking_characters (player_ranking, player_ranking_game, character_played) VALUES ($1, $2, $3)`, [playerRankingId, game.value, characterId], (erro, resu) => {

														if (shouldAbort(erro)) {
															return;
														}

													})

												}

											})

										})

									} else {

										client.query(`INSERT INTO player_rankings (player, ranking, rank) VALUES ($1, $2, $3) RETURNING player_ranking_id`, [playerId, rankingId, rank], (err, res) => {

											if (shouldAbort(err)) {
												return;
											}

											const playerRankingId = res.rows[0].player_ranking_id;

											for (let character of ranks[i].played_characters) {

												const characterId = character.value;

												client.query(`INSERT INTO player_ranking_characters (player_ranking, player_ranking_game, character_played) VALUES ($1, $2, $3)`, [playerRankingId, game.value, characterId], (erro, resu) => {

													if (shouldAbort(erro)) {
														return;
													}

												})

											}

										})

									}

								}

								client.query('COMMIT', error => {

									if (error) {
										console.log('error committing transaction: ', error.stack);
										return;
									}

									done();

								})

							})

						})

					} else {

						client.query(`INSERT INTO rankings (ranking_region, ranking_game, published, ranking_title, ranking_detail) VALUES ($1, $2, $3, $4, $5) RETURNING ranking_id`, [regionId, game.value, date, title, detail], (e, r) => {

							if (shouldAbort(e)) {
								return;
							}

							const rankingId = r.rows[0].ranking_id;

							for (let i = 0; i < ranks.length; i++) {

								let playerId = ranks[i].player_tag.value;
								const rank = i + 1;

								if (ranks[i].player_tag.hasOwnProperty('__isNew__')) {

									client.query(`INSERT INTO players (player_tag) VALUES ($1) RETURNING player_id`, [ranks[i].player_tag.label], (er, re) => {

										if (shouldAbort(er)) {
											return;
										}

										playerId = re.rows[0].player_id;

										client.query(`INSERT INTO player_rankings (player, ranking, rank) VALUES ($1, $2, $3) RETURNING player_ranking_id`, [playerId, rankingId, rank], (err, res) => {

											if (shouldAbort(err)) {
												return;
											}

											const playerRankingId = res.rows[0].player_ranking_id;

											for (let character of ranks[i].played_characters) {

												const characterId = character.value;

												client.query(`INSERT INTO player_ranking_characters (player_ranking, player_ranking_game, character_played) VALUES ($1, $2, $3)`, [playerRankingId, game.value, characterId], (erro, resu) => {

													if (shouldAbort(erro)) {
														return;
													}

												})

											}

										})

									})

								} else {

									client.query(`INSERT INTO player_rankings (player, ranking, rank) VALUES ($1, $2, $3) RETURNING player_ranking_id`, [playerId, rankingId, rank], (err, res) => {

										if (shouldAbort(err)) {
											return;
										}

										const playerRankingId = res.rows[0].player_ranking_id;

										for (let character of ranks[i].played_characters) {

											const characterId = character.value;

											client.query(`INSERT INTO player_ranking_characters (player_ranking, player_ranking_game, character_played) VALUES ($1, $2, $3)`, [playerRankingId, game.value, characterId], (erro, resu) => {

												if (shouldAbort(erro)) {
													return;
												}

											})

										}

									})

								}

							}

							client.query('COMMIT', error => {

								if (error) {
									console.log('error committing transaction: ', error.stack);
									return;
								}

								done();
								resolve(`success`)

							})

						})

					}

				})

			})

		})

	}

}

module.exports = Rankings;