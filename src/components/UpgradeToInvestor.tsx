import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import api from '@/api';

declare const Stripe: any;

const UpgradeToInvestor: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      const response = await api.post('/subscriptions/create-checkout-session');
      const sessionId = response.data.id;

      const stripe = await Stripe(process.env.STRIPE_PUBLIC_KEY);
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast({
          title: "Error",
          description: "An error occurred during the checkout process. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "An error occurred while initiating the upgrade process. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upgrade to Investor</CardTitle>
        <CardDescription>Get access to premium content and exclusive reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-4">$20.00 / month</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Access to all premium reports</li>
          <li>Exclusive investment insights</li>
          <li>Priority support</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpgrade} className="w-full">Upgrade Now</Button>
      </CardFooter>
    </Card>
  );
};

export default UpgradeToInvestor;