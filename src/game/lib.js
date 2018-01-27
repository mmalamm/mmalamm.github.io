import handChecker from "./handChecker";
export const nextPlayer = (match, turn) => {
  const idx = (match.players.map(p => p.name).indexOf(turn.playerName) + 1) % 4;
  return match.players[idx];
};

const diffCards = (hCs, tCs) => {
  console.log("hCs:::", hCs);
  console.log("tCs:::", tCs);
  const output = [];
  hCs.forEach(hC => {
    if (!tCs.some(tC => tC.suit === hC.suit && tC.value === hC.value)) {
      output.push(hC);
    }
  });
  return output;
};

const processTurn = (m, t) => {
  const currentPlayer = m.players.find(p => p.name === t.playerName);
  console.log(currentPlayer);
  const newHand = diffCards(currentPlayer.cards, t.payload.cards);
  console.log("newHand:::::", newHand);
  currentPlayer.cards = newHand;
};

export const matchUpdater = (match, turn) => {
  processTurn(match, turn);
  match.currentPlayer = nextPlayer(match, turn);
  match.turns = match.turns.concat([turn]);
  return trackerUpdater(match);
};

export const getRoundType = match => {
  const hand2beat = match.turns
    .slice(-3)
    .filter(({ payload: p }) => p._type === "PASS")
    .pop();
  return hand2beat ? hand2beat._type : null;
};

export const broadcast = (match, tracker) => {
  match.players.forEach(p => {
    p.update(tracker, p.cards);
  });
};
export const getFirstPlayerName = match => {
  console.log(match);
  const firstPlayerName = match.players.filter(player => {
    return player.cards.find(
      card => card.suit === "Diamonds" && card.value === "Three"
    );
  })[0].name;
  console.log(firstPlayerName);
  return firstPlayerName;
};
export const initialBroadcast = (match, playTurn) => {
  let tracker = {
    last3Turns: [],
    currentPlayerName: "getFirstPlayerName(match)",
    roundType: null,
    cardsLeft: createCardsLeft(match)
  };
  match.players.forEach(p => {
    p.update(tracker, p.cards);
    p.playTurn = playTurn;
  });
};

export const createCardsLeft = match => {
  const output = {};
  match.players.forEach(p => (output[p.name] = p.cards.length));
  return output;
};

export const trackerUpdater = match => {
  return {
    last3Turns: match.turns.slice(-3),
    currentPlayerName: match.currentPlayer.name,
    roundType: getRoundType(match),
    cardsLeft: createCardsLeft(match)
  };
};

export const isValidTurn = (match, turn) => {
  if (turn.payload._type === "PASS") return true;
  console.log(match);
  if (!handChecker(turn.payload.cards)) return false;
  const hand2beat = match.turns
    .slice(-3)
    .filter(({ payload: p }) => !(p._type === "PASS"))
    .pop();
  console.log("h2b:::::", hand2beat);
  if (!hand2beat) return true;
  const output =
    hand2beat.payload._type == turn.payload._type &&
    hand2beat.payload._strength < turn.payload._strength;
  console.log(output);
  return output;
};

export const isOver = match =>
  Boolean(match.players.filter(p => p.cards.length === 0).length);
