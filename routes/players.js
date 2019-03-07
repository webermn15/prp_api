const Router = require('express-promise-router');
const router = new Router();

// formatting utilities
const combinePlayerMatchDuplicates = require('../utils/combinePlayerMatchDuplicates');

const db = require('../db');

router.post('/detail', (req, res) => {
	const { playerId } = req.body;
	db.playersDb.getPlayerRecordsById(playerId)
		.then(data => {
			const formattedRankings = data.rows.map(({player_id, player_tag, sponsor_prefix, ...newObj}) => newObj)
			res.send({
				player_tag: data.rows[0].player_tag,
				sponsor_prefix: data.rows[0].sponsor_prefix,
				rankings: formattedRankings
			});
		})
		.catch(err => console.log(err));
})

router.post('/match', (req, res) => {
	const { match } = req.body;
	db.playersDb.matchPlayersToString(match)
		.then(data => {
			const combined = combinePlayerMatchDuplicates(data.rows);
			console.log('combined results in player match endpoint: ', combined);
			res.send({
				matchedPlayers: combined
			});
		})
		.catch(err => console.log(err));
})

router.post('/game/match', (req, res) => {
	const { gameAlias, match } = req.body;
	db.playersDb.matchPlayersForGameToString(gameAlias, match)
		.then(data => {
			res.send({
				matchedPlayers: data.rows
			});
		})
		.catch(err => console.log(err));
})

module.exports = router;