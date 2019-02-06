const Router = require('express-promise-router');
const router = new Router();

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

module.exports = router;