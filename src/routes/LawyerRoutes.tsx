/**
 * Route definitions for Lawyer role
 */
import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RoleProtectedRoute from '@/components/auth/RoleProtectedRoute';
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
          <RoleProtectedRoute allowedRoles={[Role.Lawyer]}>
            <LegalDocumentation />
          </RoleProtectedRoute>
        </Layout>
      }
    />
    
    {/* Chain of Custody */}
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
    
    {/* Court Preparation */}
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
    
    {/* Client Management */}
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
    
    {/* Reports */}
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
  </>
);