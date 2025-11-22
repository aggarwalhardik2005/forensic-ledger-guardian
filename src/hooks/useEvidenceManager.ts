
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import ipfsService from '@/services/ipfsService';
import web3Service, { EvidenceType } from '@/services/web3Service';
import { supabase } from '@/lib/supabaseClient';

export type EvidenceItem = {
  id: string;
  name: string;
  type: string;
  caseId: string;
  submittedBy: string;
  submittedDate: string;
  verified: boolean;
  hash?: string;
  cidEncrypted?: string;
  size?: number;
};

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
        if (!supabase) {
          throw new Error('Supabase client is not initialized');
        }

        // Fetch evidence from Supabase
        const query = supabase.from('evidence').select('*');
        
        // If caseId is provided, filter by case_id
        const finalQuery = caseId ? query.eq('case_id', caseId) : query;
        
        const { data, error } = await finalQuery;
        
        if (error) {
          throw error;
        }

        // Transform Supabase data to EvidenceItem format
        const evidenceList: EvidenceItem[] = (data || []).map((item: any) => ({
          id: item.evidence_id,
          name: item.original_filename || 'Unknown Evidence',
          type: 'application', // Default type - can be updated based on your data
          caseId: item.case_id,
          submittedBy: 'Unknown User', // Can be enriched from user profiles if needed
          submittedDate: item.created_at || new Date().toISOString(),
          // size: 0, // Size not stored in current schema
          verified: false, // Can be updated based on blockchain status
          hash: item.hash_original,
          cidEncrypted: item.cid
        }));

        setEvidence(evidenceList);
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
      if (!supabase) {
        throw new Error('Supabase client is not initialized');
      }

      // Generate an encryption key (in a real app, this would be more secure)
      const encryptionKey = `key-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      // Upload to IPFS
      const { cid, hash } = await ipfsService.uploadFile(file, encryptionKey);
      
      // Create evidence ID
      const evidenceId = `EV-${caseId.split('-')[1]}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      // Generate IV for encryption (simplified)
      const iv = Math.random().toString(36).substring(2, 34);
      
      // Insert into Supabase
      const { error } = await supabase.from('evidence').insert([
        {
          case_id: caseId,
          evidence_id: evidenceId,
          cid: cid,
          key_encrypted: encryptionKey, // Should be encrypted in production
          iv_encrypted: iv,
          hash_original: hash
        }
      ]);
      
      if (error) {
        throw error;
      }
      
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
      // For now, we're marking it as verified locally
      
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

  // Function to download evidence from IPFS via Pinata gateway
  const downloadEvidence = async (evidence: EvidenceItem) => {
    try {
      if (!evidence.cidEncrypted) {
        throw new Error('CID not available for this evidence');
      }

      // Construct the Pinata gateway URL
      const pinataGatewayUrl = `https://gateway.pinata.cloud/ipfs/${evidence.cidEncrypted}`;
      
      // Use fetch to download the file
      const response = await fetch(pinataGatewayUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to download evidence: ${response.statusText}`);
      }

      // Get the file blob
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = evidence.name || `${evidence.id}.bin`;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);
      
      // Track the download activity
      trackActivity('view', evidence.id);
      
      toast({
        title: "Download Complete",
        description: `${evidence.name} has been downloaded successfully`,
      });
      
      return true;
    } catch (error) {
      console.error("Failed to download evidence:", error);
      toast({
        title: "Download Failed",
        description: error instanceof Error ? error.message : "Failed to download evidence file",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    evidence,
    loading,
    uploadEvidence,
    verifyEvidence,
    viewEvidence,
    downloadEvidence,
    refreshEvidence,
    recentActivity
  };
};
