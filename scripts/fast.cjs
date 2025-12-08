#!/usr/bin/env node

const readline = require("readline");
const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// ANSI color codes for terminal styling
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",

  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
};

// Role mapping
const ROLES = {
  1: { name: "Court", color: colors.magenta },
  2: { name: "Officer", color: colors.blue },
  3: { name: "Forensic Expert", color: colors.green },
  4: { name: "Lawyer", color: colors.yellow },
};

// Config file path
const CONFIG_FILE = path.join(__dirname, ".fast-config.json");

// Load saved config
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
    }
  } catch (e) {
    // Ignore errors
  }
  return {};
}

// Save config
function saveConfig(config) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (e) {
    // Ignore errors
  }
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisified question
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Clear screen
function clearScreen() {
  process.stdout.write("\x1B[2J\x1B[0f");
}

// Print styled header
function printHeader() {
  console.log("\n");
  console.log(
    `${colors.cyan}${colors.bright}╔══════════════════════════════════════════════════════════════╗${colors.reset}`,
  );
  console.log(
    `${colors.cyan}${colors.bright}║${colors.reset}                                                              ${colors.cyan}${colors.bright}║${colors.reset}`,
  );
  console.log(
    `${colors.cyan}${colors.bright}║${colors.reset}   ${colors.green}${colors.bright}🔐 FORENSIC LEDGER GUARDIAN - CLI TOOL${colors.reset}                   ${colors.cyan}${colors.bright}║${colors.reset}`,
  );
  console.log(
    `${colors.cyan}${colors.bright}║${colors.reset}   ${colors.dim}Blockchain-powered forensic evidence management${colors.reset}           ${colors.cyan}${colors.bright}║${colors.reset}`,
  );
  console.log(
    `${colors.cyan}${colors.bright}║${colors.reset}                                                              ${colors.cyan}${colors.bright}║${colors.reset}`,
  );
  console.log(
    `${colors.cyan}${colors.bright}╚══════════════════════════════════════════════════════════════╝${colors.reset}`,
  );
  console.log("\n");
}

// Print menu
function printMenu() {
  console.log(`${colors.yellow}${colors.bright}  MAIN MENU${colors.reset}`);
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
  );

  console.log(
    `  ${colors.cyan}[1]${colors.reset} ${colors.bright}🚀 Deploy Contract${colors.reset}`,
  );
  console.log(
    `      ${colors.dim}Deploy ForensicChain smart contract to Sepolia${colors.reset}\n`,
  );

  console.log(
    `  ${colors.cyan}[2]${colors.reset} ${colors.bright}👤 Assign Global Role${colors.reset}`,
  );
  console.log(
    `      ${colors.dim}Grant a role to a wallet address${colors.reset}\n`,
  );

  console.log(
    `  ${colors.cyan}[3]${colors.reset} ${colors.bright}📁 Assign Case Role${colors.reset}`,
  );
  console.log(
    `      ${colors.dim}Assign a user to a specific case${colors.reset}\n`,
  );

  console.log(
    `  ${colors.cyan}[4]${colors.reset} ${colors.bright}⚙️  Configure Settings${colors.reset}`,
  );
  console.log(
    `      ${colors.dim}Set RPC URL, Private Key, Contract Address${colors.reset}\n`,
  );

  console.log(
    `  ${colors.cyan}[5]${colors.reset} ${colors.bright}📋 View Current Config${colors.reset}`,
  );
  console.log(
    `      ${colors.dim}Display saved configuration${colors.reset}\n`,
  );

  console.log(
    `  ${colors.cyan}[6]${colors.reset} ${colors.bright}💰 Check Wallet Balance${colors.reset}`,
  );
  console.log(
    `      ${colors.dim}Get ETH balance of a wallet address${colors.reset}\n`,
  );

  console.log(
    `  ${colors.cyan}[0]${colors.reset} ${colors.bright}🚪 Exit${colors.reset}`,
  );
  console.log(`      ${colors.dim}Close the CLI tool${colors.reset}\n`);

  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
  );
}

// Print role selection
function printRoleSelection() {
  console.log(`\n${colors.yellow}  Select Role:${colors.reset}\n`);
  for (const [num, role] of Object.entries(ROLES)) {
    console.log(
      `    ${colors.cyan}[${num}]${colors.reset} ${role.color}${role.name}${colors.reset}`,
    );
  }
  console.log("");
}

// Print success message
function printSuccess(message) {
  console.log(
    `\n${colors.green}${colors.bright}  ✅ SUCCESS: ${message}${colors.reset}\n`,
  );
}

