import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import web3Service, { Role } from "@/services/web3Service";
import { toast } from "@/hooks/use-toast";
import { ethers } from "ethers";

interface NetworkInfo {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  userRole: Role;
  connecting: boolean;
  balance: string;
  chainId: string | null;
  networkName: string;
  isCorrectNetwork: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkRoleAccess: (requiredRole: Role) => boolean;
  switchNetwork: (targetChainId: string) => Promise<void>;
  refreshBalance: () => Promise<void>;
  addNetwork: (network: NetworkInfo) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// Network configurations
const SUPPORTED_NETWORKS: Record<string, NetworkInfo> = {
  "0x1": {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io/"],
  },
  "0xaa36a7": {
    chainId: "0xaa36a7",
    chainName: "Sepolia Testnet",
    nativeCurrency: { name: "Sepolia Ether", symbol: "SEP", decimals: 18 },
    rpcUrls: ["https://sepolia.infura.io/v3/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io/"],
  },
  "0x7a69": {
    chainId: "0x7a69",
    chainName: "Anvil Local",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: ["http://127.0.0.1:8545"],
    blockExplorerUrls: [""],
  },
};

// Expected network for the contract deployment
const EXPECTED_CHAIN_ID = "0xaa36a7"; // Sepolia testnet

export const Web3Provider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<Role>(Role.None);
  const [connecting, setConnecting] = useState(false);
  const [balance, setBalance] = useState("0.0");
  const [chainId, setChainId] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState("Unknown");
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  // Get network info from chain ID
  const getNetworkInfo = useCallback((chainId: string): NetworkInfo | null => {
    return SUPPORTED_NETWORKS[chainId] || null;
  }, []);

  // Update network information
  const updateNetworkInfo = useCallback(
    (chainId: string) => {
      setChainId(chainId);
      const networkInfo = getNetworkInfo(chainId);
      setNetworkName(networkInfo?.chainName || "Unknown Network");
      setIsCorrectNetwork(chainId === EXPECTED_CHAIN_ID);
    },
    [getNetworkInfo]
  );

  // Fetch wallet balance
  const refreshBalance = useCallback(async () => {
    if (!account || !window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance("0.0");
    }
  }, [account]);

  // Handle account changes
  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
      setIsConnected(false);
      setUserRole(Role.None);
      setBalance("0.0");
      console.log("Web3Context: Account disconnected");
    } else {
      setAccount(accounts[0]);
      setIsConnected(true);
      // Update role when account changes
      web3Service.getUserRole().then(setUserRole);
      console.log("Web3Context: Account changed to:", accounts[0]);
    }
  }, []);

  // Handle network changes
  const handleChainChanged = useCallback(
    (chainId: string) => {
      console.log("Web3Context: Network changed to:", chainId);
      updateNetworkInfo(chainId);

      if (chainId !== EXPECTED_CHAIN_ID) {
        toast({
          title: "Network Warning",
          description: `You're connected to an unsupported network. Please switch to Sepolia testnet.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Network Connected",
          description: "Connected to supported network.",
        });
      }
    },
    [updateNetworkInfo]
  );

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      console.log("Web3Context: Checking existing connection...");

      if (!window.ethereum) {
        console.log("Web3Context: No MetaMask detected");
        return;
      }

      try {
        // Get current chain ID
        const currentChainId = (await window.ethereum.request({
          method: "eth_chainId",
        })) as string;
        updateNetworkInfo(currentChainId);

        // First test if contract connection works
        const contractConnected = await web3Service.testContractConnection();
        if (contractConnected) {
          const currentAccount = await web3Service.getCurrentAccount();
          if (currentAccount) {
            console.log(
              "Web3Context: Found existing connection:",
              currentAccount
            );
            setAccount(currentAccount);
            setIsConnected(true);

            // Get user role
            const role = await web3Service.getUserRole();
            console.log(
              "Web3Context: User role:",
              web3Service.getRoleString(role)
            );
            setUserRole(role);

            // Fetch balance
            refreshBalance();
          }
        } else {
          console.log("Web3Context: No existing connection found");
        }
      } catch (error) {
        console.error("Web3Context: Error checking connection:", error);
      }
    };

    checkConnection();

    // Listen for account and network changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
        window.ethereum.removeAllListeners("chainChanged");
      }
    };
  }, [
    handleAccountsChanged,
    handleChainChanged,
    updateNetworkInfo,
    refreshBalance,
  ]);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      console.log("Web3Context: Connecting wallet...");

      if (!window.ethereum) {
        throw new Error(
          "MetaMask is not installed. Please install MetaMask to continue."
        );
      }

      if (!window.ethereum.isMetaMask) {
        throw new Error("Please use MetaMask to connect your wallet.");
      }

      // Check current network first
      const currentChainId = (await window.ethereum.request({
        method: "eth_chainId",
      })) as string;

      updateNetworkInfo(currentChainId);

      // Connect to wallet
      const account = await web3Service.connectWallet();
      if (account) {
        console.log("Web3Context: Wallet connected successfully:", account);
        setAccount(account);
        setIsConnected(true);

        // Get user role
        const role = await web3Service.getUserRole();
        console.log(
          "Web3Context: User role after connection:",
          web3Service.getRoleString(role)
        );
        setUserRole(role);

        // Fetch balance
        await refreshBalance();

        toast({
          title: "Wallet Connected",
          description: `Connected to account ${account.substring(
            0,
            6
          )}...${account.substring(account.length - 4)}`,
        });

        // Warn if on wrong network
        if (currentChainId !== EXPECTED_CHAIN_ID) {
          toast({
            title: "Network Warning",
            description:
              "You're on an unsupported network. Please switch to Sepolia testnet.",
            variant: "destructive",
          });
        }
      } else {
        console.error("Web3Context: Failed to get account after connection");
        throw new Error("Failed to get account");
      }
    } catch (error) {
      console.error("Web3Context: Failed to connect wallet:", error);
      const message =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Connection Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setUserRole(Role.None);
    setBalance("0.0");
    setChainId(null);
    setNetworkName("Unknown");
    setIsCorrectNetwork(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  // Switch to specific network
  const switchNetwork = async (targetChainId: string) => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetChainId }],
      });
    } catch (switchError: unknown) {
      // This error code indicates that the chain has not been added to MetaMask
      if (
        switchError &&
        typeof switchError === "object" &&
        "code" in switchError &&
        switchError.code === 4902
      ) {
        const networkInfo = getNetworkInfo(targetChainId);
        if (networkInfo) {
          await addNetwork(networkInfo);
        } else {
          throw new Error("Unsupported network");
        }
      } else {
        throw switchError;
      }
    }
  };

  // Add network to MetaMask
  const addNetwork = async (network: NetworkInfo) => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [network],
      });
    } catch (addError) {
      console.error("Failed to add network:", addError);
      throw new Error("Failed to add network to MetaMask");
    }
  };

  const checkRoleAccess = (requiredRole: Role): boolean => {
    // Court role has highest privileges, can access anything
    if (userRole === Role.Court) return true;

    // Otherwise, check if user has at least the required role
    return userRole >= requiredRole;
  };

  return (
    <Web3Context.Provider
      value={{
        isConnected,
        account,
        userRole,
        connecting,
        balance,
        chainId,
        networkName,
        isCorrectNetwork,
        connectWallet,
        disconnectWallet,
        checkRoleAccess,
        switchNetwork,
        refreshBalance,
        addNetwork,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export { Web3Context };

// Custom hook to use the Web3 context
// eslint-disable-next-line react-refresh/only-export-components
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
