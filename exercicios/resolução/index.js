const Equipment = require("./equipment");
const register = require("./register");
const AbilitiesTree = require("./abilitiesTree");
const {
	Survivor,
	SurvivorLevel,
	SurvivorEquipment,
	SurvivorAbilitiesTree,
	Wounds,
	SurvivorActions,
  } = require("./survivor");

  

  const abilitiesYellow = ["+1 throw rope"];
  const abilitiesOrange = ["+1 dig and find water", "+1 climb to get fruits"];
  const abilitiesRed = ["+1 made a boat", "+1 made clothes", "+1 kill an big animal"];
  
  const survivor = new Survivor("Jessica");
  
  const abilitiesTreeGroup = new AbilitiesTree(
	abilitiesYellow,
	abilitiesOrange,
	abilitiesRed
  );
  
  const survivorAbilitiesTreeGroup = new SurvivorAbilitiesTree(
	survivor,
	abilitiesTreeGroup
  );
  
  const levelSurvivor = new SurvivorLevel(survivor);
  
  levelSurvivor.killZombie();
  levelSurvivor.killZombie();
  levelSurvivor.killZombie();
 
  survivor.points = 18;
  levelSurvivor.checkLevel();
  
  survivor.points = 43;
  levelSurvivor.checkLevel();
  
  survivor.points = 65;
  levelSurvivor.checkLevel();
  
  survivor.points = 90;
  levelSurvivor.checkLevel();

  survivor.points = 129;
  levelSurvivor.checkLevel();
  
  survivorAbilitiesTreeGroup.unlockAbilities();
  
  const equipment2 = new Equipment("rope", "utilities");
  const equipment1 = new Equipment("knife", "figth");
  const equipment = new SurvivorEquipment(survivor);
  equipment.addEquipment(equipment1);
  equipment.addEquipment(equipment2);
  
  // equipment.removeEquipment(equipment1);
  // equipment.removeEquipment(equipment2);
  
  const wounds = new Wounds(survivor);
  wounds.getHurt();

  const action = new SurvivorActions(survivor);
  action.doAction();
  action.doAction();
  action.doAction();
  action.doAction();
  survivor.points = 150;
  
  levelSurvivor.checkLevel();
  
  console.log(register);
