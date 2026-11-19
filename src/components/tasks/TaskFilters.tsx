import React from 'react';
import { Search, RotateCcw, Download, Filter, ChevronDown } from 'lucide-react';
import { useTask } from '../../context/TaskContext';

interface TaskFiltersProps {
  onExportCSV?: () => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ onExportCSV }) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
    filteredTasks,
  } = useTask();

  const handleExport = () => {
    if (onExportCSV) {
      onExportCSV();
      return;
    }
    const headers = ['ID', 'Title', 'Category', 'Priority', 'Status', 'Due Date', 'Assignee'];
    const rows = filteredTasks.map((t) => [
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
    link.setAttribute('href', url);
    link.setAttribute('download', `taskflow_tasks_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedPriority !== 'All' ||
    selectedStatus !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedPriority('All');
    setSelectedStatus('All');
  };

  return (
    <div className="spike-card p-5 space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3.5 justify-between">
        {/* Search Input with Spike styling */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by task title, description, or tag..."
            className="w-full pl-9.5 pr-4 py-2 bg-[#F4F6FA] dark:bg-slate-800/80 border border-transparent dark:border-slate-700/60 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:bg-white dark:focus:bg-slate-900 focus:border-[#5D87FF] transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-[#F4F6FA] dark:bg-slate-800 rounded-xl hover:bg-slate-200/70 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}

          <button
            onClick={handleExport}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-[#EEF2F6] dark:border-slate-700 rounded-xl hover:bg-[#F4F6FA] dark:hover:bg-slate-750 transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#5D87FF]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Selectors Bar with Custom Styled Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#EEF2F6] dark:border-slate-800/80">
        {/* Status Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Status
          </label>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs font-semibold pl-3 pr-8 py-2.5 bg-white dark:bg-[#151D2A] border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#5D87FF]/20 focus:border-[#5D87FF] transition-all appearance-none cursor-pointer shadow-2xs hover:border-slate-300 dark:hover:border-slate-600"
            >
              <option value="All">All Statuses</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="In Review">In Review</option>
              <option value="Completed">Completed</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Priority Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Priority
          </label>
          <div className="relative">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full text-xs font-semibold pl-3 pr-8 py-2.5 bg-white dark:bg-[#151D2A] border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#5D87FF]/20 focus:border-[#5D87FF] transition-all appearance-none cursor-pointer shadow-2xs hover:border-slate-300 dark:hover:border-slate-600"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
              <option value="Urgent">Urgent Priority</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Category Filter */}
        <div className="relative">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Category
          </label>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs font-semibold pl-3 pr-8 py-2.5 bg-white dark:bg-[#151D2A] border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#5D87FF]/20 focus:border-[#5D87FF] transition-all appearance-none cursor-pointer shadow-2xs hover:border-slate-300 dark:hover:border-slate-600"
            >
              <option value="All">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Research">Research</option>
              <option value="Operations">Operations</option>
              <option value="Productivity">Productivity</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
