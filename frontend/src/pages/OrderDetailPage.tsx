import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrder, cancelOrder, Order } from '../api';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id) fetchOrder(id).then(setOrder);
  }, [id]);

  const handleCancel = async () => {
    if (!id) return;
    await cancelOrder(id);
    setOrder(o => o && { ...o, status: 'canceled' });
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order</h1>
      <p>From: {order.from_address}</p>
      <p>To: {order.to_address}</p>
      <p>Status: {order.status}</p>
      {order.status === 'active' && <button onClick={handleCancel}>Cancel</button>}
    </div>
  );
};
