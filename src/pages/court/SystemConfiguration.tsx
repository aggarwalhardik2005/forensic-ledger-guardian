
import React from 'react';
import { Settings } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const SystemConfiguration = () => {
  return (
    <PlaceholderPage
      title="System Configuration"
      description="Emergency lock controls, system parameter configuration, and security settings."
      icon={<Settings className="h-8 w-8 text-forensic-warning" />}
    />
  );
};

export default SystemConfiguration;
