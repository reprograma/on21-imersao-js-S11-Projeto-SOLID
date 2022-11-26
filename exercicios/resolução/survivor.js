const { FormatDate } = require('./helpers');
const register = require('./register');
const GameCharacter = require('./character');
const Level = require('./levels');

class Survivor extends GameCharacter {
	name;
	points = 0;
	level = Level.Azul;

	constructor(name) {
		super();
		this.name = name;

		this.MAX_OF_HURTS = 3;
		this.TOTAL_OF_ACTIONS = 3;

		this.date = FormatDate();
		register.survivors.push(
			`${this.date}: Um sobrevivente de nome ${name} foi criado`
		);
	}
}

class SurvivorLevel {
	survivor;

	constructor(survivor) {
		if (survivor instanceof Survivor) {
			this.survivor = survivor;
		}
	}

	checkLevel() {
		const currentLevel = this.survivor.level;

		if (this.survivor.points >= 42) {
			this.survivor.level = Level.Vermelho;
		} else if (this.survivor.points >= 18) {
			this.survivor.level = Level.Laranja;
		} else if (this.survivor.points >= 6) {
			this.survivor.level = Level.Amarelo;
		} else {
			this.survivor.level = Level.Azul;
		}

		const updatedLevel = this.survivor.level;
		if (currentLevel !== updatedLevel) {
			const formattedDate = FormatDate();

			register.survivorsLevels.push(
				`${formattedDate}: O sobrevivente de nome ${this.survivor.name} subiu para o nível ${this.survivor.level}`
			);
		}
	}
}

// const sobrevivente1 = new Survivor('Luara');
// sobrevivente1.points = 6;
// const nivel_sobrevivente1 = new SurvivorLevel(sobrevivente1);
// nivel_sobrevivente1.checkLevel();
// sobrevivente1.points = 20;
// nivel_sobrevivente1.checkLevel();
// sobrevivente1.points = 45;
// nivel_sobrevivente1.checkLevel();

console.log(register);
// console.log(sobrevivente);
