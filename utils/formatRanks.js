module.exports = rankArray => {
		return rankArray.map(({character_name, character_image, ...newRecord}) => {
			return Object.assign({}, newRecord, {
				...newRecord,
				characters: [{
					name: character_name,
					image: character_image
				}]
			})
		});
}