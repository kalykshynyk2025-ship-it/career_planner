import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Download, 
  RotateCcw, 
  Save, 
  Check, 
  AlertTriangle,
  Target,
  Zap,
  Award,
  Plus,
  Trash2,
  Sparkles,
  Info
} from 'lucide-react';
import { CareerState, Skill } from '../types';
import { formatSalaryWithCurrency } from '../utils/currency';

interface SettingsViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onResetState: () => void;
  onExportJson: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  state,
  onChangeState,
  onResetState,
  onExportJson
}) => {
  const [position, setPosition] = useState(state.selected_position || 'Senior ML & DS Engineer / AI Architect');
  const [altPos, setAltPos] = useState(state.alternate_position || 'Lead Data Scientist / RecSys Architect');
  const [market, setMarket] = useState(state.selected_market || 'РФ / Global Remote');
  const [salary, setSalary] = useState(state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес');
  const [grade, setGrade] = useState(state.goals?.targetGrade || 'Senior ML / AI Architect');
  const [timeline, setTimeline] = useState(state.goals?.timeline || '3-6 месяцев');
  const [primaryGoal, setPrimaryGoal] = useState(state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer с вилкой 380 000 ₽ - 550 000 ₽ / мес');
  const [hardSkillsSummary, setHardSkillsSummary] = useState(state.goals?.hardSkillsSummary || 'Python, PyTorch, LLM Fine-Tuning, MLOps, RAG, Distributed Training, Vector DBs, System Design');
  const [softSkillsSummary, setSoftSkillsSummary] = useState(state.goals?.softSkillsSummary || 'Technical Leadership, Agile/Scrum Mentorship, Stakeholder Management, Architecture Presentations');
  
  const [newHardSkillInput, setNewHardSkillInput] = useState('');
  const [newSoftSkillInput, setNewSoftSkillInput] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPosition(state.selected_position || 'Senior ML & DS Engineer / AI Architect');
    setAltPos(state.alternate_position || 'Lead Data Scientist / RecSys Architect');
    setMarket(state.selected_market || 'РФ / Global Remote');
    setSalary(state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес');
    setGrade(state.goals?.targetGrade || 'Senior ML / AI Architect');
    setTimeline(state.goals?.timeline || '3-6 месяцев');
    setPrimaryGoal(state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer с вилкой 380 000 ₽ - 550 000 ₽ / мес');
    setHardSkillsSummary(state.goals?.hardSkillsSummary || 'Python, PyTorch, LLM Fine-Tuning, MLOps, RAG, Distributed Training, Vector DBs, System Design');
    setSoftSkillsSummary(state.goals?.softSkillsSummary || 'Technical Leadership, Agile/Scrum Mentorship, Stakeholder Management, Architecture Presentations');
  }, [state]);

  const updateState = (
    newPosition: string, 
    newAltPos: string, 
    newMarket: string, 
    newSalary: string, 
    newGrade: string, 
    newTimeline: string, 
    newGoal: string,
    newHard: string,
    newSoft: string
  ) => {
    onChangeState(prev => ({
      ...prev,
      selected_position: newPosition,
      alternate_position: newAltPos,
      selected_market: newMarket,
      goals: {
        ...prev.goals,
        primaryGoal: newGoal,
        expectedSalary: newSalary,
        targetGrade: newGrade,
        timeline: newTimeline,
        hardSkillsSummary: newHard,
        softSkillsSummary: newSoft
      }
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateState(position, altPos, market, salary, grade, timeline, primaryGoal, hardSkillsSummary, softSkillsSummary);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddHardSkillTag = () => {
    if (!newHardSkillInput.trim()) return;
    const skillName = newHardSkillInput.trim();
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: skillName,
      category: 'Hard Skill',
      level: grade.includes('Senior') ? 'Senior' : 'Pro',
      evidence: 'Указано в настройках профиля'
    };
    
    // Add to skills array and append to summary if needed
    onChangeState(prev => ({
      ...prev,
      skills: [...prev.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase()), newSkill]
    }));

    const currentList = hardSkillsSummary.split(',').map(s => s.trim()).filter(Boolean);
    if (!currentList.includes(skillName)) {
      const updatedSummary = [...currentList, skillName].join(', ');
      setHardSkillsSummary(updatedSummary);
      updateState(position, altPos, market, salary, grade, timeline, primaryGoal, updatedSummary, softSkillsSummary);
    }

    setNewHardSkillInput('');
  };

  const handleAddSoftSkillTag = () => {
    if (!newSoftSkillInput.trim()) return;
    const skillName = newSoftSkillInput.trim();
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: skillName,
      category: 'Soft Skill',
      level: 'Senior',
      evidence: 'Указано в настройках профиля'
    };

    onChangeState(prev => ({
      ...prev,
      skills: [...prev.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase()), newSkill]
    }));

    const currentList = softSkillsSummary.split(',').map(s => s.trim()).filter(Boolean);
    if (!currentList.includes(skillName)) {
      const updatedSummary = [...currentList, skillName].join(', ');
      setSoftSkillsSummary(updatedSummary);
      updateState(position, altPos, market, salary, grade, timeline, primaryGoal, hardSkillsSummary, updatedSummary);
    }

    setNewSoftSkillInput('');
  };

  const handleDeleteSkillChip = (skillId: string) => {
    onChangeState(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== skillId)
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-[var(--text-primary)] flex items-center justify-center font-bold">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Настройки профиля и навыков</h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Параметры ориентации, Hard & Soft навыки, зарплатные вилки и сквозная привязка всех 8 досок
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Settings Form */}
        <div className="lg:col-span-8 bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[var(--text-primary)] pb-3 border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Параметры таргетинга & Профиль навыков</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Сквозной контекст
            </span>
          </h3>

          {/* Master Goal Banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-amber-500/10 border border-blue-500/20 flex items-start space-x-3">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              <strong className="text-[var(--text-primary)]">Главная целевая установка:</strong> Карьерная цель, грейд и списки Hard/Soft навыков из этой формы являются главным ориентиром для всех досок (Критерии, Вакансии, Анализ, SWOT-матрица и Agile).
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[var(--text-secondary)] mb-1">Главная карьерная цель</label>
              <input
                type="text"
                value={primaryGoal}
                onChange={e => {
                  const val = e.target.value;
                  setPrimaryGoal(val);
                  updateState(position, altPos, market, salary, grade, timeline, val, hardSkillsSummary, softSkillsSummary);
                }}
                placeholder="Переход на позицию Senior..."
                className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Основная должность (CP)</label>
                <input
                  type="text"
                  value={position}
                  onChange={e => {
                    const val = e.target.value;
                    setPosition(val);
                    updateState(val, altPos, market, salary, grade, timeline, primaryGoal, hardSkillsSummary, softSkillsSummary);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Запасная должность</label>
                <input
                  type="text"
                  value={altPos}
                  onChange={e => {
                    const val = e.target.value;
                    setAltPos(val);
                    updateState(position, val, market, salary, grade, timeline, primaryGoal, hardSkillsSummary, softSkillsSummary);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Валюта расчетов</label>
                <div className="flex items-center space-x-1 bg-[var(--bg-main)] border border-[var(--color-border)] rounded-xl p-1">
                  {(['RUB', 'USD', 'EUR'] as const).map(curr => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => {
                        onChangeState(prev => {
                          const updatedSalary = formatSalaryWithCurrency(salary, curr);
                          setSalary(updatedSalary);
                          return {
                            ...prev,
                            currency: curr,
                            goals: {
                              ...prev.goals,
                              expectedSalary: updatedSalary
                            }
                          };
                        });
                      }}
                      className={`flex-1 py-1 text-center font-bold text-xs rounded-lg transition-colors cursor-pointer ${
                        (state.currency || 'RUB') === curr 
                          ? 'bg-blue-600 text-white shadow-xs' 
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {curr === 'RUB' ? '₽ Рубли' : curr === 'USD' ? '$ USD' : '€ EUR'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Целевой рынок</label>
                <input
                  type="text"
                  value={market}
                  onChange={e => {
                    const val = e.target.value;
                    setMarket(val);
                    updateState(position, altPos, val, salary, grade, timeline, primaryGoal, hardSkillsSummary, softSkillsSummary);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Ожидаемый доход (вилка)</label>
                <input
                  type="text"
                  value={salary}
                  onChange={e => {
                    const val = e.target.value;
                    setSalary(val);
                    updateState(position, altPos, market, val, grade, timeline, primaryGoal, hardSkillsSummary, softSkillsSummary);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Грейд (Senior / Tech Lead)</label>
                <input
                  type="text"
                  value={grade}
                  onChange={e => {
                    const val = e.target.value;
                    setGrade(val);
                    updateState(position, altPos, market, salary, val, timeline, primaryGoal, hardSkillsSummary, softSkillsSummary);
                  }}
                  placeholder="Senior ML / AI Architect"
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Срок достижения целей</label>
                <input
                  type="text"
                  value={timeline}
                  onChange={e => {
                    const val = e.target.value;
                    setTimeline(val);
                    updateState(position, altPos, market, salary, grade, val, primaryGoal, hardSkillsSummary, softSkillsSummary);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>
            </div>

            {/* Hard Skills Description & Manager */}
            <div className="pt-3 border-t border-[var(--color-border)] space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs text-[var(--text-primary)] flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Описание Hard Skills (Технические навыки и стек)</span>
                </label>
                <span className="text-[10px] text-[var(--text-secondary)]">Указываются через запятую</span>
              </div>
              <textarea
                rows={2}
                value={hardSkillsSummary}
                onChange={e => {
                  const val = e.target.value;
                  setHardSkillsSummary(val);
                  updateState(position, altPos, market, salary, grade, timeline, primaryGoal, val, softSkillsSummary);
                }}
                placeholder="Python, PyTorch, LLM Fine-Tuning, MLOps, RAG, Distributed Training..."
                className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium leading-relaxed"
              />

              {/* Quick Hard Skills Chip Editor */}
              <div className="space-y-2 bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--color-border)]">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newHardSkillInput}
                    onChange={e => setNewHardSkillInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHardSkillTag();
                      }
                    }}
                    placeholder="+ Добавить технический навык (напр. PyTorch, Docker)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddHardSkillTag}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Добавить</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {state.skills.filter(s => s.category === 'Hard Skill' || s.category === 'Architecture' || s.category === 'Domain').map(s => (
                    <span
                      key={s.id}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium text-[11px]"
                    >
                      <span>{s.name}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSkillChip(s.id)}
                        className="hover:text-rose-500 ml-1 cursor-pointer"
                        title="Удалить навык"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Soft Skills Description & Manager */}
            <div className="pt-3 border-t border-[var(--color-border)] space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs text-[var(--text-primary)] flex items-center space-x-1.5">
                  <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Описание Soft Skills (Гибкие навыки и лидерские качества)</span>
                </label>
                <span className="text-[10px] text-[var(--text-secondary)]">Указываются через запятую</span>
              </div>
              <textarea
                rows={2}
                value={softSkillsSummary}
                onChange={e => {
                  const val = e.target.value;
                  setSoftSkillsSummary(val);
                  updateState(position, altPos, market, salary, grade, timeline, primaryGoal, hardSkillsSummary, val);
                }}
                placeholder="Technical Leadership, Agile Mentorship, Stakeholder Management..."
                className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium leading-relaxed"
              />

              {/* Quick Soft Skills Chip Editor */}
              <div className="space-y-2 bg-[var(--bg-main)] p-3 rounded-xl border border-[var(--color-border)]">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newSoftSkillInput}
                    onChange={e => setNewSoftSkillInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSoftSkillTag();
                      }
                    }}
                    placeholder="+ Добавить гибкий навык (напр. Mentorship, Negotiation)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddSoftSkillTag}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Добавить</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {state.skills.filter(s => s.category === 'Soft Skill' || s.category === 'Process/Agile').map(s => (
                    <span
                      key={s.id}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-medium text-[11px]"
                    >
                      <span>{s.name}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSkillChip(s.id)}
                        className="hover:text-rose-500 ml-1 cursor-pointer"
                        title="Удалить навык"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{saved ? 'Сохранено!' : 'Сохранить изменения профиля и навыков'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Data Backup & Reset */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-[var(--text-primary)] pb-2 border-b border-[var(--color-border)]">
              Резервное копирование данных
            </h3>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Вы можете экспортировать весь прогресс, компании, вакансии и SWOT в единый JSON-файл для бэкапа.
            </p>

            <button
              onClick={onExportJson}
              className="w-full py-2.5 px-4 bg-[var(--bg-main)] border border-[var(--color-border)] hover:bg-[var(--bg-hover-sidebar)] text-[var(--text-primary)] font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Скачать JSON Бэкап</span>
            </button>
          </div>

          <div className="bg-[var(--bg-card)] border border-rose-500/30 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-rose-600 dark:text-rose-400 pb-2 border-b border-rose-500/20 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Опасная зона</span>
            </h3>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Сброс прогресса возвращает систему к базовому стартовому состоянию.
            </p>

            <button
              onClick={() => {
                if (window.confirm('Вы уверены, что хотите сбросить весь сохраненный прогресс?')) {
                  onResetState();
                }
              }}
              className="w-full py-2.5 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Сбросить весь прогресс</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
