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
