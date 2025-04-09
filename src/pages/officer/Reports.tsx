
import React from 'react';
import { BarChart2 } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const OfficerReports = () => {
  return (
    <PlaceholderPage
      title="Officer Reports"
      description="View reports and statistics related to your FIRs, cases, and evidence submissions."
      icon={<BarChart2 className="h-8 w-8 text-forensic-800" />}
    />
  );
};

export default OfficerReports;
