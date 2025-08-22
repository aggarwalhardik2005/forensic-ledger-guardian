// authUtils.ts
// Utility functions for authentication management

/**
 * Clears all authentication-related data from localStorage and session storage
 */
export const clearAllAuthData = (): void => {
  localStorage.removeItem("forensicLedgerUser");
  sessionStorage.removeItem("forensicLedgerUser");

  // Clear any wallet connection data if needed
  localStorage.removeItem("walletconnect");
  localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");

  console.log("All authentication data cleared");
};

/**
 * Checks if the current user is a development user
 */
export const isDevUser = (
  user: { id?: string; email?: string } | null
): boolean => {
  return (
    user !== null &&
    (user.id === "dev-officer" || user.email === "officer@dev.local")
  );
};

/**
 * Forces a complete authentication reset
 */
export const forceAuthReset = (): void => {
  clearAllAuthData();

  // Force page reload to reset all state
  window.location.reload();
};
