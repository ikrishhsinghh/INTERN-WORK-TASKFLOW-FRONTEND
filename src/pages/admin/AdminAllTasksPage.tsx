import React, { useState } from 'react';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  AlertTriangle,
  Download,
  ChevronDown,
} from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { Task, TaskPriority, TaskStatus } from '../../types';

interface AdminAllTasksProps {
  onViewTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export const AdminAllTasksPage: React.FC<AdminAllTasksProps> = ({
  onViewTask,
  onDeleteTask,
}) => {
  const { tasks } = useTask();

  const [search, setSearch] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  const todayStr = new Date().toISOString().split('T')[0];

  const owners = Array.from(new Set(tasks.map((t) => t.assignedTo || t.ownerName)));

  const filtered = tasks.filter((t) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (selectedOwner !== 'All' && (t.assignedTo || t.ownerName) !== selectedOwner) {
      return false;
    }
    if (selectedStatus !== 'All' && t.status !== selectedStatus) return false;
    if (selectedPriority !== 'All' && t.priority !== selectedPriority) return false;
    return true;
  });

  const exportAll = () => {
    const headers = ['ID', 'Title', 'Category', 'Priority', 'Status', 'Due Date', 'Owner'];
    const rows = filtered.map((t) => [
      t.id,
      `"${t.title.replace(/"/g, '""')}"`,
      t.category,
      t.priority,
      t.status,
      t.dueDate,
      `"${t.assignedTo || t.ownerName}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow_master_registry_${todayStr}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
            Master Task Registry
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
              {tasks.length} Total Registered Tasks
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Cross-departmental oversight of all employee tasks, milestones, and deliverable SLAs
          </p>
        </div>

        <button
          onClick={exportAll}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-purple-600" />
          Export Master CSV
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search across all organizational tasks..."
              className="w-full pl-9.5 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-2.5 flex-wrap text-xs">
            {/* Assignee Filter */}
            <div className="relative">
              <select
                value={selectedOwner}
                onChange={(e) => setSelectedOwner(e.target.value)}
                className="pl-3 pr-7 py-2 bg-white dark:bg-[#151D2A] border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#5D87FF]/20 focus:border-[#5D87FF] appearance-none cursor-pointer shadow-2xs font-semibold"
              >
                <option value="All">All Members</option>
                {owners.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="pl-3 pr-7 py-2 bg-white dark:bg-[#151D2A] border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#5D87FF]/20 focus:border-[#5D87FF] appearance-none cursor-pointer shadow-2xs font-semibold"
              >
                <option value="All">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Priority Filter */}
            <div className="relative">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="pl-3 pr-7 py-2 bg-white dark:bg-[#151D2A] border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#5D87FF]/20 focus:border-[#5D87FF] appearance-none cursor-pointer shadow-2xs font-semibold"
              >
                <option value="All">All Priorities</option>
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Master Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Task Title</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Assigned Owner</th>
                <th className="px-5 py-3.5">Deadline</th>
                <th className="px-5 py-3.5">Workflow Status</th>
                <th className="px-5 py-3.5 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((task) => {
                const isOverdue = task.status !== 'Completed' && task.dueDate < todayStr;

                return (
                  <tr
                    key={task.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-3.5 max-w-xs">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {task.title}
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {task.id}
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-xs text-slate-700 dark:text-slate-300">
                      {task.category}
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                      {task.assignedTo || task.ownerName}
                    </td>

                    <td className="px-5 py-3.5 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span
                          className={
                            isOverdue
                              ? 'text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1'
                              : 'text-slate-600 dark:text-slate-300'
                          }
                        >
                          {task.dueDate}
                          {isOverdue && <AlertTriangle className="w-3 h-3 text-rose-500" />}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {task.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onViewTask(task)}
                          className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteTask(task)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
