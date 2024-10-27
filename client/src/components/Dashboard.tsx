import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import TransactionTable from './TransactionTable';
import TransactionSummary from './TransactionSummary';
import TrendCharts from './TrendCharts';
import RealTimeUpdates from './RealTimeUpdates';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const [summary, setSummary] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [summaryResponse, trendDataResponse] = await Promise.all([
          api.get('/summary'),
          api.get('/trend-data')
        ]);
        setSummary(summaryResponse.data);
        setTrendData(trendDataResponse.data);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Financial Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <TransactionSummary summary={summary} />
          </div>
          <div className="mt-8">
            <TrendCharts trendData={trendData} />
          </div>
          <div className="mt-8">
            <TransactionTable />
          </div>
          <div className="mt-8">
            <RealTimeUpdates />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;