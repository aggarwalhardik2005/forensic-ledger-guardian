
import React from 'react';
import { Shield, Hexagon, Eye, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
  className?: string;
}

const Logo = ({ size = 'md', variant = 'full', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-12 w-12'
  };

  const iconSize = {
    sm: { shield: 'h-7 w-7', inner: 'h-4 w-4', eye: 'h-2 w-2', file: 'h-3 w-3' },
    md: { shield: 'h-9 w-9', inner: 'h-5 w-5', eye: 'h-3 w-3', file: 'h-3.5 w-3.5' },
    lg: { shield: 'h-12 w-12', inner: 'h-7 w-7', eye: 'h-4 w-4', file: 'h-5 w-5' }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative flex items-center justify-center">
        {/* Shield base */}
        <Shield 
          className={cn(
            iconSize[size].shield, 
            "text-forensic-800 fill-forensic-800/10 stroke-[1.5]"
          )} 
        />
        
        {/* Blockchain hexagon */}
        <Hexagon 
          className={cn(
            iconSize[size].inner, 
            "absolute text-forensic-500 stroke-[1.5] opacity-80"
          )} 
        />
        
        {/* Eye for investigation */}
        <Eye 
          className={cn(
            iconSize[size].eye, 
            "absolute top-3 text-forensic-accent stroke-[2]"
          )} 
        />
        
        {/* Document icon */}
        <FileText 
          className={cn(
            iconSize[size].file, 
            "absolute bottom-1 right-1 text-white stroke-[2]"
          )} 
        />
      </div>
      
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className="font-bold text-forensic-800 text-sm leading-tight">
            Forensic
          </span>
          <span className="font-bold text-forensic-accent text-sm leading-tight">
            Ledger
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
