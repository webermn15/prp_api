const games = require('./games');

module.exports = (app) => {
	app.use('/api/games', games)
}