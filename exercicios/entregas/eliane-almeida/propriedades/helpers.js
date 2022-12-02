import { register } from './classRegister.js';

export function formatDate() {
	const date = new Date();
	const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

	return formattedDate;
}

export function registerMessage(key, message) {
	const date = formatDate();

	register[key].push(`${date}: ${message}`);
}

