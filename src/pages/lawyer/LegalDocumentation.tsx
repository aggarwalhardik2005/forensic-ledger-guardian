
import React from 'react';
import { ScrollText } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const LegalDocumentation = () => {
  return (
    <PlaceholderPage
      title="Legal Documentation"
      description="Evidence citation tools, case documentation workspace, and legal filing preparation."
      icon={<ScrollText className="h-8 w-8 text-forensic-court" />}
    />
  );
};

export default LegalDocumentation;
