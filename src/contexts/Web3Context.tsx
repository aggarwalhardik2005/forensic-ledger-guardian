import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import web3Service, { Role } from "@/services/web3Service";
import { toast } from "@/hooks/use-toast";

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  userRole: Role;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  checkRoleAccess: (requiredRole: Role) => boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<Role>(Role.None);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = async () => {
      console.log("Web3Context: Checking existing connection...");

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
        }
      } else {
        console.log("Web3Context: No existing connection found");
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setAccount(null);
          setIsConnected(false);
          setUserRole(Role.None);
        } else {
          setAccount(accounts[0]);
          setIsConnected(true);
          // Update role when account changes
          web3Service.getUserRole().then(setUserRole);
        }
      });
    }

    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged");
      }
    };
  }, []);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      console.log("Web3Context: Connecting wallet...");
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

        toast({
          title: "Wallet Connected",
          description: `Connected to account ${account.substring(
            0,
            6
          )}...${account.substring(account.length - 4)}`,
        });
      } else {
        console.error("Web3Context: Failed to get account after connection");
        throw new Error("Failed to get account");
      }
    } catch (error) {
      console.error("Web3Context: Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Check console for details.",
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
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
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
        connectWallet,
        disconnectWallet,
        checkRoleAccess,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
