# 💡 Dev Container Tips & Tricks

## 🚀 Productivity Tips

### Terminal Management
- **Open new terminal**: `` Ctrl+Shift+` `` (Windows/Linux) or `` Cmd+Shift+` `` (Mac)
- **Toggle terminal**: `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac)
- **Split terminal**: Click the split icon in terminal panel
- **Kill terminal**: Click trash can icon

### VS Code Shortcuts
- **Command Palette**: `F1` or `Ctrl+Shift+P` / `Cmd+Shift+P`
- **Quick Open File**: `Ctrl+P` / `Cmd+P`
- **Go to Symbol**: `Ctrl+Shift+O` / `Cmd+Shift+O`
- **Find in Files**: `Ctrl+Shift+F` / `Cmd+Shift+F`
- **Toggle Sidebar**: `Ctrl+B` / `Cmd+B`

### Dev Container Commands
Access via `F1` then type:
- `Dev Containers: Rebuild Container` - Rebuild after config changes
- `Dev Containers: Reopen Locally` - Exit container and reopen locally
- `Dev Containers: Show Container Log` - Debug container issues
- `Dev Containers: Open Container Configuration` - Quick access to config

## 🔧 Common Workflows

### Starting Fresh Dev Session
```bash
# Terminal 1: Frontend with auto-reload
npm run dev

# Terminal 2: Backend server
cd ipfs-backend && npm start

# Terminal 3: Keep for ad-hoc commands
# Available for git, forge, testing, etc.
```

### Smart Contract Development
```bash
# Watch and rebuild on changes (create a script if needed)
forge test --watch

# Test specific contract
forge test --match-contract ForensicChainTest

# Test specific function
forge test --match-test testFileFIR

# Gas report
forge test --gas-report

# Coverage
forge coverage
```

### Code Quality
```bash
# Lint and auto-fix
npm run lint

# Format Solidity files
forge fmt

# Check TypeScript
npx tsc --noEmit
```

## 🐛 Debugging

### Frontend Debugging
1. Open Chrome DevTools in browser
2. Or use VS Code debugger:
   - Set breakpoints in code
   - Press `F5` or use Debug panel
   - Select "Chrome: Launch" configuration

### Backend Debugging
1. Add to `ipfs-backend/package.json`:
   ```json
   "debug": "node --inspect backend.js"
   ```
2. Run: `npm run debug`
3. In VS Code: `F5` → "Attach to Node Process"

### Smart Contract Debugging
```bash
# Very verbose test output
forge test -vvvv

# Debug specific test
forge test --debug testFunctionName

# Use console.log in Solidity
import "forge-std/console.sol";
console.log("Debug:", variable);
```

## 📦 Package Management

### Adding Dependencies
```bash
# Frontend
npm install package-name

# Backend
cd ipfs-backend && npm install package-name

# Solidity (Foundry)
forge install owner/repo
```

### Updating Dependencies
```bash
# Update all packages
npm update

# Update specific package
npm install package-name@latest

# Update Foundry
foundryup
```

## 🎨 Customization

### Add VS Code Extensions
Edit `.devcontainer/devcontainer.json`:
```json
"extensions": [
  "existing.extension",
  "your.new-extension"
]
```
Then rebuild container.

### Change Node Version
Edit `.devcontainer/Dockerfile`:
```dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm
# Change 20 to desired version
```

### Add System Packages
Edit `.devcontainer/Dockerfile`:
```dockerfile
RUN apt-get update && apt-get install -y \
    your-package-name \
    && apt-get clean
```

## 🔐 Environment Management

### Multiple Environments
```bash
# Development
cp .env.example .env.development
npm run dev

# Staging
cp .env.example .env.staging

# Use dotenv-cli for switching
npm install -g dotenv-cli
dotenv -e .env.staging -- npm run dev
```

### Secrets Management
- **Never commit** `.env` files
- Use environment-specific files: `.env.local`, `.env.development`
- For team: Use encrypted secret management (e.g., Doppler, AWS Secrets)

## 🌐 Network Testing

### Test Different Networks
```bash
# Localhost (Anvil)
anvil  # Start local node
# Update .env to use localhost RPC

# Sepolia Testnet
# Update .env with Sepolia RPC URL

# Get test ETH
# Visit: https://sepoliafaucet.com/
```

### Test Backend Endpoints
```bash
# Using curl
curl http://localhost:4000/health

# Using HTTPie (prettier output)
http localhost:4000/health

# Using VS Code REST Client extension
# Create .http files with requests
```

## 📊 Performance Monitoring

### Check Resource Usage
```bash
# Inside container
top
htop  # If installed

# Docker stats (from host)
docker stats
```

### Optimize Build Times
- Use `.dockerignore` to exclude unnecessary files
- Cache dependencies in Dockerfile layers
- Use `npm ci` instead of `npm install` in production

## 🔄 Git Workflow in Container

### SSH Keys
SSH keys are automatically mounted from your host machine.

### Configure Git (if needed)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Useful Aliases
```bash
# Add to ~/.bashrc or ~/.zshrc in container
alias gs='git status'
alias gp='git pull'
alias gc='git commit'
alias gco='git checkout'
alias gl='git log --oneline --graph'
```

## 🚑 Emergency Fixes

### Container Won't Start
```bash
# From host machine
docker ps -a  # List all containers
docker logs <container-id>  # Check logs
docker system prune  # Clean up (careful!)
```

### Reset Everything
```bash
# Exit container
# Delete .devcontainer cache
rm -rf .devcontainer/.cache

# Rebuild from scratch
# F1 → Dev Containers: Rebuild Container Without Cache
```

### Port Conflicts
```bash
# Change ports in devcontainer.json
"forwardPorts": [3000, 8080],  # Use different ports

# Or find and kill process on host
# Windows:
netstat -ano | findstr :5173
taskkill /PID <pid> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

## 📚 Learning Resources

### Recommended Reading
- [VS Code Dev Containers Docs](https://code.visualstudio.com/docs/devcontainers/containers)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Foundry Book](https://book.getfoundry.sh/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

### Video Tutorials
- Search: "VS Code Dev Containers Tutorial"
- Search: "Foundry Ethereum Development"
- Search: "React TypeScript Best Practices"

## 🤝 Team Collaboration

### Sharing Container Config
- Commit `.devcontainer/` directory
- Document any manual setup steps in README
- Use `postCreateCommand` for automation

### Onboarding New Developers
1. Share repository link
2. Have them install Docker + VS Code + Dev Containers extension
3. Clone and reopen in container
4. They're ready to code! 🎉

---

**Pro Tip**: Bookmark this file for quick reference! 📖
