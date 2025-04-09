
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/services/web3Service";
import { 
  Shield, 
  FileDigit, 
  LayoutDashboard, 
  FolderKanban, 
  Upload, 
  FileCheck,
  User,
  Users,
  Settings,
  FileText,
  Gavel,
  ShieldAlert,
  Activity,
  BarChart2,
  ScrollText,
  BookOpen,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Menu,
  UserCog,
  Search,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapsed }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case Role.Court:
        return [
          { to: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
          { to: "/cases", icon: <FolderKanban />, label: "Cases" },
          { to: "/cases/create", icon: <FileText />, label: "Create Case" },
          { to: "/evidence", icon: <FileDigit />, label: "Evidence" },
          { to: "/upload", icon: <Upload />, label: "Upload" },
          { to: "/verify", icon: <FileCheck />, label: "Verify" },
          { to: "/users/manage", icon: <Users />, label: "Users" },
          { to: "/users/roles", icon: <UserCog />, label: "Roles" },
          { to: "/settings/security", icon: <Settings />, label: "Security" },
          { to: "/activity", icon: <Activity />, label: "Audit Logs" },
          { to: "/reports", icon: <BarChart2 />, label: "Reports" }
        ];
      case Role.Officer:
        return [
          { to: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
          { to: "/fir", icon: <FileText />, label: "FIRs" },
          { to: "/fir/new", icon: <FileText />, label: "Create FIR" },
          { to: "/cases", icon: <FolderKanban />, label: "All Cases" },
          { to: "/cases/assigned", icon: <FolderKanban />, label: "My Cases" },
          { to: "/evidence", icon: <FileDigit />, label: "Evidence" },
          { to: "/upload", icon: <Upload />, label: "Upload" },
          { to: "/evidence/confirm", icon: <FileCheck />, label: "Confirm Evidence" },
          { to: "/officer/reports", icon: <BarChart2 />, label: "Reports" }
        ];
      case Role.Forensic:
        return [
          { to: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
          { to: "/cases/assigned", icon: <FolderKanban />, label: "Assigned Cases" },
          { to: "/evidence", icon: <FileDigit />, label: "Evidence" },
          { to: "/evidence/analysis", icon: <Search />, label: "Evidence Analysis" },
          { to: "/upload", icon: <Upload />, label: "Upload" },
          { to: "/evidence/verify", icon: <ShieldAlert />, label: "Technical Verification" },
          { to: "/forensic/reports", icon: <BarChart2 />, label: "Reports" }
        ];
      case Role.Lawyer:
        return [
          { to: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
          { to: "/cases/assigned", icon: <FolderKanban />, label: "My Cases" },
          { to: "/cases/prepare", icon: <Gavel />, label: "Court Preparation" },
          { to: "/evidence", icon: <FileDigit />, label: "Evidence" },
          { to: "/legal/documentation", icon: <ScrollText />, label: "Legal Docs" },
          { to: "/verify/custody", icon: <Clock />, label: "Chain of Custody" },
          { to: "/upload", icon: <Upload />, label: "Upload" },
          { to: "/clients", icon: <User />, label: "Clients" },
          { to: "/meetings", icon: <Users />, label: "Meetings" },
          { to: "/legal/reports", icon: <BarChart2 />, label: "Reports" }
        ];
      default:
        return [
          { to: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
          { to: "/cases", icon: <FolderKanban />, label: "Cases" },
          { to: "/evidence", icon: <FileDigit />, label: "Evidence" },
          { to: "/upload", icon: <Upload />, label: "Upload" },
          { to: "/verify", icon: <FileCheck />, label: "Verify" }
        ];
    }
  };

  // Always show these links at the bottom regardless of role
  const bottomLinks = [
    { to: "/settings", icon: <Settings />, label: "Settings" },
    { to: "/help", icon: <HelpCircle />, label: "Help" }
  ];

  const navLinks = getNavLinks();

  return (
    <aside
      className={cn(
        "h-screen border-r border-forensic-200 bg-white transition-all duration-300 flex flex-col",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="py-6 px-3 flex items-center justify-between border-b border-forensic-200">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-forensic-accent" />
            <span className="font-bold text-lg text-forensic-800">ForensicLedger</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="mx-auto">
            <Shield className="h-7 w-7 text-forensic-accent" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("rounded-full", collapsed && "mx-auto")}
          onClick={toggleCollapsed}
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1">
          {navLinks.map((link) => (
            <TooltipProvider key={link.to} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={link.to}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2.5 gap-3 text-sm font-medium transition-colors",
                      isActive(link.to)
                        ? "bg-forensic-100 text-forensic-accent"
                        : "text-forensic-600 hover:bg-forensic-50 hover:text-forensic-800"
                    )}
                  >
                    <span className="flex-shrink-0">{React.cloneElement(link.icon, { className: "h-5 w-5" })}</span>
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn("bg-forensic-800 text-white", !collapsed && "hidden")}>
                  {link.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      <div className="p-2 border-t border-forensic-200">
        <nav className="space-y-1">
          {bottomLinks.map((link) => (
            <TooltipProvider key={link.to} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={link.to}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2.5 gap-3 text-sm font-medium transition-colors",
                      isActive(link.to)
                        ? "bg-forensic-100 text-forensic-accent"
                        : "text-forensic-600 hover:bg-forensic-50 hover:text-forensic-800"
                    )}
                  >
                    <span className="flex-shrink-0">{React.cloneElement(link.icon, { className: "h-5 w-5" })}</span>
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className={cn("bg-forensic-800 text-white", !collapsed && "hidden")}>
                  {link.label}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
