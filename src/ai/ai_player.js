import validHands from "./vh1";
import { validateTurn } from "../gui/lib";
import handChecker from "../game/handChecker";
class AiPlayer {
  constructor(user) {
    this.matchStatus = {};
    this.name = user;
    this.points = 100;
  }

  update = (trkr, cards) => {
    Object.keys(trkr).forEach(k => (this.matchStatus[k] = trkr[k]));
    this.cards = cards;
    const isMyTurn = trkr.currentPlayerName === this.name;
    if (isMyTurn) {
      const possibleHands = validHands(cards, 1);
      const filteredHands = trkr.roundType
        ? possibleHands.filter(h => h._type === trkr.roundType)
        : possibleHands;

      const firstTurn = filteredHands.find(h =>
        h.cards.find(c => c.suit === "Diamonds" && c.value === "Three")
      );

      if (trkr.last3Turns.length === 0 && !firstTurn) return;

      if (firstTurn) {
        const turn = {
          playerName: this.name,
          name: firstTurn.name,
          payload: firstTurn
        };
        this.playTurn(firstTurn);
        return;
      }

      const payload = filteredHands
        .sort((a, b) => a._strength - b._strength)
        .filter(
          h => h._strength > trkr.last3Turns.slice().pop().payload._strength
        )
        .shift();
      if (payload && validateTurn(trkr, payload, this)) {
        const turn = {
          playerName: this.name,
          name: payload.name,
          payload
        };
        this.playTurn(turn);
        return;
      }
      const pass = handChecker("PASS");
      const turn = { playerName: this.name, name: "PASS", payload: pass };
      this.playTurn("PASS");
    }
  };
}

export default AiPlayer;
