
import React from 'react';
import { Gavel } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const CourtPreparation = () => {
  return (
    <PlaceholderPage
      title="Court Preparation"
      description="Prepare case documentation with verified evidence for court proceedings."
      icon={<Gavel className="h-8 w-8 text-forensic-court" />}
    />
  );
};

export default CourtPreparation;
