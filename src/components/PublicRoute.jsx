// src/components/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If logged in, redirect to dashboard
  return currentUser ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
