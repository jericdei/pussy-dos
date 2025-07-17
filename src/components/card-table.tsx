"use client";

import { useState } from "react";
import Card from "@/components/card";
import { Button } from "./ui/button";
import {
  FreshCard,
  getFourOfAKindQuadKicker,
  getFreshCards,
  getFullHouseTriple,
  getHighestCard,
  isFlush,
  isFourOfAKind,
  isFullHouse,
  isPair,
  isRoyalFlush,
  isStraight,
  isThreeOfAKind,
  reverseSortCardsByNumber,
  sortCardsByNumber,
  sortCardsBySuit,
} from "@/lib/utils";
import { Card as TCard } from "@/constants/cards";

type Props = {
  shuffledCards: FreshCard[];
};

export default function CardTable({ shuffledCards }: Props) {
  const [hands, setHands] = useState(shuffledCards);
  const playerHands = hands.filter((hand) => !hand.isBot);
  const [selected, setSelected] = useState<TCard[]>([]);
  const [text, setText] = useState("Wala pang bitaw!");
  const [highestCard, setHighestCard] = useState<TCard | null>(null);

  // const sortHands = (sortFn: (cards: TCard[]) => TCard[]) => {
  //   setHands((prevHands) => prevHands.map((hand) => sortFn(hand.cards)));
  // };

  const createNewGame = () => {
    setHands(getFreshCards());
    setSelected([]);
  };

  const onSelect = (card: TCard) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(card)) {
        return prevSelected.filter((id) => id !== card);
      }

      return [...prevSelected, card];
    });
  };

  const renderPlayerHand = (hand: FreshCard) => (
    <div key={hand.player} className="mb-6">
      {/* <h2 className="text-2xl font-bold mb-2">{hand.player}</h2> */}
      <div className="grid grid-cols-13 gap-2">
        {hand.cards.map((card) => (
          <Card
            key={card.number.display + card.suit.symbol}
            card={card}
            isSelected={selected.includes(card)}
            onSelect={() => onSelect(card)}
          />
        ))}
      </div>
    </div>
  );

  const play = () => {
    const { length: count } = selected;

    let highest = getHighestCard(selected);

    // No cards selected
    if (count === 0) {
      return;
    }

    // Single
    else if (count === 1) {
      const [card] = selected;
      setText(`${card.number.word} lang boy!`);
    }

    // Pair
    else if (count === 2) {
      const [card1, card2] = selected;

      if (isPair([card1, card2])) {
        setText(`Par ${card1.number.word} jay!`);
      }
    }

    // Trio
    else if (count === 3) {
      const [card1, card2, card3] = selected;

      if (isThreeOfAKind([card1, card2, card3])) {
        setText(`Trio ${card1.number.word}!`);
      }
    }

    // 5-card combinations
    else if (selected.length === 5) {
      if (isRoyalFlush(selected)) {
        setText("Royal par!!!");
      } else if (isStraight(selected)) {
        setText("Straight!");
      } else if (isFlush(selected)) {
        setText("Flush!");
      } else if (isFullHouse(selected)) {
        highest = getFullHouseTriple(selected);
        setText(`Pul de ${highest?.number.word}!`);
      } else if (isFourOfAKind(selected)) {
        highest = getFourOfAKindQuadKicker(selected)?.highest ?? null;
        setText(`Boom kwadro ${highest?.number.word}!`);
      }
    }

    // No valid combination
    else {
      setText("Di pwede yan boi!");
    }

    setHighestCard(highest);
  };

  return (
    <div>
      <div className="flex gap-4 items-center mb-8">
        <Button onClick={createNewGame}>New Game</Button>
        <Button onClick={play}>Play</Button>
        {/* <Button onClick={() => sortHands(sortCardsByNumber)}>
          Sort by Number
        </Button>
        <Button onClick={() => sortHands(sortCardsBySuit)}>Sort by Suit</Button> */}
      </div>

      <div>
        <p className="text-center text-5xl p-8">{text}</p>
        {highestCard && (
          <p className="text-center text-5xl p-8">{`${highestCard?.number.word} na ${highestCard?.suit.name}`}</p>
        )}
      </div>

      {hands.filter((hand) => !hand.isBot).map(renderPlayerHand)}
    </div>
  );
}
