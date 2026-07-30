import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Download, 
  RotateCcw, 
  Save, 
  Check, 
  AlertTriangle,
  Target
} from 'lucide-react';
import { CareerState } from '../types';

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
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPosition(state.selected_position || 'Senior ML & DS Engineer / AI Architect');
    setAltPos(state.alternate_position || 'Lead Data Scientist / RecSys Architect');
    setMarket(state.selected_market || 'РФ / Global Remote');
    setSalary(state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес');
    setGrade(state.goals?.targetGrade || 'Senior ML / AI Architect');
    setTimeline(state.goals?.timeline || '3-6 месяцев');
    setPrimaryGoal(state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer с вилкой 380 000 ₽ - 550 000 ₽ / мес');
  }, [state]);

  const updateState = (newPosition: string, newAltPos: string, newMarket: string, newSalary: string, newGrade: string, newTimeline: string, newGoal: string) => {
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
        timeline: newTimeline
      }
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateState(position, altPos, market, salary, grade, timeline, primaryGoal);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-[var(--text-primary)] flex items-center justify-center font-bold">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)]">Настройки профиля & Карьерные цели</h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Параметры ориентации, зарплатные вилки и управление данными
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Settings Form */}
        <div className="lg:col-span-8 bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-[var(--text-primary)] pb-3 border-b border-[var(--color-border)] flex items-center space-x-2">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Параметры таргетинга</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[var(--text-secondary)] mb-1">Главная карьерная цель</label>
              <input
                type="text"
                value={primaryGoal}
                onChange={e => {
                  const val = e.target.value;
                  setPrimaryGoal(val);
                  updateState(position, altPos, market, salary, grade, timeline, val);
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
                    updateState(val, altPos, market, salary, grade, timeline, primaryGoal);
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
                    updateState(position, val, market, salary, grade, timeline, primaryGoal);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Целевой рынок</label>
                <input
                  type="text"
                  value={market}
                  onChange={e => {
                    const val = e.target.value;
                    setMarket(val);
                    updateState(position, altPos, val, salary, grade, timeline, primaryGoal);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--text-secondary)] mb-1">Ожидаемый доход (вилка ₽ / мес)</label>
                <input
                  type="text"
                  value={salary}
                  onChange={e => {
                    const val = e.target.value;
                    setSalary(val);
                    updateState(position, altPos, market, val, grade, timeline, primaryGoal);
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
                    updateState(position, altPos, market, salary, val, timeline, primaryGoal);
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
                    updateState(position, altPos, market, salary, grade, val, primaryGoal);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-medium"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center space-x-1.5 cursor-pointer shadow-xs"
              >
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{saved ? 'Сохранено!' : 'Сохранить изменения'}</span>
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
