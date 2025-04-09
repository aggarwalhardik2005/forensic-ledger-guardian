
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  LogOut 
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ role: "Forensic" });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Mock logout function
  const handleLogout = () => {
    console.log("User logged out");
    // Would handle authentication state here
  };

  return (
    <nav className="bg-forensic-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-forensic-accent" />
            <span className="font-bold text-xl">ForensicLedger</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-1 hover:text-forensic-accent transition-colors">
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/cases" className="flex items-center space-x-1 hover:text-forensic-accent transition-colors">
              <FolderKanban className="h-4 w-4" />
              <span>Cases</span>
            </Link>
            <Link to="/evidence" className="flex items-center space-x-1 hover:text-forensic-accent transition-colors">
              <FileDigit className="h-4 w-4" />
              <span>Evidence</span>
            </Link>
            <Link to="/upload" className="flex items-center space-x-1 hover:text-forensic-accent transition-colors">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
            <Link to="/verify" className="flex items-center space-x-1 hover:text-forensic-accent transition-colors">
              <FileCheck className="h-4 w-4" />
              <span>Verify</span>
            </Link>
            <Button 
              variant="ghost"
              className="text-white hover:text-forensic-danger flex items-center space-x-1"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
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
            <div className="flex flex-col space-y-4">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-forensic-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/cases" 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-forensic-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FolderKanban className="h-5 w-5" />
                <span>Cases</span>
              </Link>
              <Link 
                to="/evidence" 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-forensic-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileDigit className="h-5 w-5" />
                <span>Evidence</span>
              </Link>
              <Link 
                to="/upload" 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-forensic-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Upload className="h-5 w-5" />
                <span>Upload</span>
              </Link>
              <Link 
                to="/verify" 
                className="flex items-center space-x-2 px-4 py-2 hover:bg-forensic-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileCheck className="h-5 w-5" />
                <span>Verify</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-left hover:bg-forensic-700 rounded-md text-forensic-danger"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
