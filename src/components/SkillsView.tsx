import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Calendar, 
  X,
  Sparkles,
  Layers
} from 'lucide-react';
import { Skill, MissingSkill, CareerState } from '../types';

interface SkillsViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onAskAi: (prompt: string) => void;
}

export const SkillsView: React.FC<SkillsViewProps> = ({
  state,
  onChangeState,
  onAskAi
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'gaps'>('gaps');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddGap, setShowAddGap] = useState(false);

  // Skill Form
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState<Skill['category']>('Hard Skill');
  const [level, setLevel] = useState<Skill['level']>('Senior');
  const [evidence, setEvidence] = useState('');

  // Gap Form
  const [gapName, setGapName] = useState('');
  const [priority, setPriority] = useState<MissingSkill['priority']>('High');
  const [effort, setEffort] = useState<MissingSkill['effort']>('Medium');
  const [targetDate, setTargetDate] = useState('Месяц 1-2');
  const [actionPlan, setActionPlan] = useState('');

  const skills = state.skills || [];
  const missingSkills = state.missing_skills || [];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    const newS: Skill = {
      id: Date.now().toString(),
      name: skillName.trim(),
      category,
      level,
      evidence: evidence || 'Коммерческий опыт на реальных проектах.'
    };

    onChangeState(prev => ({
      ...prev,
      skills: [...prev.skills, newS]
    }));

    setSkillName('');
    setEvidence('');
    setShowAddSkill(false);
  };

  const handleAddGap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gapName.trim()) return;

    const newG: MissingSkill = {
      id: Date.now().toString(),
      skillName: gapName.trim(),
      priority,
      effort,
      targetDate,
      actionPlan: actionPlan || 'Изучение документации, курсов и реструктуризация проектов.'
    };

    onChangeState(prev => ({
      ...prev,
      missing_skills: [...prev.missing_skills, newG]
    }));

    setGapName('');
    setActionPlan('');
    setShowAddGap(false);
  };

  const handleDeleteSkill = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const handleDeleteGap = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      missing_skills: prev.missing_skills.filter(g => g.id !== id)
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Матрица компетенций & Gap Analysis</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Инвентаризация текущего стека и стратегия устранения разрывов
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-[var(--bg-main)] border border-[var(--color-border)] rounded-xl p-1 flex space-x-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('gaps')}
              className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === 'gaps' ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              Skill Gap Анализ ({missingSkills.length})
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === 'matrix' ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              Моя Матрица ({skills.length})
            </button>
          </div>

          <button
            onClick={() => onAskAi('Проведи глубокий GAP-анализ моих навыков против требований ведущих финтех и SaaS компаний.')}
            className="px-3.5 py-2 bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20 rounded-xl text-xs font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Анализ</span>
          </button>
        </div>
      </div>

      {activeTab === 'gaps' ? (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Выявленные разрывы навыков (Missing Skills)
            </span>
            <button
              onClick={() => setShowAddGap(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить Skill Gap</span>
            </button>
          </div>

          {/* Gaps Table */}
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[var(--bg-main)] border-b border-[var(--color-border)] text-[var(--text-secondary)] font-semibold uppercase tracking-wider">
                    <th className="p-4">Отсутствующий навык</th>
                    <th className="p-4">Приоритет</th>
                    <th className="p-4">Сложность</th>
                    <th className="p-4">Целевой срок</th>
                    <th className="p-4">План изучения & Ресурсы</th>
                    <th className="p-4 text-right">Действие</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] text-[var(--text-primary)]">
                  {missingSkills.map((gap) => (
                    <tr key={gap.id} className="hover:bg-[var(--bg-hover-sidebar)] transition-colors">
                      <td className="p-4 font-bold text-sm text-[var(--text-primary)]">
                        {gap.skillName}
                      </td>

                      <td className="p-4">
                        <span className={`
                          px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                          ${gap.priority === 'High' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}
                        `}>
                          {gap.priority} Priority
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-[var(--text-secondary)]">
                        {gap.effort} Effort
                      </td>

                      <td className="p-4 font-medium text-[var(--text-primary)] flex items-center space-x-1 pt-5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{gap.targetDate}</span>
                      </td>

                      <td className="p-4 max-w-sm text-[var(--text-primary)] leading-relaxed">
                        {gap.actionPlan}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteGap(gap.id)}
                          className="p-1.5 text-[var(--text-secondary)] hover:text-rose-500 transition-colors cursor-pointer"
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

        </div>
      ) : (
        /* Skill Matrix Tab */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
              Текущие подтвержденные навыки
            </span>
            <button
              onClick={() => setShowAddSkill(true)}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить навык</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h4 className="font-bold text-sm text-[var(--text-primary)]">{s.name}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                    {s.level}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  <strong>Доказательства:</strong> {s.evidence}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)] font-semibold">
                    {s.category}
                  </span>
                  <button
                    onClick={() => handleDeleteSkill(s.id)}
                    className="text-[var(--text-secondary)] hover:text-rose-500 cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddSkill && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Добавить навык</h3>
              <button onClick={() => setShowAddSkill(false)} className="text-[var(--text-secondary)] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSkill} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Название навыка</label>
                <input
                  type="text"
                  required
                  placeholder="React / System Design / Node.js"
                  value={skillName}
                  onChange={e => setSkillName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Категория</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  >
                    <option value="Hard Skill">Hard Skill</option>
                    <option value="Soft Skill">Soft Skill</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Process/Agile">Process / Agile</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Уровень</label>
                  <select
                    value={level}
                    onChange={e => setLevel(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  >
                    <option value="Intern">Intern (Интерн)</option>
                    <option value="Junior">Junior (Джуниор)</option>
                    <option value="Middle">Middle (Мидл)</option>
                    <option value="Middle+">Middle+ (Мидл+)</option>
                    <option value="Senior">Senior (Сеньор)</option>
                    <option value="Lead">Lead (Лид / Тимлид)</option>
                    <option value="Pro">Pro / Expert (Про / Эксперт)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Доказательства (кейсы / опыт)</label>
                <textarea
                  rows={2}
                  value={evidence}
                  onChange={e => setEvidence(e.target.value)}
                  placeholder="Опыт использования в коммерческих проектах..."
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddSkill(false)} className="px-4 py-2 border rounded-xl text-[var(--text-secondary)]">Отмена</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Gap Modal */}
      {showAddGap && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl w-full max-w-md p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Добавить Skill Gap</h3>
              <button onClick={() => setShowAddGap(false)} className="text-[var(--text-secondary)] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddGap} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Отсутствующий навык</label>
                <input
                  type="text"
                  required
                  placeholder="LeetCode Medium / System Design Architecture"
                  value={gapName}
                  onChange={e => setGapName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Приоритет</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Целевой срок</label>
                  <input
                    type="text"
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">План закрытия разрыва</label>
                <textarea
                  rows={2}
                  value={actionPlan}
                  onChange={e => setActionPlan(e.target.value)}
                  placeholder="Решение 20 задач, прохождение курса..."
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddGap(false)} className="px-4 py-2 border rounded-xl text-[var(--text-secondary)]">Отмена</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold">Сохранить</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
