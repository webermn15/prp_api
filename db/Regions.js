class Regions {
	constructor(db) {
		this.db = db;
	}

	getAllRegions() {
		return this.db.query(`SELECT * FROM regions`)
	}

	getRegionData(regionAlias) {
		return this.db.query(`SELECT * FROM regions WHERE region_alias = $1`, [regionAlias])
	}

}

module.exports = Regions;