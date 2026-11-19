import React from 'react';
import { Plus } from 'lucide-react';
import { CalendarView } from '../../components/calendar/CalendarView';
import { Task } from '../../types';

interface CalendarPageProps {
  onViewTask: (task: Task) => void;
  onAddTaskWithDate: (date: string) => void;
  onOpenAddTask: () => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({
  onViewTask,
  onAddTaskWithDate,
  onOpenAddTask,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Calendar Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Visualize deadlines and scheduled tasks across monthly, weekly, and daily views
          </p>
        </div>

        <button
          onClick={onOpenAddTask}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs shadow-blue-600/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add Event / Task
        </button>
      </div>

      {/* Calendar Interactive Component */}
      <CalendarView
        onViewTask={onViewTask}
        onAddTaskWithDate={onAddTaskWithDate}
      />
    </div>
  );
};
