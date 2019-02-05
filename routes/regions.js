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

module.exports = router;