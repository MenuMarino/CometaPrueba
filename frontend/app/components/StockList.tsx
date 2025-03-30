"use client";
import { useEffect, useState } from "react";
import { fetchStock } from "@/lib/api";
import { Beer } from "@/types";
import OrderButton from "./OrderButton";

export default function StockList({
  onOrderCreated,
}: {
  onOrderCreated: () => void;
}) {
  const [stock, setStock] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStock = async () => {
    try {
      setLoading(true);
      const data = await fetchStock();
      setStock(data.beers);
      setError("");
    } catch (err) {
      setError("No se pudo cargar el stock.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStock();
  }, []);

  if (loading)
    return <div className="p-4 text-gray-700">Cargando stock...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Stock de cervezas</h2>
        <button
          onClick={loadStock}
          className="text-sm bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded border"
        >
          Actualizar stock
        </button>
      </div>

      <OrderButton onOrderCreated={() => {
        loadStock();
        onOrderCreated();
      }} />

      <table className="w-full text-left border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((beer) => (
            <tr
              key={beer.name}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="p-2 border text-gray-800">{beer.name}</td>
              <td className="p-2 border text-gray-800">${beer.price}</td>
              <td className="p-2 border text-gray-800">{beer.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
