const {
  Survivor,
  SurvivorLevel,
  SurvivorEquipment,
  SurvivorAbilitiesTree,
  SurvivorHurts,
  SurvivorActions,
} = require('./survivor');
const AbilitiesTree = require('./abilitiesTree');
const Equipment = require('./equipment');
const register = require('./register');

const abilitiesLevelYellow1 = ['+1 haduke'];
const abilitiesLevelOrange1 = ['+1 ação', 'tesouro escondido'];
const abilitiesLevelRed1 = ['+1 vida', '+1 equipamento em mãos', '+1 dano'];

const survivor1 = new Survivor('Luara');
const abilitiesTree1 = new AbilitiesTree(
  abilitiesLevelYellow1,
  abilitiesLevelOrange1,
  abilitiesLevelRed1
);

const survivor_tree = new SurvivorAbilitiesTree(survivor1, abilitiesTree1);

survivor1.points = 6;
const level_survivor1 = new SurvivorLevel(survivor1);
level_survivor1.checkLevel();
survivor_tree.unlockAbilities();

survivor1.points = 20;
level_survivor1.checkLevel();
survivor_tree.unlockAbilities();

survivor1.points = 45;
level_survivor1.checkLevel();
survivor_tree.unlockAbilities();

const survivor_hurt1 = new SurvivorHurts(survivor1);
survivor_hurt1.getHurt();
survivor_hurt1.getHurt();

const action1 = new SurvivorActions(survivor1);
action1.doAction();
action1.doAction();
action1.doAction();
action1.doAction();

console.log(register);
