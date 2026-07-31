import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  GitCommit, 
  CheckSquare, 
  Building2, 
  Briefcase, 
  Mail,
  Table,
  Compass, 
  Settings, 
  Target, 
  Bot,
  ShieldCheck,
  Sparkles,
  Edit3,
  Check,
  X
} from 'lucide-react';
import { ActiveView, CareerState } from '../types';

interface SidebarProps {
  activeView: ActiveView;
  onSelectView: (view: ActiveView) => void;
  state: CareerState;
  onChangeState?: React.Dispatch<React.SetStateAction<CareerState>>;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  state,
  onChangeState,
  isMobileOpen,
  onCloseMobile
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(state.appName || 'ML & DS Career OS');

  const [isEditingGrade, setIsEditingGrade] = useState(false);
  const [editedGrade, setEditedGrade] = useState(state.goals?.targetGrade || 'Senior ML / AI Architect');

  const [isEditingTier, setIsEditingTier] = useState(false);
  const [editedTier, setEditedTier] = useState((state as any).userTier || 'PRO');

  const handleSaveTitle = () => {
    if (editedTitle.trim() && onChangeState) {
      onChangeState(prev => ({
        ...prev,
        appName: editedTitle.trim()
      }));
    }
    setIsEditingTitle(false);
  };

  const handleSaveGrade = () => {
    if (editedGrade.trim() && onChangeState) {
      onChangeState(prev => ({
        ...prev,
        goals: {
          ...prev.goals,
          targetGrade: editedGrade.trim()
        }
      }));
    }
    setIsEditingGrade(false);
  };

  const handleSaveTier = () => {
    if (editedTier.trim() && onChangeState) {
      onChangeState(prev => ({
        ...prev,
        userTier: editedTier.trim()
      }));
    }
    setIsEditingTier(false);
  };
  const criteriaCount = state.notion_criteria?.length || 0;
  const companiesCount = state.selected_companies?.length || 0;
  const vacanciesCount = state.selected_vacancies?.length || 0;
  const completedCount = (state.completed_steps || []).filter(s => typeof s === 'number' && s >= 1 && s <= 8).length;
  const progressPercent = Math.min(100, Math.round((completedCount / 8) * 100));

  const navItems: Array<{
    id: ActiveView;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge: string | null;
    highlight?: boolean;
  }> = [
    {
      id: 'dashboard' as ActiveView,
      label: 'Главный Дашборд',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'criteria' as ActiveView,
      label: 'Доска №1: Критерии (10+)',
      icon: CheckSquare,
      badge: `${criteriaCount}`
    },
    {
      id: 'companies' as ActiveView,
      label: 'Доска №2: Компании (5+)',
      icon: Building2,
      badge: `${companiesCount}`
    },
    {
      id: 'vacancies' as ActiveView,
      label: 'Доска №3: Вакансии (3+)',
      icon: Briefcase,
      badge: `${vacanciesCount}`
    },
    {
      id: 'newsletters' as ActiveView,
      label: 'Карьерные рассылки',
      icon: Mail,
      badge: `${state.newsletters?.length || 0}`
    },
    {
      id: 'vacancy_analysis' as ActiveView,
      label: 'Анализ вакансий',
      icon: Table,
      badge: `${state.vacancy_analyses?.length || 0}`
    },
    {
      id: 'swot_miro' as ActiveView,
      label: 'Анализ навыков (SWOT)',
      icon: Compass,
      badge: 'SWOT'
    },
    {
      id: 'agile_track' as ActiveView,
      label: 'Agile Поток',
      icon: GitCommit,
      badge: `${Math.min(state.current_step || 1, 8)}/8`
    },
    {
      id: 'settings' as ActiveView,
      label: 'Настройки профиля и навыков',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <>
      {/* Backdrop for Mobile */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50
        h-screen w-[280px] shrink-0
        bg-[var(--bg-sidebar)] border-r border-[var(--color-border)]
        flex flex-col justify-between
        transition-transform duration-200 ease-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Top Header Logo */}
        <div>
          <div className="h-[72px] px-4 sm:px-6 border-b border-[var(--color-border)] border-t-2 border-t-[#C8A05B] flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-blue-400/20">
                <Target className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                {isEditingTitle ? (
                  <div className="flex items-center space-x-1">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                      autoFocus
                      className="w-28 px-1.5 py-0.5 text-xs font-bold bg-[var(--bg-main)] border border-blue-500 rounded text-[var(--text-primary)]"
                    />
                    <button onClick={handleSaveTitle} className="p-1 text-emerald-600 hover:text-emerald-500 cursor-pointer">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setIsEditingTitle(false)} className="p-1 text-rose-500 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      setEditedTitle(state.appName || 'ML & DS Career OS');
                      setIsEditingTitle(true);
                    }}
                    className="group cursor-pointer flex items-center space-x-1.5"
                    title="Нажмите, чтобы изменить название системы"
                  >
                    <div className="font-bold text-xs tracking-tight text-[var(--text-primary)] truncate max-w-[130px]">
                      {state.appName || 'ML & DS Career OS'}
                    </div>
                    <Edit3 className="w-3 h-3 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                {isEditingGrade ? (
                  <div className="flex items-center space-x-1 mt-0.5">
                    <input
                      type="text"
                      value={editedGrade}
                      onChange={(e) => setEditedGrade(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveGrade()}
                      autoFocus
                      className="w-24 px-1 py-0.5 text-[10px] bg-[var(--bg-main)] border border-amber-500 rounded text-[var(--text-primary)]"
                    />
                    <button onClick={handleSaveGrade} className="p-0.5 text-emerald-600 hover:text-emerald-500 cursor-pointer">
                      <Check className="w-3 h-3" />
                    </button>
                    <button onClick={() => setIsEditingGrade(false)} className="p-0.5 text-rose-500 cursor-pointer">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      setEditedGrade(state.goals?.targetGrade || 'Senior ML / AI Architect');
                      setIsEditingGrade(true);
                    }}
                    className="group cursor-pointer flex items-center space-x-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5"
                    title="Нажмите, чтобы изменить грейд (Senior / Tech Lead / AI Architect)"
                  >
                    <span className="truncate max-w-[120px]">{state.goals?.targetGrade || 'Senior ML Engineer'}</span>
                    <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>
            </div>

