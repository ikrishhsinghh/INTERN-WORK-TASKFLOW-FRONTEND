import React, { useState } from 'react';
import { SlidersHorizontal, Plus, Tag, Clock, ShieldAlert, Check } from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { Modal } from '../../components/common/Modal';

export const CategoriesPrioritiesPage: React.FC = () => {
  const { tasks } = useTask();

  const [categories, setCategories] = useState([
    { id: 'cat-1', name: 'Development', color: 'bg-blue-500', desc: 'Software engineering, APIs, refactoring, and code review' },
    { id: 'cat-2', name: 'Design', color: 'bg-purple-500', desc: 'Figma UI/UX wireframes, design systems, and prototypes' },
    { id: 'cat-3', name: 'Marketing', color: 'bg-emerald-500', desc: 'Growth strategies, landing pages, and campaign collateral' },
    { id: 'cat-4', name: 'Research', color: 'bg-amber-500', desc: 'Competitive analysis, user interviews, and product discovery' },
    { id: 'cat-5', name: 'Operations', color: 'bg-indigo-500', desc: 'Database maintenance, cloud hosting, and infrastructure' },
    { id: 'cat-6', name: 'Productivity', color: 'bg-rose-500', desc: 'Team rituals, standup facilitation, and internal tooling' },
  ]);

  const [showAddCat, setShowAddCat] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setCategories([
      ...categories,
      {
        id: 'cat-' + Date.now(),
        name: newCatName.trim(),
        color: 'bg-blue-600',
        desc: newCatDesc.trim() || 'Custom departmental category',
      },
    ]);
    setShowAddCat(false);
    setNewCatName('');
    setNewCatDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
            Categories & SLA Policies
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Configure system categories, priority thresholds, and resolution SLA timetables
          </p>
        </div>

        <button
          onClick={() => setShowAddCat(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Active Categories ({categories.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const taskCount = tasks.filter((t) => t.category === cat.name).length;
            return (
              <div
                key={cat.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                      {cat.name}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {taskCount} tasks
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Policy: Default</span>
                  <span className="text-purple-600 font-medium">Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Priority SLA Timetables */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Priority SLA Framework
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Default escalation targets and resolution deadlines
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            {
              level: 'Urgent',
              sla: '12 Hours',
              target: 'Same Day Turnaround',
              color: 'text-rose-600 dark:text-rose-400',
              bg: 'bg-rose-50 dark:bg-rose-950/60',
            },
            {
              level: 'High',
              sla: '24-48 Hours',
              target: 'Sprint High Priority',
              color: 'text-amber-600 dark:text-amber-400',
              bg: 'bg-amber-50 dark:bg-amber-950/60',
            },
            {
              level: 'Medium',
              sla: '3-5 Days',
              target: 'Standard Cadence',
              color: 'text-blue-600 dark:text-blue-400',
              bg: 'bg-blue-50 dark:bg-blue-950/60',
            },
            {
              level: 'Low',
              sla: '1-2 Weeks',
              target: 'Flexible Backlog',
              color: 'text-slate-600 dark:text-slate-400',
              bg: 'bg-slate-100 dark:bg-slate-800',
            },
          ].map((p) => (
            <div
              key={p.level}
              className={`p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 ${p.bg}`}
            >
              <div className={`text-sm font-extrabold ${p.color}`}>{p.level} Priority</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2">
                {p.sla}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">{p.target}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCat && (
        <Modal
          isOpen={true}
          onClose={() => setShowAddCat(false)}
          title="Create New Category"
          maxWidth="sm"
        >
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                Category Title
              </label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Compliance & Legal"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="Describe scope of work in this category..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs sm:text-sm resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowAddCat(false)}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 text-white"
              >
                Save Category
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
