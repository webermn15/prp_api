const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

router.get('/all', (req, res) => {
	db.gamesDb.getAllGames()
		.then(data => {
			const names = data.rows.map((row) => row.name)
			res.send({'games': names})
		})
		.catch(err => console.log(err));
	// res.send({'games': ['ssbm', 'ultimate']});
})

module.exports = router;