
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  FolderPlus, 
  FolderKanban, 
  Lock, 
  Unlock, 
  FileDigit,
  Calendar 
} from "lucide-react";
import { cn } from '@/lib/utils';

// Mock case data
const casesData = [
  {
    id: "FF-2023-104",
    title: "Network Intrusion at TechCorp",
    firId: "FIR-2023-T104",
    evidenceCount: 12,
    status: "open",
    dateCreated: "2025-03-15",
    isSealed: false,
    tags: ["cyber-crime", "data-breach", "malware"]
  },
  {
    id: "FF-2023-092",
    title: "Mobile Device Analysis - Rodriguez Case",
    firId: "FIR-2023-M092",
    evidenceCount: 7,
    status: "open",
    dateCreated: "2025-03-01",
    isSealed: false,
    tags: ["mobile-forensics", "photos", "messages"]
  },
  {
    id: "FF-2023-089",
    title: "Email Fraud Investigation - Acme Corp",
    firId: "FIR-2023-E089",
    evidenceCount: 24,
    status: "open",
    dateCreated: "2025-02-18",
    isSealed: false,
    tags: ["email", "phishing", "financial-crime"]
  },
  {
    id: "FF-2023-078",
    title: "Ransomware Attack Evidence",
    firId: "FIR-2023-R078",
    evidenceCount: 18,
    status: "sealed",
    dateCreated: "2025-02-02",
    isSealed: true,
    tags: ["ransomware", "crypto", "malware"]
  },
  {
    id: "FF-2023-065",
    title: "Social Media Account Compromise",
    firId: "FIR-2023-S065",
    evidenceCount: 5,
    status: "closed",
    dateCreated: "2025-01-20",
    isSealed: false,
    tags: ["social-media", "account-hijacking"]
  }
];

const CaseList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter cases based on search term and status
  const filteredCases = casesData.filter(caseItem => {
    const matchesSearch = 
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.firId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'all' || 
      caseItem.status === statusFilter ||
      (statusFilter === 'sealed' && caseItem.isSealed);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">Case Management</h1>
        <Button className="bg-forensic-accent hover:bg-forensic-accent/90">
          <FolderPlus className="mr-2 h-4 w-4" />
          New Case
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-forensic-500" />
          <Input
            placeholder="Search cases by ID, title, or tags..."
            className="pl-8 border-forensic-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-forensic-500" />
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="border-forensic-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="open">Open Cases</SelectItem>
              <SelectItem value="sealed">Sealed Cases</SelectItem>
              <SelectItem value="closed">Closed Cases</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-sm text-forensic-500 flex items-center justify-end">
          Showing {filteredCases.length} of {casesData.length} cases
        </div>
      </div>

      {/* Case List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCases.map((caseItem) => (
          <Link to={`/cases/${caseItem.id}`} key={caseItem.id}>
            <Card className="hover:shadow-md transition-all duration-200 border border-forensic-200">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FolderKanban className={cn(
                        "h-5 w-5",
                        caseItem.isSealed ? "text-forensic-danger" : "text-forensic-accent"
                      )} />
                      <h3 className="font-bold text-forensic-800">{caseItem.title}</h3>
                      <Badge variant="secondary" className={cn(
                        "status-badge",
                        caseItem.isSealed ? "status-badge-sealed" : 
                        caseItem.status === "open" ? "status-badge-open" : "bg-forensic-200"
                      )}>
                        {caseItem.isSealed ? "Sealed" : caseItem.status}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {caseItem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-forensic-100 hover:bg-forensic-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-0 flex flex-col md:flex-row gap-2 md:items-center">
                    <div className="flex items-center text-sm text-forensic-600">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(caseItem.dateCreated).toLocaleDateString()}
                    </div>
                    
                    <div className="hidden md:block text-forensic-400 mx-2">|</div>
                    
                    <div className="flex items-center text-sm text-forensic-600">
                      <FileDigit className="mr-1 h-4 w-4" />
                      {caseItem.evidenceCount} {caseItem.evidenceCount === 1 ? 'item' : 'items'}
                    </div>
                    
                    <div className="hidden md:block text-forensic-400 mx-2">|</div>
                    
                    <div className="flex items-center text-sm text-forensic-600">
                      {caseItem.isSealed ? (
                        <>
                          <Lock className="mr-1 h-4 w-4 text-forensic-danger" />
                          <span className="text-forensic-danger">Sealed</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="mr-1 h-4 w-4 text-forensic-success" />
                          <span className="text-forensic-success">Accessible</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-sm">
                  <span className="text-forensic-500">Case ID: {caseItem.id}</span>
                  <span className="mx-2 text-forensic-400">•</span>
                  <span className="text-forensic-500">FIR: {caseItem.firId}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CaseList;
