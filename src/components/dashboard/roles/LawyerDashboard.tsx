
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileDigit, 
  FolderKanban, 
  ArrowUpRight 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RecentActivityList from '../RecentActivityList';
import StatCard from '../StatCard';

const LawyerDashboard = () => {
  // Mock data - would come from API/blockchain in real implementation
  const stats = {
    totalCases: 14,
    activeCases: 8,
    totalEvidence: 73
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Total Cases" 
          value={stats.totalCases} 
          icon={<FolderKanban className="h-5 w-5 text-forensic-evidence" />} 
          linkTo="/cases"
        />
        <StatCard 
          title="Active Cases" 
          value={stats.activeCases} 
          icon={<FolderKanban className="h-5 w-5 text-forensic-accent" />} 
          linkTo="/cases?status=active"
        />
        <StatCard 
          title="Total Evidence" 
          value={stats.totalEvidence} 
          icon={<FileDigit className="h-5 w-5 text-forensic-court" />} 
          linkTo="/evidence"
        />
      </div>

      {/* Quick Actions - Only showing Cases and Evidence for Lawyer role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FolderKanban className="h-5 w-5 mr-2 text-forensic-evidence" />
              Manage Cases
            </CardTitle>
            <CardDescription>View and access case details</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Access case files, evidence, and manage client information
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-evidence hover:bg-forensic-evidence/90">
              <Link to="/cases">
                <span>View Cases</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileDigit className="h-5 w-5 mr-2 text-forensic-accent" />
              View Evidence
            </CardTitle>
            <CardDescription>Access case evidence</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Review digital evidence and verify authenticity
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-accent hover:bg-forensic-accent/90">
              <Link to="/evidence">
                <span>Access Evidence</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest evidence chain of custody events</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivityList />
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/activity">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Assigned Cases</CardTitle>
            <CardDescription>Cases where you have active roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-089</span>
                <span className="font-medium text-forensic-800">Defense</span>
              </div>
              <Progress value={75} className="h-2 bg-forensic-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-092</span>
                <span className="font-medium text-forensic-800">Defense</span>
              </div>
              <Progress value={30} className="h-2 bg-forensic-100" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/cases/assigned">View Assigned Cases</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LawyerDashboard;
