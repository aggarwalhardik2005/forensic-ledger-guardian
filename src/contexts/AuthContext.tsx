
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@/services/web3Service';
import { useToast } from '@/hooks/use-toast';

// Define user types
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  roleTitle: string;
}

// Mock users for development
const mockUsers = [
  {
    id: '1',
    email: 'court@example.com',
    password: 'court123',
    name: 'Judge Smith',
    role: Role.Court,
    roleTitle: 'Court Judge'
  },
  {
    id: '2',
    email: 'officer@example.com',
    password: 'officer123',
    name: 'Officer Johnson',
    role: Role.Officer,
    roleTitle: 'Police Officer'
  },
  {
    id: '3',
    email: 'forensic@example.com',
    password: 'forensic123',
    name: 'Dr. Anderson',
    role: Role.Forensic,
    roleTitle: 'Forensic Investigator'
  },
  {
    id: '4',
    email: 'lawyer@example.com',
    password: 'lawyer123',
    name: 'Attorney Davis',
    role: Role.Lawyer,
    roleTitle: 'Defense Attorney'
  }
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('forensicLedgerUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('forensicLedgerUser', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userWithoutPassword.name}`,
      });
      
      return true;
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('forensicLedgerUser');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
