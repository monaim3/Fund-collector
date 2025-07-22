'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const PieChartComponent = ({ expense, balance }) => {
  const data = [
    { name: 'Expense', value: expense },
    { name: 'Balance', value: balance },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-12">
      <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Fund Distribution</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          {/* ✅ Use regular SVG <defs>, not imported Defs */}
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2596be" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label
            outerRadius={100}
            dataKey="value"
          >
            <Cell fill="#ef4444" /> {/* Expense - red */}
            <Cell fill="url(#balanceGradient)" /> {/* Balance - gradient */}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
