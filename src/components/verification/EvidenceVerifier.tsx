
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileCheck, 
  FileX, 
  FileQuestion, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Shield 
} from "lucide-react";
import { cn } from '@/lib/utils';
import ChainOfCustody from '../chainOfCustody/ChainOfCustody';

const EvidenceVerifier = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verified' | 'tampered' | 'error'>('idle');
  const [evidenceDetails, setEvidenceDetails] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setVerificationStatus('idle');
      setEvidenceDetails(null);
    }
  };

  const browseFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleVerify = async () => {
    if (!file) return;
    
    setIsVerifying(true);
    setVerificationStatus('idle');
    setEvidenceDetails(null);
    
    try {
      // Simulate verification process - would interact with blockchain
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // For demonstration, randomly choose between verified and tampered
      const isVerified = Math.random() > 0.3;
      
      if (isVerified) {
        setVerificationStatus('verified');
        // Mock evidence details that would come from blockchain
        setEvidenceDetails({
          evidenceId: "EV-104-001",
          caseId: "FF-2023-104",
          submittedBy: "John Smith",
          submittedDate: "2025-04-08T10:23:45Z",
          originalHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          fileName: file.name,
          fileSize: file.size
        });
        
        toast({
          title: "Verification successful",
          description: "Evidence integrity confirmed on blockchain",
        });
      } else {
        setVerificationStatus('tampered');
        toast({
          title: "Verification failed",
          description: "Evidence may have been modified or tampered with",
          variant: "destructive"
        });
      }
    } catch (error) {
      setVerificationStatus('error');
      toast({
        title: "Verification error",
        description: "Could not verify evidence integrity",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">Evidence Verification</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-forensic-200 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileCheck className="mr-2 h-5 w-5 text-forensic-accent" />
              Verify Evidence File
            </CardTitle>
            <CardDescription>
              Check if evidence matches the blockchain record
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="file"
                id="fileUpload"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              
              <div 
                onClick={browseFiles}
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                  "border-forensic-300 hover:border-forensic-accent",
                  file ? "bg-forensic-50" : "bg-white"
                )}
              >
                <div className="flex flex-col items-center space-y-2">
                  {file ? (
                    <>
                      <FileCheck className="h-8 w-8 text-forensic-accent" />
                      <div className="text-sm font-medium text-forensic-800">
                        {file.name}
                      </div>
                      <div className="text-xs text-forensic-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </div>
                    </>
                  ) : (
                    <>
                      <FileQuestion className="h-8 w-8 text-forensic-400" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-forensic-800">
                          Select evidence file to verify
                        </p>
                        <p className="text-xs text-forensic-500">
                          Click to browse or drop file here
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {file && (
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="w-full bg-forensic-accent hover:bg-forensic-accent/90"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Verify Integrity</span>
                    </>
                  )}
                </Button>
              )}
              
              {verificationStatus === 'verified' && (
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertTitle>Verification Successful</AlertTitle>
                  <AlertDescription>
                    This evidence file matches the record on the blockchain.
                  </AlertDescription>
                </Alert>
              )}
              
              {verificationStatus === 'tampered' && (
                <Alert className="bg-red-50 border-red-200 text-red-800">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>
                    This file does not match the original evidence hash recorded on the blockchain.
                  </AlertDescription>
                </Alert>
              )}
              
              {verificationStatus === 'error' && (
                <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                  <FileX className="h-4 w-4 text-amber-500" />
                  <AlertTitle>Verification Error</AlertTitle>
                  <AlertDescription>
                    Could not verify this file. The evidence may not be registered or there was a connection error.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-forensic-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="mr-2 h-5 w-5 text-forensic-accent" />
              Evidence Details
            </CardTitle>
            <CardDescription>
              {evidenceDetails 
                ? `Evidence ID: ${evidenceDetails.evidenceId} | Case: ${evidenceDetails.caseId}` 
                : "Select and verify a file to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {evidenceDetails ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-forensic-500">Original File Name</p>
                    <p className="font-medium text-forensic-800">{evidenceDetails.fileName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-forensic-500">File Size</p>
                    <p className="font-medium text-forensic-800">
                      {(evidenceDetails.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-forensic-500">Submitted By</p>
                    <p className="font-medium text-forensic-800">{evidenceDetails.submittedBy}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-forensic-500">Submission Date</p>
                    <p className="font-medium text-forensic-800">
                      {new Date(evidenceDetails.submittedDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-forensic-500">Blockchain Hash</p>
                  <div className="bg-forensic-50 p-2 rounded border border-forensic-200 font-mono text-xs overflow-x-auto">
                    {evidenceDetails.originalHash}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-forensic-200">
                  <ChainOfCustody 
                    evidenceId={evidenceDetails.evidenceId}
                    caseId={evidenceDetails.caseId}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-forensic-400">
                <FileQuestion className="h-16 w-16 mb-4 text-forensic-300" />
                <p className="text-lg font-medium text-forensic-600">No Evidence Selected</p>
                <p className="text-sm text-forensic-500 mt-1">
                  Upload and verify an evidence file to view its blockchain details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EvidenceVerifier;
