const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

router.post('/region/all', (req, res) => {
	console.log(req.body)
	const { gameId } = req.body;
	db.rankingsDb.getRankingsForRegion(gameId, 1)
		.then(data => {
			console.log('data from rankingsDb query: ', data)
			res.send({'ranks': data.rows})
		})
		.catch(err => console.log(err));
	// res.send({'some': 'data'})
})

module.exports = router;