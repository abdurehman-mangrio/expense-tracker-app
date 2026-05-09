import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import Chart from '../components/Chart';

const ChartPage = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!currentUser) return;
      const ref = collection(db, 'users', currentUser.uid, 'transactions');
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    };

    fetchTransactions();
  }, [currentUser]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Spending Insights
      </h2>

      {transactions.length > 0 ? (
        <Chart transactions={transactions} />
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-6">
          No transaction data to display chart.
        </p>
      )}
    </div>
  );
};

export default ChartPage;
