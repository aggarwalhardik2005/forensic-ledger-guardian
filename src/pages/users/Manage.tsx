
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  ShieldCheck,
  ShieldOff,
  UserX
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/services/web3Service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock user data
const userData = [
  {
    id: "0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T",
    name: "Michael Wong",
    email: "michael.wong@courts.gov",
    role: Role.Court,
    status: "active",
    added: "2025-01-15T10:00:00Z",
    caseCount: 38
  },
  {
    id: "0xA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0",
    name: "John Smith",
    email: "john.smith@police.gov",
    role: Role.Officer,
    status: "active",
    added: "2025-01-20T10:00:00Z",
    caseCount: 15
  },
  {
    id: "0x2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1A",
    name: "Emily Chen",
    email: "emily.chen@forensics.gov",
    role: Role.Forensic,
    status: "active",
    added: "2025-01-25T10:00:00Z",
    caseCount: 22
  },
  {
    id: "0xB2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0A1",
    name: "Sarah Lee",
    email: "sarah.lee@legal.gov",
    role: Role.Lawyer,
    status: "active", 
    added: "2025-01-30T10:00:00Z",
    caseCount: 12
  },
  {
    id: "0x3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1A2B",
    name: "Robert Johnson",
    email: "robert.johnson@police.gov",
    role: Role.Officer,
    status: "active",
    added: "2025-02-05T10:00:00Z",
    caseCount: 8
  },
  {
    id: "0xC4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1A2B3",
    name: "David Williams",
    email: "david.williams@forensics.gov",
    role: Role.Forensic,
    status: "inactive",
    added: "2025-02-10T10:00:00Z",
    caseCount: 0
  },
  {
    id: "0x4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1A2B3C",
    name: "Jennifer Miller",
    email: "jennifer.miller@legal.gov",
    role: Role.Lawyer,
    status: "active",
    added: "2025-02-15T10:00:00Z",
    caseCount: 5
  },
];

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter users based on search and filters
  const filteredUsers = userData
    .filter(user => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.id.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(user => {
      // Role filter
      if (roleFilter === 'all') return true;
      return user.role === parseInt(roleFilter);
    })
    .filter(user => {
      // Status filter
      if (statusFilter === 'all') return true;
      return user.status === statusFilter;
    });

  const getRoleBadge = (role: Role) => {
    switch (role) {
      case Role.Court:
        return <Badge className="bg-forensic-court text-white">Court</Badge>;
      case Role.Officer:
        return <Badge className="bg-forensic-800 text-white">Officer</Badge>;
      case Role.Forensic:
        return <Badge className="bg-forensic-accent text-white">Forensic</Badge>;
      case Role.Lawyer:
        return <Badge className="bg-forensic-warning text-forensic-900">Lawyer</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return <Badge className="bg-forensic-success/20 text-forensic-success">Active</Badge>;
    } else {
      return <Badge className="bg-forensic-400/20 text-forensic-500">Inactive</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-forensic-800">User Management</h1>
        <Button className="bg-forensic-court hover:bg-forensic-court/90 flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-forensic-500" />
          <Input
            placeholder="Search users..."
            className="pl-8 border-forensic-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-forensic-500" />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="border-forensic-200">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value={Role.Court.toString()}>Court</SelectItem>
              <SelectItem value={Role.Officer.toString()}>Officer</SelectItem>
              <SelectItem value={Role.Forensic.toString()}>Forensic</SelectItem>
              <SelectItem value={Role.Lawyer.toString()}>Lawyer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-forensic-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="border-forensic-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>Manage all users in the forensic evidence system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-forensic-200">
                  <th className="px-4 py-3 text-sm font-medium text-forensic-500">Name</th>
                  <th className="px-4 py-3 text-sm font-medium text-forensic-500">Role</th>
                  <th className="px-4 py-3 text-sm font-medium text-forensic-500">Email</th>
                  <th className="px-4 py-3 text-sm font-medium text-forensic-500">Status</th>
                  <th className="px-4 py-3 text-sm font-medium text-forensic-500">Cases</th>
                  <th className="px-4 py-3 text-sm font-medium text-forensic-500">Added</th>
                  <th className="px-4 py-3 text-sm font-medium text-forensic-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-forensic-100 hover:bg-forensic-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-forensic-800">{user.name}</p>
                        <p className="text-xs text-forensic-500 font-mono truncate w-24 md:w-auto">{user.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-3 text-forensic-600">{user.email}</td>
                    <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-3 text-forensic-600">{user.caseCount}</td>
                    <td className="px-4 py-3 text-forensic-600">
                      {new Date(user.added).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem className="cursor-pointer">
                            <Button variant="ghost" className="flex items-center w-full justify-start px-0">
                              Edit User
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Button variant="ghost" className="flex items-center w-full justify-start px-0">
                              View Cases
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Button variant="ghost" className="flex items-center w-full justify-start px-0 text-forensic-court">
                              <ShieldCheck className="h-4 w-4 mr-2" />
                              Change Role
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Button variant="ghost" className="flex items-center w-full justify-start px-0 text-forensic-warning">
                              {user.status === 'active' ? (
                                <>
                                  <ShieldOff className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <ShieldCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Button variant="ghost" className="flex items-center w-full justify-start px-0 text-forensic-danger">
                              <UserX className="h-4 w-4 mr-2" />
                              Remove Access
                            </Button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
