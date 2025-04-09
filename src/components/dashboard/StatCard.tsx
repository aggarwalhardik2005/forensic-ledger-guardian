
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  linkTo: string;
  highlight?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  linkTo,
  highlight = false 
}) => {
  return (
    <Link to={linkTo}>
      <Card className={cn(
        "transition-all duration-200 hover:shadow-md border-l-4",
        highlight ? "border-l-forensic-danger" : "border-l-transparent"
      )}>
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-1">
            <p className="text-sm font-medium text-forensic-500">{title}</p>
            <p className="text-2xl font-bold text-forensic-800">{value}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-full",
              highlight ? "bg-forensic-danger/10" : "bg-forensic-200"
            )}>
              {icon}
            </div>
            <ArrowUpRight className="h-4 w-4 text-forensic-400" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StatCard;
