#!/bin/bash
set -e

echo "🔧 Setting up Forensic Ledger Guardian development environment..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install IPFS backend dependencies
echo "📦 Installing IPFS backend dependencies..."
cd ipfs-backend
npm install
cd ..

# Build Foundry contracts (if not built)
echo "🔨 Building smart contracts with Foundry..."
forge install 2>/dev/null || true
forge build || echo "⚠️  Warning: Forge build failed. You may need to run 'forge build' manually."

# Create .env file if it doesn't exist (for first-time setup)
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cat > .env << 'EOF'
# Frontend Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_SEPOLIA_RPC_URL=your_sepolia_rpc_url

# Note: Configure these values before running the application
EOF
    echo "⚠️  .env file created. Please update it with your configuration."
fi

# Create backend .env file if it doesn't exist
if [ ! -f ipfs-backend/.env ]; then
    echo "📝 Creating backend .env file from template..."
    cat > ipfs-backend/.env << 'EOF'
# Backend Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
PINATA_JWT=your_pinata_jwt_token
CONTRACT_ADDRESS=your_deployed_contract_address
SEPOLIA_RPC_URL=your_sepolia_rpc_url
SEPOLIA_PRIVATE_KEY=your_wallet_private_key

# Note: Configure these values before running the backend
EOF
    echo "⚠️  Backend .env file created. Please update it with your configuration."
fi

echo "✅ Development environment setup complete!"
echo ""
echo "🚀 Next steps:"
echo "  1. Update .env files with your configuration"
echo "  2. Run 'npm run dev' to start the frontend"
echo "  3. Run 'cd ipfs-backend && npm start' to start the backend"
echo "  4. Connect your MetaMask wallet to Sepolia testnet"
echo ""
echo "📚 For more information, see README.md"
