import React, { useState } from 'react';
import { X, Search, CheckSquare, Building2, Briefcase, FileText, Plus, Check, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { 
  KNOWLEDGE_CRITERIA, 
  KNOWLEDGE_COMPANIES, 
  KNOWLEDGE_SPECIALTIES, 
  KNOWLEDGE_SWOT_EXPERT_ANSWERS,
  KnowledgeCriterion,
  KnowledgeCompany,
  KnowledgeSpecialty
} from '../data/knowledgeBase';
import { CareerState, NotionCriterion, Company } from '../types';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'criteria' | 'companies' | 'specialties' | 'swot';
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'criteria',
  state,
  onChangeState
}) => {
  const [activeTab, setActiveTab] = useState<'criteria' | 'companies' | 'specialties' | 'swot'>(defaultTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [addedSuccessMessage, setAddedSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setAddedSuccessMessage(msg);
    setTimeout(() => setAddedSuccessMessage(null), 3000);
  };

  // 1. Criteria logic
  const criteriaCategories = ['All', 'Compensation', 'Work Environment', 'Tech Stack', 'Growth & Team', 'Benefits & Culture'];
  const categoryLabels: Record<string, string> = {
    'All': 'Все категории',
    'Compensation': '💰 Доход и Компенсация',
    'Work Environment': '🏠 Условия и Формат',
    'Tech Stack': '⚡ Технологический Стек',
    'Growth & Team': '🚀 Команда и Рост',
    'Benefits & Culture': '🛡️ Бенефиты и Культура'
  };

  const filteredCriteria = KNOWLEDGE_CRITERIA.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleToggleSelectCriterion = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAddSelectedCriteriaToBoard = () => {
    if (selectedIds.length === 0) return;
    const itemsToAdd = KNOWLEDGE_CRITERIA.filter(c => selectedIds.includes(c.id));
    
    const existingTitles = new Set((state.notion_criteria || []).map(c => c.title.toLowerCase()));
    const newNotionItems: NotionCriterion[] = itemsToAdd
      .filter(item => !existingTitles.has(item.title.toLowerCase()))
      .map(item => ({
        id: 'kc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        title: item.title,
        description: item.description,
        checked: true,
        category: (['Compensation', 'Work Environment', 'Tech Stack', 'Growth & Team'].includes(item.category) 
          ? item.category 
          : 'Work Environment') as NotionCriterion['category'],
        priority: item.priority
      }));

    onChangeState(prev => ({
      ...prev,
      notion_criteria: [...(prev.notion_criteria || []), ...newNotionItems]
    }));

    showNotification(`Добавлено ${newNotionItems.length} критериев на Доску №1!`);
    setSelectedIds([]);
  };

  // 2. Companies logic
  const filteredCompanies = KNOWLEDGE_COMPANIES.filter(c => {
    return c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.mlDsFocus.toLowerCase().includes(searchQuery.toLowerCase()) ||
           c.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAddCompanyToBoard = (company: KnowledgeCompany) => {
    const existing = (state.selected_companies || []).some(c => c.name.toLowerCase() === company.name.toLowerCase());
    if (existing) {
      showNotification(`Компания "${company.name}" уже на Доске №2`);
      return;
    }

    const newComp: Company = {
      id: 'comp_' + Date.now(),
      name: company.name,
      tier: 'BigTech',
      techStack: company.techStack,
      sponsorship: company.accreditation,
      careerLink: company.website,
      notes: `ML/DS Фокус: ${company.mlDsFocus}. Бенефиты: ${company.benefits.join(', ')}`,
      rating: 5,
      status: 'In Target List'
    };

    onChangeState(prev => ({
      ...prev,
      selected_companies: [...(prev.selected_companies || []), newComp]
    }));

    showNotification(`Компания "${company.name}" добавлена в Доску №2!`);
  };

  // 3. Specialties logic
  const filteredSpecialties = KNOWLEDGE_SPECIALTIES.filter(s => {
    return s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           s.keySkills.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleSelectSpecialty = (spec: KnowledgeSpecialty) => {
    onChangeState(prev => ({
      ...prev,
      selected_position: spec.title,
      goals: {
        ...prev.goals,
        expectedSalary: spec.avgSalaryRange.includes('мес') 
          ? `${(parseInt(spec.avgSalaryRange) * 12).toLocaleString()} ₽ / год` 
          : spec.avgSalaryRange
      }
    }));
    showNotification(`Специальность "${spec.title}" выбрана в качестве основной!`);
  };

  // 4. SWOT Expert Auto-fill
  const handleFillSwotFromKnowledgeBase = () => {
    onChangeState(prev => ({
      ...prev,
      swot_analysis: {
        strengths: KNOWLEDGE_SWOT_EXPERT_ANSWERS.strengths.map(s => `${s.questionText}\n▸ ${s.answerText}`).join('\n\n'),
        weaknesses: KNOWLEDGE_SWOT_EXPERT_ANSWERS.weaknesses.map(w => `${w.questionText}\n▸ ${w.answerText}`).join('\n\n'),
        opportunities: KNOWLEDGE_SWOT_EXPERT_ANSWERS.opportunities.map(o => `${o.questionText}\n▸ ${o.answerText}`).join('\n\n'),
        threats: KNOWLEDGE_SWOT_EXPERT_ANSWERS.threats.map(t => `${t.questionText}\n▸ ${t.answerText}`).join('\n\n'),
      }
    }));
    showNotification('SWOT-анализ полностью заполнен экспертными данными из Базы Знаний!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-[var(--color-border)] flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center space-x-2">
                <span>Инженерная База Знаний</span>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium">
                  200+ критериев • 20 компаний ML/DS
                </span>
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Локальные валидированные знания без использования сторонних AI-сервисов
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast */}
        {addedSuccessMessage && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-400 px-6 py-2.5 text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4" />
              <span>{addedSuccessMessage}</span>
            </span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-[var(--color-border)] bg-[var(--bg-card)] px-4 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('criteria'); setSearchQuery(''); }}
            className={`px-4 py-3 text-xs font-semibold flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'criteria'
                ? 'border-blue-500 text-blue-500 bg-blue-500/5'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>200+ Критериев отбора ({KNOWLEDGE_CRITERIA.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('companies'); setSearchQuery(''); }}
            className={`px-4 py-3 text-xs font-semibold flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'companies'
                ? 'border-blue-500 text-blue-500 bg-blue-500/5'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>20 Росс. Компаний ML/DS ({KNOWLEDGE_COMPANIES.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('specialties'); setSearchQuery(''); }}
            className={`px-4 py-3 text-xs font-semibold flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'specialties'
                ? 'border-blue-500 text-blue-500 bg-blue-500/5'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>База специальностей ({KNOWLEDGE_SPECIALTIES.length})</span>
          </button>

          <button
            onClick={() => { setActiveTab('swot'); setSearchQuery(''); }}
            className={`px-4 py-3 text-xs font-semibold flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'swot'
                ? 'border-blue-500 text-blue-500 bg-blue-500/5'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>SWOT-Анализ Знания</span>
          </button>
        </div>

        {/* Search Bar */}
        {activeTab !== 'swot' && (
          <div className="p-4 border-b border-[var(--color-border)] bg-[var(--bg-card)]/50 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[var(--text-secondary)]" />
              <input
                type="text"
                placeholder="Поиск по названию, описанию, технологиям..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--bg-card)] border border-[var(--color-border)] rounded-xl text-xs text-[var(--text-primary)] focus:outline-none focus:border-blue-500"
              />
            </div>

            {activeTab === 'criteria' && (
              <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                {criteriaCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {categoryLabels[cat] || cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: CRITERIA */}
          {activeTab === 'criteria' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                <div className="text-xs text-blue-400">
                  Выбрано <strong>{selectedIds.length}</strong> критериев. Вы можете отметить нужные пункты и добавить их на Доску №1.
                </div>
                {selectedIds.length > 0 && (
                  <button
                    onClick={handleAddSelectedCriteriaToBoard}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Добавить на Доску №1</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredCriteria.map(item => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleSelectCriterion(item.id)}
                      className={`p-3.5 border rounded-xl cursor-pointer transition-all flex items-start space-x-3 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-500/10 shadow-xs' 
                          : 'border-[var(--color-border)] bg-[var(--bg-card)] hover:border-slate-600'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-[var(--color-border)]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{item.title}</h4>
                          <span className={`px-1.5 py-0.5 text-[10px] rounded font-semibold shrink-0 ${
                            item.priority === 'Обязательно' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {item.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--text-secondary)] mt-1 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: COMPANIES */}
          {activeTab === 'companies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCompanies.map(comp => (
                <div key={comp.id} className="p-4 border border-[var(--color-border)] bg-[var(--bg-card)] rounded-xl space-y-3 hover:border-blue-500/40 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center space-x-2">
                        <span>{comp.name}</span>
                        {comp.accreditation && (
                          <span className="px-1.5 py-0.5 text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded font-medium">
                            Минцифры IT
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{comp.description}</p>
                    </div>
                    <button
                      onClick={() => handleAddCompanyToBoard(comp)}
                      className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all shrink-0 ml-2"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>В Доску №2</span>
                    </button>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-lg border border-[var(--color-border)]/50 space-y-1.5">
                    <div className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>ML/DS Фокус:</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{comp.mlDsFocus}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {comp.techStack.map(st => (
                      <span key={st} className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-300 rounded font-mono">
                        {st}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]/40 text-[11px] text-[var(--text-secondary)]">
                    <span>Бенефиты: {comp.benefits.slice(0, 3).join(', ')}</span>
                    <a href={comp.website} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center space-x-1">
                      <span>Карьера</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SPECIALTIES */}
          {activeTab === 'specialties' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSpecialties.map(spec => (
                <div key={spec.id} className="p-4 border border-[var(--color-border)] bg-[var(--bg-card)] rounded-xl space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[var(--text-primary)]">{spec.title}</h3>
                      <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-medium">
                        {spec.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleSelectSpecialty(spec)}
                      className="px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all shrink-0"
                    >
                      Выбрать роль
                    </button>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)]">{spec.description}</p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--color-border)]/40">
                    <span className="text-[var(--text-secondary)]">Средняя вилка:</span>
                    <span className="font-bold text-emerald-400">{spec.avgSalaryRange}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {spec.keySkills.map(sk => (
                      <span key={sk} className="px-2 py-0.5 bg-slate-800 text-[10px] text-blue-300 rounded font-mono">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SWOT KNOWLEDGE BASE */}
          {activeTab === 'swot' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">Заполнение SWOT-анализа из Базы Знаний</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Автоматически переносит 16 валидированных ответов на 16 ключевых вопросов SWOT-анализа на вашу доску.
                  </p>
                </div>
                <button
                  onClick={handleFillSwotFromKnowledgeBase}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md transition-all shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Заполнить SWOT-доску из Базы</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-4 border border-emerald-500/30 bg-emerald-500/5 rounded-xl space-y-3">
                  <h4 className="font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Сильные стороны (Strengths)</span>
                  </h4>
                  {KNOWLEDGE_SWOT_EXPERT_ANSWERS.strengths.map(item => (
                    <div key={item.questionId} className="text-xs space-y-1 border-b border-emerald-500/10 pb-2">
                      <div className="font-semibold text-[var(--text-primary)]">{item.questionText}</div>
                      <div className="text-[var(--text-secondary)] pl-2 border-l-2 border-emerald-500/40">{item.answerText}</div>
                    </div>
                  ))}
                </div>

                {/* Weaknesses */}
                <div className="p-4 border border-rose-500/30 bg-rose-500/5 rounded-xl space-y-3">
                  <h4 className="font-bold text-xs text-rose-400 uppercase tracking-wider flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Слабые стороны (Weaknesses)</span>
                  </h4>
                  {KNOWLEDGE_SWOT_EXPERT_ANSWERS.weaknesses.map(item => (
                    <div key={item.questionId} className="text-xs space-y-1 border-b border-rose-500/10 pb-2">
                      <div className="font-semibold text-[var(--text-primary)]">{item.questionText}</div>
                      <div className="text-[var(--text-secondary)] pl-2 border-l-2 border-rose-500/40">{item.answerText}</div>
                    </div>
                  ))}
                </div>

                {/* Opportunities */}
                <div className="p-4 border border-blue-500/30 bg-blue-500/5 rounded-xl space-y-3">
                  <h4 className="font-bold text-xs text-blue-400 uppercase tracking-wider flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Возможности (Opportunities)</span>
                  </h4>
                  {KNOWLEDGE_SWOT_EXPERT_ANSWERS.opportunities.map(item => (
                    <div key={item.questionId} className="text-xs space-y-1 border-b border-blue-500/10 pb-2">
                      <div className="font-semibold text-[var(--text-primary)]">{item.questionText}</div>
                      <div className="text-[var(--text-secondary)] pl-2 border-l-2 border-blue-500/40">{item.answerText}</div>
                    </div>
                  ))}
                </div>

                {/* Threats */}
                <div className="p-4 border border-amber-500/30 bg-amber-500/5 rounded-xl space-y-3">
                  <h4 className="font-bold text-xs text-amber-400 uppercase tracking-wider flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Угрозы (Threats)</span>
                  </h4>
                  {KNOWLEDGE_SWOT_EXPERT_ANSWERS.threats.map(item => (
                    <div key={item.questionId} className="text-xs space-y-1 border-b border-amber-500/10 pb-2">
                      <div className="font-semibold text-[var(--text-primary)]">{item.questionText}</div>
                      <div className="text-[var(--text-secondary)] pl-2 border-l-2 border-amber-500/40">{item.answerText}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--color-border)] bg-slate-900/40 flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>База знаний структурирована локально без обращения к стороннему ИИ</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-primary)] hover:bg-slate-800 rounded-xl font-semibold transition-all"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
