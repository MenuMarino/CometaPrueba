import { Order } from "@/types";

export default function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Detalle de orden #{order.id}
        </h3>

        <ul className="space-y-2 mb-4">
          {order.items.map((item) => (
            <li key={item.name} className="flex justify-between border-b pb-1 text-black">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="text-right text-lg font-semibold text-gray-800">
          Total: ${order.subtotal}
        </div>

        <div className="text-sm text-gray-500 mt-2">
          Estado: {order.paid ? "Pagado" : "Pendiente"}<br />
          Fecha: {new Date(order.created).toLocaleString()}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
