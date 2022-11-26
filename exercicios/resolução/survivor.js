const GameCharacter = require('./character');
const register = require('./register');

class Survivor extends GameCharacter {
	name;
	level = 'Azul';

	constructor(name) {
		super();
		this.name = name;

		this.MAX_OF_HURTS = 3;
		this.TOTAL_OF_ACTIONS = 3;

		this.date = new Date();
		register.survivors.push(
			`${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}:${this.date.getMilliseconds()}: Um sobrevivente de nome ${name} foi criado`
		);
	}
}

new Survivor('Luara');
new Survivor('Maria');
new Survivor('Josefa');
console.log(register);
// console.log(sobrevivente);
