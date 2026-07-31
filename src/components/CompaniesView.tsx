import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Trash2, 
  Edit3,
  Globe, 
  X,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { Company, CareerState } from '../types';
import { KnowledgeBaseModal } from './KnowledgeBaseModal';
import { KNOWLEDGE_COMPANIES } from '../data/knowledgeBase';
import { TargetGoalBanner } from './TargetGoalBanner';
import { ExportBoardButton } from './ExportBoardButton';

interface CompaniesViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  state,
  onChangeState
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isKbOpen, setIsKbOpen] = useState(false);

  // Form State for Add/Edit
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Москва / Удаленка РФ');
  const [description, setDescription] = useState('');
  const [techStackStr, setTechStackStr] = useState('React, TypeScript, Node.js, Go, PostgreSQL');
  const [size, setSize] = useState('1000-5000');
  const [notes, setNotes] = useState('');

  const companies = state.selected_companies || [];

  const handleOpenAdd = () => {
    setName('');
    setCountry('Москва / Удаленка РФ');
    setDescription('');
    setTechStackStr('Python, PyTorch, C++, TypeScript, Kubernetes');
    setSize('1000+ сотрудников');
    setNotes('Фокус: Высокая инженерная культура, AI/ML проекты');
    setEditingCompany(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (c: Company) => {
    setEditingCompany(c);
    setName(c.name);
    setCountry(c.country || 'Москва / Удаленка РФ');
    setDescription(c.description || '');
    setTechStackStr(c.techStack ? c.techStack.join(', ') : '');
    setSize(c.size || '1000+ сотрудников');
    setNotes(c.notes || '');
    setShowAddModal(true);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const stackList = techStackStr.split(',').map(s => s.trim()).filter(Boolean);

    if (editingCompany) {
      // Edit existing
      onChangeState(prev => ({
        ...prev,
        selected_companies: prev.selected_companies.map(c => 
          c.id === editingCompany.id
            ? {
                ...c,
                name: name.trim(),
                country,
                description,
                techStack: stackList,
                size,
                notes
              }
            : c
        )
      }));
    } else {
      // Add new
      const newComp: Company = {
        id: Date.now().toString(),
        name: name.trim(),
        country,
        description: description || 'Лидер рынка в сфере IT & Highload.',
        techStack: stackList,
        size,
        notes: notes || 'Запланирован контакт с HR / Рефералом'
      };

      onChangeState(prev => ({
        ...prev,
        selected_companies: [...prev.selected_companies, newComp]
      }));
    }

    setShowAddModal(false);
    setEditingCompany(null);
  };

  const handleQuickAddFromKb = (kc: typeof KNOWLEDGE_COMPANIES[0]) => {
    const exists = companies.some(c => c.name.toLowerCase() === kc.name.toLowerCase());
    if (exists) return;

    const newComp: Company = {
      id: Date.now().toString() + Math.random().toString().slice(2, 5),
      name: kc.name,
      country: 'Москва / РФ',
      description: kc.description,
      techStack: kc.techStack,
      size: '1000+ сотрудников',
      notes: `Фокус: ${kc.mlDsFocus}`
    };

    onChangeState(prev => ({
      ...prev,
      selected_companies: [...prev.selected_companies, newComp]
    }));
  };

  const handleDeleteCompany = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      selected_companies: prev.selected_companies.filter(c => c.id !== id)
    }));
  };

  const filteredCompanies = companies.filter(c => {
    return c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.notes && c.notes.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div id="board-companies-view" className="space-y-6">
      
      {/* Target Goal Banner */}
      <TargetGoalBanner 
        state={state} 
        subtitle="Список целевых компаний подбирается под вашу главную карьерную цель и технологический стек."
      />
      
      {/* Header & Controls Bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">База целевых компаний (Target List)</h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Формирование списка целевых работодателей и технологических стеков
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ExportBoardButton state={state} boardType="companies" boardTitle="Доска №2" />
            <button
              onClick={() => setIsKbOpen(true)}
              className="px-3.5 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Выбрать из базы компаний</span>
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить компанию</span>
            </button>
          </div>
        </div>

        {/* Quick Select Bar from Base */}
        <div className="pt-2 border-t border-[var(--color-border)]">
          <div className="text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5 flex items-center justify-between">
            <span>Быстрый выбор из каталога ведущих IT-компаний:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {KNOWLEDGE_COMPANIES.slice(0, 10).map((kc) => {
              const isAdded = companies.some(c => c.name.toLowerCase() === kc.name.toLowerCase());
              return (
                <button
                  key={kc.id}
                  onClick={() => handleQuickAddFromKb(kc)}
                  disabled={isAdded}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all flex items-center space-x-1 border cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 cursor-default'
                      : 'bg-[var(--bg-main)] hover:bg-blue-500/10 text-[var(--text-primary)] hover:text-blue-600 border-[var(--color-border)] hover:border-blue-500/30'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>{kc.name}</span>
                  {isAdded && <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search */}
        <div className="pt-2 border-t border-[var(--color-border)] text-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Поиск компании или стека..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--bg-main)] border-b border-[var(--color-border)] text-[var(--text-secondary)] font-semibold uppercase tracking-wider">
                <th className="p-4">Компания</th>
                <th className="p-4">Локация / Формат</th>
                <th className="p-4">Технологический стек</th>
                <th className="p-4">Размер</th>
                <th className="p-4">Заметки / Описание</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--text-primary)]">
              {filteredCompanies.map((c) => (
                <tr key={c.id} className="hover:bg-[var(--bg-hover-sidebar)] transition-colors">
                  
                  {/* Name */}
                  <td className="p-4">
                    <div className="font-bold text-sm text-[var(--text-primary)]">{c.name}</div>
                    {c.description && <div className="text-[11px] text-[var(--text-secondary)] line-clamp-1">{c.description}</div>}
                  </td>

                  {/* Location */}
                  <td className="p-4">
                    <div className="text-[11px] text-[var(--text-secondary)] flex items-center space-x-1 font-medium">
                      <Globe className="w-3.5 h-3.5 text-blue-500" />
                      <span>{c.country || 'Москва / Удаленка РФ'}</span>
                    </div>
                  </td>

                  {/* Tech Stack */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {c.techStack.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium border border-slate-300 dark:border-slate-700 text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Size */}
                  <td className="p-4 font-medium text-[var(--text-secondary)]">
                    {c.size || '1000+'}
                  </td>

                  {/* Notes */}
                  <td className="p-4">
                    <div className="text-xs text-[var(--text-primary)] max-w-xs line-clamp-2">
                      {c.notes || '—'}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right space-x-1">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer rounded-lg"
                      title="Редактировать ячейку / данные компании"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCompany(c.id)}
                      className="p-1.5 text-[var(--text-secondary)] hover:text-rose-500 transition-colors cursor-pointer rounded-lg hover:bg-rose-500/10"
                      title="Удалить компанию"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit Company */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl w-full max-w-lg p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {editingCompany ? `Редактирование: ${editingCompany.name}` : 'Добавить целевую компанию'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCompany} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Название компании</label>
                <input
                  type="text"
                  required
                  placeholder="например, Яндекс / Авито"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Локация / Формат</label>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Стек технологий (через запятую)</label>
                <input
                  type="text"
                  value={techStackStr}
                  onChange={e => setTechStackStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Заметки / Статус контакта</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Запланирован отклик через реферала..."
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-[var(--color-border)]">
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

      <KnowledgeBaseModal
        isOpen={isKbOpen}
        onClose={() => setIsKbOpen(false)}
        defaultTab="companies"
        state={state}
        onChangeState={onChangeState}
      />
    </div>
  );
};
