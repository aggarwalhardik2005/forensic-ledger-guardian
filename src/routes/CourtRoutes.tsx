/**
 * Route definitions for Court role
 */
import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RoleProtectedRoute from '@/components/auth/RoleProtectedRoute';
import { Role } from '@/services/web3Service';

// Court-specific pages
import UserManagement from '@/pages/users/Manage';
import RoleManagement from '@/pages/court/RoleManagement';
import SystemConfiguration from '@/pages/court/SystemConfiguration';
import ReportsAnalytics from '@/pages/court/ReportsAnalytics';
import CasesApproval from '@/pages/cases/CasesApproval';
import AddUser from '@/pages/users/AddUser';

/**
 * Routes exclusively for Court role
 */
export const CourtRoutes = () => (
  <>
    {/* User Management Routes */}
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
    
    {/* Role Management */}
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
    
    {/* System Configuration */}
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
    
    {/* Reports and Analytics */}
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
    
    {/* Case Management */}
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
  </>
);