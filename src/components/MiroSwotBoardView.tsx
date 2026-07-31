import React, { useState } from 'react';
import { Compass, Sparkles, ZoomIn, ZoomOut, Grid, Move, Check, Edit3, ShieldAlert, Award, AlertTriangle, TrendingUp, RefreshCw, BookOpen, Zap } from 'lucide-react';
import { CareerState, SwotDetailedAnswers } from '../types';
import { KNOWLEDGE_SWOT_EXPERT_ANSWERS } from '../data/knowledgeBase';
import { TargetGoalBanner } from './TargetGoalBanner';
import { ExportBoardButton } from './ExportBoardButton';

interface MiroSwotBoardViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onAskAi: (prompt: string) => void;
}

export const MiroSwotBoardView: React.FC<MiroSwotBoardViewProps> = ({
  state,
  onChangeState,
  onAskAi
}) => {
  const [zoom, setZoom] = useState(100);
  const [activeTab, setActiveTab] = useState<'all' | 'strengths' | 'weaknesses' | 'opportunities' | 'threats'>('all');

  const swot = state.swot_answers || {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: []
  };

  const updateAnswer = (
    category: keyof SwotDetailedAnswers,
    questionId: string,
    newAnswer: string
  ) => {
    onChangeState(prev => {
      const currentCat = prev.swot_answers[category] || [];
      const updatedCat = currentCat.map(q => 
        q.questionId === questionId ? { ...q, answerText: newAnswer } : q
      );
      return {
        ...prev,
        swot_answers: {
          ...prev.swot_answers,
          [category]: updatedCat
        }
      };
    });
  };

  const handleGenerateFromKnowledgeBase = () => {
    const hardSkillsSummary = state.goals?.hardSkillsSummary || state.skills.filter(s => s.category === 'Hard Skill').map(s => s.name).join(', ') || 'Python, PyTorch, LLM Fine-Tuning, MLOps, System Design';
    const softSkillsSummary = state.goals?.softSkillsSummary || state.skills.filter(s => s.category === 'Soft Skill').map(s => s.name).join(', ') || 'Technical Leadership, Mentorship, Agile';
    const primaryGoal = state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer';
    const targetPos = state.selected_position || 'Senior ML & DS Engineer / AI Architect';

    const customizedStrengths = KNOWLEDGE_SWOT_EXPERT_ANSWERS.strengths.map(q => {
      if (q.questionId === 's1') {
        return {
          ...q,
          answerText: `Ключевой стек Hard Skills из Настроек профиля: ${hardSkillsSummary}. Экспертный опыт коммерческой разработки.`
        };
      }
      if (q.questionId === 's2') {
        return {
          ...q,
          answerText: `Компетенции Soft Skills из Настроек профиля: ${softSkillsSummary}.`
        };
      }
      if (q.questionId === 's3' || q.questionId === 's4') {
        return {
          ...q,
          answerText: `${q.answerText} (Ориентировано на целевую роль ${targetPos} и цель: ${primaryGoal})`
        };
      }
      return q;
    });

    onChangeState(prev => ({
      ...prev,
      swot_answers: {
        strengths: customizedStrengths,
        weaknesses: KNOWLEDGE_SWOT_EXPERT_ANSWERS.weaknesses,
        opportunities: KNOWLEDGE_SWOT_EXPERT_ANSWERS.opportunities,
        threats: KNOWLEDGE_SWOT_EXPERT_ANSWERS.threats,
      },
      swot_analysis: {
        strengths: customizedStrengths.map(s => `• ${s.questionText}\n  ${s.answerText}`).join('\n\n'),
        weaknesses: KNOWLEDGE_SWOT_EXPERT_ANSWERS.weaknesses.map(w => `• ${w.questionText}\n  ${w.answerText}`).join('\n\n'),
        opportunities: KNOWLEDGE_SWOT_EXPERT_ANSWERS.opportunities.map(o => `• ${o.questionText}\n  ${o.answerText}`).join('\n\n'),
        threats: KNOWLEDGE_SWOT_EXPERT_ANSWERS.threats.map(t => `• ${t.questionText}\n  ${t.answerText}`).join('\n\n'),
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Target Goal Banner */}
      <TargetGoalBanner 
        state={state} 
        subtitle="Интерактивная SWOT-доска синхронизируется с Hard/Soft навыками и карьерными целями из Настроек профиля и навыков."
      />

      {/* Top Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-xl">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                Анализ навыков (Интерактивная доска SWOT)
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/10 text-amber-600 border border-amber-500/20">
                SWOT Matrix
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Интерактивная доска со стикерами и детальными ответами на 16 контрольных вопросов SWOT
            </p>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <ExportBoardButton state={state} boardType="swot" boardTitle="Доска №5" />
          <div className="flex items-center space-x-1 bg-[var(--bg-main)] border border-[var(--color-border)] rounded-xl p-1">
            <button 
              onClick={() => setZoom(prev => Math.max(70, prev - 10))}
              className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)]"
              title="Уменьшить"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold px-2">{zoom}%</span>
            <button 
              onClick={() => setZoom(prev => Math.min(130, prev + 10))}
              className="p-1.5 hover:bg-[var(--bg-card)] rounded-lg text-[var(--text-secondary)]"
              title="Увеличить"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleGenerateFromKnowledgeBase}
            className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl text-xs font-semibold hover:opacity-90 flex items-center justify-center space-x-2 transition-all shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Заполнить из Базы Знаний</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs for SWOT Quadrants */}
      <div className="flex items-center space-x-2 border-b border-[var(--color-border)] pb-3">
        {[
          { id: 'all', label: 'Все квадранты (4x4)' },
          { id: 'strengths', label: '2.1. Сильные стороны (Strengths)' },
          { id: 'weaknesses', label: '2.2. Слабые стороны (Weaknesses)' },
          { id: 'opportunities', label: '2.3. Возможности (Opportunities)' },
          { id: 'threats', label: '2.4. Угрозы (Threats)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-900 shadow-xs'
                : 'bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SWOT Canvas Area */}
      <div 
        className="relative min-h-[600px] border border-[var(--color-border)] rounded-2xl p-6 transition-all bg-slate-900/5 dark:bg-slate-950/40 overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(148, 163, 184, 0.2) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top left'
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2.1 STRENGTHS */}
          {(activeTab === 'all' || activeTab === 'strengths') && (
            <div className="bg-emerald-500/10 dark:bg-emerald-950/30 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-sm relative">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-emerald-500 text-white rounded-lg shadow-xs">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-emerald-950 dark:text-emerald-300">
                      2.1. Сильные стороны (Strengths)
                    </h2>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                      Внутренние преимущества и ресурсы
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                  Карточки SWOT
                </span>
              </div>

              <div className="space-y-4">
                {swot.strengths?.map((item) => (
                  <div key={item.questionId} className="bg-emerald-500/15 dark:bg-emerald-900/40 border border-emerald-500/30 rounded-xl p-4 shadow-xs space-y-2">
                    <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{item.questionText}</span>
                    </div>
                    <textarea
                      rows={2}
                      value={item.answerText}
                      onChange={e => updateAnswer('strengths', item.questionId, e.target.value)}
                      placeholder="Запишите ответ на вопрос..."
                      className="w-full text-xs p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/80 border border-emerald-500/30 focus:outline-hidden focus:border-emerald-500 text-[var(--text-primary)] font-medium leading-relaxed resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2.2 WEAKNESSES */}
          {(activeTab === 'all' || activeTab === 'weaknesses') && (
            <div className="bg-amber-500/10 dark:bg-amber-950/30 border-2 border-amber-500/40 rounded-2xl p-5 space-y-4 shadow-sm relative">
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-amber-500 text-slate-900 rounded-lg shadow-xs">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-amber-950 dark:text-amber-300">
                      2.2. Слабые стороны (Weaknesses)
                    </h2>
                    <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                      Зоны роста и ограничения
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                  Карточки SWOT
                </span>
              </div>

              <div className="space-y-4">
                {swot.weaknesses?.map((item) => (
                  <div key={item.questionId} className="bg-amber-500/15 dark:bg-amber-900/40 border border-amber-500/30 rounded-xl p-4 shadow-xs space-y-2">
                    <div className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{item.questionText}</span>
                    </div>
                    <textarea
                      rows={2}
                      value={item.answerText}
                      onChange={e => updateAnswer('weaknesses', item.questionId, e.target.value)}
                      placeholder="Запишите ответ на вопрос..."
                      className="w-full text-xs p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/80 border border-amber-500/30 focus:outline-hidden focus:border-amber-500 text-[var(--text-primary)] font-medium leading-relaxed resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2.3 OPPORTUNITIES */}
          {(activeTab === 'all' || activeTab === 'opportunities') && (
            <div className="bg-blue-500/10 dark:bg-blue-950/30 border-2 border-blue-500/40 rounded-2xl p-5 space-y-4 shadow-sm relative">
              <div className="flex items-center justify-between pb-3 border-b border-blue-500/30">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-500 text-white rounded-lg shadow-xs">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-blue-950 dark:text-blue-300">
                      2.3. Возможности (Opportunities)
                    </h2>
                    <span className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">
                      Внешние тренды и перспективы
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-800 dark:text-blue-300 font-bold text-[10px]">
                  Карточки SWOT
                </span>
              </div>

              <div className="space-y-4">
                {swot.opportunities?.map((item) => (
                  <div key={item.questionId} className="bg-blue-500/15 dark:bg-blue-900/40 border border-blue-500/30 rounded-xl p-4 shadow-xs space-y-2">
                    <div className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                      <span>{item.questionText}</span>
                    </div>
                    <textarea
                      rows={2}
                      value={item.answerText}
                      onChange={e => updateAnswer('opportunities', item.questionId, e.target.value)}
                      placeholder="Запишите ответ на вопрос..."
                      className="w-full text-xs p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/80 border border-blue-500/30 focus:outline-hidden focus:border-blue-500 text-[var(--text-primary)] font-medium leading-relaxed resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2.4 THREATS */}
          {(activeTab === 'all' || activeTab === 'threats') && (
            <div className="bg-rose-500/10 dark:bg-rose-950/30 border-2 border-rose-500/40 rounded-2xl p-5 space-y-4 shadow-sm relative">
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/30">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-rose-500 text-white rounded-lg shadow-xs">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-rose-950 dark:text-rose-300">
                      2.4. Угрозы (Threats)
                    </h2>
                    <span className="text-[11px] text-rose-700 dark:text-rose-400 font-medium">
                      Внешние риски и препятствия
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-800 dark:text-rose-300 font-bold text-[10px]">
                  Карточки SWOT
                </span>
              </div>

              <div className="space-y-4">
                {swot.threats?.map((item) => (
                  <div key={item.questionId} className="bg-rose-500/15 dark:bg-rose-900/40 border border-rose-500/30 rounded-xl p-4 shadow-xs space-y-2">
                    <div className="text-xs font-bold text-rose-900 dark:text-rose-200 flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{item.questionText}</span>
                    </div>
                    <textarea
                      rows={2}
                      value={item.answerText}
                      onChange={e => updateAnswer('threats', item.questionId, e.target.value)}
                      placeholder="Запишите ответ на вопрос..."
                      className="w-full text-xs p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/80 border border-rose-500/30 focus:outline-hidden focus:border-rose-500 text-[var(--text-primary)] font-medium leading-relaxed resize-y"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
