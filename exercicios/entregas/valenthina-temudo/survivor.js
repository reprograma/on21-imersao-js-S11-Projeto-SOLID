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
  level = Level.Azul;

  constructor(name) {
    super();
    this.name = name;

    this.MAX_OF_HURTS = 3;
    this.TOTAL_OF_ACTIONS = 3;

    registerMessage('survivors', `A survivor named ${name} was created`);
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
        `The survivor named ${this.survivor.name} rose to level ${this.survivor.level}`
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
			Equipment on hand: ${this.survivor.handsEquipments}.
			Equipment on reserve: ${this.survivor.bagEquipments}.
		`;
  }

  addEquipment(equipment) {
    if (equipment instanceof Equipment) {
      if (this.handsSlot < this.MAX_OF_HANDS_SLOTS) {
        this.survivor.handsEquipments.push(equipment);
        this.handsSlot++;
        registerMessage(
          'survivorsEquipments',
          `The survivor named ${this.survivor.name} added the equipment ${equipment.name} in the hand slot.`
        );
      } else if (this.bagSlot < this.MAX_OF_BAG_SLOTS) {
        this.survivor.bagEquipments.push(equipment);
        this.bagSlot++;
        registerMessage(
          'survivorsEquipments',
          `The survivor named ${this.survivor.name} added the equipment ${equipment.name} in the reserves slot.`
        );
      } else {
        console.log(
          'You have your slots full. Choose an equipment to remove before adding a new one.'
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
          `The survivor named ${this.survivor.name} removed the equipment ${equipmentToRemove.name}.`
        );
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
          `The skill ${currentAbility} has been added to the survivor named ${this.survivor.name}`
        );
        return;
      }
    }

    if (this.survivor.points == 50) {
      console.log('Level Yellow: No more skills available');
    } else if (this.survivor.points == 61) {
      this.addAbility('abilitiesLeveOrange');
    } else if (this.survivor.points == 86) {
      this.addAbility('abilitiesLevelRed');
    } else if (this.survivor.points == 129) {
      this.addAbility('abilitiesLevelRed');
    } else if (this.survivor.points == 150) {
      registerMessage(
        'survivorsLevels',
        `End of game. The survivor named ${this.survivor.name} won the game.`
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
        `The survivor named ${this.survivor.name} was injured. As a result, your ability to carry equipment has been reduced by 1.`
      );

      // const reduceEquipment = this.survivor.handsEquipments.length - 1;
      // this.removeEquipment(this.survivor.handsEquipments[reduceEquipment]);

      if (this.survivor.hurts >= this.survivor.MAX_OF_HURTS) {
        this.survivor.alive = false;
        console.log(
          `The survivor named ${this.survivor.name} went from there for the better.`
        );
        registerMessage(
          'dies',
          `The survivor named ${this.survivor.name} went from there for the better.`
        );
      }
    }
  }
}

class SurvivorActions extends SurvivorUtils {
  constructor(survivor) {
    super(survivor);
  }

  killZombie() {
    this.survivor.points++;
    registerMessage(
      'killZombie',
      `The survivor named ${this.survivor.name} killed a zombie`
    );
  }
  doAction() {
    if (this.survivor.actions < this.survivor.TOTAL_OF_ACTIONS) {
      this.survivor.actions++;
      registerMessage(
        'actions',
        `The survivor named ${this.survivor.name} performed an action`
      );
    } else {
      console.log(
        'That survivor has already taken the most actions in the round.'
      );
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
