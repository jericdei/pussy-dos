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
};

export function getFreshCards(player = "Dei"): FreshCard[] {
  const newCards = distributeArray(shuffleArray(cards));
  const players = getRandomPlayers();

  return newCards.map((hand, idx) => {
    if (idx === 0) {
      return {
        player,
        cards: sortCardsByNumber(hand),
      };
    }

    return {
      player: players[idx - 1],
      cards: sortCardsBySuit(hand),
    };
  });
}

export function getRandomPlayers() {
  return shuffleArray(playerNames).slice(0, 3);
}
