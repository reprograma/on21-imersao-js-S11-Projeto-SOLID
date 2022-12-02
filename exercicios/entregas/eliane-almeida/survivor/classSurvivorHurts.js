import { registerMessage } from "../helpers";

class SurvivorHurts extends SurvivorUtils {
	constructor(survivor) {
		super(survivor);
	}

	getHurt() {
		if (this.survivor.alive) {
			this.survivor.hurts++;
			registerMessage(
				'hurts',
				`O sobrevivente de nome ${this.survivor.name} se feriu.`
			);
			if (this.survivor.hurts >= this.survivor.MAX_OF_HURTS) {
				this.survivor.alive = false;
				console.log(
					`O sobrevivente de nome ${this.survivor.name} passou dessa para melhor.`
				);
				registerMessage(
					'dies',
					`O sobrevivente de nome ${this.survivor.name} passou dessa para melhor.`
				);
			}
		}
	}
}