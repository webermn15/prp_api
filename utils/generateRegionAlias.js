module.exports = string => {
	return string.toLowerCase().replace(/\s+/g, '-');
}