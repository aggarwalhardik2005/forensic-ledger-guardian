
import React, { useState } from 'react';
import { UserCog, Save, Plus, Trash2, Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import web3Service, { Role } from "@/services/web3Service";
import { useAuth } from '@/contexts/AuthContext';

const RoleManagement = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [users, setUsers] = useState([
    { id: '1', name: 'John Smith', email: 'john@court.gov', role: Role.Court, caseAccess: ['C-2023-001', 'C-2023-005'] },
    { id: '2', name: 'Emma Clark', email: 'emma@police.gov', role: Role.Officer, caseAccess: ['C-2023-001', 'C-2023-002'] },
    { id: '3', name: 'Michael Chen', email: 'michael@lab.gov', role: Role.Forensic, caseAccess: ['C-2023-002'] },
    { id: '4', name: 'Sarah Johnson', email: 'sarah@legal.gov', role: Role.Lawyer, caseAccess: ['C-2023-001', 'C-2023-005'] }
  ]);
  
  const [newUser, setNewUser] = useState({ name: '', email: '', address: '', role: Role.None });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  const handleSaveRoles = () => {
    toast({
      title: "Roles Saved",
      description: "User role assignments have been saved to the blockchain",
    });
  };
  
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.address) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setUsers([...users, { 
      id: `${users.length + 1}`, 
      name: newUser.name, 
      email: newUser.email, 
      role: newUser.role,
      caseAccess: []
    }]);
    
    setNewUser({ name: '', email: '', address: '', role: Role.None });
    setShowAddForm(false);
    
    toast({
      title: "User Added",
      description: "The new user has been added successfully"
    });
  };
  
  const handleRemoveUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User Removed",
      description: "The user has been removed successfully"
    });
  };
  
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case Role.Court: return "bg-forensic-court text-white";
      case Role.Officer: return "bg-forensic-800 text-white";
      case Role.Forensic: return "bg-forensic-accent text-white";
      case Role.Lawyer: return "bg-forensic-warning text-forensic-900";
      default: return "bg-gray-500 text-white";
    }
  };
  
  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-forensic-800 flex items-center">
            <UserCog className="h-6 w-6 mr-2 text-forensic-court" />
            Role Management
          </h1>
          <p className="text-sm text-forensic-500">
            Assign users to specific cases with role designation and manage access permissions
          </p>
        </div>
        <Button 
          variant="outline" 
          className="bg-forensic-court text-white hover:bg-forensic-court/90 flex items-center gap-2"
          onClick={handleSaveRoles}
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>User Role Assignment</CardTitle>
                <CardDescription>
                  Manage user roles and case access permissions
                </CardDescription>
              </div>
              <Button 
                size="sm" 
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2"
              >
                {showAddForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {showAddForm ? 'Cancel' : 'Add User'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showAddForm && (
              <div className="bg-forensic-50 border border-forensic-200 rounded-md p-4 mb-4">
                <h3 className="font-medium mb-3">Add New User</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={newUser.name} 
                      onChange={e => setNewUser({...newUser, name: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={newUser.email} 
                      onChange={e => setNewUser({...newUser, email: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Wallet Address</Label>
                    <Input 
                      id="address" 
                      value={newUser.address} 
                      onChange={e => setNewUser({...newUser, address: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <select 
                      id="role" 
                      value={newUser.role} 
                      onChange={e => setNewUser({...newUser, role: parseInt(e.target.value)})}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value={Role.None}>Select Role</option>
                      <option value={Role.Court}>Court</option>
                      <option value={Role.Officer}>Officer</option>
                      <option value={Role.Forensic}>Forensic</option>
                      <option value={Role.Lawyer}>Lawyer</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleAddUser} className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </div>
            )}
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Case Access</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <div className="inline-flex items-center">
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {web3Service.getRoleString(user.role)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.caseAccess.map(caseId => (
                            <Badge 
                              key={caseId} 
                              variant="outline" 
                              className="bg-forensic-50"
                            >
                              {caseId}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveUser(user.id)}
                          className="text-forensic-500 hover:text-red-600 p-0 h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <p className="text-sm text-muted-foreground">
              {users.length} users configured with role assignments
            </p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Case Access Control</CardTitle>
            <CardDescription>
              Manage which users have access to specific cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Case ID</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select Case</option>
                    <option value="C-2023-001">C-2023-001 - Prosecutor v. Smith</option>
                    <option value="C-2023-002">C-2023-002 - Robbery Investigation</option>
                    <option value="C-2023-005">C-2023-005 - Digital Evidence Case</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>User</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select User</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="case-access" />
                <Label htmlFor="case-access">Grant access to selected case</Label>
              </div>
              <Button className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Update Access
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleManagement;
