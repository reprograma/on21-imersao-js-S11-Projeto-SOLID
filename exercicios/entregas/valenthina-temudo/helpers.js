const register = require('./register');

function FormatDate() {
  const date = new Date();
  const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

  return formattedDate;
}

function registerMessage(key, message) {
  const date = FormatDate();

  register[key].push(`${date}: ${message}`);
}

module.exports = { FormatDate, registerMessage };
