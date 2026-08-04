import React, { useState } from 'react';
import { 
  GitCommit, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  ArrowRight, 
  FileText,
  Building2,
  Briefcase,
  CheckSquare,
  BarChart3,
  ListFilter,
  RotateCcw,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen
} from 'lucide-react';
import { CareerState } from '../types';
import { TargetGoalBanner } from './TargetGoalBanner';
import { ExportBoardButton } from './ExportBoardButton';

const AGILE_STEPS_INFO: Record<number, { title: string; purpose: string; outputs: string; board: string }> = {
  1: {
    title: 'Карьерное направление & Рынок',
    purpose: 'Определить целевой географический рынок (РФ / СНГ / Global Remote), формат работы (Удаленка, Гибрид, Офис) и фазу развития компании для фокусировки поисковой активности.',
    outputs: 'Зафиксированная роль, грейд, локация, стартовая зарплатная вилка.',
    board: 'Настройки профиля'
  },
  2: {
    title: 'Анализ должностей & Ролей',
    purpose: 'Сравнительный анализ и фиксация основной должности (Senior ML & DS Engineer) и резервной роли (AI Lead / Data Scientist) для максимизации релевантных откликов.',
    outputs: 'Основная и запасная должность для таргетированного поиска.',
    board: 'Настройки профиля'
  },
  3: {
    title: 'Доска №1: Критерии выбора компании',
    purpose: 'Составление жесткого списка критических непереговорочных требований к работодателю (белая зарплата, формат, стек, процессы) для фильтрации вакансий.',
    outputs: 'Интерактивный чек-лист критериев выбора.',
    board: 'Доска критериев Notion'
  },
  4: {
    title: 'Маппинг целевых компаний',
    purpose: 'Формирование списка целевых компаний-мишеней (Tier 1 / Tier 2) в целевых регионах для нетворкинга, рефералов и прямого мониторинга.',
    outputs: 'Карточки целевых компаний с градацией Tier.',
    board: 'Доска компаний'
  },
  5: {
    title: 'Анализ актуальных вакансий',
    purpose: 'Сбор и системное ведение отслеживаемых вакансий в ATS-трекере со статусами откликнулся, прошел интервью, получил оффер.',
    outputs: 'Управляемая воронка поиска в трекере.',
    board: 'Доска вакансий (ATS Tracker)'
  },
  6: {
    title: 'Подписка на карьерные рассылки',
    purpose: 'Настройка автоматического пассивного получения вакансий из Telegram-каналов, профильных дайджестов и карьерных платформ.',
    outputs: 'Реестр подписок и каналов с быстрыми ссылками.',
    board: 'Карьерные рассылки'
  },
  7: {
    title: 'SWOT-анализ профиля',
    purpose: 'Комплексная оценка Сильных сторон (Strengths), Слабых мест (Weaknesses), Рыночных возможностей (Opportunities) и Рисков (Threats).',
    outputs: 'SWOT-матрица и ответы на экспертные вопросы.',
    board: 'SWOT-анализ (Miro Board)'
  },
  8: {
    title: 'Финальный карьерный отчет',
    purpose: 'Сборка всех наработок в единый консолидированный Карьерный Документ и его экспорт в PDF для печати или презентации.',
    outputs: 'Полный Итоговый Документ в формате PDF.',
    board: 'Итоговый карьерный документ'
  }
};

interface AgileTrackViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onAskAi: (prompt: string) => void;
  onOpenNotionExport: () => void;
}

