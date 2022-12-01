class AbilitiesTree {
  abilitiesLevelYellow = ['+1 ação'];
  abilitiesLevelOrange = ['+1 dano', 'tesouro escondido'];
  abilitiesLevelRed = [
    '+1 ação de movimento',
    '+1 equipamento em mãos',
    '+1 vida',
  ];

  constructor(abilitiesLevelYellow, abilitiesLevelOrange, abilitiesLevelRed) {
    this.abilitiesLevelYellow = abilitiesLevelYellow;
    this.abilitiesLevelOrange = abilitiesLevelOrange;
    this.abilitiesLevelRed = abilitiesLevelRed;
  }
}

module.exports = AbilitiesTree;
