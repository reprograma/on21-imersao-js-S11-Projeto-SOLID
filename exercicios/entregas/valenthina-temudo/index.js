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

// HABILIDADES
const abilitiesLevelYellow1 = ['+1 haduke'];
const abilitiesLevelOrange1 = ['+1 ação', 'tesouro escondido'];
const abilitiesLevelRed1 = ['+1 vida', '+1 equipamento em mãos', '+1 dano'];

// Criando sobrevivente e árvore de habilidades
const survivor1 = new Survivor('Thina');
const abilitiesTree1 = new AbilitiesTree(
  abilitiesLevelYellow1,
  abilitiesLevelOrange1,
  abilitiesLevelRed1
);

const survivor_tree = new SurvivorAbilitiesTree(survivor1, abilitiesTree1);

// Subindo de nível e desbloqueando habilidades
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

// Sofrendo danos
const survivor_hurt1 = new SurvivorHurts(survivor1);
survivor_hurt1.getHurt();
survivor_hurt1.getHurt();

console.log(survivor1.bagEquipments);
console.log(survivor1.handsEquipments);

// Realizando ações
const action1 = new SurvivorActions(survivor1);
action1.doAction();
action1.doAction();
action1.doAction();

//Adicionando equipamentos
const equipment1 = new Equipment('água', 'utilitários');
const equipment2 = new Equipment('frigideira', 'luta');
const equipment_survivor1 = new SurvivorEquipment(survivor1);
equipment_survivor1.addEquipment(equipment1);
equipment_survivor1.removeEquipment(equipment2);

// Matando zumbi e ganhando 1 ponto
console.log(survivor1.points);
action1.killZombie();
console.log(survivor1.points);

// Atingindo nível vermelho e subindo pontos, desbloqueia outras habilidades
survivor1.points = 68;
level_survivor1.checkLevel();
survivor_tree.unlockAbilities();

survivor1.points = 88;
level_survivor1.checkLevel();
survivor_tree.unlockAbilities();

survivor1.points = 140;
level_survivor1.checkLevel();
survivor_tree.unlockAbilities();

// FIM DO JOGO
survivor1.points = 150;
level_survivor1.checkLevel();
survivor_tree.unlockAbilities();

console.log(register);
