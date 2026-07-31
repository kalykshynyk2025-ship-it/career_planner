import { CareerState } from '../types';
import { getCurrencySymbol, formatSalaryWithCurrency } from './currency';

export const generateComprehensiveCareerMarkdown = (state: CareerState): string => {
  const currencySymbol = getCurrencySymbol(state.currency || 'RUB');
  const salaryFormatted = formatSalaryWithCurrency(
    state.goals?.expectedSalary || '380 000 - 550 000 ₽ / мес', 
    state.currency || 'RUB'
  );

  const swotAnswers = state.swot_answers || { strengths: [], weaknesses: [], opportunities: [], threats: [] };
  const swotTotalCount = (state.swot?.strengths?.length || 0) + 
                         (state.swot?.weaknesses?.length || 0) + 
                         (state.swot?.opportunities?.length || 0) + 
                         (state.swot?.threats?.length || 0);

  const sanitizedCompletedSteps = Array.from(new Set(state.completed_steps || []))
    .filter(s => typeof s === 'number' && s >= 1 && s <= 8)
    .sort((a, b) => a - b);
  const completedCount = sanitizedCompletedSteps.length;
  const progressPercent = Math.min(100, Math.round((completedCount / 8) * 100));
  const currentStepNum = Math.min(Math.max(state.current_step || 1, 1), 8);

  return `# ЕДИНЫЙ КАРЬЕРНЫЙ ДОКУМЕНТ И ИТОГОВАЯ СТРАТЕГИЯ
*Консолидированный отчет по всем заполненным доскам и артефактам системы ${state.appName || 'ML & DS Career OS'}*

---

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
> **Основная Карьерная Цель**: ${state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer'}  
> **Целевая Роль**: ${state.selected_position || 'Senior ML & DS Engineer'} (Резерв: ${state.alternate_position || 'Lead Data Scientist'})  
> **Грейд**: ${state.goals?.currentGrade || 'Middle+'} ➔ **${state.goals?.targetGrade || 'Senior ML / AI Architect'}**  
> **Финансовая Вилка**: ${salaryFormatted} (${state.currency || 'RUB'})  
> **Рынок & Формат**: ${state.selected_market || 'РФ / Global Remote'}  
> **Дедлайн поиска**: ${state.goals?.timeline || '3-6 месяцев'}  
> **Общий Прогресс Agile-Трека**: ${completedCount} / 8 этапов (${progressPercent}%)  

---

## 1. ПАРАМЕТРЫ ПРОФИЛЯ, ТАРГЕТИНГА И СТЕК
*Базовые ориентиры, грейды и сопоставление навыков*

| Параметр Профиля | Значение |
| :--- | :--- |
| **Основная Должность** | **${state.selected_position || 'Senior ML & DS Engineer / AI Architect'}** |
| **Запасная Роль** | ${state.alternate_position || 'Lead Data Scientist / RecSys Architect'} |
| **Целевой Рынок** | ${state.selected_market || 'РФ / Global Remote'} |
| **Ориентир по Доходу** | **${salaryFormatted}** |
| **Валюта** | ${state.currency || 'RUB'} (${currencySymbol}) |
| **Hard Skills Стек** | ${state.goals?.hardSkillsSummary || 'Python, PyTorch, LLM Fine-Tuning, MLOps, RAG, Distributed Training, Vector DBs, System Design'} |
| **Soft Skills Стек** | ${state.goals?.softSkillsSummary || 'Technical Leadership, Agile/Scrum Mentorship, Stakeholder Management, Architecture Presentations'} |

---

## 2. ДОСКА №1: КРИТЕРИИ ВЫБОРА КОМПАНИИ (NOTION CRITERIA)
*Система фильтров и требований к потенциальному работодателю (${state.notion_criteria?.length || 0} критериев)*

| # | Критерий | Статус | Приоритет | Категория | Подробности |
| :--- | :--- | :---: | :--- | :--- | :--- |
${(state.notion_criteria || []).map((c, i) => 
  `| ${i + 1} | **${c.title}** | ${c.checked ? '[Включен]' : '[Исключен]'} | \`${c.priority || 'Обязательно'}\` | ${c.category} | ${c.description || '—'} |`
).join('\n')}

---

## 3. ДОСКА №2: ТАРГЕТИРОВАННЫЙ СПИСОК КОМПАНИЙ
*Реестр целевых работодателей по уровням (${state.selected_companies?.length || 0} компаний)*

