
import React from 'react';
import { BarChart2 } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const LegalReports = () => {
  return (
    <PlaceholderPage
      title="Legal Reports"
      description="Case reports, evidence documentation, and legal analytics for case management."
      icon={<BarChart2 className="h-8 w-8 text-forensic-court" />}
    />
  );
};

export default LegalReports;
