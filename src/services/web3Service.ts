
import { ethers } from 'ethers';
import { toast } from '@/hooks/use-toast';

// ABI would be generated when compiling the smart contract
const CONTRACT_ABI = [
  // This would be replaced by the actual ABI from contract compilation
  // For now, we'll include some placeholder function definitions based on our contract
];

const CONTRACT_ADDRESS = "0x123..."; // This would be the deployed contract address

export enum Role {
  None = 0,
  Court = 1,
  Officer = 2,
  Forensic = 3,
  Lawyer = 4
}

export enum EvidenceType {
  Image = 0,
  Video = 1,
  Document = 2,
  Other = 3
}

export interface Evidence {
  evidenceId: string;
  cidEncrypted: string;
  hash: string;
  evidenceType: EvidenceType;
  submittedBy: string;
  confirmed: boolean;
  submittedAt: number;
  chainOfCustody: string[];
}

export interface Case {
  caseId: string;
  title: string;
  description: string;
  createdBy: string;
  seal: boolean;
  open: boolean;
  tags: string[];
  evidenceCount: number;
}

export interface FIR {
  firId: string;
  filedBy: string;
  description: string;
  timestamp: number;
  promotedToCase: boolean;
  associatedCaseId: string;
}

// Provide a minimal `window.ethereum` declaration so TypeScript doesn't error in the browser code.
interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  removeAllListeners?: (event?: string) => void;
}

