import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/services/web3Service";
import {
  Shield,
  Users,
  FileText,
  Gavel,
  Search,
  UserCheck,
} from "lucide-react";

const RoleAuthenticationGuide = () => {
  const roleInfo = [
    {
      role: Role.Court,
      title: "Court Official",
      icon: <Gavel className="h-5 w-5" />,
      color: "bg-forensic-court text-white",
      description: "Highest level access with administrative privileges",
      permissions: [
        "Create and approve cases",
        "Manage user accounts and roles",
        "Access system configuration",
        "Generate comprehensive reports",
        "Oversee all forensic evidence",
        "Manage court proceedings",
      ],
      dashboardFeatures: [
        "User Management Dashboard",
        "Case Approval Workflows",
        "System Analytics",
        "Role Assignment Tools",
        "Security Configuration",
      ],
    },
    {
      role: Role.Officer,
      title: "Police Officer",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-forensic-800 text-white",
      description:
        "Field officer with evidence collection and case management access",
      permissions: [
        "Create new cases and FIRs",
        "Upload and manage evidence",
        "Confirm evidence collection",
        "Update case information",
        "Access assigned cases",
        "Generate officer reports",
      ],
      dashboardFeatures: [
        "Case Creation Tools",
        "Evidence Upload Interface",
        "FIR Management System",
        "Case Assignment View",
        "Field Report Generator",
      ],
    },
    {
      role: Role.Forensic,
      title: "Forensic Expert",
      icon: <Search className="h-5 w-5" />,
      color: "bg-forensic-accent text-white",
      description: "Technical expert with evidence analysis capabilities",
      permissions: [
        "Analyze forensic evidence",
        "Perform technical verification",
        "Confirm evidence authenticity",
        "Generate forensic reports",
        "Access evidence analysis tools",
        "Review chain of custody",
      ],
      dashboardFeatures: [
        "Evidence Analysis Workbench",
        "Technical Verification Tools",
        "Forensic Report Builder",
        "Evidence Timeline View",
        "Chain of Custody Tracker",
      ],
    },
    {
      role: Role.Lawyer,
      title: "Legal Counsel",
      icon: <FileText className="h-5 w-5" />,
      color: "bg-forensic-warning text-forensic-900",
      description:
        "Legal professional with case preparation and documentation access",
      permissions: [
        "Access legal documentation",
        "Verify chain of custody",
        "Prepare court materials",
        "Manage client information",
        "Generate legal reports",
        "Schedule meetings",
      ],
      dashboardFeatures: [
        "Legal Document Builder",
        "Client Management System",
        "Court Preparation Tools",
        "Meeting Scheduler",
        "Legal Report Generator",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-forensic-accent" />
            Role-Based Authentication System
          </CardTitle>
          <CardDescription>
            The Forensic Ledger Guardian uses MetaMask wallet addresses to
            authenticate users based on their assigned roles in the blockchain.
            Only authorized personnel can access the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                How It Works:
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
                <li>Connect your MetaMask wallet to the application</li>
                <li>
                  System checks your wallet address against the smart contract
                </li>
                <li>
                  Your assigned role determines dashboard access and permissions
                </li>
                <li>
                  Unauthorized wallets (Role.None) are automatically blocked
                </li>
                <li>
                  Role-specific features and pages are protected from
                  unauthorized access
                </li>
              </ol>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">
                Access Control:
              </h4>
              <p className="text-red-800 text-sm">
                Guest users and unauthorized wallet addresses cannot sign in.
                Only wallets with assigned roles (Court, Officer, Forensic,
                Lawyer) registered in the smart contract are permitted access.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {roleInfo.map((info) => (
          <Card key={info.role} className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {info.icon}
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </div>
                <Badge className={info.color}>Role {info.role}</Badge>
              </div>
              <CardDescription>{info.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2 text-forensic-700">
                  Permissions:
                </h4>
                <ul className="text-sm space-y-1">
                  {info.permissions.map((permission, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-forensic-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 text-forensic-700">
                  Dashboard Features:
                </h4>
                <ul className="text-sm space-y-1">
                  {info.dashboardFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleAuthenticationGuide;
