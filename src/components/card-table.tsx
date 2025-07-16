"use client";

import { useState } from "react";
import Card from "@/components/card";
import { Button } from "./ui/button";
import {
  FreshCard,
  getFreshCards,
  sortCardsByNumber,
  sortCardsBySuit,
} from "@/lib/utils";

type Props = {
  shuffledCards: FreshCard[];
};

export default function CardTable({ shuffledCards }: Props) {
  const [hands, setHands] = useState(shuffledCards);

  // const sortHands = (sortFn: (cards: TCard[]) => TCard[]) => {
  //   setHands((prevHands) => prevHands.map((hand) => sortFn(hand.cards)));
  // };

  const createNewGame = () => {
    setHands(getFreshCards());
  };

  const renderPlayerHand = (hand: FreshCard) => (
    <div key={hand.player} className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{hand.player}</h2>
      <div className="grid grid-cols-13 gap-2">
        {hand.cards.map((card) => (
          <Card key={card.number.display + card.suit.symbol} card={card} />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <Button onClick={createNewGame}>New Game</Button>
        {/* <Button onClick={() => sortHands(sortCardsByNumber)}>
          Sort by Number
        </Button>
        <Button onClick={() => sortHands(sortCardsBySuit)}>Sort by Suit</Button> */}
      </div>

      {hands.map(renderPlayerHand)}
    </div>
  );
}
