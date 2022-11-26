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

		console.log(`Um sobrevivente de nome ${name} foi criado`);
		register.survivors.push(`Um sobrevivente de nome ${name} foi criado`);
	}
}

// const sobrevivente = new Survivor('Luara');
console.log(sobrevivente);
