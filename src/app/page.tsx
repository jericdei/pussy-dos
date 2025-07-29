import CardTable from "@/components/card-table";
import { getFreshCards } from "@/lib/utils";

export default function Home() {
  const cards = getFreshCards();

  return (
    <main className="font-sans min-h-screen flex">
      {/* <h1 className="text-4xl font-bold">Pussy Dos</h1> */}

      <CardTable shuffledCards={cards} />
    </main>
  );
}
