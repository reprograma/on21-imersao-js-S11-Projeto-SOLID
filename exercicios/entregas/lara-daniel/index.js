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

/* instanciando habilidades */
const abilitiesLevelYellow1 = ['+1 haduke'];
const abilitiesLevelOrange1 = ['+1 ação', 'tesouro escondido'];
const abilitiesLevelRed1 = ['+1 vida', '+1 equipamento em mãos', '+1 dano'];

/* INICIO JOGO: criando sobrevivente e arvore de habilidades */
const sobrevivente1 = new Survivor('Maria');
const arvoreDeHabilidades1 = new AbilitiesTree(
	abilitiesLevelYellow1,
	abilitiesLevelOrange1,
	abilitiesLevelRed1
);

const sobrevivente_arvore = new SurvivorAbilitiesTree(
	sobrevivente1,
	arvoreDeHabilidades1
);

/* Subindo para o Level Vermelho com ganho de pontos e desbloqueando habilidade 1 de cada nível */
sobrevivente1.points = 6;
const nível_sobrevivente1 = new SurvivorLevel(sobrevivente1);
nível_sobrevivente1.checkLevel();
sobrevivente_arvore.unlockAbilities();

sobrevivente1.points = 20;
nível_sobrevivente1.checkLevel();
sobrevivente_arvore.unlockAbilities();

sobrevivente1.points = 45;
nível_sobrevivente1.checkLevel();
sobrevivente_arvore.unlockAbilities();

/* Intanciando e adicionado equipamentos ao sobrevivente */

const equipamento1 = new Equipment('agua', 'utilitarios');
const equipamento2 = new Equipment('frigideira', 'luta');
const equipamento3 = new Equipment('faca', 'luta');
const equipamento4 = new Equipment('martelo', 'luta');
const equipamento5 = new Equipment('sal', 'utilitarios');
const equipamento6 = new Equipment('tesoura', 'utilitarios');
const equipamento7 = new Equipment('escudo', 'luta');
const equipamentos_sobrevivente1 = new SurvivorEquipment(sobrevivente1);
equipamentos_sobrevivente1.addEquipment(equipamento1);
equipamentos_sobrevivente1.addEquipment(equipamento2);
equipamentos_sobrevivente1.addEquipment(equipamento3);
equipamentos_sobrevivente1.addEquipment(equipamento4);
equipamentos_sobrevivente1.addEquipment(equipamento5);
equipamentos_sobrevivente1.addEquipment(equipamento6);
equipamentos_sobrevivente1.addEquipment(equipamento7);
// equipamentos_sobrevivente1.removeEquipment(equipamento1);
// equipamentos_sobrevivente1.removeEquipment(equipamento2);

/* Sobrevivente sofre danos e perde capacidade de armazenar equipamentos */
const sobrevivente_ferimento1 = new SurvivorHurts(sobrevivente1);
sobrevivente_ferimento1.getHurt();
sobrevivente_ferimento1.getHurt();

console.log(sobrevivente1.bagEquipments);
console.log(sobrevivente1.handsEquipments);

equipamentos_sobrevivente1.setSlots();
equipamentos_sobrevivente1.removeEquipment(equipamento7)
// equipamentos_sobrevivente1.setSlots();
equipamentos_sobrevivente1.removeEquipment(equipamento6)
// equipamentos_sobrevivente1.setSlots();

console.log(sobrevivente1.bagEquipments);
console.log(sobrevivente1.handsEquipments);

/* Realiza ações */

const action1 = new SurvivorActions(sobrevivente1);
action1.doAction();
action1.doAction();
action1.doAction();
action1.doAction();

/* Mata zumbis e sobe +1 ponto de experiência */
console.log(sobrevivente1.points);
action1.killZombie();
action1.killZombie(); 
console.log(sobrevivente1.points);

/* Ao atingir nível Vermelho, subindo com a pontuação, desbloqueia as próximas habilidades da árvore */

sobrevivente1.points = 70;
nível_sobrevivente1.checkLevel();
sobrevivente_arvore.unlockAbilities();

sobrevivente1.points = 90;
nível_sobrevivente1.checkLevel();
sobrevivente_arvore.unlockAbilities();

sobrevivente1.points = 130;
nível_sobrevivente1.checkLevel();
sobrevivente_arvore.unlockAbilities();

/* FIM DE JOGO: Sobrevivente atinge +150 pontos de experiência */
sobrevivente1.points = 155;
nível_sobrevivente1.checkLevel();
sobrevivente_arvore.unlockAbilities();

console.log(register);
