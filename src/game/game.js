import Player from "./player";
import Match from "./match/match";
import AiPlayer from "../ai/ai_player";

class Game {
  constructor(user) {
    const p0 = new Player(user);
    this.players = [p0];
    this.history = [];
    // this.currentMatch = null;
    // this.keepPlaying = true;
  }

  addPlayer(user) {
    this.players.push(new Player(user));
  }

  addAiPlayer(user) {
    this.players.push(new AiPlayer(user));
  }

  play() {
    // const gameStore = createGameStore(this.players)
    if (!(this.currentMatch)) {
      runMatch(this).then(game => {
        ///////////
        window.ms = null;
        window.gs = null;
        //////////
        const result = game.currentMatch.getMatchStatus$.getValue();
        game.history.push(result);
        console.log("here is your game:::>", game);
        game.players.forEach(p => {
          p.points += result.result[p.name];
        });
        game.currentMatch = null;
      });
    } else {
      return console.log('finish this match first silly');
    }
  }
}

export default Game;

const runMatch = game => {
  const players = game.players;
  return new Promise((resolve, reject) => {
    const match = new Match(players);
    game.currentMatch = match;
    match.getMatchStatus$.subscribe(
      d => console.log("match updated"),
      e => reject(Error(e)),
      d => resolve(game)
    );
  });
};
