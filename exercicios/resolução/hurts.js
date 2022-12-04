const { registerMessage } = require('./helpers');
const RemoveEquipment = require('./removeEquipment');


class Hurts{
    character;
    typecharacter;
    constructor(character , typecharacter){
        this.character = character;
        this.typecharacter = typecharacter;
    }
        getHurt(){
        if (this.character.alive) {

    this.character.hurts++;
    registerMessage(
        'hurts',
        `The ${this.typecharacter} ${this.character.name} got hurt.`
    );
        if(this.typecharacter === 'survivors'){

        const auxqtdequipment = this.character.handsEquipments.length-1;
        const remove_equipamentos = new RemoveEquipment(this.character.handsEquipments[auxqtdequipment], this.character); 

        remove_equipamentos.removeEquipment(this.character.handsEquipments[auxqtdequipment]);
    }

    if (this.character.hurts >= this.character.MAX_OF_HURTS) 
        {
            this.character.alive = false;
            registerMessage(
                'dies',
                `The ${this.typecharacter} ${this.character.name} went from that for the better.`
            );  
        }
 }
}
}

module.exports = Hurts;