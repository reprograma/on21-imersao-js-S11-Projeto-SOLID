const GameCharacter = require('./character');
const { formatDate } = require('./helpers')

const zombiesList = ['C-virus-zombie', 'T-Abyss Zombies', 'Necromancer']

function generateZombie() {
	const randomZombie = Math.floor(Math.random()*zombiesList.length)
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
				`O zombie de nome ${this.zombie.name} se feriu.`
			);
			if (this.zombie.hurts >= this.zombie.MAX_OF_HURTS) {
				this.zombie.alive = false;
				console.log(
					`O zombie de nome ${this.zombie.name} passou dessa para melhor.`
				);
				registerMessage(
					'dies',
					`O zombie de nome ${this.zombie.name} passou dessa para melhor.`
				);
			}
		}
	}
}


// const zombie = new Zombie('C-virus-zombie')
// const zombie2 = new Zombie('T-Abyss Zombies')
// const zombie3 = new Zombie('Necromancer')
// const zombie = new Zombie()
// console.log('ZOMBIE', zombie)
// console.log(zombie);
// console.log(Zombie.zombies);

module.exports =  { Zombie, ZombieHurts }

