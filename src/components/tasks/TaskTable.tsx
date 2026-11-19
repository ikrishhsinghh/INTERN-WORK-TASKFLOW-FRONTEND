import React, { useState } from 'react';
import {
  MoreVertical,
  CheckCircle2,
  Circle,
  Eye,
  Edit3,
  Copy,
  Trash2,
  ArrowUpDown,
  Calendar,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FilterX,
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus, TaskCategory } from '../../types';
import { useTask } from '../../context/TaskContext';

interface TaskTableProps {
  onViewTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onAddTask: () => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  onViewTask,
  onEditTask,
  onDeleteTask,
  onAddTask,
}) => {
  const {
    filteredTasks,
    toggleTaskComplete,
    duplicateTask,
    moveTaskStatus,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    setSearchQuery,
    setSelectedCategory,
    setSelectedPriority,
    setSelectedStatus,
  } = useTask();

  const [activeMenuTaskId, setActiveMenuTaskId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSort = (column: 'dueDate' | 'priority' | 'createdAt' | 'title') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

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

  const statusConfig: Record<TaskStatus, { bg: string; text: string; dot: string }> = {
    'To Do': {
      bg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      text: 'text-slate-700',
      dot: 'bg-slate-400',
    },
    'In Progress': {
      bg: 'bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300',
      text: 'text-[#5D87FF]',
      dot: 'bg-[#5D87FF]',
    },
    'In Review': {
      bg: 'bg-[#E8F7FF] text-[#49BEFF] dark:bg-blue-900/40 dark:text-blue-300',
      text: 'text-[#49BEFF]',
      dot: 'bg-[#49BEFF]',
    },
    Completed: {
      bg: 'bg-[#E6FFFA] text-[#13DEB9] dark:bg-emerald-950/60 dark:text-emerald-300',
      text: 'text-[#13DEB9]',
      dot: 'bg-[#13DEB9]',
    },
  };

  const categoryBadgeColors: Record<TaskCategory, string> = {
    Development: 'bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300',
    Design: 'bg-[#E6FFFA] text-[#13DEB9] dark:bg-emerald-950/60 dark:text-emerald-300',
    Marketing: 'bg-[#FEF5E5] text-[#FFAE1F] dark:bg-amber-950/60 dark:text-amber-300',
    Research: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300',
    Operations: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300',
    Productivity: 'bg-[#FDEEEB] text-[#FA896B] dark:bg-rose-950/60 dark:text-rose-300',
  };

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage) || 1;
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
    setCurrentPage(1);
  };

  return (
    <div className="spike-card overflow-hidden">
      {/* Table header / count */}
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#EEF2F6] dark:border-slate-800 bg-[#FBFBFE] dark:bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Sprint Task Catalog
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {paginatedTasks.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} -{' '}
          {Math.min(currentPage * itemsPerPage, filteredTasks.length)} of {filteredTasks.length}
        </div>
      </div>

      {/* Table view */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F4F6FA]/70 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 border-b border-[#EEF2F6] dark:border-slate-800">
            <tr>
              <th className="w-12 px-4 py-3.5 text-center">Status</th>
              <th
                onClick={() => handleSort('title')}
                className="px-4 py-3.5 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 select-none"
              >
                <div className="flex items-center gap-1.5">
                  Task Title
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th className="px-4 py-3.5">Category</th>
              <th
                onClick={() => handleSort('priority')}
                className="px-4 py-3.5 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 select-none"
              >
                <div className="flex items-center gap-1.5">
                  Priority
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('dueDate')}
                className="px-4 py-3.5 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200 select-none"
              >
                <div className="flex items-center gap-1.5">
                  Due Date
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th className="px-4 py-3.5">Workflow Stage</th>
              <th className="px-4 py-3.5">Assignee</th>
              <th className="w-16 px-4 py-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF2F6] dark:divide-slate-800">
            {paginatedTasks.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F6FA] dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                      <FilterX className="w-6 h-6" />
                    </div>
                    <p className="text-base font-bold text-slate-900 dark:text-slate-100">
                      No matching tasks found
                    </p>
                    <p className="text-xs text-slate-500 mt-1 mb-4 text-center">
                      Adjust your search keyword, reset the active filters, or create a new task.
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={resetAllFilters}
                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-[#F4F6FA] dark:bg-slate-800 rounded-lg hover:bg-slate-200"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={onAddTask}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-[#5D87FF] rounded-lg hover:bg-[#4570EA] shadow-xs"
                      >
                        + Create Task
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedTasks.map((task) => {
                const isOverdue = task.status !== 'Completed' && task.dueDate < todayStr;
                const isDone = task.status === 'Completed';

                return (
                  <tr
                    key={task.id}
                    className="group hover:bg-[#F4F6FA]/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    {/* Completion Checkbox */}
                    <td className="px-4 py-3.5 text-center">
                      <button
                        type="button"
                        onClick={() => toggleTaskComplete(task.id)}
                        className="text-slate-300 hover:text-[#13DEB9] transition-colors"
                        title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-[#13DEB9] fill-[#E6FFFA]" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                    </td>

                    {/* Title & snippet */}
                    <td className="px-4 py-3.5 min-w-[220px]">
                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => onViewTask(task)}
                          className={`text-sm font-bold text-left hover:text-[#5D87FF] transition-colors ${
                            isDone
                              ? 'line-through text-slate-400'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {task.title}
                        </button>
                        {task.description && (
                          <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {task.description}
                          </span>
                        )}
                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {task.tags.slice(0, 2).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-medium px-1.5 py-0.2 rounded-md bg-[#F4F6FA] dark:bg-slate-800 text-slate-500"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          categoryBadgeColors[task.category] || 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {task.category}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          priorityConfig[task.priority].bg
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig[task.priority].dot}`} />
                        {task.priority}
                      </span>
                    </td>

                    {/* Due Date */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar
                          className={`w-3.5 h-3.5 ${
                            isOverdue ? 'text-[#FA896B]' : 'text-slate-400'
                          }`}
                        />
                        <span
                          className={`font-semibold ${
                            isOverdue
                              ? 'text-[#FA896B] font-bold flex items-center gap-1'
                              : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {task.dueDate}
                          {isOverdue && <AlertTriangle className="w-3 h-3 text-[#FA896B]" />}
                        </span>
                      </div>
                    </td>

                    {/* Status inline dropdown */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="relative inline-block">
                        <select
                          value={task.status}
                          onChange={(e) => moveTaskStatus(task.id, e.target.value as TaskStatus)}
                          className={`text-xs font-bold pl-2.5 pr-6 py-1 rounded-xl border border-transparent focus:border-[#5D87FF] focus:outline-hidden cursor-pointer appearance-none ${
                            statusConfig[task.status].bg
                          }`}
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="In Review">In Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                        <ChevronDown className="w-3 h-3 opacity-60 absolute right-2 top-2 pointer-events-none" />
                      </div>
                    </td>

                    {/* Assignee */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-700 dark:text-slate-300 font-semibold">
                      {task.assignedTo || task.ownerName}
                    </td>

                    {/* Actions Menu */}
                    <td className="px-4 py-3.5 text-center relative whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => onViewTask(task)}
                          title="View Details"
                          className="p-1.5 text-slate-400 hover:text-[#5D87FF] rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onEditTask(task)}
                          title="Edit Task"
                          className="p-1.5 text-slate-400 hover:text-[#5D87FF] rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuTaskId(activeMenuTaskId === task.id ? null : task.id)
                          }
                          className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {activeMenuTaskId === task.id && (
                        <>
                          <div
                            className="fixed inset-0 z-30"
                            onClick={() => setActiveMenuTaskId(null)}
                          />
                          <div className="absolute right-4 top-10 z-40 w-44 spike-dropdown py-1.5 text-xs">
                            <button
                              onClick={() => {
                                onViewTask(task);
                                setActiveMenuTaskId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 flex items-center gap-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              View details
                            </button>
                            <button
                              onClick={() => {
                                onEditTask(task);
                                setActiveMenuTaskId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 flex items-center gap-2"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                              Edit task
                            </button>
                            <button
                              onClick={() => {
                                duplicateTask(task.id);
                                setActiveMenuTaskId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-slate-700 dark:text-slate-300 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 flex items-center gap-2"
                            >
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              Duplicate
                            </button>
                            <div className="my-1 border-t border-[#EEF2F6] dark:border-slate-800" />
                            <button
                              onClick={() => {
                                onDeleteTask(task);
                                setActiveMenuTaskId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-[#FA896B] hover:bg-[#FDEEEB] flex items-center gap-2 font-semibold"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-[#FA896B]" />
                              Delete task
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="px-6 py-3.5 flex items-center justify-between border-t border-[#EEF2F6] dark:border-slate-800 bg-[#FBFBFE] dark:bg-slate-900/50">
          <span className="text-xs text-slate-400 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-[#5D87FF] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
