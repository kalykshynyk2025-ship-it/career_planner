import React, { useState } from 'react';
import { X, Copy, Check, FileText, Printer } from 'lucide-react';
import { CareerState } from '../types';
import ReactMarkdown from 'react-markdown';

interface NotionExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CareerState;
}

export const NotionExportModal: React.FC<NotionExportModalProps> = ({
  isOpen,
  onClose,
  state,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate complete Markdown document for Export
  const generateFullMarkdown = (): string => {
    return `# 🎯 CAREER PLANNER: Карьерная Стратегия & План Развития

> 💡 **Проектное состояние**: ${state.goals.primaryGoal}  
> 📍 **Текущий грейд**: ${state.goals.currentGrade} ➔ **Целевой грейд**: ${state.goals.targetGrade}  
> 💰 **Вилка**: ${state.goals.expectedSalary || '300 000 - 450 000 ₽'} | 🌍 **Рынок**: ${state.selected_market || 'РФ / Удаленка'}  
> 📅 **Сроки**: ${state.goals.timeline}  

---

## 1. 🎯 Инициализация и Карьерные Цели

| Параметр | Значение |
| :--- | :--- |
| **Главная цель** | ${state.goals.primaryGoal} |
| **Текущий грейд** | ${state.goals.currentGrade} |
| **Целевой грейд** | ${state.goals.targetGrade} |
| **Локация / Формат** | ${state.goals.targetLocation || 'Москва / Удаленка РФ'} |
| **Дедлайн** | ${state.goals.timeline} |

---

## 2. 🏢 Целевые Компании

| Компания | Локация | Стек | Заметки |
| :--- | :--- | :--- | :--- |
${state.selected_companies.map(c => `| **${c.name}** | ${c.country || 'РФ'} | ${c.techStack.join(', ')} | ${c.notes || '—'} |`).join('\n')}

---

## 3. 🔍 Требования Вакансий & ATS Анализ

${state.selected_vacancies.map(v => `
### 📌 ${v.title} (${v.company})
- **Локация & Вилка**: ${v.location} | ${v.salaryRange}
- **Ключевые навыки**: ${v.keySkills.map(s => `\`${s}\``).join(', ')}
${v.notes ? `- **Заметки**: ${v.notes}` : ''}
`).join('\n')}

---

## 4. 📋 Критерии Выбора Работодателя

| # | Критерий | Приоритет | Категория |
| :--- | :--- | :--- | :--- |
${(state.notion_criteria || []).map((c, i) => `| ${i + 1} | **${c.title}** | ${c.priority || 'Обязательно'} | ${c.category} |`).join('\n')}

---

## 5. 🛠️ Матрица Навыков (Skills Matrix)

| Навык | Категория | Уровень | Доказательство / Кейсы |
| :--- | :--- | :--- | :--- |
${state.skills.map(s => `| **${s.name}** | ${s.category} | ${s.level} | ${s.evidence} |`).join('\n')}

---

## 6. ⚠️ Анализ Разрывов (Skill Gap Analysis)

| Гэп / Пробел | Приоритет | Срок | План устранения |
| :--- | :--- | :--- | :--- |
${state.missing_skills.map(m => `| **${m.skillName}** | \`${m.priority}\` | ${m.targetDate} | ${m.actionPlan} |`).join('\n')}

---

## 7. 📊 SWOT-Анализ Карьерного Профиля

> 🟢 **Strengths (Сильные стороны)**:
${state.swot.strengths.map(s => `- [x] ${s}`).join('\n')}

> 🔴 **Weaknesses (Слабые стороны)**:
${state.swot.weaknesses.map(w => `- [ ] ${w}`).join('\n')}

> 🔵 **Opportunities (Возможности)**:
${state.swot.opportunities.map(o => `- [x] ${o}`).join('\n')}

> 🟡 **Threats (Угрозы и риски)**:
${state.swot.threats.map(t => `- [ ] ${t}`).join('\n')}

---

## 8. 🚀 Agile Дорожная Карта (Sprints & Backlog)

${state.roadmap.map(r => `- [${r.status === 'Done' ? 'x' : ' '}] **${r.sprint}**: ${r.task} *(${r.category})* — *Done metric: ${r.metric}*`).join('\n')}
`;
  };

  const fullMarkdown = generateFullMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl print:max-h-none print:shadow-none print:border-none print:w-full">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Экспорт карьерного отчета в PDF</h2>
              <p className="text-xs text-slate-400">Форматированный документ стратегии для печати и сохранения в PDF</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintPdf}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Печать / Сохранить в PDF</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Скопировано!' : 'Скопировать текст'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 text-slate-200 print:bg-white print:text-black">
          <div className="prose prose-invert print:prose prose-xs max-w-none space-y-3">
            <ReactMarkdown>{fullMarkdown}</ReactMarkdown>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 text-right print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
