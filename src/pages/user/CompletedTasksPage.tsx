import React, { useState } from 'react';
import {
  CheckCircle2,
  RotateCcw,
  Calendar,
  Eye,
  Trash2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { Task } from '../../types';

interface CompletedTasksPageProps {
  onViewTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export const CompletedTasksPage: React.FC<CompletedTasksPageProps> = ({
  onViewTask,
  onDeleteTask,
}) => {
  const { tasks, toggleTaskComplete } = useTask();
  const [categoryFilter, setCategoryFilter] = useState('All');

  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const filteredCompleted = completedTasks.filter((t) =>
    categoryFilter === 'All' ? true : t.category === categoryFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
            Completed Tasks
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              {completedTasks.length} Done
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Archive of resolved milestones, deliverables, and closed tickets
          </p>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Filter Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Research">Research</option>
            <option value="Operations">Operations</option>
            <option value="Productivity">Productivity</option>
          </select>
        </div>
      </div>

      {/* Highlights Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs shadow-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Outstanding Productivity Streak!
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              You have completed {completedTasks.length} tasks this cycle with an average turnaround of 2.4 days.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold">On-Time Rate</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">94.2%</span>
          </div>
          <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Quality Score</span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400 text-base">4.9 / 5.0</span>
          </div>
        </div>
      </div>

      {/* Completed Tasks List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {filteredCompleted.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-400 mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
              No completed tasks found in this view
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Mark tasks as completed from your task list or Kanban board.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredCompleted.map((task) => (
              <div
                key={task.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5 fill-emerald-50 dark:fill-emerald-950/60" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4
                        onClick={() => onViewTask(task)}
                        className="text-sm font-semibold text-slate-900 dark:text-slate-100 line-through opacity-85 hover:text-blue-600 cursor-pointer"
                      >
                        {task.title}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {task.category}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Due {task.dueDate}
                      </span>
                      {task.completedAt && (
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <Clock className="w-3 h-3" /> Closed{' '}
                          {new Date(task.completedAt).toLocaleDateString()}
                        </span>
                      )}
                      <span>Assigned: {task.assignedTo || task.ownerName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => toggleTaskComplete(task.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 rounded-xl transition-colors flex items-center gap-1"
                    title="Move back to To Do"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reopen
                  </button>

                  <button
                    onClick={() => onViewTask(task)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDeleteTask(task)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
