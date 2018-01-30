class Player {
  constructor(user) {
    this.matchStatus = {};
    this.name = user;
    this.points = 100;
    this.playTurn = () => {};
  }

  update = (trkr, cards) => {
    Object.keys(trkr).forEach(k => (this.matchStatus[k] = trkr[k]));
    this.cards = cards;
  };
}

export default Player;
