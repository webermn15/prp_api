module.exports = matchedPlayerArray => {
	return matchedPlayerArray.reduce((acc, curr) => {
		const exists = acc.findIndex(record => record.label === curr.label);
		if (exists >= 0) {
			acc[exists].regions.push(curr.regions);
		}
		else {
			const withRegionsArray = Object.assign({}, curr, {
				...curr,
				regions: [curr.regions]
			})
			acc.push(withRegionsArray);
		}
		return acc;
	}, [])
}