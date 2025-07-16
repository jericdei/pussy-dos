import { Card as CardType } from "@/constants/cards";
import { cn } from "@/lib/utils";
import React from "react";

export default function Card({ card }: { card: CardType }) {
  const colorClass = cn({
    "text-red-500": card.suit.color === "red",
    "text-black": card.suit.color === "black",
  });

  return (
    <div className="w-28 relative h-32 p-2 rounded-2xl bg-slate-200 text-slate-900 font-bold text-center grid place-items-center select-none border border-gray-400">
      <p
        className={cn(
          "font-serif text-2xl text-left absolute top-2 left-2",
          colorClass
        )}
      >
        {card.number.display}
      </p>
      <p className={cn("text-7xl", colorClass)}>{card.suit.symbol}</p>
    </div>
  );
}
