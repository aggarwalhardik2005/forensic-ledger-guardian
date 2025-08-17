
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import Evidence from "./pages/Evidence";
import Upload from "./pages/Upload";
import Verify from "./pages/Verify";
import Help from "./pages/Help";
import FAQ from "./pages/help/Faq";
import NotFound from "./pages/NotFound";
import { Web3Provider } from "./contexts/Web3Context";
import { AuthProvider } from "./contexts/AuthContext";
import Settings from "./pages/Settings";
import Activity from "./pages/Activity";

// FIR pages
import FIR from "./pages/fir/Fir";

// Court role specific pages
import UserManagement from "./pages/users/Manage";
import RoleManagement from "./pages/court/RoleManagement";
import SystemConfiguration from "./pages/court/SystemConfiguration";
import AuditLogs from "./pages/court/AuditLogs";
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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
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
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Layout><ProtectedRoute><Dashboard /></ProtectedRoute></Layout>} />
                <Route path="/cases" element={<Layout><ProtectedRoute><Cases /></ProtectedRoute></Layout>} />
                <Route path="/cases/:caseId" element={<Layout><ProtectedRoute><CaseDetail /></ProtectedRoute></Layout>} />
                <Route path="/evidence" element={<Layout><ProtectedRoute><Evidence /></ProtectedRoute></Layout>} />
                <Route path="/upload" element={<Layout><ProtectedRoute><Upload /></ProtectedRoute></Layout>} />
                <Route path="/verify" element={<Layout><ProtectedRoute><Verify /></ProtectedRoute></Layout>} />
                <Route path="/help" element={<Layout><ProtectedRoute><Help /></ProtectedRoute></Layout>} />
                <Route path="/help/faq" element={<Layout><ProtectedRoute><FAQ /></ProtectedRoute></Layout>} />
                <Route path="/settings" element={<Layout><ProtectedRoute><Settings /></ProtectedRoute></Layout>} />
                <Route path="/activity" element={<Layout><ProtectedRoute><Activity /></ProtectedRoute></Layout>} />
                
                {/* FIR routes */}
                <Route path="/fir" element={<Layout><ProtectedRoute><FIR /></ProtectedRoute></Layout>} />
                <Route path="/fir/new" element={<Layout><ProtectedRoute><FIRManagement mode="create" /></ProtectedRoute></Layout>} />
                
                {/* Court role specific routes */}
                <Route path="/users/manage" element={<Layout><ProtectedRoute><UserManagement /></ProtectedRoute></Layout>} />
                <Route path="/users/add" element={<Layout><ProtectedRoute><AddUser /></ProtectedRoute></Layout>} />
                <Route path="/users/roles" element={<Layout><ProtectedRoute><RoleManagement /></ProtectedRoute></Layout>} />
                <Route path="/settings/security" element={<Layout><ProtectedRoute><SystemConfiguration /></ProtectedRoute></Layout>} />
                <Route path="/reports" element={<Layout><ProtectedRoute><ReportsAnalytics /></ProtectedRoute></Layout>} />
                <Route path="/cases/create" element={<Layout><ProtectedRoute><CreateCase /></ProtectedRoute></Layout>} />
                <Route path="/cases/approval" element={<Layout><ProtectedRoute><CasesApproval /></ProtectedRoute></Layout>} />
                
                {/* Officer role specific routes */}
                <Route path="/cases/update" element={<Layout><ProtectedRoute><Cases /></ProtectedRoute></Layout>} />
                <Route path="/cases/assigned" element={<Layout><ProtectedRoute><Cases /></ProtectedRoute></Layout>} />
                <Route path="/evidence/confirm" element={<Layout><ProtectedRoute><EvidenceConfirmation /></ProtectedRoute></Layout>} />
                <Route path="/officer/reports" element={<Layout><ProtectedRoute><OfficerReports /></ProtectedRoute></Layout>} />
                
                {/* Forensic role specific routes */}
                <Route path="/evidence/analysis" element={<Layout><ProtectedRoute><EvidenceAnalysis /></ProtectedRoute></Layout>} />
                <Route path="/evidence/verify" element={<Layout><ProtectedRoute><TechnicalVerification /></ProtectedRoute></Layout>} />
                <Route path="/forensic/reports" element={<Layout><ProtectedRoute><ForensicReports /></ProtectedRoute></Layout>} />
                
                {/* Lawyer role specific routes */}
                <Route path="/legal/documentation" element={<Layout><ProtectedRoute><LegalDocumentation /></ProtectedRoute></Layout>} />
                <Route path="/verify/custody" element={<Layout><ProtectedRoute><ChainOfCustodyVerification /></ProtectedRoute></Layout>} />
                <Route path="/legal/reports" element={<Layout><ProtectedRoute><LegalReports /></ProtectedRoute></Layout>} />
                <Route path="/cases/prepare" element={<Layout><ProtectedRoute><CourtPreparation /></ProtectedRoute></Layout>} />
                <Route path="/clients" element={<Layout><ProtectedRoute><ClientManagement /></ProtectedRoute></Layout>} />
                <Route path="/meetings" element={<Layout><ProtectedRoute><ClientManagement view="meetings" /></ProtectedRoute></Layout>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Web3Provider>
        </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
