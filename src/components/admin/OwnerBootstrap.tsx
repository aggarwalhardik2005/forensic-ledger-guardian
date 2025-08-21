import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/contexts/Web3Context";
import web3Service, { Role } from "@/services/web3Service";
import { Shield, Crown, UserPlus, CheckCircle } from "lucide-react";

const OwnerBootstrap = () => {
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role>(Role.Court);
  const { account, userRole } = useWeb3();
  const { toast } = useToast();

  // Check if current user is contract owner
  useEffect(() => {
    const checkOwnership = async () => {
      if (!account || !web3Service.isContractConnected()) {
        setIsLoading(false);
        return;
      }

      try {
        const contractOwner = await web3Service.getContractOwner();
        if (contractOwner) {
          const isCurrentUserOwner =
            account.toLowerCase() === contractOwner.toLowerCase();
          setIsOwner(isCurrentUserOwner);

          if (isCurrentUserOwner) {
            setWalletAddress(account); // Pre-fill with owner's address
          }
        }
      } catch (error) {
        console.error("Error checking ownership:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOwnership();
  }, [account]);

  const handleAssignRole = async () => {
    if (!walletAddress || !web3Service || !account) {
      toast({
        title: "Error",
        description: "Please enter a valid wallet address",
        variant: "destructive",
      });
      return;
    }

    setAssigning(true);
    try {
      const success = await web3Service.setGlobalRole(
        walletAddress,
        selectedRole
      );

      if (success) {
        toast({
          title: "Role Assigned Successfully",
          description: `${getRoleTitle(
            selectedRole
          )} role assigned to ${walletAddress}`,
        });

        // If assigning role to self, reload to update UI
        if (walletAddress.toLowerCase() === account.toLowerCase()) {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } else {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.error("Role assignment error:", error);
      toast({
        title: "Assignment Failed",
        description:
          "Could not assign role. Please ensure you have the necessary permissions.",
        variant: "destructive",
      });
    } finally {
      setAssigning(false);
    }
  };

  const handleBootstrapSelf = async () => {
    if (!account) return;

    setWalletAddress(account);
    setSelectedRole(Role.Court);

    // Small delay to ensure state updates
    setTimeout(() => {
      handleAssignRole();
    }, 100);
  };

  const getRoleTitle = (role: Role): string => {
    switch (role) {
      case Role.Court:
        return "Court Official (Administrator)";
      case Role.Officer:
        return "Police Officer";
      case Role.Forensic:
        return "Forensic Expert";
      case Role.Lawyer:
        return "Legal Counsel";
      default:
        return "Unknown Role";
    }
  };

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (!isOwner) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Shield className="h-5 w-5" />
            Access Denied
          </CardTitle>
          <CardDescription>
            You are not the contract owner. Only the contract owner can
            bootstrap the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Your wallet:</strong> {account}
            </p>
            <p>
              <strong>Current role:</strong>{" "}
              {userRole !== undefined ? getRoleTitle(userRole) : "None"}
            </p>
            <p className="text-red-600">
              Contact the system administrator to get access.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Crown className="h-5 w-5" />
            Contract Owner Detected
          </CardTitle>
          <CardDescription>
            You are the contract owner. Bootstrap the system by assigning roles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Owner wallet:</strong> {account}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="text-green-600 font-medium">Authorized</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {userRole === Role.None && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <UserPlus className="h-5 w-5" />
              Quick Setup
            </CardTitle>
            <CardDescription className="text-green-600">
              Assign yourself admin role to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleBootstrapSelf}
              disabled={assigning}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {assigning ? "Assigning..." : "Give Me Admin Access"}
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Assign Role to User
          </CardTitle>
          <CardDescription>
            Assign roles to other wallet addresses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="wallet-address">Wallet Address</Label>
            <Input
              id="wallet-address"
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="role-select">Role</Label>
            <Select
              value={selectedRole.toString()}
              onValueChange={(value) => setSelectedRole(Number(value) as Role)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Role.Court.toString()}>
                  Court Official (Administrator)
                </SelectItem>
                <SelectItem value={Role.Officer.toString()}>
                  Police Officer
                </SelectItem>
                <SelectItem value={Role.Forensic.toString()}>
                  Forensic Expert
                </SelectItem>
                <SelectItem value={Role.Lawyer.toString()}>
                  Legal Counsel
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleAssignRole}
            disabled={assigning || !walletAddress}
            className="w-full"
          >
            {assigning ? "Assigning..." : "Assign Role"}
          </Button>
        </CardContent>
      </Card>

      {userRole !== Role.None && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <CheckCircle className="h-5 w-5" />
              You're All Set!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-600 text-sm">
              You have the {getRoleTitle(userRole)} role. You can now access the
              system normally.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OwnerBootstrap;
