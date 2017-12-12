class Card {
  constructor(suit, value, rank, ord) {
    this.rank = () => {
      return rank;
    };
    return Object.freeze({
      suit,
      value,
      rank: this.rank,
      _rank: rank,
      ord
    });
  }
}

export default Card;
