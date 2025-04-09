
import React from 'react';
import { FileText } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

interface FIRManagementProps {
  mode?: 'view' | 'create' | 'edit';
}

const FIRManagement: React.FC<FIRManagementProps> = ({ mode = 'view' }) => {
  const titles = {
    view: "FIR Management",
    create: "Create New FIR",
    edit: "Edit FIR"
  };
  
  const descriptions = {
    view: "View and manage your First Information Reports.",
    create: "File a new First Information Report with suspect and witness information.",
    edit: "Update an existing First Information Report."
  };

  return (
    <PlaceholderPage
      title={titles[mode]}
      description={descriptions[mode]}
      icon={<FileText className="h-8 w-8 text-forensic-800" />}
    />
  );
};

export default FIRManagement;
