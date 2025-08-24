/**
 * Route definitions for Officer role
 */
import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RoleProtectedRoute from '@/components/auth/RoleProtectedRoute';
import { Role } from '@/services/web3Service';

// Officer-specific pages
import FIRManagement from '@/pages/officer/FIRManagement';
import EvidenceConfirmation from '@/pages/officer/EvidenceConfirmation';
import OfficerReports from '@/pages/officer/Reports';
import Cases from '@/pages/Cases';

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
          <RoleProtectedRoute allowedRoles={[Role.Officer]}>
            <FIRManagement mode="create" />
          </RoleProtectedRoute>
        </Layout>
      }
    />
    
    {/* Case Management */}
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
    
    {/* Evidence Management */}
    <Route
      path="/evidence/confirm"
      element={
        <Layout>
          <RoleProtectedRoute allowedRoles={[Role.Officer]}>
            <EvidenceConfirmation />
          </RoleProtectedRoute>
        </Layout>
      }
    />
    
    {/* Reports */}
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
  </>
);