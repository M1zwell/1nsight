import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getReports } from '@/api';

interface Report {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  accessLevel: 'public' | 'registered' | 'investor' | 'creator';
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const { userType } = useUser();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const fetchedReports = await getReports();
        setReports(fetchedReports);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const canAccessReport = (reportAccessLevel: string) => {
    const accessLevels = ['public', 'registered', 'investor', 'creator'];
    const userAccessLevel = accessLevels.indexOf(userType);
    const reportLevel = accessLevels.indexOf(reportAccessLevel);
    return userAccessLevel >= reportLevel;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Research Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report._id}>
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{new Date(report.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{report.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Badge variant={report.accessLevel === 'public' ? 'secondary' : report.accessLevel === 'registered' ? 'outline' : 'default'}>
                {report.accessLevel}
              </Badge>
              <Button disabled={!canAccessReport(report.accessLevel)}>
                {canAccessReport(report.accessLevel) ? 'Read More' : 'Upgrade to Access'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;