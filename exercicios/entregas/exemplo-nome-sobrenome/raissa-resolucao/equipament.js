const { registerMessage } = require('./helpers');

class Equipment {
	name;
	type;

	constructor(name, type) {
		this.name = name;
		this.type = type;

		registerMessage(
			'equipment',
			`O equipment name ${this.name} ,type ${this.type} .`
		);

	}
}

module.exports = Equipment;