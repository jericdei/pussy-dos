import { Card, cards, playerNames } from "@/constants/cards";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function distributeArray<T>(array: T[], count: number = 4) {
  const result: T[][] = [];

  for (let i = 0; i < count; i++) {
    result.push([]);
  }

  for (let i = 0; i < array.length; i++) {
    const index = i % count;
    result[index].push(array[i]);
  }

  return result;
}

export function sortCardsByNumber(cards: Card[]) {
  return cards.sort((a, b) => {
    const numberDiff = a.number.rank - b.number.rank;
    if (numberDiff !== 0) return numberDiff;

    return a.suit.rank - b.suit.rank;
  });
}

export function reverseSortCardsByNumber(cards: Card[]) {
  return cards.sort((a, b) => {
    const numberDiff = b.number.rank - a.number.rank;
    if (numberDiff !== 0) return numberDiff;

    return b.suit.rank - a.suit.rank;
  });
}

export function sortCardsBySuit(cards: Card[]) {
  return cards.sort((a, b) => {
    const suitDiff = a.suit.rank - b.suit.rank;
    if (suitDiff !== 0) return suitDiff;

    return a.number.rank - b.number.rank;
  });
}

export type FreshCard = {
  player: string;
  cards: Card[];
  isBot: boolean;
};

export function getFreshCards(player = "Dei"): FreshCard[] {
  // Uncomment for Royal haha
  // const newCards = [
  //   [...cards.slice(0, 13)],
  //   [...cards.slice(14, 26)],
  //   [...cards.slice(27, 39)],
  //   [...cards.slice(40, 52)],
  // ];

  const newCards = distributeArray(shuffleArray(cards));
  const players = getRandomPlayers();

  return newCards.map((hand, idx) => {
    if (idx === 0) {
      return {
        player,
        cards: sortCardsByNumber(hand),
        isBot: false,
      };
    }

    return {
      player: players[idx - 1],
      cards: sortCardsByNumber(hand),
      isBot: true,
    };
  });
}

export function getRandomPlayers() {
  return shuffleArray(playerNames).slice(0, 3);
}

export function isPair(cards: Card[]) {
  const [card1, card2] = cards;

  if (card1.number.rank === card2.number.rank) {
    return true;
  }

  return false;
}

export function isThreeOfAKind(cards: Card[]) {
  const [card1, card2, card3] = cards;

  if (
    card1.number.rank === card2.number.rank &&
    card2.number.rank === card3.number.rank
  ) {
    return true;
  }

  return false;
}

export function isStraight(cards: Card[]) {
  const ranks = cards.map((c) => c.number.rank);

  // Remove duplicates
  const uniqueRanks = Array.from(new Set(ranks));

  if (uniqueRanks.length !== cards.length) return false;

  // Try every rank as potential "start" of the straight
  for (const start of uniqueRanks) {
    const expected = new Set(
      Array.from({ length: cards.length }, (_, i) => (start + i) % 13)
    );

    const actual = new Set(uniqueRanks);

    const isMatch = [...expected].every((r) => actual.has(r));
    if (isMatch) return true;
  }

  return false;
}

export function isFlush(cards: Card[]) {
  const suit = cards[0].suit;

  return cards.every((card) => card.suit === suit);
}

export function isRoyalFlush(cards: Card[]) {
  return isStraight(cards) && isFlush(cards);
}

export function isFullHouse(cards: Card[]) {
  const rankCount = new Map<number, number>();

  for (const card of cards) {
    const rank = card.number.rank;
    rankCount.set(rank, (rankCount.get(rank) || 0) + 1);
  }

  const counts = Array.from(rankCount.values());

  return counts.length === 2 && counts.includes(3) && counts.includes(2);
}

export function isFourOfAKind(cards: Card[]): boolean {
  const rankGroups = new Map<number, number>();

  for (const card of cards) {
    const rank = card.number.rank;
    rankGroups.set(rank, (rankGroups.get(rank) || 0) + 1);
  }

  for (const count of rankGroups.values()) {
    if (count === 4) return true;
  }

  return false;
}

export function getFullHouseTriple(cards: Card[]): Card | null {
  const rankToCards = new Map<number, Card[]>();

  // Group cards by rank
  for (const card of cards) {
    const rank = card.number.rank;
    if (!rankToCards.has(rank)) {
      rankToCards.set(rank, []);
    }
    rankToCards.get(rank)!.push(card);
  }

  const entries = Array.from(rankToCards.entries());

  if (entries.length !== 2) return null;

  const tripleGroup = entries.find(([, group]) => group.length === 3)?.[1];

  if (!tripleGroup) return null;

  console.log({ higherst: getHighestCard(tripleGroup) });

  return getHighestCard(tripleGroup);
}

export function getHighestCard(cards: Card[]): Card | null {
  if (cards.length === 0) return null;

  return cards.reduce((highest, current) => {
    const numberDiff = current.number.rank - highest.number.rank;

    if (numberDiff > 0) {
      return current;
    } else if (numberDiff === 0) {
      // Tie on number, compare suit rank
      return current.suit.rank > highest.suit.rank ? current : highest;
    } else {
      return highest;
    }
  });
}

export function getFourOfAKindQuadKicker(cards: Card[]) {
  const rankGroups = new Map<number, Card[]>();

  for (const card of cards) {
    const rank = card.number.rank;
    if (!rankGroups.has(rank)) {
      rankGroups.set(rank, []);
    }
    rankGroups.get(rank)!.push(card);
  }

  let quadRank: number | null = null;

  for (const [rank, group] of rankGroups.entries()) {
    if (group.length === 4) {
      quadRank = rank;
      break;
    }
  }

  if (quadRank === null) return null;

  const quadCards = rankGroups.get(quadRank)!;
  const remainingCards = cards.filter((c) => c.number.rank !== quadRank);

  // Use your existing getHighestCard function to get the kicker
  const kicker = getHighestCard(remainingCards);
  const highest = getHighestCard(quadCards);

  if (!kicker) return null;
  if (!highest) return null;

  return {
    quadCards,
    kicker,
    highest,
  };
}
