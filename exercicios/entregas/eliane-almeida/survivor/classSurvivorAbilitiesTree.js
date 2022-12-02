import { SurvivorUtils } from "./classSurvivor.js";
import { AbilitiesTree } from "../propriedades/classAbilitiesTree.js";

export class SurvivorAbilitiesTree extends SurvivorUtils {
	constructor(survivor, abilitiesTree) {
		if (abilitiesTree instanceof AbilitiesTree) {
			super(survivor);
			this.survivor.abilitiesTree = abilitiesTree;
		}
	}
}