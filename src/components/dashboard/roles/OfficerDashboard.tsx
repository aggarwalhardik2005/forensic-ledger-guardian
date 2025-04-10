
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  FolderKanban, 
  ShieldAlert, 
  Clock, 
  Upload, 
  FileCheck, 
  ArrowUpRight, 
  UserRound,
  Gavel 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RecentActivityList from '../RecentActivityList';
import StatCard from '../StatCard';

const OfficerDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - would come from API/blockchain in real implementation
  const stats = {
    totalFIRs: 36,
    pendingFIRs: 14,
    totalCases: 22,
    totalEvidence: 87
  };

  const handleCreateFIR = () => {
    navigate('/fir/new');
  };

  const handleUploadEvidence = () => {
    navigate('/upload');
  };

  const handleCaseUpdate = () => {
    navigate('/cases/update');
  };

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total FIRs" 
          value={stats.totalFIRs} 
          icon={<FileText className="h-5 w-5 text-forensic-800" />} 
          linkTo="/fir"
        />
        <StatCard 
          title="Pending FIRs" 
          value={stats.pendingFIRs} 
          icon={<ShieldAlert className="h-5 w-5 text-forensic-warning" />} 
          linkTo="/fir?status=pending"
          highlight={stats.pendingFIRs > 0}
        />
        <StatCard 
          title="Total Cases" 
          value={stats.totalCases} 
          icon={<FolderKanban className="h-5 w-5 text-forensic-evidence" />} 
          linkTo="/cases"
        />
        <StatCard 
          title="Evidence Submitted" 
          value={stats.totalEvidence} 
          icon={<FileCheck className="h-5 w-5 text-forensic-accent" />} 
          linkTo="/evidence"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-forensic-800" />
              File New FIR
            </CardTitle>
            <CardDescription>Create a new First Information Report</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Record initial crime report with suspect and witness information
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-forensic-800 hover:bg-forensic-800/90"
              onClick={handleCreateFIR}
            >
              <span>Create FIR</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Upload className="h-5 w-5 mr-2 text-forensic-evidence" />
              Upload Evidence
            </CardTitle>
            <CardDescription>Add evidence to an existing case</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Securely upload and hash evidence files for chain of custody
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-forensic-evidence hover:bg-forensic-evidence/90"
              onClick={handleUploadEvidence}
            >
              <span>Upload Files</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Gavel className="h-5 w-5 mr-2 text-forensic-accent" />
              Case Updates
            </CardTitle>
            <CardDescription>Update case and suspect information</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Add new information or update status on active investigations
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-forensic-accent hover:bg-forensic-accent/90"
              onClick={handleCaseUpdate}
            >
              <span>Update Case</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
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
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates on your cases and FIRs</CardDescription>
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
              <UserRound className="h-5 w-5 mr-2 text-forensic-600" />
              Assigned Cases
            </CardTitle>
            <CardDescription>Cases assigned to you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-056</span>
                <span className="font-medium text-forensic-800">Officer</span>
              </div>
              <Progress value={65} className="h-2 bg-forensic-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-078</span>
                <span className="font-medium text-forensic-800">Officer</span>
              </div>
              <Progress value={45} className="h-2 bg-forensic-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-forensic-600">Case #FF-2023-112</span>
                <span className="font-medium text-forensic-800">Officer</span>
              </div>
              <Progress value={20} className="h-2 bg-forensic-100" />
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

export default OfficerDashboard;
