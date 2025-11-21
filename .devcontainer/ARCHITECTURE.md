# 🏗️ Dev Container Architecture

This document explains how the dev container is structured and what happens during setup.

## 📦 Container Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Host Machine                            │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │   Docker   │  │   VS Code    │  │  Git & SSH Keys  │   │
│  │  Desktop   │  │   Desktop    │  │   (~/.ssh)       │   │
│  └────────────┘  └──────────────┘  └──────────────────┘   │
│         │                │                    │             │
└─────────┼────────────────┼────────────────────┼─────────────┘
          │                │                    │
          ▼                ▼                    ▼ (mounted)
┌─────────────────────────────────────────────────────────────┐
│              Dev Container (Docker Container)               │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Base Image: Node.js 20 LTS (Debian Bookworm)       │  │
│  │  • Node.js v20.x                                      │  │
│  │  • npm v10.x                                          │  │
│  │  • Basic Unix utilities                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│                         ▼ (Dockerfile builds)               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Additional Tools Installed                           │  │
│  │  • Foundry (forge, cast, anvil, chisel)              │  │
│  │  • Git, vim, wget, curl                               │  │
│  │  • Build tools (gcc, make, etc.)                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│                         ▼ (postCreateCommand runs)          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Project Dependencies Installed                       │  │
│  │  • Frontend: npm install                              │  │
│  │  • Backend: cd ipfs-backend && npm install            │  │
│  │  • Smart Contracts: forge install && forge build      │  │
│  │  • Environment files created from templates           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌────────────────────┐  ┌─────────────────────────────┐  │
│  │  VS Code Server    │  │  Your Workspace             │  │
│  │  • Extensions      │  │  /workspace (mounted)       │  │
│  │  • Settings        │  │  • Source code              │  │
│  │  • Terminal        │  │  • Git history              │  │
│  └────────────────────┘  │  • node_modules/            │  │
│                          │  • .env files               │  │
│                          └─────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Running Services (when started)                      │  │
│  │  • Vite Dev Server     :5173  ──┐                    │  │
│  │  • IPFS Backend Server :4000  ──┼── Port Forward     │  │
│  │  • Anvil (if started)  :8545  ──┘                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           ▼ (forwarded to host)
                   ┌───────────────────┐
                   │  localhost:5173   │ ← Frontend
                   │  localhost:4000   │ ← Backend
                   └───────────────────┘
```

## 🔄 Build & Startup Sequence

### 1️⃣ Initial Container Build (First Time Only)

```
Step 1: Docker pulls base image
  mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm
  └─→ ~700MB download

Step 2: Dockerfile execution
  ├─→ Install system packages (curl, git, build-essential, etc.)
  ├─→ Switch to 'node' user
  ├─→ Download and install Foundry
  │   └─→ Installs forge, cast, anvil, chisel
  ├─→ Configure git safe directory
  └─→ Verify installations (node, npm, forge, git)

Step 3: Container starts
  └─→ Mounts workspace directory
  └─→ Mounts SSH keys (read-only)

Step 4: postCreateCommand execution
  ├─→ npm install (frontend)
  ├─→ npm install (backend)
  ├─→ forge install (Foundry dependencies)
  ├─→ forge build (compile contracts)
  └─→ Create .env templates (if not exist)

Step 5: VS Code Server setup
  ├─→ Install configured extensions
  ├─→ Apply VS Code settings
  └─→ Setup port forwarding

Total time: ~5-10 minutes
```

### 2️⃣ Subsequent Starts (After First Build)

```
Step 1: Container starts from cached image (~5 seconds)
Step 2: Mount workspace and SSH keys (~1 second)
Step 3: VS Code Server connects (~2 seconds)
Step 4: postStartCommand runs (~1 second)
        └─→ Display welcome message

Total time: ~10 seconds
```

## 📁 File System Layout

```
Container File System:
/
├── home/
│   └── node/                      # User home directory
│       ├── .foundry/              # Foundry installation
│       │   └── bin/
│       │       ├── forge
│       │       ├── cast
│       │       ├── anvil
│       │       └── chisel
│       ├── .ssh/                  # Mounted from host (read-only)
│       ├── .gitconfig             # Git configuration
│       └── .bashrc                # Shell configuration
│
└── workspace/                     # Mounted from host (read-write)
    ├── .devcontainer/             # This directory
    ├── .git/                      # Git repository
    ├── node_modules/              # Frontend dependencies
    ├── ipfs-backend/
    │   └── node_modules/          # Backend dependencies
    ├── lib/                       # Foundry dependencies
    ├── out/                       # Compiled contracts
    ├── src/                       # Source code
    ├── .env                       # Environment variables
    └── package.json
```

## 🔌 VS Code Extensions

### Pre-installed Extensions

```
ESLint                      → Code quality
  └─→ Lints TypeScript/JavaScript files
  └─→ Auto-fixes on save

Prettier                    → Code formatting
  └─→ Formats on save
  └─→ Consistent code style

