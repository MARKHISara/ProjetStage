import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // <-- ici

export default function PrivateRoute() {
  const { authToken } = useAuth();
  return authToken ? <Outlet /> : <Navigate to="/login" replace />;
}
