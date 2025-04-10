
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

// Sample dummy evidence data
const dummyEvidence: EvidenceItem[] = [
  {
    id: "EV-089-001",
    name: "Security Camera Footage.mp4",
    type: "video",
    caseId: "FF-2023-089",
    submittedBy: "Officer Johnson",
    submittedDate: "2025-04-08T09:15:00Z",
    size: 245000000,
    verified: true,
    hash: "0xf8e317d2df9f2132ca89e3ab3b4880ab8322c59e159f0eb8c962cce32e4754ea",
    cidEncrypted: "QmT5NvUtoM5n8xr689NxpQVFNRuWgZ9Gb7hXSKSs7opbgc"
  },
  {
    id: "EV-089-002",
    name: "Network Access Logs.txt",
    type: "application",
    caseId: "FF-2023-089",
    submittedBy: "Dr. Emily Chen",
    submittedDate: "2025-04-07T14:30:00Z",
    size: 1240000,
    verified: true,
    hash: "0x1b642a672a5626c9c9eb2329ed3de669d2a2bc4e15c4d51c5e7ce8145654c4fa",
    cidEncrypted: "QmX7b6SLMdJpCXExQKmSacEEKwZvLErG95Luxeh9gp7jKt"
  },
  {
    id: "EV-092-001",
    name: "Transaction Records.pdf",
    type: "application",
    caseId: "FF-2023-092",
    submittedBy: "Dr. Emily Chen",
    submittedDate: "2025-04-06T11:20:00Z",
    size: 3520000,
    verified: true,
    hash: "0x8c5e8d5e2b9a2c9a6f7c8d5e2b9a2c9a6f7c8d5e2b9a2c9a6f7c8d5e2b9a2c9a",
    cidEncrypted: "QmT8vUy8cQMBLM7RvbGNf1Wi6XzNhE2aAaQMkQT8yh2ozt"
  },
  {
    id: "EV-118-001",
    name: "Extraction Report - iPhone 13.pdf",
    type: "application",
    caseId: "FF-2023-118",
    submittedBy: "Thomas Brown",
    submittedDate: "2025-04-05T16:45:00Z",
    size: 8750000,
    verified: false,
    hash: "0x9d2c8f5e1a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d",
    cidEncrypted: "QmNcFVrThMXEZCYbD2KqPtYZxdMdLFCe8Jt5CXUp3vGSVM"
  },
  {
    id: "EV-118-002",
    name: "SMS Message Screenshots.zip",
    type: "application",
    caseId: "FF-2023-118",
    submittedBy: "Thomas Brown",
    submittedDate: "2025-04-05T17:20:00Z",
    size: 15600000,
    verified: false,
    hash: "0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
    cidEncrypted: "QmY6xkTsYcVRJ9Lk5eFzDGnSFzmQJ9JzQTmjHvG1ef4oBd"
  },
  {
    id: "EV-104-001",
    name: "Source Code Comparison.zip",
    type: "application",
    caseId: "FF-2023-104",
    submittedBy: "Dr. Emily Chen",
    submittedDate: "2025-04-04T10:05:00Z",
    size: 22540000,
    verified: true,
    hash: "0xd7e6f5c4b3a2d1e0f9c8b7a6d5e4f3c2b1a0d9e8f7c6b5a4d3e2f1c0b9a8d7e6",
    cidEncrypted: "QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn"
  },
  {
    id: "EV-104-002",
    name: "Network Traffic Analysis.pcap",
    type: "application",
    caseId: "FF-2023-104",
    submittedBy: "Lisa Anderson",
    submittedDate: "2025-04-03T14:40:00Z",
    size: 175800000,
    verified: true,
    hash: "0xb5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9b8a7c6d5e4f3b2a1c0d9e8f7b6c5d4",
    cidEncrypted: "QmTgtbb6vu4G3CMGvD8Z3CMn6Hy8zN7GJHBtPiQJguwwNP"
  },
  {
    id: "EV-104-003",
    name: "Disk Image - Server02.e01",
    type: "application",
    caseId: "FF-2023-104",
    submittedBy: "David Wilson",
    submittedDate: "2025-04-02T11:25:00Z",
    size: 536870912000,
    verified: true,
    hash: "0xc6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5",
    cidEncrypted: "QmS9thfimMBR98NRhxdS6TDa3rGrwNXUYxBGJeY5wQjN68"
  },
  {
    id: "EV-089-003",
    name: "Email Exchange Backup.pst",
    type: "application",
    caseId: "FF-2023-089",
    submittedBy: "Officer Johnson",
    submittedDate: "2025-04-01T15:10:00Z",
    size: 78500000,
    verified: false,
    hash: "0xd7c6b5a4e3f2d1c0b9a8d7c6b5a4e3f2d1c0b9a8d7c6b5a4e3f2d1c0b9a8d7c6",
    cidEncrypted: "QmWmKMUiNGZS2QCiAZVpSZpKXnYAKn6CdBfGPYcK1GvXV4"
  },
  {
    id: "EV-092-002",
    name: "Database Backup - Financial System.sql",
    type: "application",
    caseId: "FF-2023-092",
    submittedBy: "Alex Rivera",
    submittedDate: "2025-03-31T09:45:00Z",
    size: 156800000,
    verified: false,
    hash: "0xe8f7d6c5b4a3e2d1c0b9a8e7f6d5c4b3a2e1d0c9b8a7f6e5d4c3b2a1e0d9c8b7",
    cidEncrypted: "QmZH5toFT4y8MM9JJfM8qksVf3GXQzuom7CLLrFNrXQF2K"
  }
];

