import { SurvivorUtils } from "./classSurvivor.js";
import { Level } from "../propriedades/classLevels.js";
import { registerMessage } from "../propriedades/helpers.js";

export class SurvivorLevel extends SurvivorUtils {
	constructor(survivor) {
		super(survivor);
	}

	killZombie(){
		this.survivor.points++;
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
			registerMessage(
				'survivorsLevels',
				`O sobrevivente de nome ${this.survivor.name} subiu para o nível ${this.survivor.level}`
			);
		}

		this.unlockAbilities();
		if(this.survivor.points == 61){
			this.addAbility('abilitiesLevelOrange');
		}
		if(this.survivor.points == 86 ){
			this.addAbility('abilitiesLevelRed');
		}
		if(this.survivor.points == 129 ){
			this.addAbility('abilitiesLevelRed');
		}
		if(this.survivor.points == 150 ){
			registerMessage(
				'gameLevel',
				`O sobrevivente de nome ${this.survivor.name} ganhou o jogo`
				);
			}
	}
}
