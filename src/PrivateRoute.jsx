import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/use-auth';

const PrivateRoute = ({ element: Element }) => {
  const { isAuth } = useAuth();

  return isAuth ? Element : <Navigate to="/login" />;
};

export default PrivateRoute;
