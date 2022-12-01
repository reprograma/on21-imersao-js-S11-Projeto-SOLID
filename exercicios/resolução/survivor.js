const { registerMessage, formatDate } = require("./helpers");
const Level = require("./levels");
const Character = require("./character");
const Equipment = require("./equipment");
const AbilitiesTree = require("./abilitiesTree");
const register = require("./register");

class Survivor extends Character {
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

    registerMessage("survivors", `Survivor: ${name} was created`);
	register.initialTime = formatDate()
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
          `The ability: ${currentAbility} has been added to the survivor: ${this.survivor.name}`
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
          "survivorsEquipments",

          `Survivor: ${this.survivor.name} removed equipment ${equipmentToRemove.name}.`
        );
      }
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
        `Survivor: ${this.survivor.name} leveled up to: ${this.survivor.level}`
      );
    }

    this.unlockAbilities();

    if (this.survivor.points === 61) {
      this.addAbility("abilitiesLevelOrange");
    }
    if (this.survivor.points === 86) {
      this.addAbility("abilitiesLevelRed");
    }
    if (this.survivor.points === 129) {
      this.addAbility("abilitiesLevelRed");
    }

    if (this.survivor.points === 150) {
      registerMessage(
        "gameLevel",
        `Survivor: ${this.survivor.name} won the game`
      );
	  register.finalTime = formatDate()
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
			Hand Equipments: ${this.survivor.handsEquipments}.
			Bag Equipments: ${this.survivor.bagEquipments}.
		`;
  }

  addEquipment(equipment) {
    if (equipment instanceof Equipment) {
      if (this.handsSlot < this.MAX_OF_HANDS_SLOTS) {
        this.survivor.handsEquipments.push(equipment);
        this.handsSlot++;
        registerMessage(
          "survivorsEquipments",
          `Survivor: ${this.survivor.name} added equipment: ${equipment.name} to hand slot.`
        );
      } else if (this.bagSlot < this.MAX_OF_BAG_SLOTS) {
        this.survivor.bagEquipments.push(equipment);
        this.bagSlot++;
        registerMessage(
          "survivorsEquipments",
          `Survivor: ${this.survivor.name} added equipment: ${equipment.name} to bag slot.`
        );
      } else {
        console.log(
			"You're out of slots. Choose an equipment to remove before adding a new one."
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

class Wounds extends SurvivorUtils {
  constructor(survivor) {
    super(survivor);
  }

  getHurt() {
    if (this.survivor.alive) {
      this.survivor.hurts++;
      registerMessage(
        "hurts",
        `Survivor: ${this.survivor.name} was injured.`
      );
      const auxqtdequipment = this.survivor.handsEquipments.length - 1;
      this.removeEquipment(this.survivor.handsEquipments[auxqtdequipment]);

      if (this.survivor.hurts >= this.survivor.MAX_OF_HURTS) {
        this.survivor.alive = false;
              registerMessage(
          "dies",
          `Survivor: ${this.survivor.name} died.`
        );
		register.finalTime = formatDate()
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
        "actions",
        `Survivor: ${this.survivor.name} performed an action`
      );
    } else {
      console.log("This survivor has already performed the maximum number of actions allowed in the round.");
    }
  }
}

module.exports = {
  Survivor,
  SurvivorLevel,
  SurvivorEquipment,
  SurvivorAbilitiesTree,
  Wounds,
  SurvivorActions,
};