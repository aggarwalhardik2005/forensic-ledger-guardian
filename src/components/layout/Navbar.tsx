
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  FileDigit, 
  LayoutDashboard, 
  FolderKanban, 
  Upload, 
  FileCheck, 
  Menu, 
  X, 
  LogOut,
  User,
  Users,
  Settings,
  FileText,
  Gavel,
  ShieldAlert,
  Activity,
  BarChart2,
  ScrollText,
  Pencil,
  BookOpen,
  HelpCircle
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/services/web3Service";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { to: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
      { to: "/cases", icon: <FolderKanban className="h-4 w-4" />, label: "Cases" },
      { to: "/evidence", icon: <FileDigit className="h-4 w-4" />, label: "Evidence" },
      { to: "/upload", icon: <Upload className="h-4 w-4" />, label: "Upload" },
      { to: "/verify", icon: <FileCheck className="h-4 w-4" />, label: "Verify" }
    ];

    if (!user) return commonLinks;

    switch (user.role) {
      case Role.Court:
        return [
          ...commonLinks,
          { to: "/users/manage", icon: <Users className="h-4 w-4" />, label: "User Management" },
          { to: "/settings/security", icon: <Settings className="h-4 w-4" />, label: "System Security" },
          { to: "/users/roles", icon: <User className="h-4 w-4" />, label: "Role Management" },
          { to: "/activity", icon: <Activity className="h-4 w-4" />, label: "Audit Logs" },
          { to: "/reports", icon: <BarChart2 className="h-4 w-4" />, label: "Reports" }
        ];
      case Role.Officer:
        return [
          ...commonLinks,
          { to: "/fir", icon: <FileText className="h-4 w-4" />, label: "FIRs" },
          { to: "/cases/assigned", icon: <FolderKanban className="h-4 w-4" />, label: "My Cases" },
          { to: "/evidence/confirm", icon: <FileCheck className="h-4 w-4" />, label: "Confirm Evidence" },
          { to: "/officer/reports", icon: <BarChart2 className="h-4 w-4" />, label: "Reports" }
        ];
      case Role.Forensic:
        return [
          ...commonLinks,
          { to: "/cases/assigned", icon: <FolderKanban className="h-4 w-4" />, label: "Assigned Cases" },
          { to: "/evidence/analysis", icon: <FileDigit className="h-4 w-4" />, label: "Evidence Analysis" },
          { to: "/evidence/verify", icon: <ShieldAlert className="h-4 w-4" />, label: "Technical Verification" },
          { to: "/forensic/reports", icon: <BarChart2 className="h-4 w-4" />, label: "Reports" }
        ];
      case Role.Lawyer:
        return [
          ...commonLinks,
          { to: "/cases/assigned", icon: <FolderKanban className="h-4 w-4" />, label: "My Cases" },
          { to: "/legal/documentation", icon: <ScrollText className="h-4 w-4" />, label: "Legal Docs" },
          { to: "/verify/custody", icon: <Gavel className="h-4 w-4" />, label: "Chain of Custody" },
          { to: "/clients", icon: <User className="h-4 w-4" />, label: "Clients" },
          { to: "/legal/reports", icon: <BarChart2 className="h-4 w-4" />, label: "Reports" }
        ];
      default:
        return commonLinks;
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-forensic-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-forensic-accent" />
            <span className="font-bold text-xl">ForensicLedger</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
                  isActive(link.to) 
                    ? 'bg-forensic-700 text-forensic-accent' 
                    : 'hover:bg-forensic-700/50 hover:text-forensic-accent'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}

            {/* Help button */}
            <Link to="/help" className="flex items-center space-x-1 hover:text-forensic-accent transition-colors ml-2">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </Link>

            {user ? (
              <div className="flex items-center space-x-3 ml-4 border-l pl-4 border-forensic-600">
                <div className="flex items-center space-x-2 border-r pr-3 border-forensic-600">
                  <User className="h-4 w-4 text-forensic-accent" />
                  <span className="text-sm">{user.name}</span>
                </div>
                <Button 
                  variant="ghost"
                  className="text-white hover:text-forensic-danger flex items-center space-x-1"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/" className="text-forensic-accent hover:text-forensic-accent/80 transition-colors">
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                    isActive(link.to) 
                      ? 'bg-forensic-700 text-forensic-accent' 
                      : 'hover:bg-forensic-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {/* Help button */}
              <Link 
                to="/help" 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-forensic-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HelpCircle className="h-5 w-5" />
                <span>Help</span>
              </Link>
              
              {user && (
                <>
                  <div className="px-4 py-2 border-t border-forensic-700 flex items-center space-x-2 mt-2">
                    <User className="h-5 w-5 text-forensic-accent" />
                    <span>{user.name}</span>
                  </div>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-left hover:bg-forensic-700 rounded-md text-forensic-danger"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
