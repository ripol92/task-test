import React, { useState } from 'react';
import { OrdersList } from '../components/OrdersList';

export const OrdersPage: React.FC = () => {
  const [status, setStatus] = useState<string>('');

  return (
    <div>
      <h1>Orders</h1>
      <label>Status filter: </label>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
      <div style={{ height: '80vh' }}>
        <OrdersList status={status || undefined} />
      </div>
    </div>
  );
};
