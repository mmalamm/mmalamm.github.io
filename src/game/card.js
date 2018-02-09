class Card {
  constructor(suit, value, rank, ord) {
    return Object.freeze({
      suit,
      value,
      _rank: rank,
      ord
    });
  }
}

export default Card;
