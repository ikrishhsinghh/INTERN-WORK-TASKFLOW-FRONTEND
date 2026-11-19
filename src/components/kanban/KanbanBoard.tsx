import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Task, TaskStatus } from '../../types';
import { KanbanCard } from './KanbanCard';
import { useTask } from '../../context/TaskContext';

interface KanbanBoardProps {
  onViewTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onAddTaskToColumn: (status: TaskStatus) => void;
}

const COLUMNS: { id: TaskStatus; label: string; dot: string; borderAccent: string }[] = [
  {
    id: 'To Do',
    label: 'To Do',
    dot: 'bg-slate-400',
    borderAccent: 'border-t-slate-400',
  },
  {
    id: 'In Progress',
    label: 'In Progress',
    dot: 'bg-[#5D87FF]',
    borderAccent: 'border-t-[#5D87FF]',
  },
  {
    id: 'In Review',
    label: 'In Review',
    dot: 'bg-[#49BEFF]',
    borderAccent: 'border-t-[#49BEFF]',
  },
  {
    id: 'Completed',
    label: 'Completed',
    dot: 'bg-[#13DEB9]',
    borderAccent: 'border-t-[#13DEB9]',
  },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  onViewTask,
  onEditTask,
  onDeleteTask,
  onAddTaskToColumn,
}) => {
  const { tasks, moveTaskStatus } = useTask();
  const [boardSearch, setBoardSearch] = useState('');
  const [selectedPrio, setSelectedPrio] = useState('All');
  const [selectedCat, setSelectedCat] = useState('All');
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);

  const visibleTasks = tasks.filter((task) => {
    if (boardSearch.trim()) {
      const q = boardSearch.toLowerCase();
      const match =
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q) ||
        task.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedPrio !== 'All' && task.priority !== selectedPrio) return false;
    if (selectedCat !== 'All' && task.category !== selectedCat) return false;
    return true;
  });

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    setDragOverColumn(null);
    setDraggedTaskId(null);

    if (taskId) {
      moveTaskStatus(taskId, targetStatus);
    }
  };

  return (
    <div className="space-y-5">
      {/* Board Controls */}
      <div className="spike-card p-4.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={boardSearch}
            onChange={(e) => setBoardSearch(e.target.value)}
            placeholder="Search board cards..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F4F6FA] dark:bg-slate-800/80 border border-transparent dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:bg-white focus:border-[#5D87FF]"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Priority:</span>
          </div>
          <select
            value={selectedPrio}
            onChange={(e) => setSelectedPrio(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 bg-[#F4F6FA] dark:bg-slate-800 border border-transparent rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold uppercase tracking-wider ml-2">
            <span>Category:</span>
          </div>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 bg-[#F4F6FA] dark:bg-slate-800 border border-transparent rounded-lg text-slate-800 dark:text-slate-200 focus:outline-hidden"
          >
            <option value="All">All Categories</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Research">Research</option>
            <option value="Productivity">Productivity</option>
          </select>
        </div>
      </div>

      {/* 4 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colTasks = visibleTasks.filter((t) => t.status === col.id);
          const isTarget = dragOverColumn === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`flex flex-col rounded-2xl border border-[#EEF2F6] dark:border-slate-800 bg-[#F4F6FA]/60 dark:bg-slate-900/40 border-t-4 ${col.borderAccent} transition-all duration-200 min-h-[540px] ${
                isTarget
                  ? 'border-[#5D87FF] bg-[#ECF2FF]/40 dark:bg-blue-950/20 ring-2 ring-[#5D87FF]/20'
                  : ''
              }`}
            >
              {/* Column Header */}
              <div className="p-4 flex items-center justify-between border-b border-[#EEF2F6] dark:border-slate-800/80 bg-white/70 dark:bg-[#1E2530]/70 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {col.label}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#F4F6FA] dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {colTasks.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddTaskToColumn(col.id)}
                  title={`Add task to ${col.label}`}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#5D87FF] hover:bg-[#ECF2FF] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Cards Container */}
              <div className="p-3.5 space-y-3 flex-1 overflow-y-auto max-h-[700px]">
                {colTasks.length === 0 ? (
                  <div className="h-36 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center p-4">
                    <p className="text-xs text-slate-400 font-medium">
                      Drag cards here or click + to add
                    </p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <KanbanCard
                      key={task.id}
                      task={task}
                      onView={onViewTask}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                      onDragStart={handleDragStart}
                    />
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
