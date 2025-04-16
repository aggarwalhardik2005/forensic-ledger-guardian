
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Gavel, 
  Scale, 
  FolderKanban, 
  Users, 
  FileDigit,
  Lock,
  ArrowUpRight,
  FileCheck,
  ShieldCheck,
  Clock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import RecentActivityList from '../RecentActivityList';
import StatCard from '../StatCard';

const CourtDashboard = () => {
  // Mock data - would come from API/blockchain in real implementation
  const stats = {
    totalCases: 38,
    pendingApprovals: 12,
    activeCases: 22,
    closedCases: 16
  };

  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Cases" 
          value={stats.totalCases} 
          icon={<FolderKanban className="h-5 w-5 text-forensic-court" />} 
          linkTo="/cases"
        />
        <StatCard 
          title="Pending Approvals" 
          value={stats.pendingApprovals} 
          icon={<Gavel className="h-5 w-5 text-forensic-warning" />} 
          linkTo="/cases/approval"
          highlight={stats.pendingApprovals > 0}
        />
        <StatCard 
          title="Active Cases" 
          value={stats.activeCases} 
          icon={<Scale className="h-5 w-5 text-forensic-accent" />} 
          linkTo="/cases?status=active"
        />
        <StatCard 
          title="Closed Cases" 
          value={stats.closedCases} 
          icon={<Lock className="h-5 w-5 text-forensic-400" />} 
          linkTo="/cases?status=closed"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Case Approvals */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Gavel className="h-5 w-5 mr-2 text-forensic-court" />
              Pending Case Approvals
            </CardTitle>
            <CardDescription>Cases waiting for your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">Case #FF-2023-1{i}2</p>
                    <p className="text-sm text-forensic-500">Filed on April {i+1}, 2023</p>
                  </div>
                  <div className="space-x-2">
                    <Badge className="bg-forensic-warning text-forensic-900">Pending Approval</Badge>
                    <Button 
                      size="sm" 
                      className="bg-forensic-court hover:bg-forensic-court/90"
                      asChild
                    >
                      <Link to="/cases/approval">
                        Review
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link to="/cases/approval">View All Pending Approvals</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-forensic-court" />
              User Management
            </CardTitle>
            <CardDescription>Role assignments and access control</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full bg-forensic-court hover:bg-forensic-court/90">
              <Link to="/users/manage">
                <span>Manage User Roles</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/users/add">
                <span>Add New User</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/users/roles">
                <span>Configure Role Permissions</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-forensic-600" />
              Recent System Activity
            </CardTitle>
            <CardDescription>Latest actions in the forensic platform</CardDescription>
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

        {/* Key Actions Row */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileDigit className="h-5 w-5 mr-2 text-forensic-court" />
                Create New Case
              </CardTitle>
              <CardDescription>Create a new case from FIR</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full bg-forensic-court hover:bg-forensic-court/90">
                <Link to="/cases/create">
                  <span>New Case</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShieldCheck className="h-5 w-5 mr-2 text-forensic-warning" />
                System Security
              </CardTitle>
              <CardDescription>Platform security settings</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full bg-forensic-warning hover:bg-forensic-warning/90 text-forensic-900">
                <Link to="/settings/security">
                  <span>Security Controls</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CourtDashboard;
