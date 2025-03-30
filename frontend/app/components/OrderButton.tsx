"use client";
import { useState } from "react";
import CreateOrderModal from "./CreateOrderModal";

export default function OrderButton({ onOrderCreated }: { onOrderCreated: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded mb-6"
        onClick={() => setOpen(true)}
      >
        Crear Orden
      </button>
      {open && (
        <CreateOrderModal
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            onOrderCreated();
          }}
        />
      )}
    </>
  );
}
