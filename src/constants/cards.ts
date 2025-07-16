export type Suit = {
  rank: number;
  name: string;
  symbol: string;
  color: "red" | "black";
};

export type Number = {
  rank: number;
  display: string;
};

export type Card = {
  suit: Suit;
  number: Number;
};

export const suits: Suit[] = [
  {
    rank: 0,
    name: "Clubs",
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
    name: "Hearts",
    symbol: "♥",
    color: "red",
  },
  {
    rank: 3,
    name: "Diamonds",
    symbol: "♦",
    color: "red",
  },
];

export const numbers: Number[] = [
  {
    rank: 0,
    display: "3",
  },
  {
    rank: 1,
    display: "4",
  },
  {
    rank: 2,
    display: "5",
  },
  {
    rank: 3,
    display: "6",
  },
  {
    rank: 4,
    display: "7",
  },
  {
    rank: 5,
    display: "8",
  },
  {
    rank: 6,
    display: "9",
  },
  {
    rank: 7,
    display: "10",
  },
  {
    rank: 8,
    display: "J",
  },
  {
    rank: 9,
    display: "Q",
  },
  {
    rank: 10,
    display: "K",
  },
  {
    rank: 11,
    display: "A",
  },
  {
    rank: 12,
    display: "2",
  },
];

export const cards: Card[] = suits.flatMap((suit) =>
  numbers.map((number) => ({
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
