import { registerMessage } from "./helpers.js";

export class Equipment {
	name;
	type;

	constructor(name, type) {
		this.name = name;
		this.type = type;

		registerMessage(
			'equipment',
			`Nome ${this.name}, tipo ${this.type}}`
		)
	}
}

