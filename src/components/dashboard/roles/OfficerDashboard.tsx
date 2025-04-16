
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileDigit, 
  FolderKanban, 
  Upload, 
  CheckCircle, 
  BarChart3,
  ArrowUpRight, 
  AlignLeft  
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import RecentActivityList from '../RecentActivityList';
import StatCard from '../StatCard';

const OfficerDashboard = () => {
  // Mock data - would come from API/blockchain in real implementation
  const stats = {
    totalCases: 17,
    activeCases: 12,
    totalEvidence: 98,
    pendingVerification: 4
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
          icon={<FolderKanban className="h-5 w-5 text-forensic-accent" />} 
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
          icon={<CheckCircle className="h-5 w-5 text-forensic-warning" />} 
          linkTo="/verify?status=pending"
          highlight={stats.pendingVerification > 0}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <AlignLeft className="h-5 w-5 mr-2 text-forensic-evidence" />
              FIR Management
            </CardTitle>
            <CardDescription>Manage First Information Reports</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Create and update First Information Reports (FIR)
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-evidence hover:bg-forensic-evidence/90">
              <Link to="/fir">
                <span>Manage FIRs</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Upload className="h-5 w-5 mr-2 text-forensic-accent" />
              Upload Evidence
            </CardTitle>
            <CardDescription>Add new digital evidence to a case</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Securely upload and hash evidence files
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-accent hover:bg-forensic-accent/90">
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
              <CheckCircle className="h-5 w-5 mr-2 text-forensic-court" />
              Verify Evidence
            </CardTitle>
            <CardDescription>Check integrity of evidence files</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Validate evidence against blockchain records
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-forensic-court hover:bg-forensic-court/90">
              <Link to="/verify">
                <span>Verify Files</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Reports */}
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
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-forensic-600" />
              Reports
            </CardTitle>
            <CardDescription>View officer reports and analytics</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-forensic-600">
              Access case statistics, evidence tracking, and investigation reports
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/officer/reports">
                <span>View Reports</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default OfficerDashboard;
