
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  AlertTriangle 
} from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();

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
          <TabsTrigger value="notifications" className="flex items-center gap-2">
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
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" defaultValue={user?.roleTitle} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="user@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" className="h-24" />
              </div>
              
              <Button className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Changes
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
                  <p className="text-sm text-forensic-500">Get notified when a case is updated</p>
                </div>
                <Switch defaultChecked id="case-updates" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Evidence</p>
                  <p className="text-sm text-forensic-500">Get notified when new evidence is added to your cases</p>
                </div>
                <Switch defaultChecked id="evidence-alerts" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Role Assignments</p>
                  <p className="text-sm text-forensic-500">Get notified when you are assigned to a new case</p>
                </div>
                <Switch defaultChecked id="role-alerts" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Announcements</p>
                  <p className="text-sm text-forensic-500">Important system-wide announcements</p>
                </div>
                <Switch defaultChecked id="system-alerts" />
              </div>
              
              <Button className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Preferences
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
                  <p className="text-sm text-forensic-500">Add an extra layer of security to your account</p>
                </div>
                <Switch id="2fa" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Login Notifications</p>
                  <p className="text-sm text-forensic-500">Receive alerts when your account is accessed</p>
                </div>
                <Switch defaultChecked id="login-alerts" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="recovery-email">Recovery Email</Label>
                <Input id="recovery-email" type="email" placeholder="backup@example.com" />
              </div>
              
              <div className="bg-forensic-warning/10 border border-forensic-warning/20 p-4 rounded-md flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-forensic-warning shrink-0 mt-0.5" />
                <p className="text-sm text-forensic-600">
                  Changing security settings requires verification through your blockchain wallet.
                  Make sure you have access to your connected wallet.
                </p>
              </div>
              
              <Button className="bg-forensic-accent hover:bg-forensic-accent/90 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Information</CardTitle>
              <CardDescription>
                Manage your blockchain wallet connection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-forensic-200 rounded-md bg-forensic-50">
                <p className="font-medium text-forensic-800 mb-1">Connected Wallet</p>
                <p className="text-sm text-forensic-600 font-mono">
                  {user?.address ? user.address : '0x0000000000000000000000000000000000000000'}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-sign Transactions</p>
                  <p className="text-sm text-forensic-500">Allow automatic signing for routine operations</p>
                </div>
                <Switch id="auto-sign" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Transaction Notifications</p>
                  <p className="text-sm text-forensic-500">Get notified for all blockchain transactions</p>
                </div>
                <Switch defaultChecked id="tx-alerts" />
              </div>
              
              <div className="bg-forensic-warning/10 border border-forensic-warning/20 p-4 rounded-md flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-forensic-warning shrink-0 mt-0.5" />
                <p className="text-sm text-forensic-600">
                  Changing your connected wallet requires verification through both your current 
                  and new wallets. This is to ensure the security of your account and data.
                </p>
              </div>
              
              <Button variant="outline" className="w-full">
                Switch Wallet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
