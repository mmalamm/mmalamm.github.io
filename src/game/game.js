import Player from './player.js';

class Game {
  constructor(user) {
    const p0 = new Player(user);
    this.players = [p0];
    this.history = [];
  }

  addPlayer(user) {
    this.players.push(new Player(user))
  }

  play() {
    const match = new Match(this.players);
    return await match.run()
  }


}