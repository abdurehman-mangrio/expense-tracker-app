// components/Chart.jsx
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#34d399', '#60a5fa', '#f87171', '#fbbf24', '#a78bfa', '#6b7280'];

const categoryLabels = {
  salary: 'Salary',
  shopping: 'Shopping',
  food: 'Food',
  transport: 'Transport',
  entertainment: 'Entertainment',
  other: 'Other',
};

const groupByCategory = (transactions) => {
  const summary = {};
  transactions.forEach(({ amount, category }) => {
    const key = category;
    if (!summary[key]) summary[key] = 0;
    summary[key] += amount;
  });
  return Object.entries(summary).map(([category, value]) => ({
    name: categoryLabels[category] || category,
    value: Math.abs(value),
  }));
};

const Chart = ({ transactions }) => {
  const data = groupByCategory(transactions);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Bar Chart</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
