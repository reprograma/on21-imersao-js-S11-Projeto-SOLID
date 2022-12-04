class AbilitiesTree {
	abilitiesLevelYellow = [];
	abilitiesLevelOrange = [];
	abilitiesLevelRed = [];

	constructor(abilitiesLevelYellow, abilitiesLevelOrange, abilitiesLevelRed) {
		this.abilitiesLevelYellow = abilitiesLevelYellow;
		this.abilitiesLevelOrange = abilitiesLevelOrange;
		this.abilitiesLevelRed = abilitiesLevelRed;
	}
}

module.exports = AbilitiesTree;