
import React, { useState } from 'react';
import { Settings, Save, AlertTriangle, Lock, Unlock, RefreshCw, Server, KeyRound, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";

const SystemConfiguration = () => {
  const { toast } = useToast();
  const [systemLocked, setSystemLocked] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [blockchainNetwork, setBlockchainNetwork] = useState('Ethereum Sepolia Testnet');
  const [ipfsNode, setIpfsNode] = useState('https://ipfs.infura.io:5001');
  const [saveLoading, setSaveLoading] = useState(false);

  const handleSystemToggle = () => {
    setSystemLocked(!systemLocked);
    toast({
      title: !systemLocked ? "System Locked" : "System Unlocked",
      description: !systemLocked 
        ? "The system has been locked. Only administrators can make changes." 
        : "The system has been unlocked. Normal operations resumed.",
      variant: !systemLocked ? "destructive" : "default"
    });
  };

  const handleMaintenanceToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    toast({
      title: !maintenanceMode ? "Maintenance Mode Activated" : "Maintenance Mode Deactivated",
      description: !maintenanceMode
        ? "The system is now in maintenance mode. Some features may be limited."
        : "The system has exited maintenance mode. All features are available.",
      variant: !maintenanceMode ? "default" : "default"
    });
  };

  const handleSaveConfig = () => {
    setSaveLoading(true);
    setTimeout(() => {
      setSaveLoading(false);
      toast({
        title: "Configuration Saved",
        description: "System configuration has been updated successfully",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-forensic-800 flex items-center">
            <Settings className="h-6 w-6 mr-2 text-forensic-warning" />
            System Configuration
          </h1>
          <p className="text-sm text-forensic-500">
            Emergency lock controls, system parameter configuration, and security settings
          </p>
        </div>
        <div className="flex space-x-2">
          {systemLocked && (
            <Button 
              variant="destructive" 
              onClick={handleSystemToggle}
              className="flex items-center gap-2"
            >
              <Unlock className="h-4 w-4" />
              Emergency Unlock
            </Button>
          )}
          {!systemLocked && (
            <Button 
              variant="outline" 
              onClick={handleSystemToggle} 
              className="text-forensic-800 border-forensic-800 hover:bg-forensic-50 flex items-center gap-2"
            >
              <Lock className="h-4 w-4" />
              Emergency Lock
            </Button>
          )}
          <Button 
            onClick={handleSaveConfig}
            disabled={saveLoading}
            className="bg-forensic-warning hover:bg-forensic-warning/90 text-white flex items-center gap-2"
          >
            {saveLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Configuration
          </Button>
        </div>
      </div>

      {systemLocked && (
        <div className="bg-red-50 border border-red-300 rounded-md p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">System Currently Locked</h3>
            <p className="text-sm text-red-700 mt-1">
              The system is currently in emergency lock mode. Only administrators can make changes.
              This was activated at {new Date().toLocaleTimeString()} on {new Date().toLocaleDateString()}.
            </p>
          </div>
        </div>
      )}
      
      {maintenanceMode && (
        <div className="bg-amber-50 border border-amber-300 rounded-md p-4 flex items-start gap-3">
          <RefreshCw className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Maintenance Mode Active</h3>
            <p className="text-sm text-amber-700 mt-1">
              The system is currently in maintenance mode. Some features may be limited or unavailable.
              This mode was activated at {new Date().toLocaleTimeString()} on {new Date().toLocaleDateString()}.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Blockchain Configuration</CardTitle>
            <CardDescription>
              Configure blockchain connection parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="network">Blockchain Network</Label>
              <Input 
                id="network" 
                value={blockchainNetwork}
                onChange={(e) => setBlockchainNetwork(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contract">Smart Contract Address</Label>
              <Input 
                id="contract" 
                defaultValue="0x1234...5678" 
                className="font-mono text-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gasLimit">Gas Limit</Label>
              <Input id="gasLimit" type="number" defaultValue="300000" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="auto-connect" defaultChecked />
              <Label htmlFor="auto-connect">Auto-connect to Web3 provider</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IPFS Configuration</CardTitle>
            <CardDescription>
              Configure IPFS connection for evidence storage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ipfs-node">IPFS Node URL</Label>
              <Input 
                id="ipfs-node" 
                value={ipfsNode}
                onChange={(e) => setIpfsNode(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ipfs-timeout">Request Timeout (ms)</Label>
              <Input id="ipfs-timeout" type="number" defaultValue="30000" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pin-service">Pinning Service</Label>
              <select 
                id="pin-service" 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue="pinata"
              >
                <option value="none">None</option>
                <option value="pinata">Pinata</option>
                <option value="infura">Infura</option>
                <option value="web3storage">Web3.Storage</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="auto-pin" defaultChecked />
              <Label htmlFor="auto-pin">Auto-pin uploaded evidence</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Configure security parameters and role permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="2fa-required" />
              <Label htmlFor="2fa-required">Require 2FA for admin actions</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="audit-all" defaultChecked />
              <Label htmlFor="audit-all">Log all actions to audit trail</Label>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="court-approval" defaultChecked />
              <label
                htmlFor="court-approval"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Require court approval for case status changes
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="evidence-approval" defaultChecked />
              <label
                htmlFor="evidence-approval"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Require officer confirmation for evidence submissions
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              System health and maintenance controls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-green-700">Blockchain Connection</span>
              </div>
              <span className="text-sm text-green-600">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                <span className="font-medium text-green-700">IPFS Connection</span>
              </div>
              <span className="text-sm text-green-600">Connected</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex items-center">
                <div className="h-3 w-3 bg-amber-500 rounded-full mr-2"></div>
                <span className="font-medium text-amber-700">Database Sync</span>
              </div>
              <span className="text-sm text-amber-600">Partial (87%)</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="maintenance-mode" 
                checked={maintenanceMode}
                onCheckedChange={handleMaintenanceToggle}
              />
              <Label htmlFor="maintenance-mode" className="font-medium">
                Enable Maintenance Mode
              </Label>
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                <Server className="h-4 w-4" />
                Clear System Cache
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <p className="text-xs text-muted-foreground">
              Last system check: Today at {new Date().toLocaleTimeString()}
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Encryption Keys</CardTitle>
          <CardDescription>
            Manage system encryption keys and security parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="encryption-algo">Encryption Algorithm</Label>
              <select 
                id="encryption-algo" 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue="aes256"
              >
                <option value="aes256">AES-256-GCM</option>
                <option value="aes192">AES-192-GCM</option>
                <option value="chacha20">ChaCha20-Poly1305</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="key-rotation">Key Rotation Period (days)</Label>
              <Input id="key-rotation" type="number" defaultValue="90" />
            </div>
          </div>
          
          <div className="bg-forensic-50 border border-forensic-200 rounded-md p-4">
            <div className="flex items-center mb-2">
              <KeyRound className="h-5 w-5 text-forensic-800 mr-2" />
              <h3 className="font-medium">Current Active Key</h3>
            </div>
            <div className="font-mono text-sm bg-white border border-forensic-100 rounded p-2 overflow-x-auto">
              TDF8h4-3mJwP-Lp9Ks-7bVcN-2xZaQ-rTyWq
            </div>
            <p className="text-xs text-forensic-500 mt-1">
              Rotation scheduled for {new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toLocaleDateString()}
            </p>
          </div>
          
          <div className="bg-forensic-warning/10 border border-forensic-warning/20 p-4 rounded-md flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-forensic-warning shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-forensic-600">
                Changing encryption settings will not affect previously encrypted data, but may
                require re-encryption for consistency. Always backup keys before making changes.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Rotate Keys Now
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Backup Encryption Keys
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SystemConfiguration;
