import { registerMessage } from "../propriedades/helpers.js";
import { SurvivorUtils } from "./classSurvivor.js";

export class SurvivorActions extends SurvivorUtils {
	constructor(survivor) {
		super(survivor);
	}

	doAction() {
		if (this.survivor.actions < this.survivor.TOTAL_OF_ACTIONS) {
			this.survivor.actions++;
			registerMessage(
				'actions',
				`O sobrevivente de nome ${this.survivor.name} realizou uma ação`
			);
		} else {
			console.log('Esse sobrevivente já realizou o máximo de ações na rodada.');
		}
	}
}