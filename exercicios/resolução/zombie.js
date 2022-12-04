
const GameCharacter = require('./character');
const { registerMessage } = require('./helpers');


class Zombie extends GameCharacter{
    name;
 constructor(name) {
    super();
    this.name = name;
    this.MAX_OF_HURTS = 2;
    this.TOTAL_OF_ACTIONS =1;


}
}
class ZombieUtils  extends Zombie{
	zombie;

	constructor(zombie) {
        super();
		if (zombie instanceof Zombie) {
			this.zombie = zombie;
		}
        registerMessage('zombie', `the name zombie ${zombie.name} was raised.`);

    }


}

module.exports ={ Zombie ,ZombieUtils};