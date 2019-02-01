const games = require('./games');
const rankings = require('./rankings');

module.exports = (app) => {
	app.use('/api/games', games)
	app.use('/api/rankings', rankings)
}