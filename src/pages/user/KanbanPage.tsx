import React from 'react';
import { Plus } from 'lucide-react';
import { KanbanBoard } from '../../components/kanban/KanbanBoard';
import { Task, TaskStatus } from '../../types';

interface KanbanPageProps {
  onViewTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onAddTaskToColumn: (status: TaskStatus) => void;
  onOpenAddTask: () => void;
}

export const KanbanPage: React.FC<KanbanPageProps> = ({
  onViewTask,
  onEditTask,
  onDeleteTask,
  onAddTaskToColumn,
  onOpenAddTask,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
            Kanban Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Drag and drop tasks between workflow stages to update team progress
          </p>
        </div>

        <button
          onClick={onOpenAddTask}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs shadow-blue-600/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <KanbanBoard
        onViewTask={onViewTask}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
        onAddTaskToColumn={onAddTaskToColumn}
      />
    </div>
  );
};
