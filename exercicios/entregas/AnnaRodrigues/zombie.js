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
        registerMessage('zombie', `Um zombie de nome ${zombie.name} foi criado`);

    }

 getHurt(){
    this.zombie.hurts++;
    registerMessage(
        'zombie',
        `O zumbi se feriu.`
    );
    if (this.zombie.hurts >= this.zombie.MAX_OF_HURTS) 
        {
            this.survivor.alive = false;
            console.log(
                `O zumbi passou dessa para melhor.`
            );
            registerMessage(
                'dies',
                `O zumbi passou dessa para melhor.`
            );  
        }
 }
}

module.exports ={ Zombie ,ZombieUtils};