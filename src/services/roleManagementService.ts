import { supabase } from "@/lib/supabaseClient";
import { Role } from "@/services/web3Service";

export interface RoleAssignment {
  id: string;
  wallet_address: string;
  role: Role;
  role_name: string;
  assigned_by: string;
  assigned_at: string;
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: Role;
  role_title: string;
  address?: string;
  is_court_admin: boolean;
}

class RoleManagementService {
  /**
   * Check if a wallet address is already assigned to a role
   */
  async isWalletAssigned(walletAddress: string): Promise<boolean> {
    if (!supabase) {
      console.warn("Supabase not available, assuming wallet not assigned");
      return false;
    }

    try {
      const { data, error } = await supabase
        .from("role_assignments")
        .select("wallet_address")
        .eq("wallet_address", walletAddress.toLowerCase())
        .eq("is_active", true)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error checking wallet assignment:", error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error("Error checking wallet assignment:", error);
      return false;
    }
  }

  /**
   * Get role for a wallet address
   */
  async getRoleForWallet(walletAddress: string): Promise<Role> {
    if (!supabase) {
      console.warn("Supabase not available, returning Role.None");
      return Role.None;
    }

    try {
      const { data, error } = await supabase
        .from("role_assignments")
        .select("role")
        .eq("wallet_address", walletAddress.toLowerCase())
        .eq("is_active", true)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows returned
          return Role.None;
        }
        console.error("Error getting role for wallet:", error);
        return Role.None;
      }

      return data?.role || Role.None;
    } catch (error) {
      console.error("Error getting role for wallet:", error);
      return Role.None;
    }
  }

  /**
   * Assign wallet address to a role (only court can do this)
   */
  async assignWalletToRole(
    walletAddress: string,
    role: Role,
    assignedBy: string
  ): Promise<boolean> {
    if (!supabase) return false;

    try {
      // First check if wallet is already assigned
      const isAssigned = await this.isWalletAssigned(walletAddress);
      if (isAssigned) {
        throw new Error("Wallet address is already assigned to a role");
      }

      const roleName = this.getRoleName(role);

      const { error } = await supabase.from("role_assignments").insert([
        {
          wallet_address: walletAddress.toLowerCase(),
          role: role,
          role_name: roleName,
          assigned_by: assignedBy,
          is_active: true,
        },
      ]);

      if (error) {
        console.error("Error assigning wallet to role:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error assigning wallet to role:", error);
      return false;
    }
  }

  /**
   * Revoke wallet assignment (only court can do this)
   */
  async revokeWalletAssignment(walletAddress: string): Promise<boolean> {
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from("role_assignments")
        .update({ is_active: false })
        .eq("wallet_address", walletAddress.toLowerCase());

      if (error) {
        console.error("Error revoking wallet assignment:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error revoking wallet assignment:", error);
      return false;
    }
  }

  /**
   * Get all active role assignments
   */
  async getAllRoleAssignments(): Promise<RoleAssignment[]> {
    if (!supabase) {
      console.warn("Supabase not available, returning empty assignments");
      return [];
    }

    try {
      const { data, error } = await supabase
        .from("role_assignments")
        .select("*")
        .eq("is_active", true)
        .order("assigned_at", { ascending: false });

      if (error) {
        console.error("Error getting role assignments:", error);
        // If table doesn't exist, return empty array
        if (error.code === "42P01") {
          console.warn("role_assignments table does not exist yet");
          return [];
        }
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Error getting role assignments:", error);
      return [];
    }
  }

  /**
   * Update user profile with wallet address
   */
  async linkWalletToProfile(
    userId: string,
    walletAddress: string
  ): Promise<boolean> {
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ address: walletAddress.toLowerCase() })
        .eq("id", userId);

      if (error) {
        console.error("Error linking wallet to profile:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error linking wallet to profile:", error);
      return false;
    }
  }

  /**
   * Get user profile by email
   */
  async getUserProfileByEmail(email: string): Promise<UserProfile | null> {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        console.error("Error getting user profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  }

  /**
   * Create initial court admin profile
   */
  async createCourtAdminProfile(
    userId: string,
    email: string,
    name: string
  ): Promise<boolean> {
    if (!supabase) return false;

    try {
      // First, try to insert the profile
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: userId,
          email: email,
          name: name,
          role: Role.Court,
          role_title: "Court Administrator",
          is_court_admin: true,
        },
      ]);

      if (insertError) {
        console.error("Error creating court admin profile:", insertError);

        // If it's an RLS policy error, try to work around it
        if (
          insertError.code === "42501" ||
          insertError.message?.includes("policy")
        ) {
          console.warn(
            "RLS policy preventing profile creation. This might need database policy updates."
          );
          // For now, return false and handle it in the calling code
          return false;
        }

        return false;
      }

      console.log("Court admin profile created successfully");
      return true;
    } catch (error) {
      console.error("Error creating court admin profile:", error);
      return false;
    }
  }

  /**
   * Get role name string
   */
  private getRoleName(role: Role): string {
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
        return "None";
    }
  }

  /**
   * Check if user is court admin
   */
  async isCourtAdmin(userId: string): Promise<boolean> {
    if (!supabase) {
      console.warn("Supabase not available for court admin check");
      return false;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("is_court_admin, role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error checking court admin status:", error);
        // If table doesn't exist, return false
        if (error.code === "42P01") {
          console.warn("profiles table does not exist yet");
          return false;
        }
        // If no profile found, return false
        if (error.code === "PGRST116") {
          console.warn("No profile found for user:", userId);
          return false;
        }
        return false;
      }

      return data?.is_court_admin && data?.role === Role.Court;
    } catch (error) {
      console.error("Error checking court admin status:", error);
      return false;
    }
  }
}

export const roleManagementService = new RoleManagementService();
