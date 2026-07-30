import React, { useState } from 'react';
import { CareerState, Company, Vacancy, Skill, MissingSkill, RoadmapItem } from '../types';
import { Plus, Trash2, ShieldAlert, CheckCircle, TrendingUp, Sparkles } from 'lucide-react';

interface StepEditorsProps {
  currentStep: number;
  state: CareerState;
  onChangeState: (newState: CareerState) => void;
  onAskAi: (prompt: string) => void;
}

export const StepEditors: React.FC<StepEditorsProps> = ({
  currentStep,
  state,
  onChangeState,
  onAskAi,
}) => {
  // Step 1: Goals
  const handleGoalChange = (field: keyof CareerState['goals'], value: string) => {
    onChangeState({
      ...state,
      goals: {
        ...state.goals,
        [field]: value,
      },
    });
  };

  // Step 2: Market selection
  const handleMarketChange = (market: string) => {
    onChangeState({ ...state, selected_market: market });
  };

  // Step 3: Position selection
  const handlePositionChange = (position: string) => {
    onChangeState({ ...state, selected_position: position });
  };

  // Step 4: Companies
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: '',
    tier: 'Tier 1',
    techStack: [],
    sponsorship: true,
    notes: '',
  });

  const addCompany = () => {
    if (!newCompany.name) return;
    const c: Company = {
      id: Date.now().toString(),
      name: newCompany.name,
      tier: newCompany.tier as any || 'Tier 1',
      techStack: typeof newCompany.techStack === 'string' 
        ? (newCompany.techStack as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        : newCompany.techStack || [],
      sponsorship: newCompany.sponsorship ?? true,
      notes: newCompany.notes || '',
    };
    onChangeState({
      ...state,
      selected_companies: [...state.selected_companies, c],
    });
    setNewCompany({ name: '', tier: 'Tier 1', techStack: [], sponsorship: true, notes: '' });
  };

  const removeCompany = (id: string) => {
    onChangeState({
      ...state,
      selected_companies: state.selected_companies.filter((c) => c.id !== id),
    });
  };

  // Step 5: Vacancies
  const [newVacancy, setNewVacancy] = useState<Partial<Vacancy>>({
    title: '',
    company: '',
    salaryRange: '',
    location: '',
    keySkills: [],
  });

  const addVacancy = () => {
    if (!newVacancy.title || !newVacancy.company) return;
    const v: Vacancy = {
      id: Date.now().toString(),
      title: newVacancy.title,
      company: newVacancy.company,
      salaryRange: newVacancy.salaryRange || 'Market Average',
      location: newVacancy.location || 'Remote',
      keySkills: typeof newVacancy.keySkills === 'string'
        ? (newVacancy.keySkills as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        : newVacancy.keySkills || [],
    };
    onChangeState({
      ...state,
      selected_vacancies: [...state.selected_vacancies, v],
    });
    setNewVacancy({ title: '', company: '', salaryRange: '', location: '', keySkills: [] });
  };

  const removeVacancy = (id: string) => {
    onChangeState({
      ...state,
      selected_vacancies: state.selected_vacancies.filter((v) => v.id !== id),
    });
  };

  // Step 6: Skills
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: '',
    category: 'Hard Skill',
    level: 'Senior',
    evidence: '',
  });

  const addSkill = () => {
    if (!newSkill.name) return;
    const s: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category as any || 'Hard Skill',
      level: newSkill.level as any || 'Senior',
      evidence: newSkill.evidence || '',
    };
    onChangeState({
      ...state,
      skills: [...state.skills, s],
    });
    setNewSkill({ name: '', category: 'Hard Skill', level: 'Senior', evidence: '' });
  };

  const removeSkill = (id: string) => {
    onChangeState({
      ...state,
      skills: state.skills.filter((s) => s.id !== id),
    });
  };

  // Step 7: Missing Skills / Gaps
  const [newGap, setNewGap] = useState<Partial<MissingSkill>>({
    skillName: '',
    priority: 'High',
    effort: 'Medium',
    targetDate: 'Месяц 1',
    actionPlan: '',
  });

  const addGap = () => {
    if (!newGap.skillName) return;
    const g: MissingSkill = {
      id: Date.now().toString(),
      skillName: newGap.skillName,
      priority: newGap.priority as any || 'High',
      effort: newGap.effort as any || 'Medium',
      targetDate: newGap.targetDate || '1 месяц',
      actionPlan: newGap.actionPlan || '',
    };
    onChangeState({
      ...state,
      missing_skills: [...state.missing_skills, g],
    });
    setNewGap({ skillName: '', priority: 'High', effort: 'Medium', targetDate: 'Месяц 1', actionPlan: '' });
  };

  const removeGap = (id: string) => {
    onChangeState({
      ...state,
      missing_skills: state.missing_skills.filter((g) => g.id !== id),
    });
  };

  // Step 8: SWOT
  const handleSwotAdd = (quadrant: keyof CareerState['swot'], item: string) => {
    if (!item.trim()) return;
    onChangeState({
      ...state,
      swot: {
        ...state.swot,
        [quadrant]: [...state.swot[quadrant], item.trim()],
      },
    });
  };

  const handleSwotRemove = (quadrant: keyof CareerState['swot'], index: number) => {
    onChangeState({
      ...state,
      swot: {
        ...state.swot,
        [quadrant]: state.swot[quadrant].filter((_, idx) => idx !== index),
      },
    });
  };

  // Step 9: Roadmap
  const [newRoadmapItem, setNewRoadmapItem] = useState<Partial<RoadmapItem>>({
    sprint: 'Спринт 1',
    task: '',
    category: 'Skill Gap',
    status: 'Backlog',
    metric: '',
  });

  const addRoadmapItem = () => {
    if (!newRoadmapItem.task) return;
    const r: RoadmapItem = {
      id: Date.now().toString(),
      sprint: newRoadmapItem.sprint || 'Спринт 1',
      task: newRoadmapItem.task,
      category: newRoadmapItem.category as any || 'Skill Gap',
      status: newRoadmapItem.status as any || 'Backlog',
      metric: newRoadmapItem.metric || '',
    };
    onChangeState({
      ...state,
      roadmap: [...state.roadmap, r],
    });
    setNewRoadmapItem({ sprint: 'Спринт 1', task: '', category: 'Skill Gap', status: 'Backlog', metric: '' });
  };

  const removeRoadmapItem = (id: string) => {
    onChangeState({
      ...state,
      roadmap: state.roadmap.filter((r) => r.id !== id),
    });
  };

  const toggleRoadmapStatus = (id: string) => {
    onChangeState({
      ...state,
      roadmap: state.roadmap.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'Done' ? 'In Progress' : r.status === 'In Progress' ? 'Done' : 'In Progress';
          return { ...r, status: nextStatus };
        }
        return r;
      }),
    });
  };

  return (
    <div className="space-y-6">
      
      {/* STEP 1 EDITOR */}
      {currentStep === 1 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Инициализация карьерных целей</h3>
            <button
              onClick={() => onAskAi("Проанализируй мои текущие цели, грейды и вилку зарплат в STATE и дай профессиональную оценку их реалистичности.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Оценить через AI Coach</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Главная карьерная цель</label>
              <input
                type="text"
                value={state.goals.primaryGoal}
                onChange={(e) => handleGoalChange('primaryGoal', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Текущий грейд</label>
              <input
                type="text"
                value={state.goals.currentGrade}
                onChange={(e) => handleGoalChange('currentGrade', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Целевой грейд</label>
              <input
                type="text"
                value={state.goals.targetGrade}
                onChange={(e) => handleGoalChange('targetGrade', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Ожидаемый доход (Вилка)</label>
              <input
                type="text"
                value={state.goals.expectedSalary}
                onChange={(e) => handleGoalChange('expectedSalary', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Целевая локация / формат</label>
              <input
                type="text"
                value={state.goals.targetLocation}
                onChange={(e) => handleGoalChange('targetLocation', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Желаемые сроки (Timeline)</label>
              <input
                type="text"
                value={state.goals.timeline}
                onChange={(e) => handleGoalChange('timeline', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 EDITOR */}
      {currentStep === 2 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Выбор целевого рынка</h3>
            <button
              onClick={() => onAskAi("Сравни целевые рынки (EU, US, MENA, Global Remote) для Senior Engineer с вилкой зарплат, налоговой нагрузкой и визовыми сложными моментами.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Сравнить рынки в AI</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "EU / European Union",
              "US & North America",
              "MENA / UAE / Saudi",
              "Global Remote"
            ].map((market) => (
              <button
                key={market}
                onClick={() => handleMarketChange(market)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  state.selected_market === market
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="font-semibold text-xs mb-1">{market}</div>
                <div className="text-[11px] text-slate-400">
                  {state.selected_market === market ? '✓ Выбранный рынок' : 'Нажмите для выбора'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3 EDITOR */}
      {currentStep === 3 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Позиционирование и роль</h3>
            <button
              onClick={() => onAskAi("Предложи 3 альтернативных названия ролей для моего опыта (Fullstack, Lead, Architect) с плюсами и минусами на целевом рынке.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Подобрать позиционирование</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Основная целевая должность (Role Title)</label>
            <input
              type="text"
              value={state.selected_position || ''}
              onChange={(e) => handlePositionChange(e.target.value)}
              placeholder="e.g. Senior Fullstack Engineer (React / Node.js)"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      )}

      {/* STEP 4 EDITOR */}
      {currentStep === 4 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Целевые компании (Target Companies)</h3>
            <button
              onClick={() => onAskAi("Сформируй список из 5 отличных Tier-1 и Tier-2 компаний в Европе и Remote, подходящих под мой стек и предоставляющих визовую поддержку.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Сгенерировать подборку компаний</span>
            </button>
          </div>

          {/* Table of Companies */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3 font-semibold">Компания</th>
                  <th className="py-2 px-3 font-semibold">Тир</th>
                  <th className="py-2 px-3 font-semibold">Стек</th>
                  <th className="py-2 px-3 font-semibold">Визы</th>
                  <th className="py-2 px-3 font-semibold">Заметки</th>
                  <th className="py-2 px-3 font-semibold text-right">Удалить</th>
                </tr>
              </thead>
              <tbody>
                {state.selected_companies.map((c) => (
                  <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 text-slate-200">
                    <td className="py-2.5 px-3 font-bold text-white">{c.name}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-medium text-indigo-300">
                        {c.tier}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {c.techStack.map((tech, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      {c.sponsorship ? (
                        <span className="text-emerald-400 font-semibold">✓ Есть</span>
                      ) : (
                        <span className="text-slate-500">Нет</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 max-w-[200px] truncate">{c.notes}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => removeCompany(c.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Company Form */}
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
            <div>
              <input
                type="text"
                placeholder="Название компании"
                value={newCompany.name || ''}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <select
                value={newCompany.tier || 'Tier 1'}
                onChange={(e) => setNewCompany({ ...newCompany, tier: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              >
                <option value="Tier 1">Tier 1</option>
                <option value="Tier 2">Tier 2</option>
                <option value="Startup">Startup</option>
                <option value="BigTech">BigTech</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Стек (через запятую)"
                value={Array.isArray(newCompany.techStack) ? newCompany.techStack.join(', ') : newCompany.techStack || ''}
                onChange={(e) => setNewCompany({ ...newCompany, techStack: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Заметки / Локация"
                value={newCompany.notes || ''}
                onChange={(e) => setNewCompany({ ...newCompany, notes: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <button
                onClick={addCompany}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Добавить</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5 EDITOR */}
      {currentStep === 5 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Анализ вакансий и требований</h3>
            <button
              onClick={() => onAskAi("Выдели ключевые слова и ключевые компетенции из моих вакансий для оптимизации резюме под системы ATS.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Выделить ATS-слова</span>
            </button>
          </div>

          <div className="space-y-3">
            {state.selected_vacancies.map((v) => (
              <div key={v.id} className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-3.5 flex justify-between items-start">
                <div>
                  <div className="font-bold text-white text-xs">{v.title}</div>
                  <div className="text-[11px] text-indigo-300 font-medium">{v.company} • {v.location} • {v.salaryRange}</div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {v.keySkills.map((sk, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-[10px] text-slate-300 rounded">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => removeVacancy(v.id)} className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
            <input
              type="text"
              placeholder="Название вакансии"
              value={newVacancy.title || ''}
              onChange={(e) => setNewVacancy({ ...newVacancy, title: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Компания"
              value={newVacancy.company || ''}
              onChange={(e) => setNewVacancy({ ...newVacancy, company: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Ключевые скиллы (через запятую)"
              value={Array.isArray(newVacancy.keySkills) ? newVacancy.keySkills.join(', ') : newVacancy.keySkills || ''}
              onChange={(e) => setNewVacancy({ ...newVacancy, keySkills: e.target.value as any })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <button
              onClick={addVacancy}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Добавить вакансию</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 EDITOR */}
      {currentStep === 6 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Инвентаризация текущих навыков (Skills Matrix)</h3>
            <button
              onClick={() => onAskAi("Помоги дополнить матрицу моих навыков формулировками доказательств и кейсов под формат STAR.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Усилить доказательства (STAR)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-3 font-semibold">Навык</th>
                  <th className="py-2 px-3 font-semibold">Категория</th>
                  <th className="py-2 px-3 font-semibold">Уровень</th>
                  <th className="py-2 px-3 font-semibold">Доказательство / Кейсы</th>
                  <th className="py-2 px-3 font-semibold text-right">Удалить</th>
                </tr>
              </thead>
              <tbody>
                {state.skills.map((s) => (
                  <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 text-slate-200">
                    <td className="py-2.5 px-3 font-bold text-white">{s.name}</td>
                    <td className="py-2.5 px-3 text-slate-400">{s.category}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-semibold text-indigo-300">
                        {s.level}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 max-w-[280px]">{s.evidence}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button onClick={() => removeSkill(s.id)} className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
            <input
              type="text"
              placeholder="Название навыка"
              value={newSkill.name || ''}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <select
              value={newSkill.category || 'Hard Skill'}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="Hard Skill">Hard Skill</option>
              <option value="Soft Skill">Soft Skill</option>
              <option value="Architecture">Architecture</option>
              <option value="Process/Agile">Process/Agile</option>
            </select>
            <select
              value={newSkill.level || 'Senior'}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
            <input
              type="text"
              placeholder="Доказательства / Достижения"
              value={newSkill.evidence || ''}
              onChange={(e) => setNewSkill({ ...newSkill, evidence: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <button
              onClick={addSkill}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Добавить</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 7 EDITOR */}
      {currentStep === 7 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Анализ разрывов навыков (Skill Gap Analysis)</h3>
            <button
              onClick={() => onAskAi("Автоматически сопоставь мои навыки и вакансии в STATE, найди разрывы и сгенерируй список Skill Gap.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Автоматический поиск гэпов</span>
            </button>
          </div>

          <div className="space-y-3">
            {state.missing_skills.map((g) => (
              <div key={g.id} className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-3.5 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-xs">{g.skillName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      g.priority === 'High' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {g.priority} Priority
                    </span>
                    <span className="text-[10px] text-slate-400">Срок: {g.targetDate}</span>
                  </div>
                  <div className="text-xs text-slate-300">{g.actionPlan}</div>
                </div>
                <button onClick={() => removeGap(g.id)} className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
            <input
              type="text"
              placeholder="Недостающий навык / Гэп"
              value={newGap.skillName || ''}
              onChange={(e) => setNewGap({ ...newGap, skillName: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="План действий / Инструмент"
              value={newGap.actionPlan || ''}
              onChange={(e) => setNewGap({ ...newGap, actionPlan: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Дедлайн / Месяц"
              value={newGap.targetDate || ''}
              onChange={(e) => setNewGap({ ...newGap, targetDate: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <button
              onClick={addGap}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Добавить гэп</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 8 EDITOR */}
      {currentStep === 8 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">SWOT-анализ карьерного профиля</h3>
            <button
              onClick={() => onAskAi("Сформируй детальную таблицу SWOT-анализа для моего карьерного профиля в формате Markdown.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Сгенерировать SWOT</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-slate-800/40 border border-emerald-500/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Strengths (Сильные стороны)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 mb-3">
                {state.swot.strengths.map((st, i) => (
                  <li key={i} className="flex justify-between items-center bg-slate-800/60 p-2 rounded">
                    <span>• {st}</span>
                    <button onClick={() => handleSwotRemove('strengths', i)} className="text-slate-500 hover:text-rose-400 cursor-pointer">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Добавить сильную сторону..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSwotAdd('strengths', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>

            {/* Weaknesses */}
            <div className="bg-slate-800/40 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Weaknesses (Слабые стороны)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 mb-3">
                {state.swot.weaknesses.map((w, i) => (
                  <li key={i} className="flex justify-between items-center bg-slate-800/60 p-2 rounded">
                    <span>• {w}</span>
                    <button onClick={() => handleSwotRemove('weaknesses', i)} className="text-slate-500 hover:text-rose-400 cursor-pointer">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Добавить слабую сторону..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSwotAdd('weaknesses', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>

            {/* Opportunities */}
            <div className="bg-slate-800/40 border border-indigo-500/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>Opportunities (Возможности)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 mb-3">
                {state.swot.opportunities.map((o, i) => (
                  <li key={i} className="flex justify-between items-center bg-slate-800/60 p-2 rounded">
                    <span>• {o}</span>
                    <button onClick={() => handleSwotRemove('opportunities', i)} className="text-slate-500 hover:text-rose-400 cursor-pointer">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Добавить возможность..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSwotAdd('opportunities', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>

            {/* Threats */}
            <div className="bg-slate-800/40 border border-rose-500/20 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Threats (Угрозы и риски)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 mb-3">
                {state.swot.threats.map((t, i) => (
                  <li key={i} className="flex justify-between items-center bg-slate-800/60 p-2 rounded">
                    <span>• {t}</span>
                    <button onClick={() => handleSwotRemove('threats', i)} className="text-slate-500 hover:text-rose-400 cursor-pointer">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="Добавить угрозу..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSwotAdd('threats', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 9 EDITOR */}
      {currentStep === 9 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Agile Дорожная карта (Roadmap & Sprints)</h3>
            <button
              onClick={() => onAskAi("Сгенерируй детальный Agile Roadmap по спринтам с четкими DoD (Definition of Done) и метриками.")}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Создать Agile Спринты</span>
            </button>
          </div>

          <div className="space-y-3">
            {state.roadmap.map((r) => (
              <div key={r.id} className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-3.5 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-indigo-300 text-xs">{r.sprint}</span>
                    <button
                      onClick={() => toggleRoadmapStatus(r.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                        r.status === 'Done' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {r.status}
                    </button>
                    <span className="text-[10px] text-slate-400">{r.category}</span>
                  </div>
                  <div className="text-xs text-white font-medium">{r.task}</div>
                  <div className="text-[11px] text-slate-400">Метрика: {r.metric}</div>
                </div>
                <button onClick={() => removeRoadmapItem(r.id)} className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
            <input
              type="text"
              placeholder="Спринт (например Спринт 1)"
              value={newRoadmapItem.sprint || ''}
              onChange={(e) => setNewRoadmapItem({ ...newRoadmapItem, sprint: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Задача / Эпик"
              value={newRoadmapItem.task || ''}
              onChange={(e) => setNewRoadmapItem({ ...newRoadmapItem, task: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Метрика готовности (Done)"
              value={newRoadmapItem.metric || ''}
              onChange={(e) => setNewRoadmapItem({ ...newRoadmapItem, metric: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
            />
            <button
              onClick={addRoadmapItem}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Добавить в бэклог</span>
            </button>
          </div>
        </div>
      )}

      {/* STEPS 10-13 QUICK AI HELPERS */}
      {currentStep >= 10 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Интерактивный помощник для Этапа #{currentStep}</h3>
            <button
              onClick={() => onAskAi(`Сгенерируй детальные рекомендации и структуры карьерных материалов для этапа #${currentStep}.`)}
              className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Сгенерировать материалы</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Используйте боковую панель для генерации шаблонов, скриптов откликов, ответов на собеседования и итогового PDF-отчета. Все результаты сохраняются в историю проекта!
          </p>
        </div>
      )}

    </div>
  );
};
