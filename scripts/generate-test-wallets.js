#!/usr/bin/env node

/**
 * Test Wallet Generator for Forensic Ledger Guardian
 *
 * This script generates test wallet addresses that can be used
 * for role assignment testing.
 */

import { ethers } from "ethers";

function generateTestWallets(count = 4) {
  const roles = [
    "Court Official",
    "Police Officer",
    "Forensic Expert",
    "Legal Counsel",
  ];
  const wallets = [];

  console.log("🔐 Generating test wallet addresses for role assignment...\n");

  for (let i = 0; i < count; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push({
      role: roles[i] || `Role ${i + 1}`,
      address: wallet.address,
      privateKey: wallet.privateKey,
    });
  }

  return wallets;
}

function displayWallets(wallets) {
  wallets.forEach((wallet, index) => {
    console.log(`${index + 1}. ${wallet.role}`);
    console.log(`   Address: ${wallet.address}`);
    console.log(`   Private Key: ${wallet.privateKey}`);
    console.log("");
  });

  console.log("📋 Quick Copy (Addresses only):");
  wallets.forEach((wallet) => {
    console.log(`${wallet.role}: ${wallet.address}`);
  });

  console.log("\n⚠️  IMPORTANT:");
  console.log("   - These are test wallets only");
  console.log("   - Do not use for real funds");
  console.log("   - Save private keys securely for testing");
  console.log("   - Use these addresses in the bootstrap page");
}

// Generate and display test wallets
const testWallets = generateTestWallets();
displayWallets(testWallets);

export { generateTestWallets };
