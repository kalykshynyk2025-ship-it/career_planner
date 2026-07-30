import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  ChevronRight, 
  GitCommit, 
  Building2, 
  Briefcase, 
  FileText, 
  Zap, 
  ArrowRight 
} from 'lucide-react';
import { CareerState, ActiveView } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CareerState;
  onSelectView: (view: ActiveView) => void;
  onSelectStep: (stepNumber: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  state,
  onSelectView,
  onSelectStep
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search indexing
  const q = query.toLowerCase().trim();

  // 1. Search Steps
  const matchingSteps = [
    { num: 1, title: 'Карьерное направление & Рынок' },
    { num: 2, title: 'Анализ должностей (Основная & Запасная)' },
    { num: 3, title: 'Доска №1: Критерии выбора компании' },
    { num: 4, title: 'Маппинг 5+ целевых компаний' },
    { num: 5, title: 'Анализ актуальных вакансий' },
    { num: 6, title: 'Подписка на карьерные рассылки' },
    { num: 7, title: 'Декомпозиция требований & ATS' },
    { num: 8, title: 'Анализ частоты навыков & Оценка' },
    { num: 9, title: 'Skill Gap Анализ & Приоритеты' },
    { num: 10, title: 'Поквартальная дорожная карта (Q1-Q4)' },
    { num: 11, title: 'SWOT-анализ профиля' },
    { num: 12, title: 'Аудит и проверка результатов' },
    { num: 13, title: 'Финальный карьерный отчет' }
  ].filter(s => !q || s.title.toLowerCase().includes(q) || s.num.toString() === q);

  // 2. Search Companies
  const matchingCompanies = state.selected_companies.filter(c => 
    !q || c.name.toLowerCase().includes(q) || c.techStack.some(t => t.toLowerCase().includes(q))
  );

  // 3. Search Vacancies
  const matchingVacancies = state.selected_vacancies.filter(v => 
    !q || v.title.toLowerCase().includes(q) || v.company.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden space-y-0">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-[var(--color-border)] flex items-center space-x-3">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Быстрый поиск по шагам, компаниям, вакансиям..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none"
          />
          <button onClick={onClose} className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4 text-xs">
          
          {/* Steps */}
          {matchingSteps.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1">
                <GitCommit className="w-3 h-3" />
                <span>Этапы Agile Трека</span>
              </div>
              {matchingSteps.slice(0, 5).map(s => (
                <button
                  key={s.num}
                  onClick={() => {
                    onSelectStep(s.num);
                    onSelectView('agile_track');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-hover-sidebar)] text-left cursor-pointer group"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0">
                      #{s.num}
                    </span>
                    <span className="font-semibold text-[var(--text-primary)]">{s.title}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
              ))}
            </div>
          )}

          {/* Companies */}
          {matchingCompanies.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1">
                <Building2 className="w-3 h-3" />
                <span>Целевые компании</span>
              </div>
              {matchingCompanies.slice(0, 4).map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectView('companies');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-hover-sidebar)] text-left cursor-pointer group"
                >
                  <div>
                    <div className="font-bold text-[var(--text-primary)]">{c.name}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">{c.tier} • {c.country}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
              ))}
            </div>
          )}

          {/* Vacancies */}
          {matchingVacancies.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1">
                <Briefcase className="w-3 h-3" />
                <span>Вакансии</span>
              </div>
              {matchingVacancies.slice(0, 4).map(v => (
                <button
                  key={v.id}
                  onClick={() => {
                    onSelectView('vacancies');
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--bg-hover-sidebar)] text-left cursor-pointer group"
                >
                  <div>
                    <div className="font-bold text-[var(--text-primary)]">{v.title}</div>
                    <div className="text-[10px] text-[var(--text-secondary)]">{v.company} • {v.salaryRange}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-[var(--bg-main)] border-t border-[var(--color-border)] text-[10px] text-[var(--text-secondary)] flex items-center justify-between">
          <span>Нажмите <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono">ESC</kbd> для закрытия</span>
          <span>SaaS Quick Navigator</span>
        </div>

      </div>
    </div>
  );
};
