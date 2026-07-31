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

  // Live data counts from user filled boards
  const criteria = state.notion_criteria || [];
  const companies = state.selected_companies || [];
  const vacancies = state.selected_vacancies || [];
  const newsletters = state.newsletters || [];
  const analyses = state.vacancy_analyses || [];
  const swotCount = (state.swot?.strengths?.length || 0) + (state.swot?.weaknesses?.length || 0) + (state.swot?.opportunities?.length || 0) + (state.swot?.threats?.length || 0);

  const stepsList = [
    { num: 1, title: 'Карьерное направление & Рынок', desc: 'Рынок (РФ/Зарубежный), формат (удаленка/офис), фаза (стартап/корпорация)' },
    { num: 2, title: 'Анализ должностей', desc: 'Сравнение и выбор основной и запасной вакансии' },
    { num: 3, title: 'Доска №1: Критерии выбора', desc: `Чек-лист из ${criteria.length} критических условий компании` },
    { num: 4, title: 'Маппинг целевых компаний', desc: `${companies.length} выбранных компаний в таргетированном списке` },
    { num: 5, title: 'Анализ актуальных вакансий', desc: `${vacancies.length} отслеживаемых вакансий в ATS трекере` },
    { num: 6, title: 'Подписка на карьерные рассылки', desc: `${newsletters.length} каналов и подписок настроено` },
    { num: 7, title: 'SWOT-анализ профиля', desc: `Оценка сильных и слабых сторон (${swotCount} факторов)` },
    { num: 8, title: 'Финальный карьерный отчет', desc: 'Консолидированный документ и готовность к откликам' }
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
    <div className="space-y-6">
      
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

        <div className="flex items-center space-x-2">
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

            {/* Live Data Excerpt from filled boards for this step */}
            <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-3 text-xs">
              <h4 className="font-bold text-[var(--text-primary)] flex items-center space-x-2">
                <ListFilter className="w-4 h-4 text-blue-500" />
                <span>Текущие данные из ваших досок для этапа #{currentStepObj.num}:</span>
              </h4>

              {currentStepNum === 3 && (
                <div className="space-y-1">
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium">Критерии выбора ({criteria.length}):</div>
                  <div className="flex flex-wrap gap-1">
                    {criteria.slice(0, 8).map(c => (
                      <span key={c.id} className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-[10px]">
                        ✓ {c.title}
                      </span>
                    ))}
                    {criteria.length === 0 && <span className="text-[var(--text-secondary)]">Доска критериев пока пуста</span>}
                  </div>
                </div>
              )}

              {currentStepNum === 4 && (
                <div className="space-y-1">
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium">Целевые компании ({companies.length}):</div>
                  <div className="flex flex-wrap gap-1">
                    {companies.map(c => (
                      <span key={c.id} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                        🏢 {c.name} ({c.country})
                      </span>
                    ))}
                    {companies.length === 0 && <span className="text-[var(--text-secondary)]">Список компаний пока пуст</span>}
                  </div>
                </div>
              )}

              {currentStepNum === 5 && (
                <div className="space-y-1">
                  <div className="text-[11px] text-[var(--text-secondary)] font-medium">Отслеживаемые вакансии ({vacancies.length}):</div>
                  <div className="flex flex-wrap gap-1">
                    {vacancies.map(v => (
                      <span key={v.id} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-[10px]">
                        💼 {v.company}: {v.title}
                      </span>
                    ))}
                    {vacancies.length === 0 && <span className="text-[var(--text-secondary)]">Список вакансий пока пуст</span>}
                  </div>
                </div>
              )}

              {![3, 4, 5].includes(currentStepNum) && (
                <div className="text-[11px] text-[var(--text-secondary)]">
                  Сводный контекст: {criteria.length} критериев, {companies.length} компаний, {vacancies.length} вакансий. Все данные синхронизированы.
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
