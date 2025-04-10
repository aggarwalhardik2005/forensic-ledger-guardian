
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LogOut,
  User,
  Menu,
  Shield,
  Bell
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/services/web3Service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case Role.Court:
        return "bg-forensic-court text-white";
      case Role.Officer:
        return "bg-forensic-800 text-white";
      case Role.Forensic:
        return "bg-forensic-accent text-white";
      case Role.Lawyer:
        return "bg-forensic-warning text-forensic-900";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <header className="bg-white border-b border-forensic-200 h-14 md:h-16">
      <div className="h-full px-2 sm:px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-1 sm:mr-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Show logo on mobile */}
          {isMobile && (
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-forensic-accent" />
              <span className="ml-1 font-semibold text-sm md:text-base">ForensicLedger</span>
            </div>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-1 sm:gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Bell className="h-4 w-4 text-forensic-500" />
            </Button>
            
            {/* Role Badge - hide on very small screens */}
            <Badge className={`${user.role ? getRoleBadgeColor(user.role) : "bg-gray-500"} px-2 py-1 hidden xs:inline-flex`}>
              {user.roleTitle || "Unknown"}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2">
                  <User className="h-4 w-4 text-forensic-accent" />
                  <span className="hidden sm:inline-block text-sm truncate max-w-[100px] md:max-w-none">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-forensic-accent" />
                  <span>User Profile</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-forensic-danger cursor-pointer" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="text-xs sm:text-sm"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
