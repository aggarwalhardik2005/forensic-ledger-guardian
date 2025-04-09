
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Scale, 
  FolderKanban, 
  BadgeAlert, 
  Clock, 
  FileSearch, 
  FileCheck, 
  ArrowUpRight, 
  UserCog,
  MailOpen 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RecentActivityList from '../RecentActivityList';
import StatCard from '../StatCard';

const LawyerDashboard = () => {
  // Mock data - would come from API/blockchain in real implementation
  const stats = {
    assignedCases: 15,
    pendingCases: 8,
    evidenceToReview: 54,
    clientMeetings: 6
  };

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Assigned Cases" 
          value={stats.assignedCases} 
          icon={<FolderKanban className="h-5 w-5 text-forensic-warning" />} 
          linkTo="/cases"
        />
        <StatCard 
          title="Pending Court Cases" 
          value={stats.pendingCases} 
          icon={<Scale className="h-5 w-5 text-forensic-court" />} 
          linkTo="/cases?status=pending"
        />
        <StatCard 
          title="Evidence to Review" 
          value={stats.evidenceToReview} 
          icon={<FileSearch className="h-5 w-5 text-forensic-accent" />} 
          linkTo="/evidence?status=unreviewed"
          highlight={stats.evidenceToReview > 0}
        />
        <StatCard 
          title="Client Meetings" 
          value={stats.clientMeetings} 
          icon={<MailOpen className="h-5 w-5 text-forensic-evidence" />} 
          linkTo="/meetings"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileSearch className="h-5 w-5 mr-2 text-forensic-evidence" />
              Review Evidence
            </CardTitle>
            <CardDescription>Examine case evidence</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Access and review evidence with secure verification
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-evidence hover:bg-forensic-evidence/90">
              <Link to="/evidence">
                <span>Evidence Review</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-forensic-accent" />
              Verify Chain of Custody
            </CardTitle>
            <CardDescription>Check evidence integrity</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Verify evidence hasn't been altered and confirm custody log
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-accent hover:bg-forensic-accent/90">
              <Link to="/verify">
                <span>Verify Integrity</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Scale className="h-5 w-5 mr-2 text-forensic-court" />
              Prepare for Court
            </CardTitle>
            <CardDescription>Ready case documentation</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Generate court-ready evidence reports with verification
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-court hover:bg-forensic-court/90">
              <Link to="/cases/prepare">
                <span>Court Preparation</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Activity & Assigned Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-forensic-600" />
              Case Activity
            </CardTitle>
            <CardDescription>Latest updates on your assigned cases</CardDescription>
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
            <CardTitle className="text-lg flex items-center">
              <UserCog className="h-5 w-5 mr-2 text-forensic-600" />
              Client Cases
            </CardTitle>
            <CardDescription>Current client representation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-076</span>
                <span className="font-medium text-forensic-800">Defense</span>
              </div>
              <Progress value={85} className="h-2 bg-forensic-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-101</span>
                <span className="font-medium text-forensic-800">Prosecution</span>
              </div>
              <Progress value={40} className="h-2 bg-forensic-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-118</span>
                <span className="font-medium text-forensic-800">Defense</span>
              </div>
              <Progress value={15} className="h-2 bg-forensic-100" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/clients">Manage Clients</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LawyerDashboard;
