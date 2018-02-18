import validHands from "./valid_hands";
import handChecker from "../handChecker";

const getRoundType = tracker => {
  const turn2Beat = tracker.last3Turns
    .filter(turn => turn.payload._type !== "PASS")
    .pop();
  return turn2Beat ? turn2Beat.payload._type : null;
};
const getHand2Beat = tracker => {
  const turn2Beat = tracker.last3Turns
    .filter(turn => turn.payload._type !== "PASS")
    .pop();
  return turn2Beat ? turn2Beat.payload : null;
};
const has3Dice = cards =>
  cards.find(c => c.value === "Three" && c.suit === "Diamonds");
const getLowestOfTypeFn = hands => type =>
  hands.filter(h => h._type === type).shift();
const createAiTurnPayload = (trkr, cards) => {
  const myHands = validHands(cards).sort((a, b) => a._strength - b._strength);
  if (has3Dice(cards)) {
    return myHands.filter(h => has3Dice(h.cards)).pop();
  }
  const hand2Beat = getHand2Beat(trkr);
  const roundType = getRoundType(trkr);
  if (hand2Beat) {
    const nextLowestHand = myHands
      .filter(h => h._type === roundType)
      .filter(h => h._strength > hand2Beat._strength)
      .shift();
    return nextLowestHand ? nextLowestHand : handChecker("PASS");
  } else {
    const lowestOfType = getLowestOfTypeFn(myHands);
    return (
      lowestOfType("Combo") ||
      lowestOfType("Triple") ||
      lowestOfType("Double") ||
      myHands.shift()
    );
  }
};
export default createAiTurnPayload;
