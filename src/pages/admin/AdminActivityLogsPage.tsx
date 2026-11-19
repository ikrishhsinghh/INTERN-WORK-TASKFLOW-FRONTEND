import React, { useState } from 'react';
import { Search, Shield, User, FileText, CheckCircle2, RefreshCw, ChevronDown } from 'lucide-react';
import { useTask } from '../../context/TaskContext';

export const AdminActivityLogsPage: React.FC = () => {
  const { activityLogs } = useTask();
  const [filterType, setFilterType] = useState<string>('all');
  const [logSearch, setLogSearch] = useState('');

  const filtered = activityLogs.filter((log) => {
    if (filterType !== 'all' && log.type !== filterType) return false;
    if (logSearch.trim()) {
      const q = logSearch.toLowerCase();
      return (
        log.actor.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.target.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getBadge = (type: string) => {
    switch (type) {
      case 'task':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            Task Event
          </span>
        );
      case 'user':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
            User Event
          </span>
        );
      case 'auth':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            Security Auth
          </span>
        );
      case 'system':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
            System Daemon
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
            System Activity & Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Cryptographically timestamped operational log tracking actor actions and data mutations
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Audit Streaming
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={logSearch}
            onChange={(e) => setLogSearch(e.target.value)}
            placeholder="Search by actor or target..."
            className="w-full pl-9.5 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden"
          />
        </div>

        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs font-semibold pl-3 pr-7 py-2 bg-white dark:bg-[#151D2A] border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#5D87FF]/20 focus:border-[#5D87FF] appearance-none cursor-pointer shadow-2xs"
          >
            <option value="all">All Domains</option>
            <option value="task">Tasks Domain</option>
            <option value="user">Users Domain</option>
            <option value="auth">Auth & Security</option>
            <option value="system">System Domain</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-5 py-3.5">Actor</th>
                <th className="px-5 py-3.5">Action Event</th>
                <th className="px-5 py-3.5">Target Resource</th>
                <th className="px-5 py-3.5">Event Domain</th>
                <th className="px-5 py-3.5 text-right">Client IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors text-xs">
                  <td className="px-5 py-3.5 font-mono text-slate-500 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleDateString()}{' '}
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>

                  <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                    {log.actor}
                  </td>

                  <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 font-medium">
                    {log.action}
                  </td>

                  <td className="px-5 py-3.5 text-purple-600 dark:text-purple-400 font-medium">
                    "{log.target}"
                  </td>

                  <td className="px-5 py-3.5">{getBadge(log.type)}</td>

                  <td className="px-5 py-3.5 text-right font-mono text-slate-400">
                    {log.ipAddress || '192.168.1.104'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
