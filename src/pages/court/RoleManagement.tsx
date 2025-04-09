
import React from 'react';
import { UserCog } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const RoleManagement = () => {
  return (
    <PlaceholderPage
      title="Role Management"
      description="Assign users to specific cases with role designation and manage case access permissions."
      icon={<UserCog className="h-8 w-8 text-forensic-court" />}
    />
  );
};

export default RoleManagement;
