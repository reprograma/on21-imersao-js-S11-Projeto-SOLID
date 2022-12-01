const GameCharacter = require('./character');
const { formatDate } = require('./helpers')

const zombiesList = ['C-virus-zombie', 'T-Abyss Zombies', 'Necromancer']

function generateZombie() {
  const randomZombie = Math.floor(Math.random() * zombiesList.length)
  const zombieName = zombiesList[randomZombie]

  return zombieName
}

class Zombie extends GameCharacter {
  name

  constructor() {
    super()

    this.name = generateZombie()
    this.MAX_OF_HURTS = 2;
    this.TOTAL_OF_ACTIONS = 1;
    this.date = formatDate();
  }
}
class ZombieUtils {
  zombie;

  constructor(zombie) {
    if (zombie instanceof Zombie) {
      this.zombie = zombie;
    }
  }
}
class ZombieHurts extends ZombieUtils {
  constructor(zombie) {
    super(zombie);
  }

  getHurt() {
    if (this.zombie.alive) {
      this.zombie.hurts;
      registerMessage(
        'hurts',
        `Zombie ${this.zombie.name} got hurt.`
      );
      if (this.zombie.hurts >= this.zombie.MAX_OF_HURTS) {
        this.zombie.alive = false;
        console.log(
          `Zombie ${this.zombie.name} is gone to a better place - or not.`
        );
        registerMessage(
          'dies',
          `Zombie ${this.zombie.name} is gone to a better place - or not.`
        );
      }
    }
  }
}

module.exports = { Zombie, ZombieHurts }