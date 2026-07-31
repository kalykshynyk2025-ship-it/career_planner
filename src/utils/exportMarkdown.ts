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

  return `# ИТОГОВЫЙ КАРЬЕРНЫЙ ДОКУМЕНТ И СТРАТЕГИЧЕСКИЙ ПЛАН
*Полная консолидация всех 13 досок и разделов системы ${state.appName || 'ML & DS Career OS'}*

---

> **Дата формирования**: ${new Date().toLocaleDateString('ru-RU')}  
> **Главная Карьерная Цель**: ${state.goals?.primaryGoal || 'Переход на позицию Senior ML & DS Engineer'}  
> **Грейд**: ${state.goals?.currentGrade || 'Middle+'} ➔ **${state.goals?.targetGrade || 'Senior ML / AI Architect'}**  
> **Зарплатная вилка**: ${salaryFormatted} | **Рынок**: ${state.selected_market || 'РФ / Global Remote'}  
> **Сроки реализации**: ${state.goals?.timeline || '3-6 месяцев'}  

---

## 1. Параметры Профиля и Таргетинга (Настройки и Навыки)

| Параметр профиля | Значение |
| :--- | :--- |
| **Основная Должность** | **${state.selected_position || 'Senior ML & DS Engineer / AI Architect'}** |
| **Запасная Должность** | **${state.alternate_position || 'Lead Data Scientist / RecSys Architect'}** |
| **Целевой Рынок** | ${state.selected_market || 'РФ / Global Remote'} |
| **Ориентир по Зарплате** | ${salaryFormatted} |
| **Валюта расчетов** | ${state.currency || 'RUB'} (${currencySymbol}) |
| **Общий стек Hard Skills** | ${state.goals?.hardSkillsSummary || 'Python, PyTorch, LLM Fine-Tuning, MLOps, RAG, Distributed Training, Vector DBs, System Design'} |
| **Общий стек Soft Skills** | ${state.goals?.softSkillsSummary || 'Technical Leadership, Agile/Scrum Mentorship, Stakeholder Management, Architecture Presentations'} |

---

## 2. Доска №1: Критерии Выбора Компании (Notion Criteria)

| # | Критерий | Статус | Приоритет | Категория | Описание |
| :--- | :--- | :---: | :--- | :--- | :--- |
${(state.notion_criteria || []).map((c, i) => 
  `| ${i + 1} | **${c.title}** | ${c.checked ? '[Включен]' : '[Исключен]'} | \`${c.priority || 'Обязательно'}\` | ${c.category} | ${c.description || '—'} |`
).join('\n')}

---

## 3. Доска №2: Таргетированный Список Компаний

| # | Компания | Локация | Стек технологий | Визовая поддержка | Ссылка | Заметки |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- |
${(state.selected_companies || []).map((c, i) => 
  `| ${i + 1} | **${c.name}** | ${c.country || 'РФ'} | ${c.techStack.join(', ')} | ${c.sponsorship ? 'Да' : 'Нет'} | ${c.careerLink ? `[Карьера](${c.careerLink})` : '—'} | ${c.notes || '—'} |`
).join('\n')}

---

## 4. Доска №3: ATS Трекер Вакансий (Vacancy Pipeline)

| # | Должность | Компания | Локация | Зарплата | Статус ATS | Совпадение | Ссылка |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :--- |
${(state.selected_vacancies || []).map((v, i) => 
  `| ${i + 1} | **${v.title}** | ${v.company} | ${v.location} | ${formatSalaryWithCurrency(v.salaryRange, state.currency)} | \`${v.status || 'Saved'}\` | **${v.atsScore || 85}%** | ${v.link ? `[Ссылка](${v.link})` : '—'} |`
).join('\n')}

---

## 5. Доска №4: Карьерные Рассылки и Источники Вакансий

| # | Канал / Рассылка | Компания | Частота | Статус Подписки | Ссылка |
| :--- | :--- | :--- | :--- | :---: | :--- |
${(state.newsletters || []).map((n, i) => 
  `| ${i + 1} | **${n.title}** | ${n.companyName} | ${n.frequency} | ${n.subscribed ? '[Активна]' : '[Пауза]'} | ${n.link ? `[Дайджест](${n.link})` : '—'} |`
).join('\n')}

---

## 6. Доска №5: Декомпозиция и Анализ Требований Вакансий

| # | Позиция / Компания | Требование / Обязанность | Тип | Статус владения | Способ достижения |
| :--- | :--- | :--- | :--- | :---: | :--- |
${(state.vacancy_analyses || []).map((a, i) => 
  `| ${i + 1} | **${a.vacancyTitle}** (${a.company}) | ${a.item} | \`${a.type}\` | **${a.status}** | ${a.achievementMethod} |`
).join('\n')}

---

## 7. Доска №6: Матрица Навыков (Skills Matrix & Gap Analysis)

### 7.1. Подтвержденный стек навыков
| Навык | Категория | Уровень владения | Доказательства / Опыт применения |
| :--- | :--- | :--- | :--- |
${(state.skills || []).map(s => `| **${s.name}** | ${s.category} | \`${s.level}\` | ${s.evidence} |`).join('\n')}

### 7.2. Пробелы в знаниях (Skill Gap Registry)
| Недостающий навык | Приоритет | Сложность | Целевая дата | План устранения |
| :--- | :---: | :---: | :--- | :--- |
${(state.missing_skills || []).map(m => `| **${m.skillName}** | \`${m.priority}\` | ${m.effort} | ${m.targetDate} | ${m.actionPlan} |`).join('\n')}

---

## 8. Доска №7: SWOT-Анализ Профиля и Экспертный Разбор

### Факторы SWOT-Матрицы (Всего элементов: ${swotTotalCount})

- **Strengths (Сильные стороны)**:
${(state.swot?.strengths || []).map(s => `  - ${s}`).join('\n')}

- **Weaknesses (Слабые стороны)**:
${(state.swot?.weaknesses || []).map(w => `  - ${w}`).join('\n')}

- **Opportunities (Рыночные возможности)**:
${(state.swot?.opportunities || []).map(o => `  - ${o}`).join('\n')}

- **Threats (Риски и барьеры)**:
${(state.swot?.threats || []).map(t => `  - ${t}`).join('\n')}

${swotAnswers.strengths?.length ? `
### Зафиксированные ответы на экспертные вопросы:
${[...(swotAnswers.strengths || []), ...(swotAnswers.weaknesses || []), ...(swotAnswers.opportunities || []), ...(swotAnswers.threats || [])].map(qa => `- **${qa.questionText}**: ${qa.answerText}`).join('\n')}
` : ''}

---

## 9. Доска №8: Agile Roadmap и Спринты (Q1-Q4)

| Спринт | Задача | Категория | Статус | Метрика готовности |
| :--- | :--- | :--- | :---: | :--- |
${(state.roadmap || []).map(r => 
  `| **${r.sprint}** | ${r.task} | ${r.category} | \`${r.status}\` | ${r.metric} |`
).join('\n')}

---

## 10. Статус Agile Трека (13 Этапов Методологии)

- **Текущий активный этап**: Шаг #${state.current_step}
- **Завершенные этапы**: ${state.completed_steps.map(s => `#${s}`).join(', ')} (${Math.round((state.completed_steps.length / 13) * 100)}% завершено)

---
*Документ сгенерирован автоматически системой ${state.appName || 'ML & DS Career OS'}. Все данные консолидированы в стандарте Executive Report.*
`;
};
