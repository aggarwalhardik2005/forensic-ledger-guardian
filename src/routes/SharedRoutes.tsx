/**
 * Shared routes accessible by multiple roles or all authenticated users
 */
import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import RoleProtectedRoute from '@/components/auth/RoleProtectedRoute';
import { Role } from '@/services/web3Service';

// Shared pages
import Dashboard from '@/pages/Dashboard';
import Cases from '@/pages/Cases';
import Evidence from '@/pages/Evidence';
import Upload from '@/pages/Upload';
import Verify from '@/pages/Verify';
import Help from '@/pages/Help';
import FAQ from '@/pages/help/Faq';
import Settings from '@/pages/Settings';
import Activity from '@/pages/Activity';
import WalletManagement from '@/pages/WalletManagement';
import MetaMaskHelp from '@/pages/help/MetaMaskHelp';
import CaseDetail from '@/pages/cases/CaseDetail';
import CreateCase from '@/pages/cases/CreateCase';
import FIR from '@/pages/fir/Fir';
import FIRManagement from '@/pages/officer/FIRManagement';

/**
 * Routes accessible by all authenticated users
 */
export const SharedRoutes = () => (
  <>
    {/* Main Dashboard - adapts based on user role */}
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

    {/* Role-specific dashboard routes */}
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

    {/* Cases - shared but filtered by role */}
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

    {/* Case Creation - Court and Officer can create cases */}
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

    {/* Evidence Management */}
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

    {/* FIR Routes - accessible to all but functionality varies by role */}
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

    {/* Help and Documentation */}
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
      path="/help/metamask"
      element={
        <Layout>
          <ProtectedRoute>
            <MetaMaskHelp />
          </ProtectedRoute>
        </Layout>
      }
    />

    {/* User Settings */}
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

    {/* Activity Log */}
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

    {/* Wallet Management */}
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
  </>
);