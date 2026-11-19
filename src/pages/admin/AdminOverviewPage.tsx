import React from 'react';
import {
  Users,
  UserCheck,
  Layers,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Shield,
  Activity,
  Plus,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { useTask } from '../../context/TaskContext';

interface AdminOverviewProps {
  onNavigate: (page: string) => void;
  onOpenAddUser: () => void;
}

export const AdminOverviewPage: React.FC<AdminOverviewProps> = ({
  onNavigate,
  onOpenAddUser,
}) => {
  const { users, tasks, stats, activityLogs } = useTask();

  const activeUsers = users.filter((u) => u.status === 'Active').length;

  // Monthly registrations mock data
  const registrationTrend = [
    { month: 'Oct', users: 18 },
    { month: 'Nov', users: 26 },
    { month: 'Dec', users: 34 },
    { month: 'Jan', users: 48 },
    { month: 'Feb', users: 62 },
    { month: 'Mar', users: 85 },
  ];

  const maxUsers = 100;

  return (
    <div className="space-y-6">
      {/* Admin Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-600/80 text-purple-100 border border-purple-400/40">
              Admin Console
            </span>
            <span className="text-xs text-purple-300">Organization Master Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            TASKFLOW Enterprise Health
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Global monitoring for team productivity, user accounts, and system-wide task execution
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('admin-reports')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl border border-slate-700 transition-colors"
          >
            Export Audit Report
          </button>
          <button
            onClick={onOpenAddUser}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs shadow-purple-600/40 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Member
          </button>
        </div>
      </div>

      {/* 6 Key Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Total Users"
          value={users.length}
          change="+2 new"
          changeType="positive"
          icon={Users}
          iconBgColor="bg-purple-50 dark:bg-purple-950/60"
          iconColor="text-purple-600 dark:text-purple-400"
          subtext="Registered accounts"
        />

        <StatCard
          title="Active Users"
          value={activeUsers}
          change="92% active"
          changeType="positive"
          icon={UserCheck}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
          subtext="Authorized & active"
        />

        <StatCard
          title="Total Tasks"
          value={stats.total}
          change="+15% MoM"
          changeType="positive"
          icon={Layers}
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconColor="text-blue-600 dark:text-blue-400"
          subtext="Across all teams"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          change={`${stats.completionRate}% rate`}
          changeType="positive"
          icon={CheckCircle2}
          iconBgColor="bg-teal-50 dark:bg-teal-950/60"
          iconColor="text-teal-600 dark:text-teal-400"
          subtext="Sprint velocity high"
        />

        <StatCard
          title="Pending Queue"
          value={stats.pending}
          change="In progress"
          changeType="neutral"
          icon={Clock}
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
          subtext="Active workloads"
        />

        <StatCard
          title="Overdue Tasks"
          value={stats.overdue}
          change={stats.overdue > 0 ? 'Urgent triage' : '0 delayed'}
          changeType={stats.overdue > 0 ? 'negative' : 'positive'}
          icon={AlertTriangle}
          iconBgColor="bg-rose-50 dark:bg-rose-950/60"
          iconColor="text-rose-600 dark:text-rose-400"
          subtext="Breached deadlines"
        />
      </div>

      {/* User Growth & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                User Registration Growth
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                New enterprise accounts onboarded over past 6 months
              </p>
            </div>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
              +42% Growth
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-4 pt-6 px-2">
            {registrationTrend.map((d) => {
              const heightPct = (d.users / maxUsers) * 100;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.users}
                  </span>
                  <div className="w-full flex justify-center items-end h-40">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-5 sm:w-7 bg-purple-600/80 hover:bg-purple-600 rounded-t-lg transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Task Distribution Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                System Workflow Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Execution status across all departments
              </p>
            </div>
            <button
              onClick={() => onNavigate('admin-tasks')}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              All Tasks <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5 pt-2">
            {[
              {
                label: 'To Do (Backlog)',
                count: tasks.filter((t) => t.status === 'To Do').length,
                color: 'bg-slate-400',
              },
              {
                label: 'In Progress (Active Execution)',
                count: tasks.filter((t) => t.status === 'In Progress').length,
                color: 'bg-blue-500',
              },
              {
                label: 'In Review (QA / Approval)',
                count: tasks.filter((t) => t.status === 'In Review').length,
                color: 'bg-purple-500',
              },
              {
                label: 'Completed (Verified Done)',
                count: tasks.filter((t) => t.status === 'Completed').length,
                color: 'bg-emerald-500',
              },
            ].map((item) => {
              const pct = stats.total > 0 ? Math.round((item.count / stats.total) * 100) : 0;
              return (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {item.label}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {item.count} tasks ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pct}%` }}
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Users & Admin Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registered Users */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Registered Workspace Members
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Active team members and roles
              </p>
            </div>
            <button
              onClick={() => onNavigate('admin-users')}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              Manage Users <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {users.slice(0, 4).map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {u.name}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {u.department} • {u.email}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      u.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : u.status === 'Suspended'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800'
                    }`}
                  >
                    {u.status}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {u.role === 'admin' ? 'Admin' : 'Member'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Administrative Audit Activity */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Administrative Activity Logs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time security and operational events
              </p>
            </div>
            <button
              onClick={() => onNavigate('admin-logs')}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              View Full Logs <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {activityLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-xs"
              >
                <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-slate-100">{log.actor}</strong>{' '}
                    {log.action} <span className="font-medium text-purple-600 dark:text-purple-400">"{log.target}"</span>
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                    <span>
                      {new Date(log.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span>IP: {log.ipAddress || '192.168.1.104'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
