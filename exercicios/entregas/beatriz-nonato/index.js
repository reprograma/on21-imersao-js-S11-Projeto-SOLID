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

const { Zombie, ZombieUtils }= require('./zombie');

const zombie1 = new Zombie('zombie1');
//console.log(zombie1)

const zombie2 = new ZombieUtils(zombie1);
zombie2.getHurt();
zombie2.getHurt();
zombie2.getHurt();

const abilitiesLevelYellow1 = ['+1 haduke'];
const abilitiesLevelOrange1 = ['+1 action', 'hidden treasure'];
const abilitiesLevelRed1 = ['+1 life', '+1 equipment in hand', '+1 damage'];

const survivor1 = new Survivor('Beatriz');
const AbilitiesTree1 = new AbilitiesTree(
	abilitiesLevelYellow1,
	abilitiesLevelOrange1,
	abilitiesLevelRed1
);

const survivor_tree = new SurvivorAbilitiesTree(
	survivor1,
	AbilitiesTree1
);

const level_survivor1 = new SurvivorLevel(survivor1);

//survivor1.points = 6;
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.killZombie();
level_survivor1.checkLevel();
// survivor_tree.unlockAbilities();

survivor1.points = 18;
level_survivor1.checkLevel();

survivor1.points = 45;
level_survivor1.checkLevel();

 survivor1.points = 61;
level_survivor1.checkLevel();
// survivor_tree.unlockAbilities();

survivor1.points = 86;
level_survivor1.checkLevel();
survivor1.points = 129;
level_survivor1.checkLevel();

//survivor_tree.unlockAbilities();

const equipment1 = new Equipment('agua', 'utilitarios');
const equipment2 = new Equipment('frigideira', 'luta');
const equipment_survivor1 = new SurvivorEquipment(survivor1);
 equipment_survivor1.addEquipment(equipment1);
 equipment_survivor1.addEquipment(equipment2);
 
 //console.log(survivor1.handsEquipments)
 equipment_survivor1.removeEquipment(equipment1);
// equipment_survivor1.removeEquipment(equipment2);

const survivor_hurt1 = new SurvivorHurts(survivor1);
survivor_hurt1.getHurt();
survivor_hurt1.getHurt();

const action1 = new SurvivorActions(survivor1);
action1.doAction();
action1.doAction();
action1.doAction();
action1.doAction();
survivor1.points = 150;

level_survivor1.checkLevel();

console.log(register);
// console.log(survivor1.unlockedAbilities);
