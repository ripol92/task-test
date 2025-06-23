export type Order = {
  id: string;
  phone: string;
  from_address: string;
  to_address: string;
  description: string;
  status: string;
};

const API_URL = '/api';

export async function fetchOrders(status?: string, page = 1): Promise<Order[]> {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  params.append('page', page.toString());
  const res = await fetch(`${API_URL}/orders?${params}`);
  return res.json();
}

export async function fetchOrder(id: string): Promise<Order> {
  const res = await fetch(`${API_URL}/orders/${id}`);
  return res.json();
}

export async function createOrder(data: Omit<Order, 'id' | 'status'>) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function cancelOrder(id: string) {
  await fetch(`${API_URL}/orders/${id}`, { method: 'DELETE' });
}

export async function geocodeAddress(address: string): Promise<string[]> {
  const url = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${encodeURIComponent(address)}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.response.GeoObjectCollection.featureMember.map((f: any) => f.GeoObject.name);
}
