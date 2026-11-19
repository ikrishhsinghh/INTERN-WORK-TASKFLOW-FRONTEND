import React from 'react';
import { Calendar, Tag, MoreHorizontal, AlertTriangle, Eye, Edit3, Trash2 } from 'lucide-react';
import { Task, TaskPriority, TaskCategory } from '../../types';

interface KanbanCardProps {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({
  task,
  onView,
  onEdit,
  onDelete,
  onDragStart,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = task.status !== 'Completed' && task.dueDate < todayStr;

  const priorityConfig: Record<TaskPriority, { bg: string; text: string; dot: string }> = {
    Low: {
      bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      text: 'text-slate-600',
      dot: 'bg-slate-400',
    },
    Medium: {
      bg: 'bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300',
      text: 'text-[#5D87FF]',
      dot: 'bg-[#5D87FF]',
    },
    High: {
      bg: 'bg-[#FEF5E5] text-[#FFAE1F] dark:bg-amber-950/60 dark:text-amber-300',
      text: 'text-[#FFAE1F]',
      dot: 'bg-[#FFAE1F]',
    },
    Urgent: {
      bg: 'bg-[#FDEEEB] text-[#FA896B] dark:bg-rose-950/60 dark:text-rose-300',
      text: 'text-[#FA896B]',
      dot: 'bg-[#FA896B]',
    },
  };

  const categoryBadgeColors: Record<TaskCategory, string> = {
    Development: 'bg-[#ECF2FF] text-[#5D87FF]',
    Design: 'bg-[#E6FFFA] text-[#13DEB9]',
    Marketing: 'bg-[#FEF5E5] text-[#FFAE1F]',
    Research: 'bg-purple-50 text-purple-600',
    Operations: 'bg-indigo-50 text-indigo-600',
    Productivity: 'bg-[#FDEEEB] text-[#FA896B]',
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="group relative bg-white dark:bg-[#1E2530] rounded-2xl border border-[#EEF2F6] dark:border-slate-800 p-4.5 shadow-xs hover:shadow-md hover:border-[#5D87FF]/50 transition-all duration-150 cursor-grab active:cursor-grabbing select-none"
    >
      {/* Top badges & action menu */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              priorityConfig[task.priority].bg
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig[task.priority].dot}`} />
            {task.priority}
          </span>

          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
              categoryBadgeColors[task.category] || 'bg-slate-100 text-slate-600'
            }`}
          >
            {task.category}
          </span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors opacity-60 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(false);
                }}
              />
              <div className="absolute right-0 top-7 z-40 w-36 bg-white dark:bg-[#1E2530] border border-[#EEF2F6] dark:border-slate-800 rounded-xl shadow-xl py-1 text-xs animate-in fade-in zoom-in-95">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    onView(task);
                  }}
                  className="w-full px-3 py-1.5 text-left text-slate-700 dark:text-slate-300 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  View
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    onEdit(task);
                  }}
                  className="w-full px-3 py-1.5 text-left text-slate-700 dark:text-slate-300 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                  Edit
                </button>
                <div className="my-1 border-t border-[#EEF2F6] dark:border-slate-800" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(false);
                    onDelete(task);
                  }}
                  className="w-full px-3 py-1.5 text-left text-[#FA896B] hover:bg-[#FDEEEB] flex items-center gap-2 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5 text-[#FA896B]" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <h4
        onClick={() => onView(task)}
        className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-[#5D87FF] transition-colors line-clamp-2 leading-snug cursor-pointer"
      >
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2.5">
          {task.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F4F6FA] dark:bg-slate-800 text-slate-500"
            >
              <Tag className="w-2.5 h-2.5 text-slate-400" />
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer: Date & Assignee Avatar */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#EEF2F6] dark:border-slate-800 text-xs">
        <div
          className={`flex items-center gap-1 font-semibold ${
            isOverdue ? 'text-[#FA896B]' : 'text-slate-400'
          }`}
        >
          {isOverdue ? (
            <AlertTriangle className="w-3.5 h-3.5 text-[#FA896B]" />
          ) : (
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span>{task.dueDate}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#ECF2FF] text-[#5D87FF] font-bold text-[10px] flex items-center justify-center">
            {task.assignedTo?.charAt(0) || 'A'}
          </div>
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
            {task.assignedTo?.split(' ')[0] || 'Alex'}
          </span>
        </div>
      </div>
    </div>
  );
};
