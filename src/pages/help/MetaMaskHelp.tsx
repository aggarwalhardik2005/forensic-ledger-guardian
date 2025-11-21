import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Download,
  Settings,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Shield,
  HelpCircle,
  Network,
  Coins,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MetaMaskHelp: React.FC = () => {
  const installSteps = [
    {
      title: "Download MetaMask",
      description:
        "Visit metamask.io and download the browser extension for your browser",
      icon: <Download className="h-5 w-5" />,
    },
    {
      title: "Install Extension",
      description: "Follow the installation prompts in your browser",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      title: "Create Wallet",
      description:
        "Set up a new wallet or import an existing one using your seed phrase",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      title: "Secure Your Wallet",
      description:
        "Save your seed phrase in a secure location and set a strong password",
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  const networkSetup = [
    {
      title: "Open MetaMask",
      description: "Click on the MetaMask extension icon in your browser",
    },
    {
      title: "Network Menu",
      description:
        "Click on the network dropdown (usually shows 'Ethereum Mainnet')",
    },
    {
      title: "Add Network",
      description: "Click 'Add Network' or 'Custom RPC'",
    },
    {
      title: "Enter Details",
      description: "Add the Sepolia testnet details provided below",
    },
  ];

  const troubleshootingItems = [
    {
      question: "MetaMask is not detecting",
      answer:
        "Make sure you have MetaMask installed and enabled in your browser. Try refreshing the page or restarting your browser.",
    },
    {
      question: "Wrong network error",
      answer:
        "You need to switch to the Sepolia testnet. Use the network switcher in the wallet component or manually add the network in MetaMask.",
    },
    {
      question: "Transaction failed",
      answer:
        "This could be due to insufficient gas fees, network congestion, or incorrect transaction parameters. Check your balance and try again.",
    },
    {
      question: "Connection keeps dropping",
      answer:
        "This might be due to MetaMask being locked or network issues. Try unlocking MetaMask and reconnecting.",
    },
    {
      question: "Can't see my transactions",
      answer:
        "Make sure you're on the correct network and that your wallet is properly connected. Check the block explorer for transaction status.",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">MetaMask Integration Help</h1>
        <p className="text-muted-foreground">
          Complete guide to setting up and using MetaMask with ForensicChain
        </p>
      </div>

      {/* Quick Status Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Quick Status Check
          </CardTitle>
          <CardDescription>
            Check if MetaMask is properly installed and configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>MetaMask Installed</span>
              {typeof window !== "undefined" && window.ethereum ? (
                <Badge variant="default">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Yes
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  No
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span>Browser Supported</span>
              <Badge variant="default">
                <CheckCircle className="h-3 w-3 mr-1" />
                Yes
              </Badge>
            </div>
          </div>
          {typeof window !== "undefined" && !window.ethereum && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-orange-800 font-medium mb-2">
                MetaMask Not Detected
              </p>
              <p className="text-orange-700 text-sm mb-3">
                MetaMask is required to use this application. Please install it
                to continue.
              </p>
              <Button asChild>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Install MetaMask
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Installation Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Installation Guide
          </CardTitle>
          <CardDescription>
            Step-by-step guide to install and set up MetaMask
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {installSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-primary font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {step.icon}
                    <h3 className="font-medium">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Network Configuration
          </CardTitle>
          <CardDescription>
            Set up the Sepolia testnet for testing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Automatic Setup */}
          <div className="space-y-3">
            <h3 className="font-medium">Automatic Setup (Recommended)</h3>
            <p className="text-sm text-muted-foreground">
              Use the network switcher in the wallet component to automatically
              add and switch to Sepolia testnet.
            </p>
            <Button asChild>
              <a href="/wallet">
                <Wallet className="h-4 w-4 mr-2" />
                Go to Wallet Management
              </a>
            </Button>
          </div>

          {/* Manual Setup */}
          <div className="space-y-3">
            <h3 className="font-medium">Manual Setup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sepolia Testnet Details</h4>
                <div className="space-y-1 text-sm bg-muted p-3 rounded">
                  <div>
                    <strong>Network Name:</strong> Sepolia Testnet
                  </div>
                  <div>
                    <strong>RPC URL:</strong> https://sepolia.infura.io/v3/
                  </div>
                  <div>
                    <strong>Chain ID:</strong> 11155111
                  </div>
                  <div>
                    <strong>Symbol:</strong> SEP
                  </div>
                  <div>
                    <strong>Explorer:</strong> https://sepolia.etherscan.io/
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Setup Steps</h4>
                <ol className="space-y-1 text-sm">
                  {networkSetup.map((step, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="font-medium text-primary">
                        {index + 1}.
                      </span>
                      <span>{step.description}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Test Tokens */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Getting Test Tokens
          </CardTitle>
          <CardDescription>
            Get free Sepolia ETH for testing transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You'll need some Sepolia ETH to interact with the blockchain. Here
            are some reliable faucets:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Sepolia Faucet</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Official Ethereum testnet faucet
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://sepoliafaucet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Faucet
                </a>
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Alchemy Faucet</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Alternative Sepolia testnet faucet
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://sepoliafaucet.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Faucet
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Troubleshooting
          </CardTitle>
          <CardDescription>Common issues and their solutions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {troubleshootingItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>Helpful links and documentation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" asChild>
              <a
                href="https://metamask.io/faqs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                MetaMask FAQ
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://docs.metamask.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                MetaMask Documentation
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://ethereum.org/en/developers/docs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Ethereum Documentation
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/help" rel="noopener noreferrer">
                <HelpCircle className="h-4 w-4 mr-2" />
                General Help
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaMaskHelp;
