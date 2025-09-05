# 🔐 Forensic Ledger Guardian

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.29-orange.svg)](https://soliditylang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-green.svg)](https://vitejs.dev/)

> A blockchain-powered forensic evidence management system that ensures tamper-proof digital evidence handling with role-based access control and encrypted storage.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Smart Contract](#smart-contract)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## 🌟 Overview

Forensic Ledger Guardian is a comprehensive digital evidence management platform designed for law enforcement agencies, forensic experts, legal professionals, and court officials. The system leverages blockchain technology to create an immutable chain of custody for digital evidence while providing secure, encrypted storage through IPFS.

### Problem Statement

Traditional evidence management systems often lack:
- **Immutable audit trails** - Evidence can be tampered with or modified
- **Transparent chain of custody** - Difficult to track who accessed evidence and when
- **Secure storage** - Centralized storage is vulnerable to attacks
- **Role-based access control** - Limited granular permissions
- **Interoperability** - Different systems don't communicate effectively

### Solution

Our platform addresses these challenges by:
- Using blockchain for immutable evidence records
- Implementing IPFS for decentralized, encrypted storage
- Providing role-based access control with smart contracts
- Creating transparent audit trails for all evidence interactions
- Ensuring cryptographic integrity of all stored evidence

## ✨ Key Features

### 🔒 Security & Integrity
- **Blockchain-based immutability** - All evidence records stored on Ethereum
- **End-to-end encryption** - AES-256 encryption for all stored files
- **Cryptographic hashing** - SHA-256 verification for evidence integrity
- **Tamper detection** - Automatic verification of evidence authenticity

### 👥 Role-Based Access Control
- **Court Officials** - Case creation, role assignment, evidence sealing
- **Police Officers** - FIR filing, evidence submission
- **Forensic Experts** - Evidence analysis and confirmation
- **Legal Counsel** - Evidence access and review

### 📁 Evidence Management
- **Multi-format support** - Images, videos, documents, audio files
- **Chain of custody tracking** - Complete audit trail of evidence access
- **Evidence confirmation system** - Multi-party verification process
- **Case lifecycle management** - From FIR to case closure

### 🌐 Modern Interface
- **Responsive design** - Works seamlessly across devices
- **Real-time updates** - Live notifications and status updates
- **Intuitive navigation** - Role-specific dashboards and workflows
- **Dark/light theme support** - User preference customization

## 🛠 Technology Stack

### Frontend
- **React 19.1.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **React Router** - Client-side routing
- **React Query** - Server state management

### Backend & Storage
- **Node.js/Express** - IPFS backend server
- **IPFS** - Decentralized file storage
- **Supabase** - Database and authentication
- **PostgreSQL** - Relational database

### Blockchain
- **Solidity 0.8.29** - Smart contract language
- **Foundry** - Development framework
- **Ethers.js** - Blockchain interaction library
- **Ethereum Sepolia** - Testnet deployment

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Git** - Version control

## 🏗 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Client  │    │   IPFS Backend   │    │   Blockchain    │
│                 │    │                  │    │                 │
│ • UI Components │    │ • File Upload    │    │ • Smart Contract│
│ • State Mgmt    │◄──►│ • Encryption     │◄──►│ • Evidence Hash │
│ • Web3 Integration   │ • IPFS Storage   │    │ • Access Control│
│ • Auth System   │    │ • File Retrieval │    │ • Audit Trail   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                          ┌──────────────┐
                          │   Supabase   │
                          │              │
                          │ • User Auth  │
                          │ • Profiles   │
                          │ • Role Mgmt  │
                          │ • Metadata   │
                          └──────────────┘
```

### Data Flow
1. **Evidence Submission**: Files encrypted and stored on IPFS, metadata recorded on blockchain
2. **Access Control**: Smart contract validates user permissions before evidence access
3. **Chain of Custody**: All interactions logged immutably on blockchain
4. **Verification**: Cryptographic hashes ensure evidence integrity

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **Git**
- **Foundry** (for smart contract development)
- **MetaMask** or compatible Web3 wallet

### 1. Clone the Repository

```bash
git clone https://github.com/aaravmahajanofficial/forensic-ledger-guardian.git
cd forensic-ledger-guardian
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables
# Edit .env with your configuration
```

### 3. IPFS Backend Setup

```bash
# Navigate to backend directory
cd ipfs_backend/ipfs-backend

# Install backend dependencies
npm install

# Configure backend environment
cp .env.example .env
# Edit with your IPFS and Supabase credentials
```

### 4. Database Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL setup script:

```sql
-- Copy and execute the contents of database-setup.sql
-- in your Supabase SQL Editor
```

### 5. Smart Contract Deployment

```bash
# Install Foundry (if not already installed)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Compile contracts
forge build

# Deploy to testnet (ensure you have testnet ETH)
forge script script/ForensicChain.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

### 6. Environment Configuration

Create `.env` file in the root directory:

```env
# Frontend Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_SEPOLIA_RPC_URL=your_sepolia_rpc_url

# Backend Configuration (in ipfs_backend/ipfs-backend/.env)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
PINATA_JWT=your_pinata_jwt_token
CONTRACT_ADDRESS=your_deployed_contract_address
SEPOLIA_RPC_URL=your_sepolia_rpc_url
SEPOLIA_PRIVATE_KEY=your_wallet_private_key
```

### 7. Start the Application

```bash
# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start IPFS backend
cd ipfs_backend/ipfs-backend
npm start

# Application will be available at http://localhost:5173
```

## 📖 Usage

### Initial Setup

1. **Connect Wallet**: Connect your MetaMask wallet to the application
2. **Bootstrap System**: First user becomes the system owner/court admin
3. **User Registration**: Create user profiles and assign roles
4. **Case Management**: Create cases from FIRs and assign team members

### Role-Specific Workflows

#### Court Officials
- Create cases from filed FIRs
- Assign roles to officers, forensic experts, and lawyers
- Seal/unseal cases as needed
- Manage system-wide settings

#### Police Officers
- File First Information Reports (FIRs)
- Submit evidence to cases
- Track investigation progress
- Collaborate with forensic teams

#### Forensic Experts
- Access and analyze submitted evidence
- Confirm evidence authenticity
- Submit forensic reports and findings
- Maintain chain of custody

#### Legal Counsel
- Review case evidence
- Access court-approved materials
- Prepare legal documentation
- Track case progression

### Evidence Management

1. **Upload Evidence**
   - Select evidence files (images, videos, documents)
   - System automatically encrypts and uploads to IPFS
   - Blockchain records evidence hash and metadata

2. **Access Evidence**
   - Request evidence access through the interface
   - System verifies permissions via smart contract
   - Evidence decrypted and made available

3. **Verify Integrity**
   - Compare evidence hashes
   - Check chain of custody
   - Validate cryptographic signatures

## 📚 API Documentation

### REST Endpoints

#### Evidence Management
```
POST   /upload              # Upload encrypted evidence
GET    /retrieve/:evidenceId # Retrieve and decrypt evidence
POST   /verify              # Verify evidence integrity
```

### Smart Contract Functions

#### Evidence Operations
```solidity
submitCaseEvidence(caseId, evidenceId, cidEncrypted, hashEncrypted, hashOriginal, encryptionKeyHash, evidenceType)
confirmCaseEvidence(caseId, index)
accessEvidence(caseId, index, keyHash)
verifyEvidence(caseId, index, providedHash)
```

#### Case Management
```solidity
createCaseFromFIR(caseId, firId, title, description, tags)
assignCaseRole(caseId, user, role)
sealCase(caseId)
closeCase(caseId)
```

#### Role Management
```solidity
setGlobalRole(user, role)
getMyRoleInCase(caseId)
getGlobalRole(user)
```

## 🔐 Smart Contract

The `ForensicChain.sol` smart contract is the core of our evidence management system, deployed on Ethereum Sepolia testnet.

### Key Features
- **Role-based access control** with enum-based permissions
- **Evidence integrity** through cryptographic hashing
- **Chain of custody** tracking with automatic audit trails
- **Case lifecycle management** from creation to closure
- **Emergency controls** with system-wide locking capabilities

### Contract Address
```
Sepolia Testnet: [Contract Address will be displayed after deployment]
```

### Roles & Permissions
- **Role.Court (1)**: Full administrative control
- **Role.Officer (2)**: FIR filing, evidence submission
- **Role.Forensic (3)**: Evidence analysis, confirmation
- **Role.Lawyer (4)**: Evidence access, review

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Follow TypeScript/ESLint configurations
- Write comprehensive tests for new features
- Document all public APIs and functions
- Ensure responsive design for UI components

### Bug Reports

Use GitHub Issues to report bugs. Include:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

## 🔒 Security

Security is paramount in forensic evidence management. Our implementation includes:

### Security Measures
- **Multi-layer encryption** for all stored evidence
- **Smart contract audits** and formal verification
- **Role-based access control** with principle of least privilege
- **Regular security assessments** and penetration testing

### Reporting Security Issues

Please report security vulnerabilities privately to [security@yourproject.com](mailto:security@yourproject.com). Do not create public issues for security vulnerabilities.

### Security Best Practices
- Keep your private keys secure and never share them
- Use hardware wallets for production deployments
- Regularly update dependencies and monitor for vulnerabilities
- Follow the principle of least privilege for role assignments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Foundry Team** for excellent smart contract development tools
- **IPFS Protocol** for decentralized storage infrastructure
- **Supabase** for backend-as-a-service platform
- **React Team** for the amazing frontend framework
- **Ethereum Foundation** for blockchain infrastructure

---

**Built with ❤️ for the justice system by [Forensic Ledger Guardian Team](https://github.com/aaravmahajanofficial)**

For questions, support, or feature requests, please [open an issue](https://github.com/aaravmahajanofficial/forensic-ledger-guardian/issues) or contact the maintainers.
