import React, { useState, useEffect } from 'react';
import { Table, Plus, Trash2, Sparkles, CheckCircle2, AlertCircle, XCircle, Search, Filter, Briefcase } from 'lucide-react';
import { CareerState, VacancyRequirementAnalysis } from '../types';

interface VacancyAnalysisViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onAskAi: (prompt: string) => void;
}

export const VacancyAnalysisView: React.FC<VacancyAnalysisViewProps> = ({
  state,
  onChangeState,
  onAskAi
}) => {
  const [vacancyTitle, setVacancyTitle] = useState('Senior ML Engineer');
  const [company, setCompany] = useState('Яндекс');
  const [itemText, setItemText] = useState('');
  const [type, setType] = useState<VacancyRequirementAnalysis['type']>('Требование');
  const [status, setStatus] = useState<VacancyRequirementAnalysis['status']>('Частично');
  const [method, setMethod] = useState<VacancyRequirementAnalysis['achievementMethod']>('Обучение');
  const [notes, setNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>('');

  const list = state.vacancy_analyses || [];

  // Automatically import from Board #3 if empty
  useEffect(() => {
    if ((!state.vacancy_analyses || state.vacancy_analyses.length === 0) && state.selected_vacancies && state.selected_vacancies.length > 0) {
      handleFillFromBoards();
    }
  }, [state.selected_vacancies]);

  const handleFillFromBoards = () => {
    const criteria = state.notion_criteria || [];
    const companies = state.selected_companies || [];
    const vacancies = state.selected_vacancies || [];

    const newAnalyses: VacancyRequirementAnalysis[] = [];

    // From Board #1 Criteria
    criteria.forEach((c, idx) => {
      newAnalyses.push({
        id: 'va_b1_' + idx + '_' + Date.now(),
        vacancyTitle: state.selected_position || 'Senior Fullstack Engineer',
        company: companies[0]?.name || 'Целевая компания',
        item: `Критерий выбора: ${c.title}`,
        type: 'Требование',
        status: c.priority === 'Must Have' ? 'Владею' : 'Частично',
        achievementMethod: c.priority === 'Must Have' ? 'Уже владею' : 'Обучение',
        notes: c.description
      });
    });

    // From Board #2 Companies
    companies.forEach((comp, idx) => {
      newAnalyses.push({
        id: 'va_b2_' + idx + '_' + Date.now(),
        vacancyTitle: state.selected_position || 'Senior Developer / DS',
        company: comp.name,
        item: `Требования по стеку: ${comp.techStack.join(', ')}`,
        type: 'Требование',
        status: 'Частично',
        achievementMethod: 'Фриланс-проект',
        notes: comp.notes || 'Целевая компания'
      });
    });

    // From Board #3 Vacancies
    vacancies.forEach((vac, idx) => {
      (vac.parsedRequirements || ['Разработка микросервисов', 'Проектирование БД']).forEach((req, rIdx) => {
        newAnalyses.push({
          id: 'va_b3_' + idx + '_' + rIdx + '_' + Date.now(),
          vacancyTitle: vac.title,
          company: vac.company,
          item: req,
          type: rIdx % 2 === 0 ? 'Требование' : 'Обязанность',
          status: rIdx % 3 === 0 ? 'Владею' : (rIdx % 3 === 1 ? 'Частично' : 'Не владею'),
          achievementMethod: rIdx % 3 === 0 ? 'Уже владею' : (rIdx % 3 === 1 ? 'Обучение' : 'Наставник'),
          notes: `Из вакансии ${vac.title} (${vac.salaryRange || '3 600 000 ₽ / год'})`
        });
      });
    });

    if (newAnalyses.length === 0) {
      newAnalyses.push({
        id: 'va_def_' + Date.now(),
        vacancyTitle: 'Senior ML / Software Engineer',
        company: 'Яндекс / Авито',
        item: 'Знание TypeScript / Python, системы хранения и микросервисы',
        type: 'Требование',
        status: 'Частично',
        achievementMethod: 'Обучение',
        notes: 'Заполнено из шаблона требований'
      });
    }

    onChangeState(prev => ({
      ...prev,
      vacancy_analyses: [...newAnalyses, ...(prev.vacancy_analyses || [])]
    }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemText.trim()) return;

    const newItem: VacancyRequirementAnalysis = {
      id: 'va_' + Date.now(),
      vacancyTitle: vacancyTitle.trim(),
      company: company.trim(),
      item: itemText.trim(),
      type,
      status,
      achievementMethod: status === 'Владею' ? 'Уже владею' : method,
      notes: notes.trim()
    };

    onChangeState(prev => ({
      ...prev,
      vacancy_analyses: [newItem, ...(prev.vacancy_analyses || [])]
    }));

    setItemText('');
    setNotes('');
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      vacancy_analyses: (prev.vacancy_analyses || []).filter(item => item.id !== id)
    }));
  };

  const handleStatusChange = (id: string, newStatus: VacancyRequirementAnalysis['status']) => {
    onChangeState(prev => ({
      ...prev,
      vacancy_analyses: (prev.vacancy_analyses || []).map(item => {
        if (item.id === id) {
          const newMethod = newStatus === 'Владею' ? 'Уже владею' : (item.achievementMethod === 'Уже владею' ? 'Обучение' : item.achievementMethod);
          return { ...item, status: newStatus, achievementMethod: newMethod };
        }
        return item;
      })
    }));
  };

  const handleMethodChange = (id: string, newMethod: VacancyRequirementAnalysis['achievementMethod']) => {
    onChangeState(prev => ({
      ...prev,
      vacancy_analyses: (prev.vacancy_analyses || []).map(item => 
        item.id === id ? { ...item, achievementMethod: newMethod } : item
      )
    }));
  };

  const filteredList = list.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const ownedCount = list.filter(i => i.status === 'Владею').length;
  const partialCount = list.filter(i => i.status === 'Частично').length;
  const missingCount = list.filter(i => i.status === 'Не владею').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <Table className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              Таблица «Анализ вакансий»
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Анализ выписанных требований и обязанностей: статус владения и конкретный способ достижения
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={handleFillFromBoards}
            className="flex-1 md:flex-none px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-semibold hover:opacity-90 flex items-center justify-center space-x-2 transition-all shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Заполнение из досок №1,2,3</span>
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить запись</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Всего пунктов</div>
            <div className="text-xl font-bold text-[var(--text-primary)] mt-1">{list.length}</div>
          </div>
          <Table className="w-5 h-5 text-gray-400" />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Владею (Да)</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{ownedCount}</div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Частично</div>
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">{partialCount}</div>
          </div>
          <AlertCircle className="w-5 h-5 text-amber-500" />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Не владею (Гэпы)</div>
            <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-1">{missingCount}</div>
          </div>
          <XCircle className="w-5 h-5 text-rose-500" />
        </div>
      </div>

      {/* Form Add */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-[var(--bg-card)] border border-emerald-500/30 rounded-2xl p-5 space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-[var(--color-border)]">
            <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center space-x-2">
              <Plus className="w-4 h-4 text-emerald-500" />
              <span>Выписать требование / обязанность из вакансии</span>
            </h3>

            {state.selected_vacancies && state.selected_vacancies.length > 0 && (
              <div className="flex items-center space-x-2 text-xs w-full sm:w-auto">
                <Briefcase className="w-4 h-4 text-indigo-500 shrink-0" />
                <select
                  value={selectedVacancyId}
                  onChange={(e) => {
                    const vacId = e.target.value;
                    setSelectedVacancyId(vacId);
                    const vac = state.selected_vacancies.find(v => v.id === vacId);
                    if (vac) {
                      setCompany(vac.company);
                      setVacancyTitle(vac.title);
                      if (vac.parsedRequirements && vac.parsedRequirements.length > 0) {
                        setItemText(vac.parsedRequirements[0]);
                      }
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-indigo-500/30 bg-[var(--bg-main)] text-[var(--text-primary)] text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Выбрать вакансию из Доски №3 --</option>
                  {state.selected_vacancies.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.company} — {v.title} ({v.salaryRange || 'Вилка по договоренности'})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Компания</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Яндекс / Авито / Т-Банк"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Название вакансии</label>
              <input
                type="text"
                value={vacancyTitle}
                onChange={e => setVacancyTitle(e.target.value)}
                placeholder="Senior Fullstack / Lead Frontend"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Тип пункта</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as VacancyRequirementAnalysis['type'])}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
              >
                <option value="Требование">Требование</option>
                <option value="Обязанность">Обязанность</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Текст требования или обязанности из вакансии</label>
            <input
              type="text"
              value={itemText}
              onChange={e => setItemText(e.target.value)}
              placeholder="Например: Проектирование микрофронтендов, настройка CI/CD, оптимизация Core Web Vitals..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Статус владения</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as VacancyRequirementAnalysis['status'])}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
              >
                <option value="Владею">Владею (Да)</option>
                <option value="Частично">Частично</option>
                <option value="Не владею">Не владею (Нет)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Как достичь (Способ достижения)</label>
              <select
                value={status === 'Владею' ? 'Уже владею' : method}
                disabled={status === 'Владею'}
                onChange={e => setMethod(e.target.value as VacancyRequirementAnalysis['achievementMethod'])}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
              >
                <option value="Уже владею">Уже владею</option>
                <option value="Обучение">Обучение / Курсы</option>
                <option value="Наставник">Наставник / Ментор</option>
                <option value="Опыт на текущем месте">Опыт на текущем месте</option>
                <option value="Стажировка">Стажировка</option>
                <option value="Фриланс-проект">Фриланс-проект / Пет-проект</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">План действий / Заметки</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Детали: прочитать книгу, пройти курс, написать проект..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs border border-[var(--color-border)] rounded-xl"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl"
            >
              Сохранить
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-[var(--color-border)] pb-3">
        <span className="text-xs text-[var(--text-secondary)] font-medium flex items-center space-x-1 mr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Фильтр:</span>
        </span>
        {[
          { id: 'all', label: 'Все записи' },
          { id: 'Владею', label: 'Владею (Да)' },
          { id: 'Частично', label: 'Частично' },
          { id: 'Не владею', label: 'Не владею (Гэпы)' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              filterStatus === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-secondary)] font-bold">
                <th className="p-4">Компания & Вакансия</th>
                <th className="p-4">Требование / Обязанность</th>
                <th className="p-4">Тип</th>
                <th className="p-4">Статус владения</th>
                <th className="p-4">Способ достижения</th>
                <th className="p-4">Заметки / Действие</th>
                <th className="p-4 text-right">Управление</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredList.map((row) => (
                <tr key={row.id} className="hover:bg-blue-500/5 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-[var(--text-primary)]">{row.company}</div>
                    <div className="text-[11px] text-[var(--text-secondary)]">{row.vacancyTitle}</div>
                  </td>

                  <td className="p-4 max-w-xs font-medium text-[var(--text-primary)] leading-relaxed">
                    {row.item}
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.type === 'Обязанность' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>
                      {row.type || 'Требование'}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={row.status}
                      onChange={e => handleStatusChange(row.id, e.target.value as VacancyRequirementAnalysis['status'])}
                      className={`px-2.5 py-1 text-xs font-bold rounded-xl border border-[var(--color-border)] ${
                        row.status === 'Владею' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        row.status === 'Частично' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      <option value="Владею">Владею (Да)</option>
                      <option value="Частично">Частично</option>
                      <option value="Не владею">Не владею (Нет)</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <select
                      value={row.achievementMethod}
                      onChange={e => handleMethodChange(row.id, e.target.value as VacancyRequirementAnalysis['achievementMethod'])}
                      className="px-2 py-1 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] font-medium"
                    >
                      <option value="Уже владею">Уже владею</option>
                      <option value="Обучение">Обучение</option>
                      <option value="Наставник">Наставник</option>
                      <option value="Опыт на текущем месте">Опыт на текущем месте</option>
                      <option value="Стажировка">Стажировка</option>
                      <option value="Фриланс-проект">Фриланс-проект</option>
                    </select>
                  </td>

                  <td className="p-4 text-[11px] text-[var(--text-secondary)]">
                    {row.notes || '—'}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
