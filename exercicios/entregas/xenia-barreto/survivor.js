const { registerMessage } = require('./helpers');
const Level = require('./levels');
const GameCharacter = require('./character');
const Equipment = require('./equipment');
const AbilitiesTree = require('./abilitiesTree');

class Survivor extends GameCharacter {
	name;
	abilitiesTree;
	unlockedAbilities = [];
	handsEquipments = [];
	bagEquipments = [];
	points = 0;
	level = Level.Blue;

	constructor(name) {
		super();
		this.name = name;

		this.MAX_OF_HURTS = 3;
		this.TOTAL_OF_ACTIONS = 3;

		registerMessage('survivors', `Um sobrevivente de nome ${name} foi criado`);
	}

	
}

class SurvivorUtils {
	survivor;

	constructor(survivor) {
		if (survivor instanceof Survivor) {
			this.survivor = survivor;
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
		if (this.survivor.level === Level.Yellow) {
			this.addAbility('abilitiesLevelYellow');
		} else if (this.survivor.level === Level.Orange) {
			this.addAbility('abilitiesLevelOrange');
		} else if (this.survivor.level === Level.Red) {
			this.addAbility('abilitiesLevelRed');
		}
	}

}

class SurvivorLevel extends SurvivorUtils {
	constructor(survivor) {
		super(survivor);
	}

	killZombie(){
		this.survivor.points++;
	}

	checkLevel() {
		const currentLevel = this.survivor.level;

		if (this.survivor.points >= 42) {
			this.survivor.level = Level.Red;
		} else if (this.survivor.points >= 18) {
			this.survivor.level = Level.Orange;
		} else if (this.survivor.points >= 6) {
			this.survivor.level = Level.Yellow;
		} else {
			this.survivor.level = Level.Blue;
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
			);}
	
	
	}
}

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

	
}

class SurvivorAbilitiesTree extends SurvivorUtils {
	constructor(survivor, abilitiesTree) {
		if (abilitiesTree instanceof AbilitiesTree) {
			super(survivor);
			this.survivor.abilitiesTree = abilitiesTree;
		}
	}

	
}

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
			// o sobrevivente sempre comeca com varios equipamentows?
			const auxqtdequipment = this.survivor.handsEquipments.length-1;
			this.removeEquipment(this.survivor.handsEquipments[auxqtdequipment]);

			
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

class SurvivorActions extends SurvivorUtils {
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

module.exports = {
	Survivor,
	SurvivorLevel,
	SurvivorEquipment,
	SurvivorAbilitiesTree,
	SurvivorHurts,
	SurvivorActions,
};
