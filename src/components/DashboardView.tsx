import React, { useState } from 'react';
import { 
  CheckSquare, 
  Building2, 
  Briefcase, 
  Mail, 
  Table, 
  Compass, 
  Sparkles,
  ArrowRight,
  FileText,
  Edit3,
  Check,
  X
} from 'lucide-react';
import { CareerState, ActiveView } from '../types';

interface DashboardViewProps {
  state: CareerState;
  onChangeState?: React.Dispatch<React.SetStateAction<CareerState>>;
  onSelectView: (view: ActiveView) => void;
  onSelectStep: (step: number) => void;
  onOpenNotionExport: () => void;
  onAskAi: (prompt: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  state,
  onChangeState,
  onSelectView,
  onOpenNotionExport,
  onAskAi
}) => {
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const [editedPosition, setEditedPosition] = useState(state.selected_position || 'Senior ML & DS Engineer / AI Architect');

  const [isEditingGrade, setIsEditingGrade] = useState(false);
  const [editedGrade, setEditedGrade] = useState(state.goals?.targetGrade || 'Senior ML / AI Architect');

  const [isEditingSalary, setIsEditingSalary] = useState(false);
  const [editedSalary, setEditedSalary] = useState(state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес');

  const handleSavePosition = () => {
    if (editedPosition.trim() && onChangeState) {
      onChangeState(prev => ({ ...prev, selected_position: editedPosition.trim() }));
    }
    setIsEditingPosition(false);
  };

  const handleSaveGrade = () => {
    if (editedGrade.trim() && onChangeState) {
      onChangeState(prev => ({
        ...prev,
        goals: { ...prev.goals, targetGrade: editedGrade.trim() }
      }));
    }
    setIsEditingGrade(false);
  };

  const handleSaveSalary = () => {
    if (editedSalary.trim() && onChangeState) {
      onChangeState(prev => ({
        ...prev,
        goals: { ...prev.goals, expectedSalary: editedSalary.trim() }
      }));
    }
    setIsEditingSalary(false);
  };

  const criteriaCount = state.notion_criteria?.length || 0;
  const companiesCount = state.selected_companies?.length || 0;
  const vacanciesCount = state.selected_vacancies?.length || 0;
  const newslettersCount = state.newsletters?.length || 0;
  const analysesCount = state.vacancy_analyses?.length || 0;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden border-t-4 border-[#C8A05B]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Editable Grade Tag */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{state.appName || 'ML & DS Career OS'} • </span>
              {isEditingGrade ? (
                <div className="flex items-center space-x-1">
                  <input
                    type="text"
                    value={editedGrade}
                    onChange={e => setEditedGrade(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSaveGrade()}
                    autoFocus
                    className="px-2 py-0.5 text-xs bg-slate-900 text-white border border-amber-400 rounded"
                  />
                  <button onClick={handleSaveGrade} className="p-0.5 text-emerald-400"><Check className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <span 
                  onClick={() => { setEditedGrade(state.goals?.targetGrade || 'Senior ML / AI Architect'); setIsEditingGrade(true); }}
                  className="hover:underline cursor-pointer flex items-center space-x-1"
                  title="Нажмите, чтобы изменить целевой грейд"
                >
                  <span>Грейд: {state.goals?.targetGrade || 'Senior ML / AI Architect'}</span>
                  <Edit3 className="w-3 h-3 text-amber-300/70" />
                </span>
              )}
            </div>

            {/* Editable Target Salary Tag */}
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              {isEditingSalary ? (
                <div className="flex items-center space-x-1">
                  <input
                    type="text"
                    value={editedSalary}
                    onChange={e => setEditedSalary(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSaveSalary()}
                    autoFocus
                    className="px-2 py-0.5 text-xs bg-slate-900 text-white border border-emerald-400 rounded"
                  />
                  <button onClick={handleSaveSalary} className="p-0.5 text-emerald-400"><Check className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <span 
                  onClick={() => { setEditedSalary(state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес'); setIsEditingSalary(true); }}
                  className="hover:underline cursor-pointer flex items-center space-x-1"
                  title="Нажмите, чтобы изменить целевую вилку дохода"
                >
                  <span>Доход: {state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес'}</span>
                  <Edit3 className="w-3 h-3 text-emerald-300/70" />
                </span>
              )}
            </div>
          </div>

          {/* Editable Position (CP - Career Position) */}
          <div className="pt-1">
            {isEditingPosition ? (
              <div className="flex items-center space-x-2 my-1">
                <input
                  type="text"
                  value={editedPosition}
                  onChange={e => setEditedPosition(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSavePosition()}
                  autoFocus
                  className="w-full px-3 py-1.5 text-xl font-bold bg-slate-900 text-white border border-blue-400 rounded-xl"
                />
                <button onClick={handleSavePosition} className="p-2 bg-emerald-600 rounded-xl text-white"><Check className="w-4 h-4" /></button>
                <button onClick={() => setIsEditingPosition(false)} className="p-2 bg-rose-600 rounded-xl text-white"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <h1 
                onClick={() => { setEditedPosition(state.selected_position || 'Senior ML & DS Engineer / AI Architect'); setIsEditingPosition(true); }}
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white group cursor-pointer flex items-center space-x-2 hover:text-blue-200 transition-colors"
                title="Нажмите, чтобы изменить позицию/должность (CP)"
              >
                <span>Карьерная стратегия (CP): {state.selected_position || 'Senior ML & DS Engineer / AI Architect'}</span>
                <Edit3 className="w-5 h-5 text-blue-300 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
              </h1>
            )}
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Управление критериями выбора работодателя, базой компаний, ссылками на ML/DS вакансии, автоматическим анализом требований и матрицей навыков.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectView('criteria')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center space-x-2"
            >
              <span>Перейти к Доске №1 (Критерии)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNotionExport}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-xs transition-all flex items-center space-x-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>PDF Отчет</span>
            </button>
          </div>
        </div>
      </div>

      {/* Required 6 Main Boards Section */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          Доски и рабочие блоки проекта:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Board 1: Criteria */}
          <button
            onClick={() => onSelectView('criteria')}
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] hover:border-blue-500/50 transition-all text-left space-y-3 shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                <CheckSquare className="w-6 h-6" />
              </div>
              <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${criteriaCount >= 10 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                {criteriaCount} критериев
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Доска №1: Список критериев выбора
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Критерии выбора работодателя (доход в ₽, стек, удаленка, ДМС, культура)
              </p>
            </div>
          </button>

          {/* Board 2: Companies */}
          <button
            onClick={() => onSelectView('companies')}
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] hover:border-blue-500/50 transition-all text-left space-y-3 shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <Building2 className="w-6 h-6" />
              </div>
              <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${companiesCount >= 5 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                {companiesCount} компаний
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Доска №2: Целевые компании
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Список компаний, где хочется поработать (Яндекс, Авито, Т-Банк, Ozon, ВК)
              </p>
            </div>
          </button>

          {/* Board 3: Vacancies */}
          <button
            onClick={() => onSelectView('vacancies')}
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] hover:border-blue-500/50 transition-all text-left space-y-3 shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${vacanciesCount >= 3 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                {vacanciesCount} вакансий
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Доска №3: Ссылки на вакансии
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Вакансии и вилки в ₽ из целевых компаний с прямыми ссылками
              </p>
            </div>
          </button>

          {/* Block 4: Newsletters */}
          <button
            onClick={() => onSelectView('newsletters')}
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] hover:border-blue-500/50 transition-all text-left space-y-3 shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
                <Mail className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full font-bold text-[11px] bg-purple-500/10 text-purple-600">
                {newslettersCount} подписок
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Карьерные рассылки компаний
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Подписки на дайджесты вакансий Яндекс, Авито и прочих источников
              </p>
            </div>
          </button>

          {/* Block 5: Vacancy Analysis */}
          <button
            onClick={() => onSelectView('vacancy_analysis')}
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] hover:border-blue-500/50 transition-all text-left space-y-3 shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl">
                <Table className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full font-bold text-[11px] bg-teal-500/10 text-teal-600">
                {analysesCount} выписок
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Таблица «Анализ вакансий»
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Выписка требований/обязанностей: владею/нет, и способы достижения
              </p>
            </div>
          </button>

          {/* Block 6: SWOT Board */}
          <button
            onClick={() => onSelectView('swot_miro')}
            className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] hover:border-blue-500/50 transition-all text-left space-y-3 shadow-xs group cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                <Compass className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-1 rounded-full font-bold text-[11px] bg-amber-500/10 text-amber-600">
                SWOT Matrix
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Анализ навыков (SWOT-Анализ)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Интерактивный SWOT-анализ с ответами на 16 контрольных вопросов
              </p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};

