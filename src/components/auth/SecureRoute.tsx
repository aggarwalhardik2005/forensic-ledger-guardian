import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/services/web3Service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface SecureRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  requireAuth?: boolean;
  fallbackPath?: string;
}

/**
 * SecureRoute: A comprehensive route protection component that ensures:
 * 1. User is authenticated (if requireAuth=true)
 * 2. User has one of the allowed roles (if allowedRoles specified)
 * 3. Proper error handling and loading states
 */
const SecureRoute: React.FC<SecureRouteProps> = ({
  children,
  allowedRoles = [],
  requireAuth = true,
  fallbackPath = "/"
}) => {
  const { user, isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while auth is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-forensic-accent" />
          <p className="text-sm text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if authentication is required but user is not logged in
  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If user is logged in but doesn't have required role access
  if (requireAuth && isLoggedIn && user && allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.includes(user.role);
    const isCourtAdmin = user.role === Role.Court; // Court admins can access everything
    
    if (!hasRequiredRole && !isCourtAdmin) {
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
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                You don't have permission to access this page.
              </p>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-700">Your Role:</p>
                <p className="text-sm text-gray-600">{user.roleTitle}</p>
              </div>

              {allowedRoles.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-700">Required Roles:</p>
                  <div className="text-sm text-blue-600 space-y-1 mt-1">
                    {allowedRoles.map(role => (
                      <div key={role}>{getRoleDisplayName(role)}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => window.history.back()}
                  className="text-sm text-forensic-accent hover:text-forensic-accent/80 underline"
                >
                  Go Back
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  // User has required permissions, render the protected content
  return <>{children}</>;
};

// Helper function to get human-readable role names
function getRoleDisplayName(role: Role): string {
  switch (role) {
    case Role.Court: return 'Court Official';
    case Role.Officer: return 'Police Officer';
    case Role.Forensic: return 'Forensic Expert';
    case Role.Lawyer: return 'Legal Counsel';
    default: return 'Unknown Role';
  }
}

export default SecureRoute;