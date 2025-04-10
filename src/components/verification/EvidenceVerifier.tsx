
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FileCheck, Shield, Upload, CheckCircle, XCircle, AlertTriangle, ExternalLink, Clock } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useEvidenceManager } from '@/hooks/useEvidenceManager';
import { toast } from '@/hooks/use-toast';

const EvidenceVerifier: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const evidenceIdFromUrl = searchParams.get('evidenceId');
  
  const [evidenceId, setEvidenceId] = useState(evidenceIdFromUrl || '');
  const [verificationHash, setVerificationHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const { evidence, verifyEvidence } = useEvidenceManager();
  
  // If evidence ID in URL changes, update the input
  useEffect(() => {
    if (evidenceIdFromUrl) {
      setEvidenceId(evidenceIdFromUrl);
    }
  }, [evidenceIdFromUrl]);

  const handleVerify = async () => {
    if (!evidenceId.trim()) {
      toast({
        title: "Error",
        description: "Please enter an evidence ID",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    setVerificationStatus('verifying');
    setVerificationProgress(0);

    // Simulate verification stages
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setVerificationProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        completeVerification();
      }
    }, 200);

    const completeVerification = async () => {
      // Find evidence in our list
      const foundEvidence = evidence.find(item => item.id === evidenceId);
      
      if (foundEvidence) {
        if (verificationHash && foundEvidence.hash !== verificationHash) {
          setVerificationStatus('failed');
          toast({
            title: "Verification Failed",
            description: "The provided hash does not match the evidence record",
            variant: "destructive"
          });
        } else {
          // Update evidence to verified status
          const success = await verifyEvidence(evidenceId);
          setVerificationStatus(success ? 'success' : 'failed');
          
          if (success) {
            // Reflect the verification in the URL parameters
            const params = new URLSearchParams(location.search);
            params.set('status', 'verified');
            window.history.replaceState(null, '', `${location.pathname}?${params}`);
          }
        }
      } else {
        setVerificationStatus('failed');
        toast({
          title: "Evidence Not Found",
          description: "No evidence record found with that ID",
          variant: "destructive"
        });
      }
      
      setIsVerifying(false);
    };
  };

  const resetForm = () => {
    setEvidenceId('');
    setVerificationHash('');
    setVerificationStatus('idle');
    setVerificationProgress(0);
    
    // Remove query params
    navigate('/verify', { replace: true });
  };
  
  const viewChainOfCustody = () => {
    navigate(`/lawyer/chain-of-custody-verification?evidenceId=${evidenceId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">Evidence Verification</h1>
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
            <Shield className="mr-2 h-5 w-5 text-forensic-evidence" />
            Evidence Integrity Verification
          </CardTitle>
          <CardDescription>
            Verify the authenticity and integrity of digital evidence using blockchain verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="evidenceId" className="text-sm font-medium text-forensic-700">Evidence ID</label>
            <Input
              id="evidenceId"
              value={evidenceId}
              onChange={(e) => setEvidenceId(e.target.value)}
              placeholder="Enter evidence ID (e.g., EV-104-002)"
              className="border-forensic-200"
              disabled={isVerifying || verificationStatus === 'success'}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="verificationHash" className="text-sm font-medium text-forensic-700">
              Verification Hash (Optional)
            </label>
            <Input
              id="verificationHash"
              value={verificationHash}
              onChange={(e) => setVerificationHash(e.target.value)}
              placeholder="Enter hash to compare with stored value"
              className="border-forensic-200 font-mono text-sm"
              disabled={isVerifying || verificationStatus === 'success'}
            />
            <p className="text-xs text-forensic-500">
              If left blank, the system will verify against the hash stored in the blockchain
            </p>
          </div>

          {verificationStatus === 'verifying' && (
            <div className="space-y-2 mt-4">
              <div className="flex justify-between text-sm">
                <span>Verification in progress</span>
                <span>{verificationProgress}%</span>
              </div>
              <Progress value={verificationProgress} className="h-2" />
              <div className="text-xs text-forensic-500">
                Checking evidence integrity and authenticity on blockchain
              </div>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="mt-4 p-4 bg-forensic-success/10 border border-forensic-success/30 rounded-md">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-forensic-success mr-2" />
                <h3 className="font-medium text-forensic-success">Verification Successful</h3>
              </div>
              <p className="mt-1 text-sm">
                The evidence has been successfully verified. The integrity of this evidence is confirmed on the blockchain.
              </p>
              
              <div className="flex flex-col xs:flex-row gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="text-xs h-8"
                  onClick={viewChainOfCustody}
                >
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  View Chain of Custody
                </Button>
                <Button 
                  variant="outline" 
                  className="text-xs h-8"
                  onClick={() => window.open(`https://etherscan.io/tx/${evidence.find(e => e.id === evidenceId)?.hash || '0x'}`)}
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  View on Blockchain
                </Button>
              </div>
            </div>
          )}

          {verificationStatus === 'failed' && (
            <div className="mt-4 p-4 bg-forensic-danger/10 border border-forensic-danger/30 rounded-md">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-forensic-danger mr-2" />
                <h3 className="font-medium text-forensic-danger">Verification Failed</h3>
              </div>
              <p className="mt-1 text-sm">
                The evidence could not be verified. This may indicate tampering or that the evidence does not exist in the system.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t border-forensic-100 bg-forensic-50 p-4">
          {verificationStatus === 'idle' || verificationStatus === 'failed' ? (
            <Button 
              onClick={handleVerify}
              disabled={isVerifying || !evidenceId.trim()} 
              className="bg-forensic-evidence hover:bg-forensic-evidence/90"
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Verify Evidence
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={resetForm}
              disabled={isVerifying}
            >
              Verify Another Evidence
            </Button>
          )}
          
          <div className="flex items-center text-xs text-forensic-500">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>Verification is immutably recorded on the blockchain</span>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recently Verified Evidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {evidence.filter(item => item.verified).slice(0, 5).map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 border border-forensic-100 rounded-md hover:bg-forensic-50 cursor-pointer"
                onClick={() => {
                  setEvidenceId(item.id);
                  setVerificationHash('');
                  setVerificationStatus('idle');
                }}
              >
                <div>
                  <div className="flex items-center">
                    <FileCheck className="h-4 w-4 text-forensic-success mr-2" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-xs text-forensic-500 mt-1">
                    ID: {item.id} | Verified on {new Date(item.submittedDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-forensic-success">Verified</Badge>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 text-xs p-0 px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/lawyer/chain-of-custody-verification?evidenceId=${item.id}`);
                    }}
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Chain
                  </Button>
                </div>
              </div>
            ))}
            
            {evidence.filter(item => item.verified).length === 0 && (
              <div className="text-center py-8 text-forensic-500">
                <p>No verified evidence found</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t border-forensic-100">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/evidence')}
          >
            View All Evidence
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EvidenceVerifier;
