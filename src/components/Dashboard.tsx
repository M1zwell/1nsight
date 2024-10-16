import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getReports, deleteReport } from '@/api';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import UpgradeToInvestor from './UpgradeToInvestor';

// ... (previous code remains the same)

const Dashboard: React.FC = () => {
  // ... (previous code remains the same)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {userType}!</CardTitle>
          <CardDescription>Here's an overview of your account and activities.</CardDescription>
        </CardHeader>
        <CardContent>
          {userType === 'creator' && (
            // ... (creator content remains the same)
          )}
          {userType === 'investor' && (
            // ... (investor content remains the same)
          )}
          {userType === 'registered' && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Subscriptions</h2>
              <p className="mb-4">Upgrade to Investor status to access premium content.</p>
              <UpgradeToInvestor />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;