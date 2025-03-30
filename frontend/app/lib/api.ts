import { Stock } from '@/app/types';

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
