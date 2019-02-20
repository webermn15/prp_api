module.exports = string => {
	return string.replace(/\s+/g, '-').toLowerCase();
}