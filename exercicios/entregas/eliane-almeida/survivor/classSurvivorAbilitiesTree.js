import { SurvivorUtils } from "./classSurvivor";
import { AbilitiesTree } from "../abilitiesTree1";
import { Level } from "../classLevels";
import { registerMessage } from "../helpers";

class SurvivorAbilitiesTree extends SurvivorUtils {
	constructor(survivor, abilitiesTree) {
		if (abilitiesTree instanceof AbilitiesTree) {
			super(survivor);
			this.survivor.abilitiesTree = abilitiesTree;
		}
	}

	addAbility(abilityLevelName) {
		for (
			let i = 0;
			i < this.survivor.abilitiesTree[abilityLevelName].length;
			i++
		) {
			const currentAbility = this.survivor.abilitiesTree[abilityLevelName][i];
			if (!this.survivor.unlockedAbilities.includes(currentAbility)) {
				this.survivor.unlockedAbilities.push(currentAbility);
				registerMessage(
					'abilities',
					`A habilidade ${currentAbility} foi adicionada ao sobrevivente de nome ${this.survivor.name}`
				);
				return;
			}
		}
	}

	unlockAbilities() {
		if (this.survivor.level === Level.Amarelo) {
			this.addAbility('abilitiesLevelYellow');
		} else if (this.survivor.level === Level.Laranja) {
			this.addAbility('abilitiesLevelOrange');
		} else if (this.survivor.level === Level.Vermelho) {
			this.addAbility('abilitiesLevelRed');
		}
	}
}