import React, { useState } from 'react';
import { 
  Compass, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert, 
  Sparkles,
  X,
  RefreshCw,
  Zap
} from 'lucide-react';
import { SWOT, CareerState } from '../types';
import { TargetGoalBanner } from './TargetGoalBanner';

interface SwotViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onAskAi: (prompt: string) => void;
}

export const SwotView: React.FC<SwotViewProps> = ({
  state,
  onChangeState,
  onAskAi
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [quadrant, setQuadrant] = useState<keyof SWOT>('strengths');
  const [itemText, setItemText] = useState('');

  const swot = state.swot || {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  };

  const handleSyncFromProfileSkills = () => {
    const hardSummary = state.goals?.hardSkillsSummary || state.skills.filter(s => s.category === 'Hard Skill').map(s => s.name).join(', ') || 'Python, PyTorch, LLM, MLOps, System Design';
    const softSummary = state.goals?.softSkillsSummary || state.skills.filter(s => s.category === 'Soft Skill').map(s => s.name).join(', ') || 'Technical Leadership, Mentorship, Presentation';
    const pos = state.selected_position || 'Senior ML & DS Engineer';
    const goal = state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer';
    const grade = state.goals?.targetGrade || 'Senior';

    const profileStrengths = [
      `Экспертиза в Hard Skills (из профиля): ${hardSummary}`,
      `Лидерские и Soft навыки (из профиля): ${softSummary}`,
      `Целевая роль и грейд: ${pos} (${grade})`,
      `Главная карьерная цель: ${goal}`
    ];

    onChangeState(prev => ({
      ...prev,
      swot: {
        ...prev.swot,
        strengths: Array.from(new Set([...profileStrengths, ...(prev.swot.strengths || [])]))
      }
    }));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemText.trim()) return;

    onChangeState(prev => ({
      ...prev,
      swot: {
        ...prev.swot,
        [quadrant]: [...(prev.swot[quadrant] || []), itemText.trim()]
      }
    }));

    setItemText('');
    setShowAddModal(false);
  };

  const handleDeleteItem = (quad: keyof SWOT, index: number) => {
    onChangeState(prev => ({
      ...prev,
      swot: {
        ...prev.swot,
        [quad]: prev.swot[quad].filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Target Goal Banner */}
      <TargetGoalBanner 
        state={state} 
        subtitle="SWOT-анализ профиля опирается на карьерную цель, вилку и список Hard/Soft навыков из «Настроек профиля и навыков»."
      />

      {/* Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">SWOT-анализ карьерного профиля</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Стратегическая оценка сильных, слабых сторон, возможностей и угроз
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          <button
            onClick={handleSyncFromProfileSkills}
            className="px-3.5 py-2 bg-purple-600/10 hover:bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            title="Заполнить сильные стороны навыками из Настроек профиля"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Заполнить из Настроек навыков</span>
          </button>

          <button
            onClick={() => onAskAi('Проведи детальный SWOT-анализ моего карьерного профиля и дай стратегические рекомендации по усилению позиционирования.')}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Сгенерировать AI SWOT</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-[var(--bg-main)] border border-[var(--color-border)] text-[var(--text-primary)] hover:bg-[var(--bg-hover-sidebar)] rounded-xl text-xs font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить пункт</span>
          </button>
        </div>
      </div>

      {/* 4-Quadrant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Quadrant 1: Strengths */}
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Strengths (Сильные стороны)
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              {swot.strengths.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {swot.strengths.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] flex items-start justify-between gap-2 text-xs">
                <p className="font-medium text-[var(--text-primary)] leading-relaxed">{item}</p>
                <button
                  onClick={() => handleDeleteItem('strengths', idx)}
                  className="text-[var(--text-secondary)] hover:text-rose-500 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 2: Weaknesses */}
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Weaknesses (Слабые стороны)
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
              {swot.weaknesses.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {swot.weaknesses.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] flex items-start justify-between gap-2 text-xs">
                <p className="font-medium text-[var(--text-primary)] leading-relaxed">{item}</p>
                <button
                  onClick={() => handleDeleteItem('weaknesses', idx)}
                  className="text-[var(--text-secondary)] hover:text-rose-500 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 3: Opportunities */}
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Opportunities (Возможности)
              </h3>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
              {swot.opportunities.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {swot.opportunities.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] flex items-start justify-between gap-2 text-xs">
                <p className="font-medium text-[var(--text-primary)] leading-relaxed">{item}</p>
                <button
                  onClick={() => handleDeleteItem('opportunities', idx)}
                  className="text-[var(--text-secondary)] hover:text-rose-500 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 4: Threats */}
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[var(--text-primary)]">
                Threats (Угрозы и риски)
              </h3>
            </div>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md">
              {swot.threats.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {swot.threats.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] flex items-start justify-between gap-2 text-xs">
                <p className="font-medium text-[var(--text-primary)] leading-relaxed">{item}</p>
                <button
                  onClick={() => handleDeleteItem('threats', idx)}
                  className="text-[var(--text-secondary)] hover:text-rose-500 cursor-pointer shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal Add Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Добавить пункт в SWOT</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[var(--text-secondary)] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Квадрант SWOT</label>
                <select
                  value={quadrant}
                  onChange={e => setQuadrant(e.target.value as keyof SWOT)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)] font-semibold"
                >
                  <option value="strengths">Strengths (Сильные стороны)</option>
                  <option value="weaknesses">Weaknesses (Слабые стороны)</option>
                  <option value="opportunities">Opportunities (Возможности)</option>
                  <option value="threats">Threats (Угрозы)</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Описание фактора</label>
                <textarea
                  rows={3}
                  required
                  placeholder="например, Опыт работы с микрофронтендами в финтех..."
                  value={itemText}
                  onChange={e => setItemText(e.target.value)}
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
