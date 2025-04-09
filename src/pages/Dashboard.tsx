
import React from 'react';
import { Navigate } from 'react-router-dom';
import RoleDashboard from '@/components/dashboard/RoleDashboard';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  return <RoleDashboard />;
};

export default Dashboard;
