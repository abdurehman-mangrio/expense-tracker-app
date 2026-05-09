// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

import Balance from '../components/Balance';
import Summary from '../components/Summary';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Fetch user profile data (like fullName, bio)
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.warn('No additional user data found in Firestore.');
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  // Fetch user-specific transactions
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

  // Delete transaction
  const deleteTransaction = async (id) => {
    const ref = doc(db, 'users', currentUser.uid, 'transactions', id);
    await deleteDoc(ref);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* User Welcome Section */}
      {userData && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Welcome, {userData.fullName || currentUser?.displayName || 'User'} 👋
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Email: {currentUser?.email}
          </p>
          {userData.bio && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bio: {userData.bio}
            </p>
          )}
        </div>
      )}

      {/* Main Dashboard Content */}
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Balance transactions={transactions} />
        <Summary transactions={transactions} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-white">Recent Transactions</h2>
        <TransactionList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
      </div>
    </div>
  );
};

export default Dashboard;
