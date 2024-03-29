const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

router.get('/all', (req, res) => {
	db.gamesDb.getAllGames()
		.then(data => {
			// const names = data.rows.map((row) => row.name)
			res.send({'games': data.rows})
		})
		.catch(err => console.log(err));
})

router.post('/characters', (req, res) => {
	const { gameAlias } = req.body;
	db.gamesDb.getCharactersForGame(gameAlias)
		.then(data => {
			res.send({
				characters: data.rows
			});
		})
		.catch(err => console.log(err));
})

router.get('/testroute', (req, res) => {
	const gameAlias = 'ssbm';
	db.gamesDb.getAllRegionsForGame(gameAlias)
		.then(data => {
			res.send({regions: data.rows})
		})
		.catch(err => {
			console.log(err);
			res.send({error: 'help'})
		})
})

module.exports = router;