            {isEditingTier ? (
              <div className="flex items-center space-x-1 shrink-0">
                <input
                  type="text"
                  value={editedTier}
                  onChange={(e) => setEditedTier(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveTier()}
                  autoFocus
                  className="w-14 px-1 py-0.5 text-[10px] bg-[var(--bg-main)] border border-amber-500 rounded text-amber-600 font-bold uppercase"
                />
                <button onClick={handleSaveTier} className="p-0.5 text-emerald-600 hover:text-emerald-500 cursor-pointer">
                  <Check className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <span 
                onClick={() => {
                  setEditedTier((state as any).userTier || 'PRO');
                  setIsEditingTier(true);
                }}
                className="group cursor-pointer px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0 flex items-center space-x-1 transition-colors"
                title="Нажмите, чтобы изменить статус тарифного плана (PRO / VIP / EXPERT)"
              >
                <span>{(state as any).userTier || 'PRO'}</span>
                <Edit3 className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            )}
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            <div className="px-3 py-2 text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
              Навигация по проекту
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectView(item.id);
                    onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer
                    ${isActive 
                      ? 'bg-blue-600 text-white shadow-sm font-semibold' 
                      : 'text-[var(--text-primary)] hover:bg-[var(--bg-hover-sidebar)]'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`
                      px-2 py-0.5 text-[10px] font-semibold rounded-md
                      ${isActive 
                        ? 'bg-white/20 text-white' 
                        : item.highlight 
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' 
                          : 'bg-slate-200 dark:bg-slate-800 text-[var(--text-secondary)]'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Progress Card */}
        <div className="p-4 border-t border-[var(--color-border)] space-y-3 bg-[var(--bg-sidebar)]">
          <div className="bg-slate-100 dark:bg-slate-800/80 rounded-xl p-3 border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[var(--text-primary)] flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Прогресс Agile</span>
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--text-secondary)]">
              <span>Завершено {completedCount} из 8</span>
              <button 
                onClick={() => onSelectView('agile_track')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
              >
                К шагу #{Math.min(state.current_step || 1, 8)}
              </button>
            </div>
          </div>

          {/* Developer Credit Footer */}
          <div className="pt-2 border-t border-[var(--color-border)] text-center space-y-1">
            <p className="text-[10px] text-[var(--text-secondary)] font-medium">Разработчик приложения:</p>
            <p className="text-xs font-bold text-[var(--text-primary)]">КАЛЫК ШЫНЫК</p>
            <a 
              href="https://kalyk-shynyk-web-studio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-[10px] text-blue-600 dark:text-blue-400 font-semibold hover:underline bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20"
            >
              WEB STUDIO & GAMIFICATION
            </a>
          </div>
        </div>

      </aside>
    </>
  );
};