// Print error message
function printError(message) {
  console.log(
    `\n${colors.red}${colors.bright}  ❌ ERROR: ${message}${colors.reset}\n`,
  );
}

// Print info message
function printInfo(message) {
  console.log(`\n${colors.blue}  ℹ️  ${message}${colors.reset}`);
}

// Print warning message
function printWarning(message) {
  console.log(`\n${colors.yellow}  ⚠️  ${message}${colors.reset}`);
}

// Spinner for loading
function createSpinner(text) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(
      `\r${colors.cyan}  ${frames[i]} ${text}${colors.reset}`,
    );
    i = (i + 1) % frames.length;
  }, 80);

  return {
    stop: (success = true, message = "") => {
      clearInterval(interval);
      if (success) {
        process.stdout.write(
          `\r${colors.green}  ✓ ${message || text}${colors.reset}\n`,
        );
      } else {
        process.stdout.write(
          `\r${colors.red}  ✗ ${message || text}${colors.reset}\n`,
        );
      }
    },
  };
}

// Execute command with real-time output
function executeCommand(command, showOutput = true) {
  return new Promise((resolve, reject) => {
    if (showOutput) {
      console.log(`\n${colors.dim}  Executing: ${command}${colors.reset}\n`);
      console.log(
        `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
      );
    }

    try {
      const result = execSync(command, {
        encoding: "utf8",
        stdio: showOutput ? "inherit" : "pipe",
        cwd: path.join(__dirname, ".."),
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

// Get or prompt for config value
async function getConfigValue(config, key, promptText, isSecret = false) {
  if (config[key]) {
    const displayValue = isSecret
      ? `${config[key].substring(0, 6)}...${config[key].substring(
          config[key].length - 4,
        )}`
      : config[key];

    const useExisting = await question(
      `  ${colors.dim}Use saved ${key}? (${displayValue})${colors.reset} [Y/n]: `,
    );

    if (useExisting.toLowerCase() !== "n") {
      return config[key];
    }
  }

  const value = await question(
    `  ${colors.cyan}${promptText}:${colors.reset} `,
  );
  return value;
}

// Validate Ethereum address
function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Deploy contract
async function deployContract() {
  clearScreen();
  printHeader();

  console.log(
    `${colors.yellow}${colors.bright}  🚀 DEPLOY CONTRACT${colors.reset}`,
  );
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
  );

  const config = loadConfig();

  printInfo(
    "This will deploy the ForensicChain contract to Sepolia testnet.\n",
  );

  // Get RPC URL
  const rpcUrl = await getConfigValue(
    config,
    "rpcUrl",
    "Enter Sepolia RPC URL (e.g., https://sepolia.infura.io/v3/YOUR_KEY)",
  );

  if (!rpcUrl) {
    printError("RPC URL is required");
    return;
  }

  // Get Private Key
  const privateKey = await getConfigValue(
    config,
    "privateKey",
    "Enter deployer private key (with 0x prefix)",
    true,
  );

  if (!privateKey) {
    printError("Private key is required");
    return;
  }

  // Save config
  config.rpcUrl = rpcUrl;
  config.privateKey = privateKey;
  saveConfig(config);

  console.log("");
  const confirm = await question(
    `  ${colors.yellow}Proceed with deployment? [y/N]:${colors.reset} `,
  );

  if (confirm.toLowerCase() !== "y") {
    printWarning("Deployment cancelled");
    return;
  }

  console.log("");
  const spinner = createSpinner("Deploying contract...");

  try {
    const command = `forge script script/ForensicChain.s.sol --rpc-url "${rpcUrl}" --broadcast --private-key "${privateKey}"`;

    spinner.stop(true, "Starting deployment...");
    await executeCommand(command);

    printSuccess("Contract deployed successfully!");
    printInfo(
      "Copy the deployed contract address and save it using option [4]",
    );
  } catch (error) {
    printError(`Deployment failed: ${error.message}`);
  }

  await question(`\n  ${colors.dim}Press Enter to continue...${colors.reset}`);
}

// Assign global role
async function assignGlobalRole() {
  clearScreen();
  printHeader();

  console.log(
    `${colors.yellow}${colors.bright}  👤 ASSIGN GLOBAL ROLE${colors.reset}`,
  );
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
  );

  const config = loadConfig();

  // Get Contract Address
  const contractAddress = await getConfigValue(
    config,
    "contractAddress",
    "Enter Contract Address",
  );

  if (!isValidAddress(contractAddress)) {
    printError("Invalid contract address format");
    return;
  }

  // Get RPC URL
  const rpcUrl = await getConfigValue(
    config,
    "rpcUrl",
    "Enter Sepolia RPC URL",
  );

  if (!rpcUrl) {
    printError("RPC URL is required");
    return;
  }

  // Get Private Key
  const privateKey = await getConfigValue(
    config,
    "privateKey",
    "Enter admin private key (with 0x prefix)",
    true,
  );

  if (!privateKey) {
    printError("Private key is required");
    return;
  }

  // Get wallet address to assign role to
  console.log("");
  const walletAddress = await question(
    `  ${colors.cyan}Enter wallet address to assign role to:${colors.reset} `,
  );

  if (!isValidAddress(walletAddress)) {
    printError("Invalid wallet address format");
    return;
  }

  // Select role
  printRoleSelection();
  const roleNum = await question(
    `  ${colors.cyan}Enter role number (1-4):${colors.reset} `,
  );

  if (!["1", "2", "3", "4"].includes(roleNum)) {
    printError("Invalid role number. Must be 1, 2, 3, or 4");
    return;
  }

  const selectedRole = ROLES[roleNum];

  // Save config
  config.contractAddress = contractAddress;
  config.rpcUrl = rpcUrl;
  config.privateKey = privateKey;
  saveConfig(config);

  console.log("");
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}`,
  );
  console.log(`  ${colors.bright}Summary:${colors.reset}`);
  console.log(`    Contract: ${colors.cyan}${contractAddress}${colors.reset}`);
  console.log(`    Wallet:   ${colors.cyan}${walletAddress}${colors.reset}`);
  console.log(
    `    Role:     ${selectedRole.color}${selectedRole.name} (${roleNum})${colors.reset}`,
  );
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}`,
  );

  const confirm = await question(
    `\n  ${colors.yellow}Proceed with role assignment? [y/N]:${colors.reset} `,
  );

  if (confirm.toLowerCase() !== "y") {
    printWarning("Role assignment cancelled");
    return;
  }

  try {
    const command = `cast send "${contractAddress}" "setGlobalRole(address,uint8)" "${walletAddress}" ${roleNum} --rpc-url "${rpcUrl}" --private-key "${privateKey}"`;

    console.log("");
    await executeCommand(command);

    printSuccess(`Role "${selectedRole.name}" assigned to ${walletAddress}`);
  } catch (error) {
    printError(`Role assignment failed: ${error.message}`);
  }

  await question(`\n  ${colors.dim}Press Enter to continue...${colors.reset}`);
}

// Assign case role
async function assignCaseRole() {
  clearScreen();
  printHeader();

  console.log(
    `${colors.yellow}${colors.bright}  📁 ASSIGN CASE ROLE${colors.reset}`,
  );
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
  );

  const config = loadConfig();

  // Get Contract Address
  const contractAddress = await getConfigValue(
    config,
    "contractAddress",
    "Enter Contract Address",
  );

  if (!isValidAddress(contractAddress)) {
    printError("Invalid contract address format");
    return;
  }

  // Get RPC URL
  const rpcUrl = await getConfigValue(
    config,
    "rpcUrl",
    "Enter Sepolia RPC URL",
  );

  if (!rpcUrl) {
    printError("RPC URL is required");
    return;
  }

  // Get Private Key
  const privateKey = await getConfigValue(
    config,
    "privateKey",
    "Enter admin private key (with 0x prefix)",
    true,
  );

  if (!privateKey) {
    printError("Private key is required");
    return;
  }

  // Get case number
  console.log("");
  const caseNo = await question(
    `  ${colors.cyan}Enter Case Number/ID:${colors.reset} `,
  );

  if (!caseNo) {
    printError("Case number is required");
    return;
  }

  // Get wallet address to assign case to
  const walletAddress = await question(
    `  ${colors.cyan}Enter wallet address to assign case to:${colors.reset} `,
  );

  if (!isValidAddress(walletAddress)) {
    printError("Invalid wallet address format");
    return;
  }

  // Select role
  printRoleSelection();
  const roleNum = await question(
    `  ${colors.cyan}Enter role number (1-4):${colors.reset} `,
  );

  if (!["1", "2", "3", "4"].includes(roleNum)) {
    printError("Invalid role number. Must be 1, 2, 3, or 4");
    return;
  }

  const selectedRole = ROLES[roleNum];

  // Save config
  config.contractAddress = contractAddress;
  config.rpcUrl = rpcUrl;
  config.privateKey = privateKey;
  saveConfig(config);

  console.log("");
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}`,
  );
  console.log(`  ${colors.bright}Summary:${colors.reset}`);
  console.log(`    Contract: ${colors.cyan}${contractAddress}${colors.reset}`);
  console.log(`    Case:     ${colors.cyan}${caseNo}${colors.reset}`);
  console.log(`    Wallet:   ${colors.cyan}${walletAddress}${colors.reset}`);
  console.log(
    `    Role:     ${selectedRole.color}${selectedRole.name} (${roleNum})${colors.reset}`,
  );
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}`,
  );

  const confirm = await question(
    `\n  ${colors.yellow}Proceed with case assignment? [y/N]:${colors.reset} `,
  );

  if (confirm.toLowerCase() !== "y") {
    printWarning("Case assignment cancelled");
    return;
  }

  try {
    const command = `cast send "${contractAddress}" "assignCaseRole(string,address,uint8)" "${caseNo}" "${walletAddress}" ${roleNum} --rpc-url "${rpcUrl}" --private-key "${privateKey}"`;

    console.log("");
    await executeCommand(command);

    printSuccess(
      `Case "${caseNo}" assigned to ${walletAddress} as ${selectedRole.name}`,
    );
  } catch (error) {
    printError(`Case assignment failed: ${error.message}`);
  }

  await question(`\n  ${colors.dim}Press Enter to continue...${colors.reset}`);
}

// Configure settings
async function configureSettings() {
  clearScreen();
  printHeader();

  console.log(
    `${colors.yellow}${colors.bright}  ⚙️  CONFIGURE SETTINGS${colors.reset}`,
  );
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
  );

  const config = loadConfig();

  printInfo("Enter new values or press Enter to keep existing.\n");

  // RPC URL
  const currentRpc = config.rpcUrl
    ? `${config.rpcUrl.substring(0, 30)}...`
    : "not set";
  console.log(`  ${colors.dim}Current RPC URL: ${currentRpc}${colors.reset}`);
  const rpcUrl = await question(
    `  ${colors.cyan}New Sepolia RPC URL:${colors.reset} `,
  );
  if (rpcUrl) config.rpcUrl = rpcUrl;

  console.log("");

  // Private Key
  const currentKey = config.privateKey
    ? `${config.privateKey.substring(0, 6)}...${config.privateKey.substring(
        config.privateKey.length - 4,
      )}`
    : "not set";
  console.log(
    `  ${colors.dim}Current Private Key: ${currentKey}${colors.reset}`,
  );
  const privateKey = await question(
    `  ${colors.cyan}New Private Key:${colors.reset} `,
  );
  if (privateKey) config.privateKey = privateKey;

  console.log("");

  // Contract Address
  const currentContract = config.contractAddress || "not set";
  console.log(
    `  ${colors.dim}Current Contract Address: ${currentContract}${colors.reset}`,
  );
  const contractAddress = await question(
    `  ${colors.cyan}New Contract Address:${colors.reset} `,
  );
  if (contractAddress) {
    if (isValidAddress(contractAddress)) {
      config.contractAddress = contractAddress;
    } else {
      printWarning("Invalid contract address format, not saved");
    }
  }

  saveConfig(config);
  printSuccess("Configuration saved!");

  await question(`\n  ${colors.dim}Press Enter to continue...${colors.reset}`);
}

// View current config
async function viewConfig() {
  clearScreen();
  printHeader();

  console.log(
    `${colors.yellow}${colors.bright}  📋 CURRENT CONFIGURATION${colors.reset}`,
  );
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
  );

  const config = loadConfig();

  const rpcDisplay = config.rpcUrl || `${colors.dim}not set${colors.reset}`;
  const keyDisplay = config.privateKey
    ? `${config.privateKey.substring(0, 6)}...${config.privateKey.substring(
        config.privateKey.length - 4,
      )}`
    : `${colors.dim}not set${colors.reset}`;
  const contractDisplay =
    config.contractAddress || `${colors.dim}not set${colors.reset}`;

  console.log(`  ${colors.bright}RPC URL:${colors.reset}`);
  console.log(`    ${colors.cyan}${rpcDisplay}${colors.reset}\n`);

  console.log(`  ${colors.bright}Private Key:${colors.reset}`);
  console.log(`    ${colors.cyan}${keyDisplay}${colors.reset}\n`);

  console.log(`  ${colors.bright}Contract Address:${colors.reset}`);
  console.log(`    ${colors.cyan}${contractDisplay}${colors.reset}\n`);

  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}`,
  );
  console.log(`  ${colors.dim}Config file: ${CONFIG_FILE}${colors.reset}\n`);

  await question(`  ${colors.dim}Press Enter to continue...${colors.reset}`);
}

