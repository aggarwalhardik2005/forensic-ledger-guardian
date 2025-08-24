import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/services/web3Service";
import { getRoleTitle } from "@/config/roles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  fallbackPath?: string;
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallbackPath = "/dashboard",
}) => {
  const { isLoggedIn, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forensic-accent"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md shadow-lg border-red-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <ShieldAlert className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-xl font-bold text-red-600">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page. This section is
              restricted to:
            </p>
            <div className="space-y-1 mb-4">
              {allowedRoles.map((role) => (
                <div
                  key={role}
                  className="text-sm font-medium text-forensic-accent"
                >
                  {getRoleTitle(role)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Your current role:{" "}
              <span className="font-medium">{user.roleTitle}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
