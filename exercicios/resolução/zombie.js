const GameCharacter = require("./character");
const { registerMessage } = require('./helpers');


class Zombie extends GameCharacter {
    id;
    
    constructor(id){
        super()
        this.id = id;
        this.TOTAL_OF_ACTIONS = 1;

        registerMessage('zombies', `Zombie de id: ${this.id} foi criado`);
    }
    
}

class ZombieUtils extends Zombie {
    constructor(zombie){
        super(zombie);
    }

    zombiDie(){
        if(this.hurts > this.MAX_OF_HURTS){
            this.alive = false;
            registerMessage('killed', 'O zumbi finalmente morreu!')
        }

    }

}

module.exports = { 
    Zombie,
    ZombieUtils,
};