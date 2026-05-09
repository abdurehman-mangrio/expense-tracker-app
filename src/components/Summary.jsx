const Summary = ({ transactions = [] }) => {
  const income = transactions.filter(tx => tx.amount > 0);
  const expenses = transactions.filter(tx => tx.amount < 0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-green-100 text-green-800 p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium">Income</h3>
        <p className="text-2xl font-bold">PKR {income.reduce((acc, tx) => acc + Number(tx.amount), 0).toFixed(2)}</p>
      </div>
      <div className="bg-red-100 text-red-800 p-4 rounded-xl shadow">
        <h3 className="text-sm font-medium">Expenses</h3>
        <p className="text-2xl font-bold">PKR {Math.abs(expenses.reduce((acc, tx) => acc + Number(tx.amount), 0)).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Summary;
