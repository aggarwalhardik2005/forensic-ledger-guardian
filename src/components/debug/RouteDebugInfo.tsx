import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const RouteDebugInfo = () => {
  const routes = [
    // Core Routes
    {
      path: "/",
      description: "Landing Page",
      protected: false,
      roles: "Public",
    },
    {
      path: "/dashboard",
      description: "Main Dashboard",
      protected: true,
      roles: "All Authenticated",
    },

    // Role-specific Dashboard Routes
    {
      path: "/dashboard/court",
      description: "Court Dashboard",
      protected: true,
      roles: "Court",
    },
    {
      path: "/dashboard/officer",
      description: "Officer Dashboard",
      protected: true,
      roles: "Officer",
    },
    {
      path: "/dashboard/forensic",
      description: "Forensic Dashboard",
      protected: true,
      roles: "Forensic",
    },
    {
      path: "/dashboard/lawyer",
      description: "Lawyer Dashboard",
      protected: true,
      roles: "Lawyer",
    },

    // General Routes
    {
      path: "/cases",
      description: "Cases List",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/cases/:caseId",
      description: "Case Details",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/evidence",
      description: "Evidence Management",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/upload",
      description: "Upload Evidence",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/verify",
      description: "Verify Evidence",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/help",
      description: "Help & Documentation",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/help/faq",
      description: "FAQ Page",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/settings",
      description: "User Settings",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/activity",
      description: "Activity Log",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/wallet",
      description: "Wallet Management",
      protected: true,
      roles: "All Authenticated",
    },

    // FIR Routes
    {
      path: "/fir",
      description: "FIR Management",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/fir/new",
      description: "Create New FIR",
      protected: true,
      roles: "All Authenticated",
    },

    // Court Role Specific Routes
    {
      path: "/users/manage",
      description: "User Management",
      protected: true,
      roles: "Court",
    },
    {
      path: "/users/add",
      description: "Add User",
      protected: true,
      roles: "Court",
    },
    {
      path: "/users/roles",
      description: "Role Management",
      protected: true,
      roles: "Court",
    },
    {
      path: "/settings/security",
      description: "System Configuration",
      protected: true,
      roles: "Court",
    },
    {
      path: "/reports",
      description: "Reports & Analytics",
      protected: true,
      roles: "Court",
    },
    {
      path: "/cases/create",
      description: "Create Case",
      protected: true,
      roles: "Court, Officer",
    },
    {
      path: "/cases/approval",
      description: "Case Approval",
      protected: true,
      roles: "Court",
    },

    // Officer Role Specific Routes
    {
      path: "/cases/update",
      description: "Update Cases",
      protected: true,
      roles: "Officer",
    },
    {
      path: "/cases/assigned",
      description: "Assigned Cases",
      protected: true,
      roles: "Officer",
    },
    {
      path: "/evidence/confirm",
      description: "Evidence Confirmation",
      protected: true,
      roles: "Officer, Forensic",
    },
    {
      path: "/officer/reports",
      description: "Officer Reports",
      protected: true,
      roles: "Officer",
    },

    // Forensic Role Specific Routes
    {
      path: "/evidence/analysis",
      description: "Evidence Analysis",
      protected: true,
      roles: "Forensic",
    },
    {
      path: "/evidence/verify",
      description: "Technical Verification",
      protected: true,
      roles: "Forensic",
    },
    {
      path: "/forensic/reports",
      description: "Forensic Reports",
      protected: true,
      roles: "Forensic",
    },

    // Lawyer Role Specific Routes
    {
      path: "/legal/documentation",
      description: "Legal Documentation",
      protected: true,
      roles: "Lawyer",
    },
    {
      path: "/verify/custody",
      description: "Chain of Custody",
      protected: true,
      roles: "Lawyer, Court",
    },
    {
      path: "/legal/reports",
      description: "Legal Reports",
      protected: true,
      roles: "Lawyer",
    },
    {
      path: "/cases/prepare",
      description: "Court Preparation",
      protected: true,
      roles: "Lawyer",
    },
    {
      path: "/clients",
      description: "Client Management",
      protected: true,
      roles: "Lawyer",
    },
    {
      path: "/meetings",
      description: "Meeting Management",
      protected: true,
      roles: "Lawyer",
    },

    // Help Routes
    {
      path: "/help/metamask",
      description: "MetaMask Help",
      protected: true,
      roles: "All Authenticated",
    },
    {
      path: "/help/court/case-management",
      description: "Court Case Management Guide",
      protected: true,
      roles: "Court",
    },
    {
      path: "/help/court/security",
      description: "Court Security Guide",
      protected: true,
      roles: "Court",
    },
    {
      path: "/help/court/permissions",
      description: "Court Permissions Guide",
      protected: true,
      roles: "Court",
    },
    {
      path: "/help/forensic/analysis",
      description: "Forensic Analysis Guide",
      protected: true,
      roles: "Forensic",
    },
    {
      path: "/help/forensic/blockchain",
      description: "Forensic Blockchain Guide",
      protected: true,
      roles: "Forensic",
    },
    {
      path: "/help/custody",
      description: "Chain of Custody Guide",
      protected: true,
      roles: "All Authenticated",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Route Debug Information</CardTitle>
          <CardDescription>
            Complete overview of all application routes and their access
            requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {routes.map((route, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <Link
                      to={route.path}
                      className="font-mono text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      {route.path}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                    <span className="text-sm text-gray-600">
                      {route.description}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={route.protected ? "default" : "secondary"}>
                    {route.protected ? "Protected" : "Public"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {route.roles}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteDebugInfo;
