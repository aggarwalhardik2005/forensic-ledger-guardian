# AI Coding Assistant Instructions for Forensic Ledger Guardian

## Project Overview
Forensic Ledger Guardian is a blockchain-powered forensic evidence management system that ensures tamper-proof digital evidence handling with role-based access control and encrypted storage. The system combines React frontend, Solidity smart contracts, IPFS decentralized storage, and Supabase database.

## Architecture Overview

### Core Components
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Smart Contracts**: Solidity 0.8.29 with Foundry framework
- **Storage**: IPFS (via Pinata) for encrypted evidence files
- **Database**: Supabase (PostgreSQL) for user profiles and metadata
- **Backend**: Node.js/Express IPFS upload/retrieval service

### Data Flow Pattern
```
FIR → Case Creation → Evidence Upload → IPFS Storage → Blockchain Recording → Confirmation → Access Control
```

### Role-Based Architecture
- **Court**: System administration, case approval, role assignment
- **Officer**: FIR filing, evidence submission
- **Forensic**: Evidence analysis and confirmation
- **Lawyer**: Evidence access and review

## Critical Development Patterns

### 1. Role-Based Access Control
```typescript
// Always check roles before operations
const { userRole, checkRoleAccess } = useWeb3();
if (!checkRoleAccess(Role.Court)) return;

// Use SecureRoute wrapper for protected pages
<SecureRoute allowedRoles={[Role.Court, Role.Officer]} requireAuth={true}>
  <ProtectedComponent />
</SecureRoute>
```

### 2. Evidence Management Workflow
```typescript
// Evidence submission pattern
const submitEvidence = async (caseId: string, file: File) => {
  // 1. Encrypt file locally
  const { encryptedData, key, iv } = await encryptFile(file);
  
  // 2. Upload to IPFS backend
  const cid = await ipfsService.uploadEncrypted(encryptedData);
  
  // 3. Record on blockchain with hashes
  await web3Service.submitEvidence(caseId, {
    evidenceId: generateId(),
    cid,
    hashOriginal: await hashFile(file),
    encryptionKeyHash: await hashKey(key)
  });
};
```

### 3. FIR to Case Lifecycle
```solidity
// Smart contract pattern for case creation
function createCaseFromFIR(
    string memory caseId,
    string memory firId,
    string memory title,
    string memory description,
    string[] memory tags
) external onlyCourt {
    // Validate FIR exists and isn't promoted
    require(firs[firId].filedBy != address(0), "FIR not found");
    require(!firs[firId].promotedToCase, "FIR already promoted");
    
    // Create case structure
    cases[caseId] = Case({...});
    
    // Migrate any existing FIR evidence
    // Update FIR status
}
```

### 4. Web3 Integration Patterns
```typescript
// Wallet connection and role checking
const { connectWallet, userRole, isConnected } = useWeb3();

// Always handle connection states
if (!isConnected) {
  return <ConnectWalletPrompt />;
}

// Blockchain is source of truth for roles
const blockchainRole = await web3Service.getUserRole();
```

## Development Workflow Commands

### Frontend Development
```bash
npm run dev              # Start Vite dev server (port 5173)
npm run build           # Production build
npm run build:dev       # Development build
npm run lint            # ESLint checking
```

### Smart Contract Development
```bash
forge build             # Compile contracts
forge test              # Run test suite
forge script script/ForensicChain.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast  # Deploy
```

### IPFS Backend
```bash
cd ipfs-backend
npm install
npm start               # Start Express server (port 4000)
```

### Database Setup
```sql
-- Run in Supabase SQL Editor
-- Execute contents of database-setup.sql
```

## File Organization Conventions

### Component Structure
```
src/components/
├── layout/             # Layout components (Header, Sidebar, etc.)
├── auth/              # Authentication components
├── ui/                # Reusable UI components (shadcn/ui)
├── [role]/            # Role-specific components
│   ├── court/
│   ├── officer/
│   ├── forensic/
│   └── lawyer/
└── shared/            # Cross-role components
```

