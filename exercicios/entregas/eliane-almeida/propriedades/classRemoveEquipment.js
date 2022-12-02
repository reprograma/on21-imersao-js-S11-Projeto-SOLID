import { registerMessage } from "./helpers.js";
import { Equipment } from "./classEquipment.js";

export class RemoveEquipment {
    constructor(equipmentToRemove , survivor )
    {
        this.equipmentToRemove = equipmentToRemove;
        this.survivor = survivor;
    }   

    removeEquipment(equipmentToRemove) {
        if (equipmentToRemove instanceof Equipment) {
            const qteHandsEquipments = this.survivor.handsEquipments.length;
            const qteBagEquipments = this.survivor.bagEquipments.length;

            this.survivor.handsEquipments = this.survivor.handsEquipments.filter(
                (equipment) => equipment !== equipmentToRemove
            );

            this.survivor.bagEquipments = this.survivor.bagEquipments.filter(
                (equipment) => equipment !== equipmentToRemove
            );

            if (
                qteHandsEquipments !== this.survivor.handsEquipments.length ||
                qteBagEquipments !== this.survivor.bagEquipments.length
            ) {
                registerMessage(
                    'survivorsEquipments',
                    `The name survivor  ${this.survivor.name} removed the equipment ${equipmentToRemove.name}.`
                );
            }
        }
    }
}

