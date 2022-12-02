const {
  Survivor,
  SurvivorLevel,
  SurvivorEquipment,
  SurvivorAbilitiesTree,
  SurvivorHurts,
  SurvivorActions,
} = require("./survivor");
const AbilitiesTree = require("./abilitiesTree");
const Equipment = require("./equipment");
const register = require("./register");

const abilitiesLevelYellow = ["+1 haduke"];
const abilitiesLevelOrange = ["+1 ação", "tesouro escondido"];
const abilitiesLevelBlue = [
  "+1 habilidade especial",
  "+1 velocidade",
  "+1 força",
];
const abilitiesLevelRed = [
  "+1 vida",
  "+1 equipamento em mãos",
  "+1 dano",
  "+1 otimismo",
];

const sobrevivente1 = new Survivor("Luara");
const arvoreDeHabilidades1 = new AbilitiesTree(
  abilitiesLevelYellow,
  abilitiesLevelOrange,
  abilitiesLevelBlue,
  abilitiesLevelRed
);

const sobrevivente_arvore = new SurvivorAbilitiesTree(
  sobrevivente1,
  arvoreDeHabilidades1
);

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

// const equipamento1 = new Equipment('agua', 'utilitarios');
// const equipamento2 = new Equipment('frigideira', 'luta');
// const equipamentos_sobrevivente1 = new SurvivorEquipment(sobrevivente1);
// equipamentos_sobrevivente1.addEquipment(equipamento1);
// equipamentos_sobrevivente1.removeEquipment(equipamento1);
// equipamentos_sobrevivente1.removeEquipment(equipamento2);

const sobrevivente_ferimento1 = new SurvivorHurts(sobrevivente1);
sobrevivente_ferimento1.getHurt();
sobrevivente_ferimento1.getHurt();

const action1 = new SurvivorActions(sobrevivente1);
action1.doAction();
action1.doAction();
action1.doAction();
action1.doAction();

console.log(register);
// console.log(sobrevivente1.unlockedAbilities);
