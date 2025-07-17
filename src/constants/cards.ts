export type Suit = {
  rank: number;
  name: string;
  symbol: string;
  color: "red" | "black";
};

export type Number = {
  rank: number;
  display: string;
  word: string;
};

export type Card = {
  id: string;
  suit: Suit;
  number: Number;
};

export const suits: Suit[] = [
  {
    rank: 0,
    name: "Flower",
    symbol: "♣",
    color: "black",
  },
  {
    rank: 1,
    name: "Spades",
    symbol: "♠",
    color: "black",
  },
  {
    rank: 2,
    name: "Heart",
    symbol: "♥",
    color: "red",
  },
  {
    rank: 3,
    name: "Diamond",
    symbol: "♦",
    color: "red",
  },
];

export const numbers: Number[] = [
  {
    rank: 0,
    display: "3",
    word: "Tres",
  },
  {
    rank: 1,
    display: "4",
    word: "Kwatro",
  },
  {
    rank: 2,
    display: "5",
    word: "Singko",
  },
  {
    rank: 3,
    display: "6",
    word: "Sais",
  },
  {
    rank: 4,
    display: "7",
    word: "Syete",
  },
  {
    rank: 5,
    display: "8",
    word: "Otso",
  },
  {
    rank: 6,
    display: "9",
    word: "Nwebe",
  },
  {
    rank: 7,
    display: "10",
    word: "Dyis",
  },
  {
    rank: 8,
    display: "J",
    word: "Jack",
  },
  {
    rank: 9,
    display: "Q",
    word: "Queen",
  },
  {
    rank: 10,
    display: "K",
    word: "King",
  },
  {
    rank: 11,
    display: "A",
    word: "Alas",
  },
  {
    rank: 12,
    display: "2",
    word: "Dos",
  },
];

export const cards: Card[] = suits.flatMap((suit) =>
  numbers.map((number) => ({
    id: `${suit.symbol}${number.display}`,
    suit,
    number,
  }))
);

export const playerNames = [
  "Ekoy",
  "Francis",
  "Nosida",
  "JM",
  "Lloyd",
  "Mavrick",
  "Rold",
];
