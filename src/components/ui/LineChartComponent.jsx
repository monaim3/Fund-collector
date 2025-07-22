// components/LineChartComponent.jsx
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const LineChartComponent = ({ fund, expense }) => {
    const token = localStorage.getItem('authToken');
  const chartData = [
    { name: 'Jan', fund: fund * 0.2, expense: expense * 0.3 },
    { name: 'Feb', fund: fund * 0.35, expense: expense * 0.25 },
    { name: 'Mar', fund: fund * 0.45, expense: expense * 0.4 },
    { name: 'Apr', fund: fund * 0.55, expense: expense * 0.5 },
    { name: 'May', fund: fund * 0.75, expense: expense * 0.6 },
    { name: 'Jun', fund: fund * 0.9, expense: expense * 0.75 },
    { name: 'Jul', fund: fund, expense: expense },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-12">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">Fund vs Expense Over Time</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
          <YAxis tick={{ fill: '#4B5563' }} />
          <Tooltip />
          <Line type="monotone" dataKey="fund" stroke="#2596be" strokeWidth={3} />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
