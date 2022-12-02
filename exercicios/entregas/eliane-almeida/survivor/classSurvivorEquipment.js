import { SurvivorUtils } from "./classSurvivor.js";
import { Equipment } from "../propriedades/classEquipment.js";
import { registerMessage } from "../propriedades/helpers.js";

export class SurvivorEquipment extends SurvivorUtils {
	handsSlot = 0;
	bagSlot = 0;

	MAX_OF_HANDS_SLOTS = 2;
	MAX_OF_BAG_SLOTS = 5;

	constructor(survivor) {
		super(survivor);
	}

	get equipments() {
		return `
			Equipamentos em mão: ${this.survivor.handsEquipments}.
			Equipamentos na reserva: ${this.survivor.bagEquipments}.
		`;
	}

	addEquipment(equipment) {
		if (equipment instanceof Equipment) {
			if (this.handsSlot < this.MAX_OF_HANDS_SLOTS) {
				this.survivor.handsEquipments.push(equipment);
				this.handsSlot++;
				registerMessage(
					'survivorsEquipments',
					`O sobrevivente de nome ${this.survivor.name} adicionou o equipamento ${equipment.name} no slot das mãos.`
				);
			} else if (this.bagSlot < this.MAX_OF_BAG_SLOTS) {
				this.survivor.bagEquipments.push(equipment);
				this.bagSlot++;
				registerMessage(
					'survivorsEquipments',
					`O sobrevivente de nome ${this.survivor.name} adicionou o equipamento ${equipment.name} no slot das reservas.`
				);
			} else {
				return 	`Você está com seus slots cheios. Escolha um equipamento para remover antes de adicionar um novo. ${this.equipments()}` 	
			}
		}
	}

}