// Check wallet balance
async function checkBalance() {
  clearScreen();
  printHeader();

  console.log(
    `${colors.yellow}${colors.bright}  💰 CHECK WALLET BALANCE${colors.reset}`,
  );
  console.log(
    `${colors.dim}  ─────────────────────────────────────────${colors.reset}\n`,
  );

  const config = loadConfig();

  // Get RPC URL
  const rpcUrl = await getConfigValue(
    config,
    "rpcUrl",
    "Enter Sepolia RPC URL",
  );

  if (!rpcUrl) {
    printError("RPC URL is required");
    await question(
      `\n  ${colors.dim}Press Enter to continue...${colors.reset}`,
    );
    return;
  }

  // Save config
  config.rpcUrl = rpcUrl;
  saveConfig(config);

  // Get wallet address
  console.log("");
  const walletAddress = await question(
    `  ${colors.cyan}Enter wallet address to check balance:${colors.reset} `,
  );

  if (!isValidAddress(walletAddress)) {
    printError("Invalid wallet address format");
    await question(
      `\n  ${colors.dim}Press Enter to continue...${colors.reset}`,
    );
    return;
  }

  console.log("");
  const spinner = createSpinner("Fetching balance...");

  try {
    // Get balance in wei
    const balanceWei = execSync(
      `cast balance "${walletAddress}" --rpc-url "${rpcUrl}"`,
      { encoding: "utf8", cwd: path.join(__dirname, "..") },
    ).trim();

    // Get balance in ether
    const balanceEther = execSync(
      `cast balance "${walletAddress}" --rpc-url "${rpcUrl}" --ether`,
      { encoding: "utf8", cwd: path.join(__dirname, "..") },
    ).trim();

    spinner.stop(true, "Balance fetched successfully!");

    console.log("");
    console.log(
      `${colors.dim}  ─────────────────────────────────────────${colors.reset}`,
    );
    console.log(
      `  ${colors.bright}Wallet:${colors.reset}  ${colors.cyan}${walletAddress}${colors.reset}`,
    );
    console.log(
      `${colors.dim}  ─────────────────────────────────────────${colors.reset}`,
    );
    console.log("");
    console.log(`  ${colors.bright}Balance:${colors.reset}`);
    console.log(
      `    ${colors.green}${colors.bright}${balanceEther} ETH${colors.reset}`,
    );
    console.log(`    ${colors.dim}(${balanceWei} wei)${colors.reset}`);
    console.log("");
    console.log(
      `${colors.dim}  ─────────────────────────────────────────${colors.reset}`,
    );
  } catch (error) {
    spinner.stop(false, "Failed to fetch balance");
    printError(`Failed to fetch balance: ${error.message}`);
  }

  await question(`\n  ${colors.dim}Press Enter to continue...${colors.reset}`);
}

