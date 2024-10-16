import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar: React.FC = () => {
  const { userType, setUserType } = useUser();

  const handleLogout = () => {
    setUserType('visitor');
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">ResearchHub</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/reports">
              <Button variant="ghost">Reports</Button>
            </Link>
            {userType === 'creator' && (
              <Link to="/create">
                <Button variant="ghost">Create Post</Button>
              </Link>
            )}
            {userType !== 'visitor' && (
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            )}
            {userType === 'visitor' ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost">Register</Button>
                </Link>
              </>
            ) : (
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;