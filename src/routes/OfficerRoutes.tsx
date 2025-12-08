/**
 * Route definitions for Officer role
 */
import { Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SecureRoute from "@/components/auth/SecureRoute";
import { Role } from "@/services/web3Service";

// Officer-specific pages
import FIRManagement from "@/pages/officer/FIRManagement";
import EvidenceConfirmation from "@/pages/officer/EvidenceConfirmation";
import OfficerReports from "@/pages/officer/Reports";
import Cases from "@/pages/Cases";

/**
 * Routes exclusively for Officer role
 */
export const OfficerRoutes = () => (
  <>
    {/* FIR Management */}
    <Route
      path="/fir/new"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Officer]} requireAuth={true}>
            <FIRManagement mode="create" />
          </SecureRoute>
        </Layout>
      }
    />

    {/* Case Management */}
    <Route
      path="/cases/update"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Officer]} requireAuth={true}>
            <Cases />
          </SecureRoute>
        </Layout>
      }
    />
    <Route
      path="/cases/assigned"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Officer]} requireAuth={true}>
            <Cases />
          </SecureRoute>
        </Layout>
      }
    />

    {/* Evidence Management */}
    <Route
      path="/evidence/confirm"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Officer]} requireAuth={true}>
            <EvidenceConfirmation />
          </SecureRoute>
        </Layout>
      }
    />

    {/* Reports */}
    <Route
      path="/officer/reports"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Officer]} requireAuth={true}>
            <OfficerReports />
          </SecureRoute>
        </Layout>
      }
    />
  </>
);
