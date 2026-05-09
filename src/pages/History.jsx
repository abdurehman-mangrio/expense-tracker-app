import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import TransactionList from '../components/TransactionList';

const History = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!currentUser) return;
      const ref = collection(db, 'users', currentUser.uid, 'transactions');
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    };

    fetchTransactions();
  }, [currentUser]);

  const deleteTransaction = async (id) => {
    const ref = doc(db, 'users', currentUser.uid, 'transactions', id);
    await deleteDoc(ref);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const updateTransaction = (updatedTx) => {
    setTransactions(transactions.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx)));
  };

  const filtered = transactions
    .filter((tx) => {
      const categoryMatch = category === 'all' || tx.category === category;
      const searchMatch = (tx.category ?? '').toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || a.timestamp || a.id);
      const dateB = new Date(b.date || b.timestamp || b.id);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Transaction History</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category..."
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="salary">Salary</option>
            <option value="shopping">Shopping</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <TransactionList
        transactions={filtered}
        deleteTransaction={deleteTransaction}
        updateTransaction={updateTransaction}
      />
    </div>
  );
};

export default History;
