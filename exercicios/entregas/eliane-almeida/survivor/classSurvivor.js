import { registerMessage } from '../propriedades/helpers.js';
import { Level } from '../propriedades/classLevels.js';
import { GamerCharacter } from '../propriedades/classCharacter.js';

export class Survivor extends GamerCharacter {
	name;
	abilitiesTree;
	unlockedAbilities = [];
	handsEquipments = [];
	bagEquipments = [];
	points = 0;
	level = Level.Azul;

	constructor(name) {
		super();
		this.name = name;

		this.MAX_OF_HURTS = 3;
		this.TOTAL_OF_ACTIONS = 3;

		registerMessage('survivors', `Um sobrevivente de nome ${name} foi criado`);
	}
}

export class SurvivorUtils {
	survivor;

	constructor(survivor) {
		if (survivor instanceof Survivor) {
			this.survivor = survivor;
		}
	}

	addAbility(abilityLevelName) { 
		for(let i =0; i < this.survivor.abilitiesTree[abilityLevelName].length; i++) {
			const currentAbility = this.survivor.abilitiesTree[abilityLevelName][i];
			if (!this.survivor.unlockedAbilities.includes(currentAbility)) {
				this.survivor.unlockedAbilities.push(currentAbility);
				registerMessage(
					'abilities',
					`A habilidade ${currentAbility} foi adicionada ao sobrevivente ${this.survivvor.name}`
					);
					
					return;
				}
		}
	}

	unlockAbilities() {
		if (this.survivor.level === Level.Yellow) {
			this.addAbility('abilitiesLevelYellow');
		} else if (this.survivor.level === Level.Orange) {
			this.addAbility('abilitiesLevelOrange');
		} else if (this.survivor.level === Level.Red) {
			this.addAbility('abilitiesLevelRed');
		}
	}
}
