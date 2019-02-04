const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

router.post('/recent', (req, res) => {
	console.log('/recent api endpoint has been hit');
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

module.exports = router;