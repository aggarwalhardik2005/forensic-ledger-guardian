/**
 * Route definitions for Lawyer role
 */
import { Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SecureRoute from '@/components/auth/SecureRoute';
import { Role } from '@/services/web3Service';

// Lawyer-specific pages
import LegalDocumentation from '@/pages/lawyer/LegalDocumentation';
import ChainOfCustodyVerification from '@/pages/lawyer/ChainOfCustodyVerification';
import LegalReports from '@/pages/lawyer/Reports';
import CourtPreparation from '@/pages/lawyer/CourtPreparation';
import ClientManagement from '@/pages/lawyer/ClientManagement';

/**
 * Routes exclusively for Lawyer role
 */
export const LawyerRoutes = () => (
  <>
    {/* Legal Documentation */}
    <Route
      path="/legal/docs"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Lawyer]} requireAuth={true}>
            <LegalDocumentation />
          </SecureRoute>
        </Layout>
      }
    />
    
    {/* Chain of Custody */}
    <Route
      path="/verify/custody"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Lawyer, Role.Court]} requireAuth={true}>
            <ChainOfCustodyVerification />
          </SecureRoute>
        </Layout>
      }
    />
    
    {/* Court Preparation */}
    <Route
      path="/cases/prepare"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Lawyer]} requireAuth={true}>
            <CourtPreparation />
          </SecureRoute>
        </Layout>
      }
    />
    
    {/* Client Management */}
    <Route
      path="/clients"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Lawyer]} requireAuth={true}>
            <ClientManagement />
          </SecureRoute>
        </Layout>
      }
    />
    <Route
      path="/meetings"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Lawyer]} requireAuth={true}>
            <ClientManagement view="meetings" />
          </SecureRoute>
        </Layout>
      }
    />
    
    {/* Reports */}
    <Route
      path="/legal/reports"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Lawyer]} requireAuth={true}>
            <LegalReports />
          </SecureRoute>
        </Layout>
      }
    />
  </>
);