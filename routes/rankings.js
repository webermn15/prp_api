const Router = require('express-promise-router');
const router = new Router();

// formatting utilities
const formatRanks = require('../utils/formatRanks');
const combineRankDuplicates = require('../utils/combineRankDuplicates');

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
	const { regionAlias, gameAlias } = req.body;
	db.rankingsDb.getRankingsForRegion(regionAlias, gameAlias)
		.then(data => {
			const formattedRankings = data.rows.map(({region_name, region_alias, level, region_image, ...newObj}) => newObj);
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

router.post('/detail', (req, res) => {
	const { rankingId} = req.body;
	db.rankingsDb.getRankingById(rankingId)
		.then(data => {
			const formattedRankings = formatRanks(data.rows);
			const combinedDuplicates = combineRankDuplicates(formattedRankings)
			res.send({
				title: data.rows[0].ranking_title,
				ranks: combinedDuplicates
			});
		})
		.catch(err => console.log('error in getRankingById: ', err));
})

module.exports = router;