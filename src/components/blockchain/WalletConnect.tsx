import React from "react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/hooks/useWeb3";
import {
  Wallet,
  LogOut,
  Loader2,
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Network,
} from "lucide-react";
import web3Service, { Role } from "@/services/web3Service";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const WalletConnect: React.FC = () => {
  const {
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
    switchNetwork,
    refreshBalance,
  } = useWeb3();

  const handleSwitchToSepolia = async () => {
    try {
      await switchNetwork("0xaa36a7"); // Sepolia testnet
      toast({
        title: "Network Switched",
        description: "Successfully switched to Sepolia testnet.",
      });
    } catch (error) {
      console.error("Failed to switch network:", error);
      toast({
        title: "Network Switch Failed",
        description: "Could not switch to Sepolia testnet.",
        variant: "destructive",
      });
    }
  };

  const handleRefreshBalance = async () => {
    try {
      await refreshBalance();
      toast({
        title: "Balance Refreshed",
        description: "Wallet balance has been updated.",
      });
    } catch (error) {
      console.error("Failed to refresh balance:", error);
      toast({
        title: "Refresh Failed",
        description: "Could not refresh wallet balance.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isConnected ? (
        <>
          {/* Network Status Indicator */}
          <div className="hidden lg:flex items-center gap-2">
            <Badge
              variant={isCorrectNetwork ? "default" : "destructive"}
              className="flex items-center gap-1"
            >
              {isCorrectNetwork ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <AlertTriangle className="h-3 w-3" />
              )}
              {networkName}
            </Badge>
          </div>

          {/* Wallet Info Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                <div className="hidden sm:flex flex-col items-start text-xs">
                  <span className="font-mono">
                    {account?.substring(0, 6)}...
                    {account?.substring(account.length - 4)}
                  </span>
                  <span className="text-muted-foreground">
                    {parseFloat(balance).toFixed(4)} ETH
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Wallet Information</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Account Info */}
              <div className="p-2 space-y-2">
                <div>
                  <p className="text-sm font-medium">Account</p>
                  <p className="text-xs font-mono bg-muted p-1 rounded">
                    {account}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Balance</p>
                    <p className="text-xs text-muted-foreground">
                      {balance} ETH
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRefreshBalance}
                    className="h-6 w-6 p-0"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                </div>

                <div>
                  <p className="text-sm font-medium">Network</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isCorrectNetwork ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                      )}
                      <span className="text-xs">{networkName}</span>
                    </div>
                    {!isCorrectNetwork && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSwitchToSepolia}
                        className="h-6 text-xs"
                      >
                        <Network className="h-3 w-3 mr-1" />
                        Switch
                      </Button>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Role</p>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-forensic-accent" />
                    <span className="text-xs">
                      {web3Service.getRoleString(userRole)}
                    </span>
                  </div>
                </div>
              </div>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={disconnectWallet}
                className="text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect Wallet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Simple disconnect button for mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={disconnectWallet}
            className="lg:hidden p-2"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <Button
          onClick={connectWallet}
          size="sm"
          disabled={connecting}
          className="bg-forensic-accent hover:bg-forensic-accent/90"
        >
          {connecting ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4 mr-1" />
              <span>Connect Wallet</span>
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default WalletConnect;
