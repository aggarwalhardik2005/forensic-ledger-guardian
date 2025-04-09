
import React from 'react';
import { CheckCircle } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const EvidenceConfirmation = () => {
  return (
    <PlaceholderPage
      title="Evidence Confirmation"
      description="Review and confirm evidence submitted to your assigned cases."
      icon={<CheckCircle className="h-8 w-8 text-forensic-accent" />}
    />
  );
};

export default EvidenceConfirmation;
