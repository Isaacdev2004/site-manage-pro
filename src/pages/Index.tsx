
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to the dashboard since we're now using the app structure
  return <Navigate to="/" replace />;
};

export default Index;
