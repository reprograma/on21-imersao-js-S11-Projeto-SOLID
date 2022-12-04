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
const RemoveEquipment = require('./removeEquipment');
const Hurts = require('./hurts');
const {Zombie,
ZombieUtils}= require('./zombie');

const { registerMessage } = require('./helpers');

registerMessage('initialTime', `beginning of the game`);

//Zombie
const zombie1 = new Zombie('zombie1');
const zombie2 = new ZombieUtils(zombie1);
const hurt1 = new Hurts(zombie2 , 'zombie')
hurt1.getHurt();
hurt1.getHurt();
hurt1.getHurt();

const abilitiesLevelYellow1 = ['+1 haduke'];
const abilitiesLevelOrange1 = ['+1 action', 'hidden treasure'];
const abilitiesLevelRed1 = ['+1 life', '+1 equipment in hand', '+1 damage'];

const sobrevivente1 = new Survivor('Anna Maria');
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

nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.checkLevel();

sobrevivente1.points = 18;
nível_sobrevivente1.checkLevel();


sobrevivente1.points = 45;
nível_sobrevivente1.checkLevel();

sobrevivente1.points = 61;
nível_sobrevivente1.checkLevel();

sobrevivente1.points = 86;
nível_sobrevivente1.checkLevel();

sobrevivente1.points = 129;
nível_sobrevivente1.checkLevel();



const equipamento1 = new Equipment('water', 'utilities');
const equipamento2 = new Equipment('pan', 'fight');
const equipamento3 = new Equipment('Baseball bat', 'fight');
const equipamento4 = new Equipment('food', 'utilities');

const equipamentos_sobrevivente1 = new SurvivorEquipment(sobrevivente1);
 equipamentos_sobrevivente1.addEquipment(equipamento1);
 equipamentos_sobrevivente1.addEquipment(equipamento2);
 equipamentos_sobrevivente1.addEquipment(equipamento3);
 equipamentos_sobrevivente1.addEquipment(equipamento4);


const remove_equipamentos = new RemoveEquipment(equipamento1, sobrevivente1); 
remove_equipamentos.removeEquipment(equipamento1 );

const hurt2 = new Hurts(sobrevivente1 , 'survivors')
hurt2.getHurt();
hurt2.getHurt();
hurt2.getHurt();

const action1 = new SurvivorActions(sobrevivente1);
action1.doAction();
action1.doAction();

sobrevivente1.points = 150;

nível_sobrevivente1.checkLevel();

console.log(register);
