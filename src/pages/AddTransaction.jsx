// pages/AddTransaction.jsx
import TransactionForm from '../components/TransactionForm';

const AddTransaction = ({ setTransactions }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Transaction</h2>
      <TransactionForm setTransactions={setTransactions} />
    </div>
  );
};

export default AddTransaction;
