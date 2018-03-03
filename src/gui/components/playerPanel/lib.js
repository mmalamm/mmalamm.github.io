export const validateTurn = (tracker, hand, player) => {
  if (hand === null) return false;
  if (tracker.currentPlayerName !== player.name) return false;
  if (
    tracker.last3Turns.length === 0 &&
    !hand.cards.find(c => c.suit === "Diamonds" && c.value === "Three")
  )
    return false;
  const hand2beat = tracker.last3Turns
    .filter(({ payload: p }) => !(p._type === "PASS"))
    .pop();
  if (!hand2beat) return true;
  const output =
    hand2beat.payload._type == hand._type &&
    hand2beat.payload._strength < hand._strength;
  return output;
};

const getRoundType = tracker => {
  if (!tracker.last3Turns) return null;
  const turn2Beat = tracker.last3Turns
    .filter(turn => turn.payload._type !== "PASS")
    .pop();
  return turn2Beat ? turn2Beat.payload._type : null;
};

export const disablePass = (tracker, player) => {
  const isNotMyTurn = tracker.currentPlayerName !== player.name;
  const floorIsOpen = getRoundType(tracker) === null;
  if (isNotMyTurn) return true;
  if (floorIsOpen) return true;
  return false;
};
