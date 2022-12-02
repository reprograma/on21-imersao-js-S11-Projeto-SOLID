class Zombie extends GameCharacter {
  id;

  constructor() {
    super();
    this.id = (Math.random() * 1000).toFixed();

    this.MAX_OF_HURTS = 2;
    this.TOTAL_OF_ACTIONS = 1;

    registerMessage("zombies", `Um zumbi de id ${this.id} foi criado`);
  }
}

module.exports = Zombie;
