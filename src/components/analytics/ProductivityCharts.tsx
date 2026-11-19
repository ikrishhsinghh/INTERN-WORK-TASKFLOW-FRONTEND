import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { TaskStatus, TaskPriority, TaskCategory } from '../../types';

export const ProductivityCharts: React.FC = () => {
  const { tasks, stats } = useTask();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Status distribution
  const statusCounts: Record<TaskStatus, number> = {
    'To Do': tasks.filter((t) => t.status === 'To Do').length,
    'In Progress': tasks.filter((t) => t.status === 'In Progress').length,
    'In Review': tasks.filter((t) => t.status === 'In Review').length,
    Completed: tasks.filter((t) => t.status === 'Completed').length,
  };

  const statusColors: Record<TaskStatus, string> = {
    'To Do': '#94a3b8',
    'In Progress': '#3b82f6',
    'In Review': '#a855f7',
    Completed: '#10b981',
  };

  // Priority distribution
  const priorityCounts: Record<TaskPriority, number> = {
    Urgent: tasks.filter((t) => t.priority === 'Urgent').length,
    High: tasks.filter((t) => t.priority === 'High').length,
    Medium: tasks.filter((t) => t.priority === 'Medium').length,
    Low: tasks.filter((t) => t.priority === 'Low').length,
  };

  const priorityColors: Record<TaskPriority, string> = {
    Urgent: '#f43f5e',
    High: '#f59e0b',
    Medium: '#3b82f6',
    Low: '#94a3b8',
  };

  // Category distribution
  const categories: TaskCategory[] = [
    'Development',
    'Design',
    'Marketing',
    'Research',
    'Operations',
    'Productivity',
  ];

  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: tasks.filter((t) => t.category === cat).length,
    completed: tasks.filter((t) => t.category === cat && t.status === 'Completed').length,
  }));

  // Weekly completion mock trend (Mon - Sun)
  const weeklyData = [
    { day: 'Mon', completed: 3, created: 4 },
    { day: 'Tue', completed: 5, created: 3 },
    { day: 'Wed', completed: 4, created: 6 },
    { day: 'Thu', completed: 7, created: 5 },
    { day: 'Fri', completed: 6, created: 4 },
    { day: 'Sat', completed: 2, created: 1 },
    { day: 'Sun', completed: 1, created: 2 },
  ];

  const maxWeekly = Math.max(...weeklyData.map((d) => Math.max(d.completed, d.created)), 8);

  return (
    <div className="space-y-6">
      {/* Top 2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Completion Trends Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Weekly Task Velocity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tasks created vs tasks completed over the last 7 days
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-slate-600 dark:text-slate-400">Created</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600 dark:text-slate-400">Completed</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-60 flex items-end justify-between gap-3 pt-6 px-2">
            {weeklyData.map((d) => {
              const createdHeight = (d.created / maxWeekly) * 100;
              const completedHeight = (d.completed / maxWeekly) * 100;

              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  {activeTooltip === d.day && (
                    <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] py-1 px-2.5 rounded-lg shadow-lg pointer-events-none whitespace-nowrap">
                      <div>Created: {d.created}</div>
                      <div>Completed: {d.completed}</div>
                    </div>
                  )}

                  <div
                    className="w-full flex items-end justify-center gap-1.5 h-44 cursor-pointer"
                    onMouseEnter={() => setActiveTooltip(d.day)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {/* Created Bar */}
                    <div
                      style={{ height: `${createdHeight}%` }}
                      className="w-3 sm:w-4 bg-blue-500/80 hover:bg-blue-600 rounded-t-md transition-all duration-300"
                    />
                    {/* Completed Bar */}
                    <div
                      style={{ height: `${completedHeight}%` }}
                      className="w-3 sm:w-4 bg-emerald-500/80 hover:bg-emerald-600 rounded-t-md transition-all duration-300"
                    />
                  </div>

                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Distribution Donut & Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Task Status Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Proportion of tasks across workflow states
              </p>
            </div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {stats.completionRate}% Done
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-2">
            {/* SVG Donut */}
            <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="14"
                  className="text-slate-100 dark:text-slate-800"
                />
                {(() => {
                  let accumulatedOffset = 0;
                  const total = stats.total || 1;
                  const circumference = 2 * Math.PI * 38; // ~238.76

                  return (['To Do', 'In Progress', 'In Review', 'Completed'] as TaskStatus[]).map(
                    (st) => {
                      const count = statusCounts[st];
                      const strokeDasharray = `${(count / total) * circumference} ${circumference}`;
                      const strokeDashoffset = -accumulatedOffset;
                      accumulatedOffset += (count / total) * circumference;

                      return (
                        <circle
                          key={st}
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke={statusColors[st]}
                          strokeWidth="14"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500 hover:opacity-90"
                        />
                      );
                    }
                  );
                })()}
              </svg>

              {/* Center Stat */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-slate-50">
                  {stats.total}
                </span>
                <span className="text-[10px] uppercase font-semibold text-slate-400">
                  Total Tasks
                </span>
              </div>
            </div>

            {/* Legend & Count */}
            <div className="space-y-3">
              {(['To Do', 'In Progress', 'In Review', 'Completed'] as TaskStatus[]).map((st) => {
                const count = statusCounts[st];
                const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

                return (
                  <div key={st} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: statusColors[st] }}
                      />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{st}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {count}
                      </span>
                      <span className="text-slate-400 text-[11px] w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 2 Charts: Priority & Category Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Distribution Matrix */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
            Priority Distribution & Urgency
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Monitor workloads by severity level to prevent SLA breaches
          </p>

          <div className="space-y-4">
            {(['Urgent', 'High', 'Medium', 'Low'] as TaskPriority[]).map((prio) => {
              const count = priorityCounts[prio];
              const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

              return (
                <div key={prio} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {prio}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {count} tasks ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      style={{
                        width: `${pct}%`,
                        backgroundColor: priorityColors[prio],
                      }}
                      className="h-full rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Productivity Analysis */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
            Category Productivity Breakdown
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Tasks completed compared to total volume per domain
          </p>

          <div className="space-y-3">
            {categoryCounts.map((cat) => {
              const rate = cat.count > 0 ? Math.round((cat.completed / cat.count) * 100) : 0;

              return (
                <div
                  key={cat.name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {cat.name}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {cat.completed} of {cat.count} completed
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-20 sm:w-28 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${rate}%` }}
                        className="h-full bg-blue-600 rounded-full"
                      />
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300 w-9 text-right">
                      {rate}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
