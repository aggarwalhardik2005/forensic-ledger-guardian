# Forensic Ledger Guardian

A blockchain-powered digital forensics evidence management system that ensures integrity, transparency, and immutable chain of custody for forensic evidence.

## 🚀 Overview

Forensic Ledger Guardian is a comprehensive web application designed for law enforcement agencies, forensic investigators, legal professionals, and court systems. It leverages blockchain technology to create an immutable record of evidence handling, ensuring the integrity and authenticity of digital forensic evidence throughout the entire investigation and legal process.

## ✨ Key Features

### 🔐 Secure Evidence Management

- **Digital Evidence Upload**: Support for various file types including disk images, documents, photos, and multimedia files
- **Blockchain Integration**: Immutable evidence records with cryptographic hashing
- **Chain of Custody Tracking**: Complete audit trail of evidence handling
- **Multi-format Support**: Compatible with standard forensic file formats

### 👥 Role-Based Access Control

- **Police Officers**: Evidence collection and initial case management
- **Forensic Investigators**: Detailed analysis and technical documentation
- **Legal Professionals**: Case preparation and evidence review
- **Court Administrators**: System oversight and user management
- **Judges**: Evidence verification and case oversight

### 📊 Advanced Analytics

- **Case Dashboard**: Real-time case status and evidence overview
- **Activity Monitoring**: Comprehensive logging of all system interactions
- **Evidence Verification**: Cryptographic integrity checking
- **Reporting Tools**: Generate detailed case reports and evidence summaries

### 🌐 Web3 Integration

- **Wallet Connectivity**: Support for popular Web3 wallets
- **Smart Contracts**: Automated evidence verification and access control
- **IPFS Storage**: Decentralized file storage for evidence data
- **Blockchain Verification**: Real-time evidence integrity verification

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for fast development and optimized builds
- **Blockchain**: Web3 integration for decentralized evidence management
- **Storage**: IPFS for distributed file storage
- **UI Components**: Modern, accessible design system
- **Routing**: React Router for seamless navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm (recommended: install with npm)
- Web3 wallet (MetaMask recommended)

### Installation

```sh
# Clone the repository
git clone https://github.com/aaravmahajanofficial/forensic-ledger-guardian.git

# Navigate to project directory
cd forensic-ledger-guardian

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```sh
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── blockchain/      # Web3 and wallet integration
│   ├── cases/           # Case management components
│   ├── evidence/        # Evidence handling components
│   ├── court/           # Court-specific functionality
│   └── ui/              # Design system components
├── contexts/            # React context providers
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # API and external service integrations
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## 🔧 Development

### Available Scripts

```sh
# Start development server
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Run linting
npm run lint

# Preview production build
npm run preview
```

### Code Quality

- ESLint configuration for code consistency
- TypeScript for type safety
- Component-based architecture for maintainability

## 🔒 Security Features

- **Cryptographic Hashing**: SHA-256 hashing for evidence integrity
- **Digital Signatures**: Evidence authenticity verification
- **Access Control**: Role-based permissions and authentication
- **Audit Logging**: Comprehensive activity tracking
- **Blockchain Immutability**: Tamper-proof evidence records

## 📱 User Roles & Capabilities

### Police Officers

- Upload digital evidence from crime scenes
- Create and manage investigation cases
- Generate chain of custody documentation
- Access evidence verification tools

### Forensic Investigators

- Perform detailed evidence analysis
- Generate technical reports
- Manage evidence processing workflows
- Document investigation findings

### Legal Professionals

- Review case evidence and documentation
- Prepare court presentations
- Access verified evidence records
- Generate legal compliance reports

### Court Administrators

- Manage user accounts and permissions
- Oversee system configuration
- Monitor audit logs and activity
- Maintain system security standards

## 🌟 Key Benefits

- **Evidence Integrity**: Cryptographic proof of evidence authenticity
- **Transparency**: Complete audit trail visible to authorized parties
- **Efficiency**: Streamlined evidence management workflows
- **Compliance**: Meets legal standards for evidence handling
- **Scalability**: Supports organizations of all sizes
- **Accessibility**: Web-based interface accessible from anywhere

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in this repository
- Review the Help section within the application
- Check the role-specific guides for detailed instructions

## 🔮 Future Enhancements

- Enhanced mobile responsiveness
- Advanced analytics and reporting
- Integration with additional blockchain networks
- AI-powered evidence analysis tools
- Multi-language support
- Advanced search and filtering capabilities

---

Built with ❤️ for the digital forensics community
