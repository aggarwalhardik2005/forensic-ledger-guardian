# Forensic Ledger Guardian - AI Agent Instructions

## Project Overview

Blockchain-powered forensic evidence management system with React frontend, Node.js IPFS backend, and Solidity smart contracts. Uses role-based access control (RBAC) for Court, Officer, Forensic, and Lawyer roles.

## Architecture & Data Flow

```
React App (src/) ←→ IPFS Backend (ipfs-backend/) ←→ Blockchain (ForensicChain.sol)
                          ↓
                    Supabase (Auth + Metadata)
```

- **Source of truth for roles**: Blockchain (`web3Service.getUserRole()`)
- **Evidence storage**: Encrypted on IPFS via Pinata, hash recorded on-chain
- **Authentication**: Dual auth via Supabase (email) or wallet connection

## Critical Patterns

### Role System (src/config/roles.ts)

Roles map to smart contract enum: `None=0, Court=1, Officer=2, Forensic=3, Lawyer=4`

```typescript
import { Role } from "@/services/web3Service";
// Court has admin privileges and can access all routes
```

### Route Protection (src/routes/\*.tsx)

All protected routes use `SecureRoute` wrapper with role-based access:

```tsx
<SecureRoute allowedRoles={[Role.Court, Role.Officer]} requireAuth={true}>
  <Component />
</SecureRoute>
```

Routes are organized by role in `src/routes/` - add new role-specific routes to the appropriate file.

### Web3 Integration (src/contexts/Web3Context.tsx)

- Contract address hardcoded in `src/services/web3Service.ts` (line ~533)
- Target network: Sepolia (`0xaa36a7`)
- Always refresh role from blockchain after wallet operations: `refreshRole()`

### UI Components

Uses shadcn/ui with Radix primitives in `src/components/ui/`. Follow existing patterns:

```typescript
import { cn } from "@/lib/utils"; // For className merging
import { Button } from "@/components/ui/button";
```

## Development Commands

```bash
npm run dev          # Start Vite dev server (port 8080)
npm run build        # Production build
npm run lint         # ESLint check

# Smart contracts (Foundry)
forge build          # Compile contracts
forge test           # Run Solidity tests
forge script script/ForensicChain.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

## Environment Variables

**Frontend (.env):**

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` - Supabase connection
- `VITE_IPFS_BACKEND_URL` - IPFS backend (default: http://localhost:4000)
- `VITE_MASTER_PASSWORD` - Evidence encryption key

**IPFS Backend (ipfs-backend/.env):**

- `MASTER_PASSWORD` - Must match frontend for encryption
- `PINATA_JWT` - Pinata IPFS gateway
- `CONTRACT_ADDRESS`, `SEPOLIA_RPC_URL`, `SEPOLIA_PRIVATE_KEY` - Blockchain access

## Key Files to Understand

- `src/services/web3Service.ts` - All blockchain interactions (1600+ lines, contains ABI)
- `src/config/roles.ts` - Role permissions and navigation config
- `src/ForensicChain.sol` - Smart contract (FIR → Case → Evidence lifecycle)
- `ipfs-backend/backendfinal.js` - Evidence upload/download with encryption

## Domain Concepts

1. **FIR (First Information Report)** - Filed by Officers, can be promoted to Case by Court
2. **Case** - Created from FIR, contains evidence, can be sealed/closed
3. **Evidence** - Uploaded to IPFS encrypted, hash stored on-chain, requires confirmation
4. **Chain of Custody** - Immutable audit trail of evidence access recorded on blockchain

## Testing

- Smart contract tests: `test/ForensicChain.t.sol` (uses Foundry's forge-std)
- No frontend test framework currently configured

## Common Modifications

- **Add new page**: Create in `src/pages/`, add route in appropriate `src/routes/*.tsx`
- **New smart contract function**: Update `ForensicChain.sol`, rebuild ABI, update `web3Service.ts`
- **New UI component**: Follow shadcn patterns in `src/components/ui/`
