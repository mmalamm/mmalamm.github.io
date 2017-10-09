class Card {
  constructor(suit, value, rank, ord) {
    this.rank = () => {
      return rank;
    };
    return Object.freeze({
      suit,
      value,
      rank: this.rank,
      ord
    });
  }
}

export default Card;
