import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Download,
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  Building2, 
  Target, 
  Mail, 
  Sliders, 
  Compass, 
  Coins, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  FolderDown,
  Trash2
} from 'lucide-react';
import { CareerState, ActiveView } from '../types';
import { getCurrencySymbol, formatSalaryWithCurrency } from '../utils/currency';
import { generateComprehensiveCareerMarkdown, downloadMarkdownFile } from '../utils/exportMarkdown';
import { INITIAL_CAREER_STATE } from '../data/workflow';

interface CareerDocumentDesignerProps {
  state: CareerState;
  onChangeState?: React.Dispatch<React.SetStateAction<CareerState>>;
  onOpenNotionExport: () => void;
  onSelectView?: (view: ActiveView) => void;
}

export const CareerDocumentDesigner: React.FC<CareerDocumentDesignerProps> = ({
  state,
  onChangeState,
  onOpenNotionExport,
  onSelectView
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currencySymbol = getCurrencySymbol(state.currency || 'RUB');
  const salaryFormatted = formatSalaryWithCurrency(
    state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес', 
    state.currency || 'RUB'
  );

  const toggleSection = (id: string) => {
    setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    if (sectionId === 'all') {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } else {
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  // Data Management Handlers requested by user
  const handleRefreshData = () => {
    if (onChangeState) {
      onChangeState(prev => ({
        ...prev,
        // Trigger clean re-sync of counts & steps
        completed_steps: Array.from(new Set(prev.completed_steps)).filter(s => s >= 1 && s <= 8)
      }));
      showToast('🔄 Данные всех заполненных досок обновлены и синхронизированы!');
    }
  };

  const handleLoadFilledData = () => {
    if (onChangeState) {
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
      showToast('📥 Данные из всех заполненных досок успешно загружены!');
    }
  };

  const handleClearOldData = () => {
    if (window.confirm('Вы действительно хотите очистить старые данные и сбросить карточки досок?')) {
      if (onChangeState) {
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
        showToast('🧹 Старые данные досок очищены!');
      }
    }
  };

  const completedStepsCount = state.completed_steps.length;
  const progressPercent = Math.round((completedStepsCount / 8) * 100);

  // Helper markdown generation for specific sections
  const getSectionMarkdown = (sectionNum: number): string => {
    switch(sectionNum) {
      case 1:
        return `## 1. Параметры Профиля и Таргетинга\n- Должность: ${state.selected_position || 'Senior ML & DS Engineer'}\n- Резервная роль: ${state.alternate_position || 'Lead Data Scientist'}\n- Целевой рынок: ${state.selected_market || 'РФ / Global Remote'}\n- Доход: ${salaryFormatted}\n- Hard Skills: ${state.goals?.hardSkillsSummary}\n- Soft Skills: ${state.goals?.softSkillsSummary}`;
      case 2:
        return `## 2. Доска №1: Критерии выбора компании\n` + (state.notion_criteria || []).map(c => `- [${c.checked ? 'Включен' : 'Исключен'}] ${c.title} (${c.priority}) - ${c.category}: ${c.description}`).join('\n');
      case 3:
        return `## 3. Доска №2: Целевые компании\n` + (state.selected_companies || []).map(c => `- ${c.name} | ${c.country} | Стек: ${c.techStack.join(', ')} | Виза: ${c.sponsorship ? 'Да' : 'Нет'}`).join('\n');
      case 4:
        return `## 4. Доска №3: ATS Трекер Вакансий\n` + (state.selected_vacancies || []).map(v => `- ${v.title} в ${v.company} (${v.location}) | Вилка: ${formatSalaryWithCurrency(v.salaryRange, state.currency)} | Статус: ${v.status} | Match: ${v.atsScore}%`).join('\n');
      case 5:
        return `## 5. Доска №4: Карьерные рассылки\n` + (state.newsletters || []).map(n => `- ${n.title} (${n.companyName}) | Частота: ${n.frequency} | Статус: ${n.subscribed ? 'Активна' : 'Пауза'}`).join('\n');
      case 6:
        return `## 6. Доска №5: SWOT-Анализ Профиля\nСильные стороны: ${state.swot?.strengths.join(', ')}\nСлабые стороны: ${state.swot?.weaknesses.join(', ')}\nВозможности: ${state.swot?.opportunities.join(', ')}\nУгрозы: ${state.swot?.threats.join(', ')}`;
      case 7:
        return `## 7. Статус Agile Трека\n- Завершено шагов: ${completedStepsCount} из 8 (${progressPercent}%)\n- Завершенные этапы: ${state.completed_steps.map(s => `#${s}`).join(', ')}`;
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6 text-[var(--text-primary)]">

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Executive Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-2xl shadow-inner">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  EXECUTIVE CAREER REPORT
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Консолидация Досок & Блоков
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">
                Итоговый карьерный документ
              </h1>
            </div>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Currency Selector Toolbar */}
            {onChangeState && (
              <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded-xl p-1 text-xs font-bold">
                {(['RUB', 'USD', 'EUR'] as const).map(curr => (
                  <button
                    key={curr}
                    onClick={() => onChangeState(prev => ({ ...prev, currency: curr }))}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      (state.currency || 'RUB') === curr
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title={`Валюта: ${curr}`}
                  >
                    {curr === 'RUB' ? '₽ RUB' : curr === 'USD' ? '$ USD' : '€ EUR'}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                const fullText = generateComprehensiveCareerMarkdown(state);
                copyToClipboard(fullText, 'all');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              <span>{copiedAll ? 'Скопировано!' : 'Скопировать все'}</span>
            </button>

            <button
              onClick={() => {
                const fullText = generateComprehensiveCareerMarkdown(state);
                const filename = `career_strategy_consolidated_${new Date().toISOString().slice(0, 10)}.md`;
                downloadMarkdownFile(filename, fullText);
              }}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md transition-all cursor-pointer"
              title="Скачать все доски в один файл Markdown (.md)"
            >
              <Download className="w-4 h-4" />
              <span>Скачать .md</span>
            </button>

            <button
              onClick={onOpenNotionExport}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Экспорт в PDF</span>
            </button>

          </div>
        </div>

        {/* DATA MANAGEMENT ACTIONS TOOLBAR (New Requested Buttons) */}
        <div className="pt-4 pb-2 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-semibold flex items-center space-x-2">
            <span>Управление данными досок:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefreshData}
              className="px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
              title="Обновить данные досок и пересчитать артефакты"
            >
              <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
              <span>🔄 Обновить данные</span>
            </button>

            <button
              onClick={handleLoadFilledData}
              className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
              title="Загрузить заполненные списки досок (Критерии, Компании, Вакансии, Рассылки, SWOT)"
            >
              <FolderDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>📥 Загрузить заполненные доски</span>
            </button>

            <button
              onClick={handleClearOldData}
              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all"
              title="Очистить старые записи досок"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>🧹 Очистить старые данные</span>
            </button>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Целевая Позиция</span>
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
            </span>
            <div className="text-sm font-bold text-white truncate">
              {state.selected_position || 'Senior ML & DS Engineer'}
            </div>
            <div className="text-[11px] text-blue-300 font-medium">
              Резерв: {state.alternate_position || 'Lead Data Scientist'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Зарплатный Ориентир</span>
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <div className="text-sm font-bold text-emerald-300 truncate">
              {salaryFormatted}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Валюта: {state.currency || 'RUB'} ({currencySymbol})
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Грейд & Сроки</span>
              <Compass className="w-3.5 h-3.5 text-purple-400" />
            </span>
            <div className="text-sm font-bold text-white truncate">
              {state.goals?.currentGrade || 'Middle+'} ➔ {state.goals?.targetGrade || 'Senior ML / AI Architect'}
            </div>
            <div className="text-[11px] text-purple-300 font-medium">
              Дедлайн: {state.goals?.timeline || '3-6 месяцев'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Прогресс Agile-Трека</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </span>
            <div className="flex items-center justify-between text-sm font-bold text-white">
              <span>{completedStepsCount} / 8 шагов</span>
              <span className="text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* ---------------- BLOCK 1: Profile Parameters & Targeting ---------------- */}
      <DesignerBlock
        num="01"
        title="Параметры Профиля & Карьерного Таргетинга"
        subtitle="Базовые ориентиры, грейды, финансовая вилка и ключевые стеки"
        icon={<Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
        isCollapsed={!!collapsedSections['1']}
        onToggle={() => toggleSection('1')}
        onCopy={() => copyToClipboard(getSectionMarkdown(1), '1')}
        isCopied={copiedSection === '1'}
        onNavigate={onSelectView ? () => onSelectView('settings') : undefined}
        navigateLabel="Настройки Профиля"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-2">
            <h4 className="font-bold text-[var(--text-primary)] border-b border-[var(--color-border)] pb-1.5 flex items-center justify-between">
              <span>Должность & Позиция</span>
              <span className="px-2 py-0.5 rounded bg-blue-600/10 text-blue-600 dark:text-blue-400 font-semibold text-[10px]">Основная</span>
            </h4>
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {state.selected_position || 'Senior ML & DS Engineer / AI Architect'}
            </p>
            <div className="pt-2 text-[var(--text-secondary)] space-y-1">
              <div><strong>Запасная роль:</strong> {state.alternate_position || 'Lead Data Scientist / RecSys Architect'}</div>
              <div><strong>Целевой рынок:</strong> {state.selected_market || 'РФ / Global Remote'}</div>
              <div><strong>Финансовый ориентир:</strong> {salaryFormatted}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-2">
            <h4 className="font-bold text-[var(--text-primary)] border-b border-[var(--color-border)] pb-1.5 flex items-center justify-between">
              <span>Стек Компетенций</span>
              <span className="px-2 py-0.5 rounded bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">Компетенции</span>
            </h4>
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-[var(--text-secondary)]">Hard Skills:</span>
                <p className="text-[var(--text-primary)] mt-0.5 leading-relaxed font-medium">
                  {state.goals?.hardSkillsSummary || 'Python, PyTorch, LLM Fine-Tuning, MLOps, RAG, Distributed Training, Vector DBs, System Design'}
                </p>
              </div>
              <div>
                <span className="font-semibold text-[var(--text-secondary)]">Soft Skills:</span>
                <p className="text-[var(--text-primary)] mt-0.5 leading-relaxed font-medium">
                  {state.goals?.softSkillsSummary || 'Technical Leadership, Agile/Scrum Mentorship, Stakeholder Management, Architecture Presentations'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DesignerBlock>


      {/* ---------------- BLOCK 2: Notion Criteria ---------------- */}
      <DesignerBlock
        num="02"
        title="Доска №1: Критерии Выбора Компании (Notion Criteria)"
        subtitle="Система непереговорочных фильтров и требований к работодателю"
        icon={<Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
        isCollapsed={!!collapsedSections['2']}
        onToggle={() => toggleSection('2')}
        onCopy={() => copyToClipboard(getSectionMarkdown(2), '2')}
        isCopied={copiedSection === '2'}
        onNavigate={onSelectView ? () => onSelectView('criteria') : undefined}
        navigateLabel="Доска Критериев"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-secondary)] font-bold">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Критерий</th>
                <th className="py-2.5 px-3">Статус</th>
                <th className="py-2.5 px-3">Приоритет</th>
                <th className="py-2.5 px-3">Категория</th>
                <th className="py-2.5 px-3">Описание</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {(state.notion_criteria || []).map((c, i) => (
                <tr key={c.id} className="hover:bg-[var(--bg-hover-sidebar)] transition-colors">
                  <td className="py-2 px-3 text-[var(--text-secondary)] font-bold">{i + 1}</td>
                  <td className="py-2 px-3 font-bold text-[var(--text-primary)]">{c.title}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      c.checked 
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    }`}>
                      {c.checked ? '[Включен]' : '[Исключен]'}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-medium text-[var(--text-secondary)]">{c.priority || 'Обязательно'}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)] text-[10px] font-semibold">
                      {c.category}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-[var(--text-secondary)] max-w-xs truncate">{c.description || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DesignerBlock>


      {/* ---------------- BLOCK 3: Targeted Companies ---------------- */}
      <DesignerBlock
        num="03"
        title="Доска №2: Таргетированный Список Компаний"
        subtitle="Реестр целевых работодателей с градацией по уровням и стеку"
        icon={<Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
        isCollapsed={!!collapsedSections['3']}
        onToggle={() => toggleSection('3')}
        onCopy={() => copyToClipboard(getSectionMarkdown(3), '3')}
        isCopied={copiedSection === '3'}
        onNavigate={onSelectView ? () => onSelectView('companies') : undefined}
        navigateLabel="Доска Компаний"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {(state.selected_companies || []).map((c, i) => (
            <div key={c.id || i} className="p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between font-bold">
                  <span className="text-sm text-[var(--text-primary)]">{c.name}</span>
                  <span className="px-2 py-0.5 rounded bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                    {c.tier || c.country || 'РФ'}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1 line-clamp-2">
                  {c.notes || 'Целевая компания для мониторинга открытых позиций.'}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--color-border)] space-y-1 text-[11px]">
                <div className="flex flex-wrap gap-1">
                  {c.techStack.map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded text-[10px] font-semibold text-[var(--text-primary)]">
                      {t}
                    </span>
                  ))}
                </div>
                {c.careerLink && (
                  <a href={c.careerLink} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-bold hover:underline pt-1">
                    <span>Карьерный портал</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </DesignerBlock>


      {/* ---------------- BLOCK 4: Vacancy Pipeline Tracker ---------------- */}
      <DesignerBlock
        num="04"
        title="Доска №3: ATS Трекер Вакансий (Vacancy Pipeline)"
        subtitle="Управление воронкой откликов, статусами и ATS-совпадением"
        icon={<Briefcase className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
        isCollapsed={!!collapsedSections['4']}
        onToggle={() => toggleSection('4')}
        onCopy={() => copyToClipboard(getSectionMarkdown(4), '4')}
        isCopied={copiedSection === '4'}
        onNavigate={onSelectView ? () => onSelectView('vacancies') : undefined}
        navigateLabel="Доска Вакансий"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-secondary)] font-bold">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Должность</th>
                <th className="py-2.5 px-3">Компания</th>
                <th className="py-2.5 px-3">Локация</th>
                <th className="py-2.5 px-3">Зарплата</th>
                <th className="py-2.5 px-3">Статус Воронки</th>
                <th className="py-2.5 px-3">ATS Match</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {(state.selected_vacancies || []).map((v, i) => (
                <tr key={v.id} className="hover:bg-[var(--bg-hover-sidebar)] transition-colors">
                  <td className="py-2 px-3 text-[var(--text-secondary)] font-bold">{i + 1}</td>
                  <td className="py-2 px-3 font-bold text-[var(--text-primary)]">{v.title}</td>
                  <td className="py-2 px-3 text-[var(--text-primary)]">{v.company}</td>
                  <td className="py-2 px-3 text-[var(--text-secondary)]">{v.location}</td>
                  <td className="py-2 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatSalaryWithCurrency(v.salaryRange, state.currency)}
                  </td>
                  <td className="py-2 px-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] border border-blue-500/20">
                      [{v.status || 'Saved'}]
                    </span>
                  </td>
                  <td className="py-2 px-3 font-bold text-[var(--text-primary)]">{v.atsScore || 85}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DesignerBlock>


      {/* ---------------- BLOCK 5: Career Newsletters ---------------- */}
      <DesignerBlock
        num="05"
        title="Доска №4: Карьерные Рассылки & Источники Вакансий"
        subtitle="Автоматический поток вакансий из дайджестов и канала"
        icon={<Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
        isCollapsed={!!collapsedSections['5']}
        onToggle={() => toggleSection('5')}
        onCopy={() => copyToClipboard(getSectionMarkdown(5), '5')}
        isCopied={copiedSection === '5'}
        onNavigate={onSelectView ? () => onSelectView('newsletters') : undefined}
        navigateLabel="Доска Рассылок"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {(state.newsletters || []).map((n, i) => (
            <div key={n.id || i} className="p-3.5 rounded-2xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span className="text-[var(--text-primary)]">{n.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  n.subscribed ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 text-slate-600'
                }`}>
                  {n.subscribed ? '[Активна]' : '[Пауза]'}
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Компания / Источник: <strong>{n.companyName}</strong> | Частота: <strong>{n.frequency}</strong>
              </p>
              {n.link && (
                <a href={n.link} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-bold text-[11px] hover:underline">
                  <span>Открыть канал / подписку</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </DesignerBlock>


      {/* ---------------- BLOCK 6: SWOT Matrix & Expert Q&A ---------------- */}
      <DesignerBlock
        num="06"
        title="Доска №5: SWOT-Анализ Профиля & Экспертные Ответы"
        subtitle="Стратегическая матрица сильных и слабых сторон, возможностей и рисков"
        icon={<Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
        isCollapsed={!!collapsedSections['6']}
        onToggle={() => toggleSection('6')}
        onCopy={() => copyToClipboard(getSectionMarkdown(6), '6')}
        isCopied={copiedSection === '6'}
        onNavigate={onSelectView ? () => onSelectView('swot_miro') : undefined}
        navigateLabel="SWOT-Доска"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
            <h4 className="font-bold text-emerald-600 dark:text-emerald-400">Strengths (Сильные стороны)</h4>
            <ul className="space-y-1 text-[var(--text-primary)]">
              {(state.swot?.strengths || []).map((s, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="font-bold text-emerald-500">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
            <h4 className="font-bold text-rose-600 dark:text-rose-400">Weaknesses (Слабые стороны)</h4>
            <ul className="space-y-1 text-[var(--text-primary)]">
              {(state.swot?.weaknesses || []).map((w, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="font-bold text-rose-500">•</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-1.5">
            <h4 className="font-bold text-blue-600 dark:text-blue-400">Opportunities (Возможности)</h4>
            <ul className="space-y-1 text-[var(--text-primary)]">
              {(state.swot?.opportunities || []).map((o, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="font-bold text-blue-500">•</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
            <h4 className="font-bold text-amber-600 dark:text-amber-400">Threats (Риски и барьеры)</h4>
            <ul className="space-y-1 text-[var(--text-primary)]">
              {(state.swot?.threats || []).map((t, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="font-bold text-amber-500">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DesignerBlock>


      {/* ---------------- BLOCK 7: Agile Consolidation Status ---------------- */}
      <DesignerBlock
        num="07"
        title="Статус Консолидации Agile-Трека (8 Этапов)"
        subtitle="Итоговая готовность артефактов и контроль выполнения методики"
        icon={<CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
        isCollapsed={!!collapsedSections['7']}
        onToggle={() => toggleSection('7')}
        onCopy={() => copyToClipboard(getSectionMarkdown(7), '7')}
        isCopied={copiedSection === '7'}
        onNavigate={onSelectView ? () => onSelectView('agile_track') : undefined}
        navigateLabel="Agile Трек"
      >
        <div className="p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-2">
            <div>
              <span className="font-bold text-[var(--text-primary)]">Активный этап: </span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">Шаг #{state.current_step}</span>
            </div>
            <div>
              <span className="font-bold text-[var(--text-primary)]">Пройдено: </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{completedStepsCount} из 8 этапов</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 8 }, (_, i) => i + 1).map(stepNum => {
              const isDone = state.completed_steps.includes(stepNum);
              const isActive = state.current_step === stepNum;

              return (
                <div 
                  key={stepNum}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                      : isDone 
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                        : 'bg-slate-200/50 dark:bg-slate-800/50 text-slate-400 border-transparent'
                  }`}
                >
                  Шаг #{stepNum} {isDone ? '✓' : ''}
                </div>
              );
            })}
          </div>
        </div>
      </DesignerBlock>

    </div>
  );
};

// Internal reusable Designer Section Block component with toolbar buttons
interface DesignerBlockProps {
  num: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
  onToggle: () => void;
  onCopy: () => void;
  isCopied: boolean;
  onNavigate?: () => void;
  navigateLabel?: string;
  children: React.ReactNode;
}

const DesignerBlock: React.FC<DesignerBlockProps> = ({
  num,
  title,
  subtitle,
  icon,
  isCollapsed,
  onToggle,
  onCopy,
  isCopied,
  onNavigate,
  navigateLabel,
  children
}) => {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 transition-all">
      
      {/* Block Header & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
        
        {/* Number & Title */}
        <div className="flex items-start space-x-3">
          <div className="px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-black text-xs shrink-0 mt-0.5">
            #{num}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] flex items-center space-x-2">
              <span>{icon}</span>
              <span>{title}</span>
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Section Action Buttons Bar ("кнопочки красивые для каждого блока") */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* Navigate to Board Button */}
          {onNavigate && (
            <button
              onClick={onNavigate}
              className="px-2.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold flex items-center space-x-1.5 transition-colors cursor-pointer border border-blue-500/20"
              title={`Перейти к управлению: ${navigateLabel}`}
            >
              <span>{navigateLabel || 'К доске'}</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}

          {/* Copy Section Button */}
          <button
            onClick={onCopy}
            className="px-2.5 py-1.5 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-hover-sidebar)] border border-[var(--color-border)] text-[var(--text-primary)] text-[11px] font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
            title="Скопировать только этот раздел"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Скопировано!' : 'Скопировать блок'}</span>
          </button>

          {/* Toggle Expand/Collapse Button */}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-hover-sidebar)] border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            title={isCollapsed ? 'Развернуть блок' : 'Свернуть блок'}
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>

        </div>

      </div>

      {/* Block Body Content */}
      {!isCollapsed && (
        <div className="pt-1">
          {children}
        </div>
      )}

    </div>
  );
};
