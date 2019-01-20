class Users {
	constructor(db) {
		this.db = db;
	}

	getOneUserById(id) {
		return this.db.query(`SELECT * FROM users WHERE id = $1`, [id])
	}

}

module.exports = Users;