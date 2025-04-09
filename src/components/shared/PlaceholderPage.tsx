
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description,
  icon
}) => {
  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-forensic-800 mb-6">{title}</h1>
      
      <Card className="border-dashed">
        <CardHeader className="flex flex-row items-center gap-4">
          {icon || <AlertTriangle className="h-8 w-8 text-forensic-warning" />}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-forensic-600">
            This page is currently under development. The feature is outlined in the UI/UX plan
            and will be implemented in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
