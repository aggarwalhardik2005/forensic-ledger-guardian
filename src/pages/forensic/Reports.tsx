
import React from 'react';
import { BarChart2 } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const ForensicReports = () => {
  return (
    <PlaceholderPage
      title="Forensic Reports"
      description="Technical reports and analytics for evidence processing and verification metrics."
      icon={<BarChart2 className="h-8 w-8 text-forensic-accent" />}
    />
  );
};

export default ForensicReports;
