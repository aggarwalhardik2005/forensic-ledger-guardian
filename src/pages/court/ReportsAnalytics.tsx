
import React from 'react';
import { BarChart2 } from 'lucide-react';
import PlaceholderPage from '@/components/shared/PlaceholderPage';

const ReportsAnalytics = () => {
  return (
    <PlaceholderPage
      title="Reports & Analytics"
      description="Advanced data visualization and analytics for system-wide oversight and reporting."
      icon={<BarChart2 className="h-8 w-8 text-forensic-court" />}
    />
  );
};

export default ReportsAnalytics;
