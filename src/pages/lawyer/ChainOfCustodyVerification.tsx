
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
import { Badge } from "@/components/ui/badge";
import {
  FileCheck,
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  User,
  Calendar,
  Filter,
  Download,
  FileDigit,
  Printer
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

interface ChainEvent {
  id: string;
  evidenceId: string;
  caseId: string;
  timestamp: string;
  action: 'collected' | 'transferred' | 'analyzed' | 'accessed' | 'submitted';
  fromUser?: string;
  toUser?: string;
  location?: string;
  notes?: string;
  transactionHash: string;
  verified: boolean;
}

// Mock data
const mockChains: Record<string, ChainEvent[]> = {
  "EV-2023-421": [
    {
      id: "CE-001",
      evidenceId: "EV-2023-421",
      caseId: "FF-2023-089",
      timestamp: "2025-04-09T09:30:00Z",
      action: "collected",
      toUser: "Officer Johnson",
      location: "Tech Corp HQ, Server Room",
      notes: "Initial evidence collection",
      transactionHash: "0x5483d2f1a00bc14e972fb14c3881ee8cd61cd31aee35c4885e",
      verified: true
    },
    {
      id: "CE-002",
      evidenceId: "EV-2023-421",
      caseId: "FF-2023-089",
      timestamp: "2025-04-09T11:45:00Z",
      action: "transferred",
      fromUser: "Officer Johnson",
      toUser: "Dr. Anderson",
      location: "Forensic Lab",
      notes: "Transfer for forensic analysis",
      transactionHash: "0x3ba196e58d05fcd7a9c147ec9780ba833f66e92c995e6b83f2",
      verified: true
    },
    {
      id: "CE-003",
      evidenceId: "EV-2023-421",
      caseId: "FF-2023-089",
      timestamp: "2025-04-09T14:32:00Z",
      action: "analyzed",
      fromUser: "Dr. Anderson",
      location: "Forensic Lab",
      notes: "Technical metadata extraction",
      transactionHash: "0x7c1a0f9b42e6dd3a78bc9b32f88c6bc45d7f019f87c621d67c",
      verified: true
    }
  ],
  "EV-2023-380": [
    {
      id: "CE-004",
      evidenceId: "EV-2023-380",
      caseId: "FF-2023-076",
      timestamp: "2025-04-01T08:15:00Z",
      action: "collected",
      toUser: "Officer Johnson",
      location: "Crime Scene",
      notes: "Initial evidence collection",
      transactionHash: "0x912a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5",
      verified: true
    },
    {
      id: "CE-005",
      evidenceId: "EV-2023-380",
      caseId: "FF-2023-076",
      timestamp: "2025-04-01T10:20:00Z",
      action: "transferred",
      fromUser: "Officer Johnson",
      toUser: "Evidence Room Officer",
      location: "Police Station",
      notes: "Transfer to evidence storage",
      transactionHash: "0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5",
      verified: true
    },
    {
      id: "CE-006",
      evidenceId: "EV-2023-380",
      caseId: "FF-2023-076",
      timestamp: "2025-04-03T14:10:00Z",
      action: "transferred",
      fromUser: "Evidence Room Officer",
      toUser: "Dr. Anderson",
      location: "Forensic Lab",
      notes: "Transfer for forensic analysis",
      transactionHash: "0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6",
      verified: true
    },
    {
      id: "CE-007",
      evidenceId: "EV-2023-380",
      caseId: "FF-2023-076",
      timestamp: "2025-04-05T09:45:00Z",
      action: "analyzed",
      fromUser: "Dr. Anderson",
      location: "Forensic Lab",
      notes: "Forensic analysis completed",
      transactionHash: "0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7",
      verified: true
    },
    {
      id: "CE-008",
      evidenceId: "EV-2023-380",
      caseId: "FF-2023-076",
      timestamp: "2025-04-08T11:22:00Z",
      action: "accessed",
      fromUser: "Attorney Davis",
      location: "Courthouse",
      notes: "Downloaded for court preparation",
      transactionHash: "0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8",
      verified: true
    }
  ]
};

// Evidence metadata
const evidenceMetadata: Record<string, any> = {
  "EV-2023-421": {
    name: "Network Traffic Log",
    type: "log",
    fileSize: "4.2 MB",
    uploadedOn: "2025-04-09T14:32:00Z",
    hash: "0x8a7b561c4de93f2b7af3ab36a335d4df91d173c7",
    description: "Server room network traffic logs capturing unauthorized access attempt",
    format: "PCAP"
  },
  "EV-2023-380": {
    name: "Email Thread Export",
    type: "email",
    fileSize: "850 KB",
    uploadedOn: "2025-04-01T08:15:00Z",
    hash: "0xf59a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4",
    description: "Thread of emails discussing confidential information",
    format: "PST"
  }
};

const getActionBadge = (action: ChainEvent['action']) => {
  switch (action) {
    case 'collected':
      return (
        <Badge className="bg-forensic-evidence/20 text-forensic-evidence">
          Collected
        </Badge>
      );
    case 'transferred':
      return (
        <Badge className="bg-forensic-800/20 text-forensic-800">
          Transferred
        </Badge>
      );
    case 'analyzed':
      return (
        <Badge className="bg-forensic-accent/20 text-forensic-accent">
          Analyzed
        </Badge>
      );
    case 'accessed':
      return (
        <Badge className="bg-forensic-400/20 text-forensic-600">
          Accessed
        </Badge>
      );
    case 'submitted':
      return (
        <Badge className="bg-forensic-court/20 text-forensic-court">
          Submitted to Court
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

const ChainOfCustodyVerification = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [verificationResult, setVerificationResult] = useState<'pending' | 'success' | 'fail' | null>(null);
  
  const handleVerify = (evidenceId: string) => {
    setSelectedEvidence(evidenceId);
    setVerificationResult('pending');
    
    // Simulate verification process
    setTimeout(() => {
      setVerificationResult('success');
    }, 2000);
  };
  
  // Get evidence IDs from mock data
  const evidenceIds = Object.keys(mockChains);
  
  // Filter evidence based on search
  const filteredEvidenceIds = evidenceIds.filter(id => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const metadata = evidenceMetadata[id];
      return (
        id.toLowerCase().includes(query) ||
        metadata.name.toLowerCase().includes(query) ||
        mockChains[id].some(event => 
          event.caseId.toLowerCase().includes(query) ||
          (event.notes && event.notes.toLowerCase().includes(query))
        )
      );
    }
    return true;
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-forensic-800">Chain of Custody Verification</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-forensic-500" />
          <Input
            placeholder="Search by evidence ID, case ID, or description..."
            className="pl-8 border-forensic-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-forensic-500" />
          <select className="flex-1 h-10 rounded-md border border-forensic-200 bg-white px-3 py-2 text-sm">
            <option value="all">All Cases</option>
            <option value="FF-2023-076">Case FF-2023-076</option>
            <option value="FF-2023-089">Case FF-2023-089</option>
          </select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evidence Items</CardTitle>
          <CardDescription>
            Select an evidence item to verify its chain of custody
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evidence ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Case ID</TableHead>
                <TableHead>Chain Length</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvidenceIds.map((evidenceId) => {
                const metadata = evidenceMetadata[evidenceId];
                const chain = mockChains[evidenceId];
                const lastEvent = chain[chain.length - 1];
                
                return (
                  <TableRow key={evidenceId} className={selectedEvidence === evidenceId ? "bg-forensic-50" : ""}>
                    <TableCell className="font-medium">{evidenceId}</TableCell>
                    <TableCell>{metadata.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {chain[0].caseId}
                      </Badge>
                    </TableCell>
                    <TableCell>{chain.length} events</TableCell>
                    <TableCell className="text-sm text-forensic-600">
                      {new Date(lastEvent.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm"
                        className="bg-forensic-evidence hover:bg-forensic-evidence/90"
                        onClick={() => handleVerify(evidenceId)}
                      >
                        Verify Chain
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredEvidenceIds.length === 0 && (
            <div className="text-center py-8">
              <FileCheck className="h-10 w-10 text-forensic-300 mx-auto mb-2" />
              <h3 className="font-medium text-lg">No evidence found</h3>
              <p className="text-forensic-500">
                Adjust your search criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {selectedEvidence && (
        <Card className={verificationResult === 'success' ? 'border-forensic-success' : ''}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg flex items-center">
                  <FileDigit className="h-5 w-5 mr-2 text-forensic-evidence" />
                  Chain of Custody: {selectedEvidence}
                </CardTitle>
                <CardDescription>
                  {evidenceMetadata[selectedEvidence].description}
                </CardDescription>
              </div>
              
              {verificationResult === 'pending' && (
                <Badge className="bg-forensic-warning text-forensic-900">
                  <Clock className="h-3 w-3 mr-1" />
                  Verifying...
                </Badge>
              )}
              {verificationResult === 'success' && (
                <Badge className="bg-forensic-success text-white">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Chain Verified
                </Badge>
              )}
              {verificationResult === 'fail' && (
                <Badge className="bg-forensic-danger text-white">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Verification Failed
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 space-y-4">
              <div className="bg-forensic-50 border border-forensic-200 rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-forensic-500">Evidence Hash</p>
                    <p className="font-mono text-xs">{evidenceMetadata[selectedEvidence].hash}</p>
                  </div>
                  <div>
                    <p className="text-sm text-forensic-500">Format</p>
                    <p>{evidenceMetadata[selectedEvidence].format}</p>
                  </div>
                  <div>
                    <p className="text-sm text-forensic-500">File Size</p>
                    <p>{evidenceMetadata[selectedEvidence].fileSize}</p>
                  </div>
                </div>
              </div>
              
              {verificationResult && (
                <div className={`p-4 rounded-md ${
                  verificationResult === 'pending' ? 'bg-forensic-warning/10 border border-forensic-warning/30' :
                  verificationResult === 'success' ? 'bg-forensic-success/10 border border-forensic-success/30' :
                  'bg-forensic-danger/10 border border-forensic-danger/30'
                }`}>
                  {verificationResult === 'pending' && (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-forensic-warning mr-2"></div>
                      <p className="text-forensic-warning font-medium">Verifying chain of custody...</p>
                    </div>
                  )}
                  {verificationResult === 'success' && (
                    <div>
                      <p className="flex items-center text-forensic-success font-medium">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Chain of custody verification successful
                      </p>
                      <p className="mt-1 text-sm text-forensic-600">
                        All {mockChains[selectedEvidence].length} custody events have been verified on the blockchain.
                        The chain is complete and unbroken.
                      </p>
                    </div>
                  )}
                  {verificationResult === 'fail' && (
                    <div>
                      <p className="flex items-center text-forensic-danger font-medium">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Chain of custody verification failed
                      </p>
                      <p className="mt-1 text-sm text-forensic-600">
                        One or more custody events could not be verified on the blockchain.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <h4 className="font-medium mb-2">Chain of Custody Timeline</h4>
            
            <div className="relative border-l-2 border-forensic-200 pl-6 py-2 space-y-6">
              {mockChains[selectedEvidence].map((event, index) => (
                <div key={event.id} className="relative">
                  <div className="absolute -left-[25px] mt-1 h-4 w-4 rounded-full bg-forensic-evidence"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">
                        {event.action.charAt(0).toUpperCase() + event.action.slice(1)}
                      </h4>
                      {getActionBadge(event.action)}
                      {index === 0 && (
                        <Badge className="bg-forensic-800 text-white">Initial</Badge>
                      )}
                    </div>
                    <p className="text-sm text-forensic-600 mb-1">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                    
                    {event.action === 'transferred' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-forensic-500" />
                          <span className="ml-1 text-sm">{event.fromUser}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-forensic-400" />
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-forensic-500" />
                          <span className="ml-1 text-sm">{event.toUser}</span>
                        </div>
                      </div>
                    )}
                    
                    {(event.action === 'collected' || event.action === 'analyzed' || event.action === 'accessed') && (
                      <div className="flex items-center mb-2">
                        <User className="h-4 w-4 text-forensic-500" />
                        <span className="ml-1 text-sm">
                          {event.action === 'collected' ? event.toUser : event.fromUser}
                        </span>
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="mt-1 text-sm mb-1">
                        <span className="text-forensic-500">Location: </span>
                        {event.location}
                      </div>
                    )}
                    
                    {event.notes && (
                      <div className="text-sm mb-2">
                        <span className="text-forensic-500">Notes: </span>
                        {event.notes}
                      </div>
                    )}
                    
                    <div className="text-xs font-mono text-forensic-400">
                      <span>TX: {event.transactionHash.slice(0, 10)}...{event.transactionHash.slice(-8)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-forensic-50 border-t border-forensic-100">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-forensic-500 mr-1" />
                <span className="text-sm text-forensic-600">
                  First recorded: {new Date(mockChains[selectedEvidence][0].timestamp).toLocaleDateString()}
                </span>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </Button>
                <Button className="bg-forensic-evidence hover:bg-forensic-evidence/90" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  <span>Export Report</span>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default ChainOfCustodyVerification;
