import Player from './player.js';

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
    while(this.keepPlaying) {
      const match = new Match(this.players);
      this.currentMatch = match;
      match.run();
    }
  }


}