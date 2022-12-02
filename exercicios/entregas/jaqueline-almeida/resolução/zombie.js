const GameCharacter = require("./character");
const { registerMessage } = require("./helpers");

class Zombie extends GameCharacter {
  name;
  constructor(name) {
    super();
    this.name = name;
    this.MAX_OF_HURTS = 2;
    this.TOTAL_OF_ACTIONS = 1;
  }
}

class ZombieUtils extends Zombie {
  zombie;
  constructor(zombie) {
    super();
    if (zombie instanceof Zombie) {
      this.zombie = zombie;
    }
    registerMessage("zombie", `A zombie of name ${zombie.name} was created.`);
  }

  getHurt() {
    if (this.zombie.alive) {
      this.zombie.hurts++;
      registerMessage("zombie", `The zombie got hurt.`);
      if (this.zombie.hurts >= this.zombie.MAX_OF_HURTS) {
        console.log("vida", this.zombie.hurts);
        console.log(this.zombie.MAX_OF_HURTS);
        this.zombie.alive = false;
        console.log(`The zombie dead.`);
      }
      registerMessage("dies", `The zombie is dead.`);
    }
  }
}

module.exports = { Zombie, ZombieUtils };
