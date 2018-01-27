match sequence

first match begins and players are dealt their cards

current player
last3turns
handToBeat



tehn the player with the 3dice goes first

const _match = {
      players: arr,
      currentPlayer: null,
      turns: []
    };

this.tracker = {
      last3Turns: [],
      currentPlayer: null,
      roundType: null,
      cardsLeft: {}
    };

class Hand {
  constructor(type, cards, strength, name) {
    this.name = name;
    this.cards = cards;
    this._type = type;
    this._strength = strength;
  }
}

Turn:
{
  playerName: player,
  payload: hand or pass
}