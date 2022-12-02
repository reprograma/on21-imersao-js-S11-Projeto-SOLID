import { registerMessage } from "./helpers";

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

