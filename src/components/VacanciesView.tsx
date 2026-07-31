import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  ExternalLink, 
  Trash2, 
  Edit3,
  RussianRuble, 
  MapPin, 
  Award,
  CheckCircle2,
  X,
  Filter
} from 'lucide-react';
import { Vacancy, CareerState } from '../types';
import { TargetGoalBanner } from './TargetGoalBanner';
import { ExportBoardButton } from './ExportBoardButton';

interface VacanciesViewProps {
  state: CareerState;
  onChangeState: React.Dispatch<React.SetStateAction<CareerState>>;
}

export const VacanciesView: React.FC<VacanciesViewProps> = ({
  state,
  onChangeState
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

  const vacancies = state.selected_vacancies || [];

  // Form
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [salaryRange, setSalaryRange] = useState('350 000 - 450 000 ₽');
  const [location, setLocation] = useState('Москва / Удаленка РФ');
  const [skillsStr, setSkillsStr] = useState('React, TypeScript, Go, System Design, PostgreSQL');
  const [status, setStatus] = useState<Vacancy['status']>('Saved');
  const [atsScore, setAtsScore] = useState<number>(85);
  const [link, setLink] = useState('https://yandex.ru/jobs');
  const [notes, setNotes] = useState('');

  const handleOpenAdd = () => {
    setEditingVacancy(null);
    setTitle('');
    setCompany('');
    setSalaryRange('380 000 - 500 000 ₽');
    setLocation('Москва / Удаленка РФ');
    setSkillsStr('Python, PyTorch, C++, TypeScript, Kubernetes');
    setStatus('Saved');
    setAtsScore(88);
    setLink('https://yandex.ru/jobs');
    setNotes('');
    setShowAddModal(true);
  };

  const handleOpenEdit = (v: Vacancy) => {
    setEditingVacancy(v);
    setTitle(v.title);
    setCompany(v.company);
    setSalaryRange(v.salaryRange || '350 000 - 450 000 ₽');
    setLocation(v.location || 'Москва / Удаленка РФ');
    setSkillsStr(v.keySkills ? v.keySkills.join(', ') : '');
    setStatus(v.status || 'Saved');
    setAtsScore(v.atsScore || 85);
    setLink(v.link || '');
    setNotes(v.notes || '');
    setShowAddModal(true);
  };

  const handleAddPresetVacancy = (preset: Partial<Vacancy>) => {
    const exists = vacancies.some(v => v.company === preset.company && v.title === preset.title);
    if (exists) return;

    const newVac: Vacancy = {
      id: Date.now().toString() + Math.random().toString().slice(2, 5),
      title: preset.title || 'Senior Engineer',
      company: preset.company || 'Компания',
      salaryRange: preset.salaryRange || '350 000 - 450 000 ₽',
      location: preset.location || 'Москва / Удаленка РФ',
      keySkills: preset.keySkills || ['TypeScript', 'React', 'Go'],
      status: 'Saved',
      atsScore: preset.atsScore || 85,
      link: preset.link || 'https://yandex.ru/jobs',
      notes: preset.notes || 'Добавлено из базы лучших вакансий'
    };

    onChangeState(prev => ({
      ...prev,
      selected_vacancies: [...prev.selected_vacancies, newVac]
    }));
  };

  const PRESET_VACANCIES: Partial<Vacancy>[] = [
    {
      title: 'Senior Fullstack Developer',
      company: 'Яндекс',
      salaryRange: '380 000 - 480 000 ₽',
      location: 'Москва / Удаленка РФ',
      keySkills: ['TypeScript', 'React 18', 'Node.js', 'PostgreSQL', 'Docker'],
      atsScore: 92,
      link: 'https://yandex.ru/jobs/vacancies'
    },
    {
      title: 'Senior Backend Engineer (Go)',
      company: 'Авито Tech',
      salaryRange: '400 000 - 520 000 ₽',
      location: 'Москва / Гибрид',
      keySkills: ['Go', 'Kafka', 'PostgreSQL', 'Kubernetes', 'Microservices'],
      atsScore: 88,
      link: 'https://avito.tech'
    },
    {
      title: 'Senior AI / Data Scientist',
      company: 'Т-Банк',
      salaryRange: '350 000 - 450 000 ₽',
      location: 'Удаленка (РФ)',
      keySkills: ['Python', 'PyTorch', 'LLM', 'CatBoost', 'MLOps'],
      atsScore: 90,
      link: 'https://tbank.ru/career'
    },
    {
      title: 'Lead Software Engineer',
      company: 'Ozon Tech',
      salaryRange: '420 000 - 550 000 ₽',
      location: 'Москва / Удаленка РФ',
      keySkills: ['Go', 'Java', 'Highload', 'System Design', 'Kafka'],
      atsScore: 86,
      link: 'https://job.ozon.ru'
    }
  ];

  const handleSaveVacancy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;

    const skillList = skillsStr.split(',').map(s => s.trim()).filter(Boolean);

    if (editingVacancy) {
      onChangeState(prev => ({
        ...prev,
        selected_vacancies: prev.selected_vacancies.map(v => 
          v.id === editingVacancy.id
            ? {
                ...v,
                title: title.trim(),
                company: company.trim(),
                salaryRange,
                location,
                keySkills: skillList,
                status,
                atsScore,
                link,
                notes
              }
            : v
        )
      }));
    } else {
      const newVac: Vacancy = {
        id: Date.now().toString(),
        title: title.trim(),
        company: company.trim(),
        salaryRange,
        location,
        keySkills: skillList,
        status,
        atsScore,
        link,
        notes
      };

      onChangeState(prev => ({
        ...prev,
        selected_vacancies: [...prev.selected_vacancies, newVac]
      }));
    }

    setShowAddModal(false);
    setEditingVacancy(null);
  };

  const handleDeleteVacancy = (id: string) => {
    onChangeState(prev => ({
      ...prev,
      selected_vacancies: prev.selected_vacancies.filter(v => v.id !== id)
    }));
  };

  const handleStatusChange = (id: string, newStatus: Vacancy['status']) => {
    onChangeState(prev => ({
      ...prev,
      selected_vacancies: prev.selected_vacancies.map(v => 
        v.id === id ? { ...v, status: newStatus } : v
      )
    }));
  };

  const filteredVacancies = vacancies.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.keySkills.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'All' || (v.status || 'Saved') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Target Goal Banner */}
      <TargetGoalBanner 
        state={state} 
        subtitle="Воронка откликов и ATS-анализ вакансий сопоставляются с вашей главной карьерной целью."
      />

      {/* Header & Controls */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl p-4 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">Анализ вакансий & ATS Трекер</h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Декомпозиция требований и воронка откликов (Pipeline)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ExportBoardButton state={state} boardType="vacancies" boardTitle="Доска №3" />
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить вакансию</span>
            </button>
          </div>
        </div>

        {/* Quick Add Presets Bar */}
        <div className="pt-2 border-t border-[var(--color-border)]">
          <div className="text-[11px] font-semibold text-[var(--text-secondary)] mb-1.5 flex items-center justify-between">
            <span>Быстрый выбор из топовых вакансий IT-компаний:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_VACANCIES.map((pv, idx) => {
              const isAdded = vacancies.some(v => v.company === pv.company && v.title === pv.title);
              return (
                <button
                  key={idx}
                  onClick={() => handleAddPresetVacancy(pv)}
                  disabled={isAdded}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all flex items-center space-x-1 border cursor-pointer ${
                    isAdded 
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 cursor-default' 
                      : 'bg-[var(--bg-main)] hover:bg-blue-500/10 text-[var(--text-primary)] hover:text-blue-600 border-[var(--color-border)] hover:border-blue-500/30'
                  }`}
                >
                  <Plus className="w-3 h-3" />
                  <span>{pv.company}: {pv.title} ({pv.salaryRange})</span>
                  {isAdded && <span className="text-[10px] ml-1 font-bold">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[var(--color-border)] text-xs">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Поиск по названию или навыкам..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
            {['All', 'Saved', 'Applied', 'Interview', 'Offer'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors ${statusFilter === st ? 'bg-blue-600 text-white' : 'bg-[var(--bg-main)] border border-[var(--color-border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
              >
                {st === 'All' ? 'Все статусы' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--bg-main)] border-b border-[var(--color-border)] text-[var(--text-secondary)] font-semibold uppercase tracking-wider">
                <th className="p-4">Должность & Компания</th>
                <th className="p-4">Вилка & Локация</th>
                <th className="p-4">Ключевые ATS Навыки</th>
                <th className="p-4">ATS Match</th>
                <th className="p-4">Статус воронки</th>
                <th className="p-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)] text-[var(--text-primary)]">
              {filteredVacancies.map((v) => (
                <tr key={v.id} className="hover:bg-[var(--bg-hover-sidebar)] transition-colors">
                  
                  {/* Title & Company & Description / Link */}
                  <td className="p-4 max-w-xs">
                    <div className="font-bold text-sm text-[var(--text-primary)]">{v.title}</div>
                    <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">{v.company}</div>
                    
                    {/* Description / Notes */}
                    {v.notes && (
                      <div className="text-[11px] text-[var(--text-secondary)] italic mt-1 line-clamp-2 bg-[var(--bg-main)] p-1.5 rounded-lg border border-[var(--color-border)]">
                        {v.notes}
                      </div>
                    )}

                    {/* Link */}
                    {v.link ? (
                      <div className="mt-1 flex items-center space-x-1 text-[11px]">
                        <span className="text-[var(--text-secondary)]">Ссылка:</span>
                        <a
                          href={v.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 dark:text-purple-400 font-medium hover:underline truncate max-w-[180px] flex items-center space-x-0.5"
                          title={v.link}
                        >
                          <span className="truncate">{v.link.replace(/^https?:\/\//, '')}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOpenEdit(v)}
                        className="mt-1 text-[10px] text-amber-500 hover:underline flex items-center space-x-1"
                      >
                        <Edit3 className="w-2.5 h-2.5" />
                        <span>+ Добавить ссылку/описание</span>
                      </button>
                    )}
                  </td>

                  {/* Salary & Location */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                        <RussianRuble className="w-3.5 h-3.5" />
                        <span>{v.salaryRange}</span>
                      </div>
                      <div className="text-[11px] text-[var(--text-secondary)] flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{v.location}</span>
                      </div>
                    </div>
                  </td>

                  {/* Skills */}
                  <td className="p-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {v.keySkills.map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium border border-slate-300 dark:border-slate-700 text-[10px]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* ATS Score */}
                  <td className="p-4">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-12 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full"
                          style={{ width: `${v.atsScore || 80}%` }}
                        />
                      </div>
                      <span className="font-bold text-xs text-blue-600 dark:text-blue-400">
                        {v.atsScore || 80}%
                      </span>
                    </div>
                  </td>

                  {/* Status Pipeline Selector */}
                  <td className="p-4">
                    <select
                      value={v.status || 'Saved'}
                      onChange={e => handleStatusChange(v.id, e.target.value as any)}
                      className="px-2.5 py-1 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] font-semibold text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Saved">📌 В сохраненных</option>
                      <option value="Applied">📤 Отправлен отклик</option>
                      <option value="Interview">🎙 Собеседование</option>
                      <option value="Offer">🎉 Оффер</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button
                        onClick={() => handleOpenEdit(v)}
                        className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer rounded-lg"
                        title="Редактировать ячейку / вакансию"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {v.link && (
                        <a
                          href={v.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-[var(--text-secondary)] hover:text-blue-600 transition-colors"
                          title="Открыть ссылку"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteVacancy(v.id)}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-rose-500 transition-colors cursor-pointer rounded-lg hover:bg-rose-500/10"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit Vacancy */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--color-border)] rounded-2xl w-full max-w-lg p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {editingVacancy ? `Редактирование: ${editingVacancy.title}` : 'Добавить новую вакансию'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVacancy} className="space-y-3 text-xs">
              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Название должности</label>
                <input
                  type="text"
                  required
                  placeholder="например, Senior Frontend Engineer"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Компания</label>
                  <input
                    type="text"
                    required
                    placeholder="Яндекс / Авито"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Зарплатная вилка</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={e => setSalaryRange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Локация / Формат</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Ссылка на вакансию (URL)</label>
                <input
                  type="url"
                  placeholder="https://yandex.ru/jobs/vacancies/12345"
                  value={link}
                  onChange={e => setLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">Описание / Заметки к вакансии</label>
                <textarea
                  rows={2}
                  placeholder="Особенности позиции, вилка, стек, контакты рекрутера..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div>
                <label className="block text-[var(--text-secondary)] font-semibold mb-1">ATS Навыки (через запятую)</label>
                <input
                  type="text"
                  value={skillsStr}
                  onChange={e => setSkillsStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">Статус воронки</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  >
                    <option value="Saved">Saved</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] font-semibold mb-1">ATS Match (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={atsScore}
                    onChange={e => setAtsScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--color-border)] bg-[var(--bg-main)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2 border-t border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--color-border)] text-[var(--text-secondary)] font-semibold cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
