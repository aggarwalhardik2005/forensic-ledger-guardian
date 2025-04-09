
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { Shield } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-forensic-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-forensic-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-forensic-accent" />
              <span className="font-bold text-lg">ForensicLedger</span>
            </div>
            <div className="text-sm text-forensic-400">
              © {new Date().getFullYear()} ForensicLedger. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
