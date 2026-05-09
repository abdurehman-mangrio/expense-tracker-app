import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await resetPassword(email);
      toast.success('Check your email for reset instructions');
      setEmail('');
    } catch (err) {
      toast.error(err.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-300 to-indigo-500 dark:from-gray-800 dark:to-gray-900 px-4">
      {/* Decorative blurred circles */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-white/30 dark:bg-white/10 rounded-full filter blur-3xl animate-pulse opacity-50"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-64 h-64 bg-white/20 dark:bg-white/5 rounded-full filter blur-2xl animate-pulse opacity-40"></div>

      {/* Forgot Password Card */}
      <motion.div
        className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-center text-3xl font-extrabold mb-6 text-blue-600 dark:text-blue-400">
          Reset Password
        </h2>

        <form onSubmit={handleReset} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              id="forgot-email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              aria-label="Email address"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center space-y-2 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            Remembered your password?{' '}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Login
            </Link>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
