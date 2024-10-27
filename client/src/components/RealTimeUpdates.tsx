import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
}

const RealTimeUpdates: React.FC = () => {
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:5000');

    wsRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    wsRef.current.onmessage = (event) => {
      const newTransaction = JSON.parse(event.data);
      setLatestTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Real-Time Updates</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {latestTransactions.map((transaction, index) => (
          <li
            key={transaction.id}
            className={`p-4 ${index === 0 ? 'bg-yellow-50' : ''}`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.id}</p>
                <p className="text-sm text-gray-500">{format(new Date(transaction.date), 'yyyy-MM-dd HH:mm:ss')}</p>
              </div>
              <div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  ${transaction.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeUpdates;