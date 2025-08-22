import React from 'react';
import RoleDebugger from '@/components/debug/RoleDebugger';

const DebugPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Debug Tools
          </h1>
          <p className="text-gray-600">
            Diagnose and fix role assignment and authentication issues.
          </p>
        </div>
        
        <RoleDebugger />
      </div>
    </div>
  );
};

export default DebugPage;
