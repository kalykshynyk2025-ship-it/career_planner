import React, { useState } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  FileText, 
  Menu, 
  Download, 
  RefreshCw, 
  User, 
  Check, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ActiveView, CareerState, AppNotification } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  state: CareerState;
  onChangeState?: React.Dispatch<React.SetStateAction<CareerState>>;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenNotionExport: () => void;
  onOpenMobileSidebar: () => void;
  onResetState: () => void;
  onExportJson: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  state,
  onChangeState,
  darkMode,
  onToggleDarkMode,
  onOpenSearch,
  onOpenNotionExport,
  onOpenMobileSidebar,
  onResetState,
  onExportJson
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(state.appName || 'ML & DS Career OS');

  const handleSaveTitle = () => {
    if (editedTitle.trim() && onChangeState) {
      onChangeState(prev => ({ ...prev, appName: editedTitle.trim() }));
    }
    setIsEditingTitle(false);
  };
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications: AppNotification[] = [
    {
      id: 'n1',
      title: 'Карьерный отчет готов',
      description: 'AI Coach провел анализ шага #' + state.current_step,
      time: '2 мин назад',
      type: 'success',
      read: false
    },
    {
      id: 'n2',
      title: 'Обновление в вакансиях',
      description: 'Добавлено 2 новые вакансии Яндекс и Авито',
      time: '1 час назад',
      type: 'info',
      read: true
    }
  ];

  const viewTitles: Record<ActiveView, string> = {
    dashboard: 'Обзор дашборда',
    criteria: 'Доска №1: Критерии выбора компании (от 10)',
    companies: 'Доска №2: Целевые компании (от 5)',
    vacancies: 'Доска №3: Ссылки на вакансии (от 3)',
    vacancy_analysis: 'Таблица «Анализ вакансий»',
    swot_miro: 'Анализ навыков (SWOT-Анализ)',
    newsletters: 'Карьерные рассылки компаний',
    agile_track: `Agile Трек (Этап #${state.current_step})`,
    notion_docs: 'Экспорт документа в PDF',
    skills: 'Матрица навыков & Gap Analysis',
    swot: 'SWOT-анализ профиля',
    roadmap_kanban: 'Roadmap & Kanban Спринты',
    ai_coach: 'Анализ карьерного трека',
    settings: 'Настройки профиля и навыков'
  };

  return (
    <header className="h-[72px] sticky top-0 z-30 bg-[var(--bg-sidebar)] border-b border-[var(--color-border)] border-t-2 border-t-[#C8A05B] px-4 sm:px-6 flex items-center justify-between shadow-xs">
      
      {/* Left: Mobile Menu & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 lg:hidden rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover-sidebar)] cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-xs">
          {isEditingTitle ? (
            <div className="flex items-center space-x-1">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                autoFocus
                className="w-32 px-2 py-0.5 text-xs font-semibold bg-[var(--bg-main)] border border-blue-500 rounded text-[var(--text-primary)]"
              />
              <button onClick={handleSaveTitle} className="p-1 text-emerald-600 hover:text-emerald-500 cursor-pointer">
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span 
              onClick={() => {
                setEditedTitle(state.appName || 'ML & DS Career OS');
                setIsEditingTitle(true);
              }}
              className="text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] cursor-pointer transition-colors"
              title="Нажмите, чтобы переименовать систему"
            >
              {state.appName || 'ML & DS Career OS'}
            </span>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
          <span className="font-semibold text-[var(--text-primary)]">
            {viewTitles[activeView]}
          </span>
        </div>
      </div>

      {/* Center: Search Trigger (Cmd+K style) */}
      <div className="hidden md:flex items-center">
        <button
          onClick={onOpenSearch}
          className="flex items-center justify-between w-64 px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-secondary)] text-xs hover:border-blue-500/50 transition-colors cursor-pointer shadow-2xs"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5" />
            <span>Поиск по проекту...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)] font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-2.5">
        
        {/* Search button on small screens */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 rounded-xl border border-[var(--color-border)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover-sidebar)] cursor-pointer"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Currency Switcher */}
        {onChangeState && (
          <div className="hidden sm:flex items-center bg-[var(--bg-main)] border border-[var(--color-border)] rounded-xl p-0.5 text-xs font-bold">
            <button
              onClick={() => onChangeState(prev => ({ ...prev, currency: 'RUB' }))}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${(!state.currency || state.currency === 'RUB') ? 'bg-emerald-600 text-white shadow-2xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              title="Переключить валюту на Рубли (₽)"
            >
              ₽
            </button>
            <button
              onClick={() => onChangeState(prev => ({ ...prev, currency: 'USD' }))}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${state.currency === 'USD' ? 'bg-blue-600 text-white shadow-2xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              title="Переключить валюту на Доллары ($)"
            >
              $
            </button>
            <button
              onClick={() => onChangeState(prev => ({ ...prev, currency: 'EUR' }))}
              className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${state.currency === 'EUR' ? 'bg-indigo-600 text-white shadow-2xs' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              title="Переключить валюту на Евро (€)"
            >
              €
            </button>
          </div>
        )}

        {/* Dark/Light Theme Switcher */}
        <button
          onClick={onToggleDarkMode}
          title={darkMode ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
          className="p-2 rounded-xl border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover-sidebar)] transition-colors cursor-pointer"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover-sidebar)] transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl shadow-xl p-3 z-50 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)] text-xs font-semibold">
                <span>Уведомления</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-normal">Все прочитано</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] text-xs space-y-1">
                    <div className="font-semibold text-[var(--text-primary)] flex items-center justify-between">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-[var(--text-secondary)]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)]">{n.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Export to PDF */}
        <button
          onClick={onOpenNotionExport}
          className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>PDF Экспорт</span>
        </button>

        {/* Profile Avatar Badge */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[var(--color-border)]">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400 border border-[var(--color-border)]">
            CP
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-semibold text-[var(--text-primary)] leading-tight">
              {state.goals.targetGrade || 'Senior ML / DS Specialist'}
            </div>
            <div className="text-[10px] text-[var(--text-secondary)] truncate max-w-[110px]">
              {state.goals.targetLocation || 'Москва / Удаленка РФ'}
            </div>
          </div>
        </div>

      </div>

    </header>
  );
};
