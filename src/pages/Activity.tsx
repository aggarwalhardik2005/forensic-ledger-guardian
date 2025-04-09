
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar, DownloadCloud } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

// Activity types
type ActivityType = "evidence_upload" | "case_update" | "verification" | "access" | "system";

interface ActivityItem {
  id: string;
  type: ActivityType;
  description: string;
  user: string;
  timestamp: string;
  caseId?: string;
  evidenceId?: string;
}

// Mock activity data
const activityData: ActivityItem[] = [
  {
    id: "act-001",
    type: "evidence_upload",
    description: "Uploaded new digital evidence file",
    user: "Dr. Anderson",
    timestamp: "2025-04-09T14:32:00Z",
    caseId: "FF-2023-089",
    evidenceId: "EV-2023-421"
  },
  {
    id: "act-002",
    type: "verification",
    description: "Verified evidence hash against blockchain record",
    user: "Officer Johnson",
    timestamp: "2025-04-09T13:15:00Z",
    caseId: "FF-2023-092",
    evidenceId: "EV-2023-420"
  },
  {
    id: "act-003",
    type: "case_update",
    description: "Updated case status to 'In Review'",
    user: "Judge Smith",
    timestamp: "2025-04-09T11:45:00Z",
    caseId: "FF-2023-104"
  },
  {
    id: "act-004",
    type: "access",
    description: "Accessed evidence records",
    user: "Attorney Davis",
    timestamp: "2025-04-09T10:22:00Z",
    caseId: "FF-2023-118",
    evidenceId: "EV-2023-415"
  },
  {
    id: "act-005",
    type: "system",
    description: "System backup completed",
    user: "System",
    timestamp: "2025-04-09T09:00:00Z"
  },
  {
    id: "act-006",
    type: "evidence_upload",
    description: "Uploaded network logs as evidence",
    user: "Dr. Anderson",
    timestamp: "2025-04-08T16:47:00Z",
    caseId: "FF-2023-092",
    evidenceId: "EV-2023-419"
  },
  {
    id: "act-007",
    type: "case_update",
    description: "Created new case from FIR",
    user: "Judge Smith",
    timestamp: "2025-04-08T15:30:00Z",
    caseId: "FF-2023-119"
  },
  {
    id: "act-008",
    type: "verification",
    description: "Chain of custody verified",
    user: "Attorney Davis",
    timestamp: "2025-04-08T14:15:00Z",
    caseId: "FF-2023-076",
    evidenceId: "EV-2023-380"
  },
  {
    id: "act-009",
    type: "access",
    description: "Downloaded evidence for court preparation",
    user: "Attorney Davis",
    timestamp: "2025-04-08T11:22:00Z",
    caseId: "FF-2023-076",
    evidenceId: "EV-2023-380"
  },
  {
    id: "act-010",
    type: "system",
    description: "New user role assigned",
    user: "Judge Smith",
    timestamp: "2025-04-08T10:10:00Z"
  }
];

const getActivityTypeBadge = (type: ActivityType) => {
  switch (type) {
    case 'evidence_upload':
      return <Badge className="bg-forensic-evidence text-white">Evidence Upload</Badge>;
    case 'case_update':
      return <Badge className="bg-forensic-court text-white">Case Update</Badge>;
    case 'verification':
      return <Badge className="bg-forensic-accent text-white">Verification</Badge>;
    case 'access':
      return <Badge className="bg-forensic-800 text-white">Access</Badge>;
    case 'system':
      return <Badge className="bg-gray-500 text-white">System</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

const Activity = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Filter activities based on search and filter
  const filteredActivities = activityData
    .filter(activity => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          activity.description.toLowerCase().includes(query) ||
          activity.user.toLowerCase().includes(query) ||
          (activity.caseId && activity.caseId.toLowerCase().includes(query)) ||
          (activity.evidenceId && activity.evidenceId.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter(activity => {
      // Type filter
      if (typeFilter === 'all') return true;
      return activity.type === typeFilter;
    });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-forensic-800">Activity Log</h1>
        <Button className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2">
          <DownloadCloud className="h-4 w-4" />
          <span>Export Log</span>
        </Button>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-forensic-500" />
          <Input
            placeholder="Search activities..."
            className="pl-8 border-forensic-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-forensic-500" />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="border-forensic-200">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activity Types</SelectItem>
              <SelectItem value="evidence_upload">Evidence Upload</SelectItem>
              <SelectItem value="case_update">Case Update</SelectItem>
              <SelectItem value="verification">Verification</SelectItem>
              <SelectItem value="access">Access</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-forensic-500" />
          <Select>
            <SelectTrigger className="border-forensic-200">
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity History</CardTitle>
          <CardDescription>
            Recent system and user activities related to cases and evidence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead className="w-[300px]">Description</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Case ID</TableHead>
                <TableHead>Evidence ID</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{getActivityTypeBadge(activity.type)}</TableCell>
                  <TableCell className="font-medium">{activity.description}</TableCell>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell>{activity.caseId || '-'}</TableCell>
                  <TableCell>{activity.evidenceId || '-'}</TableCell>
                  <TableCell className="text-sm text-forensic-600">
                    {new Date(activity.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activity;
