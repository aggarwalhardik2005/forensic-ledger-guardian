# Security Policy

## Supported Versions

Security updates are provided for the following versions of Forensic Ledger Guardian:

| Version | Supported          |
| ------- | ------------------ |
| 0.x.x   | :white_check_mark: |

*Note: This project is in active development. All versions receive security updates.*

## Security Features

Forensic Ledger Guardian implements multiple layers of security:

### Blockchain Security
- Smart contract access controls with role-based permissions
- Immutable evidence records on Ethereum blockchain
- Multi-signature requirements for critical operations
- Emergency pause functionality for system-wide security incidents

### Data Protection
- AES-256 encryption for all stored evidence files
- Cryptographic hashing (SHA-256) for integrity verification
- Secure key management and rotation
- End-to-end encryption for sensitive communications

### Application Security
- Input validation and sanitization
- SQL injection prevention
- Cross-site scripting (XSS) protection
- Secure authentication with Supabase
- Rate limiting on API endpoints

## Reporting a Vulnerability

**DO NOT** create public GitHub issues for security vulnerabilities.

### Private Reporting

Please report security vulnerabilities privately to:
- **Email**: [Create a private vulnerability report on GitHub](https://github.com/aaravmahajanofficial/forensic-ledger-guardian/security/advisories/new)
- **Alternative**: Contact the maintainer directly via GitHub DM

### What to Include

When reporting a vulnerability, please include:

1. **Description** of the vulnerability
2. **Steps to reproduce** the issue
3. **Potential impact** assessment
4. **Suggested mitigation** (if any)
5. **Your contact information** for follow-up

### Response Timeline

- **Initial Response**: Within 48 hours
- **Vulnerability Assessment**: Within 7 days
- **Security Fix**: Critical issues within 7 days, others within 30 days
- **Public Disclosure**: After fix is deployed and tested

### Responsible Disclosure

We follow responsible disclosure practices:

1. Report received and acknowledged
2. Vulnerability investigated and validated
3. Fix developed and tested
4. Security advisory published
5. Credits given to reporter (if desired)

## Security Best Practices

### For Developers

- Keep dependencies updated
- Follow secure coding practices
- Use static analysis tools
- Conduct code reviews
- Test security controls

### For Users

- Use hardware wallets for production deployments
- Keep private keys secure and never share them
- Regularly update the application
- Monitor for suspicious activity
- Follow principle of least privilege

### For Deployments

- Use HTTPS/TLS for all communications
- Enable database encryption at rest
- Implement proper firewall rules
- Regular security audits and penetration testing
- Monitor system logs for anomalies

## Known Security Considerations

### Smart Contract Risks
- Gas limit vulnerabilities
- Reentrancy attacks (mitigated with checks-effects-interactions pattern)
- Oracle manipulation (not applicable - no external oracles used)

### IPFS Storage
- Content addressing ensures integrity
- Encryption provides confidentiality
- Access control through smart contracts

### Web3 Integration
- Private key management responsibility lies with users
- MetaMask and wallet security dependencies
- Transaction replay protection

## Security Audits

- **Smart Contract**: Awaiting professional audit
- **Application Security**: Ongoing internal reviews
- **Infrastructure**: Regular security assessments

## Compliance

This system is designed with forensic evidence handling in mind and aims to meet:
- Chain of custody requirements
- Evidence integrity standards
- Access control regulations
- Data protection requirements

---

For questions about security practices or to report non-sensitive security concerns, please open a regular GitHub issue.
