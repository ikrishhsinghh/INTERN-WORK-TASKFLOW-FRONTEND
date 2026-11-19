import React, { useState } from 'react';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Download,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { ProductivityCharts } from '../../components/analytics/ProductivityCharts';
import { useTask } from '../../context/TaskContext';

export const AnalyticsPage: React.FC = () => {
  const { stats } = useTask();
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Productivity Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time performance metrics, sprint burn-down, and domain throughput
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time range selector */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1 text-xs font-semibold">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '7d'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '30d'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('quarter')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === 'quarter'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              This Quarter
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Download or Print Report"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
        <StatCard
          title="Total Tasks Created"
          value={stats.total}
          change="+18%"
          changeType="positive"
          icon={ListTodo}
          iconBgColor="bg-blue-50 dark:bg-blue-950/60"
          iconColor="text-blue-600 dark:text-blue-400"
          subtext="Volume across sprint cycle"
        />

        <StatCard
          title="Total Tasks Completed"
          value={stats.completed}
          change={`${stats.completionRate}% throughput`}
          changeType="positive"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/60"
          iconColor="text-emerald-600 dark:text-emerald-400"
          subtext="Resolved and verified"
        />

        <StatCard
          title="Active Backlog"
          value={stats.pending}
          change="On track"
          changeType="neutral"
          icon={Clock}
          iconBgColor="bg-amber-50 dark:bg-amber-950/60"
          iconColor="text-amber-600 dark:text-amber-400"
          subtext="Tasks in progress & review"
        />

        <StatCard
          title="Overdue Tasks"
          value={stats.overdue}
          change={stats.overdue > 0 ? 'Requires attention' : 'Zero backlog'}
          changeType={stats.overdue > 0 ? 'negative' : 'positive'}
          icon={AlertTriangle}
          iconBgColor="bg-rose-50 dark:bg-rose-950/60"
          iconColor="text-rose-600 dark:text-rose-400"
          subtext="High urgency SLA watch"
        />
      </div>

      {/* Charts Module */}
      <ProductivityCharts />

      {/* Summary Scorecard Box */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Velocity Benchmark: High Efficiency
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Current completion velocity exceeds team targets by 14.8%. Excellent sprint cadence.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            SLA Rating: 98.4%
          </span>
        </div>
      </div>
    </div>
  );
};
