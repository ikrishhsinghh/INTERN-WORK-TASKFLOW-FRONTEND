import React from 'react';
import { g7Logo, taskflowIcon } from '../../assets/branding';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#EEF2F6] dark:border-slate-800 bg-white/70 dark:bg-[#1E2530]/70 backdrop-blur-xs py-6 px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Branding & Description */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <img
            src={taskflowIcon}
            alt="TASKFLOW"
            className="w-7 h-7 rounded-lg object-contain shrink-0 hidden sm:block"
          />
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100">
                TASKFLOW
              </span>
              <span className="text-[11px] text-slate-400 font-medium">|</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                A smarter way to organise tasks and manage productivity.
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Designed & Developed by Internship Team G7.
            </p>
          </div>
        </div>

        {/* Right: G7 Team Logo & Copyright */}
        <div className="flex items-center gap-3">
          <img
            src={g7Logo}
            alt="Team G7 Logo"
            className="h-8 w-auto object-contain rounded-md shadow-2xs"
          />
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            © 2026 TASKFLOW | Internship Team G7. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
