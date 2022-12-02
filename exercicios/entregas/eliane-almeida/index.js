import { Survivor } from './survivor/classSurvivor.js';
import { SurvivorLevel } from './survivor/classSurvivorLevels.js';
import { SurvivorEquipment } from './survivor/classSurvivorEquipment.js';
import { SurvivorAbilitiesTree } from './survivor/classSurvivorAbilitiesTree.js';
import { SurvivorHurts } from './survivor/classSurvivorHurts.js';
import { SurvivorActions } from './survivor/classSurvivorActions.js';

import { AbilitiesTree } from './propriedades/classAbilitiesTree.js';
import { Equipment } from './propriedades/classEquipment.js'; 
import { Hurts } from './propriedades/classHurts.js';
import { register } from './propriedades/classRegister.js';
import { registerMessage } from './propriedades/helpers.js';
import { Zombie } from './zombie/classZombie.js';
import { ZombieUtils } from './zombie/classZombie.js';
import { RemoveEquipment } from './propriedades/classRemoveEquipment.js';

registerMessage('initialTime', `beginning of the game`);

//Zombie
const zombie1 = new Zombie('zombie1');
const zombie2 = new ZombieUtils(zombie1);

const hurt1 = new Hurts(zombie2 , 'zombie')
hurt1.getHurt();
hurt1.getHurt();
hurt1.getHurt();

const abilitiesLevelYellow1 = ['+1 haduke'];
const abilitiesLevelOrange1 = ['+1 ação', 'tesouro escondido'];
const abilitiesLevelRed1 = ['+1 vida', '+1 equipamento em mãos', '+1 dano'];

const sobrevivente1 = new Survivor('Luara');
const arvoreDeHabilidades1 = new AbilitiesTree(
	abilitiesLevelYellow1,
	abilitiesLevelOrange1,
	abilitiesLevelRed1
);

const sobreviventeArvore = new SurvivorAbilitiesTree(
	sobrevivente1,
	arvoreDeHabilidades1
);

const nivelSobrevivente1 = new SurvivorLevel(sobrevivente1);

nivelSobrevivente1.killZombie();
nivelSobrevivente1.killZombie();
nivelSobrevivente1.killZombie();
nivelSobrevivente1.killZombie();
nivelSobrevivente1.killZombie();
nivelSobrevivente1.killZombie();
nivelSobrevivente1.checkLevel();

sobrevivente1.points = 18;
nivelSobrevivente1.checkLevel();

sobrevivente1.points = 48;
nivelSobrevivente1.checkLevel();

sobrevivente1.points = 61;
nivelSobrevivente1.checkLevel();

sobrevivente1.points = 86;
nivelSobrevivente1.checkLevel();

sobrevivente1.points = 129;
nivelSobrevivente1.checkLevel();

const equipamento1 = new Equipment('agua', 'utilitarios');
const equipamento2 = new Equipment('frigideira', 'luta');
const equipamento3 = new Equipment('ar', 'luta');
const equipamento4 = new Equipment('magia', 'utilitarios');

const equipamentosSobrevivente1 = new SurvivorEquipment(sobrevivente1);
equipamentosSobrevivente1.addEquipment(equipamento1);
equipamentosSobrevivente1.addEquipment(equipamento2);
equipamentosSobrevivente1.addEquipment(equipamento3);
equipamentosSobrevivente1.addEquipment(equipamento4);

const removeEquipamentos = new RemoveEquipment(equipamento1, sobrevivente1); 
removeEquipamentos.removeEquipment(equipamento1);

const hurt2 = new Hurts(sobrevivente1 , 'survivors')
hurt2.getHurt();
hurt2.getHurt();
hurt2.getHurt();

const action1 = new SurvivorActions(sobrevivente1);
action1.doAction();
action1.doAction();

sobrevivente1.points = 150;

nivelSobrevivente1.checkLevel();

console.log(register);
//console.log(sobrevivente1.unlockedAbilities);