import React, { useState } from 'react';
import { Mail, Plus, ExternalLink, Trash2, CheckCircle2, Clock, Check } from 'lucide-react';
import { CareerState, CareerNewsletter } from '../types';

interface NewslettersViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
  onAskAi: (prompt: string) => void;
}

const POPULAR_NEWSLETTERS_PRESETS: Omit<CareerNewsletter, 'id'>[] = [
  {
    companyName: 'Яндекс',
    title: 'Дайджест вакансий Yandex Tech & AI',
    frequency: 'Еженедельно',
    subscribed: true,
    link: 'https://yandex.ru/jobs',
    lastIssueDate: new Date().toISOString().split('T')[0],
    notes: 'Вакансии Поиска, Yandex Cloud, YandexGPT и автономных сервисов'
  },
  {
    companyName: 'Авито Tech',
    title: 'Канал вакансий и инженерных статей Avito',
    frequency: 'По мере новых вакансий',
    subscribed: true,
    link: 'https://t.me/avitotech',
    lastIssueDate: new Date().toISOString().split('T')[0],
    notes: 'Go, Python, React, Data Science и MLOps позиции'
  },
  {
    companyName: 'Т-Банк (Тинкофф)',
    title: 'T-Bank Career & AI Lab Newsletter',
    frequency: 'Еженедельно',
    subscribed: true,
    link: 'https://www.tbank.ru/career',
    lastIssueDate: new Date().toISOString().split('T')[0],
    notes: 'Финтех разработки, AI лаборатория, голосовые технологии'
  },
  {
    companyName: 'Хабр Карьера',
    title: 'Еженедельный дайджест Senior/Lead вакансий',
    frequency: 'Еженедельно',
    subscribed: true,
    link: 'https://career.habr.com',
    lastIssueDate: new Date().toISOString().split('T')[0],
    notes: 'Подборка высших грейдов с открытыми зарплатными вилками'
  }
];

export const NewslettersView: React.FC<NewslettersViewProps> = ({
  state,
  onChangeState
}) => {
  const [companyName, setCompanyName] = useState('');
  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState('Еженедельно');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const newsletters = state.newsletters || [];

  const handleAddPreset = (preset: Omit<CareerNewsletter, 'id'>) => {
    const existing = newsletters.some(n => n.companyName.toLowerCase() === preset.companyName.toLowerCase() && n.title.toLowerCase() === preset.title.toLowerCase());
    if (existing) return;

    const newItem: CareerNewsletter = {
      ...preset,
      id: 'n_preset_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4)
    };

    onChangeState(prev => ({
      ...prev,
      newsletters: [newItem, ...(prev.newsletters || [])]
    }));
  };

  const handleToggleSubscribe = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      newsletters: (prev.newsletters || []).map(item => 
        item.id === id ? { ...item, subscribed: !item.subscribed } : item
      )
    }));
  };

  const handleDelete = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      newsletters: (prev.newsletters || []).filter(item => item.id !== id)
    }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !title.trim()) return;

    const newItem: CareerNewsletter = {
      id: 'n_' + Date.now(),
      companyName: companyName.trim(),
      title: title.trim(),
      frequency,
      subscribed: true,
      link: link.trim() || 'https://t.me/tech_jobs',
      lastIssueDate: new Date().toISOString().split('T')[0],
      notes: notes.trim()
    };

    onChangeState(prev => ({
      ...prev,
      newsletters: [newItem, ...(prev.newsletters || [])]
    }));

    setCompanyName('');
    setTitle('');
    setLink('');
    setNotes('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">
              Подписка на карьерные рассылки компаний
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Мониторинг закрытых дайджестов вакансий и карьерных рассылок целевых IT-компаний
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={() => setIsAdding(true)}
            className="flex-1 md:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить подписку</span>
          </button>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-[var(--bg-card)] border border-purple-500/30 rounded-2xl p-5 space-y-4 shadow-md">
          <h3 className="font-bold text-sm text-[var(--text-primary)] flex items-center space-x-2">
            <Plus className="w-4 h-4 text-purple-500" />
            <span>Добавить карьерную рассылку</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Компания / Источник</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Яндекс / Авито / Хабр Карьера"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Название рассылки / канала</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Дайджест вакансий и Tech-статей"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Периодичность</label>
              <select
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
              >
                <option value="Еженедельно">Еженедельно</option>
                <option value="Ежемесячно">Ежемесячно</option>
                <option value="По мере вакансий">По мере новых вакансий</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Ссылка на рассылку / Telegram</label>
              <input
                type="url"
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="https://t.me/company_jobs"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Заметки / Категория</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Дайджест Senior-вакансий и анонсы митапов..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--bg-main)] border border-[var(--color-border)]"
              />
            </div>
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
              className="px-4 py-2 text-xs font-semibold bg-purple-600 text-white hover:bg-purple-700 rounded-xl"
            >
              Сохранить
            </button>
          </div>
        </form>
      )}

      {/* Presets Bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
          Быстрое добавление проверенных IT-рассылок и каналов:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {POPULAR_NEWSLETTERS_PRESETS.map((p, idx) => {
            const isAdded = newsletters.some(n => n.companyName.toLowerCase() === p.companyName.toLowerCase());
            return (
              <div key={idx} className="p-3 border border-[var(--color-border)] bg-[var(--bg-main)]/50 rounded-xl flex flex-col justify-between space-y-2">
                <div>
                  <div className="font-bold text-xs text-[var(--text-primary)]">{p.companyName}</div>
                  <div className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-0.5">{p.title}</div>
                </div>
                <button
                  onClick={() => handleAddPreset(p)}
                  disabled={isAdded}
                  className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-center space-x-1 transition-all ${
                    isAdded 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Добавлено</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      <span>Добавить</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Newsletter Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {newsletters.map((nl) => (
          <div
            key={nl.id}
            className={`bg-[var(--bg-card)] border rounded-2xl p-5 space-y-4 transition-all relative ${
              nl.subscribed ? 'border-purple-500/40 shadow-xs' : 'border-[var(--color-border)] opacity-70'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-[11px]">
                  {nl.companyName}
                </span>
                <h3 className="font-bold text-sm text-[var(--text-primary)] mt-1.5">
                  {nl.title}
                </h3>
              </div>

              <button
                onClick={() => handleDelete(nl.id)}
                className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                title="Удалить"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {nl.notes || 'Мониторинг обновлений и анонсов новых позиций.'}
            </p>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-[var(--color-border)]">
              <div className="flex items-center space-x-2 text-[var(--text-secondary)]">
                <Clock className="w-3.5 h-3.5" />
                <span>{nl.frequency}</span>
              </div>

              <div className="flex items-center space-x-3">
                {nl.link && (
                  <a
                    href={nl.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center space-x-1"
                  >
                    <span>Открыть</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => handleToggleSubscribe(nl.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center space-x-1 ${
                    nl.subscribed
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                      : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{nl.subscribed ? 'Подписан' : 'Пауза'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
