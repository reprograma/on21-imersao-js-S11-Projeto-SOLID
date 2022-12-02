const register = require("./register");

function formatDate() {
  const date = new Date();
  const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
  return formattedDate;
}

function registerMessage(key, message) {
  const date = formatDate();

  register[key].push(`${date}: ${message}`);
}

module.exports = { formatDate, registerMessage };
