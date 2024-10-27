import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DailyVolume {
  date: string;
  volume: number;
}

interface MonthlyTotal {
  month: string;
  total: number;
}

interface TrendData {
  dailyVolume: DailyVolume[];
  monthlyTotals: MonthlyTotal[];
}

interface TrendChartsProps {
  trendData: TrendData | null;
}

const TrendCharts: React.FC<TrendChartsProps> = ({ trendData }) => {
  if (!trendData) return null;

  const dailyVolumeOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Transaction Volume (Last 30 Days)',
      },
    },
  };

  const dailyVolumeData = {
    labels: trendData.dailyVolume.map(d => d.date),
    datasets: [
      {
        label: 'Volume',
        data: trendData.dailyVolume.map(d => d.volume),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const monthlyTotalsOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Transaction Totals',
      },
    },
  };

  const monthlyTotalsData = {
    labels: trendData.monthlyTotals.map(d => d.month),
    datasets: [
      {
        label: 'Total Amount',
        data: trendData.monthlyTotals.map(d => d.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <Line options={dailyVolumeOptions} data={dailyVolumeData} />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar options={monthlyTotalsOptions} data={monthlyTotalsData} />
      </div>
    </div>
  );
};

export default TrendCharts;