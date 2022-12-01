const {
	Survivor,
	SurvivorLevel,
	SurvivorEquipment,
	SurvivorAbilitiesTree,
	SurvivorHurts,
	SurvivorActions
} = require('./survivor');
const AbilitiesTree = require('./abilitiesTree');
const Equipment = require('./equipment');
const register = require('./register');
const { Zombie } = require('./zombie')

const zombie1 = new Zombie();

const zombie2 = new Zombie();

const abilitiesLevelYellow1 = ['+1 Hadouken'];
const abilitiesLevelOrange1 = ['+1 Action', 'Hidden treasure'];
const abilitiesLevelRed1 = ['+1 Life', '+1 Equipment in hand', '+1 Damage'];

const survivor = new Survivor('Mari');
const abilitiesTree = new AbilitiesTree(
	abilitiesLevelYellow1,
	abilitiesLevelOrange1,
	abilitiesLevelRed1
)

const survivorTree = new SurvivorAbilitiesTree(
	survivor,
	abilitiesTree
);

const survivorLevel = new SurvivorLevel(survivor);

survivorTree.unlockAbilities();

survivorLevel.attackZombie();
survivorLevel.attackZombie();


survivorLevel.checkLevel();

survivorTree.unlockAbilities();

const equipment1 = new Equipment('Water', 'Utilities');
const equipment2 = new Equipment('Axe', 'Fight');
const equipment3 = new Equipment('Baseball bat', 'Fight');
const equipment4 = new Equipment('Chainsaw', 'Fight');
const survivorEquipments = new SurvivorEquipment(survivor);

survivorEquipments.addEquipment(equipment1);
survivorEquipments.addEquipment(equipment2);
survivorEquipments.addEquipment(equipment3);
survivorEquipments.addEquipment(equipment4);

survivorEquipments.removeEquipment(equipment1);

const survivorHurt = new SurvivorHurts(survivor);

survivorHurt.getHurt();

const action1 = new SurvivorActions(survivor);
action1.doAction();
action1.doAction();

survivorLevel.checkLevel();
survivorHurt.getHurt();
survivorHurt.getHurt();
survivorHurt.getHurt();
console.log(register);
