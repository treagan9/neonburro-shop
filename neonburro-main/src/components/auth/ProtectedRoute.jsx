import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/members/login" replace />;
  }

  return children;
};

export default ProtectedRoute;