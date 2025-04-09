
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileDigit, 
  FolderKanban, 
  ShieldAlert, 
  Clock, 
  Upload, 
  FileCheck, 
  ArrowUpRight, 
  FileLock2, 
  UserCheck 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RecentActivityList from '../RecentActivityList';
import StatCard from '../StatCard';

const ForensicDashboard = () => {
  // Mock data - would come from API/blockchain in real implementation
  const stats = {
    totalCases: 24,
    activeCases: 18,
    totalEvidence: 143,
    pendingVerification: 7
  };

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Cases" 
          value={stats.totalCases} 
          icon={<FolderKanban className="h-5 w-5 text-forensic-evidence" />} 
          linkTo="/cases"
        />
        <StatCard 
          title="Active Cases" 
          value={stats.activeCases} 
          icon={<ShieldAlert className="h-5 w-5 text-forensic-accent" />} 
          linkTo="/cases?status=active"
        />
        <StatCard 
          title="Total Evidence" 
          value={stats.totalEvidence} 
          icon={<FileDigit className="h-5 w-5 text-forensic-court" />} 
          linkTo="/evidence"
        />
        <StatCard 
          title="Pending Verification" 
          value={stats.pendingVerification} 
          icon={<Clock className="h-5 w-5 text-forensic-warning" />} 
          linkTo="/verify?status=pending"
          highlight={stats.pendingVerification > 0}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Upload className="h-5 w-5 mr-2 text-forensic-evidence" />
              Upload Evidence
            </CardTitle>
            <CardDescription>Add new digital evidence to a case</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Securely upload and hash evidence files to maintain integrity
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-evidence hover:bg-forensic-evidence/90">
              <Link to="/upload">
                <span>Upload Files</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-forensic-accent" />
              Verify Evidence
            </CardTitle>
            <CardDescription>Check integrity of evidence files</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Validate the cryptographic hash of evidence against blockchain records
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-accent hover:bg-forensic-accent/90">
              <Link to="/verify">
                <span>Verify Files</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileLock2 className="h-5 w-5 mr-2 text-forensic-court" />
              Manage Cases
            </CardTitle>
            <CardDescription>View and update case details</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Review case status, manage evidence, and control access permissions
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-court hover:bg-forensic-court/90">
              <Link to="/cases">
                <span>View Cases</span>
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
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-forensic-600" />
              Recent Activity
            </CardTitle>
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
            <CardTitle className="text-lg flex items-center">
              <UserCheck className="h-5 w-5 mr-2 text-forensic-600" />
              Assigned Cases
            </CardTitle>
            <CardDescription>Cases where you have active roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-089</span>
                <span className="font-medium text-forensic-800">Forensic</span>
              </div>
              <Progress value={75} className="h-2 bg-forensic-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-092</span>
                <span className="font-medium text-forensic-800">Forensic</span>
              </div>
              <Progress value={30} className="h-2 bg-forensic-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-104</span>
                <span className="font-medium text-forensic-800">Forensic</span>
              </div>
              <Progress value={90} className="h-2 bg-forensic-100" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/cases/assigned">View Assigned Cases</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ForensicDashboard;
