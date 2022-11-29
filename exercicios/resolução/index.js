const { Survivor, SurvivorLevel, SurvivorEquipment } = require('./survivor');

const sobrevivente1 = new Survivor('Luara');
// sobrevivente1.points = 6;
// const nivel_sobrevivente1 = new SurvivorLevel(sobrevivente1);
// nivel_sobrevivente1.checkLevel();
// sobrevivente1.points = 20;
// nivel_sobrevivente1.checkLevel();
// sobrevivente1.points = 45;
// nivel_sobrevivente1.checkLevel();

const equipamento1 = new Equipment('agua', 'utilitarios');
const equipamentos_sobrevivente1 = new SurvivorEquipment(sobrevivente1);
equipamentos_sobrevivente1.addEquipment(equipamento1);
equipamentos_sobrevivente1.removeEquipment(equipamento1);

console.log(register);
// console.log(sobrevivente);
