import { register } from './classRegister.js';

export function formatDate() {
	const date = new Date();
	const formatedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;

	return formatedDate;
}

export function registerMessage(key, message) {
	const date = formatDate();

	register[key].push(`${date}: ${message}`);
}

