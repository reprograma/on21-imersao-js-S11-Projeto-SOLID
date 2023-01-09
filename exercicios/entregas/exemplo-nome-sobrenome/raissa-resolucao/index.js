const {
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

const nível_sobrevivente1 = new SurvivorLevel(sobrevivente1);

nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.killZombie();
nível_sobrevivente1.checkLevel();