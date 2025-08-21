
import { ethers, toUtf8Bytes } from 'ethers';
import { toast } from '@/hooks/use-toast';

const CONTRACT_ABI = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"accessEvidence","inputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"index","type":"uint256","internalType":"uint256"},{"name":"keyHash","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"nonpayable"},{"type":"function","name":"assignCaseRole","inputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"user","type":"address","internalType":"address"},{"name":"role","type":"uint8","internalType":"enum ForensicChain.Role"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"caseAuditTrail","inputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"caseEvidenceMapping","inputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"evidenceId","type":"string","internalType":"string"},{"name":"cidEncrypted","type":"string","internalType":"string"},{"name":"hashEncrypted","type":"string","internalType":"string"},{"name":"hashOriginal","type":"string","internalType":"string"},{"name":"encryptionKeyHash","type":"bytes","internalType":"bytes"},{"name":"evidenceType","type":"uint8","internalType":"enum ForensicChain.EvidenceType"},{"name":"submittedBy","type":"address","internalType":"address"},{"name":"confirmed","type":"bool","internalType":"bool"},{"name":"submittedAt","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"caseRoles","inputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint8","internalType":"enum ForensicChain.Role"}],"stateMutability":"view"},{"type":"function","name":"cases","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"title","type":"string","internalType":"string"},{"name":"description","type":"string","internalType":"string"},{"name":"createdBy","type":"address","internalType":"address"},{"name":"seal","type":"bool","internalType":"bool"},{"name":"open","type":"bool","internalType":"bool"},{"name":"evidenceCount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"closeCase","inputs":[{"name":"caseId","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"confirmCaseEvidence","inputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"index","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"createCaseFromFIR","inputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"firId","type":"string","internalType":"string"},{"name":"title","type":"string","internalType":"string"},{"name":"description","type":"string","internalType":"string"},{"name":"tags","type":"string[]","internalType":"string[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"evidenceAccessed","inputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"evidenceConfirmed","inputs":[{"name":"","type":"string","internalType":"string"},{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"fileFIR","inputs":[{"name":"firId","type":"string","internalType":"string"},{"name":"description","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"firs","inputs":[{"name":"","type":"string","internalType":"string"}],"outputs":[{"name":"firId","type":"string","internalType":"string"},{"name":"filedBy","type":"address","internalType":"address"},{"name":"description","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"promotedToCase","type":"bool","internalType":"bool"},{"name":"associatedCaseId","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"getCase","inputs":[{"name":"caseId","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"tuple","internalType":"struct ForensicChain.Case","components":[{"name":"caseId","type":"string","internalType":"string"},{"name":"title","type":"string","internalType":"string"},{"name":"description","type":"string","internalType":"string"},{"name":"createdBy","type":"address","internalType":"address"},{"name":"seal","type":"bool","internalType":"bool"},{"name":"open","type":"bool","internalType":"bool"},{"name":"tags","type":"string[]","internalType":"string[]"},{"name":"evidenceCount","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"getEvidence","inputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"index","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"tuple","internalType":"struct ForensicChain.Evidence","components":[{"name":"evidenceId","type":"string","internalType":"string"},{"name":"cidEncrypted","type":"string","internalType":"string"},{"name":"hashEncrypted","type":"string","internalType":"string"},{"name":"hashOriginal","type":"string","internalType":"string"},{"name":"encryptionKeyHash","type":"bytes","internalType":"bytes"},{"name":"evidenceType","type":"uint8","internalType":"enum ForensicChain.EvidenceType"},{"name":"submittedBy","type":"address","internalType":"address"},{"name":"confirmed","type":"bool","internalType":"bool"},{"name":"submittedAt","type":"uint256","internalType":"uint256"},{"name":"chainOfCustody","type":"address[]","internalType":"address[]"}]}],"stateMutability":"view"},{"type":"function","name":"getFIR","inputs":[{"name":"firId","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"tuple","internalType":"struct ForensicChain.FIR","components":[{"name":"firId","type":"string","internalType":"string"},{"name":"filedBy","type":"address","internalType":"address"},{"name":"description","type":"string","internalType":"string"},{"name":"timestamp","type":"uint256","internalType":"uint256"},{"name":"promotedToCase","type":"bool","internalType":"bool"},{"name":"associatedCaseId","type":"string","internalType":"string"}]}],"stateMutability":"view"},{"type":"function","name":"getGlobalRole","inputs":[{"name":"user","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint8","internalType":"enum ForensicChain.Role"}],"stateMutability":"view"},{"type":"function","name":"getMyRoleInCase","inputs":[{"name":"caseId","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"uint8","internalType":"enum ForensicChain.Role"}],"stateMutability":"view"},{"type":"function","name":"globalRoles","inputs":[{"name":"","type":"address","internalType":"address"}],"outputs":[{"name":"","type":"uint8","internalType":"enum ForensicChain.Role"}],"stateMutability":"view"},{"type":"function","name":"isSystemLocked","inputs":[],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"reopenCase","inputs":[{"name":"caseId","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"sealCase","inputs":[{"name":"caseId","type":"string","internalType":"string"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"setGlobalRole","inputs":[{"name":"user","type":"address","internalType":"address"},{"name":"role","type":"uint8","internalType":"enum ForensicChain.Role"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"submitCaseEvidence","inputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"evidenceId","type":"string","internalType":"string"},{"name":"cidEncrypted","type":"string","internalType":"string"},{"name":"hashEncrypted","type":"string","internalType":"string"},{"name":"hashOriginal","type":"string","internalType":"string"},{"name":"encryptionKeyHash","type":"bytes","internalType":"bytes"},{"name":"evidenceType","type":"uint8","internalType":"enum ForensicChain.EvidenceType"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"submitFIREvidence","inputs":[{"name":"firId","type":"string","internalType":"string"},{"name":"evidenceId","type":"string","internalType":"string"},{"name":"cidEncrypted","type":"string","internalType":"string"},{"name":"hashEncrypted","type":"string","internalType":"string"},{"name":"hashOriginal","type":"string","internalType":"string"},{"name":"encryptionKeyHash","type":"bytes","internalType":"bytes"},{"name":"evidenceType","type":"uint8","internalType":"enum ForensicChain.EvidenceType"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"toggleSystemLock","inputs":[],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"updateEncryptionKey","inputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"index","type":"uint256","internalType":"uint256"},{"name":"newKeyHash","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"usedCIDHash","inputs":[{"name":"","type":"bytes32","internalType":"bytes32"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"verifyEvidence","inputs":[{"name":"caseId","type":"string","internalType":"string"},{"name":"index","type":"uint256","internalType":"uint256"},{"name":"providedHash","type":"string","internalType":"string"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"event","name":"CaseCreated","inputs":[{"name":"caseId","type":"string","indexed":true,"internalType":"string"},{"name":"firId","type":"string","indexed":true,"internalType":"string"},{"name":"creator","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"CaseStatusChanged","inputs":[{"name":"caseId","type":"string","indexed":true,"internalType":"string"},{"name":"statusSealed","type":"bool","indexed":false,"internalType":"bool"},{"name":"open","type":"bool","indexed":false,"internalType":"bool"}],"anonymous":false},{"type":"event","name":"EncryptionKeyUpdated","inputs":[{"name":"caseId","type":"string","indexed":true,"internalType":"string"},{"name":"index","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"keyHash","type":"bytes","indexed":false,"internalType":"bytes"}],"anonymous":false},{"type":"event","name":"EvidenceAccessed","inputs":[{"name":"caseId","type":"string","indexed":true,"internalType":"string"},{"name":"index","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"accessor","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"EvidenceConfirmed","inputs":[{"name":"caseId","type":"string","indexed":true,"internalType":"string"},{"name":"index","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"confirmer","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"EvidenceSubmitted","inputs":[{"name":"caseId","type":"string","indexed":true,"internalType":"string"},{"name":"evidenceId","type":"string","indexed":false,"internalType":"string"},{"name":"cidEncrypted","type":"string","indexed":false,"internalType":"string"},{"name":"submitter","type":"address","indexed":false,"internalType":"address"}],"anonymous":false},{"type":"event","name":"FIRFiled","inputs":[{"name":"firId","type":"string","indexed":true,"internalType":"string"},{"name":"filedBy","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"event","name":"RoleAssigned","inputs":[{"name":"caseId","type":"string","indexed":true,"internalType":"string"},{"name":"user","type":"address","indexed":true,"internalType":"address"},{"name":"role","type":"uint8","indexed":false,"internalType":"enum ForensicChain.Role"}],"anonymous":false}];

const CONTRACT_ADDRESS = "0x0f98bcb53ff15fdc52168573c36436cf21a1466a";

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
  hashEncrypted: string;
  hashOriginal: string;
  encryptionKeyHash: string;
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

  public async getAllCases(): Promise<Case[]> {
    if (!this.contract) return [];

    try {
      const allCases = await this.contract.getAllCases();
      return allCases.map((caseData: Case) => ({
        caseId: caseData.caseId,
        title: caseData.title,
        description: caseData.description,
        createdBy: caseData.createdBy,
        seal: caseData.seal,
        open: caseData.open,
        tags: caseData.tags,
        evidenceCount: this.toNumber(caseData.evidenceCount)
      }));
    } catch (error) {
      console.error("Error getting all cases:", error);
      return [];
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
    hashEncrypted: string,
    hashOriginal: string,
    encryptionKeyHash: string,
    evidenceType: EvidenceType
  ): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.submitCaseEvidence(
        caseId,
        evidenceId,
        cidEncrypted,
        hashEncrypted,
        hashOriginal,
        toUtf8Bytes(encryptionKeyHash),
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
    hashEncrypted: string,
    hashOriginal: string,
    encryptionKeyHash: string,
    evidenceType: EvidenceType
  ): Promise<boolean> {
    if (!this.contract) return false;
    
    try {
      const tx = await this.contract.submitFIREvidence(
        firId,
        evidenceId,
        cidEncrypted,
        hashEncrypted,
        hashOriginal,
        toUtf8Bytes(encryptionKeyHash),
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

  public async accessEvidence(caseId: string, index: number, keyHash: string): Promise<string | null> {
    if (!this.contract) return null;
    
    try {
  const cidEncrypted = await this.contract.accessEvidence(caseId, index, toUtf8Bytes(keyHash));
      return cidEncrypted;
    } catch (error) {
      console.error(`Error accessing evidence index ${index}:`, error);
      toast({
        title: "Transaction Failed",
        description: "Failed to access evidence. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  }

  public async verifyEvidence(caseId: string, index: number, providedHash: string): Promise<boolean> {
    if (!this.contract) return false;

    try {
      const isValid = await this.contract.verifyEvidence(caseId, index, providedHash);
      return isValid;
    } catch (error) {
      console.error(`Error verifying evidence index ${index}:`, error);
      toast({
        title: "Verification Failed",
        description: "Failed to verify evidence. Please try again.",
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
        hashEncrypted: evidence.hashEncrypted,
        hashOriginal: evidence.hashOriginal,
        encryptionKeyHash: evidence.encryptionKeyHash,
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
