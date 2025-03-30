"use client";
import { useRef } from "react";
import StockList from "@/components/StockList";
import OrderList from "@/components/OrderList";

export default function Home() {
  const orderListRef = useRef<{ reload: () => void }>(null);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-10 space-y-10 px-4">
      <StockList
        onOrderCreated={() => {
          orderListRef.current?.reload();
        }}
      />
      <OrderList ref={orderListRef} />
    </main>
  );
}
