
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  FileDigit,
  FileCheck,
  Upload,
  FolderKanban,
  Clock,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle
} from "lucide-react";

// Mock activity data
const activityData = [
  {
    id: "ACT-2025001",
    action: "Evidence Upload",
    user: "John Smith",
    role: "Officer",
    timestamp: "2025-04-08T14:23:11Z",
    caseId: "FF-2023-104",
    details: "Uploaded disk_image_laptop.dd (4.2 GB)",
    icon: <Upload className="h-5 w-5 text-forensic-evidence" />,
    status: "success"
  },
  {
    id: "ACT-2025002",
    action: "Evidence Verification",
    user: "Emily Chen",
    role: "Forensic",
    timestamp: "2025-04-08T15:30:22Z",
    caseId: "FF-2023-104",
    details: "Verified disk_image_laptop.dd hash integrity",
    icon: <FileCheck className="h-5 w-5 text-forensic-accent" />,
    status: "success"
  },
  {
    id: "ACT-2025003",
    action: "Case Access",
    user: "Sarah Lee",
    role: "Lawyer",
    timestamp: "2025-04-08T16:45:33Z",
    caseId: "FF-2023-104",
    details: "Accessed case file and evidence records",
    icon: <Eye className="h-5 w-5 text-forensic-court" />,
    status: "success"
  },
  {
    id: "ACT-2025004",
    action: "Case Update",
    user: "Michael Wong",
    role: "Court",
    timestamp: "2025-04-08T17:20:45Z",
    caseId: "FF-2023-104",
    details: "Updated case status to 'Active Investigation'",
    icon: <FolderKanban className="h-5 w-5 text-forensic-court" />,
    status: "success"
  },
  {
    id: "ACT-2025005",
    action: "Evidence Access",
    user: "Robert Johnson",
    role: "Officer", 
    timestamp: "2025-04-09T09:15:30Z",
    caseId: "FF-2023-092",
    details: "Downloaded smartphone_extraction.tar for analysis",
    icon: <FileDigit className="h-5 w-5 text-forensic-800" />,
    status: "success"
  },
  {
    id: "ACT-2025006",
    action: "Failed Login",
    user: "Unknown",
    role: "N/A",
    timestamp: "2025-04-09T10:22:15Z",
    caseId: "N/A",
    details: "Failed login attempt from IP 192.168.1.45",
    icon: <AlertTriangle className="h-5 w-5 text-forensic-warning" />,
    status: "warning"
  },
  {
    id: "ACT-2025007",
    action: "Role Assignment",
    user: "Michael Wong",
    role: "Court",
    timestamp: "2025-04-09T11:30:00Z",
    caseId: "FF-2023-118",
    details: "Assigned Lawyer role to Sarah Lee",
    icon: <Shield className="h-5 w-5 text-forensic-court" />,
    status: "success"
  },
  {
    id: "ACT-2025008",
    action: "FIR Creation",
    user: "John Smith",
    role: "Officer",
    timestamp: "2025-04-09T13:45:22Z",
    caseId: "N/A",
    details: "Created new FIR #FF-2023-120",
    icon: <FolderKanban className="h-5 w-5 text-forensic-800" />,
    status: "success"
  }
];

const Activity = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  
  // Filter activities based on search and filter
  const filteredActivities = activityData
    .filter(activity => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          activity.action.toLowerCase().includes(query) ||
          activity.user.toLowerCase().includes(query) ||
          activity.details.toLowerCase().includes(query) ||
          activity.caseId.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(activity => {
      // Status filter
      if (filter === 'all') return true;
      return activity.status === filter;
    })
    .sort((a, b) => {
      // Sort
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      
      if (sort === 'newest') return dateB - dateA;
      if (sort === 'oldest') return dateA - dateB;
      return 0;
    });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'success':
        return (
          <Badge className="bg-forensic-success/20 text-forensic-success">
            <CheckCircle className="h-3 w-3 mr-1" />
            Success
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="bg-forensic-warning/20 text-forensic-warning">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Warning
          </Badge>
        );
      case 'error':
        return (
          <Badge className="bg-forensic-danger/20 text-forensic-danger">
            <XCircle className="h-3 w-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">Activity Log</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all" onClick={() => setFilter('all')}>All Activity</TabsTrigger>
          <TabsTrigger value="case" onClick={() => setFilter('case')}>Case Activity</TabsTrigger>
          <TabsTrigger value="evidence" onClick={() => setFilter('evidence')}>Evidence Activity</TabsTrigger>
          <TabsTrigger value="system" onClick={() => setFilter('system')}>System Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-forensic-500" />
              <Input
                placeholder="Search activity logs..."
                className="pl-8 border-forensic-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-forensic-500" />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="border-forensic-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 justify-end">
              <ArrowUpDown className="h-4 w-4 text-forensic-500" />
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="border-forensic-200 w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Activity List */}
          <div className="space-y-4">
            {filteredActivities.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <AlertTriangle className="h-12 w-12 text-forensic-400 mb-2" />
                  <p className="text-lg font-medium text-forensic-800">No activities found</p>
                  <p className="text-forensic-500">Try adjusting your filters or search query</p>
                </CardContent>
              </Card>
            ) : (
              filteredActivities.map(activity => (
                <Card key={activity.id} className="hover:shadow-md transition-all duration-200 border border-forensic-200">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="bg-forensic-50 p-2 rounded-full">
                            {activity.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-forensic-800">{activity.action}</h3>
                            <p className="text-sm text-forensic-500">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-forensic-600">
                          <Badge variant="outline" className="bg-forensic-50">
                            {activity.role}
                          </Badge>
                          <span className="font-medium">{activity.user}</span>
                          {activity.caseId !== "N/A" && (
                            <span>Case: {activity.caseId}</span>
                          )}
                          {getStatusBadge(activity.status)}
                        </div>
                        
                        <p className="text-forensic-600">{activity.details}</p>
                      </div>
                      
                      <div className="mt-3 md:mt-0">
                        <Button size="sm" variant="outline" className="h-8">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          {filteredActivities.length > 0 && (
            <div className="flex justify-center">
              <Button variant="outline">Load More Activities</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="case" className="space-y-4">
          {/* We would implement similar content for case-specific activities */}
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-forensic-600">Filtered case activities will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evidence" className="space-y-4">
          {/* We would implement similar content for evidence-specific activities */}
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-forensic-600">Filtered evidence activities will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          {/* We would implement similar content for system-specific activities */}
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-forensic-600">Filtered system activities will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Activity;
