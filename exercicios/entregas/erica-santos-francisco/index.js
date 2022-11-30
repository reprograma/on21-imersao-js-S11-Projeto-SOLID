const {
  Survivor,
  SurvivorLevel,
  SurvivorEquipment,
  SurvivorAbilitiesTree,
  Wounds,
  SurvivorActions,
} = require("./survivor");
const AbilitiesTree = require("./abilitiesTree");
const Equipment = require("./equipment");
const register = require("./register");

const abilitiesLevelYellow1 = ["+1 haduke"];
const abilitiesLevelOrange1 = ["+1 ação", "tesouro escondido"];
const abilitiesLevelRed1 = ["+1 vida", "+1 equipamento em mãos", "+1 dano"];

const survivor1 = new Survivor("Mariazinha do agreste");
const abilitiesTreeGroup = new AbilitiesTree(
  abilitiesLevelYellow1,
  abilitiesLevelOrange1,
  abilitiesLevelRed1
);

const survivorabilitiestreegroup = new SurvivorAbilitiesTree(
  survivor1,
  abilitiesTreeGroup
);

const level_survivor1 = new SurvivorLevel(survivor1);

//survivor1.points = 6;
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
// level_survivor1.checkLevel();
// survivorabilitiestreegroup.unlockAbilities();

survivor1.points = 18;
level_survivor1.checkLevel();

survivor1.points = 45;
level_survivor1.checkLevel();

survivor1.points = 61;
level_survivor1.checkLevel();
// survivorabilitiestreegroup.unlockAbilities();

survivor1.points = 86;
level_survivor1.checkLevel();
survivor1.points = 129;
level_survivor1.checkLevel();

survivorabilitiestreegroup.unlockAbilities();

const equipment1 = new Equipment("agua", "utilitarios");
const equipment2 = new Equipment("frigideira", "luta");
const handled_equipment = new SurvivorEquipment(survivor1);
handled_equipment.addEquipment(equipment1);
handled_equipment.addEquipment(equipment2);

//console.log(survivor1.handsEquipments)
// handled_equipment.removeEquipment(equipment1);
// handled_equipment.removeEquipment(equipment2);

const all_wounds = new Wounds(survivor1);
all_wounds.getHurt();
all_wounds.getHurt();

const action1 = new SurvivorActions(survivor1);
action1.doAction();
action1.doAction();
action1.doAction();
action1.doAction();
survivor1.points = 150;

level_survivor1.checkLevel();

console.log(register);
// console.log(survivor1.unlockedAbilities);
