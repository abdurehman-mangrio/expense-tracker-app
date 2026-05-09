import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BarChart2,
  History,
  ShieldCheck,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const features = [
  {
    icon: <LayoutDashboard size={28} className="text-blue-600 dark:text-blue-400" />,
    title: 'Dashboard Overview',
    desc: 'View all your income and expenses in a single dashboard.',
  },
  {
    icon: <BarChart2 size={28} className="text-blue-600 dark:text-blue-400" />,
    title: 'Analytics & Charts',
    desc: 'Visualize spending habits and track trends over time.',
  },
  {
    icon: <History size={28} className="text-blue-600 dark:text-blue-400" />,
    title: 'Transaction History',
    desc: 'Access all your past records with filters and search.',
  },
  {
    icon: <ShieldCheck size={28} className="text-blue-600 dark:text-blue-400" />,
    title: 'Secure & Private',
    desc: 'Your data is encrypted and protected for peace of mind.',
  },
];

const blogs = [
  {
    title: '5 Budgeting Tips That Work',
    link: 'https://www.investopedia.com/articles/pf/06/budgeting.asp',
  },
  {
    title: 'How to Save Money Monthly',
    link: 'https://www.nerdwallet.com/article/finance/how-to-save-money',
  },
  {
    title: 'Beginner’s Guide to Personal Finance',
    link: 'https://www.ramseysolutions.com/personal-finance/personal-finance-basics',
  },
];

const faqs = [
  {
    question: 'Is the Expense Tracker free to use?',
    answer: 'Yes, it is completely free for personal use.',
  },
  {
    question: 'Can I access my data on other devices?',
    answer: 'Absolutely. Just log in on any device and your data will sync.',
  },
  {
    question: 'Is my financial data safe?',
    answer: 'Yes, we use Firebase and follow modern encryption practices.',
  },
];

const Home = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => setOpenFAQ(openFAQ === index ? null : index);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        timestamp: Timestamp.now(),
      });
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black text-gray-900 dark:text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ExpenseTracker</h1>
        <nav className="flex gap-4 text-sm">
          <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
          <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Track Your Spending Smartly
        </motion.h2>
        <motion.p
          className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Simplify budgeting, visualize analytics, and take control of your finances—all in one secure app.
        </motion.p>
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <Link to="/login" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
            <ArrowRight size={18} /> Get Started
          </Link>
          <Link to="/register" className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Create Account
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <h3 className="text-3xl font-semibold text-center mb-10">Features You'll Love</h3>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h4 className="text-lg font-medium mb-2">{f.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="w-full max-w-3xl py-12 px-4 mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">From Our Blog</h2>
        <div className="space-y-4">
          {blogs.map((b, i) => (
            <a
              key={i}
              href={b.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white dark:bg-gray-800 rounded shadow hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              <h4 className="font-medium text-blue-700 dark:text-blue-400">{b.title}</h4>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-3xl py-12 px-4 mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-white">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-md shadow p-4">
              <button
                className="flex justify-between w-full text-left font-medium text-gray-800 dark:text-white"
                onClick={() => toggleFAQ(i)}
              >
                {faq.question}
                <span>{openFAQ === i ? '−' : '+'}</span>
              </button>
              {openFAQ === i && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Subscribe to our newsletter for budgeting tips, updates, and new features.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 rounded border w-full max-w-xs dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <Mail size={16} /> Subscribe
            </button>
          </form>
          {submitted && <p className="text-green-600 text-sm mt-2">Thanks for subscribing!</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t pt-6 pb-8 px-4 bg-white dark:bg-gray-900 text-sm text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
