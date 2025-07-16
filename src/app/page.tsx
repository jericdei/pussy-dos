import CardTable from "@/components/card-table";
import { getFreshCards } from "@/lib/utils";

export default function Home() {
  const cards = getFreshCards();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Pussy Dos</h1>

        <CardTable shuffledCards={cards} />
      </main>
    </div>
  );
}
