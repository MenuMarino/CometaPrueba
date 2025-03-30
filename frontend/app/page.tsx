import StockList from "@/app/components/StockList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-10">
      <StockList />
    </main>
  );
}
