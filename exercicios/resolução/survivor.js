const { registerMessage } = require('./helpers');
const Level = require('./levels');
const GameCharacter = require('./character');
const Equipment = require('./equipment');
const AbilitiesTree = require('./abilitiesTree');
const register = require('./register');
const { Zombie } = require('./zombie');


class Survivor extends GameCharacter {
	name;
	abilitiesTree;
	unlockedAbilities = [];
	handsEquipments = [];
	points = 0
	bagEquipments = [];
	level = Level.Blue;

	constructor(name) {
		super();
		this.name = name;

		this.MAX_OF_HURTS = 3;
		this.TOTAL_OF_ACTIONS = 3;

		registerMessage('survivors', `Survivor ${name} was created.`);
	}
}

class SurvivorUtils {
	survivor;

	constructor(survivor) {
		if (survivor instanceof Survivor) {
			this.survivor = survivor;
		}
	}
}

class SurvivorLevel extends SurvivorUtils {
	constructor(survivor) {
		super(survivor);
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
				`Survivor ${this.survivor.name} evolved to the level ${this.survivor.level}.`
			);
		}
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
			Equipment at hand: ${this.survivor.handsEquipments}.
			Equipment at bag: ${this.survivor.bagEquipments}.
		`;
	}

	addEquipment(equipment) {
		if (equipment instanceof Equipment) {
			if (this.handsSlot < this.MAX_OF_HANDS_SLOTS) {
				this.survivor.handsEquipments.push(equipment);
				this.handsSlot++;
				registerMessage(
					'survivorsEquipments',
					`Survivor ${this.survivor.name} added the equipment ${equipment.name} in the hands slot.`
				);
			} else if (this.bagSlot < this.MAX_OF_BAG_SLOTS) {
				this.survivor.bagEquipments.push(equipment);
				this.bagSlot++;
				registerMessage(
					'survivorsEquipments',
					`Survivor ${this.survivor.name} added the equipment ${equipment.name} in the bag slot.`
				);
			} else {
				console.log(
					'Slots full. Choose an equipment to remove before adding a new one.'
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
					`Survivor ${this.survivor.name} removed the equipment ${equipmentToRemove.name}.`
				);
			}
		}
	}

	updateSlots() {
		if (this.MAX_OF_BAG_SLOTS > 0) {
			this.MAX_OF_BAG_SLOTS--
			if (this.survivor.bagEquipments.length > this.MAX_OF_BAG_SLOTS) {
				console.log(
					'Survivor lost the ability to carry one equipment.'
				);
			}
		} else {
			this.MAX_OF_HANDS_SLOTS--
			if (this.survivor.handsEquipments.length > this.MAX_OF_HANDS_SLOTS) {
				console.log(
					'Survivor lost the ability to carry one equipment.'
				);
			}
		}

		registerMessage(
			'survivorsEquipments',
			`Survivor ${this.survivor.name} lost the ability to carry one equipment.`
		);
		return;
	}
}

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
					`Ability ${currentAbility} was added to survivor ${this.survivor.name}.`
				);
				return;
			}
		}
	}

	unlockedRedLevelAbilities() {
		if (this.survivor.points >= 61 && this.survivor.points < 86) {
			this.addAbility("abilitiesLevelOrange");
		} else if (this.survivor.points >= 86 && this.survivor.points < 129) {
			this.addAbility("abilitiesLevelRed");
		} else if (this.survivor.points >= 129 && this.survivor.points < 150) {
			this.addAbility("abilitiesLevelRed");
		} else if (this.survivor.points >= 150) {
			registerMessage(
				'finalTime',
				`Survivor ${this.survivor.name} reached +150EXP and won the game!!!`
			);
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

		if (this.survivor.level === Level.Red) {
			this.unlockedRedLevelAbilities();
		}
	}
}

class SurvivorHurts extends SurvivorUtils {
	constructor(survivor) {
		super(survivor);
	}
	getHurt() {
		let lostEquipments
		if (this.survivor.alive) {
			this.survivor.hurts++;


			if (this.survivor.handsEquipments.length) {

				lostEquipments = this.survivor.handsEquipments.pop()

			} else if (this.survivor.bagEquipments.length) {
				lostEquipments = this.survivor.bagEquipments.pop()
				registerMessage(
					'hurts',
					`Survivor ${this.survivor.name} got hurt and lost equipment ${lostEquipments.name}.`
				);
			} else {
				console.log('No more equipments.')
			}

			if (this.survivor.hurts >= this.survivor.MAX_OF_HURTS) {
				this.survivor.alive = false;
				console.log(
					`Survivor ${this.survivor.name} is gone to a better place - or not.`
				);
				registerMessage(
					'dies',
					`Survivor ${this.survivor.name} is gone to a better place - or not.`
				);
			}
		}
	}
}

class SurvivorActions extends SurvivorUtils {
	constructor(survivor) {
		super(survivor);
	}

	attackZombie(zombie) {
		if (zombie instanceof Zombie) {
			this.survivor.points++
			registerMessage(
				'attackZombie',
				`Survivor ${this.survivor.name} killed ${zombie.name}.`
			);
		}
	}

	doAction() {
		if (this.survivor.actions < this.survivor.TOTAL_OF_ACTIONS) {
			this.survivor.actions++;
			registerMessage(
				'actions',
				`Survivor ${this.survivor.name} performed an action.`
			);
		} else {
			console.log('Survivor has already performed all actions in the round.');
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

}