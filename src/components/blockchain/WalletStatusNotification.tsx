import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Wifi, WifiOff, CheckCircle } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";

const WalletStatusNotification: React.FC = () => {
  const { isConnected, isCorrectNetwork, networkName, switchNetwork } =
    useWeb3();

  // Don't show anything if wallet is connected and on correct network
  if (isConnected && isCorrectNetwork) {
    return null;
  }

  // Not connected at all
  if (!isConnected) {
    return (
      <Alert className="border-yellow-200 bg-yellow-50">
        <WifiOff className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span className="text-yellow-800">
            Wallet not connected. Some features may be limited.
          </span>
          <Button variant="outline" size="sm" asChild>
            <a href="/wallet">Connect Wallet</a>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Connected but wrong network
  if (isConnected && !isCorrectNetwork) {
    return (
      <Alert className="border-orange-200 bg-orange-50">
        <AlertTriangle className="h-4 w-4 text-orange-600" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span className="text-orange-800">
            Connected to {networkName}. Switch to Sepolia testnet for full
            functionality.
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => switchNetwork("0xaa36a7")}
          >
            Switch Network
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default WalletStatusNotification;
