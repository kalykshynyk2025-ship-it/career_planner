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

  const completedCount = state.completed_steps?.length || 0;
  const progressPercent = Math.round((completedCount / 13) * 100);

  return `# ЕДИНЫЙ КАРЬЕРНЫЙ ДОКУМЕНТ И ИТОГОВАЯ СТРАТЕГИЯ
*Консолидированный отчет по всем 13 доскам и артефактам системы ${state.appName || 'ML & DS Career OS'}*

---

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
> **Основная Карьерная Цель**: ${state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer'}  
> **Целевая Роль**: ${state.selected_position || 'Senior ML & DS Engineer'} (Резерв: ${state.alternate_position || 'Lead Data Scientist'})  
> **Грейд**: ${state.goals?.currentGrade || 'Middle+'} ➔ **${state.goals?.targetGrade || 'Senior ML / AI Architect'}**  
> **Финансовая Вилка**: ${salaryFormatted} (${state.currency || 'RUB'})  
> **Рынок & Формат**: ${state.selected_market || 'РФ / Global Remote'}  
> **Дедлайн поиска**: ${state.goals?.timeline || '3-6 месяцев'}  
> **Общий Прогресс Agile-Трека**: ${completedCount} / 13 этапов (${progressPercent}%)  

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

## 6. ДОСКА №5: ДЕКОМПОЗИЦИЯ И АНАЛИЗ ТРЕБОВАНИЙ ВАКАНСИЙ
*Разбор функциональных обязанностей и требований (${state.vacancy_analyses?.length || 0} элементов)*

| # | Вакансия / Компания | Требование или Обязанность | Тип | Статус Владения | План Достижения |
| :--- | :--- | :--- | :--- | :---: | :--- |
${(state.vacancy_analyses || []).map((a, i) => 
  `| ${i + 1} | **${a.vacancyTitle}** (${a.company}) | ${a.item} | \`${a.type}\` | **${a.status}** | ${a.achievementMethod} |`
).join('\n')}

---

## 7. ДОСКА №6: МАТРИЦА НАВЫКОВ И SKILL GAP АНАЛИЗ

### 7.1. Подтвержденный стек навыков (${state.skills?.length || 0} навыков)
| Навык | Категория | Уровень | Доказательства / Опыт применения |
| :--- | :--- | :--- | :--- |
${(state.skills || []).map(s => `| **${s.name}** | ${s.category} | \`${s.level}\` | ${s.evidence} |`).join('\n')}

### 7.2. Реестр пробелов (Skill Gap Registry, ${state.missing_skills?.length || 0} пробелов)
| Пробел в знаниях | Приоритет | Сложность | Дедлайн | План Устранения |
| :--- | :---: | :---: | :--- | :--- |
${(state.missing_skills || []).map(m => `| **${m.skillName}** | \`${m.priority}\` | ${m.effort} | ${m.targetDate} | ${m.actionPlan} |`).join('\n')}

---

## 8. ДОСКА №7: SWOT-АНАЛИЗ ПРОФИЛЯ И ЭКСПЕРТНЫЕ ОТВЕТЫ

### 8.1. Факторы SWOT-Матрицы (Элементов: ${swotTotalCount})

- **Strengths (Сильные стороны)**:
${(state.swot?.strengths || []).map(s => `  - ${s}`).join('\n')}

- **Weaknesses (Слабые стороны)**:
${(state.swot?.weaknesses || []).map(w => `  - ${w}`).join('\n')}

- **Opportunities (Рыночные возможности)**:
${(state.swot?.opportunities || []).map(o => `  - ${o}`).join('\n')}

- **Threats (Риски и барьеры)**:
${(state.swot?.threats || []).map(t => `  - ${t}`).join('\n')}

${(swotAnswers.strengths?.length || swotAnswers.weaknesses?.length || swotAnswers.opportunities?.length || swotAnswers.threats?.length) ? `
### 8.2. Экспертные ответы на стратегические вопросы:
${[
  ...(swotAnswers.strengths || []), 
  ...(swotAnswers.weaknesses || []), 
  ...(swotAnswers.opportunities || []), 
  ...(swotAnswers.threats || [])
].map(qa => `- **${qa.questionText}**\n  > *Ответ:* ${qa.answerText}`).join('\n\n')}
` : ''}

---

## 9. ДОСКА №8: AGILE ROADMAP И СПРИНТЫ (Q1-Q4)
*Поквартальный план выполнения задач (${state.roadmap?.length || 0} задач)*

| Спринт | Задача | Категория | Статус | Метрика Готовности (Done Criteria) |
| :--- | :--- | :--- | :---: | :--- |
${(state.roadmap || []).map(r => 
  `| **${r.sprint}** | ${r.task} | ${r.category} | \`${r.status}\` | ${r.metric} |`
).join('\n')}

---

## 10. СТАТУС КОНСОЛИДАЦИИ AGILE-ТРЕКА (13 ЭТАПОВ)

- **Текущий активный этап**: Шаг #${state.current_step}
- **Завершенные этапы**: ${state.completed_steps.map(s => `#${s}`).join(', ')} (${progressPercent}% завершено)

### Результаты прохождения этапов (Outputs Log):
${Object.entries(state.stepOutputs || {}).length > 0 
  ? Object.entries(state.stepOutputs).map(([stepNum, text]) => `#### Этап #${stepNum}\n${text}`).join('\n\n')
  : '_Все 13 этапов инициализированы и готовы к выгрузке._'}

---

## 11. ИТОГОВЫЙ ПЛАН И РЕКОМЕНДАЦИИ
- Все данные обновлены в реальном времени на основе текущего состояния досок.
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

