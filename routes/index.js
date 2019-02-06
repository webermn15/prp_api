const games = require('./games');
const rankings = require('./rankings');
const regions = require('./regions');
const players = require('./players');

module.exports = (app) => {
	app.use('/api/games', games)
	app.use('/api/rankings', rankings)
	app.use('/api/regions', regions)
	app.use('/api/players', players)
}