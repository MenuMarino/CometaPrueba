"use client";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { fetchOrders, payOrder } from "@/lib/api";
import { Order } from "@/types";
import OrderDetailModal from "./OrderDetailModal";

const OrderList = forwardRef((props, ref) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchOrders();
      setOrders(data);
      setError("");
    } catch {
      setError("No se pudo cargar las órdenes.");
    } finally {
      setLoading(false);
    }
  };

  const handlePay = async (id: number) => {
    await payOrder(id);
    await loadOrders();
  };

  useImperativeHandle(ref, () => ({
    reload: loadOrders,
  }));

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <div className="p-4">Cargando órdenes...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Órdenes</h2>
      <table className="w-full text-left border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Estado</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t  text-gray-700">
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">
                {new Date(order.created).toLocaleString()}
              </td>
              <td className="p-2 border">${order.subtotal}</td>
              <td className="p-2 border">{order.paid ? "Pagado" : "Pendiente"}</td>
              <td className="p-2 border flex gap-2">
                <button
                  onClick={() => setSelected(order)}
                  className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Ver detalle
                </button>
                {!order.paid && (
                  <button
                    onClick={() => handlePay(order.id)}
                    className="text-sm bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Pagar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <OrderDetailModal order={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
});

export default OrderList;
