/**
 * Route definitions for Forensic role
 */
import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RoleProtectedRoute from '@/components/auth/RoleProtectedRoute';
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
          <RoleProtectedRoute allowedRoles={[Role.Forensic]}>
            <EvidenceAnalysis />
          </RoleProtectedRoute>
        </Layout>
      }
    />
    
    {/* Technical Verification */}
    <Route
      path="/technical/verify"
      element={
        <Layout>
          <RoleProtectedRoute allowedRoles={[Role.Forensic]}>
            <TechnicalVerification />
          </RoleProtectedRoute>
        </Layout>
      }
    />
    
    {/* Reports */}
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
  </>
);