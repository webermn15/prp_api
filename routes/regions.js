const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

router.post('/', (req, res) => {
	const { regionAlias } = req.body;
	db.regionsDb.getRegionData(regionAlias)
		.then(data => {
			res.send({
				...data.rows[0]
			})
		})
		.catch(err => console.log(err));
})

router.post('/match', (req, res) => {
	const { match } = req.body;
	console.log('match from req.body: ', match);
	db.regionsDb.matchRegionsToString(match)
		.then(data => {
			console.log('data returned from region matcher: ', data);
			res.send({
				regions: data.rows
			})
		})
		.catch(err => console.log(err));
})

router.post('/game', (req, res) => {
	const { gameAlias } = req.body;
	db.regionsDb.getRegionDataForGame(gameAlias)
		.then(data => {
			res.send({
				regions: data.rows
			})
		})
		.catch(err => console.log(err));
})

router.get('/testroute', (req, res) => {
	const regionId = 1;
	db.regionsDb.getAllGamesForRegion(regionId)
		.then(data => {
			res.send({games: data.rows})
		})
		.catch(err => {
			console.log(err);
			res.send({error: 'uh-oh'})
		})
})

module.exports = router;