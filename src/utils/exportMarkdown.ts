import { CareerState } from '../types';
import { getCurrencySymbol, formatSalaryWithCurrency } from './currency';

const DEV_CREDIT_MARKDOWN = `> **Разработчик системы**: КАЛЫК ШЫНЫК | WEB STUDIO & GAMIFICATION (https://kalyk-shynyk-web-studio.vercel.app/)`;

const translateCategory = (cat: string): string => {
  switch (cat) {
    case 'Compensation': return 'Компенсация и Доход';
    case 'Work Environment': return 'Условия и Формат работы';
    case 'Tech Stack': return 'Стек и Архитектура';
    case 'Growth & Team': return 'Команда и Профессиональный рост';
    case 'Benefits & Culture': return 'Бенефиты и Культура';
    default: return cat;
  }
};

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
${DEV_CREDIT_MARKDOWN}  
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

- **Основная Должность**: ${state.selected_position || 'Senior ML & DS Engineer / AI Architect'}
- **Запасная Роль**: ${state.alternate_position || 'Lead Data Scientist / RecSys Architect'}
- **Целевой Рынок**: ${state.selected_market || 'РФ / Global Remote'}
- **Ориентир по Доходу**: ${salaryFormatted} (${state.currency || 'RUB'})
- **Hard Skills Стек**: ${state.goals?.hardSkillsSummary || 'Python, PyTorch, LLM Fine-Tuning, MLOps, RAG, Distributed Training, Vector DBs, System Design'}
- **Soft Skills Стек**: ${state.goals?.softSkillsSummary || 'Technical Leadership, Agile/Scrum Mentorship, Stakeholder Management, Architecture Presentations'}

---

## 2. ДОСКА №1: КРИТЕРИИ ВЫБОРА КОМПАНИИ
*Система фильтров и требований к потенциальному работодателю (${state.notion_criteria?.length || 0} критериев)*

${(state.notion_criteria || []).length > 0 ? (state.notion_criteria || []).map((c, i) => `
### ${i + 1}. **${c.title}**
- **Приоритет**: ${c.priority === 'Must Have' || c.priority === 'Обязательно' ? 'Обязательно (Must Have)' : 'Желательно (Nice to Have)'}
- **Категория**: ${translateCategory(c.category)}
- **Подробное описание**: ${c.description || 'Параметры не указаны.'}
`).join('\n') : '_Критерии еще не добавлены._'}

---

## 3. ДОСКА №2: ТАРГЕТИРОВАННЫЙ СПИСОК КОМПАНИЙ
*Реестр целевых работодателей по уровням (${state.selected_companies?.length || 0} компаний)*

${(state.selected_companies || []).length > 0 ? (state.selected_companies || []).map((c, i) => `
### ${i + 1}. **${c.name}**
- **Уровень / Локация**: ${c.tier || c.country || 'РФ'}
- **Стек Технологий**: ${c.techStack.join(', ')}
- **Визовая поддержка**: ${c.sponsorship ? 'Да (Relocation package)' : 'Нет'}
- **Карьерная ссылка**: ${c.careerLink ? `[Перейти к вакансиям](${c.careerLink})` : 'Ссылка не указана'}
- **Заметки**: ${c.notes || 'Заметки отсутствуют.'}
`).join('\n') : '_Компания в целевой список еще не добавлены._'}

---

## 4. ДОСКА №3: ATS ТРЕКЕР ВАКАНСИЙ (VACANCY PIPELINE)
*Воронка откликов и профилей вакансий (${state.selected_vacancies?.length || 0} позиций)*

${(state.selected_vacancies || []).length > 0 ? (state.selected_vacancies || []).map((v, i) => `
### ${i + 1}. **${v.title}**
- **Компания**: ${v.company}
- **Локация & Формат**: ${v.location}
- **Предлагаемый доход**: ${formatSalaryWithCurrency(v.salaryRange, state.currency)}
- **Текущий Статус Воронки**: ${v.status || 'Saved'}
- **ATS Соответствие (Match Score)**: ${v.atsScore || 85}%
- **Прямая Ссылка**: ${v.link ? `[Открыть вакансию](${v.link})` : 'Ссылка не указана'}
`).join('\n') : '_Вакансии в ATS трекер еще не добавлены._'}

