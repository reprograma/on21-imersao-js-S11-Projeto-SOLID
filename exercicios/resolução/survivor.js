const { registerMessage } = require("./helpers");
const Level = require("./levels");
const GameCharacter = require("./character");
const Equipment = require("./equipment");
const AbilitiesTree = require("./abilitiesTree");

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

    registerMessage("survivors", `The name survivor ${name} was raised`);
  }
}

class SurvivorUtils {
  survivor;

  constructor(survivor) {
    if (survivor instanceof Survivor) {
      this.survivor = survivor;
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
          "abilities",
          `the abilities ${currentAbility} was added to the name survivor ${this.survivor.name}`
        );
        return;
      }
    }
  }

  unlockAbilities() {
    if (this.survivor.level === Level.Yellow) {
      this.addAbility("abilitiesLevelYellow");
    } else if (this.survivor.level === Level.Orange) {
      this.addAbility("abilitiesLevelOrange");
    } else if (this.survivor.level === Level.Red) {
      this.addAbility("abilitiesLevelRed");
    }
  }
}

class SurvivorLevel extends SurvivorUtils {
  constructor(survivor) {
    super(survivor);
  }

  killZombie() {
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
        "survivorsLevels",
        `The name survivor ${this.survivor.name} rose to the level ${this.survivor.level}`
      );
    }

    this.unlockAbilities();

    if (this.survivor.points == 61) {
      this.addAbility("abilitiesLevelOrange");
    }
    if (this.survivor.points == 86) {
      this.addAbility("abilitiesLevelRed");
    }
    if (this.survivor.points == 129) {
      this.addAbility("abilitiesLevelRed");
    }

    if (this.survivor.points == 150) {
      registerMessage(
        "gameLevel",
        `The name survivor ${this.survivor.name} won the game.`
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
          "survivorsEquipments",
          `The name survivor ${this.survivor.name} added the equipment ${equipment.name} in the hand slot.`
        );
      } else if (this.bagSlot < this.MAX_OF_BAG_SLOTS) {
        this.survivor.bagEquipments.push(equipment);
        this.bagSlot++;
        registerMessage(
          "survivorsEquipments",
          `The name survivor ${this.survivor.name} added the equipment ${equipment.name} in the booking slot.`
        );
      } else {
        console.log(
          "You have your slots full. Choose a gear to remove before adding a new one"
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
}

class SurvivorActions extends SurvivorUtils {
  constructor(survivor) {
    super(survivor);
  }

  doAction() {
    if (this.survivor.actions < this.survivor.TOTAL_OF_ACTIONS) {
      this.survivor.actions++;
      registerMessage(
        "actions",
        `The name survivor  ${this.survivor.name} performed an action.`
      );
    } else {
      console.log(
        "This survivor has already performed the maximum number of actions in the round."
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
