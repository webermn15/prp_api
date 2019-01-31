class Users {
	constructor(db) {
		this.db = db;
	}

	getOneUserByUsername(username) {
		return this.db.query(`SELECT * FROM users WHERE username = $1`, [username])
	}

	createNewUser(username, password) {
		return this.db.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [username, password])
	}

}

module.exports = Users;