export const AgileTrackView: React.FC<AgileTrackViewProps> = ({
  state,
  onChangeState,
  onAskAi,
  onOpenNotionExport
}) => {
  const [showAllStepsGuide, setShowAllStepsGuide] = useState(true);
  const currentStepNum = state.current_step;

  // Live data counts from user filled boards and profile
  const criteria = state.notion_criteria || [];
  const companies = state.selected_companies || [];
  const vacancies = state.selected_vacancies || [];
  const newsletters = state.newsletters || [];
  const analyses = state.vacancy_analyses || [];
  const swotCount = (state.swot?.strengths?.length || 0) + (state.swot?.weaknesses?.length || 0) + (state.swot?.opportunities?.length || 0) + (state.swot?.threats?.length || 0);
  const goals = state.goals || {};
  const market = state.selected_market || '';
  const position = state.selected_position || '';
  const skills = state.skills || [];

  const stepsList = [
    { num: 1, title: 'Карьерное направление & Рынок', desc: `${state.selected_market || 'РФ / Global'} • ${state.goals?.targetGrade || 'Senior ML'} • ${state.goals?.expectedSalary || '380-550k ₽'}` },
    { num: 2, title: 'Анализ должностей', desc: `Роль: ${state.selected_position || 'Senior ML & DS Engineer'} (${state.skills?.length || 0} навыков в матрице)` },
    { num: 3, title: 'Доска №1: Критерии выбора', desc: `Чек-лист из ${criteria.length} критических условий компании` },
    { num: 4, title: 'Маппинг целевых компаний', desc: `${companies.length} выбранных компаний в таргетированном списке` },
    { num: 5, title: 'Анализ актуальных вакансий', desc: `${vacancies.length} отслеживаемых вакансий в ATS трекере` },
    { num: 6, title: 'Подписка на карьерные рассылки', desc: `${newsletters.length} каналов и подписок настроено` },
    { num: 7, title: 'SWOT-анализ профиля', desc: `Оценка сильных и слабых сторон (${swotCount} факторов SWOT, ${analyses.length} требований)` },
    { num: 8, title: 'Финальный карьерный отчет', desc: `Консолидация всех ${criteria.length + companies.length + vacancies.length + newsletters.length + analyses.length} элементов из заполненных досок` }
  ];

  const handleCompleteStep = (stepNum: number) => {
    onChangeState(prev => {
      const updatedCompleted = prev.completed_steps.includes(stepNum) 
        ? prev.completed_steps 
        : [...prev.completed_steps, stepNum];
      const nextStep = stepNum < 8 ? stepNum + 1 : 8;
      return {
        ...prev,
        completed_steps: updatedCompleted,
        current_step: nextStep
      };
    });
  };

  const handleResetSteps = () => {
    if (window.confirm('Вы уверены, что хотите очистить прогресс всех пройденных шагов в Agile Потоке?')) {
      onChangeState(prev => ({
        ...prev,
        completed_steps: [],
        current_step: 1
      }));
    }
  };

  const currentStepObj = stepsList.find(s => s.num === currentStepNum) || stepsList[0];

  return (
    <div id="board-agile-view" className="space-y-6">
      
      {/* Target Goal Banner */}
      <TargetGoalBanner 
        state={state} 
        subtitle="Agile-поток (8 этапов методологии) направляет ваше движение к указанной карьерной цели и грейду."
      />

      {/* Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Сводный Agile-Трек & Консолидация Досок</h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Единый консолидированный обзор всех заполненных досок: Критерии, Компании, Вакансии и Анализ
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ExportBoardButton 
            state={state} 
            boardType="agile_track" 
            boardTitle="Agile-Трек" 
            onOpenPdfModal={onOpenNotionExport}
          />
          <button
            onClick={handleResetSteps}
            className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl text-xs font-semibold cursor-pointer flex items-center space-x-1.5 transition-all"
            title="Сбросить прогресс выполнения всех шагов"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Очистить шаги</span>
          </button>
          <button
            onClick={onOpenNotionExport}
            className="px-3 py-1.5 bg-[var(--bg-main)] border border-[var(--color-border)] hover:bg-[var(--bg-hover-sidebar)] rounded-xl text-xs font-semibold cursor-pointer flex items-center space-x-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Отчет</span>
          </button>
        </div>
      </div>

      {/* Live Boards Consolidated Dashboard Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-secondary)] mb-1">
            <CheckSquare className="w-4 h-4 text-blue-500" />
            <span>Критерии выбора</span>
          </div>
          <div className="text-lg font-bold text-[var(--text-primary)]">
            {criteria.length} <span className="text-xs font-normal text-[var(--text-secondary)]">критериев</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-secondary)] mb-1">
            <Building2 className="w-4 h-4 text-emerald-500" />
            <span>Целевые компании</span>
          </div>
          <div className="text-lg font-bold text-[var(--text-primary)]">
            {companies.length} <span className="text-xs font-normal text-[var(--text-secondary)]">компаний</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-secondary)] mb-1">
            <Briefcase className="w-4 h-4 text-purple-500" />
            <span>Вакансии в трекере</span>
          </div>
          <div className="text-lg font-bold text-[var(--text-primary)]">
            {vacancies.length} <span className="text-xs font-normal text-[var(--text-secondary)]">вакансий</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--color-border)] shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-secondary)] mb-1">
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>Декомпозиций & SWOT</span>
          </div>
          <div className="text-lg font-bold text-[var(--text-primary)]">
            {analyses.length + swotCount} <span className="text-xs font-normal text-[var(--text-secondary)]">анализов</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Stepper Index */}
        <div className="lg:col-span-4 bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-2 max-h-[700px] overflow-y-auto">
          <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block px-2 mb-2">
            Индекс этапов и заполненость досок:
          </span>

          {stepsList.map((s) => {
            const isDone = state.completed_steps.includes(s.num);
            const isActive = state.current_step === s.num;

            return (
              <button
                key={s.num}
                onClick={() => {
                  onChangeState(prev => ({ ...prev, current_step: s.num }));
                }}
                className={`
                  w-full text-left p-3 rounded-xl transition-all duration-150 flex items-start space-x-3 cursor-pointer
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-xs font-semibold' 
                    : isDone 
                      ? 'bg-[var(--bg-main)] text-[var(--text-primary)] hover:bg-[var(--bg-hover-sidebar)]' 
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover-sidebar)]'
                  }
                `}
              >
                <div className="pt-0.5">
                  {isDone ? (
                    <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-500'}`} />
                  ) : (
                    <Circle className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`} />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">
                    Шаг #{s.num}: {s.title}
                  </div>
                  <div className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>
                    {s.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Active Step & Live Combined Data View */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs space-y-5">
            
            {/* Step Banner */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-500/10 px-2.5 py-0.5 rounded-md">
                  Активный этап #{currentStepObj.num}
                </span>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mt-1">
                  {currentStepObj.title}
                </h3>
              </div>

              {state.completed_steps.includes(currentStepObj.num) && (
                <span className="inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-500/10 px-3 py-1 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Этап завершен</span>
                </span>
              )}
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {currentStepObj.desc}
            </p>

            {/* Live Data Excerpt from filled boards and profile for this step */}
            <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-3 text-xs">
              <h4 className="font-bold text-[var(--text-primary)] flex items-center space-x-2">
                <ListFilter className="w-4 h-4 text-blue-500" />
                <span>Информация из вашего профиля и заполненных досок для этапа #{currentStepObj.num}:</span>
              </h4>

              {/* Step 1: Profile & Market */}
              {currentStepNum === 1 && (
                <div className="space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                      <span className="text-[var(--text-secondary)] block text-[10px] font-semibold">Главная карьерная цель</span>
                      <span className="font-bold text-[var(--text-primary)]">{goals.primaryGoal || 'Не заполнено'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                      <span className="text-[var(--text-secondary)] block text-[10px] font-semibold">Целевой рынок</span>
                      <span className="font-bold text-[var(--text-primary)]">{market || 'РФ / Global Remote'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                      <span className="text-[var(--text-secondary)] block text-[10px] font-semibold">Целевой грейд</span>
                      <span className="font-bold text-[var(--text-primary)]">{goals.targetGrade || 'Senior ML / AI Architect'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                      <span className="text-[var(--text-secondary)] block text-[10px] font-semibold">Ожидаемая вилка</span>
                      <span className="font-bold text-[var(--text-primary)]">{goals.expectedSalary || '380 000 - 550 000 ₽'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                      <span className="text-[var(--text-secondary)] block text-[10px] font-semibold">Формат & Локация</span>
                      <span className="font-bold text-[var(--text-primary)]">{goals.targetLocation || 'Удаленка / Гибрид'}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                      <span className="text-[var(--text-secondary)] block text-[10px] font-semibold">Сроки поиска (Timeline)</span>
                      <span className="font-bold text-[var(--text-primary)]">{goals.timeline || '3-6 месяцев'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Position & Skills Matrix */}
              {currentStepNum === 2 && (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                    <span className="text-[var(--text-secondary)] block text-[10px] font-semibold">Основное позиционирование (Role)</span>
                    <span className="font-bold text-sm text-[var(--text-primary)]">{position || 'Senior ML & DS Engineer / AI Architect'}</span>
                  </div>
                  {goals.hardSkillsSummary && (
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                      <span className="text-[var(--text-secondary)] block text-[10px] font-semibold mb-1">Хард-скиллы из профиля</span>
                      <div className="flex flex-wrap gap-1">
                        {goals.hardSkillsSummary.split(',').map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-semibold">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {skills.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)]">
                      <span className="text-[var(--text-secondary)] block text-[10px] font-semibold mb-1">Навыки из Матрицы навыков ({skills.length})</span>
                      <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                        {skills.map(sk => (
                          <span key={sk.id} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">
                            {sk.name} ({sk.level})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Criteria */}
              {currentStepNum === 3 && (
                <div className="space-y-2">
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium">Критерии выбора компании ({criteria.length}):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {criteria.map(c => (
                      <div key={c.id} className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)] flex items-start space-x-2">
                        <span className={c.checked ? "text-emerald-500 font-bold" : "text-slate-400"}>
                          {c.checked ? '✓' : '○'}
                        </span>
                        <div>
                          <div className="font-bold text-[11px] text-[var(--text-primary)]">{c.title}</div>
                          <div className="text-[10px] text-[var(--text-secondary)]">{c.description}</div>
                        </div>
                      </div>
                    ))}
                    {criteria.length === 0 && <span className="text-[var(--text-secondary)]">Доска критериев пока пуста</span>}
                  </div>
                </div>
              )}

              {/* Step 4: Companies */}
              {currentStepNum === 4 && (
                <div className="space-y-2">
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium">Целевые компании ({companies.length}):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {companies.map(c => (
                      <div key={c.id} className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-[var(--text-primary)]">🏢 {c.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[9px]">
                            {c.tier}
                          </span>
                        </div>
                        {c.techStack && c.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {c.techStack.map((t, i) => (
                              <span key={i} className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[9px] text-[var(--text-secondary)]">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                        {c.notes && <p className="text-[10px] text-[var(--text-secondary)] line-clamp-1">{c.notes}</p>}
                      </div>
                    ))}
                    {companies.length === 0 && <span className="text-[var(--text-secondary)]">Список компаний пока пуст</span>}
                  </div>
                </div>
              )}

              {/* Step 5: Vacancies */}
              {currentStepNum === 5 && (
                <div className="space-y-2">
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium">Отслеживаемые вакансии в ATS трекере ({vacancies.length}):</div>
                  <div className="space-y-2 max-h-56 overflow-y-auto">
                    {vacancies.map(v => (
                      <div key={v.id} className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)] flex items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-[11px] text-[var(--text-primary)]">{v.company}: {v.title}</div>
                          <div className="text-[10px] text-[var(--text-secondary)]">{v.salaryRange} • {v.location}</div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.status === 'Applied' ? 'bg-blue-500/10 text-blue-600' :
                          v.status === 'Interview' ? 'bg-amber-500/10 text-amber-600' :
                          v.status === 'Offer' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {v.status}
                        </span>
                      </div>
                    ))}
                    {vacancies.length === 0 && <span className="text-[var(--text-secondary)]">Список вакансий пока пуст</span>}
                  </div>
                </div>
              )}

              {/* Step 6: Newsletters */}
              {currentStepNum === 6 && (
                <div className="space-y-2">
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium">Карьерные рассылки и каналы ({newsletters.length}):</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {newsletters.map(n => (
                      <div key={n.id} className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[11px] text-[var(--text-primary)]">📩 {n.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[9px]">
                            {n.platform}
                          </span>
                        </div>
                        <div className="text-[10px] text-[var(--text-secondary)]">{n.frequency} • {n.category}</div>
                      </div>
                    ))}
                    {newsletters.length === 0 && <span className="text-[var(--text-secondary)]">Список рассылок пока пуст</span>}
                  </div>
                </div>
              )}

              {/* Step 7: SWOT Analysis & Vacancy Requirements */}
              {currentStepNum === 7 && (
                <div className="space-y-3">
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium">Факторы SWOT-матрицы ({swotCount}) & Выписки ({analyses.length}):</div>
                  
                  {/* SWOT Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
                        Сильные стороны ({state.swot?.strengths?.length || 0})
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[10px] text-[var(--text-primary)]">
                        {(state.swot?.strengths || []).slice(0, 3).map((s, i) => (
                          <li key={i} className="truncate">{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
                        Слабые стороны ({state.swot?.weaknesses?.length || 0})
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[10px] text-[var(--text-primary)]">
                        {(state.swot?.weaknesses || []).slice(0, 3).map((w, i) => (
                          <li key={i} className="truncate">{w}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <span className="font-bold text-blue-600 dark:text-blue-400 block mb-1">
                        Возможности ({state.swot?.opportunities?.length || 0})
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[10px] text-[var(--text-primary)]">
                        {(state.swot?.opportunities || []).slice(0, 3).map((o, i) => (
                          <li key={i} className="truncate">{o}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                        Угрозы ({state.swot?.threats?.length || 0})
                      </span>
                      <ul className="list-disc list-inside space-y-0.5 text-[10px] text-[var(--text-primary)]">
                        {(state.swot?.threats || []).slice(0, 3).map((t, i) => (
                          <li key={i} className="truncate">{t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Vacancy Analyses Summary */}
                  {analyses.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)] space-y-1">
                      <span className="font-bold text-[11px] text-[var(--text-primary)]">
                        Выписано требований из вакансий: {analyses.length}
                      </span>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                        {analyses.map(a => (
                          <span key={a.id} className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 text-[10px] font-semibold">
                            {a.item} ({a.status === 'owned' ? '✓ Владею' : '✕ Требует изучения'})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 8: Final Report */}
              {currentStepNum === 8 && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 text-xs flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Все данные профиля и досок синхронизированы и готовы к экспорту:</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                      <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--color-border)]">
                        <span className="text-[var(--text-secondary)] block text-[10px]">Доска №1 (Критерии)</span>
                        <span className="font-bold text-[var(--text-primary)]">{criteria.length} элементов</span>
                      </div>
                      <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--color-border)]">
                        <span className="text-[var(--text-secondary)] block text-[10px]">Доска №2 (Компании)</span>
                        <span className="font-bold text-[var(--text-primary)]">{companies.length} компаний</span>
                      </div>
                      <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--color-border)]">
                        <span className="text-[var(--text-secondary)] block text-[10px]">Доска №3 (Вакансии)</span>
                        <span className="font-bold text-[var(--text-primary)]">{vacancies.length} вакансий</span>
                      </div>
                      <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--color-border)]">
                        <span className="text-[var(--text-secondary)] block text-[10px]">Карьерные рассылки</span>
                        <span className="font-bold text-[var(--text-primary)]">{newsletters.length} каналов</span>
                      </div>
                      <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--color-border)]">
                        <span className="text-[var(--text-secondary)] block text-[10px]">Таблица Анализ вакансий</span>
                        <span className="font-bold text-[var(--text-primary)]">{analyses.length} требований</span>
                      </div>
                      <div className="p-2 bg-[var(--bg-card)] rounded border border-[var(--color-border)]">
                        <span className="text-[var(--text-secondary)] block text-[10px]">SWOT Факторы</span>
                        <span className="font-bold text-[var(--text-primary)]">{swotCount} факторов</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Detailed Purpose of current step */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2 text-xs">
              <h4 className="font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Для чего нужен шаг #{currentStepObj.num}:</span>
              </h4>
              <p className="text-[var(--text-primary)] leading-relaxed font-medium">
                {AGILE_STEPS_INFO[currentStepObj.num]?.purpose}
              </p>
              <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-[var(--text-secondary)]">
                <div>
                  <span className="font-bold text-[var(--text-primary)]">Результат: </span>
                  {AGILE_STEPS_INFO[currentStepObj.num]?.outputs}
                </div>
                <div>
                  <span className="font-bold text-[var(--text-primary)]">Связано с доской: </span>
                  <span className="px-2 py-0.5 rounded bg-blue-600/10 text-blue-600 dark:text-blue-400 font-bold">
                    {AGILE_STEPS_INFO[currentStepObj.num]?.board}
                  </span>
                </div>
              </div>
            </div>

            {/* Complete Step Button */}
            <div className="pt-3 flex items-center justify-between border-t border-[var(--color-border)]">
              <button
                onClick={() => {
                  if (currentStepNum > 1) {
                    onChangeState(prev => ({ ...prev, current_step: currentStepNum - 1 }));
                  }
                }}
                disabled={currentStepNum === 1}
                className="px-3.5 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--text-secondary)] disabled:opacity-40 cursor-pointer"
              >
                ← Предыдущий шаг
              </button>

              <button
                onClick={() => handleCompleteStep(currentStepNum)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Подтвердить шаг #{currentStepNum} и далее</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Full 8 Steps Purpose Guide */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-xs space-y-4">
        <div 
          onClick={() => setShowAllStepsGuide(!showAllStepsGuide)} 
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Полное руководство: Для чего нужен каждый из 8 шагов Agile-Потока
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Нажмите, чтобы показать/скрыть подробные цели и артефакты каждого этапа
              </p>
            </div>
          </div>
          <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            {showAllStepsGuide ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {showAllStepsGuide && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-[var(--color-border)] text-xs">
            {Object.entries(AGILE_STEPS_INFO).map(([numStr, info]) => {
              const num = Number(numStr);
              const isDone = state.completed_steps.includes(num);
              const isActive = state.current_step === num;

              return (
                <div 
                  key={num}
                  className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                    isActive 
                      ? 'bg-blue-600/10 border-blue-500/40 text-[var(--text-primary)]' 
                      : isDone 
                        ? 'bg-emerald-500/5 border-emerald-500/20 text-[var(--text-primary)]' 
                        : 'bg-[var(--bg-main)] border-[var(--color-border)] text-[var(--text-secondary)]'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span className="flex items-center space-x-1.5 text-[var(--text-primary)]">
                      <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-[10px] flex items-center justify-center font-bold">
                        #{num}
                      </span>
                      <span>{info.title}</span>
                    </span>
                    {isDone ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Готово</span>
                    ) : (
                      <span className="text-[10px] text-slate-400">В процессе</span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                    {info.purpose}
                  </p>
                  <div className="pt-1 border-t border-slate-200 dark:border-slate-800 text-[10px] space-y-0.5">
                    <div><strong className="text-[var(--text-primary)]">Артефакт:</strong> {info.outputs}</div>
                    <div><strong className="text-[var(--text-primary)]">Доска:</strong> {info.board}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
