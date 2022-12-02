const { GameCharacters } = require("./gamerCharacters");

class Survivor extends GameCharacters {
  name;
  level = 'Azul';
  constructor(name){
    super();
    this.name = name;

  }

  MAX_OF_HURTS = 3;
  TOTAL_OF_ACTIONS = 3;
}