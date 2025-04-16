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

  // Updated assigned cases data to show actual numbers
  const assignedCases = [
    { id: 'FF-2023-089', progress: 75 },
    { id: 'FF-2023-092', progress: 30 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Cases" 
          value={stats.totalCases} 
          icon={<FolderKanban className="h-5 w-5 text-forensic-evidence" />} 
          linkTo="/cases"
          className="transition-transform hover:scale-102 hover:shadow-md"
        />
        <StatCard 
          title="Active Cases" 
          value={stats.activeCases} 
          icon={<FolderKanban className="h-5 w-5 text-forensic-accent" />} 
          linkTo="/cases?status=active"
          className="transition-transform hover:scale-102 hover:shadow-md"
        />
        <StatCard 
          title="Total Evidence" 
          value={stats.totalEvidence} 
          icon={<FileDigit className="h-5 w-5 text-forensic-court" />} 
          linkTo="/evidence"
          className="transition-transform hover:scale-102 hover:shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="overflow-hidden border border-forensic-200 hover:border-forensic-300 transition-colors">
          <CardHeader className="pb-2 bg-gradient-to-r from-forensic-50 to-transparent">
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
            <Button asChild className="w-full bg-forensic-evidence hover:bg-forensic-evidence/90 shadow-sm transition-all duration-300">
              <Link to="/cases" className="flex items-center justify-center">
                <span>View Cases</span>
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden border border-forensic-200 hover:border-forensic-300 transition-colors">
          <CardHeader className="pb-2 bg-gradient-to-r from-forensic-50 to-transparent">
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
            <Button asChild className="w-full bg-forensic-accent hover:bg-forensic-accent/90 shadow-sm transition-all duration-300">
              <Link to="/evidence" className="flex items-center justify-center">
                <span>Access Evidence</span>
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-forensic-200 hover:border-forensic-300 transition-colors">
          <CardHeader className="bg-gradient-to-r from-forensic-50 to-transparent">
            <CardTitle className="text-lg flex items-center">
              <span className="bg-forensic-100 p-1.5 rounded-full mr-2">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-forensic-700">
                  <path d="M7.5 0.875C4.4375 0.875 1.9375 3.375 1.9375 6.5C1.9375 9.5625 4.4375 12.0625 7.5 12.0625C10.625 12.0625 13.125 9.5625 13.125 6.5C13.125 3.375 10.625 0.875 7.5 0.875ZM7.5 1.5C10.3125 1.5 12.5 3.6875 12.5 6.5C12.5 9.25 10.3125 11.4375 7.5 11.4375C4.75 11.4375 2.5625 9.25 2.5625 6.5C2.5625 3.6875 4.75 1.5 7.5 1.5ZM7.1875 3.375V6.8125H10.625V6.1875H7.8125V3.375H7.1875Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
              </span>
              Recent Activity
            </CardTitle>
            <CardDescription>Latest evidence chain of custody events</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivityList />
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full hover:bg-forensic-50 transition-colors">
              <Link to="/activity">View All Activity</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border border-forensic-200 hover:border-forensic-300 transition-colors">
          <CardHeader>
            <CardTitle>Assigned Cases</CardTitle>
            <CardDescription>Cases where you have active roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignedCases.map((caseItem) => (
              <div key={caseItem.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-forensic-600 font-medium">Case #{caseItem.id}</span>
                  <span className="font-medium text-forensic-800 bg-forensic-100 px-2 py-0.5 rounded-full text-xs">
                    {assignedCases.length} Assigned
                  </span>
                </div>
                <Progress value={caseItem.progress} className="h-2 bg-forensic-100" indicatorClassName="bg-forensic-evidence" />
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full hover:bg-forensic-50 transition-colors">
              <Link to="/cases/assigned">View Assigned Cases</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LawyerDashboard;