Tailwind CSS IntelliSense   → CSS utilities
  └─→ Class name completion
  └─→ Hover documentation

Solidity (2 extensions)     → Smart contracts
  └─→ Syntax highlighting
  └─→ Compilation support
  └─→ Integration with Foundry

GitLens                     → Git supercharge
  └─→ Blame annotations
  └─→ File history
  └─→ Commit graph

GitHub Copilot (optional)   → AI assistance
  └─→ Code suggestions
  └─→ Chat-based help
```

## 🌐 Network Configuration

### Port Forwarding

```
Container Port  →  Host Port  →  Access From
──────────────────────────────────────────────
    5173       →     5173     →  Browser: http://localhost:5173
    4000       →     4000     →  Browser: http://localhost:4000
    8545       →     8545     →  MetaMask: http://localhost:8545
                                 (if Anvil is running)
```

### Network Flow

```
Browser Request
      │
      ├─→ http://localhost:5173
      │         │
      │         ▼
      │   Port Forward (5173)
      │         │
      │         ▼
      │   Vite Dev Server (in container)
      │         │
      │         ├─→ Serves React app
      │         └─→ Hot Module Replacement (HMR)
      │
      └─→ http://localhost:4000/api
                │
                ▼
          Port Forward (4000)
                │
                ▼
          Express Server (in container)
                │
                ├─→ IPFS integration
                ├─→ Blockchain interaction
                └─→ Supabase queries
```

## 🔐 Security Considerations

### What's Mounted

```
✅ MOUNTED (from host):
  • Workspace directory (/workspace) - READ/WRITE
  • SSH keys (~/.ssh) - READ-ONLY
  • Git configuration - READ-ONLY

❌ NOT MOUNTED:
  • Environment variables (set in container)
  • Docker socket (not exposed)
  • Other host directories
```

### Container Isolation

```
Host Machine
  ↕ (isolated)
Container
  └─→ Runs as 'node' user (non-root)
  └─→ Limited system access
  └─→ No access to host processes
  └─→ Network isolated (except forwarded ports)
```

## ⚙️ Configuration Files

### devcontainer.json
- Defines container configuration
- Lists VS Code extensions
- Configures port forwarding
- Sets environment variables
- Defines lifecycle commands

### Dockerfile
- Specifies base image
- Installs system dependencies
- Installs development tools (Foundry)
- Sets up user environment

### post-create.sh
- Runs after container is created
- Installs project dependencies
- Builds smart contracts
- Creates environment templates

## 🔄 Update Workflow

### When to Rebuild

```
Rebuild Required:
  ✓ Changed Dockerfile
  ✓ Changed devcontainer.json extensions
  ✓ Changed base image version
  ✓ Added system dependencies

Rebuild NOT Required:
  ✗ Changed source code
  ✗ Added npm packages (just npm install)
  ✗ Changed .env files
  ✗ Updated VS Code settings (just reload)
```

### How to Rebuild

```
Method 1: Command Palette
  F1 → "Dev Containers: Rebuild Container"

Method 2: Notification
  Click "Rebuild" when prompted after config change

Method 3: Clean Rebuild
  F1 → "Dev Containers: Rebuild Container Without Cache"
  (Slower but ensures fresh build)
```

## 💡 Performance Optimization

### Build Time

```
Cached Build (subsequent starts):    ~10 seconds
Fresh Build (first time):            ~5-10 minutes
Clean Build (no cache):              ~10-15 minutes

Optimization Tips:
  • Use .dockerignore to exclude files
  • Don't rebuild unnecessarily
  • Cache node_modules in named volume (advanced)
  • Use buildkit for better caching
```

### Runtime Performance

```
Resource Usage (typical):
  CPU:    2-4 cores
  RAM:    2-4 GB
  Disk:   5-10 GB

Monitor with:
  docker stats  (from host)
  top           (in container)
```

## 🆘 Troubleshooting Architecture

### Common Issues

```
Issue: Container won't start
  ├─→ Check Docker Desktop is running
  ├─→ Check system resources (RAM, disk)
  └─→ View logs: F1 → "Dev Containers: Show Container Log"

Issue: Ports already in use
  ├─→ Check: lsof -i :5173  (or netstat on Windows)
  ├─→ Kill process or change port in devcontainer.json
  └─→ Rebuild container

Issue: Extensions not installing
  ├─→ Check internet connection
  ├─→ Check extension IDs in devcontainer.json
  └─→ Try: F1 → "Dev Containers: Rebuild Container"

Issue: Foundry not found
  ├─→ Check PATH: echo $PATH
  ├─→ Manually install: curl -L https://foundry.paradigm.xyz | bash
  └─→ Run: foundryup
```

## 📚 Related Documentation

- [devcontainer.json](devcontainer.json) - Main configuration
- [Dockerfile](Dockerfile) - Container image definition
- [post-create.sh](post-create.sh) - Setup automation
- [README.md](README.md) - User guide
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
- [TIPS.md](TIPS.md) - Tips and tricks

---

**Understanding the architecture helps you customize and troubleshoot effectively! 🚀**
