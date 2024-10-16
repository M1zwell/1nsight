import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold mb-6">Welcome to ResearchHub</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Access cutting-edge research reports, articles, and interactive content across various industries. 
        Upgrade your account to unlock premium content and stay ahead of the curve.
      </p>
      <div className="space-x-4">
        <Link to="/reports">
          <Button size="lg">Explore Reports</Button>
        </Link>
        <Link to="/register">
          <Button size="lg" variant="outline">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;