| # | Компания | Уровень / Рынок | Стек Технологий | Визовая поддержка | Карьерная ссылка | Заметки |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- |
${(state.selected_companies || []).map((c, i) => 
  `| ${i + 1} | **${c.name}** | ${c.tier || c.country || 'РФ'} | ${c.techStack.join(', ')} | ${c.sponsorship ? 'Да' : 'Нет'} | ${c.careerLink ? `[Ссылка](${c.careerLink})` : '—'} | ${c.notes || '—'} |`
).join('\n')}

---

## 4. ДОСКА №3: ATS ТРЕКЕР ВАКАНСИЙ (VACANCY PIPELINE)
*Воронка откликов и профилей вакансий (${state.selected_vacancies?.length || 0} позиций)*

| # | Название Вакансии | Компания | Локация | Зарплатная вилка | Статус Воронки | ATS Match | Ссылка |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
${(state.selected_vacancies || []).map((v, i) => 
  `| ${i + 1} | **${v.title}** | ${v.company} | ${v.location} | ${formatSalaryWithCurrency(v.salaryRange, state.currency)} | \`${v.status || 'Saved'}\` | **${v.atsScore || 85}%** | ${v.link ? `[Ссылка](${v.link})` : '—'} |`
).join('\n')}

---

## 5. ДОСКА №4: КАРЬЕРНЫЕ РАССЫЛКИ И ИСТОЧНИКИ ВАКАНСИЙ
*Автоматический мониторинг дайджестов (${state.newsletters?.length || 0} источников)*

| # | Источник / Канал | Компания | Частота | Статус | Ссылка |
| :--- | :--- | :--- | :--- | :---: | :--- |
${(state.newsletters || []).map((n, i) => 
  `| ${i + 1} | **${n.title}** | ${n.companyName} | ${n.frequency} | ${n.subscribed ? '[Активна]' : '[Пауза]'} | ${n.link ? `[Дайджест](${n.link})` : '—'} |`
).join('\n')}

---

## 6. ДОСКА №5: SWOT-АНАЛИЗ ПРОФИЛЯ И ЭКСПЕРТНЫЕ ОТВЕТЫ
*Стратегическая оценка профиля (Факторов: ${swotTotalCount})*

- **Strengths (Сильные стороны)**:
${(state.swot?.strengths || []).map(s => `  - ${s}`).join('\n')}

- **Weaknesses (Слабые стороны)**:
${(state.swot?.weaknesses || []).map(w => `  - ${w}`).join('\n')}

- **Opportunities (Рыночные возможности)**:
${(state.swot?.opportunities || []).map(o => `  - ${o}`).join('\n')}

- **Threats (Риски и барьеры)**:
${(state.swot?.threats || []).map(t => `  - ${t}`).join('\n')}

${(swotAnswers.strengths?.length || swotAnswers.weaknesses?.length || swotAnswers.opportunities?.length || swotAnswers.threats?.length) ? `
### Экспертные ответы на стратегические вопросы:
${[
  ...(swotAnswers.strengths || []), 
  ...(swotAnswers.weaknesses || []), 
  ...(swotAnswers.opportunities || []), 
  ...(swotAnswers.threats || [])
].map(qa => `- **${qa.questionText}**\n  > *Ответ:* ${qa.answerText}`).join('\n\n')}
` : ''}

---

## 7. СТАТУС КОНСОЛИДАЦИИ AGILE-ТРЕКА (8 ЭТАПОВ)

- **Текущий активный этап**: Шаг #${currentStepNum}
- **Завершенные этапы**: ${sanitizedCompletedSteps.length > 0 ? sanitizedCompletedSteps.map(s => `#${s}`).join(', ') : 'Нет'} (${progressPercent}% завершено)

### Результаты прохождения этапов (Outputs Log):
${Object.entries(state.stepOutputs || {}).length > 0 
  ? Object.entries(state.stepOutputs)
      .filter(([stepNum]) => Number(stepNum) >= 1 && Number(stepNum) <= 8)
      .map(([stepNum, text]) => `#### Этап #${stepNum}\n${text}`).join('\n\n')
  : '_Все 8 этапов инициализированы и готовы к выгрузке._'}

---

## 8. ИТОГОВЫЙ ПЛАН И РЕКОМЕНДАЦИИ
- Все данные обновлены в реальном времени на основе текущего состояния заполненных досок.
- Документ готов к выгрузке в PDF, экспорт в Notion или отправке ментору.
*Документ сгенерирован автоматически системой ${state.appName || 'ML & DS Career OS'}.*
`;
};

export const downloadMarkdownFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

