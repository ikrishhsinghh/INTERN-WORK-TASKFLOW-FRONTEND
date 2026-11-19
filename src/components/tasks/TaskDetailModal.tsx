import React from 'react';
import {
  Calendar,
  Clock,
  Tag,
  User,
  CheckCircle2,
  Copy,
  Edit3,
  Trash2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Task, TaskPriority, TaskStatus } from '../../types';
import { useTask } from '../../context/TaskContext';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
  onEdit,
  onDelete,
}) => {
  const { toggleTaskComplete, duplicateTask, moveTaskStatus } = useTask();

  if (!task) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = task.status !== 'Completed' && task.dueDate < todayStr;
  const isCompleted = task.status === 'Completed';

  const priorityStyles: Record<TaskPriority, { bg: string; text: string; border: string }> = {
    Low: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-300',
      border: 'border-slate-200 dark:border-slate-700',
    },
    Medium: {
      bg: 'bg-blue-50 dark:bg-blue-950/60',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-200 dark:border-blue-900',
    },
    High: {
      bg: 'bg-amber-50 dark:bg-amber-950/60',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-900',
    },
    Urgent: {
      bg: 'bg-rose-50 dark:bg-rose-950/60',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-200 dark:border-rose-900',
    },
  };

  const statusStyles: Record<TaskStatus, { bg: string; text: string; dot: string }> = {
    'To Do': {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-700 dark:text-slate-300',
      dot: 'bg-slate-400',
    },
    'In Progress': {
      bg: 'bg-blue-50 dark:bg-blue-950/60',
      text: 'text-blue-700 dark:text-blue-300',
      dot: 'bg-blue-500',
    },
    'In Review': {
      bg: 'bg-purple-50 dark:bg-purple-950/60',
      text: 'text-purple-700 dark:text-purple-300',
      dot: 'bg-purple-500',
    },
    Completed: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/60',
      text: 'text-emerald-700 dark:text-emerald-300',
      dot: 'bg-emerald-500',
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" maxWidth="xl">
      <div className="space-y-5">
        {/* Header badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                statusStyles[task.status].bg
              } ${statusStyles[task.status].text}`}
            >
              <span className={`w-2 h-2 rounded-full ${statusStyles[task.status].dot}`} />
              {task.status}
            </span>

            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                priorityStyles[task.priority].bg
              } ${priorityStyles[task.priority].text} ${priorityStyles[task.priority].border}`}
            >
              {task.priority} Priority
            </span>

            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {task.category}
            </span>
          </div>

          {isOverdue && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900/50">
              <AlertTriangle className="w-3.5 h-3.5" />
              Overdue
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 leading-snug">
            {task.title}
          </h2>
        </div>

        {/* Description */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800">
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {task.description || 'No description provided for this task.'}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="font-medium text-slate-500 dark:text-slate-400">Deadline: </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {task.dueDate} {task.dueTime ? `at ${task.dueTime}` : ''}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="font-medium text-slate-500 dark:text-slate-400">Created: </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
            <User className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="font-medium text-slate-500 dark:text-slate-400">Assignee: </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {task.assignedTo || task.ownerName}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="font-medium text-slate-500 dark:text-slate-400">Estimate: </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {task.estimatedHours || 4} hours
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  <Tag className="w-3 h-3 text-slate-400" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Status Transition Quick Selector */}
        <div className="pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Update Workflow Status
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['To Do', 'In Progress', 'In Review', 'Completed'] as TaskStatus[]).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => moveTaskStatus(task.id, st)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all text-center ${
                  task.status === st
                    ? 'border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                toggleTaskComplete(task.id);
                onClose();
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
                isCompleted
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 hover:bg-amber-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs shadow-emerald-600/30'
              }`}
            >
              {isCompleted ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reopen Task
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mark Complete
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                duplicateTask(task.id);
                onClose();
              }}
              className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              Duplicate
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(task);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onDelete(task);
              }}
              className="px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
