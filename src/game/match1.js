import Deck from "./deck1";
class Match {
  constructor(arr) {
    this.players = arr;
    this.winner = null;
    this.result = {};
    this.tracker = {
      turns: [],
      currentPlayer: null,
      round: null
    };

    const deck = new Deck();
    deck.deal(this.players);
  }

  getTurn(p) {
    
  }

  run() {
    this.tracker.currentPlayer = this.players.find(p =>
      p.hand.includes(c => c.suit === "Diamonds" && c.value === "Three")
    );
    const cP = this.tracker.currentPlayer;
    
    while(!(this.winner)) {
      this.getTurn(cP).then
    }
  }
}

export default Match;