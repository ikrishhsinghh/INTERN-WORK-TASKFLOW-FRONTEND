import React from 'react';
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
  TrendingUp,
  Calendar,
  CheckCircle,
  Circle,
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { StatCard } from '../../components/common/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';
import { Task, TaskStatus } from '../../types';

interface DashboardOverviewProps {
  onOpenAddTask: () => void;
  onViewTask: (task: Task) => void;
  onNavigate: (page: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onOpenAddTask,
  onViewTask,
  onNavigate,
}) => {
  const { currentUser } = useAuth();
  const {
    tasks,
    stats,
    todayTasks,
    upcomingTasks,
    activityLogs,
    toggleTaskComplete,
  } = useTask();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const todayFormatted = new Date().toLocaleDateString('default', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const weeklyData = [
    { day: 'Mon', completed: 3, created: 4 },
    { day: 'Tue', completed: 5, created: 3 },
    { day: 'Wed', completed: 4, created: 6 },
    { day: 'Thu', completed: 7, created: 5 },
    { day: 'Fri', completed: 6, created: 4 },
    { day: 'Sat', completed: 2, created: 1 },
    { day: 'Sun', completed: 1, created: 2 },
  ];
  const maxWeekly = 8;

  const statusColors: Record<TaskStatus, string> = {
    'To Do': '#94a3b8',
    'In Progress': '#5D87FF',
    'In Review': '#49BEFF',
    Completed: '#13DEB9',
  };

  return (
    <div className="space-y-6">
      {/* 1. Spike Signature Welcome / Hero Card */}
      <div className="spike-card p-6 sm:p-8 bg-gradient-to-r from-white via-[#F8FAFC] to-[#F0F5FF] dark:from-[#1E2530] dark:via-[#1A222E] dark:to-[#172033] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300">
              Sprint 4 Active
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {todayFormatted}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {getGreeting()}, {currentUser?.name || 'Alex'}!
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Here's what is happening with your tasks today. You have <strong className="text-slate-800 dark:text-slate-200">{todayTasks.length} tasks scheduled</strong> and <strong className="text-[#FA896B]">{stats.overdue} overdue milestone</strong> requiring attention.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onOpenAddTask}
              className="px-5 py-2.5 bg-[#5D87FF] hover:bg-[#4570EA] active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-[#5D87FF]/25 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Quick Add Task
            </button>
            <button
              onClick={() => onNavigate('kanban')}
              className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-[#EEF2F6] dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              Open Kanban Board
            </button>
          </div>
        </div>

        {/* Right: Circular Target Completion Widget */}
        <div className="p-4.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-[#EEF2F6] dark:border-slate-700 shadow-xs flex items-center gap-5 w-full lg:w-auto">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-700"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#5D87FF]"
                strokeDasharray={`${stats.completionRate}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-slate-900 dark:text-white">
              {stats.completionRate}%
            </span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sprint Velocity
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {stats.completed} of {stats.total} Done
            </div>
            <span className="text-[11px] font-semibold text-[#13DEB9] flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +14.8% vs last sprint
            </span>
          </div>
        </div>
      </div>

      {/* 2. 4 Spike-Style KPI Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          change="+12% this week"
          changeType="positive"
          icon={ListTodo}
          iconBgColor="bg-[#ECF2FF] dark:bg-blue-950/60"
          iconColor="text-[#5D87FF]"
          subtext="Active across all domains"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          change={`${stats.completionRate}% rate`}
          changeType="positive"
          icon={CheckCircle2}
          iconBgColor="bg-[#E6FFFA] dark:bg-emerald-950/60"
          iconColor="text-[#13DEB9]"
          subtext="Successfully resolved"
        />

        <StatCard
          title="In Progress"
          value={stats.pending}
          change="3 in review"
          changeType="neutral"
          icon={Clock}
          iconBgColor="bg-[#FEF5E5] dark:bg-amber-950/60"
          iconColor="text-[#FFAE1F]"
          subtext="Active sprint queue"
        />

        <StatCard
          title="Overdue Tasks"
          value={stats.overdue}
          change={stats.overdue > 0 ? 'Requires action' : 'Zero backlog'}
          changeType={stats.overdue > 0 ? 'negative' : 'positive'}
          icon={AlertTriangle}
          iconBgColor="bg-[#FDEEEB] dark:bg-rose-950/60"
          iconColor="text-[#FA896B]"
          subtext="Exceeded scheduled SLA"
        />
      </div>

      {/* 3. Two-Column Charts Section (Spike Architecture) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Weekly Velocity Bar Chart */}
        <div className="lg:col-span-2 spike-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Task Completion Velocity
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tasks created vs completed over the current 7-day period
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5D87FF]" />
                <span className="text-slate-600 dark:text-slate-300">Created</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#13DEB9]" />
                <span className="text-slate-600 dark:text-slate-300">Completed</span>
              </div>
            </div>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {weeklyData.map((d) => {
              const createdHeight = (d.created / maxWeekly) * 100;
              const completedHeight = (d.completed / maxWeekly) * 100;

              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-40">
                    <div
                      style={{ height: `${createdHeight}%` }}
                      className="w-3 sm:w-5 bg-[#5D87FF]/80 hover:bg-[#5D87FF] rounded-t-md transition-all duration-300"
                    />
                    <div
                      style={{ height: `${completedHeight}%` }}
                      className="w-3 sm:w-5 bg-[#13DEB9]/80 hover:bg-[#13DEB9] rounded-t-md transition-all duration-300"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Workflow Status Donut */}
        <div className="spike-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
              Workflow Distribution
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Breakdown across all 4 stages
            </p>

            <div className="space-y-3.5 pt-2">
              {[
                { label: 'To Do', count: tasks.filter((t) => t.status === 'To Do').length, color: '#94a3b8' },
                { label: 'In Progress', count: tasks.filter((t) => t.status === 'In Progress').length, color: '#5D87FF' },
                { label: 'In Review', count: tasks.filter((t) => t.status === 'In Review').length, color: '#49BEFF' },
                { label: 'Completed', count: tasks.filter((t) => t.status === 'Completed').length, color: '#13DEB9' },
              ].map((st) => {
                const pct = stats.total > 0 ? Math.round((st.count / stats.total) * 100) : 0;
                return (
                  <div key={st.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: st.color }} />
                        {st.label}
                      </span>
                      <span className="text-slate-500">
                        {st.count} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#F4F6FA] dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pct}%`, backgroundColor: st.color }}
                        className="h-full rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onNavigate('analytics')}
            className="mt-6 w-full py-2 text-xs font-bold text-[#5D87FF] bg-[#ECF2FF] dark:bg-blue-950/60 rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
          >
            Explore Productivity Report <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Today's Tasks & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="spike-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Today's Priority Agenda
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Tasks due before end of day
              </p>
            </div>
            <button
              onClick={() => onNavigate('tasks')}
              className="text-xs font-bold text-[#5D87FF] hover:underline flex items-center gap-1"
            >
              All Tasks <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todayTasks.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No tasks scheduled for today
              </div>
            ) : (
              todayTasks.slice(0, 4).map((task) => {
                const isDone = task.status === 'Completed';

                return (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-[#EEF2F6] dark:border-slate-800 bg-[#FBFBFE] dark:bg-slate-800/40 hover:bg-[#F4F6FA] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => toggleTaskComplete(task.id)}
                        className="text-slate-400 hover:text-[#13DEB9] transition-colors shrink-0"
                      >
                        {isDone ? (
                          <CheckCircle className="w-5 h-5 text-[#13DEB9]" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>

                      <div className="min-w-0">
                        <h4
                          onClick={() => onViewTask(task)}
                          className={`text-xs sm:text-sm font-bold truncate cursor-pointer hover:text-[#5D87FF] ${
                            isDone ? 'line-through text-slate-400' : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span>{task.category}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-600 dark:text-slate-300">
                            {task.dueTime || '17:00'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300">
                        {task.priority}
                      </span>
                      <button
                        onClick={() => onViewTask(task)}
                        className="p-1.5 text-slate-400 hover:text-[#5D87FF] rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="spike-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Recent Workspace Activity
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time operational event stream
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#13DEB9] bg-[#E6FFFA] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              Live
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto">
            {activityLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F4F6FA] dark:hover:bg-slate-800/50 transition-colors text-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 flex items-center justify-center font-bold text-xs shrink-0">
                  {log.actor.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 dark:text-slate-300 leading-snug">
                    <strong className="text-slate-900 dark:text-slate-100">{log.actor}</strong>{' '}
                    {log.action} <span className="font-semibold text-[#5D87FF]">"{log.target}"</span>
                  </p>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {new Date(log.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
