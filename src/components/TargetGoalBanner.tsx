import React from 'react';
import { Target, Award, Coins, Zap } from 'lucide-react';
import { CareerState } from '../types';
import { getCurrencySymbol, formatSalaryWithCurrency } from '../utils/currency';

interface TargetGoalBannerProps {
  state: CareerState;
  subtitle?: string;
}

export const TargetGoalBanner: React.FC<TargetGoalBannerProps> = ({
  state,
  subtitle
}) => {
  const goal = state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer';
  const pos = state.selected_position || 'Senior ML & DS Engineer / AI Architect';
  const grade = state.goals?.targetGrade || 'Senior ML / AI Architect';
  const rawSalary = state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес';
  const salary = formatSalaryWithCurrency(rawSalary, state.currency || 'RUB');
  const currencySymbol = getCurrencySymbol(state.currency || 'RUB');
  const hardSkills = state.goals?.hardSkillsSummary || state.skills.filter(s => s.category === 'Hard Skill').map(s => s.name).join(', ');

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 shadow-sm border border-indigo-500/30">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-bold text-[10px] tracking-wider uppercase flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span>Целевая ориентация доски</span>
            </span>
            {grade && (
              <span className="px-2 py-0.5 rounded-md bg-blue-400/20 text-blue-300 font-semibold text-[10px]">
                Грейд: {grade}
              </span>
            )}
          </div>

          <h3 className="font-bold text-sm text-amber-100 flex items-center space-x-2">
            <span>{goal}</span>
          </h3>

          {subtitle && (
            <p className="text-[11px] text-slate-300 leading-normal">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-indigo-500/20 text-[11px]">
          <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center space-x-1.5">
            <Award className="w-3.5 h-3.5 text-blue-300 shrink-0" />
            <span className="font-medium text-slate-200">{pos}</span>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 flex items-center space-x-1.5 font-bold">
            <Coins className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>{salary}</span>
            <span className="text-[10px] bg-emerald-400/20 px-1.5 py-0.5 rounded font-bold text-emerald-300 ml-1">
              {currencySymbol}
            </span>
          </div>

          {hardSkills && (
            <div className="hidden xl:flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-200 font-medium">
              <Zap className="w-3.5 h-3.5 text-purple-300 shrink-0" />
              <span className="truncate max-w-[200px]" title={hardSkills}>{hardSkills}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
