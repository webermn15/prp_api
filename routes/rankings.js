const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

router.post('/recent', (req, res) => {
	const { gameAlias } = req.body;
	db.rankingsDb.getRecentUploads(gameAlias)
		.then(data => {
			res.send({
				recentlyUploaded: data.rows,
				lastUpdated: new Date()
			});
		})
		.catch(err => console.log(err));
})

router.post('/region', (req, res) => {
	console.log('/api/rankings/region endpoint: ', req.body);
	const { regionAlias, gameAlias } = req.body;
	db.rankingsDb.getRankingsForRegion(regionAlias, gameAlias)
		.then(data => {
			console.log('returned data from /api/rankings/region endpoint: ', data);
			const formattedRankings = data.rows.map(({region_name, region_alias, level, region_image, ...newObj}) => newObj)
			res.send({
				region_name: data.rows[0].region_name,
				region_alias: data.rows[0].region_alias,
				level: data.rows[0].level,
				region_image: data.rows[0].region_image,
				recentRankings: formattedRankings
			});
		})
		.catch(err => console.log(err));
})

module.exports = router;