require('dotenv').config();
const { Pool } = require('pg');

class DbWrapper {
	constructor() {
		this.pool = new Pool();
	}

	query(sql, params = []) {
		return this.pool.query(sql, params)
	}

}

module.exports = DbWrapper;