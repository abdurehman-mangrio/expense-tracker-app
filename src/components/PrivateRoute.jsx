// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/" />;
  if (!currentUser.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-center px-4">
        <div>
          <h2 className="text-2xl font-semibold text-red-500">Email Not Verified</h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">Please verify your email to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
