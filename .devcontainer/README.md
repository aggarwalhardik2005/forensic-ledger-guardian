# Forensic Ledger Guardian - Dev Container

This directory contains the configuration for developing Forensic Ledger Guardian using Visual Studio Code Dev Containers.

## 🎯 What's Included

The dev container provides a complete development environment with:

- **Node.js 20 LTS** - JavaScript runtime for frontend and backend
- **Foundry** - Complete Ethereum development toolkit (forge, cast, anvil, chisel)
- **Git & GitHub CLI** - Version control and GitHub integration
- **VS Code Extensions** - Pre-configured extensions for TypeScript, React, Solidity, and more

## 🚀 Getting Started

### Prerequisites

1. **Docker Desktop** - [Download and install Docker Desktop](https://www.docker.com/products/docker-desktop)
2. **Visual Studio Code** - [Download VS Code](https://code.visualstudio.com/)
3. **Dev Containers Extension** - Install from VS Code marketplace: `ms-vscode-remote.remote-containers`

### Quick Start

1. **Open the repository in VS Code**
   ```bash
   git clone https://github.com/aaravmahajanofficial/forensic-ledger-guardian.git
   cd forensic-ledger-guardian
   code .
   ```

2. **Reopen in Container**
   - Press `F1` or `Ctrl+Shift+P` (Windows/Linux) / `Cmd+Shift+P` (Mac)
   - Type "Dev Containers: Reopen in Container"
   - Select it and wait for the container to build

3. **Wait for Setup**
   - The container will build and install all dependencies automatically
   - This may take 5-10 minutes on first run
   - Watch the output in the VS Code terminal

4. **Configure Environment Variables**
   - Edit `.env` in the root directory
   - Edit `ipfs-backend/.env` for backend configuration
   - See README.md for detailed configuration instructions

5. **Start Development**
   ```bash
   # Terminal 1: Start frontend
   npm run dev
   
   # Terminal 2: Start backend
   cd ipfs-backend
   npm start
   ```

## 📦 What Gets Installed

### Automatic Installation

The `postCreateCommand` automatically runs after container creation:
- Frontend npm dependencies
- Backend npm dependencies
- Foundry dependencies (`forge install`)
- Smart contract compilation (`forge build`)
- Environment file templates

### VS Code Extensions

Pre-installed extensions include:
- **ESLint & Prettier** - Code quality and formatting
- **Tailwind CSS IntelliSense** - CSS utility class completion
- **Solidity** - Smart contract development support
- **GitLens** - Enhanced Git integration
- **Path IntelliSense** - File path autocomplete
- **GitHub Copilot** - AI-powered code suggestions (if you have access)

## 🔧 Configuration

### Ports

The following ports are automatically forwarded:
- **5173** - Vite development server (frontend)
- **4000** - IPFS backend server

You can access these at:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

### Environment Variables

Template `.env` files are created automatically. Update them with your credentials:

**Root `.env`:**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_SEPOLIA_RPC_URL=your_sepolia_rpc_url
```

**`ipfs-backend/.env`:**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
PINATA_JWT=your_pinata_jwt_token
CONTRACT_ADDRESS=your_deployed_contract_address
SEPOLIA_RPC_URL=your_sepolia_rpc_url
SEPOLIA_PRIVATE_KEY=your_wallet_private_key
```

## 🛠️ Development Tasks

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend Development
```bash
cd ipfs-backend
npm start            # Start backend server
```

### Smart Contract Development
```bash
forge build          # Compile contracts
forge test           # Run tests
forge test -vv       # Run tests with verbose output
forge fmt            # Format Solidity code
forge coverage       # Generate coverage report

# Deploy to testnet
forge script script/ForensicChain.s.sol \
  --rpc-url $SEPOLIA_RPC_URL \
  --broadcast
```

## 🐛 Troubleshooting

### Container Build Fails
- Ensure Docker Desktop is running
- Check Docker has sufficient resources (4GB RAM minimum recommended)
- Try rebuilding: `Dev Containers: Rebuild Container`

### Foundry Installation Issues
- Open a terminal in the container
- Run: `curl -L https://foundry.paradigm.xyz | bash && foundryup`

### Port Already in Use
- Stop any local services using ports 5173 or 4000
- Or modify the ports in `devcontainer.json`

### Dependencies Not Installing
- Open a terminal in the container
- Manually run: `npm install` and `cd ipfs-backend && npm install`

### Permission Issues
- The container runs as `node` user (non-root)
- If you need root access: `sudo su`

## 🔄 Updating the Dev Container

After modifying devcontainer configuration:
1. Press `F1` → `Dev Containers: Rebuild Container`
2. Or click the "Rebuild Container" button when prompted

## 📚 Additional Resources

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Foundry Documentation](https://book.getfoundry.sh/)
- [Project README](../README.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

## 🤝 Contributing

When modifying the dev container configuration:
1. Test the changes thoroughly
2. Update this README if needed
3. Document any new dependencies or steps
4. Ensure backward compatibility when possible

## 💡 Tips

- Use integrated terminal in VS Code for all commands
- All ports are automatically forwarded - no manual port mapping needed
- SSH keys are mounted from your host machine for Git operations
- The workspace is mounted at `/workspace` in the container
- Use `Ctrl+Shift+P` to access Dev Container commands

---

**Happy Coding! 🚀**
