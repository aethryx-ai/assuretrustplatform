import React from 'react';
import { cn } from '../lib/utils';
import { RiskLevel } from '../types';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, className }) => {
  const styles = {
    LOW: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    MEDIUM: 'bg-amber-100 text-amber-700 border-amber-200',
    HIGH: 'bg-orange-100 text-orange-700 border-orange-200',
    CRITICAL: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <span className={cn(
      'px-2 py-0.5 rounded-full text-xs font-semibold border uppercase tracking-wider',
      styles[level],
      className
    )}>
      {level}
    </span>
  );
};
