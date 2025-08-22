import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { clearAllAuthData, forceAuthReset } from "@/utils/authUtils";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthResetButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const AuthResetButton: React.FC<AuthResetButtonProps> = ({
  variant = "outline",
  size = "sm",
  className = "",
}) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleReset = async () => {
    try {
      toast({
        title: "Resetting Authentication",
        description: "Clearing all session data...",
      });

      // If user is logged in, log them out first
      if (user) {
        await logout();
      }

      // Clear all auth data
      clearAllAuthData();

      // Force complete reset
      setTimeout(() => {
        forceAuthReset();
      }, 500);
    } catch (error) {
      console.error("Error resetting authentication:", error);
      toast({
        title: "Reset Failed",
        description:
          "There was an error resetting authentication. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  };

  // Hide button in production - only show for development mode
  const showButton = import.meta.env.MODE === "development";

  if (!showButton) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleReset}
      className={`flex items-center gap-2 ${className}`}
      title="Reset authentication and clear all session data"
    >
      <RotateCcw className="h-4 w-4" />
      Reset Login
    </Button>
  );
};

export default AuthResetButton;
