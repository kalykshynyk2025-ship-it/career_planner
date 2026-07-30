import React, { useState } from 'react';
import { CheckSquare, Plus, Trash2, Sparkles, AlertCircle, Tag, Check, ArrowRight, BookOpen } from 'lucide-react';
import { CareerState, NotionCriterion } from '../types';
import { KNOWLEDGE_CRITERIA } from '../data/knowledgeBase';
import { KnowledgeBaseModal } from './KnowledgeBaseModal';

interface CriteriaBoardViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onAskAi: (prompt: string) => void;
}

export const CriteriaBoardView: React.FC<CriteriaBoardViewProps> = ({
  state,
  onChangeState,
  onAskAi
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<NotionCriterion['category']>('Compensation');
  const [newPriority, setNewPriority] = useState<NotionCriterion['priority']>('Обязательно');
  const [isAdding, setIsAdding] = useState(false);
  const [isKbOpen, setIsKbOpen] = useState(false);

  const criteria = state.notion_criteria || [];

  const handleClearAllCriteria = () => {
    if (criteria.length === 0) return;
    onChangeState(prev => ({
      ...prev,
      notion_criteria: []
    }));
  };

  const handleAddGlobalCriteria = () => {
    // Top 14 essential criteria from Knowledge Base (Compass & Categories)
    const presetItems = KNOWLEDGE_CRITERIA.filter(kc => 
      kc.id.startsWith('kc_global_') || ['kc_1', 'kc_2', 'kc_3', 'kc_15', 'kc_30', 'kc_50', 'kc_80'].includes(kc.id)
    );
    const existingTitles = new Set(criteria.map(c => c.title.toLowerCase()));
    
    const newItems: NotionCriterion[] = presetItems
      .filter(item => !existingTitles.has(item.title.toLowerCase()))
      .map(item => ({
        id: 'c_preset_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        title: item.title,
        description: item.description,
        checked: true,
        category: (['Compensation', 'Work Environment', 'Tech Stack', 'Growth & Team'].includes(item.category)
          ? item.category
          : 'Growth & Team') as NotionCriterion['category'],
        priority: 'Обязательно'
      }));

    onChangeState(prev => ({
      ...prev,
      notion_criteria: [...newItems, ...(prev.notion_criteria || [])]
    }));
  };

  const handleToggle = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      notion_criteria: prev.notion_criteria.map(c => 
        c.id === id ? { ...c, checked: !c.checked } : c
      )
    }));
  };

  const handleDelete = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      notion_criteria: prev.notion_criteria.filter(c => c.id !== id)
    }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: NotionCriterion = {
      id: 'c_' + Date.now(),
      title: newTitle.trim(),
      description: newDesc.trim() || 'Пользовательский критерий выбора компании',
      checked: true,
      category: newCategory,
      priority: newPriority
    };

    onChangeState(prev => ({
      ...prev,
      notion_criteria: [...prev.notion_criteria, newItem]
    }));

    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  const checkedCount = criteria.filter(c => c.checked).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                Доска №1: Критерии выбора компании (от 10 критериев)
              </h1>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Сформируйте обязательные и желательные условия подбора работодателя (доход в ₽, стек, удаленка, культура)
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleAddGlobalCriteria}
            className="px-3.5 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            title="Добавить ключевые критерии из Карьерного Компаса"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Карьерный Компас (12+)</span>
          </button>
          <button
            onClick={() => setIsKbOpen(true)}
            className="px-3.5 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>База Знаний (200+)</span>
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="px-3.5 py-2 bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-primary)] hover:bg-[var(--color-border)]/20 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить</span>
          </button>
          {criteria.length > 0 && (
            <button
              onClick={handleClearAllCriteria}
              className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              title="Очистить все критерии на доске"
            >
              <Trash2 className="w-4 h-4" />
              <span>Очистить критерии</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress & Badge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)] font-medium">Всего критериев</div>
            <div className="text-2xl font-bold text-[var(--text-primary)] mt-1">{criteria.length} / 10+</div>
          </div>
          <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${criteria.length >= 10 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'}`}>
            {criteria.length >= 10 ? '✓ Норма выполнена' : 'Нужно от 10 критериев'}
          </span>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)] font-medium">Активных факторов</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{checkedCount}</div>
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Учтены в фильтрах</div>
        </div>
      </div>

      {/* Add Modal/Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-[var(--bg-card)] border border-blue-500/30 rounded-2xl p-5 space-y-4 shadow-md">
          <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center space-x-2">
            <Plus className="w-4 h-4 text-blue-500" />
            <span>Новый критерий выбора</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Название критерия</label>
              <input
                type="text"
                placeholder="Например: Полная удаленка с вилкой от 350 000 ₽"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Категория</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as NotionCriterion['category'])}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] focus:outline-hidden focus:border-blue-500"
                >
                  <option value="Compensation">Компенсация и доход ₽</option>
                  <option value="Work Environment">Условия и Формат</option>
                  <option value="Tech Stack">Стек и Архитектура</option>
                  <option value="Growth & Team">Команда и Рост</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Приоритет</label>
                <select
                  value={newPriority}
                  onChange={e => setNewPriority(e.target.value as NotionCriterion['priority'])}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] focus:outline-hidden focus:border-blue-500"
                >
                  <option value="Обязательно">Обязательно (Must Have)</option>
                  <option value="Желательно">Желательно (Nice to Have)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Подробное описание / Метрика</label>
            <input
              type="text"
              placeholder="Медицинская страховка со стоматологией, официальное трудоустройство..."
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs rounded-xl border border-[var(--color-border)] hover:bg-gray-500/10"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </form>
      )}

      {/* Criteria Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {criteria.map((item, idx) => (
          <div
            key={item.id}
            className={`
              bg-[var(--bg-card)] border rounded-2xl p-5 space-y-3 transition-all relative group
              ${item.checked ? 'border-blue-500/40 shadow-xs' : 'border-[var(--color-border)] opacity-60'}
            `}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`
                    w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors
                    ${item.checked ? 'bg-blue-600 text-white' : 'border border-[var(--color-border)] bg-[var(--bg-main)]'}
                  `}
                >
                  {item.checked && <Check className="w-4 h-4 stroke-[3]" />}
                </button>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-[var(--text-secondary)]">#{idx + 1}</span>
                    <h3 className={`font-semibold text-sm ${item.checked ? 'text-[var(--text-primary)]' : 'line-through text-[var(--text-secondary)]'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDelete(item.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                title="Удалить"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-[11px]">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-500/10 text-[var(--text-secondary)] font-medium">
                {item.category === 'Compensation' && 'Доход ₽'}
                {item.category === 'Work Environment' && 'Условия'}
                {item.category === 'Tech Stack' && 'Стек'}
                {item.category === 'Growth & Team' && 'Команда'}
              </span>

              <span className={`px-2 py-0.5 font-bold rounded-md ${item.priority === 'Обязательно' || item.priority === 'Must Have' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                {item.priority === 'Must Have' ? 'Обязательно' : item.priority === 'Nice to Have' ? 'Желательно' : (item.priority || 'Обязательно')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <KnowledgeBaseModal
        isOpen={isKbOpen}
        onClose={() => setIsKbOpen(false)}
        defaultTab="criteria"
        state={state}
        onChangeState={onChangeState}
      />
    </div>
  );
};
