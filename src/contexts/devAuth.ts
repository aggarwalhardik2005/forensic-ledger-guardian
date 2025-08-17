// devAuth.ts
// Utility to auto-login as officer in development mode
import { Role } from "@/services/web3Service";

export const DEV_OFFICER_USER = {
  id: "dev-officer",
  email: "officer@dev.local",
  name: "Dev Officer",
  role: Role.Officer,
  roleTitle: "Officer",
  address: "0xdevOfficer",
};

export const isDev = () => import.meta.env.MODE === "development";
