const register = {
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

const date = new Date();
register.initialTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

module.exports = register;