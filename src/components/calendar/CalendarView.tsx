import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Task, CalendarViewMode, TaskStatus, TaskPriority } from '../../types';
import { useTask } from '../../context/TaskContext';

interface CalendarViewProps {
  onViewTask: (task: Task) => void;
  onAddTaskWithDate: (date: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  onViewTask,
  onAddTaskWithDate,
}) => {
  const { tasks } = useTask();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevPeriod = () => {
    const d = new Date(currentDate);
    if (viewMode === 'month') {
      d.setMonth(d.getMonth() - 1);
    } else if (viewMode === 'week') {
      d.setDate(d.getDate() - 7);
    } else {
      d.setDate(d.getDate() - 1);
    }
    setCurrentDate(d);
  };

  const nextPeriod = () => {
    const d = new Date(currentDate);
    if (viewMode === 'month') {
      d.setMonth(d.getMonth() + 1);
    } else if (viewMode === 'week') {
      d.setDate(d.getDate() + 7);
    } else {
      d.setDate(d.getDate() + 1);
    }
    setCurrentDate(d);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const weekStart = new Date(currentDate);
  const dayOfWeek = weekStart.getDay();
  weekStart.setDate(weekStart.getDate() - dayOfWeek);

  const statusBorder: Record<TaskStatus, string> = {
    'To Do': 'border-l-slate-400',
    'In Progress': 'border-l-[#5D87FF]',
    'In Review': 'border-l-[#49BEFF]',
    Completed: 'border-l-[#13DEB9]',
  };

  // 1. MONTH VIEW
  const renderMonthView = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarCells: { day: number; isCurrentMonth: boolean; dateStr: string }[] = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, daysInPrevMonth - i);
      calendarCells.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        dateStr: prevDate.toISOString().split('T')[0],
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const curr = new Date(year, month, d);
      calendarCells.push({
        day: d,
        isCurrentMonth: true,
        dateStr: curr.toISOString().split('T')[0],
      });
    }

    const remaining = 35 - calendarCells.length > 0 ? 35 - calendarCells.length : 42 - calendarCells.length;
    for (let n = 1; n <= remaining; n++) {
      const nextDate = new Date(year, month + 1, n);
      calendarCells.push({
        day: n,
        isCurrentMonth: false,
        dateStr: nextDate.toISOString().split('T')[0],
      });
    }

    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="spike-card overflow-hidden">
        <div className="grid grid-cols-7 border-b border-[#EEF2F6] dark:border-slate-800 bg-[#F4F6FA]/70 dark:bg-slate-800/50 text-center py-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          {dayLabels.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-[#EEF2F6] dark:divide-slate-800">
          {calendarCells.map((cell, idx) => {
            const isToday = cell.dateStr === todayStr;
            const dayTasks = tasks.filter((t) => t.dueDate === cell.dateStr);

            return (
              <div
                key={idx}
                className={`min-h-[120px] sm:min-h-[140px] p-2 flex flex-col justify-between group transition-colors ${
                  !cell.isCurrentMonth
                    ? 'bg-[#FBFBFE]/40 dark:bg-slate-900/30 text-slate-300'
                    : 'bg-white dark:bg-[#1E2530] hover:bg-[#F4F6FA]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                      isToday
                        ? 'bg-[#5D87FF] text-white shadow-xs'
                        : cell.isCurrentMonth
                        ? 'text-slate-800 dark:text-slate-200'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  >
                    {cell.day}
                  </span>

                  <button
                    type="button"
                    onClick={() => onAddTaskWithDate(cell.dateStr)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-[#5D87FF] rounded-md hover:bg-slate-100 transition-all"
                    title={`Add task on ${cell.dateStr}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1 flex-1 overflow-y-auto max-h-[90px]">
                  {dayTasks.slice(0, 3).map((task) => {
                    const isOverdue = task.status !== 'Completed' && task.dueDate < todayStr;
                    return (
                      <div
                        key={task.id}
                        onClick={() => onViewTask(task)}
                        className={`text-[11px] p-1 px-1.5 rounded-md border-l-2 bg-[#F4F6FA] dark:bg-slate-800/80 hover:bg-[#ECF2FF] transition-colors cursor-pointer truncate font-semibold flex items-center justify-between gap-1 ${
                          statusBorder[task.status]
                        }`}
                      >
                        <span className="truncate text-slate-800 dark:text-slate-200">
                          {task.title}
                        </span>
                        {isOverdue && <AlertTriangle className="w-2.5 h-2.5 text-[#FA896B] shrink-0" />}
                      </div>
                    );
                  })}
                  {dayTasks.length > 3 && (
                    <div
                      onClick={() => {
                        setCurrentDate(new Date(cell.dateStr));
                        setViewMode('day');
                      }}
                      className="text-[10px] font-bold text-[#5D87FF] cursor-pointer hover:underline text-right pr-1"
                    >
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 2. WEEK VIEW
  const renderWeekView = () => {
    const weekDays: { name: string; dayNum: number; dateStr: string; isToday: boolean }[] = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      weekDays.push({
        name: dayNames[i],
        dayNum: d.getDate(),
        dateStr,
        isToday: dateStr === todayStr,
      });
    }

    return (
      <div className="spike-card overflow-hidden">
        <div className="grid grid-cols-7 divide-x divide-[#EEF2F6] dark:divide-slate-800">
          {weekDays.map((col) => {
            const dayTasks = tasks.filter((t) => t.dueDate === col.dateStr);

            return (
              <div key={col.dateStr} className="min-h-[500px] flex flex-col">
                <div
                  className={`p-3 text-center border-b border-[#EEF2F6] dark:border-slate-800 ${
                    col.isToday ? 'bg-[#ECF2FF] dark:bg-blue-950/40' : 'bg-[#F4F6FA]/70 dark:bg-slate-800/40'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    {col.name}
                  </span>
                  <div
                    className={`mt-1 w-8 h-8 mx-auto flex items-center justify-center rounded-full text-xs font-bold ${
                      col.isToday ? 'bg-[#5D87FF] text-white shadow-xs' : 'text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {col.dayNum}
                  </div>
                  <button
                    onClick={() => onAddTaskWithDate(col.dateStr)}
                    className="mt-2 text-[11px] font-bold text-[#5D87FF] hover:underline flex items-center justify-center gap-0.5 mx-auto"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>

                <div className="p-2 space-y-2 flex-1 overflow-y-auto">
                  {dayTasks.length === 0 ? (
                    <div className="h-28 flex items-center justify-center text-xs text-slate-300">
                      No tasks
                    </div>
                  ) : (
                    dayTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onViewTask(task)}
                        className={`p-2.5 rounded-xl border border-[#EEF2F6] dark:border-slate-800 bg-white dark:bg-slate-800 hover:shadow-xs transition-all cursor-pointer border-l-3 ${
                          statusBorder[task.status]
                        }`}
                      >
                        <div className="text-[10px] text-slate-400 font-semibold mb-1">
                          {task.dueTime || 'All Day'}
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                          {task.title}
                        </h5>
                        <div className="mt-1 text-[10px] font-medium text-slate-400">
                          {task.category}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // 3. DAILY VIEW
  const renderDayView = () => {
    const selectedDateStr = currentDate.toISOString().split('T')[0];
    const isToday = selectedDateStr === todayStr;
    const dayTasks = tasks.filter((t) => t.dueDate === selectedDateStr);

    return (
      <div className="spike-card p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EEF2F6] dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-[#5D87FF] uppercase tracking-wider">
              {isToday ? "Today's Schedule" : 'Day Schedule'}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {currentDate.toLocaleDateString('default', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </h3>
          </div>

          <button
            onClick={() => onAddTaskWithDate(selectedDateStr)}
            className="px-4 py-2 bg-[#5D87FF] hover:bg-[#4570EA] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Task for Day
          </button>
        </div>

        {dayTasks.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F4F6FA] dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-400 mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-slate-900 dark:text-slate-100">
              No tasks scheduled for this day
            </p>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Schedule a task to stay organized and meet sprint milestones.
            </p>
            <button
              onClick={() => onAddTaskWithDate(selectedDateStr)}
              className="px-4 py-2 text-xs font-bold text-[#5D87FF] bg-[#ECF2FF] rounded-xl hover:bg-blue-100 transition-colors"
            >
              + Create Scheduled Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dayTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onViewTask(task)}
                className={`p-4 rounded-xl border border-[#EEF2F6] dark:border-slate-800 bg-[#FBFBFE] dark:bg-slate-800/40 hover:bg-white hover:shadow-md transition-all cursor-pointer border-l-4 ${
                  statusBorder[task.status]
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {task.category}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {task.dueTime || '17:00'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {task.title}
                </h4>

                {task.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#EEF2F6]">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {task.priority} Priority
                  </span>
                  <span className="font-bold text-[#5D87FF]">{task.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* Calendar Navigation & Mode Switcher Bar */}
      <div className="spike-card p-4.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={goToToday}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-[#F4F6FA] dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Today
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={prevPeriod}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPeriod}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {viewMode === 'month' && monthName}
            {viewMode === 'week' && `Week of ${weekStart.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}`}
            {viewMode === 'day' && currentDate.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
        </div>

        {/* View Mode Toggle (Spike style) */}
        <div className="flex items-center self-end md:self-auto bg-[#F4F6FA] dark:bg-slate-800 p-1 rounded-xl">
          {(['month', 'week', 'day'] as CalendarViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                viewMode === mode
                  ? 'bg-white dark:bg-slate-900 text-[#5D87FF] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Render selected view */}
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}

      {/* Status Legend */}
      <div className="spike-card px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="font-bold text-slate-700 dark:text-slate-300">
          Workflow Legend:
        </div>
        <div className="flex flex-wrap items-center gap-4 font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>To Do</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5D87FF]" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#49BEFF]" />
            <span>In Review</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#13DEB9]" />
            <span>Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