### Route Organization
```typescript
// src/routes/[Role]Routes.tsx
export const [Role]Routes = () => (
  <Route path="/[role-path]"
    element={
      <Layout>
        <SecureRoute allowedRoles={[Role.[Role]]}>
          <[Role]Component />
        </SecureRoute>
      </Layout>
    }
  />
);
```

### Service Layer Pattern
```typescript
// src/services/[serviceName].ts
export class [ServiceName]Service {
  async [operation](params: [ParamsType]): Promise<[ReturnType]> {
    // Implementation with error handling
  }
}
```

## Key Integration Points

### 1. Web3 Context Usage
```typescript
// Always wrap components that need blockchain interaction
<Web3Provider>
  <AuthProvider>
    <App />
  </AuthProvider>
</Web3Provider>
```

### 2. Supabase Integration
```typescript
// Use service layer for database operations
import { supabaseClient } from '@/lib/supabaseClient';
const { data, error } = await supabaseClient
  .from('profiles')
  .select('*')
  .eq('address', walletAddress);
```

### 3. IPFS File Handling
```typescript
// File upload pattern
const formData = new FormData();
formData.append('file', encryptedFile);
const response = await axios.post('/upload', formData);
const cid = response.data.cid;
```

## Testing Patterns

### Smart Contract Testing
```solidity
// test/ForensicChain.t.sol
function testFileFIR() public {
    vm.prank(officer);
    fc.fileFIR("FIR1", "Test FIR");
    ForensicChain.FIR memory fir = fc.getFIR("FIR1");
    assertEq(fir.description, "Test FIR");
}
```

### Frontend Testing
```typescript
// Use React Testing Library for component tests
import { render, screen } from '@testing-library/react';
import { Web3Provider } from '@/contexts/Web3Context';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Web3Provider>
      {component}
    </Web3Provider>
  );
};
```

## Security Considerations

### 1. Evidence Encryption
- Always encrypt files before IPFS upload
- Store encryption keys securely (consider key management service)
- Use AES-256 for file encryption

### 2. Access Control
- Validate roles on both frontend and smart contract
- Implement proper error handling for unauthorized access
- Use blockchain as source of truth for permissions

### 3. Input Validation
```typescript
// Validate evidence data before submission
const validateEvidence = (evidence: EvidenceInput) => {
  if (!evidence.file || !evidence.caseId) {
    throw new Error('Missing required fields');
  }
  // Additional validation logic
};
```

## Common Pitfalls to Avoid

1. **Don't bypass role checks** - Always validate permissions
2. **Don't store unencrypted files** - IPFS files must be encrypted
3. **Don't mix blockchain and database state** - Blockchain is authoritative
4. **Don't forget error handling** - Web3 operations can fail
5. **Don't hardcode contract addresses** - Use environment variables

## Environment Variables Required

```env
# Frontend
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CONTRACT_ADDRESS=deployed_contract_address
VITE_SEPOLIA_RPC_URL=sepolia_rpc_url

# IPFS Backend
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
PINATA_JWT=your_pinata_jwt_token
CONTRACT_ADDRESS=deployed_contract_address
SEPOLIA_RPC_URL=sepolia_rpc_url
SEPOLIA_PRIVATE_KEY=wallet_private_key
```

## Deployment Checklist

- [ ] Smart contracts deployed to Sepolia testnet
- [ ] Contract address updated in frontend config
- [ ] IPFS backend configured with Pinata credentials
- [ ] Supabase database initialized with schema
- [ ] Environment variables configured
- [ ] MetaMask configured for Sepolia network
- [ ] Test wallet funded with test ETH

## Getting Help

1. Check existing patterns in similar components
2. Review smart contract functions for blockchain operations
3. Test Web3 interactions in browser console
4. Use the debug route (`/debug/routes`) in development
5. Check browser network tab for API call failures

Remember: **Blockchain is the source of truth** for evidence integrity and access control. Always validate operations against smart contract state.</content>
<parameter name="filePath">/workspaces/forensic-ledger-guardian/.github/copilot-instructions.md