export type Order = {
  id: string;
  passenger_phone: string;
  from_address: string;
  from_lat: number;
  from_lng: number;
  from_description?: string;
  to_address: string;
  to_lat: number;
  to_lng: number;
  to_description?: string;
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

export async function geocodeCoordinates(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const url = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${encodeURIComponent(address)}`;
  const res = await fetch(url);
  const json = await res.json();
  const first = json.response.GeoObjectCollection.featureMember[0];
  if (!first) return null;
  const pos: string = first.GeoObject.Point.pos; // "lng lat"
  const [lng, lat] = pos.split(' ').map(parseFloat);
  return { lat, lng };
}
