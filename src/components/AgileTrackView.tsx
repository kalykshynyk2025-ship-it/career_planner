import React from 'react';
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
  RotateCcw
} from 'lucide-react';
import { CareerState } from '../types';

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
    { num: 7, title: 'Декомпозиция требований & ATS', desc: `${analyses.length} проведенных глубоких анализов вакансий` },
    { num: 8, title: 'Анализ частоты навыков', desc: 'Подсчет и рейтинг самых востребованных навыков' },
    { num: 9, title: 'Skill Gap Анализ & Приоритеты', desc: 'Интервью по навыкам, разрывы и план закрытия' },
    { num: 10, title: 'Поквартальный Roadmap (Q1-Q4)', desc: 'План обучения, проекты, серты, собеседования' },
    { num: 11, title: 'SWOT-анализ профиля', desc: `Оценка сильных и слабых сторон (${swotCount} факторов)` },
    { num: 12, title: 'Полный аудит результатов', desc: 'Проверка полноты и корректности всех артефактов' },
    { num: 13, title: 'Финальный карьерный отчет', desc: 'Консолидированный документ и готовность к откликам' }
  ];

  const handleCompleteStep = (stepNum: number) => {
    onChangeState(prev => {
      const updatedCompleted = prev.completed_steps.includes(stepNum) 
        ? prev.completed_steps 
        : [...prev.completed_steps, stepNum];
      const nextStep = stepNum < 13 ? stepNum + 1 : 13;
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

            {/* Quick Actions for Active Step */}
            <div className="p-4 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] space-y-3">
              <h4 className="font-bold text-xs text-[var(--text-primary)] flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Запустить экспертную консультацию AI по этапу #{currentStepObj.num}</span>
              </h4>

              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => onAskAi(`Проведи полный аудит этапа #${currentStepObj.num} (${currentStepObj.title}) с учетом моих зафиксированных данных: ${criteria.length} критериев, ${companies.length} компаний, ${vacancies.length} вакансий.`)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Провести интервью по заполненным данным
                </button>
                <button
                  onClick={() => onAskAi(`Сформируй идеальный пример заполнения данных для этапа #${currentStepObj.num}.`)}
                  className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-primary)] font-semibold cursor-pointer hover:bg-[var(--bg-hover-sidebar)]"
                >
                  Показать готовый пример
                </button>
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

    </div>
  );
};
