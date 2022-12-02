import { SurvivorUtils } from "./classSurvivor";
import { Equipment } from "../classEquipment";
import { registerMessage } from "../helpers";

class SurvivorEquipment extends SurvivorUtils {
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
				console.log(
					'Você está com seus slots cheios. Escolha um equipamento para remover antes de adicionar um novo.'
				);
				this.equipments();
			}
		}
	}

	removeEquipment(equipmentToRemove) {
		if (equipmentToRemove instanceof Equipment) {
			const qteHandsEquipments = this.survivor.handsEquipments.length;
			const qteBagEquipments = this.survivor.bagEquipments.length;

			this.survivor.handsEquipments = this.survivor.handsEquipments.filter(
				(equipment) => equipment !== equipmentToRemove
			);

			this.survivor.bagEquipments = this.survivor.bagEquipments.filter(
				(equipment) => equipment !== equipmentToRemove
			);

			if (
				qteHandsEquipments !== this.survivor.handsEquipments.length ||
				qteBagEquipments !== this.survivor.bagEquipments.length
			) {
				registerMessage(
					'survivorsEquipments',
					`O sobrevivente de nome ${this.survivor.name} removeu o equipamento ${equipmentToRemove.name}.`
				);
			}
		}
	}
}