# Contributing to Forensic Ledger Guardian

We welcome contributions to the Forensic Ledger Guardian project! This document provides guidelines for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Security Considerations](#security-considerations)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn
- Git
- Foundry (for smart contract development)
- Basic understanding of:
  - React/TypeScript
  - Blockchain development
  - IPFS and decentralized storage

### Setting Up Development Environment

#### Option 1: Using Dev Containers (Recommended) 🐳

The easiest way to get started with a fully configured environment:

1. **Prerequisites:**
   - Docker Desktop
   - Visual Studio Code
   - Dev Containers extension (`ms-vscode-remote.remote-containers`)

2. **Steps:**
   - Fork and clone the repository
   - Open the folder in VS Code
   - Press `F1` → `Dev Containers: Reopen in Container`
   - Wait for setup to complete automatically
   - All dependencies, tools, and extensions are pre-installed!

3. **Learn more:** See [`.devcontainer/README.md`](.devcontainer/README.md) for details

#### Option 2: Local Setup 💻

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/forensic-ledger-guardian.git
   cd forensic-ledger-guardian
   ```
3. Install dependencies:
   ```bash
   npm install
   cd ipfs-backend && npm install
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env
   cp ipfs-backend/.env.example ipfs-backend/.env
   # Edit .env files with your configuration
   ```
5. Install Foundry:
   ```bash
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```
6. Start development servers (see README.md)

## Development Process

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Testing improvements

### Commit Message Format

Follow the conventional commits specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Testing
- `chore`: Maintenance

Example:
```
feat(evidence): add batch upload functionality

Implemented batch upload feature allowing users to upload multiple evidence files simultaneously with progress tracking.

Closes #123
```

## Pull Request Process

1. **Create a new branch** from `main`
2. **Make your changes** following the code standards
3. **Test your changes** thoroughly
4. **Update documentation** if necessary
5. **Create a pull request** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - List of breaking changes (if any)

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Closes #[issue number]
```

## Code Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Prefer functional programming patterns

### React Components

- Use functional components with hooks
- Implement proper prop typing with TypeScript
- Follow component composition patterns
- Use consistent file naming (PascalCase for components)

### Smart Contracts

- Follow Solidity style guide
- Use NatSpec documentation
- Implement comprehensive access controls
- Add events for important state changes
- Include proper error messages

### CSS/Styling

- Use Tailwind CSS utilities
- Follow responsive design principles
- Maintain consistent color schemes
- Use semantic class names

## Testing Guidelines

### Frontend Testing

- Write unit tests for utility functions
- Test React components with React Testing Library
- Include integration tests for complex workflows
- Test accessibility features

### Smart Contract Testing

- Use Foundry for contract testing
- Test all public functions
- Include edge cases and error conditions
- Test access control mechanisms
- Verify gas optimization

### Backend Testing

- Test API endpoints
- Mock external dependencies
- Test error handling
- Verify security measures

## Security Considerations

### Code Review Requirements

- All code must be reviewed by at least one maintainer
- Security-sensitive changes require additional review
- Smart contract changes must be thoroughly audited

### Security Best Practices

- Never commit private keys or secrets
- Validate all user inputs
- Use secure coding practices
- Follow principle of least privilege
- Implement proper error handling

### Reporting Security Issues

Report security vulnerabilities privately to the maintainers. Do not create public issues for security problems.

## Custom Agents

The project includes GitHub Copilot custom agents to assist with specialized development tasks:

### Available Agents

- **React Expert** (`.github/agents/react-expert.md`) - Expert in React 19.2 features, modern hooks, Server Components, Actions, and TypeScript patterns

### Using Custom Agents

When working on React frontend code, you can leverage the React Expert agent for:
- Implementing React 19.2 features (`<Activity>`, `useEffectEvent()`, `cacheSignal`)
- Using modern hooks (`use()`, `useFormStatus`, `useOptimistic`, `useActionState`)
- TypeScript integration and type-safe patterns
- Performance optimization and accessibility
- Form handling with Actions API

### Creating New Agents

If you need to add a new custom agent:
1. Create a markdown file in `.github/agents/` directory
2. Include YAML frontmatter with `description` and `tools` fields
3. Write comprehensive instructions and code examples
4. Test the agent with relevant tasks
5. Update this documentation

## Documentation

### Code Documentation

- Document all public APIs
- Include usage examples
- Update README when adding features
- Document configuration options

### Architecture Documentation

- Update architecture diagrams for structural changes
- Document data flow for new features
- Explain design decisions in comments

## Release Process

1. Update version numbers
2. Update CHANGELOG.md
3. Test all functionality
4. Create release PR
5. Tag release after merge

## Getting Help

- Check existing issues and discussions
- Ask questions in pull request comments
- Contact maintainers for guidance
- Join community discussions

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Project documentation
- Release notes

Thank you for contributing to Forensic Ledger Guardian! 🙏