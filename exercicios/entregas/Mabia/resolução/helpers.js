function FormatDate() {
	const date = new Date();
	const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

	return formattedDate;
}

module.exports = { FormatDate };