class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private contract: ethers.Contract | null = null;
  private account: string | null = null;

  // Helper to safely coerce values that may be BigNumber-like or primitive into numbers
  private toNumber(value: unknown): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'bigint') return Number(value);
    if (typeof value === 'string' && value !== '') {
      const n = Number(value);
      return Number.isNaN(n) ? 0 : n;
    }
    if (typeof value === 'object' && value !== null) {
      const obj = value as { toNumber?: unknown };
      if (typeof obj.toNumber === 'function') {
        return (obj.toNumber as unknown as () => number)();
      }
    }
    return 0;
  }

  constructor() {
    this.initWeb3();
  }

  private async initWeb3() {
  if (typeof window !== 'undefined' && (window as unknown as { ethereum?: EthereumProvider }).ethereum) {
      try {
  // Request account access
  const eth = (window as unknown as { ethereum?: EthereumProvider }).ethereum as EthereumProvider;
    await eth.request({ method: 'eth_requestAccounts' });
    this.provider = new ethers.BrowserProvider(eth);
    const signer = await this.provider.getSigner();
    this.account = await signer.getAddress();
  this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer as unknown as ethers.ContractRunner);

        // Listen for account changes
        eth.on('accountsChanged', (accounts: unknown) => {
          const arr = Array.isArray(accounts) ? accounts as string[] : [];
          if (arr.length === 0) {
            this.account = null;
            toast({
              title: "Disconnected",
              description: "Wallet disconnected.",
              variant: "destructive"
            });
          } else {
            this.account = arr[0];
            this.initContract();
            toast({
              title: "Connected",
              description: `Connected to account ${this.shortenAddress(arr[0])}`
            });
          }
        });
      } catch (error) {
        console.error("User denied account access or another error occurred:", error);
        toast({
          title: "Connection Failed",
          description: "Failed to connect to Ethereum wallet.",
          variant: "destructive"
        });
      }
    } else {
      console.error("No ethereum browser extension detected");
      toast({
        title: "Web3 Not Available",
        description: "Please install MetaMask or another Ethereum wallet extension.",
        variant: "destructive"
      });
    }
  }

  private initContract() {
    // initialize contract runner (signer) from existing provider
    if (this.provider && this.account) {
      // BrowserProvider.getSigner() returns a Promise-like signer
      // but here we can call getSigner() and set the contract once the signer resolves
      this.provider.getSigner().then((signer) => {
        this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer as unknown as ethers.ContractRunner);
      }).catch(() => {
        // ignore signer resolution errors during initContract
      });
    }
  }

  private shortenAddress(address: string): string {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  public async connectWallet(): Promise<string | null> {
    // Use window.ethereum directly to request accounts for compatibility
  const eth = (typeof window !== 'undefined') ? (window as unknown as { ethereum?: EthereumProvider }).ethereum as EthereumProvider | undefined : undefined;
    if (!this.provider) {
      await this.initWeb3();
    }

    if (eth) {
      try {
        const accountsRaw = await eth.request({ method: 'eth_requestAccounts' });
        const accounts = Array.isArray(accountsRaw) ? accountsRaw as string[] : [];
        if (accounts.length > 0) {
          this.account = accounts[0];
          this.initContract();
          return this.account;
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        toast({
          title: "Connection Error",
          description: "Could not connect to wallet.",
          variant: "destructive"
        });
      }
    }
    
    return null;
  }

  public async getCurrentAccount(): Promise<string | null> {
    return this.account;
  }

  public async getUserRole(): Promise<Role> {
    if (!this.contract || !this.account) return Role.None;
    
    try {
      const roleRaw = await this.contract.getGlobalRole(this.account);
      return this.toNumber(roleRaw) as Role;
    } catch (error) {
      console.error("Error getting user role:", error);
      return Role.None;
    }
  }

  public async getUserCaseRole(caseId: string): Promise<Role> {
    if (!this.contract || !this.account) return Role.None;
    
    try {
      const roleRaw = await this.contract.getMyRoleInCase(caseId);
      return this.toNumber(roleRaw) as Role;
    } catch (error) {
      console.error(`Error getting user role for case ${caseId}:`, error);
      return Role.None;
    }
  }

  // FIR Management
  public async fileFIR(firId: string, description: string): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.fileFIR(firId, description);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error filing FIR:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to file FIR. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async getFIR(firId: string): Promise<FIR | null> {
    if (!this.contract) return null;
    
    try {
      const fir = await this.contract.getFIR(firId);
      return {
        firId: fir.firId,
        filedBy: fir.filedBy,
        description: fir.description,
        timestamp: this.toNumber(fir.timestamp),
        promotedToCase: fir.promotedToCase,
        associatedCaseId: fir.associatedCaseId
      };
    } catch (error) {
      console.error(`Error getting FIR ${firId}:`, error);
      return null;
    }
  }

  // Case Management
  public async createCaseFromFIR(
    caseId: string,
    firId: string,
    title: string,
    description: string,
    tags: string[]
  ): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.createCaseFromFIR(caseId, firId, title, description, tags);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error creating case from FIR:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to create case. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async assignCaseRole(caseId: string, user: string, role: Role): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.assignCaseRole(caseId, user, role);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error assigning case role:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to assign role. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async getCase(caseId: string): Promise<Case | null> {
    if (!this.contract) return null;
    
    try {
      const caseData = await this.contract.getCase(caseId);
      return {
        caseId: caseData.caseId,
        title: caseData.title,
        description: caseData.description,
        createdBy: caseData.createdBy,
        seal: caseData.seal,
        open: caseData.open,
        tags: caseData.tags,
        evidenceCount: this.toNumber(caseData.evidenceCount)
      };
    } catch (error) {
      console.error(`Error getting case ${caseId}:`, error);
      return null;
    }
  }

  public async sealCase(caseId: string): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.sealCase(caseId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error(`Error sealing case ${caseId}:`, error);
      toast({
        title: "Transaction Failed",
        description: "Failed to seal case. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async reopenCase(caseId: string): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.reopenCase(caseId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error(`Error reopening case ${caseId}:`, error);
      toast({
        title: "Transaction Failed",
        description: "Failed to reopen case. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async closeCase(caseId: string): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.closeCase(caseId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error(`Error closing case ${caseId}:`, error);
      toast({
        title: "Transaction Failed",
        description: "Failed to close case. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  // Evidence Management
  public async submitCaseEvidence(
    caseId: string,
    evidenceId: string,
    cidEncrypted: string,
    hash: string,
    evidenceType: EvidenceType
  ): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.submitCaseEvidence(
        caseId,
        evidenceId,
        cidEncrypted,
        hash,
        evidenceType
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error submitting evidence:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to submit evidence. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async submitFIREvidence(
    firId: string,
    evidenceId: string,
    cidEncrypted: string,
    hash: string,
    evidenceType: EvidenceType
  ): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.submitFIREvidence(
        firId,
        evidenceId,
        cidEncrypted,
        hash,
        evidenceType
      );
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error submitting FIR evidence:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to submit FIR evidence. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async confirmCaseEvidence(caseId: string, index: number): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.confirmCaseEvidence(caseId, index);
      await tx.wait();
      return true;
    } catch (error) {
      console.error(`Error confirming evidence index ${index}:`, error);
      toast({
        title: "Transaction Failed",
        description: "Failed to confirm evidence. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async accessEvidenceLog(caseId: string, index: number): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.accessEvidenceLog(caseId, index);
      await tx.wait();
      return true;
    } catch (error) {
      console.error(`Error accessing evidence log index ${index}:`, error);
      toast({
        title: "Transaction Failed",
        description: "Failed to access evidence log. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async getEvidence(caseId: string, index: number): Promise<Evidence | null> {
    if (!this.contract) return null;
    
    try {
      const evidence = await this.contract.getEvidence(caseId, index);
      return {
        evidenceId: evidence.evidenceId,
        cidEncrypted: evidence.cidEncrypted,
        hash: evidence.hash,
        evidenceType: Number(evidence.evidenceType) as EvidenceType,
        submittedBy: evidence.submittedBy,
        confirmed: evidence.confirmed,
        submittedAt: evidence.submittedAt ? Number(evidence.submittedAt) : 0,
        chainOfCustody: Array.isArray(evidence.chainOfCustody)
          ? evidence.chainOfCustody.map((c: unknown) => String(c))
          : []
      };
    } catch (error) {
      console.error(`Error getting evidence index ${index}:`, error);
      return null;
    }
  }

  // System Management
  public async toggleSystemLock(): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.toggleSystemLock();
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error toggling system lock:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to toggle system lock. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  public async setGlobalRole(user: string, role: Role): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.setGlobalRole(user, role);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error setting global role:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to set global role. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }

  // Helper Functions
  public getRoleString(role: Role): string {
    switch (role) {
      case Role.Court: return "Court";
      case Role.Officer: return "Officer";
      case Role.Forensic: return "Forensic";
      case Role.Lawyer: return "Lawyer";
      default: return "None";
    }
  }

  public getEvidenceTypeString(type: EvidenceType): string {
    switch (type) {
      case EvidenceType.Image: return "Image";
      case EvidenceType.Video: return "Video";
      case EvidenceType.Document: return "Document";
      default: return "Other";
    }
  }
}

// Create singleton instance
const web3Service = new Web3Service();
export default web3Service;
