
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Users,
  Files,
  Calendar,
  Clock,
  AlertTriangle,
  FileCheck,
  MessageSquare,
  Edit,
  Send,
  Download,
  FileLock2,
  Plus,
  ChevronLeft,
  CheckCircle2,
  Eye
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';

// Mock case data
const caseData = {
  "FF-2023-104": {
    id: "FF-2023-104",
    title: "State vs. Johnson",
    status: "active",
    priority: "high",
    courtDate: "2025-06-15T10:00:00Z",
    createdDate: "2025-04-01T08:30:00Z",
    lastUpdated: "2025-04-09T14:20:00Z",
    description: "Case regarding alleged cybercrime involving data theft and unauthorized system access.",
    firId: "FF-2023-104-FIR",
    caseType: "Criminal",
    jurisdiction: "District Court",
    assignedJudge: "Judge Smith",
    prosecutor: "Sarah Lee",
    defenseAttorney: "Jennifer Miller",
    leadOfficer: "John Smith",
    forensicExpert: "Emily Chen",
    evidenceCount: 5,
    suspects: [
      { name: "Alex Johnson", id: "S-001", status: "In Custody" }
    ],
    victims: [
      { name: "TechCorp Inc.", id: "V-001", type: "Organization" }
    ],
    witnesses: [
      { name: "Michael Rodriguez", id: "W-001" },
      { name: "Emma Wilson", id: "W-002" }
    ],
    evidence: [
      { id: "EV-104-001", name: "disk_image_laptop.dd", type: "disk_image", status: "verified" },
      { id: "EV-104-002", name: "system_logs.zip", type: "log_files", status: "verified" },
      { id: "EV-104-003", name: "network_traffic.pcap", type: "network_data", status: "pending" },
      { id: "EV-104-004", name: "email_export.pst", type: "emails", status: "verified" },
      { id: "EV-104-005", name: "screenshot_evidence.png", type: "image", status: "pending" }
    ],
    comments: [
      { id: 1, author: "John Smith", role: "Officer", content: "Initial evidence collection complete.", timestamp: "2025-04-02T10:15:00Z" },
      { id: 2, author: "Emily Chen", role: "Forensic Investigator", content: "Disk image analysis shows deleted files that may be relevant.", timestamp: "2025-04-03T14:30:00Z" },
      { id: 3, author: "Sarah Lee", role: "Prosecutor", content: "Need additional information about suspect's online activities.", timestamp: "2025-04-04T09:45:00Z" }
    ]
  },
  "FF-2023-092": {
    id: "FF-2023-092",
    title: "State vs. Williams",
    status: "active",
    priority: "medium",
    courtDate: "2025-05-20T09:30:00Z",
    createdDate: "2025-03-02T09:12:45Z",
    lastUpdated: "2025-04-07T11:05:30Z",
    description: "Case involving smartphone extraction data for fraud investigation.",
    firId: "FF-2023-092-FIR",
    caseType: "Criminal",
    jurisdiction: "District Court",
    assignedJudge: "Judge Rodriguez",
    prosecutor: "Jennifer Miller",
    defenseAttorney: "Daniel Martinez",
    leadOfficer: "Robert Johnson",
    forensicExpert: "Emily Chen",
    evidenceCount: 3,
    suspects: [
      { name: "Thomas Williams", id: "S-002", status: "Released on Bail" }
    ],
    victims: [
      { name: "First National Bank", id: "V-002", type: "Organization" },
      { name: "Multiple Account Holders", id: "V-003", type: "Group" }
    ],
    witnesses: [
      { name: "Susan Clark", id: "W-003" }
    ],
    evidence: [
      { id: "EV-092-001", name: "smartphone_extraction.tar", type: "mobile_data", status: "verified" },
      { id: "EV-092-002", name: "bank_statements.pdf", type: "document", status: "verified" },
      { id: "EV-092-003", name: "surveillance_footage.mp4", type: "video", status: "pending" }
    ],
    comments: [
      { id: 1, author: "Robert Johnson", role: "Officer", content: "Smartphone data shows evidence of fraudulent transactions.", timestamp: "2025-03-05T11:20:00Z" },
      { id: 2, author: "Emily Chen", role: "Forensic Investigator", content: "Found deleted text messages discussing account numbers.", timestamp: "2025-03-10T15:45:00Z" }
    ]
  }
};

