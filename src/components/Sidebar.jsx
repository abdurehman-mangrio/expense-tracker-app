// src/components/Sidebar.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  PieChart,
  Menu,
  ChevronLeft,
  User,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Add Transaction', path: '/add', icon: <PlusCircle size={20} /> },
    { name: 'History', path: '/history', icon: <History size={20} /> },
    { name: 'Charts', path: '/chart', icon: <PieChart size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-900 text-black dark:text-white shadow-md transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b h-16">
        {isOpen && <h2 className="text-xl font-bold text-blue-600">Expense Tracker</h2>}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 dark:text-gray-300 hover:text-blue-600 focus:outline-none"
        >
          {isOpen ? <ChevronLeft /> : <Menu />}
        </button>
      </div>

      {/* User Info */}
      {currentUser && (
        <div className="flex flex-col items-center py-4">
          <img
            src={currentUser.photoURL || 'https://ui-avatars.com/api/?name=User'}
            className="w-12 h-12 rounded-full object-cover border"
            alt="Avatar"
          />
          {isOpen && (
            <>
              <p className="mt-2 text-sm font-medium">{currentUser.displayName || 'User'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center px-2 break-words">{currentUser.email}</p>
            </>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-4 flex flex-col space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-2 rounded-md mx-2 transition-all duration-200 
              ${
                location.pathname === item.path
                  ? 'bg-blue-100 text-blue-700 font-medium dark:bg-blue-600 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
          >
            {item.icon}
            {isOpen && <span className="text-sm">{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-4 w-full px-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full px-4 py-2 rounded-md transition"
        >
          <LogOut size={20} />
          {isOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
