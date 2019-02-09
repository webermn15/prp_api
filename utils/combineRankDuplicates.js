module.exports = formattedRankArray => {
	return formattedRankArray.reduce((acc, curr) => {
	  const exists = acc.findIndex(record => record.player === curr.player);
	  if (exists >= 0) {
	  	if (!curr.characters[0].main) {
	  		acc[exists].characters.push(curr.characters[0]);
	  	}
	  	else {
		  	acc[exists].characters.unshift(curr.characters[0]);
		  }
	  }
	  else {
	  	acc.push(curr);
	  }
	  return acc;
	}, []);
}