---

## 5. ТАБЛИЦА «АНАЛИЗ ВАКАНСИЙ» (ТРЕБОВАНИЯ, ОБЯЗАННОСТИ И СПОСОБЫ ДОСТИЖЕНИЯ)
*Детальный разбор 7+ желаемых вакансий, проверка владения и способы закрытия гэпов (${state.vacancy_analyses?.length || 0} пунктов)*

| Компания & Вакансия | Требование / Обязанность | Тип | Статус владения | Способ достижения | Заметки / План |
| :--- | :--- | :--- | :--- | :--- | :--- |
${(state.vacancy_analyses || []).length > 0 ? (state.vacancy_analyses || []).map(a => 
  `| **${a.company}**<br/>_${a.vacancyTitle}_ | ${a.item} | ${a.type || 'Требование'} | ${a.status === 'Владею' ? '🟢 Владею' : a.status === 'Частично' ? '🟡 Частично' : '🔴 Не владею'} | **${a.achievementMethod}** | ${a.notes || '—'} |`
).join('\n') : '| — | _Анализ вакансий еще не проведен_ | — | — | — | — |'}

---

## 6. ДОСКА №4: КАРЬЕРНЫЕ РАССЫЛКИ И ИСТОЧНИКИ ВАКАНСИЙ
*Автоматический мониторинг дайджестов (${state.newsletters?.length || 0} источников)*

${(state.newsletters || []).length > 0 ? (state.newsletters || []).map((n, i) => `
### ${i + 1}. **${n.title}**
- **Источник / Сообщество**: ${n.companyName}
- **Частота выпусков**: ${n.frequency}
- **Статус подписки**: ${n.subscribed ? '🟢 [Активна]' : '🟡 [Пауза]'}
- **Ссылка на дайджест**: ${n.link ? `[Перейти к каналу/рассылке](${n.link})` : 'Ссылка не указана'}
`).join('\n') : '_Источники рассылок еще не добавлены._'}

---

## 6. ДОСКА №5: SWOT-АНАЛИЗ ПРОФИЛЯ И ЭКСПЕРТНЫЕ ОТВЕТЫ
*Стратегическая оценка профиля (Факторов: ${swotTotalCount})*

### 1. Сильные стороны (Strengths)
${(state.swot?.strengths || []).map(s => `- ${s}`).join('\n')}

### 2. Слабые стороны (Weaknesses)
${(state.swot?.weaknesses || []).map(w => `- ${w}`).join('\n')}

### 3. Рыночные возможности (Opportunities)
${(state.swot?.opportunities || []).map(o => `- ${o}`).join('\n')}

### 4. Риски и барьеры (Threats)
${(state.swot?.threats || []).map(t => `- ${t}`).join('\n')}

