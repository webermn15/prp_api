module.exports = formattedRankArray => {
	return formattedRankArray.reduce((acc, curr) => {
	  const exists = acc.findIndex(record => record.player === curr.player);
	  if (exists >= 0) {
	  	acc[exists].characters.push(curr.characters[0]);
	  }
	  else {
	  	acc.push(curr);
	  }
	  return acc;
	}, []);
}