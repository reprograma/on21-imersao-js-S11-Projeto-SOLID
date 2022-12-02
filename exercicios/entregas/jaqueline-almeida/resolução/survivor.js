const { registerMessage } = require("./helpers");
const Level = require("./levels");
const GameCharacter = require("./character");
const Equipment = require("./equipment");
const AbilitiesTree = require("./abilitiesTree");
const { equipment } = require("./register");

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

    registerMessage("survivors", `A survivor of name ${name} was created`);
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
      const qtHandsEquipments = this.survivor.handsEquipments.length;
      const qtBagEquipments = this.survivor.bagEquipments.length;

      this.survivor.handsEquipments = this.survivor.handsEquipments.filter(
        (equipment) => equipment !== equipmentToRemove
      );

      this.survivor.bagEquipments = this.survivor.bagEquipments.filter(
        (equipment) => equipment !== equipmentToRemove
      );

      if (
        qtHandsEquipments !== this.survivor.handsEquipments.length ||
        qtBagEquipments !== this.survivor.bagEquipments.length
      ) {
        registerMessage(
          "survivorsEquipments",
          `The survivor of name ${this.survivor.name} remove the equipment ${equipmentToRemove.name}.`
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
          "abilities",
          `The abilities ${currentAbility} was added of the survivor ${this.survivor.name}`
        );
        return;
      }
    }
  }

  unlockedAbilities() {
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
      this.survivor.level = Level.Rede;
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
        `The survivor ${this.survivor.name} increased the level ${this.survivor.level}`
      );
    }
    this.unlockedAbilities();

    if (this.survivor.points == 61) {
      this.addAbility("abilitiesLevelOrange");
    }
    if (this.survivor.points == 86) {
      this.addAbility("abilitiesLevelRed");
    }
    if (this.survivor.points === 129) {
      this.addAbility("abilitiesLevelRed");
    }
    if (this.survivor.points === 150) {
      this.addAbility("abilitiesLevelRed")(
        registerMessage(
          "gameLevel",
          `The survivor of name ${this.survivor.name} gained the game`
        )
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
			Equipments on hand: ${this.survivor.handsEquipments}.
			Equipments in reserve: ${this.survivor.bagEquipments}.
		`;
  }

  addEquipment(equipment) {
    if (equipment instanceof Equipment) {
      if (this.handsSlot < this.MAX_OF_HANDS_SLOTS) {
        this.survivor.handsEquipments.push(equipment);
        this.handsSlot++;
        registerMessage(
          "survivorsEquipments",
          `The survivor ${this.survivor.name} added the equipment${equipment.name} in the slot on hand.`
        );
      } else if (this.bagSlot < this.MAX_OF_BAG_SLOTS) {
        this.survivor.bagEquipments.push(equipment);
        this.bagSlot++;
        registerMessage(
          "survivorsEquipments",
          `The survivor ${this.survivor.name} added the equipment ${equipment.name} the slot in reserves`
        );
      } else {
        console.log(
          "You have your slots full. Choose a gear to remove before adding a new one."
        );
        this.equipments();
      }
    }
  }

  // removeEquipment(equipmentToRemove) {
  //   if (equipmentToRemove instanceof Equipment) {
  //     const qteHandsEquipments = this.survivor.handsEquipments.length;
  //     const qteBagEquipments = this.survivor.bagEquipments.length;

  //     this.survivor.handsEquipments = this.survivor.handsEquipments.filter(
  //       (equipment) => equipment !== equipmentToRemove
  //     );

  //     this.survivor.bagEquipments = this.survivor.bagEquipments.filter(
  //       (equipment) => equipment !== equipmentToRemove
  //     );

  //     if (
  //       qteHandsEquipments !== this.survivor.handsEquipments.length ||
  //       qteBagEquipments !== this.survivor.bagEquipments.length
  //     ) {
  //       registerMessage(
  //         "survivorsEquipments",
  //         `O sobrevivente de nome ${this.survivor.name} removeu o equipamento ${equipmentToRemove.name}.`
  //       );
  //     }
  //   }
  // }
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
        "hurts",
        `The survivor ${this.survivor.name} was injured.`
      );
      const qtdequipment = this.survivor.handsEquipments.length - 1;
      this.removeEquipment(this.survivor.handsEquipments[qtdequipment]);

      if (this.survivor.hurts >= this.survivor.MAX_OF_HURTS) {
        this.survivor.alive = false;
        console.log(`The survivor ${this.survivor.name} is dead.`);
        registerMessage("dies", `The survivor ${this.survivor.name} is dead.`);
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
        `The survivor ${this.survivor.name} made a action.`
      );
    } else {
      console.log("This survivor made the maximum action until this moment.");
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
