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
import { roleManagementService } from "@/services/roleManagementService";
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

    if (data.user) {
      const profile = await loadUserProfile(data.user.id, email);

      // If this is the first login and no profile exists, create court admin profile
      if (!profile) {
        const isFirstUser = await checkIfFirstUser();
        if (isFirstUser) {
          const created = await roleManagementService.createCourtAdminProfile(
            data.user.id,
            email,
            "Court Administrator"
          );

          if (created) {
            await loadUserProfile(data.user.id, email);
            toast({
              title: "Welcome!",
              description:
                "Court administrator profile created. Please set up wallet addresses for other roles.",
            });
            navigate("/bootstrap");
            return true;
          }
        } else {
          toast({
            title: "Access Denied",
            description:
              "Your account does not have access to this system. Please contact the administrator.",
            variant: "destructive",
          });
          await supabase.auth.signOut();
          return false;
        }
      }

      toast({
        title: "Login Successful",
        description: `Welcome back, ${email}`,
      });
      navigate("/dashboard");
    }

    return true;
  };

  // Check if this is the first user in the system
  const checkIfFirstUser = async (): Promise<boolean> => {
    if (!supabase) return false;

    try {
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      if (error) {
        console.error("Error checking user count:", error);
        return false;
      }

      return count === 0;
    } catch (error) {
      console.error("Error checking if first user:", error);
      return false;
    }
  };

  // Wallet-based authentication
  const loginWithWallet = async (
    walletAddress: string,
    userRole: Role
  ): Promise<boolean> => {
    try {
      // Create a helper function to get role title
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

      // Get role from database first to ensure consistency
      const dbRole = await roleManagementService.getRoleForWallet(
        walletAddress
      );

      // Use database role if available, otherwise fall back to blockchain role
      const finalRole = dbRole !== Role.None ? dbRole : userRole;

      // Validate that the user has a valid role
      if (finalRole === Role.None) {
        toast({
          title: "Access Denied",
          description:
            "Your wallet address is not authorized to access this system. Please contact an administrator.",
          variant: "destructive",
        });
        return false;
      }

      // If there's a mismatch between blockchain and database roles, warn the user
      if (dbRole !== Role.None && dbRole !== userRole) {
        toast({
          title: "Role Mismatch Detected",
          description: `Using database role: ${getRoleTitle(
            dbRole
          )}. Please ensure blockchain role is updated.`,
          variant: "default",
        });
      }

      const walletUser: User = {
        id: `wallet-${walletAddress}`,
        email: `${walletAddress}@wallet.local`,
        name: `${getRoleTitle(finalRole)} (${walletAddress.substring(
          0,
          6
        )}...${walletAddress.substring(walletAddress.length - 4)})`,
        role: finalRole,
        roleTitle: getRoleTitle(finalRole),
        address: walletAddress,
      };

      setUser(walletUser);
      localStorage.setItem("forensicLedgerUser", JSON.stringify(walletUser));

      toast({
        title: "Authentication Successful",
        description: `Welcome to the Forensic Ledger Guardian, ${getRoleTitle(
          finalRole
        )}!`,
      });

      // Navigate to the appropriate dashboard
      navigate("/dashboard");
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

      try {
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
      } catch (error) {
        console.error("Unexpected error loading user profile:", error);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    if (import.meta.env.MODE === "development" || !supabase) {
      setIsLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        console.log("Loading user profile:", { data, error });

        if (error) {
          console.warn(
            "Session error (possibly expired refresh token):",
            error
          );
          // Clear any invalid session data
          localStorage.removeItem("forensicLedgerUser");
          setUser(null);
        } else if (data.session?.user) {
          await loadUserProfile(
            data.session.user.id,
            data.session.user.email || ""
          );
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        // Clear any invalid session data
        localStorage.removeItem("forensicLedgerUser");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event, session);

        if (event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
          if (!session) {
            setUser(null);
            localStorage.removeItem("forensicLedgerUser");
          }
        }

        if (session?.user) {
          await loadUserProfile(session.user.id, session.user.email || "");
        } else if (!session) {
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
