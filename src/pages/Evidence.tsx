
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  FileDigit, 
  Search, 
  Filter,
  ArrowUpDown,
  FileCheck,
  FileX,
  Eye
} from "lucide-react";
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";

// Mock evidence data
const evidenceData = [
  {
    id: "EV-104-001",
    name: "disk_image_laptop.dd",
    type: "disk_image",
    caseId: "FF-2023-104",
    submittedBy: "John Smith",
    submittedDate: "2025-04-08T10:23:45Z",
    size: 4.2 * 1024 * 1024 * 1024, // 4.2 GB
    verified: true
  },
  {
    id: "EV-104-002",
    name: "system_logs.zip",
    type: "log_files",
    caseId: "FF-2023-104",
    submittedBy: "John Smith",
    submittedDate: "2025-04-08T11:35:12Z",
    size: 156 * 1024 * 1024, // 156 MB
    verified: true
  },
  {
    id: "EV-092-001",
    name: "smartphone_extraction.tar",
    type: "mobile_data",
    caseId: "FF-2023-092",
    submittedBy: "Sarah Lee",
    submittedDate: "2025-03-02T09:12:45Z",
    size: 2.8 * 1024 * 1024 * 1024, // 2.8 GB
    verified: true
  },
  {
    id: "EV-089-001",
    name: "email_archives.pst",
    type: "emails",
    caseId: "FF-2023-089",
    submittedBy: "Emily Johnson",
    submittedDate: "2025-02-19T14:23:11Z",
    size: 1.2 * 1024 * 1024 * 1024, // 1.2 GB
    verified: false
  },
  {
    id: "EV-089-002",
    name: "network_capture.pcap",
    type: "network_captures",
    caseId: "FF-2023-089",
    submittedBy: "John Smith",
    submittedDate: "2025-02-20T16:45:33Z",
    size: 890 * 1024 * 1024, // 890 MB
    verified: true
  }
];

// Format bytes to human-readable size
const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format evidence type for display
const formatType = (type: string) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const Evidence = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">Evidence Manager</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-forensic-500" />
          <Input
            placeholder="Search evidence..."
            className="pl-8 border-forensic-200"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-forensic-500" />
          <Select defaultValue="all">
            <SelectTrigger className="border-forensic-200">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="disk_image">Disk Images</SelectItem>
              <SelectItem value="memory_dump">Memory Dumps</SelectItem>
              <SelectItem value="log_files">Log Files</SelectItem>
              <SelectItem value="emails">Email Archives</SelectItem>
              <SelectItem value="network_captures">Network Captures</SelectItem>
              <SelectItem value="mobile_data">Mobile Device Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 justify-end">
          <ArrowUpDown className="h-4 w-4 text-forensic-500" />
          <Select defaultValue="newest">
            <SelectTrigger className="border-forensic-200 w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="size">Size (Largest)</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Evidence List */}
      <div className="grid grid-cols-1 gap-4">
        {evidenceData.map((evidence) => (
          <Card key={evidence.id} className="hover:shadow-md transition-all duration-200 border border-forensic-200">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FileDigit className="h-5 w-5 text-forensic-evidence" />
                    <h3 className="font-bold text-forensic-800">{evidence.name}</h3>
                    {evidence.verified ? (
                      <Badge className="bg-forensic-success/20 text-forensic-success">
                        <FileCheck className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-forensic-warning/20 text-forensic-warning">
                        <FileX className="h-3 w-3 mr-1" />
                        Unverified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-forensic-600">
                    <span>ID: {evidence.id}</span>
                    <span>Case: {evidence.caseId}</span>
                    <Badge variant="outline" className="bg-forensic-50">
                      {formatType(evidence.type)}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3 md:mt-0 flex items-center space-x-3">
                  <div className="text-sm text-forensic-500">
                    {formatBytes(evidence.size)}
                  </div>
                  
                  <Button size="sm" variant="outline" className="h-8">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  <Button size="sm" className="bg-forensic-evidence hover:bg-forensic-evidence/90 h-8">
                    <FileCheck className="h-4 w-4 mr-1" />
                    Verify
                  </Button>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-forensic-500">
                <span>Submitted by {evidence.submittedBy} on {new Date(evidence.submittedDate).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Evidence;