export const useEvidenceManager = (caseId?: string) => {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [recentActivity, setRecentActivity] = useState<{
    action: 'upload' | 'verify' | 'view',
    evidenceId: string,
    timestamp: string
  }[]>([]);

  // Function to refresh evidence
  const refreshEvidence = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Add a function to track activity
  const trackActivity = (action: 'upload' | 'verify' | 'view', evidenceId: string) => {
    const newActivity = {
      action,
      evidenceId,
      timestamp: new Date().toISOString()
    };
    
    setRecentActivity(prev => {
      const updated = [newActivity, ...prev].slice(0, 10); // Keep only 10 most recent activities
      localStorage.setItem('evidenceActivity', JSON.stringify(updated));
      return updated;
    });
  };

  // Load recent activity from localStorage
  useEffect(() => {
    const storedActivity = localStorage.getItem('evidenceActivity');
    if (storedActivity) {
      try {
        setRecentActivity(JSON.parse(storedActivity));
      } catch (e) {
        console.error("Failed to parse activity:", e);
      }
    }
  }, []);

  useEffect(() => {
    const fetchEvidence = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch from the blockchain
        // Get evidence from localStorage or use dummy data if none exists
        const storedEvidence = localStorage.getItem('evidenceItems');
        let evidenceList: EvidenceItem[] = [];
        
        if (storedEvidence) {
          evidenceList = JSON.parse(storedEvidence);
        } else {
          // Initialize with dummy data if no evidence exists in localStorage
          localStorage.setItem('evidenceItems', JSON.stringify(dummyEvidence));
          evidenceList = dummyEvidence;
        }
        
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
      const evidenceList: EvidenceItem[] = storedEvidence ? JSON.parse(storedEvidence) : [...dummyEvidence];
      
      // Add new evidence
      evidenceList.push(newEvidence);
      
      // Save back to storage
      localStorage.setItem('evidenceItems', JSON.stringify(evidenceList));
      
      // Track the upload activity
      trackActivity('upload', evidenceId);
      
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
      
      // Track the verify activity
      trackActivity('verify', evidenceId);
      
      // Refresh evidence to update the UI
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

  // Function to view evidence (for tracking purposes)
  const viewEvidence = (evidenceId: string) => {
    trackActivity('view', evidenceId);
    return evidence.find(item => item.id === evidenceId) || null;
  };

  return {
    evidence,
    loading,
    uploadEvidence,
    verifyEvidence,
    viewEvidence,
    refreshEvidence,
    recentActivity
  };
};
