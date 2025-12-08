import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Authentication error handling utility
export function handleAuthError(error: unknown): {
  isTokenError: boolean;
  shouldClearSession: boolean;
  message: string;
} {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : "Unknown error";

  // Check for common authentication errors
  const isRefreshTokenError =
    errorMessage.includes("Refresh Token") ||
    errorMessage.includes("refresh_token") ||
    errorMessage.includes("Invalid Refresh Token");

  const isSessionError =
    errorMessage.includes("session") ||
    errorMessage.includes("expired") ||
    errorMessage.includes("invalid_jwt");

  const isTokenError = isRefreshTokenError || isSessionError;

  return {
    isTokenError,
    shouldClearSession: isTokenError,
    message: isTokenError
      ? "Your session has expired. Please sign in again."
      : errorMessage,
  };
}
