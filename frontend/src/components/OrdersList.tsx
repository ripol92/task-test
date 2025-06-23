import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Order, fetchOrders, cancelOrder } from '../api';

interface OrdersListProps {
  status?: string;
}

export const OrdersList: React.FC<OrdersListProps> = ({ status }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const listRef = useRef<List>(null);

  useEffect(() => {
    fetchOrders(status, page).then(data => setOrders(prev => [...prev, ...data]));
  }, [status, page]);

  const loadMore = useCallback(() => {
    setPage(p => p + 1);
  }, []);

  const handleCancel = async (id: string) => {
    await cancelOrder(id);
    setOrders(list => list.filter(o => o.id !== id));
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const order = orders[index];
    if (!order) return null;
    return (
      <div style={style} className="order-row">
        <div>{order.from_address} → {order.to_address}</div>
        <div>{order.status}</div>
        {order.status === 'active' && (
          <button onClick={() => handleCancel(order.id)}>Cancel</button>
        )}
      </div>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          height={height}
          itemCount={orders.length}
          itemSize={60}
          width={width}
          ref={listRef}
          onItemsRendered={({ visibleStopIndex }) => {
            if (visibleStopIndex >= orders.length - 1) loadMore();
          }}
        >
          {Row}
        </List>
      )}
    </AutoSizer>
  );
};
