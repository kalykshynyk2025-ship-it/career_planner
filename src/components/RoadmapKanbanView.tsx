import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  CircleDot, 
  Calendar,
  Sparkles,
  X
} from 'lucide-react';
import { RoadmapItem, CareerState } from '../types';

interface RoadmapKanbanViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onAskAi: (prompt: string) => void;
}

export const RoadmapKanbanView: React.FC<RoadmapKanbanViewProps> = ({
  state,
  onChangeState,
  onAskAi
}) => {
  const [activeQuarter, setActiveQuarter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form
  const [task, setTask] = useState('');
  const [sprint, setSprint] = useState('Спринт 1 (Недели 1-2)');
  const [category, setCategory] = useState<RoadmapItem['category']>('Skill Gap');
  const [status, setStatus] = useState<RoadmapItem['status']>('Backlog');
  const [metric, setMetric] = useState('Решено 10 задач / Подготовлен документ');
  const [quarter, setQuarter] = useState<RoadmapItem['quarter']>('Q1');

  const roadmap = state.roadmap || [];

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newItem: RoadmapItem = {
      id: Date.now().toString(),
      sprint,
      task: task.trim(),
      category,
      status,
      metric,
      quarter
    };

    onChangeState(prev => ({
      ...prev,
      roadmap: [...prev.roadmap, newItem]
    }));

    setTask('');
    setShowAddModal(false);
  };

  const handleStatusChange = (id: string, newStatus: RoadmapItem['status']) => {
    onChangeState(prev => ({
      ...prev,
      roadmap: prev.roadmap.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    }));
  };

  const handleDeleteTask = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      roadmap: prev.roadmap.filter(item => item.id !== id)
    }));
  };

  const filteredRoadmap = roadmap.filter(item => {
    if (activeQuarter === 'All') return true;
    return (item.quarter || 'Q1') === activeQuarter;
  });

  const backlogTasks = filteredRoadmap.filter(i => i.status === 'Backlog');
  const inProgressTasks = filteredRoadmap.filter(i => i.status === 'In Progress');
  const doneTasks = filteredRoadmap.filter(i => i.status === 'Done');

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Kanban className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Agile Roadmap & Kanban Спринты</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Поквартальное планирование (Q1-Q4) и отслеживание статуса задач
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Quarter Filters */}
          <div className="bg-[var(--bg-main)] border border-[var(--color-border)] rounded-xl p-1 flex space-x-1 text-xs font-semibold">
            {['All', 'Q1', 'Q2', 'Q3', 'Q4'].map(q => (
              <button
                key={q}
                onClick={() => setActiveQuarter(q)}
                className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${activeQuarter === q ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {q === 'All' ? 'Все кварталы' : q}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Новая задача</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Backlog */}
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center space-x-2">
              <CircleDot className="w-4 h-4 text-[var(--text-secondary)]" />
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Бэклог (To Do)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)]">
              {backlogTasks.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[300px]">
            {backlogTasks.map(item => (
              <div key={item.id} className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    {item.sprint}
                  </span>
                  <span className="text-[10px] text-[var(--text-secondary)] font-semibold">
                    {item.quarter || 'Q1'}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-[var(--text-primary)] leading-tight">
                  {item.task}
                </h4>

                <p className="text-[11px] text-[var(--text-secondary)]">
                  <strong>DoD:</strong> {item.metric}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)] font-medium">
                    {item.category}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleStatusChange(item.id, 'In Progress')}
                      className="px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 rounded font-semibold cursor-pointer"
                    >
                      В работу →
                    </button>
                    <button
                      onClick={() => handleDeleteTask(item.id)}
                      className="text-[var(--text-secondary)] hover:text-rose-500 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: In Progress */}
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                В процессе (In Progress)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
              {inProgressTasks.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[300px]">
            {inProgressTasks.map(item => (
              <div key={item.id} className="p-4 rounded-xl bg-[var(--bg-main)] border border-amber-500/30 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                    {item.sprint}
                  </span>
                  <span className="text-[10px] text-[var(--text-secondary)] font-semibold">
                    {item.quarter || 'Q1'}
                  </span>
                </div>

                <h4 className="font-bold text-xs text-[var(--text-primary)] leading-tight">
                  {item.task}
                </h4>

                <p className="text-[11px] text-[var(--text-secondary)]">
                  <strong>DoD:</strong> {item.metric}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)] font-medium">
                    {item.category}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleStatusChange(item.id, 'Done')}
                      className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 rounded font-semibold cursor-pointer"
                    >
                      Завершить ✓
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Done */}
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Выполнено (Done)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {doneTasks.length}
            </span>
          </div>

          <div className="space-y-3 min-h-[300px]">
            {doneTasks.map(item => (
              <div key={item.id} className="p-4 rounded-xl bg-[var(--bg-main)] border border-emerald-500/30 opacity-90 space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {item.sprint}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>

                <h4 className="font-bold text-xs text-[var(--text-primary)] line-through">
                  {item.task}
                </h4>

                <p className="text-[11px] text-[var(--text-secondary)]">
                  {item.metric}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)] font-medium">
                    {item.category}
                  </span>
                  <button
                    onClick={() => handleStatusChange(item.id, 'In Progress')}
                    className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    Вернуть в работу
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Add Task */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Новая задача в Roadmap</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[var(--text-secondary)] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Формулировка задачи</label>
                <input
                  type="text"
                  required
                  placeholder="напр. Составить банку STAR ответов на английском"
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Спринт / Срок</label>
                  <input
                    type="text"
                    value={sprint}
                    onChange={e => setSprint(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Квартал</label>
                  <select
                    value={quarter}
                    onChange={e => setQuarter(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  >
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Категория</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  >
                    <option value="Skill Gap">Skill Gap</option>
                    <option value="CV/Portfolio">CV / Portfolio</option>
                    <option value="Networking">Networking & Outreach</option>
                    <option value="Interview Prep">Interview Prep</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Начальный статус</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  >
                    <option value="Backlog">Бэклог</option>
                    <option value="In Progress">В процессе</option>
                    <option value="Done">Выполнено</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Критерий готовности (DoD Metric)</label>
                <input
                  type="text"
                  value={metric}
                  onChange={e => setMetric(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--color-border)] text-[var(--text-secondary)] font-semibold cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
