import Deck from './deck1';
class Match {
  constructor(arr) {
    this.players = arr;
    this.winner = null;
    this.result = {};
    this.currentPlayer = null;
    
    const deck = new Deck();
    deck.deal(this.players);
    
  }
}