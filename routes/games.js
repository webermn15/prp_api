const Router = require('express-promise-router');
const router = new Router();

const db = require('../db');

router.get('/all', (req, res) => {
	console.log('get all games', req.body);
	res.send({'games': 'ssbm'});
})

module.exports = router;