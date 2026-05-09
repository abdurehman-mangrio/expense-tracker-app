// components/TransactionList.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categoryIcons = {
  salary: '💼',
  shopping: '🛒',
  food: '🍔',
  transport: '🚗',
  entertainment: '🎮',
  other: '💡',
};

const TransactionList = ({ transactions = [], deleteTransaction, updateTransaction }) => {
  return (
    <div className="space-y-3">
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        transactions.map((tx) => (
          <div key={tx.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
            <div>
              <p className="font-semibold text-gray-700">{tx.category}</p>
              <p className="text-sm text-gray-500">{tx.date}</p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-bold ${tx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                PKR {Math.abs(tx.amount).toFixed(2)}
              </p>
              <div className="flex gap-2 justify-end mt-2">
                <button
                  onClick={() => updateTransaction(tx)}
                  className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTransaction(tx.id)}
                  className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