${(swotAnswers.strengths?.length || swotAnswers.weaknesses?.length || swotAnswers.opportunities?.length || swotAnswers.threats?.length) ? `
### 5. Экспертные ответы на карьерные вопросы
${[
  ...(swotAnswers.strengths || []), 
  ...(swotAnswers.weaknesses || []), 
  ...(swotAnswers.opportunities || []), 
  ...(swotAnswers.threats || [])
].map(qa => `- **Вопрос**: ${qa.questionText}\n  > **Экспертный Ответ**: ${qa.answerText}`).join('\n\n')}
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

*Разработчик системы: КАЛЫК ШЫНЫК | WEB STUDIO & GAMIFICATION (https://kalyk-shynyk-web-studio.vercel.app/)*
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

export const generateCriteriaBoardMarkdown = (state: CareerState): string => {
  const criteria = state.notion_criteria || [];
  return `# ДОСКА №1: КРИТЕРИИ ВЫБОРА КОМПАНИИ
*Карьерная Стратегия: ${state.selected_position || 'Senior ML & DS Engineer'}*

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
${DEV_CREDIT_MARKDOWN}  
> **Всего критериев**: ${criteria.length}

---

${criteria.length > 0 ? criteria.map((c, i) => `
### ${i + 1}. **${c.title}**
- **Приоритет**: ${c.priority === 'Must Have' || c.priority === 'Обязательно' ? 'Обязательно (Must Have)' : 'Желательно (Nice to Have)'}
- **Категория**: ${translateCategory(c.category)}
- **Подробное описание**: ${c.description || 'Параметры не указаны.'}
`).join('\n\n---\n') : '_Критерии еще не добавлены._'}
`;
};

export const generateCompaniesBoardMarkdown = (state: CareerState): string => {
  const companies = state.selected_companies || [];
  return `# ДОСКА №2: ТАРГЕТИРОВАННЫЙ СПИСОК КОМПАНИЙ
*Карьерный Стек & Целевой Рынок: ${state.selected_market || 'РФ / Global Remote'}*

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
${DEV_CREDIT_MARKDOWN}  
> **Всего компаний**: ${companies.length}

---

${companies.length > 0 ? companies.map((c, i) => `
### ${i + 1}. **${c.name}**
- **Уровень / Страна**: ${c.tier || c.country || 'РФ'}
- **Стек Технологий**: ${c.techStack.join(', ')}
- **Визовая поддержка**: ${c.sponsorship ? 'Да (Relocation package)' : 'Нет'}
- **Карьерная ссылка**: ${c.careerLink ? `[Перейти к вакансиям](${c.careerLink})` : 'Ссылка не указана'}
- **Заметки**: ${c.notes || 'Заметки отсутствуют.'}
`).join('\n\n---\n') : '_Компании еще не добавлены._'}
`;
};

export const generateVacanciesBoardMarkdown = (state: CareerState): string => {
  const vacancies = state.selected_vacancies || [];
  return `# ДОСКА №3: ATS ТРЕКЕР ВАКАНСИЙ (VACANCY PIPELINE)
*Позиция: ${state.selected_position || 'Senior ML & DS Engineer'} | Доход: ${state.goals?.expectedSalary || '380 000 - 550 000 ₽'}*

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
${DEV_CREDIT_MARKDOWN}  
> **Всего вакансий в воронке**: ${vacancies.length}

---

${vacancies.length > 0 ? vacancies.map((v, i) => `
### ${i + 1}. **${v.title}**
- **Компания**: ${v.company}
- **Локация**: ${v.location}
- **Зарплатная вилка**: ${formatSalaryWithCurrency(v.salaryRange, state.currency)}
- **Статус Воронки**: ${v.status || 'Saved'}
- **ATS Match Score**: ${v.atsScore || 85}%
- **Ссылка**: ${v.link ? `[Открыть вакансию](${v.link})` : 'Ссылка не указана'}
`).join('\n\n---\n') : '_Вакансии еще не добавлены._'}
`;
};

export const generateNewslettersBoardMarkdown = (state: CareerState): string => {
  const newsletters = state.newsletters || [];
  return `# ДОСКА №4: КАРЬЕРНЫЕ РАССЫЛКИ И ДАЙДЖЕСТЫ
*Мониторинг позиций и источников*

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
${DEV_CREDIT_MARKDOWN}  
> **Всего источников**: ${newsletters.length}

---

${newsletters.length > 0 ? newsletters.map((n, i) => `
### ${i + 1}. **${n.title}**
- **Компания / Сообщество**: ${n.companyName}
- **Частота**: ${n.frequency}
- **Статус Подписки**: ${n.subscribed ? '🟢 [Активна]' : '🟡 [Пауза]'}
- **Ссылка**: ${n.link ? `[Дайджест](${n.link})` : 'Ссылка не указана'}
`).join('\n\n---\n') : '_Источники еще не добавлены._'}
`;
};

export const generateSwotBoardMarkdown = (state: CareerState): string => {
  const swot = state.swot || { strengths: [], weaknesses: [], opportunities: [], threats: [] };
  const swotAnswers = state.swot_answers || { strengths: [], weaknesses: [], opportunities: [], threats: [] };
  
  return `# ДОСКА №5: SWOT-АНАЛИЗ ПРОФИЛЯ И ЭКСПЕРТНЫЕ ОТВЕТЫ
*Оценка сильных и слабых сторон, возможностей и рисков*

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
${DEV_CREDIT_MARKDOWN}

---

### 1. Сильные стороны (Strengths)
${(swot.strengths || []).map(s => `- ${s}`).join('\n')}

### 2. Слабые стороны (Weaknesses)
${(swot.weaknesses || []).map(w => `- ${w}`).join('\n')}

### 3. Рыночные возможности (Opportunities)
${(swot.opportunities || []).map(o => `- ${o}`).join('\n')}

### 4. Риски и барьеры (Threats)
${(swot.threats || []).map(t => `- ${t}`).join('\n')}

${(swotAnswers.strengths?.length || swotAnswers.weaknesses?.length || swotAnswers.opportunities?.length || swotAnswers.threats?.length) ? `
---

### 5. Ответы на экспертные карьерные вопросы
${[
  ...(swotAnswers.strengths || []), 
  ...(swotAnswers.weaknesses || []), 
  ...(swotAnswers.opportunities || []), 
  ...(swotAnswers.threats || [])
].map(qa => `- **${qa.questionText}**\n  > **Ответ:** ${qa.answerText}`).join('\n\n')}
` : ''}
`;
};

export const generateAgileTrackMarkdown = (state: CareerState): string => {
  const sanitizedCompletedSteps = Array.from(new Set(state.completed_steps || []))
    .filter(s => typeof s === 'number' && s >= 1 && s <= 8)
    .sort((a, b) => a - b);
  const completedCount = sanitizedCompletedSteps.length;
  const progressPercent = Math.min(100, Math.round((completedCount / 8) * 100));
  const currentStepNum = Math.min(Math.max(state.current_step || 1, 1), 8);

  return `# СТАТУС AGILE-ТРЕКА (8 ЭТАПОВ)
*Карьерный спринт-поток*

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
${DEV_CREDIT_MARKDOWN}  
> **Общий прогресс**: ${completedCount} / 8 этапов (${progressPercent}%)  
> **Текущий активный шаг**: #${currentStepNum}  
> **Завершенные шаги**: ${sanitizedCompletedSteps.length > 0 ? sanitizedCompletedSteps.map(s => `#${s}`).join(', ') : 'Нет'}

---

### Результаты выходов по шагам (Outputs Log):
${Object.entries(state.stepOutputs || {}).length > 0 
  ? Object.entries(state.stepOutputs)
      .filter(([stepNum]) => Number(stepNum) >= 1 && Number(stepNum) <= 8)
      .map(([stepNum, text]) => `#### Этап #${stepNum}\n${text}`).join('\n\n')
  : '_Артефакты этапов обновлены в системе._'}
`;
};

export const generateVacancyAnalysisMarkdown = (state: CareerState): string => {
  const list = state.vacancy_analyses || [];
  return `# ТАБЛИЦА «АНАЛИЗ ВАКАНСИЙ»
*Анализ выписанных требований и обязанностей из 7+ желаемых вакансий*

> **Дата экспорта**: ${new Date().toLocaleDateString('ru-RU')}  
${DEV_CREDIT_MARKDOWN}  
> **Всего проанализировано пунктов**: ${list.length}

---

| Компания & Вакансия | Требование / Обязанность | Тип | Статус владения | Способ достижения | Заметки / План |
| :--- | :--- | :--- | :--- | :--- | :--- |
${list.length > 0 ? list.map(a => 
  `| **${a.company}**<br/>_${a.vacancyTitle}_ | ${a.item} | ${a.type || 'Требование'} | ${a.status === 'Владею' ? '🟢 Владею' : a.status === 'Частично' ? '🟡 Частично' : '🔴 Не владею'} | **${a.achievementMethod}** | ${a.notes || '—'} |`
).join('\n') : '| — | _Данные отсутствуют_ | — | — | — | — |'}
`;
};
