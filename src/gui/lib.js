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

export const disablePass = (tracker, player) => {
  const isNotMyTurn = tracker.currentPlayerName !== player.name;
  const floorIsOpen = tracker.roundType === null;
  if (isNotMyTurn) return true;
  if (floorIsOpen) return true;
  return false;
};
