
import React, { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  // Auto-collapse sidebar on mobile devices
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);
  
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="flex h-screen bg-forensic-50 overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        toggleCollapsed={toggleSidebar} 
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <footer className="bg-white border-t border-forensic-200 py-2 px-4 md:py-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-forensic-accent" />
              <span className="font-medium text-xs md:text-sm text-forensic-800">ForensicLedger</span>
            </div>
            <div className="text-xs text-forensic-500">
              © {new Date().getFullYear()} ForensicLedger. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
