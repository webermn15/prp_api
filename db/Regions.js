class Regions {
	constructor(db) {
		this.db = db;
	}

	getAllRegions() {
		return this.db.query(`SELECT * FROM regions`)
	}

}

module.exports = Regions;