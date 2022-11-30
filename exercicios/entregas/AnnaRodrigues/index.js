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

const {Zombie,
ZombieUtils}= require('./zombie');

const zombie1 = new Zombie('zombie1');
//console.log(zombie1)

const zombie2 = new ZombieUtils(zombie1);
zombie2.getHurt();

const abilitiesLevelYellow1 = ['+1 haduke'];
const abilitiesLevelOrange1 = ['+1 ação', 'tesouro escondido'];
const abilitiesLevelRed1 = ['+1 vida', '+1 equipamento em mãos', '+1 dano'];

const sobrevivente1 = new Survivor('Luara');
const arvoreDeHabilidades1 = new AbilitiesTree(
	abilitiesLevelYellow1,
	abilitiesLevelOrange1,
	abilitiesLevelRed1
);

const sobrevivente_arvore = new SurvivorAbilitiesTree(
	sobrevivente1,
	arvoreDeHabilidades1
);

const nível_sobrevivente1 = new SurvivorLevel(sobrevivente1);

//sobrevivente1.points = 6;
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.checkLevel();
// sobrevivente_arvore.unlockAbilities();

sobrevivente1.points = 18;
nível_sobrevivente1.checkLevel();


sobrevivente1.points = 45;
nível_sobrevivente1.checkLevel();

 sobrevivente1.points = 61;
nível_sobrevivente1.checkLevel();
// sobrevivente_arvore.unlockAbilities();

sobrevivente1.points = 86;
nível_sobrevivente1.checkLevel();
sobrevivente1.points = 129;
nível_sobrevivente1.checkLevel();


//sobrevivente_arvore.unlockAbilities();

const equipamento1 = new Equipment('agua', 'utilitarios');
const equipamento2 = new Equipment('frigideira', 'luta');
const equipamentos_sobrevivente1 = new SurvivorEquipment(sobrevivente1);
 equipamentos_sobrevivente1.addEquipment(equipamento1);
 equipamentos_sobrevivente1.addEquipment(equipamento2);
 
 //console.log(sobrevivente1.handsEquipments)
 equipamentos_sobrevivente1.removeEquipment(equipamento1);
// equipamentos_sobrevivente1.removeEquipment(equipamento2);

const sobrevivente_ferimento1 = new SurvivorHurts(sobrevivente1);
sobrevivente_ferimento1.getHurt();
sobrevivente_ferimento1.getHurt();

const action1 = new SurvivorActions(sobrevivente1);
action1.doAction();
action1.doAction();
action1.doAction();
action1.doAction();
sobrevivente1.points = 150;

nível_sobrevivente1.checkLevel();

console.log(register);
// console.log(sobrevivente1.unlockedAbilities);
