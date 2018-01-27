class Player {
  constructor(user) {
    this.matchStatus = {};
    this.name = user;
    this.points = 100;
    this.playTurn = () => {};
  }

  update = trkr => {
    Object.keys(trkr).forEach(k => (this.matchStatus[k] = trkr[k]));
  };
}

export default Player;
