import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import History from './pages/History';
import ChartPage from './pages/ChartPage';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import PublicRoute from './components/PublicRoute';

const App = () => {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions from Firestore
  const fetchTransactions = async () => {
    if (!currentUser) return;
    const ref = collection(db, 'users', currentUser.uid, 'transactions');
    const snapshot = await getDocs(ref);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentUser]);

  const deleteTransaction = async (id) => {
    if (!currentUser) return;
    await deleteDoc(doc(db, 'users', currentUser.uid, 'transactions', id));
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTransaction = async (updatedTx) => {
    if (!currentUser) return;
    const ref = doc(db, 'users', currentUser.uid, 'transactions', updatedTx.id);
    await updateDoc(ref, updatedTx);
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
  };

  return (
    <div className="flex">
      {currentUser && <Sidebar />}

      <div
        className={`transition-all duration-300 ${currentUser ? 'ml-64' : ''
          } w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white`}
      >
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              currentUser ? <Navigate to="/dashboard" replace /> : <Home />
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard
                  transactions={transactions}
                  deleteTransaction={deleteTransaction}
                  updateTransaction={updateTransaction}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddTransaction setTransactions={setTransactions} />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History
                  transactions={transactions}
                  deleteTransaction={deleteTransaction}
                  updateTransaction={updateTransaction}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/chart"
            element={
              <PrivateRoute>
                <ChartPage transactions={transactions} />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
