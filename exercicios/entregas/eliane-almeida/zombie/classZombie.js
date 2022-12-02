import { GamerCharacter } from "../propriedades/classCharacter";
import { registerMessage } from "../propriedades/helpers";

export class Zombie extends GamerCharacter{
    name;

    constructor(name) {
        super();
        this.name = name;
        this.MAX_OF_HURTS = 2;
        this.TOTAL_OF_ACTIONS =1;
    
    }
}

export class ZombieUtils  extends Zombie{
	zombie;
    
	constructor(zombie) {
        super();
		if (zombie instanceof Zombie) {
			this.zombie = zombie;
		}
        registerMessage('zombie', `Um zombie de nome ${zombie.name} foi criado`);
    }
}