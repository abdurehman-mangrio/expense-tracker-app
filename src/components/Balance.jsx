// components/Balance.jsx
const Balance = ({ transactions = [] }) => {
  const total = transactions.reduce((acc, tx) => acc + Number(tx.amount), 0);
  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-2xl shadow-md text-center">
      <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
        Current Balance
      </h2>
      <p className="text-4xl font-extrabold text-blue-800">
        PKR {total.toFixed(2)}
      </p>
    </div>
  );
};

export default Balance;
