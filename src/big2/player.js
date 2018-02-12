class Player {
  constructor(user) {
    this.name = user;
    this.points = 100;
  }
  registerMatch = (playTurn, getMatchStatus$, myCards$) => {
    this.playTurn = playTurn;
    this.getMatchStatus$ = getMatchStatus$;
    this.myCards$ = myCards$;
  };
}

export default Player;
