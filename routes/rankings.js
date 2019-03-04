const Router = require('express-promise-router');
const router = new Router();

// formatting utilities
const formatRanks = require('../utils/formatRanks');
const combineRankDuplicates = require('../utils/combineRankDuplicates');
const formatDate = require('../utils/formatDate');

const db = require('../db');

router.post('/recent', (req, res) => {
	const { gameAlias } = req.body;
	db.rankingsDb.getRecentUploads(gameAlias)
		.then(data => {
			res.send({
				gameName: data.rows[0].game_name,
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
	const { rankingId } = req.body;
	db.rankingsDb.getRankingById(rankingId)
		.then(data => {
			const formattedRankings = formatRanks(data.rows);
			const combinedDuplicates = combineRankDuplicates(formattedRankings)
			res.send({
				title: data.rows[0].ranking_title,
				detail: data.rows[0].ranking_detail,
				ranks: combinedDuplicates
			});
		})
		.catch(err => console.log('error in getRankingById: ', err));
})

router.post('/new', (req, res) => {
	const { game, region, date, title, detail, ranks } = req.body;
	const formattedDate = formatDate(date);
	
	console.log('hitting rankings new endpoint');
	db.rankingsDb.insertNewRanking(game, region, formattedDate, title, detail, ranks)
		.then(result => {
			res.status(201).send('Ranking Created');
		})
		.catch(error => {
			console.log(error);
			res.status(500).send('Error creating ranking');
		})
})

module.exports = router;