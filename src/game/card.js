class Card {
  constructor(suit, value, rank) {
    this.suit = suit;
    this.value = value;
    this.rank = () => {
      return rank;
    };
    return Object.freeze({
      suit,
      value,
      rank: this.rank
    });
  }
}

export default Card;
