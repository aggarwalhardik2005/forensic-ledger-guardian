# Debug: Contract Not Initialized Error

## Problem

You're getting "contract not initialized" error in the console, which means the Web3 service can't establish a connection to your smart contract.

## Root Causes & Solutions

### 1. **Wallet Not Connected**

**Symptoms:** Contract shows as not initialized
**Solution:**

- Look for a "Connect Wallet" button on your UI
- Click it and approve the MetaMask connection
- **New Improved Flow:** The system now auto-attempts wallet connection when testing contract

### 2. **Wrong Network**

**Symptoms:** Contract connection test fails even after wallet is connected
**Solution:**

- Check your MetaMask network (should match where contract is deployed)
- Common networks: Local Hardhat (31337), Sepolia (11155111), etc.
- **New Debug Info:** Check console for network details

### 3. **Contract Not Deployed**

**Symptoms:** Network is correct but contract calls fail
**Solution:**

- Verify the contract is deployed to the current network
- Check the contract address in `src/services/web3Service.ts`:
  ```typescript
  const CONTRACT_ADDRESS = "0x0f98bcb53ff15fdc52168573c36436cf21a1466a";
  ```

### 4. **Provider Issues**

**Symptoms:** MetaMask not detected or provider errors
**Solution:**

- Ensure MetaMask is installed and unlocked
- Refresh the page
- Check browser console for MetaMask errors

## New Debugging Features Added

### Enhanced Console Logging

The system now provides detailed logs:

```
Web3Context: Checking existing connection...
Testing contract connection...
Contract exists: Yes/No
Account connected: 0x... or No
Provider available: Yes/No
Calling contract method isSystemLocked...
Contract connection test successful. System locked: false
```

### Automatic Diagnostics

When contract connection fails, you'll see:

```
Diagnostic Information:
Network: {chainId: 31337, name: "unknown"}
Contract Address: 0x0f98bcb53ff15fdc52168573c36436cf21a1466a
```

### Auto-Recovery Features

- **Auto-Connect:** If contract not initialized, system attempts wallet connection
- **Re-initialization:** Contract re-initializes when wallet connects
- **Better Error Messages:** Specific error messages for common issues

## Step-by-Step Debugging

### Step 1: Open Browser Console

Open Developer Tools (F12) → Console tab

### Step 2: Check Initial Connection

Look for these logs when page loads:

- `Web3Context: Checking existing connection...`
- `Testing contract connection...`

### Step 3: Connect Wallet (if needed)

If you see "Contract not initialized":

1. Click "Connect Wallet" button
2. Approve MetaMask connection
3. Watch for success logs

### Step 4: Verify Network

Check console output for:

```
Network: {chainId: XXXXX, name: "..."}
Contract Address: 0x...
```

Ensure chainId matches your deployment network.

### Step 5: Test Contract Call

Look for:

```
Calling contract method isSystemLocked...
Contract connection test successful. System locked: false
```

## Common Error Messages & Solutions

| Error Message                | Cause                 | Solution                |
| ---------------------------- | --------------------- | ----------------------- |
| "Contract not initialized"   | Wallet not connected  | Click "Connect Wallet"  |
| "Provider not initialized"   | MetaMask not detected | Install/unlock MetaMask |
| "Network error"              | Wrong network         | Switch MetaMask network |
| "Contract reverted"          | Contract not deployed | Check contract address  |
| "User denied account access" | Connection rejected   | Approve in MetaMask     |

## Quick Fixes

### Fix 1: Force Reconnection

```javascript
// In browser console:
web3Service.connectWallet().then(console.log);
```

### Fix 2: Check Contract Address

```javascript
// In browser console:
console.log("Contract Address:", web3Service.getContractAddress());
```

### Fix 3: Check Network

```javascript
// In browser console:
web3Service.getNetworkInfo().then(console.log);
```

## Manual Testing Script

Run this in browser console to test connection manually:

```javascript
// Test full connection flow
async function debugConnection() {
  console.log("=== Web3 Connection Debug ===");

  // 1. Check initial state
  console.log("Contract Address:", web3Service.getContractAddress());

  // 2. Get network info
  const network = await web3Service.getNetworkInfo();
  console.log("Network:", network);

  // 3. Test contract connection
  const connected = await web3Service.testContractConnection();
  console.log("Contract Connected:", connected);

  // 4. Get account
  const account = await web3Service.getCurrentAccount();
  console.log("Account:", account);

  // 5. Get role
  const role = await web3Service.getUserRole();
  console.log("Role:", web3Service.getRoleString(role));

  console.log("=== Debug Complete ===");
}

debugConnection();
```

The improved implementation should now automatically handle most connection issues and provide clear feedback about what's failing.
