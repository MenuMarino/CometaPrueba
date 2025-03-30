import { Order, Stock } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchStock(): Promise<Stock> {
  const res = await fetch(`${BASE_URL}/api/stock`);
  if (!res.ok) throw new Error('Error al obtener el stock');
  return res.json();
}

export async function createOrder(payload: Record<string, number>) {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Error al crear orden');
  return res.json();
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await fetch(`${BASE_URL}/api/orders`);
  if (!res.ok) throw new Error('Error al obtener órdenes');
  return res.json();
}

export async function payOrder(orderId: number): Promise<Order> {
  const res = await fetch(`${BASE_URL}/api/orders/${orderId}`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Error al pagar orden');
  return res.json();
}
