import React from 'react';
import { WORKFLOW_STEPS } from '../data/workflow';
import { Check, ChevronRight } from 'lucide-react';

interface AgileProgressBarProps {
  currentStep: number;
  completedSteps: number[];
  onSelectStep: (stepNumber: number) => void;
}

export const AgileProgressBar: React.FC<AgileProgressBarProps> = ({
  currentStep,
  completedSteps,
  onSelectStep,
}) => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 overflow-x-auto">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 min-w-max">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => onSelectStep(step.id)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/50'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60'
                    : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isCurrent
                      ? 'bg-white text-indigo-600'
                      : isCompleted
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : step.id}
                </div>
                <div className="flex flex-col text-left">
                  <span className="leading-none font-semibold">
                    Шаг {step.id}
                  </span>
                  <span className="text-[10px] opacity-80 truncate max-w-[100px]">
                    {step.titleRu.split(' ')[0]}...
                  </span>
                </div>
              </button>

              {idx < WORKFLOW_STEPS.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
