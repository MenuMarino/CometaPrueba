"use client";
import { useEffect, useState } from "react";
import { fetchStock, createOrder } from "@/app/lib/api";
import { Beer } from "@/app/types";

export default function CreateOrderModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [stock, setStock] = useState<Beer[]>([]);
  const [selection, setSelection] = useState<Record<string, number>>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStock().then((data) => setStock(data.beers));
  }, []);

  const handleCheck = (name: string) => {
    setSelection((prev) => {
      const newVal = { ...prev };
      if (newVal[name]) delete newVal[name];
      else newVal[name] = 1;
      return newVal;
    });
  };

  const handleQuantityChange = (name: string, value: number) => {
    setSelection((prev) => ({
      ...prev,
      [name]: Math.min(value, stock.find((b) => b.name === name)?.quantity || 0),
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(selection).length === 0) {
      setError("Debes seleccionar al menos una cerveza.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createOrder(selection);
      onSuccess();
    } catch (err) {
      setError("Error al crear la orden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Crear nueva orden
        </h3>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {stock.map((beer) => {
            const isDisabled = beer.quantity === 0;
            const isSelected = beer.name in selection;

            return (
              <div
                key={beer.name}
                className={`flex justify-between items-center border p-3 rounded ${isDisabled ? "opacity-50" : "hover:bg-gray-50"
                  }`}
              >
                <label className="flex items-center gap-2 text-gray-800">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCheck(beer.name)}
                    disabled={isDisabled}
                  />
                  {beer.name} (${beer.price}) - Stock: {beer.quantity}
                </label>
                {isSelected && (
                  <input
                    type="number"
                    min={1}
                    max={beer.quantity}
                    value={selection[beer.name]}
                    onChange={(e) =>
                      handleQuantityChange(beer.name, Number(e.target.value))
                    }
                    className="w-20 border rounded px-2 py-1 text-gray-800"
                  />
                )}
              </div>
            );
          })}
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Creando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
