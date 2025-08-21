// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import { Role } from "@/services/web3Service";
// DEV MODE: Only import devAuth in component scope to avoid Fast Refresh error

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  roleTitle: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithWallet: (walletAddress: string, userRole: Role) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // DEV MODE: auto-login as officer
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      const localUser = localStorage.getItem("forensicLedgerUser");
      if (localUser) {
        setUser(JSON.parse(localUser));
      } else {
        import("./devAuth").then(({ DEV_OFFICER_USER }) => {
          setUser(DEV_OFFICER_USER);
          localStorage.setItem(
            "forensicLedgerUser",
            JSON.stringify(DEV_OFFICER_USER)
          );
        });
      }
    }
  }, []);

  console.log("AuthProvider initialized");

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!supabase) {
      toast({
        title: "Application Not Configured",
        description: "Supabase environment variables are missing.",
        variant: "destructive",
      });
      return false;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log("Login response:", data);
    console.log("Login error:", error);
    if (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }

    toast({
      title: "Login Successful",
      description: `Welcome back, ${email}`,
    });

    if (data.user) {
      await loadUserProfile(data.user.id, email);
    }
    navigate("/dashboard");
    return true;
  };

  // Wallet-based authentication
  const loginWithWallet = async (
    walletAddress: string,
    userRole: Role
  ): Promise<boolean> => {
    try {
      // Validate that the user has a valid role (not a guest user)
      if (userRole === Role.None) {
        toast({
          title: "Access Denied",
          description:
            "Your wallet address is not authorized to access this system. Please contact an administrator.",
          variant: "destructive",
        });
        return false;
      }

      // Create a user object based on wallet address and role
      const getRoleTitle = (role: Role): string => {
        switch (role) {
          case Role.Court:
            return "Court Official";
          case Role.Officer:
            return "Police Officer";
          case Role.Forensic:
            return "Forensic Expert";
          case Role.Lawyer:
            return "Legal Counsel";
          default:
            return "Unauthorized User";
        }
      };

      // Get the route path based on user role
      const getRoleDashboardPath = (role: Role): string => {
        // For now, all roles go to the main dashboard which will show role-specific content
        // In the future, we could have separate dashboard routes if needed
        return "/dashboard";
      };

      const walletUser: User = {
        id: `wallet-${walletAddress}`,
        email: `${walletAddress}@wallet.local`,
        name: `${getRoleTitle(userRole)} (${walletAddress.substring(
          0,
          6
        )}...${walletAddress.substring(walletAddress.length - 4)})`,
        role: userRole,
        roleTitle: getRoleTitle(userRole),
        address: walletAddress,
      };

      setUser(walletUser);
      localStorage.setItem("forensicLedgerUser", JSON.stringify(walletUser));

      toast({
        title: "Authentication Successful",
        description: `Welcome to the Forensic Ledger Guardian, ${getRoleTitle(
          userRole
        )}!`,
      });

      // Navigate to the appropriate dashboard
      const dashboardPath = getRoleDashboardPath(userRole);
      navigate(dashboardPath);
      return true;
    } catch (error) {
      console.error("Wallet authentication error:", error);
      toast({
        title: "Authentication Failed",
        description: "Could not authenticate with wallet. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const mapRoleStringToEnum = (roleString: string): Role => {
    switch (roleString.toLowerCase()) {
      case "court":
        return Role.Court;
      case "officer":
        return Role.Officer;
      case "forensic":
        return Role.Forensic;
      case "lawyer":
        return Role.Lawyer;
      default:
        return Role.None;
    }
  };

  const loadUserProfile = React.useCallback(
    async (userId: string, email: string) => {
      if (!supabase) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("name, role, role_title, address")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        return null;
      }

      const fullUser: User = {
        id: userId,
        email,
        name: data.name,
        role: mapRoleStringToEnum(data.role),
        roleTitle: data.role_title,
        address: data.address || undefined,
      };

      setUser(fullUser);
      localStorage.setItem("forensicLedgerUser", JSON.stringify(fullUser));
      return fullUser;
    },
    []
  );

  useEffect(() => {
    if (import.meta.env.MODE === "development" || !supabase) {
      setIsLoading(false);
      return;
    }
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Loading user profile:", { data });
      if (data.session?.user) {
        await loadUserProfile(
          data.session.user.id,
          data.session.user.email || ""
        );
      }
      setIsLoading(false);
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user.id, session.user.email || "");
        } else {
          setUser(null);
          localStorage.removeItem("forensicLedgerUser");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [loadUserProfile]);

  const logout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem("forensicLedgerUser");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithWallet,
        logout,
        isLoggedIn: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
