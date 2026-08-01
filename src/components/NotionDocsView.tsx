import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Copy, 
  Download, 
  Plus, 
  Check, 
  FileText, 
  Sparkles, 
  Trash2, 
  Edit2, 
  Filter,
  CheckCircle2,
  RefreshCw,
  FolderDown
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CareerState, NotionCriterion, ActiveView } from '../types';
import { generateComprehensiveCareerMarkdown } from '../utils/exportMarkdown';
import { CareerDocumentDesigner } from './CareerDocumentDesigner';
import { INITIAL_CAREER_STATE } from '../data/workflow';
import { ExportBoardButton } from './ExportBoardButton';

interface NotionDocsViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onOpenNotionExport: () => void;
  onSelectView?: (view: ActiveView) => void;
}

export const NotionDocsView: React.FC<NotionDocsViewProps> = ({
  state,
  onChangeState,
  onOpenNotionExport,
  onSelectView
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'checklist' | 'full_doc'>('checklist');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCat, setNewCat] = useState<NotionCriterion['category']>('Work Environment');
  const [showAddForm, setShowAddForm] = useState(false);

  const criteria = state.notion_criteria || [];

  const handleToggleCriterion = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      notion_criteria: prev.notion_criteria.map(c => 
        c.id === id ? { ...c, checked: !c.checked } : c
      )
    }));
  };

  const handleAddCriterion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: NotionCriterion = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDesc.trim() || 'Описание критерия выбора компании.',
      checked: true,
      category: newCat
    };

    onChangeState(prev => ({
      ...prev,
      notion_criteria: [...(prev.notion_criteria || []), newItem]
    }));

    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const handleDeleteCriterion = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      notion_criteria: prev.notion_criteria.filter(c => c.id !== id)
    }));
  };

  const filteredCriteria = criteria.filter(c => {
    if (filterCategory === 'All') return true;
    return c.category === filterCategory;
  });

  // Generate Comprehensive Document Markdown
  const generateDocumentMarkdown = () => {
    return generateComprehensiveCareerMarkdown(state);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateDocumentMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshData = () => {
    onChangeState(prev => ({
      ...prev,
      completed_steps: Array.from(new Set(prev.completed_steps)).filter(s => s >= 1 && s <= 8)
    }));
  };

  const handleLoadFilledData = () => {
    onChangeState(prev => ({
      ...prev,
      notion_criteria: INITIAL_CAREER_STATE.notion_criteria,
      selected_companies: INITIAL_CAREER_STATE.selected_companies,
      selected_vacancies: INITIAL_CAREER_STATE.selected_vacancies,
      newsletters: INITIAL_CAREER_STATE.newsletters,
      swot: INITIAL_CAREER_STATE.swot,
      completed_steps: [1, 2, 3, 4, 5, 6, 7],
      current_step: 8
    }));
  };

  const handleClearOldData = () => {
    if (window.confirm('Вы действительно хотите очистить старые данные всех досок?')) {
      onChangeState(prev => ({
        ...prev,
        notion_criteria: [],
        selected_companies: [],
        selected_vacancies: [],
        newsletters: [],
        vacancy_analyses: [],
        skills: [],
        missing_skills: [],
        roadmap: [],
        swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] },
        completed_steps: [],
        current_step: 1
      }));
    }
  };

  return (
    <div id="board-doc-view" className="space-y-6">
      
      {/* View Header Tabs */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Документ & Экспорт в PDF</h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Интерактивная доска критериев и генерация итогового PDF отчета
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="bg-[var(--bg-main)] border border-[var(--color-border)] rounded-xl p-1 flex space-x-1 w-full sm:w-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === 'checklist' ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                Доска критериев ({criteria.length})
              </button>
              <button
                onClick={() => setActiveTab('full_doc')}
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === 'full_doc' ? 'bg-blue-600 text-white shadow-xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                Итоговый Документ
              </button>
            </div>

            <ExportBoardButton 
              state={state} 
              boardType="all" 
              boardTitle="Все доски" 
              onOpenPdfModal={onOpenNotionExport}
              variant="primary"
            />
            <button
              onClick={onOpenNotionExport}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Экспорт в PDF</span>
            </button>
          </div>
        </div>

        {/* Action Buttons for Data Sync / Load / Clear */}
        <div className="pt-2 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[var(--text-secondary)] font-semibold">Управление данными досок:</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefreshData}
              className="px-2.5 py-1 bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-lg font-semibold flex items-center space-x-1 cursor-pointer"
              title="Обновить текущие данные досок"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Обновить данные</span>
            </button>
            <button
              onClick={handleLoadFilledData}
              className="px-2.5 py-1 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-lg font-semibold flex items-center space-x-1 cursor-pointer"
              title="Загрузить готовые данные из заполненных досок"
            >
              <FolderDown className="w-3.5 h-3.5" />
              <span>Загрузить из заполненных досок</span>
            </button>
            <button
              onClick={handleClearOldData}
              className="px-2.5 py-1 bg-rose-600/10 hover:bg-rose-600/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-lg font-semibold flex items-center space-x-1 cursor-pointer"
              title="Очистить старые карточки досок"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Очистить старые данные</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'checklist' ? (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            {/* Category Filters */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[var(--text-secondary)] font-medium mr-1 flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Категории:</span>
              </span>
              {['All', 'Compensation', 'Work Environment', 'Tech Stack', 'Growth & Team'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${filterCategory === cat ? 'bg-blue-600 text-white' : 'bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  {cat === 'All' && 'Все'}
                  {cat === 'Compensation' && 'Доход и бенефиты'}
                  {cat === 'Work Environment' && 'Условия и график'}
                  {cat === 'Tech Stack' && 'Стек и архитектура'}
                  {cat === 'Growth & Team' && 'Команда и рост'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить критерий</span>
            </button>
          </div>

          {/* Add New Criterion Form */}
          {showAddForm && (
            <form onSubmit={handleAddCriterion} className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-[var(--text-primary)]">Новый критерий компании</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Название (например: Белая зарплата)"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
                <select
                  value={newCat}
                  onChange={e => setNewCat(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Compensation">Доход и бенефиты (Compensation)</option>
                  <option value="Work Environment">Условия и график (Work Environment)</option>
                  <option value="Tech Stack">Стек и архитектура (Tech Stack)</option>
                  <option value="Growth & Team">Команда и рост (Growth & Team)</option>
                </select>
              </div>
              <textarea
                placeholder="Короткое объяснение почему это важно..."
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--text-secondary)]"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Сохранить
                </button>
              </div>
            </form>
          )}

          {/* Checklist Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCriteria.map((item) => (
              <div
                key={item.id}
                className={`
                  p-4 rounded-2xl border transition-all duration-150 space-y-2
                  ${item.checked 
                    ? 'bg-[var(--bg-card)] border-[var(--color-border)] shadow-2xs' 
                    : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-70'
                  }
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <button
                    onClick={() => handleToggleCriterion(item.id)}
                    className="flex items-start space-x-3 text-left cursor-pointer group"
                  >
                    <div className="pt-0.5 text-blue-600 dark:text-blue-400">
                      {item.checked ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-[var(--text-secondary)]" />}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${item.checked ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] line-through'}`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDeleteCriterion(item.id)}
                    className="p-1 text-[var(--text-secondary)] hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)] font-semibold">
                    {item.category === 'Compensation' ? 'Доход и бенефиты' :
                     item.category === 'Work Environment' ? 'Условия и график' :
                     item.category === 'Tech Stack' ? 'Стек и архитектура' :
                     item.category === 'Growth & Team' ? 'Команда и рост' : item.category}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.checked ? '✓ Включено в фильтр' : 'Пропущено'}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Render Designer Career Document Page */
        <CareerDocumentDesigner
          state={state}
          onChangeState={onChangeState}
          onOpenNotionExport={onOpenNotionExport}
          onSelectView={onSelectView}
        />
      )}

    </div>
  );
};
