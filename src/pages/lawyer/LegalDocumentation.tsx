
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ScrollText,
  FileText,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Save,
  Download,
  Clock,
  CheckCircle,
  File,
  Copy,
  FileDigit,
  PanelLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';

// Mock document data
const documentsData = [
  {
    id: "DOC-001",
    title: "Defense Strategy Brief",
    caseId: "FF-2023-076",
    client: "Marcus Turner",
    created: "2025-04-08T11:30:00Z",
    modified: "2025-04-09T09:15:00Z",
    status: "draft",
    type: "brief"
  },
  {
    id: "DOC-002",
    title: "Evidence Examination Report",
    caseId: "FF-2023-076",
    client: "Marcus Turner",
    created: "2025-04-07T16:45:00Z",
    modified: "2025-04-08T14:20:00Z",
    status: "completed",
    type: "report"
  },
  {
    id: "DOC-003",
    title: "Digital Evidence Analysis",
    caseId: "FF-2023-101",
    client: "Sarah Chen",
    created: "2025-04-06T10:15:00Z",
    modified: "2025-04-09T08:30:00Z",
    status: "review",
    type: "analysis"
  },
  {
    id: "DOC-004",
    title: "Motion to Suppress Evidence",
    caseId: "FF-2023-076",
    client: "Marcus Turner",
    created: "2025-04-04T15:00:00Z",
    modified: "2025-04-05T11:45:00Z",
    status: "filed",
    type: "motion"
  },
  {
    id: "DOC-005",
    title: "Client Interview Notes",
    caseId: "FF-2023-118",
    client: "Raj Patel",
    created: "2025-04-01T13:10:00Z",
    modified: "2025-04-01T13:10:00Z",
    status: "completed",
    type: "notes"
  }
];

// Mock templates
const templatesData = [
  {
    id: "TPL-001",
    title: "Defense Strategy Template",
    type: "brief",
    sections: 5,
    lastUsed: "2025-04-01T13:10:00Z"
  },
  {
    id: "TPL-002",
    title: "Evidence Analysis Report",
    type: "report",
    sections: 8,
    lastUsed: "2025-03-28T09:45:00Z"
  },
  {
    id: "TPL-003",
    title: "Motion to Suppress",
    type: "motion",
    sections: 4,
    lastUsed: "2025-03-15T11:30:00Z"
  },
  {
    id: "TPL-004",
    title: "Client Interview Form",
    type: "form",
    sections: 7,
    lastUsed: "2025-04-02T14:20:00Z"
  }
];

// Mock evidence items that can be cited
const evidenceItems = [
  {
    id: "EV-2023-421",
    name: "Network Traffic Log",
    caseId: "FF-2023-089",
    type: "log",
    hash: "0x8a7b561c4de93f2b7af3ab36a335d4df91d173c7",
    verified: true
  },
  {
    id: "EV-2023-420",
    name: "Server Access Logs",
    caseId: "FF-2023-092",
    type: "log",
    hash: "0x9c3fed4771290b8431f43c29c6c056a3b4cb31a2",
    verified: true
  },
  {
    id: "EV-2023-380",
    name: "Email Thread Export",
    caseId: "FF-2023-076",
    type: "email",
    hash: "0xf59a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
    verified: true
  },
  {
    id: "EV-2023-415",
    name: "Mobile Extraction",
    caseId: "FF-2023-118",
    type: "mobile",
    hash: "0xd15a74c98b62f532e97a1c4f690cb8743ee1f90b",
    verified: true
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'draft':
      return (
        <Badge className="bg-forensic-400/20 text-forensic-600">
          <File className="h-3 w-3 mr-1" />
          Draft
        </Badge>
      );
    case 'review':
      return (
        <Badge className="bg-forensic-warning/20 text-forensic-warning">
          <Clock className="h-3 w-3 mr-1" />
          In Review
        </Badge>
      );
    case 'completed':
      return (
        <Badge className="bg-forensic-success/20 text-forensic-success">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'filed':
      return (
        <Badge className="bg-forensic-court/20 text-forensic-court">
          <FileText className="h-3 w-3 mr-1" />
          Filed
        </Badge>
      );
    default:
      return (
        <Badge className="bg-forensic-300 text-forensic-600">
          Unknown
        </Badge>
      );
  }
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'brief':
      return <Badge className="bg-forensic-court/20 text-forensic-court">Brief</Badge>;
    case 'report':
      return <Badge className="bg-forensic-accent/20 text-forensic-accent">Report</Badge>;
    case 'analysis':
      return <Badge className="bg-forensic-evidence/20 text-forensic-evidence">Analysis</Badge>;
    case 'motion':
      return <Badge className="bg-forensic-800/20 text-forensic-800">Motion</Badge>;
    case 'notes':
      return <Badge variant="outline">Notes</Badge>;
    case 'form':
      return <Badge variant="outline">Form</Badge>;
    default:
      return <Badge variant="outline">Other</Badge>;
  }
};

