import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useTask } from '../../context/TaskContext';

export const AdminReportsPage: React.FC = () => {
  const { users, tasks, stats } = useTask();
  const [reportType, setReportType] = useState<'productivity' | 'sla' | 'workload'>('productivity');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleDownloadCSV = () => {
    const headers = ['User ID', 'Name', 'Department', 'Total Tasks', 'Completed', 'Completion Rate'];
    const rows = users.map((u) => {
      const userTasks = tasks.filter((t) => t.assignedTo === u.name || t.ownerName === u.name);
      const userCompleted = userTasks.filter((t) => t.status === 'Completed').length;
      const rate = userTasks.length > 0 ? Math.round((userCompleted / userTasks.length) * 100) : 0;
      return [u.id, `"${u.name}"`, `"${u.department}"`, userTasks.length, userCompleted, `${rate}%`];
    });

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow_executive_report_${todayStr}.csv`;
    link.click();
  };

  const handleDownloadJSON = () => {
    const data = {
      generatedAt: new Date().toISOString(),
      organization: 'TASKFLOW Enterprise',
      team: 'Internship Team G7',
      kpis: stats,
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        department: u.department,
        status: u.status,
      })),
      tasks: tasks.map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
        priority: t.priority,
        dueDate: t.dueDate,
        assignedTo: t.assignedTo,
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow_system_export_${todayStr}.json`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
            Reports & Data Exports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Generate executive productivity dossiers, SLA compliance audits, and CSV/JSON datasets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCSV}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-purple-600" />
            Download CSV Report
          </button>
          <button
            onClick={handleDownloadJSON}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs shadow-purple-600/30"
          >
            <Download className="w-3.5 h-3.5" />
            Export Raw JSON
          </button>
        </div>
      </div>

      {/* Report Type Selector Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2 text-xs font-semibold">
        {(
          [
            { id: 'productivity', label: 'Member Velocity & Productivity' },
            { id: 'sla', label: 'SLA Delivery & Deadlines' },
            { id: 'workload', label: 'Departmental Workload Balance' },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setReportType(t.id)}
            className={`px-3.5 py-1.5 rounded-xl transition-all ${
              reportType === t.id
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Report Table Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Live Report Preview • Generated for Q4 2026
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Last synced: Today, {new Date().toLocaleTimeString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/60 dark:bg-slate-800/40 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3">Member</th>
                <th className="px-5 py-3">Department</th>
                <th className="px-5 py-3 text-center">Assigned Tasks</th>
                <th className="px-5 py-3 text-center">Completed</th>
                <th className="px-5 py-3">Efficiency Rate</th>
                <th className="px-5 py-3">SLA Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((u) => {
                const userTasks = tasks.filter(
                  (t) => t.assignedTo === u.name || t.ownerName === u.name
                );
                const userCompleted = userTasks.filter((t) => t.status === 'Completed').length;
                const rate =
                  userTasks.length > 0
                    ? Math.round((userCompleted / userTasks.length) * 100)
                    : 0;

                return (
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors text-xs">
                    <td className="px-5 py-3 font-semibold text-slate-900 dark:text-slate-100">
                      {u.name}
                    </td>
                    <td className="px-5 py-3 text-slate-500">{u.department}</td>
                    <td className="px-5 py-3 text-center font-bold text-slate-800 dark:text-slate-200">
                      {userTasks.length}
                    </td>
                    <td className="px-5 py-3 text-center font-bold text-emerald-600">
                      {userCompleted}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${rate}%` }}
                            className="h-full bg-purple-600 rounded-full"
                          />
                        </div>
                        <span className="font-bold">{rate}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                        Compliant
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
