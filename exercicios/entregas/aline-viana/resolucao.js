export class Equipment {
	name;
	type;

	constructor(name, type) {
		this.name = name;
		this.type = type;
	}
}

export const Level = {
	blue: 'blue',
	yellow: 'yellow',
	orange: 'orange',
	red: 'red',
};

export const register = {
	initialTime: '',
	survivors: [],
	equipment: [],
	hurts: [],
	dies: [],
	abilities: [],
	survivorsEquipments: [],
	survivorsLevels: [],
	actions: [],
	gameLevel: [],
	finalTime: '',
};