const LegalDocumentation = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  
  // Filter documents based on search
  const filteredDocuments = documentsData.filter(doc => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(query) ||
        doc.caseId.toLowerCase().includes(query) ||
        doc.client.toLowerCase().includes(query)
      );
    }
    return true;
  });
  
  // Filter templates based on search
  const filteredTemplates = templatesData.filter(template => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return template.title.toLowerCase().includes(query);
    }
    return true;
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-forensic-800 mb-1">Legal Documentation</h1>
            <p className="text-sm text-forensic-600">
              Create and manage legal documents with blockchain-verified evidence citations
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setActiveTab('templates')}
            >
              <Copy className="h-4 w-4" />
              <span className="hidden md:inline">Templates</span>
            </Button>
            <Button 
              className="bg-forensic-court hover:bg-forensic-court/90 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">New Document</span>
            </Button>
          </div>
        </div>
        
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            <span>Documents</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            <span>Templates</span>
          </TabsTrigger>
          <TabsTrigger value="evidence" className="flex items-center gap-2">
            <FileDigit className="h-4 w-4" />
            <span>Evidence</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-forensic-500" />
            <Input
              placeholder={activeTab === 'documents' ? "Search documents..." : 
                          activeTab === 'templates' ? "Search templates..." : "Search evidence..."}
              className="pl-8 border-forensic-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
        
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Legal Documents</CardTitle>
              <CardDescription>
                Case-related documentation with blockchain-verified evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Case</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => (
                    <TableRow key={document.id} className={selectedDocument === document.id ? "bg-forensic-50" : ""}>
                      <TableCell>
                        <div className="font-medium">{document.title}</div>
                        <div className="text-xs text-forensic-500">{document.id}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{document.caseId}</Badge>
                      </TableCell>
                      <TableCell>{document.client}</TableCell>
                      <TableCell>{getTypeBadge(document.type)}</TableCell>
                      <TableCell>{getStatusBadge(document.status)}</TableCell>
                      <TableCell className="text-sm text-forensic-600">
                        {new Date(document.modified).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedDocument(document.id === selectedDocument ? null : document.id)}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-forensic-court hover:bg-forensic-court/90"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredDocuments.length === 0 && (
                <div className="text-center py-8">
                  <ScrollText className="h-10 w-10 text-forensic-300 mx-auto mb-2" />
                  <h3 className="font-medium text-lg">No documents found</h3>
                  <p className="text-forensic-500">
                    Create a new document or adjust your search criteria
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-forensic-50 border-t border-forensic-100 flex justify-between">
              <span className="text-sm text-forensic-600">{filteredDocuments.length} documents</span>
              <Button variant="outline" size="sm">
                <ArrowRight className="h-4 w-4 mr-1" />
                <span>View All</span>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Document Editor */}
          {selectedDocument && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <ScrollText className="h-5 w-5 text-forensic-court" />
                  <span>Editing: {documentsData.find(d => d.id === selectedDocument)?.title}</span>
                </CardTitle>
                <CardDescription>
                  Case: {documentsData.find(d => d.id === selectedDocument)?.caseId} | 
                  Client: {documentsData.find(d => d.id === selectedDocument)?.client}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Document Title</label>
                  <Input defaultValue={documentsData.find(d => d.id === selectedDocument)?.title} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Case ID</label>
                    <Input defaultValue={documentsData.find(d => d.id === selectedDocument)?.caseId} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Type</label>
                    <select className="w-full h-10 rounded-md border border-forensic-200 bg-white px-3 py-2 text-sm">
                      <option value="brief">Brief</option>
                      <option value="report">Report</option>
                      <option value="motion">Motion</option>
                      <option value="analysis">Analysis</option>
                      <option value="notes">Notes</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <select className="w-full h-10 rounded-md border border-forensic-200 bg-white px-3 py-2 text-sm">
                      <option value="draft">Draft</option>
                      <option value="review">In Review</option>
                      <option value="completed">Completed</option>
                      <option value="filed">Filed</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Document Content</label>
                  <Textarea 
                    className="min-h-[200px] font-mono text-sm"
                    defaultValue="# Defense Strategy Brief

## Case Overview
This brief outlines the defense strategy for case FF-2023-076.

## Evidence Analysis
The evidence EV-2023-380 has been verified and contains several key elements that support our client's position.

## Legal Arguments
1. Lack of proper procedure in evidence collection
2. Inconsistent timestamps in digital evidence
3. Missing chain of custody for critical evidence"
                  />
                </div>
                
                <div className="flex justify-between items-center p-4 border border-forensic-200 rounded-md bg-forensic-50">
                  <div>
                    <h4 className="font-medium text-forensic-800">Evidence Citations</h4>
                    <p className="text-sm text-forensic-600">Add blockchain-verified evidence citations</p>
                  </div>
                  <Button className="bg-forensic-evidence hover:bg-forensic-evidence/90">
                    Add Citation
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="border-t border-forensic-100 justify-between">
                <div className="text-sm text-forensic-500">
                  Last modified: {new Date(documentsData.find(d => d.id === selectedDocument)?.modified || '').toLocaleString()}
                </div>
                <div className="space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-forensic-court hover:bg-forensic-court/90">
                    <Save className="h-4 w-4 mr-1" />
                    Save Document
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Copy className="h-5 w-5 text-forensic-court" />
                    {template.title}
                  </CardTitle>
                  <CardDescription>
                    {getTypeBadge(template.type)} • {template.sections} sections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-forensic-600">
                    Professional template with pre-formatted sections and placeholders for case-specific information.
                  </p>
                  <p className="text-xs text-forensic-500 mt-2">
                    Last used: {new Date(template.lastUsed).toLocaleDateString()}
                  </p>
                </CardContent>
                <CardFooter className="border-t border-forensic-100">
                  <Button className="w-full bg-forensic-court hover:bg-forensic-court/90">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="hover:shadow-md transition-all duration-200 border-dashed border-2 flex flex-col items-center justify-center p-6">
              <Plus className="h-10 w-10 text-forensic-300 mb-2" />
              <h3 className="font-medium text-lg text-forensic-800">Create New Template</h3>
              <p className="text-sm text-forensic-500 text-center mb-4">
                Build a custom document template
              </p>
              <Button className="bg-forensic-court hover:bg-forensic-court/90">
                Create Template
              </Button>
            </Card>
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <Copy className="h-12 w-12 text-forensic-300 mx-auto mb-2" />
              <h3 className="font-medium text-xl">No templates found</h3>
              <p className="text-forensic-500 mb-4">
                Create a new template or adjust your search criteria
              </p>
              <Button className="bg-forensic-court hover:bg-forensic-court/90">
                Create Template
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="evidence" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Evidence Citations</CardTitle>
              <CardDescription>
                Blockchain-verified evidence available for citation in legal documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evidence ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Case ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evidenceItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.caseId}</Badge>
                      </TableCell>
                      <TableCell>
                        {item.type === 'log' && <Badge className="bg-forensic-accent/20 text-forensic-accent">Log</Badge>}
                        {item.type === 'email' && <Badge className="bg-forensic-evidence/20 text-forensic-evidence">Email</Badge>}
                        {item.type === 'mobile' && <Badge className="bg-forensic-warning/20 text-forensic-warning">Mobile</Badge>}
                      </TableCell>
                      <TableCell>
                        {item.verified ? (
                          <Badge className="bg-forensic-success/20 text-forensic-success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge className="bg-forensic-warning/20 text-forensic-warning">
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            Preview
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-forensic-court hover:bg-forensic-court/90"
                          >
                            Cite
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="bg-forensic-50 border-t border-forensic-100 flex justify-between">
              <span className="text-sm text-forensic-600">{evidenceItems.length} verified evidence items</span>
              <Button variant="outline" size="sm">
                <PanelLeft className="h-4 w-4 mr-1" />
                View Evidence Repository
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalDocumentation;
