import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  RefreshCw, 
  MessageSquare, 
  Zap, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { CareerState } from '../types';

interface AiCoachPanelProps {
  isOpen: boolean;
  onClose: () => void;
  state: CareerState;
  onAskAi: (prompt: string) => void;
  aiMessages: { role: 'user' | 'assistant'; content: string }[];
  isGenerating: boolean;
}

export const AiCoachPanel: React.FC<AiCoachPanelProps> = ({
  isOpen,
  onClose,
  state,
  onAskAi,
  aiMessages,
  isGenerating
}) => {
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;
    onAskAi(input.trim());
    setInput('');
  };

  const quickPrompts = [
    `Проведи аудит текущего этапа #${state.current_step}`,
    'Составь банку из 3 STAR ответов на английском',
    'Симуляция 3 сложных вопросов на софт-скиллы',
    'Оцени соответствие моего стека для Tier 1 компаний'
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-[var(--bg-card)] border-l border-[var(--color-border)] shadow-2xl flex flex-col justify-between">
      
      {/* Top Bar Header */}
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--bg-sidebar)]">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-xs text-[var(--text-primary)]">AI Career Coach</h3>
            <p className="text-[10px] text-[var(--text-secondary)]">Agile Консультант • Gemini Engine</p>
          </div>
        </div>

        <button onClick={onClose} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer rounded-lg hover:bg-[var(--bg-hover-sidebar)]">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {aiMessages.length === 0 ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-[var(--text-primary)]">Чем я могу помочь на этапе #{state.current_step}?</h4>
            <p className="text-[11px] text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
              Задайте любой вопрос по составлению резюме, поиску компаний, подготовке к STAR или переписке с HR.
            </p>

            {/* Quick Prompts */}
            <div className="pt-2 space-y-1.5 text-left">
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block">Быстрые команды:</span>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => onAskAi(p)}
                  className="w-full text-left p-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] hover:border-blue-500/50 text-[11px] font-medium text-[var(--text-primary)] cursor-pointer transition-colors"
                >
                  ✨ {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          aiMessages.map((msg, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl space-y-1 ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white ml-6 font-medium' 
                  : 'bg-[var(--bg-main)] border border-[var(--color-border)] text-[var(--text-primary)] mr-6'
              }`}
            >
              <div className="flex items-center space-x-1.5 text-[10px] opacity-70 font-bold uppercase tracking-wider mb-1">
                {msg.role === 'user' ? <span>Вы</span> : <span className="flex items-center space-x-1"><Sparkles className="w-3 h-3" /><span>AI Coach</span></span>}
              </div>
              <div className="notion-prose">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))
        )}

        {isGenerating && (
          <div className="p-3 rounded-2xl bg-[var(--bg-main)] border border-[var(--color-border)] text-xs text-[var(--text-secondary)] flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>AI Coach генерирует ответ...</span>
          </div>
        )}
      </div>

      {/* Bottom Input Area */}
      <div className="p-4 border-t border-[var(--color-border)] bg-[var(--bg-sidebar)] space-y-2">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Задать вопрос AI коучу..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isGenerating}
            className="flex-1 px-3.5 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isGenerating || !input.trim()}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl cursor-pointer transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
