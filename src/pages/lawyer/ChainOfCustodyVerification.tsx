
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileLock2, 
  Search, 
  FileDigit, 
  ArrowRight, 
  Check,
  Clock,
  Calendar,
  User,
  FileCheck,
  Download,
  Printer,
  Share2
} from "lucide-react";
import { toast } from '@/hooks/use-toast';
import { useEvidenceManager, EvidenceItem } from '@/hooks/useEvidenceManager';

type CustodyEvent = {
  actor: string;
  action: string;
  timestamp: string;
  notes?: string;
  verified: boolean;
};

const ChainOfCustodyVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const evidenceIdParam = searchParams.get('evidenceId');
  
  const [evidenceId, setEvidenceId] = useState(evidenceIdParam || '');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [custodyChain, setCustodyChain] = useState<CustodyEvent[]>([]);
  
  const { evidence } = useEvidenceManager();
  
  useEffect(() => {
    if (evidenceId) {
      const found = evidence.find(item => item.id === evidenceId);
      if (found) {
        setSelectedEvidence(found);
        
        // Generate mock chain of custody events
        const mockChain: CustodyEvent[] = [
          {
            actor: "Officer Johnson",
            action: "Collection",
            timestamp: new Date(found.submittedDate).toISOString(),
            notes: "Initial collection of evidence",
            verified: true
          },
          {
            actor: "Evidence Technician Smith",
            action: "Processing",
            timestamp: new Date(new Date(found.submittedDate).getTime() + 3600000).toISOString(),
            notes: "Evidence documented and prepared for analysis",
            verified: true
          },
          {
            actor: "Forensic Analyst Chen",
            action: "Analysis",
            timestamp: new Date(new Date(found.submittedDate).getTime() + 86400000).toISOString(),
            verified: true
          }
        ];
        
        // Add verification event if the evidence is verified
        if (found.verified) {
          mockChain.push({
            actor: "Verification System",
            action: "Digital Verification",
            timestamp: new Date().toISOString(),
            notes: "Blockchain verification completed",
            verified: true
          });
        }
        
        setCustodyChain(mockChain);
      } else {
        setSelectedEvidence(null);
        setCustodyChain([]);
      }
    }
  }, [evidenceId, evidence]);
  
  const handleSearch = () => {
    if (!evidenceId.trim()) {
      toast({
        title: "Please enter an evidence ID",
        variant: "destructive"
      });
      return;
    }
    
    const found = evidence.find(item => item.id === evidenceId);
    if (!found) {
      toast({
        title: "Evidence not found",
        description: "No evidence found with that ID",
        variant: "destructive"
      });
      setSelectedEvidence(null);
      setCustodyChain([]);
    }
    // The useEffect will handle setting the evidence and chain
  };
  
  const handlePrint = () => {
    toast({
      title: "Printing Chain of Custody",
      description: "Preparing chain of custody report for printing"
    });
    // In a real implementation, this would generate a print view
  };
  
  const handleDownload = () => {
    toast({
      title: "Downloading Report",
      description: "Downloading chain of custody report as PDF"
    });
    // In a real implementation, this would download a PDF report
  };
  
  const handleExport = () => {
    toast({
      title: "Exporting Chain of Custody",
      description: "Preparing chain of custody for export"
    });
    // In a real implementation, this would export the data
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">Chain of Custody Verification</h1>
        <Button 
          variant="outline"
          onClick={() => navigate('/evidence')}
        >
          Back to Evidence
        </Button>
      </div>
      
      <Card className="border border-forensic-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileLock2 className="mr-2 h-5 w-5 text-forensic-court" />
            Chain of Custody Search
          </CardTitle>
          <CardDescription>
            Search for an evidence item to view its complete chain of custody
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="space-y-2 flex-1">
              <label htmlFor="evidenceId" className="text-sm font-medium text-forensic-700">
                Evidence ID
              </label>
              <Input
                id="evidenceId"
                value={evidenceId}
                onChange={(e) => setEvidenceId(e.target.value)}
                placeholder="Enter evidence ID (e.g., EV-104-002)"
                className="border-forensic-200"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-forensic-court hover:bg-forensic-court/90"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {selectedEvidence && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <FileDigit className="mr-2 h-5 w-5 text-forensic-evidence" />
                  Evidence Details
                </CardTitle>
                {selectedEvidence.verified ? (
                  <Badge className="bg-forensic-success/20 text-forensic-success">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-forensic-warning/20 text-forensic-warning">
                    Unverified
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-forensic-500">Evidence ID</div>
                    <div className="font-medium">{selectedEvidence.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-forensic-500">Name</div>
                    <div className="font-medium">{selectedEvidence.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-forensic-500">Case ID</div>
                    <div className="font-medium text-forensic-court hover:underline cursor-pointer" onClick={() => navigate(`/cases/${selectedEvidence.caseId}`)}>
                      {selectedEvidence.caseId}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-forensic-500">Submitted By</div>
                    <div className="font-medium">{selectedEvidence.submittedBy}</div>
                  </div>
                  <div>
                    <div className="text-sm text-forensic-500">Submission Date</div>
                    <div className="font-medium">
                      {new Date(selectedEvidence.submittedDate).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-forensic-500">File Hash</div>
                    <div className="font-mono text-xs bg-forensic-50 p-1 rounded border border-forensic-100 truncate">
                      {selectedEvidence.hash || "Hash not available"}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-forensic-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileLock2 className="mr-2 h-5 w-5 text-forensic-court" />
                Chain of Custody Timeline
              </CardTitle>
              <CardDescription>
                Complete chronological record of evidence handling and transfers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-forensic-200 pl-6 py-2 space-y-8">
                {custodyChain.map((event, index) => (
                  <div key={index} className="relative">
                    <div className={`absolute -left-[25px] mt-1 h-4 w-4 rounded-full ${
                      event.verified 
                        ? 'bg-forensic-success' 
                        : 'bg-forensic-warning'
                    }`}></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.action}</h4>
                        {event.verified ? (
                          <Badge className="bg-forensic-success/20 text-forensic-success">
                            <Check className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge className="bg-forensic-warning/20 text-forensic-warning">
                            Pending
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-forensic-600 my-1">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {new Date(event.timestamp).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <User className="h-3.5 w-3.5 mr-1 text-forensic-500" />
                        <span>{event.actor}</span>
                      </div>
                      {event.notes && (
                        <p className="text-sm mt-1">{event.notes}</p>
                      )}
                      {index < custodyChain.length - 1 && (
                        <div className="absolute -left-[17px] top-6 h-full border-l-2 border-dashed border-forensic-200"></div>
                      )}
                    </div>
                  </div>
                ))}
                
                {custodyChain.length === 0 && (
                  <div className="text-center py-8 text-forensic-500">
                    <p>No chain of custody events found for this evidence</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-forensic-100 bg-forensic-50 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Report
              </Button>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  className="bg-forensic-court hover:bg-forensic-court/90"
                  onClick={handleExport}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Blockchain Verification</CardTitle>
              <CardDescription>
                Cryptographic proof of evidence integrity and chain of custody
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-forensic-50 rounded-md border border-forensic-100">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileCheck className="h-4 w-4 mr-2 text-forensic-success" />
                    Blockchain Record
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-forensic-500">Transaction Hash</div>
                      <div className="font-mono text-xs truncate">
                        {selectedEvidence.hash || "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-forensic-500">Block Number</div>
                      <div className="font-mono text-xs">{Math.floor(Math.random() * 9000000) + 1000000}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-forensic-500">
                    This evidence has been cryptographically secured on the blockchain, ensuring its authenticity and immutability.
                  </div>
                </div>
                
                {selectedEvidence.verified ? (
                  <div className="p-4 bg-forensic-success/10 border border-forensic-success/30 rounded-md">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-forensic-success mr-2" />
                      <h3 className="font-medium text-forensic-success">Verification Successful</h3>
                    </div>
                    <p className="mt-1 text-sm">
                      This evidence has been cryptographically verified on the blockchain. The chain of custody is complete and intact.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 bg-forensic-warning/10 border border-forensic-warning/30 rounded-md">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-forensic-warning mr-2" />
                      <h3 className="font-medium text-forensic-warning">Verification Pending</h3>
                    </div>
                    <p className="mt-1 text-sm">
                      This evidence has not been fully verified on the blockchain. Complete the verification process to ensure chain of custody integrity.
                    </p>
                    <Button 
                      className="mt-2 bg-forensic-warning hover:bg-forensic-warning/90 text-forensic-900"
                      onClick={() => navigate(`/verify?evidenceId=${selectedEvidence.id}`)}
                    >
                      <FileCheck className="h-4 w-4 mr-2" />
                      Verify Evidence Now
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ChainOfCustodyVerification;
