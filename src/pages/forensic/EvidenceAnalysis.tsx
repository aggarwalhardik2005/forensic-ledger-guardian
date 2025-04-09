
import React from 'react';
import { Search } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const EvidenceAnalysis = () => {
  return (
    <PlaceholderPage
      title="Evidence Analysis"
      description="Advanced forensic analysis workspace with technical metadata extraction and evidence relationship mapping."
      icon={<Search className="h-8 w-8 text-forensic-accent" />}
    />
  );
};

export default EvidenceAnalysis;
