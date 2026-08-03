import React, { useState, useEffect } from 'react';
import { Table, Plus, Trash2, Sparkles, CheckCircle2, AlertCircle, XCircle, Filter, Briefcase, Download, Copy, Check, GraduationCap, UserCheck, Building2, Rocket, Code2 } from 'lucide-react';
import { CareerState, VacancyRequirementAnalysis } from '../types';
import { ExportBoardButton } from './ExportBoardButton';

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
  const [vacancyTitle, setVacancyTitle] = useState('Senior Fullstack Engineer');
  const [company, setCompany] = useState('Авито');
  const [itemText, setItemText] = useState('');
  const [type, setType] = useState<VacancyRequirementAnalysis['type']>('Требование');
  const [status, setStatus] = useState<VacancyRequirementAnalysis['status']>('Частично');
  const [method, setMethod] = useState<VacancyRequirementAnalysis['achievementMethod']>('Обучение');
  const [notes, setNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>('');
  const [copiedTsv, setCopiedTsv] = useState(false);

  const list = state.vacancy_analyses || [];

  // Automatically ensure 7 vacancies analysis if empty
  useEffect(() => {
    if (!state.vacancy_analyses || state.vacancy_analyses.length === 0) {
      handleFill7Vacancies();
    }
  }, []);

  const handleFill7Vacancies = () => {
    const defaultAnalyses: VacancyRequirementAnalysis[] = [
      /* Вакансия 1: Авито */
      {
        id: "va_avito_1",
        vacancyTitle: "Senior Fullstack Engineer (React / Node.js)",
        company: "Авито",
        item: "Уверенное владение React 18, TypeScript, Next.js и SSR",
        type: "Требование",
        status: "Владею",
        achievementMethod: "Уже владею",
        notes: "4+ года разработки на продуктовых React/TS проектах"
      },
      {
        id: "va_avito_2",
        vacancyTitle: "Senior Fullstack Engineer (React / Node.js)",
        company: "Авито",
        item: "Проектирование архитектуры микрофронтендов и System Design",
        type: "Требование",
        status: "Частично",
        achievementMethod: "Наставник",
        notes: "Проработка паттернов шардинга с ментором по архитектуре"
      },
      {
        id: "va_avito_3",
        vacancyTitle: "Senior Fullstack Engineer (React / Node.js)",
        company: "Авито",
        item: "Проведение код-ревью, кросс-ревью архитектурных решений и митапов",
        type: "Обязанность",
        status: "Владею",
        achievementMethod: "Уже владею",
        notes: "Опыт проведения ревью на текущем месте работы"
      },

      /* Вакансия 2: Яндекс */
      {
        id: "va_yandex_1",
        vacancyTitle: "Lead Frontend Engineer (Web Platform)",
        company: "Яндекс",
        item: "Оптимизация Core Web Vitals, профилирование производительности и память",
        type: "Требование",
        status: "Частично",
        achievementMethod: "Обучение",
        notes: "Пройти курс по углубленному браузерному перформансу Chrome DevTools"
      },
      {
        id: "va_yandex_2",
        vacancyTitle: "Lead Frontend Engineer (Web Platform)",
        company: "Яндекс",
        item: "Развитие общекорпоративной дизайн-системы и UI-кита компонентов",
        type: "Обязанность",
        status: "Владею",
        achievementMethod: "Уже владею",
        notes: "Создавал библиотеку компонентов на Storybook и Tailwind"
      },

      /* Вакансия 3: Т-Банк */
      {
        id: "va_tbank_1",
        vacancyTitle: "Senior React Developer (Core Banking UI)",
        company: "Т-Банк",
        item: "Соблюдение правил безопасной веб-разработки OWASP Top 10",
        type: "Требование",
        status: "Не владею",
        achievementMethod: "Обучение",
        notes: "Пройти сертифицированный воркшоп по веб-безопасности и XSS/CSRF защите"
      },
      {
        id: "va_tbank_2",
        vacancyTitle: "Senior React Developer (Core Banking UI)",
        company: "Т-Банк",
        item: "Проектирование сложного состояния с асинхронными потоками (RxJS / Zustand)",
        type: "Обязанность",
        status: "Владею",
        achievementMethod: "Уже владею",
        notes: "Уверенный практический опыт с Zustand и Redux Toolkit"
      },

      /* Вакансия 4: Ozon */
      {
        id: "va_ozon_1",
        vacancyTitle: "Senior Frontend Engineer (E-commerce Core)",
        company: "Ozon",
        item: "Опыт работы с GraphQL / REST API и сгенерированными типами клиентов",
        type: "Требование",
        status: "Владею",
        achievementMethod: "Уже владею",
        notes: "Интегрировал GraphQL Apollo Client на нескольких проектах"
      },
      {
        id: "va_ozon_2",
        vacancyTitle: "Senior Frontend Engineer (E-commerce Core)",
        company: "Ozon",
        item: "Настройка Module Federation (Webpack/Vite) для независимых релизов",
        type: "Обязанность",
        status: "Не владею",
        achievementMethod: "Фриланс-проект",
        notes: "Сделать тестовый пет-проект с двумя микрофронтендами через Vite Module Federation"
      },

      /* Вакансия 5: ВК (VK) */
      {
        id: "va_vk_1",
        vacancyTitle: "Senior Web Application Engineer (VK Video)",
        company: "ВК (VK)",
        item: "Разработка высоконагруженных веб-плееров, WebSockets и WebRTC соединения",
        type: "Требование",
        status: "Не владею",
        achievementMethod: "Стажировка",
        notes: "Принять участие в хакатоне или внутреннем пилоте по WebSockets & видео"
      },
      {
        id: "va_vk_2",
        vacancyTitle: "Senior Web Application Engineer (VK Video)",
        company: "ВК (VK)",
        item: "Кроссбраузерная и кроссплатформенная верстка с поддержкой Touch & TV",
        type: "Обязанность",
        status: "Частично",
        achievementMethod: "Опыт на текущем месте",
        notes: "Взять на текущей работе задачи по адаптации под планшеты и мобильные web"
      },

      /* Вакансия 6: Альфа-Банк */
      {
        id: "va_alfa_1",
        vacancyTitle: "Tech Lead Fullstack (Fintech UI & BFF)",
        company: "Альфа-Банк",
        item: "Проектирование Node.js BFF (Backend For Frontend) сервисов и PostgreSQL",
        type: "Требование",
        status: "Частично",
        achievementMethod: "Опыт на текущем месте",
        notes: "Инициировать внедрение BFF слоя в текущем продуктовом спринте"
      },
      {
        id: "va_alfa_2",
        vacancyTitle: "Tech Lead Fullstack (Fintech UI & BFF)",
        company: "Альфа-Банк",
        item: "Управление продуктовой командой разработки от 5 человек, проведение 1:1",
        type: "Обязанность",
        status: "Частично",
        achievementMethod: "Наставник",
        notes: "Регулярные сессии с ментором-тимлидом по soft skills и менеджменту"
      },

      /* Вакансия 7: Лаборатория Касперского */
      {
        id: "va_kaspersky_1",
        vacancyTitle: "Senior Frontend Architect (Security Products)",
        company: "Лаборатория Касперского",
        item: "Написание строго типизированных библиотек, плагинов и внешних SDK",
        type: "Требование",
        status: "Владею",
        achievementMethod: "Уже владею",
        notes: "Опубликовал несколько npm пакетов со строгими типами TypeScript"
      },
      {
        id: "va_kaspersky_2",
        vacancyTitle: "Senior Frontend Architect (Security Products)",
        company: "Лаборатория Касперского",
        item: "Внедрение автоматических статических анализаторов и контролей безопасности",
        type: "Обязанность",
        status: "Не владею",
        achievementMethod: "Обучение",
        notes: "Изучить интеграцию SonarQube и Snyk в CI/CD пайплайн"
      }
    ];

    onChangeState(prev => ({
      ...prev,
      vacancy_analyses: defaultAnalyses
    }));
  };

  const handleExportCsv = () => {
    const headers = ['Компания', 'Название вакансии', 'Тип', 'Требование / Обязанность', 'Статус владения', 'Способ достижения', 'Заметки / План'];
    const rows = list.map(item => [
      `"${(item.company || '').replace(/"/g, '""')}"`,
      `"${(item.vacancyTitle || '').replace(/"/g, '""')}"`,
      `"${(item.type || 'Требование').replace(/"/g, '""')}"`,
      `"${(item.item || '').replace(/"/g, '""')}"`,
      `"${(item.status || '').replace(/"/g, '""')}"`,
      `"${(item.achievementMethod || '').replace(/"/g, '""')}"`,
      `"${(item.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Vacancy_Analysis_Google_Sheets_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyTsv = () => {
    const headers = ['Компания', 'Название вакансии', 'Тип', 'Требование / Обязанность', 'Статус владения', 'Способ достижения', 'Заметки / План'];
    const rows = list.map(item => [
      item.company || '',
      item.vacancyTitle || '',
      item.type || 'Требование',
      item.item || '',
      item.status || '',
      item.achievementMethod || '',
      item.notes || ''
    ]);

    const tsvText = [headers.join('\t'), ...rows.map(e => e.join('\t'))].join('\n');
    navigator.clipboard.writeText(tsvText);
    setCopiedTsv(true);
    setTimeout(() => setCopiedTsv(false), 2500);
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

  const uniqueCompanies = Array.from(new Set(list.map(i => i.company))).filter(Boolean);

  const filteredList = list.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterCompany !== 'all' && item.company !== filterCompany) return false;
    return true;
  });

  const ownedCount = list.filter(i => i.status === 'Владею').length;
  const partialCount = list.filter(i => i.status === 'Частично').length;
  const missingCount = list.filter(i => i.status === 'Не владею').length;

  const getMethodBadge = (m: VacancyRequirementAnalysis['achievementMethod']) => {
    switch (m) {
      case 'Обучение':
        return <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"><GraduationCap className="w-3 h-3 mr-0.5" />Обучение</span>;
      case 'Наставник':
        return <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"><UserCheck className="w-3 h-3 mr-0.5" />Наставник</span>;
      case 'Опыт на текущем месте':
        return <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"><Building2 className="w-3 h-3 mr-0.5" />Опыт на работе</span>;
      case 'Стажировка':
        return <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"><Rocket className="w-3 h-3 mr-0.5" />Стажировка</span>;
      case 'Фриланс-проект':
        return <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"><Code2 className="w-3 h-3 mr-0.5" />Фриланс / Пет</span>;
      case 'Уже владею':
      default:
        return <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20"><CheckCircle2 className="w-3 h-3 mr-0.5" />Уже владею</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <Table className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">
                Таблица «Анализ вакансий»
              </h1>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                7+ Вакансий
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Системный разбор требований и обязанностей из 7 желаемых вакансий, проверка владения и способы достижения гэпов.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
          <button
            onClick={handleCopyTsv}
            className="px-3 py-1.5 bg-[var(--bg-main)] border border-[var(--color-border)] hover:bg-[var(--color-border)]/20 text-[var(--text-primary)] rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
            title="Скопировать таблицу для вставки в Google Sheets (Ctrl+V)"
          >
            {copiedTsv ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-blue-500" />}
            <span>{copiedTsv ? 'Скопировано!' : 'Скопировать для Google Таблиц'}</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer"
            title="Скачать .csv файл для Google Таблиц или MS Excel"
          >
            <Download className="w-4 h-4" />
            <span>Скачать CSV</span>
          </button>

          <ExportBoardButton
            state={state}
            boardType="vacancy_analysis"
            boardTitle="Анализ вакансий"
            variant="primary"
          />

          <button
            onClick={handleFill7Vacancies}
            className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl text-xs font-semibold hover:opacity-90 flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
            title="Заполнить полный разбор по 7 целевым компаниям"
          >
            <Sparkles className="w-4 h-4" />
            <span>Заполнить 7 вакансий</span>
          </button>

          <button
            onClick={() => setIsAdding(true)}
            className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Проанализировано пунктов</div>
            <div className="text-xl font-bold text-[var(--text-primary)] mt-1">{list.length}</div>
            <div className="text-[10px] text-blue-500 font-medium mt-0.5">7 желаемых вакансий</div>
          </div>
          <Table className="w-5 h-5 text-gray-400" />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Владею (Да)</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{ownedCount}</div>
            <div className="text-[10px] text-emerald-500 font-medium mt-0.5">
              {list.length > 0 ? Math.round((ownedCount / list.length) * 100) : 0}% покрытия
            </div>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Частично</div>
            <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">{partialCount}</div>
            <div className="text-[10px] text-amber-500 font-medium mt-0.5">Требуют доработки</div>
          </div>
          <AlertCircle className="w-5 h-5 text-amber-500" />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[var(--text-secondary)]">Не владею (Гэпы)</div>
            <div className="text-xl font-bold text-rose-600 dark:text-rose-400 mt-1">{missingCount}</div>
            <div className="text-[10px] text-rose-500 font-medium mt-0.5">План закрытия задан</div>
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
              <span>Выписать требование или обязанность из вакансии</span>
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
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-lg border border-indigo-500/30 bg-[var(--bg-main)] text-[var(--text-primary)] text-xs font-medium focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Выбрать вакансию из Доски №3 --</option>
                  {state.selected_vacancies.map(v => (
                    <option key={v.id} value={v.id}>
                      {v.company} — {v.title}
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
                placeholder="Яндекс / Авито / Т-Банк / Ozon"
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
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] font-semibold"
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
              placeholder="Например: Проектирование микрофронтендов, опыт работы с WebSockets, участие в архитектурных комитетах..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Статус владения навыком/требованием</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as VacancyRequirementAnalysis['status'])}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] font-bold"
              >
                <option value="Владею">🟢 Владею (Да)</option>
                <option value="Частично">🟡 Частично</option>
                <option value="Не владею">🔴 Не владею (Нет)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Как ты сможешь его достичь (Способ достижения)</label>
              <select
                value={status === 'Владею' ? 'Уже владею' : method}
                disabled={status === 'Владею'}
                onChange={e => setMethod(e.target.value as VacancyRequirementAnalysis['achievementMethod'])}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)] font-semibold"
              >
                <option value="Уже владею">✅ Уже владею</option>
                <option value="Обучение">🎓 Обучение / Курсы</option>
                <option value="Наставник">🧑‍🏫 Наставник / Ментор</option>
                <option value="Опыт на текущем месте">💼 Опыт на текущем месте</option>
                <option value="Стажировка">🚀 Стажировка / Хакатон</option>
                <option value="Фриланс-проект">💻 Фриланс-проект / Пет-проект</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">План действий / Подробные заметки</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Детали: курс по архитектуре, менторские сессии, пет-проект..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
            />
          </div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs border border-[var(--color-border)] rounded-xl cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl cursor-pointer"
            >
              Сохранить запись
            </button>
          </div>
        </form>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs text-[var(--text-secondary)] font-medium flex items-center space-x-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Статус:</span>
          </span>
          {[
            { id: 'all', label: 'Все записи' },
            { id: 'Владею', label: '🟢 Владею (Да)' },
            { id: 'Частично', label: '🟡 Частично' },
            { id: 'Не владею', label: '🔴 Не владею (Гэпы)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {uniqueCompanies.length > 0 && (
          <div className="flex items-center space-x-2 text-xs w-full sm:w-auto justify-end">
            <span className="text-[var(--text-secondary)] shrink-0">Компания:</span>
            <select
              value={filterCompany}
              onChange={e => setFilterCompany(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg-card)] text-[var(--text-primary)] text-xs font-semibold"
            >
              <option value="all">Все компании ({uniqueCompanies.length})</option>
              {uniqueCompanies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-secondary)] font-bold uppercase text-[10px] tracking-wider">
                <th className="p-4">Компания & Вакансия</th>
                <th className="p-4">Требование / Обязанность из вакансии</th>
                <th className="p-4">Тип</th>
                <th className="p-4">Статус владения</th>
                <th className="p-4">Способ достижения</th>
                <th className="p-4">Заметки / План достижения</th>
                <th className="p-4 text-right">Управление</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredList.map((row) => (
                <tr key={row.id} className="hover:bg-blue-500/5 transition-colors">
                  <td className="p-4 min-w-[160px]">
                    <div className="font-bold text-[var(--text-primary)] flex items-center space-x-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{row.company}</span>
                    </div>
                    <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-medium">{row.vacancyTitle}</div>
                  </td>

                  <td className="p-4 max-w-sm font-medium text-[var(--text-primary)] leading-relaxed">
                    {row.item}
                  </td>

                  <td className="p-4 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.type === 'Обязанность' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'}`}>
                      {row.type || 'Требование'}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={row.status}
                      onChange={e => handleStatusChange(row.id, e.target.value as VacancyRequirementAnalysis['status'])}
                      className={`px-2.5 py-1 text-xs font-bold rounded-xl border border-[var(--color-border)] cursor-pointer ${
                        row.status === 'Владею' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' :
                        row.status === 'Частично' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' :
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                      }`}
                    >
                      <option value="Владею">🟢 Владею (Да)</option>
                      <option value="Частично">🟡 Частично</option>
                      <option value="Не владею">🔴 Не владею (Нет)</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">
                      <div>{getMethodBadge(row.achievementMethod)}</div>
                      <select
                        value={row.achievementMethod}
                        onChange={e => handleMethodChange(row.id, e.target.value as VacancyRequirementAnalysis['achievementMethod'])}
                        className="mt-1 px-2 py-1 text-[11px] rounded-lg bg-[var(--bg-main)] border border-[var(--color-border)] font-medium text-[var(--text-primary)] cursor-pointer"
                      >
                        <option value="Уже владею">Уже владею</option>
                        <option value="Обучение">Обучение / Курсы</option>
                        <option value="Наставник">Наставник / Ментор</option>
                        <option value="Опыт на текущем месте">Опыт на текущем месте</option>
                        <option value="Стажировка">Стажировка / Хакатон</option>
                        <option value="Фриланс-проект">Фриланс / Пет-проект</option>
                      </select>
                    </div>
                  </td>

                  <td className="p-4 text-[11px] text-[var(--text-secondary)] max-w-xs">
                    {row.notes || '—'}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                      title="Удалить запись"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-xs text-[var(--text-secondary)]">
                    Записи по выбранным фильтрам не найдены. Нажмите «Заполнить 7 вакансий» или «Добавить».
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
