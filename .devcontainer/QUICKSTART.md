# 🚀 Quick Start Guide - Dev Container

Get started with Forensic Ledger Guardian development in under 5 minutes!

## 📦 Step 1: Prerequisites (One-time setup)

Install these on your local machine:

1. **Docker Desktop**
   - Windows/Mac: [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: Install Docker Engine and Docker Compose

2. **Visual Studio Code**
   - [Download VS Code](https://code.visualstudio.com/)

3. **Dev Containers Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "Dev Containers"
   - Install `ms-vscode-remote.remote-containers`

## 🎯 Step 2: Open in Dev Container

```bash
# Clone the repository
git clone https://github.com/aaravmahajanofficial/forensic-ledger-guardian.git
cd forensic-ledger-guardian

# Open in VS Code
code .
```

In VS Code:
1. Press `F1` (or `Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type: `Dev Containers: Reopen in Container`
3. Select it and press Enter

**Wait 5-10 minutes** for the first build (downloads Node.js, Foundry, installs dependencies)

## ⚙️ Step 3: Configure Environment

After the container starts:

1. **Edit `.env` file** (root directory)
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
   VITE_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
   ```

2. **Edit `ipfs-backend/.env` file**
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=your_service_role_key
   PINATA_JWT=your_pinata_jwt
   CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
   SEPOLIA_PRIVATE_KEY=your_private_key_without_0x
   ```

## 🎮 Step 4: Start Development

Open two terminals in VS Code (`Ctrl+Shift+` / `Cmd+Shift+`):

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Access at: http://localhost:5173

**Terminal 2 - Backend:**
```bash
cd ipfs-backend
npm start
```
Access at: http://localhost:4000

## 🔨 Step 5: Smart Contract Development

```bash
# Compile contracts
forge build

# Run tests
forge test

# Run tests with verbose output
forge test -vv

# Deploy to testnet (after configuring env vars)
forge script script/ForensicChain.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast
```

## ✅ Verify Setup

Check everything is working:

```bash
# Check Node.js
node --version
# Should show: v20.x.x

# Check npm
npm --version

# Check Foundry
forge --version
# Should show: forge 0.2.x

# Check Git
git --version
```

## 🎨 VS Code Features

Your dev container includes:
- ✨ **ESLint** - Code quality checks
- 🎨 **Prettier** - Code formatting (auto-format on save)
- 🧩 **Tailwind CSS IntelliSense** - CSS class completion
- ⚡ **Solidity support** - Smart contract development
- 📊 **GitLens** - Enhanced Git features
- 🤖 **GitHub Copilot** - AI pair programmer (if you have access)

## 🐛 Troubleshooting

### Container won't start
- Ensure Docker Desktop is running
- Check Docker has enough resources (4GB RAM minimum)
- Try: `Dev Containers: Rebuild Container`

### Port already in use
```bash
# On your host machine, find and stop processes using ports 5173 or 4000
# Windows:
netstat -ano | findstr :5173
netstat -ano | findstr :4000

# Mac/Linux:
lsof -ti:5173
lsof -ti:4000
```

### Dependencies not installing
```bash
# Manually install
npm install
cd ipfs-backend && npm install
```

### Foundry issues
```bash
# Reinstall Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

## 📚 Next Steps

1. **Read the Documentation**
   - [Main README](../README.md)
   - [DevContainer README](README.md)
   - [Contributing Guide](../CONTRIBUTING.md)

2. **Explore the Codebase**
   - Frontend: `src/` directory
   - Smart Contracts: `src/ForensicChain.sol`, `test/`, `script/`
   - Backend: `ipfs-backend/` directory

3. **Run Tests**
   ```bash
   # Frontend tests (if available)
   npm test
   
   # Smart contract tests
   forge test -vv
   ```

4. **Make Your First Change**
   - Pick an issue from GitHub
   - Create a feature branch
   - Make your changes
   - Test thoroughly
   - Submit a PR

## 💡 Pro Tips

- Use `Ctrl+`` (backtick) to toggle terminal
- Split terminals with the split icon
- Use `F1` for VS Code command palette
- Install additional extensions as needed
- Commit often, push regularly

## 🎉 You're Ready!

Your development environment is fully configured. Happy coding! 🚀

---

**Need help?** Open an issue on GitHub or check our [full documentation](README.md).