// Main menu loop
async function main() {
  while (true) {
    clearScreen();
    printHeader();
    printMenu();

    const choice = await question(
      `  ${colors.cyan}Enter your choice [0-6]:${colors.reset} `,
    );

    switch (choice) {
      case "1":
        await deployContract();
        break;
      case "2":
        await assignGlobalRole();
        break;
      case "3":
        await assignCaseRole();
        break;
      case "4":
        await configureSettings();
        break;
      case "5":
        await viewConfig();
        break;
      case "6":
        await checkBalance();
        break;
      case "0":
        clearScreen();
        console.log(
          `\n${colors.green}  👋 Goodbye! Stay secure.${colors.reset}\n`,
        );
        rl.close();
        process.exit(0);
      default:
        printError("Invalid choice. Please enter 0-6.");
        await question(
          `  ${colors.dim}Press Enter to continue...${colors.reset}`,
        );
    }
  }
}

// Handle Ctrl+C
process.on("SIGINT", () => {
  console.log(`\n\n${colors.green}  👋 Goodbye! Stay secure.${colors.reset}\n`);
  rl.close();
  process.exit(0);
});

// Run the CLI
main().catch((error) => {
  console.error(
    `\n${colors.red}Fatal error: ${error.message}${colors.reset}\n`,
  );
  process.exit(1);
});
