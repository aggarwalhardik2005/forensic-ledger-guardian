import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  User,
  Bell,
  Shield,
  Key,
  Save,
  AlertTriangle,
  Loader2,
  Wallet,
  Copy,
  ExternalLink,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useWeb3 } from "@/hooks/useWeb3";
import { useToast } from "@/hooks/use-toast";
import web3Service from "@/services/web3Service";

const Settings = () => {
  const { user } = useAuth();
  const {
    isConnected,
    account,
    balance,
    networkName,
    isCorrectNetwork,
    userRole,
    disconnectWallet,
    switchNetwork,
    refreshBalance,
  } = useWeb3();
  const { toast } = useToast();

  // User profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    title: user?.roleTitle || "",
    email: "user@example.com",
    bio: "",
  });

  // Notification preferences state
  const [notificationPrefs, setNotificationPrefs] = useState({
    caseUpdates: true,
    newEvidence: true,
    roleAssignments: true,
    systemAnnouncements: true,
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    recoveryEmail: "",
  });

  // Wallet settings state
  const [walletSettings, setWalletSettings] = useState({
    autoSign: false,
    txNotifications: true,
  });

  // Loading states for buttons
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isNotifSaving, setIsNotifSaving] = useState(false);
  const [isSecuritySaving, setIsSecuritySaving] = useState(false);

  // Handle profile data changes
  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle notification toggle changes
  const handleNotificationToggle = (key) => {
    setNotificationPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Handle security settings changes
  const handleSecurityChange = (key, value) => {
    setSecuritySettings((prev) => ({ ...prev, [key]: value }));
  };

  // Handle wallet settings changes
  const handleWalletChange = (key, value) => {
    setWalletSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Save profile changes
  const saveProfileChanges = () => {
    setIsProfileSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsProfileSaving(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  };

  // Save notification preferences
  const saveNotificationPrefs = () => {
    setIsNotifSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsNotifSaving(false);
      toast({
        title: "Preferences Saved",
        description: "Your notification preferences have been updated.",
      });
    }, 1000);
  };

  // Save security settings
  const saveSecuritySettings = () => {
    setIsSecuritySaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSecuritySaving(false);
      toast({
        title: "Security Settings Updated",
        description: "Your security settings have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span className="hidden md:inline">Wallet</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="h-24"
                />
              </div>

              <Button
                className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2"
                onClick={saveProfileChanges}
                disabled={isProfileSaving}
              >
                {isProfileSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isProfileSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Case Updates</p>
                  <p className="text-sm text-forensic-500">
                    Get notified when a case is updated
                  </p>
                </div>
                <Switch
                  checked={notificationPrefs.caseUpdates}
                  onCheckedChange={() =>
                    handleNotificationToggle("caseUpdates")
                  }
                  id="case-updates"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Evidence</p>
                  <p className="text-sm text-forensic-500">
                    Get notified when new evidence is added to your cases
                  </p>
                </div>
                <Switch
                  checked={notificationPrefs.newEvidence}
                  onCheckedChange={() =>
                    handleNotificationToggle("newEvidence")
                  }
                  id="evidence-alerts"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Role Assignments</p>
                  <p className="text-sm text-forensic-500">
                    Get notified when you are assigned to a new case
                  </p>
                </div>
                <Switch
                  checked={notificationPrefs.roleAssignments}
                  onCheckedChange={() =>
                    handleNotificationToggle("roleAssignments")
                  }
                  id="role-alerts"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Announcements</p>
                  <p className="text-sm text-forensic-500">
                    Important system-wide announcements
                  </p>
                </div>
                <Switch
                  checked={notificationPrefs.systemAnnouncements}
                  onCheckedChange={() =>
                    handleNotificationToggle("systemAnnouncements")
                  }
                  id="system-alerts"
                />
              </div>

              <Button
                className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2"
                onClick={saveNotificationPrefs}
                disabled={isNotifSaving}
              >
                {isNotifSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isNotifSaving ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-forensic-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    handleSecurityChange("twoFactorAuth", checked)
                  }
                  id="2fa"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Login Notifications</p>
                  <p className="text-sm text-forensic-500">
                    Receive alerts when your account is accessed
                  </p>
                </div>
                <Switch
                  checked={securitySettings.loginNotifications}
                  onCheckedChange={(checked) =>
                    handleSecurityChange("loginNotifications", checked)
                  }
                  id="login-alerts"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recovery-email">Recovery Email</Label>
                <Input
                  id="recovery-email"
                  type="email"
                  placeholder="backup@example.com"
                  value={securitySettings.recoveryEmail}
                  onChange={(e) =>
                    handleSecurityChange("recoveryEmail", e.target.value)
                  }
                />
              </div>

              <div className="bg-forensic-warning/10 border border-forensic-warning/20 p-4 rounded-md flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-forensic-warning shrink-0 mt-0.5" />
                <p className="text-sm text-forensic-600">
                  Changing security settings requires verification through your
                  blockchain wallet. Make sure you have access to your connected
                  wallet.
                </p>
              </div>

              <Button
                className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2"
                onClick={saveSecuritySettings}
                disabled={isSecuritySaving}
              >
                {isSecuritySaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSecuritySaving ? "Saving..." : "Save Security Settings"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet Information
              </CardTitle>
              <CardDescription>
                Manage your blockchain wallet connection and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isConnected ? (
                <>
                  {/* Wallet Address */}
                  <div className="space-y-2">
                    <Label>Connected Wallet Address</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={account || ""}
                        readOnly
                        className="font-mono text-sm bg-muted"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(account || "");
                          toast({
                            title: "Copied",
                            description: "Wallet address copied to clipboard",
                          });
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Balance */}
                  <div className="space-y-2">
                    <Label>Wallet Balance</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={`${parseFloat(balance).toFixed(6)} ETH`}
                        readOnly
                        className="font-mono text-sm bg-muted"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={refreshBalance}
                      >
                        <Loader2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Network Status */}
                  <div className="space-y-2">
                    <Label>Current Network</Label>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        {isCorrectNetwork ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="font-medium">{networkName}</span>
                      </div>
                      {!isCorrectNetwork && (
                        <Button
                          size="sm"
                          onClick={() => switchNetwork("0xaa36a7")}
                        >
                          Switch to Sepolia
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Role Information */}
                  <div className="space-y-2">
                    <Label>Blockchain Role</Label>
                    <div className="p-3 border rounded-md bg-muted">
                      <span className="font-medium">
                        {web3Service.getRoleString(userRole)}
                      </span>
                    </div>
                  </div>

                  {/* Wallet Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-sign Transactions</p>
                        <p className="text-sm text-muted-foreground">
                          Allow automatic signing for routine operations
                        </p>
                      </div>
                      <Switch
                        checked={walletSettings.autoSign}
                        onCheckedChange={(checked) =>
                          handleWalletChange("autoSign", checked)
                        }
                        id="auto-sign"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Transaction Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified for all blockchain transactions
                        </p>
                      </div>
                      <Switch
                        checked={walletSettings.txNotifications}
                        onCheckedChange={(checked) =>
                          handleWalletChange("txNotifications", checked)
                        }
                        id="tx-alerts"
                      />
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="space-y-2">
                    <Label>External Tools</Label>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const explorerUrl = isCorrectNetwork
                            ? `https://sepolia.etherscan.io/address/${account}`
                            : `https://etherscan.io/address/${account}`;
                          window.open(explorerUrl, "_blank");
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Explorer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open("https://metamask.io/", "_blank")
                        }
                      >
                        <Wallet className="h-4 w-4 mr-2" />
                        MetaMask Help
                      </Button>
                    </div>
                  </div>

                  {/* Disconnect Wallet */}
                  <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-md">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-destructive">
                          Disconnect Wallet
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This will disconnect your wallet but won't affect your
                          account data.
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={disconnectWallet}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    No Wallet Connected
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your MetaMask wallet to manage blockchain settings
                  </p>
                  <Button asChild>
                    <a href="/wallet">
                      <Wallet className="h-4 w-4 mr-2" />
                      Manage Wallet
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
