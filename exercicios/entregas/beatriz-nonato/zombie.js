const Character = require('./character');
const { registerMessage } = require('./helpers');

class Zombie extends Character {
    name;
    constructor(name) {
        super();
        this.name = name;
        this.MAX_OF_HURTS = 2;
        this.TOTAL_OF_ACTIONS =1;
    }
}

class ZombieUtils extends Zombie {
    zombie;
    
    constructor(zombie) {
        super();
        if (zombie instanceof Zombie) {
            this.zombie = zombie;
        }
        registerMessage('zombie', `A name zombie ${zombie.name} was raised.`);
        
    }
    
    getHurt(){
        if (this.zombie.alive) {
            this.zombie.hurts++;
            registerMessage(
                'zombie',
                `The zombie got hurt.`
            );

            if (this.zombie.hurts >= this.zombie.MAX_OF_HURTS) {
                console.log('life', this.zombie.hurts)
                console.log(this.zombie.MAX_OF_HURTS)
                this.zombie.alive = false;
                console.log(`The zombie went from that for the better.`);
                registerMessage(
                    'dies',
                    `The zombie went from that for the better.`
                );  
            }
        }
    }
}
            
module.exports = { Zombie, ZombieUtils };