const { registerMessage } = require('./helpers');
const Level = require('./levels');
const GameCharacter = require('./character');
const Equipment = require('./equipment');

class Survivor extends GameCharacter {
	name;
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

//Ver possibilidade de criar uma super classe para as características dos sobreviventes
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
			registerMessage(
				'survivorsLevels',
				`O sobrevivente de nome ${this.survivor.name} subiu para o nível ${this.survivor.level}`
			);
		}
	}
}

class SurvivorEquipment {
	survivor;
	handsSlot = 0;
	bagSlot = 0;

	MAX_OF_HANDS_SLOTS = 2;
	MAX_OF_BAG_SLOTS = 5;

	constructor(survivor) {
		if (survivor instanceof Survivor) {
			this.survivor = survivor;
		}
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
					`O sobrevivente de nome ${this.survivor.name} removeu o equipamento ${equipmentToRemove}.`
				);
			}
		}
	}
}

module.exports = { Survivor, SurvivorLevel, SurvivorEquipment };
