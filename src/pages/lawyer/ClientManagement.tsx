
import React from 'react';
import { Users } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

interface ClientManagementProps {
  view?: 'clients' | 'meetings';
}

const ClientManagement: React.FC<ClientManagementProps> = ({ view = 'clients' }) => {
  const titles = {
    clients: "Client Management",
    meetings: "Client Meetings"
  };
  
  const descriptions = {
    clients: "Manage client information, cases, and representation details.",
    meetings: "Schedule and manage client meetings and consultations."
  };

  return (
    <PlaceholderPage
      title={titles[view]}
      description={descriptions[view]}
      icon={<Users className="h-8 w-8 text-forensic-evidence" />}
    />
  );
};

export default ClientManagement;
