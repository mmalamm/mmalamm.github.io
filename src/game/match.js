class Match {
  constructor(arr) {
    this.players = arr;
    this.winner = null;
    this.result = {};
    this.currentPlayer = null;
    this.pile = [];
    this.tracker = {
      turn: 0,
      round: null
    };
  }

  verifyHand(arr) {
    checkHand(arr);
    // perform checks and returns hand object or reprompts player until hand is good;
    // can even create timer
  }

  checkWinner() {
    let winner = this.players
      .filter(
      player => player.hand.length === 0
      )[0];
    if (winner) return winner;
    return null;
  }

  promptPlayer(player) {
    let hand = await player.getTurn()// async get player input, returns hand object
    verifyHand(hand);
    this.pile.push(hand);

    checkWinner();

    this.tracker.turn++;
    this.tracker.round = hand.type;
    this.currentPlayer = players[(players.indexOf(currentPlayer) + 1) % 4];
  }


  run() {
    if (!currentPlayer) {
      currentPlayer = players.filter(player => {
        player.hand.includes(card =>
          card.suit === 'diamonds' &&
          card.value === 'three'
        );
      })[0];
      this.promptPlayer(currentPlayer);
    }

    while (!winner) {
      promptPlayer(currentPlayer);
    }

    // use result to update players and return players array
  }
}
