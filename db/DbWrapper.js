require('dotenv').config();
const { Pool } = require('pg');

/* 
* should wrap logging into these methods to make it easier to trace errors *
*/

class DbWrapper {
	constructor() {
		this.pool = new Pool();
	}

	// add logging to these convenience wrappers
	query(sql, params = []) {
		return this.pool.query(sql, params)
	}

	transaction(cb) {
		return this.pool.connect((err, client, done) => {
			cb(err, client, done)
		})
	}

}

module.exports = DbWrapper;