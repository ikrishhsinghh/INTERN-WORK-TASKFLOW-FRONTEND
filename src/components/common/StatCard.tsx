import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  iconBgColor = 'bg-[#ECF2FF] dark:bg-blue-950/60',
  iconColor = 'text-[#5D87FF] dark:text-[#5D87FF]',
  subtext,
}) => {
  return (
    <div className="spike-card p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-400 uppercase">
          {title}
        </span>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${iconBgColor} ${iconColor} transition-transform hover:scale-105`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2.5">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {value}
        </div>

        {change && (
          <span
            className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
              changeType === 'positive'
                ? 'bg-[#E6FFFA] text-[#13DEB9] dark:bg-emerald-950/50'
                : changeType === 'negative'
                ? 'bg-[#FDEEEB] text-[#FA896B] dark:bg-rose-950/50'
                : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
            }`}
          >
            {changeType === 'positive' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {changeType === 'negative' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          {subtext}
        </p>
      )}
    </div>
  );
};
