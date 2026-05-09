// src/components/TransactionForm.jsx
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

const TransactionForm = ({ onAdd }) => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.description) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fill all fields');
      return;
    }

    try {
      const transaction = {
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        description: formData.description,
        type: parseFloat(formData.amount) >= 0 ? 'income' : 'expense',
        timestamp: Date.now()
      };

      const ref = collection(db, 'users', currentUser.uid, 'transactions');
      const docRef = await addDoc(ref, transaction);
      onAdd && onAdd({ id: docRef.id, ...transaction });

      toast.success('Transaction Added!');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      setFormData({ amount: '', category: '', date: '', description: '' });
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('Failed to add transaction');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center mb-4">Add Transaction</h2>

      {/* Amount */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Amount (PKR)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="e.g. 1200"
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 ${
            errors.amount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
        />
        {errors.amount && <span className="text-sm text-red-500">{errors.amount}</span>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="e.g. Grocery, Salary"
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 ${
            errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
        />
        {errors.description && <span className="text-sm text-red-500">{errors.description}</span>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 ${
            errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
        >
          <option value="">Select</option>
          <option value="salary">Salary</option>
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="transport">Transport</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
        {errors.category && <span className="text-sm text-red-500">{errors.category}</span>}
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border focus:ring-2 ${
            errors.date ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
        />
        {errors.date && <span className="text-sm text-red-500">{errors.date}</span>}
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        type="submit"
        className="w-full py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
      >
        Add Transaction
      </motion.button>
    </motion.form>
  );
};

export default TransactionForm;
