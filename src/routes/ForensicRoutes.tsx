/**
 * Route definitions for Forensic role
 */
import { Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SecureRoute from '@/components/auth/SecureRoute';
import { Role } from '@/services/web3Service';

// Forensic-specific pages
import EvidenceAnalysis from '@/pages/forensic/EvidenceAnalysis';
import TechnicalVerification from '@/pages/forensic/TechnicalVerification';
import ForensicReports from '@/pages/forensic/Reports';

/**
 * Routes exclusively for Forensic role
 */
export const ForensicRoutes = () => (
  <>
    {/* Evidence Analysis */}
    <Route
      path="/evidence/analyze"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Forensic]} requireAuth={true}>
            <EvidenceAnalysis />
          </SecureRoute>
        </Layout>
      }
    />
    
    {/* Technical Verification */}
    <Route
      path="/technical/verify"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Forensic]} requireAuth={true}>
            <TechnicalVerification />
          </SecureRoute>
        </Layout>
      }
    />
    
    {/* Reports */}
    <Route
      path="/forensic/reports"
      element={
        <Layout>
          <SecureRoute allowedRoles={[Role.Forensic]} requireAuth={true}>
            <ForensicReports />
          </SecureRoute>
        </Layout>
      }
    />
  </>
);