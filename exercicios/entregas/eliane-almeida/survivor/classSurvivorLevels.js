import { SurvivorUtils } from "./classSurvivor";
import { Level } from "../classLevels";
import { registerMessage } from "../helpers";

class SurvivorLevel extends SurvivorUtils {
	constructor(survivor) {
		super(survivor);
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
	}
}
