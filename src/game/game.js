import Player from "./player";
import Match from "./match1";

class Game {
  constructor(user) {
    const p0 = new Player(user);
    this.players = [p0];
    this.history = [];
    this.currentMatch = null;
    this.keepPlaying = true;
  }

  addPlayer(user) {
    this.players.push(new Player(user));
  }

  play() {
    const match = new Match(this.players);
    this.currentMatch = match;
  }
}

export default Game;
