import React from 'react';
import { Plus } from 'lucide-react';
import { TaskFilters } from '../../components/tasks/TaskFilters';
import { TaskTable } from '../../components/tasks/TaskTable';
import { Task } from '../../types';

interface MyTasksPageProps {
  onAddTask: () => void;
  onViewTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export const MyTasksPage: React.FC<MyTasksPageProps> = ({
  onAddTask,
  onViewTask,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            My Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage, schedule, and track all your tasks with advanced filters
          </p>
        </div>

        <button
          onClick={onAddTask}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs shadow-blue-600/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Create Task
        </button>
      </div>

      {/* Filters Bar */}
      <TaskFilters />

      {/* Task Table */}
      <TaskTable
        onViewTask={onViewTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onAddTask={onAddTask}
      />
    </div>
  );
};
