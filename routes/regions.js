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

module.exports = router;