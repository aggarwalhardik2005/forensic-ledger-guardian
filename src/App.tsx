import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleProtectedRoute from "./components/auth/RoleProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import Evidence from "./pages/Evidence";
import Upload from "./pages/Upload";
import Verify from "./pages/Verify";
import Help from "./pages/Help";
import FAQ from "./pages/help/Faq";
import NotFound from "./pages/NotFound";
import { Web3Provider } from "./contexts/Web3Context";
import Settings from "./pages/Settings";
import Activity from "./pages/Activity";

// FIR pages
import FIR from "./pages/fir/Fir";

// Court role specific pages
import UserManagement from "./pages/users/Manage";
import RoleManagement from "./pages/court/RoleManagement";
import SystemConfiguration from "./pages/court/SystemConfiguration";
import ReportsAnalytics from "./pages/court/ReportsAnalytics";
import CreateCase from "./pages/cases/CreateCase";
import CasesApproval from "./pages/cases/CasesApproval";
import CaseDetail from "./pages/cases/CaseDetail";
import AddUser from "./pages/users/AddUser";

// Officer role specific pages
import FIRManagement from "./pages/officer/FIRManagement";
import EvidenceConfirmation from "./pages/officer/EvidenceConfirmation";
import OfficerReports from "./pages/officer/Reports";

// Forensic role specific pages
import EvidenceAnalysis from "./pages/forensic/EvidenceAnalysis";
import TechnicalVerification from "./pages/forensic/TechnicalVerification";
import ForensicReports from "./pages/forensic/Reports";

// Lawyer role specific pages
import LegalDocumentation from "./pages/lawyer/LegalDocumentation";
import ChainOfCustodyVerification from "./pages/lawyer/ChainOfCustodyVerification";
import LegalReports from "./pages/lawyer/Reports";
import CourtPreparation from "./pages/lawyer/CourtPreparation";
import ClientManagement from "./pages/lawyer/ClientManagement";
import EvidenceComponent from "./components/EvidenceComponent";
import WalletManagement from "./pages/WalletManagement";
import MetaMaskHelp from "./pages/help/MetaMaskHelp";
import RouteDebugInfo from "./components/debug/RouteDebugInfo";
import { Role } from "./services/web3Service";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Web3Provider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* <Route path="/" element={<EvidenceComponent/>} /> */}
            <Route path="/" element={<Index />} />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* Role-specific dashboard routes - for future use or direct navigation */}
            <Route
              path="/dashboard/court"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <Dashboard />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/dashboard/officer"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Officer]}>
                    <Dashboard />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/dashboard/forensic"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Forensic]}>
                    <Dashboard />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/dashboard/lawyer"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Lawyer]}>
                    <Dashboard />
                  </RoleProtectedRoute>
                </Layout>
              }
            />

            <Route
              path="/cases"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Cases />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/cases/:caseId"
              element={
                <Layout>
                  <ProtectedRoute>
                    <CaseDetail />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/evidence"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Evidence />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/upload"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Upload />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/verify"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Verify />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/help"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/help/faq"
              element={
                <Layout>
                  <ProtectedRoute>
                    <FAQ />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/activity"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Activity />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* FIR routes */}
            <Route
              path="/fir"
              element={
                <Layout>
                  <ProtectedRoute>
                    <FIR />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/fir/new"
              element={
                <Layout>
                  <ProtectedRoute>
                    <FIRManagement mode="create" />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* Court role specific routes - Only accessible by Court Officials */}
            <Route
              path="/users/manage"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <UserManagement />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/users/add"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <AddUser />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/users/roles"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <RoleManagement />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/settings/security"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <SystemConfiguration />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/reports"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <ReportsAnalytics />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/cases/create"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court, Role.Officer]}>
                    <CreateCase />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/cases/approval"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <CasesApproval />
                  </RoleProtectedRoute>
                </Layout>
              }
            />

            {/* Officer role specific routes - Only accessible by Police Officers */}
            <Route
              path="/cases/update"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Officer]}>
                    <Cases />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/cases/assigned"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Officer]}>
                    <Cases />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/evidence/confirm"
              element={
                <Layout>
                  <RoleProtectedRoute
                    allowedRoles={[Role.Officer, Role.Forensic]}
                  >
                    <EvidenceConfirmation />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/officer/reports"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Officer]}>
                    <OfficerReports />
                  </RoleProtectedRoute>
                </Layout>
              }
            />

            {/* Forensic role specific routes - Only accessible by Forensic Experts */}
            <Route
              path="/evidence/analysis"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Forensic]}>
                    <EvidenceAnalysis />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/evidence/verify"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Forensic]}>
                    <TechnicalVerification />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/forensic/reports"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Forensic]}>
                    <ForensicReports />
                  </RoleProtectedRoute>
                </Layout>
              }
            />

            {/* Lawyer role specific routes - Only accessible by Legal Counsel */}
            <Route
              path="/legal/documentation"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Lawyer]}>
                    <LegalDocumentation />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/verify/custody"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Lawyer, Role.Court]}>
                    <ChainOfCustodyVerification />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/legal/reports"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Lawyer]}>
                    <LegalReports />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/cases/prepare"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Lawyer]}>
                    <CourtPreparation />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/clients"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Lawyer]}>
                    <ClientManagement />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/meetings"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Lawyer]}>
                    <ClientManagement view="meetings" />
                  </RoleProtectedRoute>
                </Layout>
              }
            />

            {/* Wallet Management Routes */}
            <Route
              path="/wallet"
              element={
                <Layout>
                  <ProtectedRoute>
                    <WalletManagement />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/help/metamask"
              element={
                <Layout>
                  <ProtectedRoute>
                    <MetaMaskHelp />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* Help sub-routes for role-specific guides */}
            <Route
              path="/help/court/case-management"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <Help />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/help/court/security"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <Help />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/help/court/permissions"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Court]}>
                    <Help />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/help/forensic/analysis"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Forensic]}>
                    <Help />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/help/forensic/blockchain"
              element={
                <Layout>
                  <RoleProtectedRoute allowedRoles={[Role.Forensic]}>
                    <Help />
                  </RoleProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/help/custody"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* Debug route - only for development */}
            {import.meta.env.MODE === "development" && (
              <Route
                path="/debug/routes"
                element={
                  <Layout>
                    <ProtectedRoute>
                      <RouteDebugInfo />
                    </ProtectedRoute>
                  </Layout>
                }
              />
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Web3Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
