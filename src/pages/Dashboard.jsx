import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Dashboard
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Dashboard page coming soon!
        </p>
        <Button 
          variant="secondary" 
          onClick={() => navigate('/')}
          className="w-full"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;