'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// ^ command to output app.js to the right file/folder

// live-server public
// ^ command to start hot reloading workflow

var valsObj = {
  'Three': '3',
  'Four': '4',
  'Five': '5',
  'Six': '6',
  'Seven': '7',
  'Eight': '8',
  'Nine': '9',
  'Ten': '10',
  'Jack': 'J',
  'Queen': 'Q',
  'King': 'K',
  'Ace': 'A',
  'Two': '2'
};

var suitsObj = {
  'Spades': '♠',
  'Hearts': '♥',
  'Clovers': '♣',
  'Diamonds': '♦'
};

var compRank = function compRank(a, b) {
  return a._rank - b._rank;
};
var maxRank = function maxRank(cards) {
  return cards.slice().sort(compRank).pop()._rank;
};

var Card = function () {
  function Card(suit, value, rank) {
    _classCallCheck(this, Card);

    this.suit = suit;
    this.value = value;
    this._rank = rank;
    this._id = Date.now() + rank.toString();
    this.select = this.select.bind(this);
  }

  _createClass(Card, [{
    key: 'select',
    value: function select(e) {
      console.log('this:', this);
      console.log('e:', e);
    }
  }]);

  return Card;
}();

var Deck = function () {
  function Deck() {
    var _this = this;

    _classCallCheck(this, Deck);

    this.cards = [];
    var cardSuits = ['Diamonds', 'Clovers', 'Hearts', 'Spades'];
    var cardVals = ['Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace', 'Two'];
    var i = 0;
    cardVals.forEach(function (cardVal) {
      cardSuits.forEach(function (cardSuit) {
        var card = new Card(cardSuit, cardVal, i);
        _this.cards.push(card);
        i++;
      });
    });
    this.shuffle();
  }

  _createClass(Deck, [{
    key: 'shuffle',
    value: function shuffle() {
      var shuffler = function shuffler(arr) {
        for (var i = arr.length; i; i--) {
          var j = Math.floor(Math.random() * i);
          var _ref = [arr[j], arr[i - 1]];
          arr[i - 1] = _ref[0];
          arr[j] = _ref[1];
        }
      };
      shuffler(this.cards);
      return this;
    }
  }, {
    key: 'deal',
    value: function deal() {
      return this.shuffle().cards.slice().splice(0, 13).sort(compRank);
    }
  }]);

  return Deck;
}();

var Hand = function Hand(type, cards, strength, name) {
  _classCallCheck(this, Hand);

  this.name = name;
  this.cards = cards;
  this._type = type;
  this._strength = strength;
};

var handChecker = function handChecker(userInput) {
  var arr = userInput.slice().sort(compRank),
      vals = arr.slice().sort(compRank).map(function (c) {
    return c.value;
  }),
      uniqs = _.uniq(vals);
  var str = void 0,
      name = void 0;
  switch (arr.length) {
    case 1:
      str = arr[0]._rank;
      name = arr[0].value + ' of ' + arr[0].suit;
      return new Hand('Single', arr, 100 + str, name);
    case 2:
      if (uniqs.length !== 1) return null;
      str = maxRank(arr);
      name = 'Double ' + arr[0].value;
      return new Hand('Double', arr, 200 + str, name);
    case 3:
      if (uniqs.length !== 1) return null;
      str = maxRank(arr);
      name = 'Triple ' + arr[0].value;
      return new Hand('Triple', arr, 300 + str, name);
    case 5:
      var comboChecker = function () {
        var countChecker = function countChecker(val, qty) {
          return arr.filter(function (c) {
            return c.value === val;
          }).length === qty;
        };
        var isStraight = function (input) {
          var checker = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace', 'Two'];
          var i = checker.indexOf(uniqs[0]);
          return _.isEqual(uniqs, checker.slice(i, i + 5));
        }(arr),
            isFlush = function (input) {
          return _.uniq(input.map(function (c) {
            return c.suit;
          })).length === 1;
        }(arr),
            isRoyalFlush = function (input) {
          return isFlush && isStraight;
        }(arr);
        if (isRoyalFlush) {
          var _str = maxRank(arr);
          return {
            strength: _str + 800,
            name: 'Royal Flush'
          };
        }
        if (isFlush) {
          var _str2 = maxRank(arr);
          return {
            strength: _str2 + 500,
            name: 'Flush of ' + arr[0].suit
          };
        }
        if (isStraight) {
          var _str3 = maxRank(arr);
          var mainCard = arr.find(function (c) {
            return c._rank === _str3;
          });
          return {
            strength: _str3 + 400,
            name: 'Straight to ' + mainCard.value + ' of ' + mainCard.suit
          };
        }
        var isHouse = function (input) {
          var twoVals = uniqs.length === 2;
          var hasTrip = countChecker(uniqs[0], 3) || countChecker(uniqs[1], 3);
          var hasDub = countChecker(uniqs[0], 2) || countChecker(uniqs[1], 2);
          return twoVals && hasTrip && hasDub;
        }(arr);
        if (isHouse) {
          var trip = countChecker(uniqs[0], 3) ? uniqs[0] : uniqs[1];
          var _str4 = maxRank(arr.filter(function (c) {
            return c.value === trip;
          }));
          return {
            strength: _str4 + 600,
            name: 'House of ' + trip
          };
        }
        var isBomb = function (input) {
          var twoVals = uniqs.length === 2;
          var hasQuad = countChecker(uniqs[0], 4) || countChecker(uniqs[1], 4);
          return twoVals && hasQuad;
        }(arr);
        if (isBomb) {
          var quad = countChecker(uniqs[0], 4) ? uniqs[0] : uniqs[1];
          var _str5 = maxRank(arr.filter(function (c) {
            return c.value === quad;
          }));
          return {
            strength: _str5 + 700,
            name: 'Bomb of ' + quad
          };
        }
        return null;
      }();
      if (!comboChecker) return null;
      str = comboChecker.strength;
      name = comboChecker.name;
      return new Hand('Combo', arr, str, name);
    default:
      return null;
  }
};

var myDeck = new Deck();
var myHand = myDeck.deal();

console.log('heya! world');

// selecting cards and outputting hand behaviors
var selectedCards = [];
var selectCard = function selectCard(e) {
  selectedCards.push(e.target.firstChild);
  console.log('heya there', selectedCards);
};

var renderHand = function renderHand() {
  var template = React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      'Big 2 Hand Checker'
    ),
    React.createElement(
      'p',
      null,
      'Select some cards to check a hand!'
    ),
    React.createElement('div', null),
    React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        null,
        myHand.map(function (card) {
          var styles = {
            color: card.suit === 'Diamonds' || card.suit === 'Hearts' ? 'red' : 'black',
            backgroundColor: 'white',
            fontSize: '24px'
          };
          return React.createElement(
            'section',
            {
              key: card._id,
              style: styles,
              onClick: selectCard },
            React.createElement(
              'p',
              null,
              card.value + card.suit
            )
          );
        })
      )
    )
  );

  ReactDOM.render(template, document.getElementById('app'));
};

renderHand();
