import React, { useState } from 'react';
import { ShieldCheck, Database, Key, Server, Save, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminSettingsPage: React.FC = () => {
  const { showToast } = useToast();

  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [enforceMFA, setEnforceMFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('60');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Admin Settings Saved', 'Enterprise security and system policies updated.', 'success');
  };

  const handleTriggerBackup = () => {
    showToast('Backup Initiated', 'PostgreSQL database snapshot archive generated successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
          Enterprise Admin Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Configure security baselines, session timeouts, automated backups, and system operational parameters
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Security Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Key className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Security & Authentication Policies
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Enforce Multi-Factor Authentication (MFA)
                </div>
                <div className="text-[11px] text-slate-500">
                  Require hardware or TOTP authentication for all administrative actions
                </div>
              </div>
              <input
                type="checkbox"
                checked={enforceMFA}
                onChange={(e) => setEnforceMFA(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Scheduled Automated Cloud Backups
                </div>
                <div className="text-[11px] text-slate-500">
                  Execute incremental snapshots every 6 hours with 30-day retention
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e.target.checked)}
                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Maintenance Lockdown Mode
                </div>
                <div className="text-[11px] text-slate-500">
                  Temporarily disable non-admin logins for core infrastructure upgrades
                </div>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
              />
            </label>
          </div>
        </div>

        {/* Database & System Maintenance */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Database Maintenance & Health
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 gap-3">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                On-Demand Database Snapshot
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Last successful snapshot: 2 hours ago (Size: 14.8 MB)
              </p>
            </div>
            <button
              type="button"
              onClick={handleTriggerBackup}
              className="px-3.5 py-2 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            >
              Trigger Snapshot Now
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs shadow-purple-600/30 transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            Save System Policies
          </button>
        </div>
      </form>
    </div>
  );
};
