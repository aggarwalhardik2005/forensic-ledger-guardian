# Forensic Ledger Guardian - AI Coding Instructions

Blockchain-powered forensic evidence management with React 19 frontend, Solidity smart contracts, IPFS storage, and Supabase backend.

## Architecture

- **Frontend**: React 19 + TypeScript + Vite + shadcn/ui + Tailwind CSS
- **Smart Contracts**: Solidity 0.8.29 + Foundry (Sepolia testnet)
- **Storage**: IPFS via Pinata (encrypted), Supabase for metadata/keys
- **Backend**: Express.js IPFS service (`ipfs-backend/`)

**Data flow**: FIR → Case promotion → Evidence upload (encrypted) → IPFS + blockchain recording → Access control via smart contract

## Critical Patterns

### Role-Based Access (blockchain is source of truth)
```typescript
// src/contexts/Web3Context.tsx - useWeb3 hook pattern
const { userRole, isConnected, checkRoleAccess } = useWeb3();
if (!checkRoleAccess(Role.Court)) return;

// src/components/auth/SecureRoute.tsx - protect routes
<SecureRoute allowedRoles={[Role.Court, Role.Officer]} requireAuth={true}>
  <ProtectedComponent />
</SecureRoute>
```
Roles: `Court` (admin), `Officer` (FIR/evidence), `Forensic` (analysis), `Lawyer` (review)

### React 19 Context Pattern
```typescript
// Use Context directly without .Provider wrapper (React 19)
<Web3Context value={{ ...state }}>{children}</Web3Context>
```

### Smart Contract Calls
```typescript
// src/services/web3Service.ts singleton pattern
import web3Service, { Role, EvidenceType } from '@/services/web3Service';
await web3Service.fileFIR(firId, description);
await web3Service.createCaseFromFIR(caseId, firId, title, description, tags);
```

## Development Commands

```bash
# Frontend
npm run dev        # Vite dev server (port 5173)
npm run build      # Production build
npm run lint       # ESLint

# Smart Contracts
forge build        # Compile
forge test         # Test suite
forge script script/ForensicChain.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast

# IPFS Backend
cd ipfs-backend && npm start   # Express server (port 4000)
```

## File Organization

- `src/routes/{Role}Routes.tsx` - Role-specific route definitions with `SecureRoute` wrapper
- `src/services/*.ts` - Singleton services (web3Service, ipfsService, authService)
- `src/contexts/*.tsx` - React contexts (Web3Context is primary, uses React 19 pattern)
- `src/components/ui/` - shadcn/ui components (modify via shadcn CLI)

## Key Conventions

1. **Blockchain authoritative**: Always validate roles/state against smart contract, not database
2. **Evidence encryption**: All files encrypted (AES-256) before IPFS upload; keys stored encrypted in Supabase
3. **Error handling**: Web3 operations can fail - always wrap in try/catch with toast notifications
4. **Contract addresses**: Use env vars (`VITE_CONTRACT_ADDRESS`), never hardcode
5. **Toast notifications**: Use `@/hooks/use-toast` for user feedback

## Environment Variables

```env
# Frontend (.env)
VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_CONTRACT_ADDRESS, VITE_SEPOLIA_RPC_URL

# Backend (ipfs-backend/.env)
SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PINATA_JWT, CONTRACT_ADDRESS, SEPOLIA_RPC_URL, SEPOLIA_PRIVATE_KEY, MASTER_PASSWORD
```

## Testing

```bash
# Smart contracts (Foundry)
forge test              # Run all tests
forge test -vvv         # Verbose output
forge test --match-test testFileFIR  # Run specific test
```

Smart contract tests in `test/ForensicChain.t.sol` use `vm.prank(address)` to simulate different roles.

Frontend: No test infrastructure currently configured. Component tests would use React Testing Library with Web3Provider wrapper.