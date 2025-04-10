
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import ipfsService from '@/services/ipfsService';
import web3Service, { EvidenceType } from '@/services/web3Service';

export type EvidenceItem = {
  id: string;
  name: string;
  type: string;
  caseId: string;
  submittedBy: string;
  submittedDate: string;
  size: number;
  verified: boolean;
  hash?: string;
  cidEncrypted?: string;
};

export const useEvidenceManager = (caseId?: string) => {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to refresh evidence
  const refreshEvidence = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const fetchEvidence = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the blockchain
        // For now, we're using the mock data and adding any uploaded evidence
        const storedEvidence = localStorage.getItem('evidenceItems');
        const evidenceList: EvidenceItem[] = storedEvidence ? JSON.parse(storedEvidence) : [];
        
        if (caseId) {
          // Filter by case ID if provided
          setEvidence(evidenceList.filter(item => item.caseId === caseId));
        } else {
          setEvidence(evidenceList);
        }
      } catch (error) {
        console.error("Failed to fetch evidence:", error);
        toast({
          title: "Error",
          description: "Failed to fetch evidence data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvidence();
  }, [caseId, refreshTrigger]);

  const uploadEvidence = async (file: File, caseId: string, type: string) => {
    setLoading(true);
    try {
      // Generate an encryption key (in a real app, this would be more secure)
      const encryptionKey = `key-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Upload to IPFS
      const { cid, hash } = await ipfsService.uploadFile(file, encryptionKey);
      
      // Create evidence ID
      const evidenceId = `EV-${caseId.split('-')[1]}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      // Map file type to evidence type enum
      let evidenceType = EvidenceType.Other;
      if (file.type.includes('image')) evidenceType = EvidenceType.Image;
      else if (file.type.includes('video')) evidenceType = EvidenceType.Video;
      else if (file.type.includes('pdf') || file.type.includes('document')) evidenceType = EvidenceType.Document;
      
      // In a real implementation, this would submit to the blockchain
      // await web3Service.submitCaseEvidence(caseId, evidenceId, cid, hash, evidenceType);
      
      // For now, we'll store in localStorage to simulate persistence
      const newEvidence: EvidenceItem = {
        id: evidenceId,
        name: file.name,
        type: file.type.split('/')[0] || 'other',
        caseId: caseId,
        submittedBy: "Current User", // Would come from authentication context
        submittedDate: new Date().toISOString(),
        size: file.size,
        verified: false,
        hash,
        cidEncrypted: cid
      };
      
      // Get existing evidence
      const storedEvidence = localStorage.getItem('evidenceItems');
      const evidenceList: EvidenceItem[] = storedEvidence ? JSON.parse(storedEvidence) : [];
      
      // Add new evidence
      evidenceList.push(newEvidence);
      
      // Save back to storage
      localStorage.setItem('evidenceItems', JSON.stringify(evidenceList));
      
      // Refresh the evidence list
      refreshEvidence();
      
      toast({
        title: "Evidence Uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
      
      return { evidenceId, cid, hash };
    } catch (error) {
      console.error("Failed to upload evidence:", error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload evidence file",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const verifyEvidence = async (evidenceId: string) => {
    setLoading(true);
    try {
      // In a real implementation, this would verify on the blockchain
      // For now, we're updating the local state
      const storedEvidence = localStorage.getItem('evidenceItems');
      if (!storedEvidence) return false;
      
      const evidenceList: EvidenceItem[] = JSON.parse(storedEvidence);
      const updatedList = evidenceList.map(item => 
        item.id === evidenceId ? { ...item, verified: true } : item
      );
      
      localStorage.setItem('evidenceItems', JSON.stringify(updatedList));
      refreshEvidence();
      
      toast({
        title: "Evidence Verified",
        description: `Evidence ${evidenceId} has been verified successfully`,
      });
      
      return true;
    } catch (error) {
      console.error("Failed to verify evidence:", error);
      toast({
        title: "Verification Failed",
        description: "Failed to verify evidence",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    evidence,
    loading,
    uploadEvidence,
    verifyEvidence,
    refreshEvidence
  };
};