const CaseDetail = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { toast } = useToast();
  
  // Get the case based on the ID from the URL
  const caseInfo = caseId ? caseData[caseId as keyof typeof caseData] : null;
  
  if (!caseInfo) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-medium text-forensic-800">Case not found</h2>
        <p className="text-forensic-600 mt-2">The requested case could not be found.</p>
        <Button asChild className="mt-4">
          <Link to="/cases">Return to Cases</Link>
        </Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-forensic-accent text-white">Active</Badge>;
      case "closed":
        return <Badge className="bg-forensic-success text-white">Closed</Badge>;
      case "pending":
        return <Badge className="bg-forensic-warning text-forensic-900">Pending</Badge>;
      default:
        return <Badge className="bg-forensic-400 text-white">{status}</Badge>;
    }
  };

  const getEvidenceBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return <Badge className="bg-forensic-success text-white">Verified</Badge>;
      case "pending":
        return <Badge className="bg-forensic-warning text-forensic-900">Pending</Badge>;
      default:
        return <Badge className="bg-forensic-400 text-white">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return <Badge variant="outline" className="border-forensic-danger text-forensic-danger">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="border-forensic-warning text-forensic-warning">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="border-forensic-success text-forensic-success">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: `Case report for ${caseInfo.id} has been downloaded.`
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/cases" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Cases
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-forensic-800">{caseInfo.title}</h1>
          {getStatusBadge(caseInfo.status)}
          {getPriorityBadge(caseInfo.priority)}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button className="bg-forensic-court hover:bg-forensic-court/90">
            <Edit className="h-4 w-4 mr-2" />
            Edit Case
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-forensic-court" />
            <span>Case Overview</span>
          </CardTitle>
          <CardDescription>Case #{caseInfo.id} details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-forensic-500">Case ID</p>
              <p className="font-medium">{caseInfo.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-forensic-500">FIR Reference</p>
              <p className="font-medium">{caseInfo.firId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-forensic-500">Case Type</p>
              <p className="font-medium">{caseInfo.caseType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-forensic-500">Jurisdiction</p>
              <p className="font-medium">{caseInfo.jurisdiction}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-forensic-500">Date Created</p>
              <p className="font-medium">{new Date(caseInfo.createdDate).toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-forensic-500">Last Updated</p>
              <p className="font-medium">{new Date(caseInfo.lastUpdated).toLocaleString()}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm text-forensic-500 mb-2">Case Description</h3>
            <p className="text-forensic-800">{caseInfo.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-forensic-500 mb-2">Court Date</h3>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-forensic-court" />
                <span className="font-medium">{new Date(caseInfo.courtDate).toLocaleDateString()}</span>
                <Clock className="h-4 w-4 text-forensic-600" />
                <span className="font-medium">{new Date(caseInfo.courtDate).toLocaleTimeString()}</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm text-forensic-500 mb-2">Evidence</h3>
              <div className="flex items-center space-x-2">
                <Files className="h-5 w-5 text-forensic-accent" />
                <span className="font-medium">{caseInfo.evidenceCount} items</span>
                <AlertTriangle className={`h-4 w-4 ${caseInfo.evidence.some(e => e.status === 'pending') ? 'text-forensic-warning' : 'text-forensic-success'}`} />
                <span className="font-medium">
                  {caseInfo.evidence.some(e => e.status === 'pending')
                    ? `${caseInfo.evidence.filter(e => e.status === 'pending').length} pending verification`
                    : 'All verified'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="assignees">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="assignees">Case Assignees</TabsTrigger>
          <TabsTrigger value="involved">Involved Parties</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignees" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-forensic-court" />
                Assigned Personnel
              </CardTitle>
              <CardDescription>Personnel assigned to the case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border border-forensic-200 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-forensic-800">Court</h3>
                      <Badge className="bg-forensic-court text-white">Court</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-forensic-600">Assigned Judge:</span>
                        <span className="font-medium text-forensic-800">{caseInfo.assignedJudge}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-forensic-600">Jurisdiction:</span>
                        <span className="font-medium text-forensic-800">{caseInfo.jurisdiction}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-forensic-200 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-forensic-800">Legal Representatives</h3>
                      <Badge className="bg-forensic-warning text-forensic-900">Legal</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-forensic-600">Prosecutor:</span>
                        <span className="font-medium text-forensic-800">{caseInfo.prosecutor}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-forensic-600">Defense Attorney:</span>
                        <span className="font-medium text-forensic-800">{caseInfo.defenseAttorney}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border border-forensic-200 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-forensic-800">Investigation</h3>
                      <Badge className="bg-forensic-800 text-white">Officer</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-forensic-600">Lead Officer:</span>
                        <span className="font-medium text-forensic-800">{caseInfo.leadOfficer}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-forensic-200 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-forensic-800">Forensics</h3>
                      <Badge className="bg-forensic-accent text-white">Forensic</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-forensic-600">Lead Expert:</span>
                        <span className="font-medium text-forensic-800">{caseInfo.forensicExpert}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="involved" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-forensic-court" />
                Involved Parties
              </CardTitle>
              <CardDescription>Suspects, victims, and witnesses involved in the case</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="suspects">
                <TabsList className="mb-4">
                  <TabsTrigger value="suspects">Suspects</TabsTrigger>
                  <TabsTrigger value="victims">Victims</TabsTrigger>
                  <TabsTrigger value="witnesses">Witnesses</TabsTrigger>
                </TabsList>
                
                <TabsContent value="suspects">
                  <div className="space-y-4">
                    {caseInfo.suspects.map(suspect => (
                      <div key={suspect.id} className="p-4 border border-forensic-200 rounded-md flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-forensic-800">{suspect.name}</h3>
                          <p className="text-sm text-forensic-600">ID: {suspect.id}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-forensic-danger text-white">{suspect.status}</Badge>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Suspect
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="victims">
                  <div className="space-y-4">
                    {caseInfo.victims.map(victim => (
                      <div key={victim.id} className="p-4 border border-forensic-200 rounded-md flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-forensic-800">{victim.name}</h3>
                          <p className="text-sm text-forensic-600">ID: {victim.id} • Type: {victim.type}</p>
                        </div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    ))}
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Victim
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="witnesses">
                  <div className="space-y-4">
                    {caseInfo.witnesses.map(witness => (
                      <div key={witness.id} className="p-4 border border-forensic-200 rounded-md flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-forensic-800">{witness.name}</h3>
                          <p className="text-sm text-forensic-600">ID: {witness.id}</p>
                        </div>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    ))}
                    <Button className="w-full" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Witness
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evidence" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Files className="h-5 w-5 mr-2 text-forensic-accent" />
                Case Evidence
              </CardTitle>
              <CardDescription>Evidence items associated with this case</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseInfo.evidence.map(item => (
                  <div key={item.id} className="p-4 border border-forensic-200 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <FileCheck className="h-5 w-5 text-forensic-evidence" />
                        <h3 className="font-medium text-forensic-800">{item.name}</h3>
                        {getEvidenceBadge(item.status)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <FileLock2 className="h-4 w-4 mr-1" />
                          View Chain
                        </Button>
                        <Button size="sm" className="bg-forensic-evidence hover:bg-forensic-evidence/90">
                          <Eye className="h-4 w-4 mr-1" />
                          View Evidence
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-forensic-600">
                        ID: {item.id} • Type: {item.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Evidence
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-1" />
                    Download All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-forensic-court" />
                Case Comments
              </CardTitle>
              <CardDescription>Communication thread for case-related comments and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {caseInfo.comments.map(comment => (
                  <div key={comment.id} className="p-4 border border-forensic-200 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <h3 className="font-medium text-forensic-800 mr-2">{comment.author}</h3>
                        <Badge variant="outline">{comment.role}</Badge>
                      </div>
                      <p className="text-sm text-forensic-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-forensic-700">{comment.content}</p>
                  </div>
                ))}
                
                <div className="flex space-x-2 mt-6">
                  <Input placeholder="Add a comment..." />
                  <Button className="bg-forensic-court hover:bg-forensic-court/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-center border-t pt-4">
              <Button variant="outline" className="w-full">
                <CheckCircle2 className="h-4 w-4 mr-1" /> 
                Mark All as Read
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CaseDetail;
