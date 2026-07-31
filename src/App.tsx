import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { CriteriaBoardView } from './components/CriteriaBoardView';
import { CompaniesView } from './components/CompaniesView';
import { VacanciesView } from './components/VacanciesView';
import { VacancyAnalysisView } from './components/VacancyAnalysisView';
import { MiroSwotBoardView } from './components/MiroSwotBoardView';
import { NewslettersView } from './components/NewslettersView';
import { AgileTrackView } from './components/AgileTrackView';
import { NotionDocsView } from './components/NotionDocsView';
import { SkillsView } from './components/SkillsView';
import { SwotView } from './components/SwotView';
import { RoadmapKanbanView } from './components/RoadmapKanbanView';
import { SettingsView } from './components/SettingsView';
import { SearchModal } from './components/SearchModal';
import { NotionExportModal } from './components/NotionExportModal';
import { ActiveView, CareerState } from './types';
import { INITIAL_CAREER_STATE } from './data/workflow';

export function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark' || true;
  });

  // State initialization
  const [state, setState] = useState<CareerState>(() => {
    const saved = localStorage.getItem('career_os_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const rawSteps: number[] = Array.isArray(parsed.completed_steps) ? parsed.completed_steps : [];
        const cleanSteps = Array.from(new Set(rawSteps)).filter((s): s is number => typeof s === 'number' && s >= 1 && s <= 8);
        const currentStep = Math.min(Math.max(parsed.current_step || 1, 1), 8);

        return {
          ...parsed,
          current_step: currentStep,
          completed_steps: cleanSteps
        };
      } catch (e) {
        console.error('Failed to parse saved state:', e);
      }
    }
    return INITIAL_CAREER_STATE;
  });

  // Active View
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');

  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // AI Chat
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Theme Sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // LocalStorage Sync
  useEffect(() => {
    localStorage.setItem('career_os_state', JSON.stringify(state));
  }, [state]);

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleResetState = () => {
    setState(INITIAL_CAREER_STATE);
    localStorage.removeItem('career_os_state');
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `career_os_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleAskAi = async (prompt: string) => {
    setAiMessages(prev => [...prev, { role: 'user', content: prompt }]);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-[#Type]': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `Ты Senior Software Engineer, Technical Recruiter и карьерный консультант. Отвечай кратко, строго по делу, в профессиональном SaaS стиле.`
            },
            ...aiMessages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: prompt }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API server error');
      }

      const data = await response.json();
      setAiMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Анализ завершен.' }]);
    } catch (err) {
      // Fallback assistant response
      setAiMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `### 🎯 Экспертная рекомендация по запросу\n\n- **Ключевой фокус:** Для шага #${state.current_step} необходимо сфокусироваться на четких метриках DoD (Definition of Done).\n- **Формулировка:** Использовать формат STAR (Situation, Task, Action, Result) для всех кейсов.\n- **Действие:** Обновите базу компаний и критериев отбора.` 
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] font-sans antialiased flex">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        onSelectView={setActiveView}
        state={state}
        onChangeState={setState}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header */}
        <Header
          activeView={activeView}
          state={state}
          onChangeState={setState}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotionExport={() => setIsExportModalOpen(true)}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onResetState={handleResetState}
          onExportJson={handleExportJson}
        />

        {/* View Router Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto space-y-6">
          {activeView === 'dashboard' && (
            <DashboardView
              state={state}
              onChangeState={setState}
              onSelectView={setActiveView}
              onSelectStep={step => setState(prev => ({ ...prev, current_step: step }))}
              onOpenNotionExport={() => setIsExportModalOpen(true)}
              onAskAi={handleAskAi}
            />
          )}

          {activeView === 'agile_track' && (
            <AgileTrackView
              state={state}
              onChangeState={setState}
              onAskAi={handleAskAi}
              onOpenNotionExport={() => setIsExportModalOpen(true)}
            />
          )}

          {activeView === 'notion_docs' && (
            <NotionDocsView
              state={state}
              onChangeState={setState}
              onOpenNotionExport={() => setIsExportModalOpen(true)}
              onSelectView={setActiveView}
            />
          )}

          {activeView === 'criteria' && (
            <CriteriaBoardView
              state={state}
              onChangeState={setState}
              onAskAi={handleAskAi}
            />
          )}

          {activeView === 'companies' && (
            <CompaniesView
              state={state}
              onChangeState={setState}
            />
          )}

          {activeView === 'vacancies' && (
            <VacanciesView
              state={state}
              onChangeState={setState}
            />
          )}

          {activeView === 'newsletters' && (
            <NewslettersView
              state={state}
              onChangeState={setState}
              onAskAi={handleAskAi}
            />
          )}

          {activeView === 'vacancy_analysis' && (
            <VacancyAnalysisView
              state={state}
              onChangeState={setState}
              onAskAi={handleAskAi}
            />
          )}

          {activeView === 'swot_miro' && (
            <MiroSwotBoardView
              state={state}
              onChangeState={setState}
              onAskAi={handleAskAi}
            />
          )}

          {activeView === 'skills' && (
            <SkillsView
              state={state}
              onChangeState={setState}
              onAskAi={handleAskAi}
            />
          )}

          {activeView === 'swot' && (
            <SwotView
              state={state}
              onChangeState={setState}
              onAskAi={handleAskAi}
            />
          )}

          {activeView === 'roadmap_kanban' && (
            <RoadmapKanbanView
              state={state}
              onChangeState={setState}
              onAskAi={handleAskAi}
            />
          )}

          {activeView === 'settings' && (
            <SettingsView
              state={state}
              onChangeState={setState}
              onResetState={handleResetState}
              onExportJson={handleExportJson}
            />
          )}
        </main>

      </div>

      {/* Cmd+K Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        state={state}
        onSelectView={setActiveView}
        onSelectStep={step => setState(prev => ({ ...prev, current_step: step }))}
      />

      {/* PDF Export Modal */}
      <NotionExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        state={state}
      />

    </div>
  );
}

export default App;
