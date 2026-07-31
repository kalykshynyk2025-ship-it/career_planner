import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Check, Copy, Printer, Layers, ChevronDown } from 'lucide-react';
import { CareerState } from '../types';
import {
  downloadMarkdownFile,
  generateCriteriaBoardMarkdown,
  generateCompaniesBoardMarkdown,
  generateVacanciesBoardMarkdown,
  generateNewslettersBoardMarkdown,
  generateSwotBoardMarkdown,
  generateAgileTrackMarkdown,
  generateComprehensiveCareerMarkdown
} from '../utils/exportMarkdown';

export type BoardType = 'criteria' | 'companies' | 'vacancies' | 'newsletters' | 'swot' | 'agile_track' | 'all';

interface ExportBoardButtonProps {
  state: CareerState;
  boardType: BoardType;
  boardTitle?: string;
  onOpenPdfModal?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
}

export const ExportBoardButton: React.FC<ExportBoardButtonProps> = ({
  state,
  boardType,
  boardTitle,
  onOpenPdfModal,
  variant = 'outline',
  size = 'sm'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBoardMarkdown = (type: BoardType): { content: string; filename: string; title: string } => {
    const dateStr = new Date().toISOString().slice(0, 10);
    switch (type) {
      case 'criteria':
        return {
          content: generateCriteriaBoardMarkdown(state),
          filename: `Board1_Criteria_${dateStr}.md`,
          title: 'Доска №1: Критерии компаний'
        };
      case 'companies':
        return {
          content: generateCompaniesBoardMarkdown(state),
          filename: `Board2_Companies_${dateStr}.md`,
          title: 'Доска №2: Таргетированный список компаний'
        };
      case 'vacancies':
        return {
          content: generateVacanciesBoardMarkdown(state),
          filename: `Board3_Vacancies_${dateStr}.md`,
          title: 'Доска №3: ATS Трекер вакансий'
        };
      case 'newsletters':
        return {
          content: generateNewslettersBoardMarkdown(state),
          filename: `Board4_Newsletters_${dateStr}.md`,
          title: 'Доска №4: Карьерные рассылки'
        };
      case 'swot':
        return {
          content: generateSwotBoardMarkdown(state),
          filename: `Board5_SWOT_${dateStr}.md`,
          title: 'Доска №5: SWOT-Анализ профиля'
        };
      case 'agile_track':
        return {
          content: generateAgileTrackMarkdown(state),
          filename: `AgileTrack_Status_${dateStr}.md`,
          title: 'Статус Agile-Трека'
        };
      case 'all':
      default:
        return {
          content: generateComprehensiveCareerMarkdown(state),
          filename: `Comprehensive_Career_Strategy_${dateStr}.md`,
          title: 'Единый отчет по всем доскам'
        };
    }
  };

  const handleDownloadSingle = () => {
    const { content, filename } = getBoardMarkdown(boardType);
    downloadMarkdownFile(filename, content);
    setIsOpen(false);
  };

  const handleCopyMarkdown = () => {
    const { content } = getBoardMarkdown(boardType);
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setIsOpen(false);
  };

  const handleDownloadCombined = () => {
    const { content, filename } = getBoardMarkdown('all');
    downloadMarkdownFile(filename, content);
    setIsOpen(false);
  };

  const handleDownloadAllSeparately = () => {
    const boards: BoardType[] = ['criteria', 'companies', 'vacancies', 'newsletters', 'swot', 'agile_track'];
    boards.forEach((b, idx) => {
      setTimeout(() => {
        const { content, filename } = getBoardMarkdown(b);
        downloadMarkdownFile(filename, content);
      }, idx * 300);
    });
    setIsOpen(false);
  };

  const currentBoardInfo = getBoardMarkdown(boardType);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-1.5 rounded-xl font-semibold cursor-pointer transition-all shadow-xs
          ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs'}
          ${variant === 'primary' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
          ${variant === 'secondary' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
          ${variant === 'outline' ? 'bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-primary)] hover:bg-[var(--color-border)]/20' : ''}
          ${variant === 'ghost' ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-border)]/20' : ''}
        `}
      >
        <Download className="w-4 h-4 text-emerald-500" />
        <span>Экспорт {boardTitle ? `(${boardTitle})` : ''}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] shadow-xl z-50 py-2 space-y-1 text-xs divide-y divide-[var(--color-border)]">
          <div className="px-3 py-1.5 font-bold text-[var(--text-primary)] flex items-center justify-between">
            <span>Экспорт этой доски</span>
            <span className="text-[10px] text-blue-500 font-normal">Markdown / PDF</span>
          </div>

          <div className="py-1 space-y-0.5">
            <button
              onClick={handleDownloadSingle}
              className="w-full text-left px-3 py-2 hover:bg-blue-500/10 text-[var(--text-primary)] flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span>Скачать этой доски (.md)</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="w-full text-left px-3 py-2 hover:bg-blue-500/10 text-[var(--text-primary)] flex items-center space-x-2 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Скопировано!' : 'Скопировать Markdown этой доски'}</span>
            </button>
          </div>

          <div className="py-1 space-y-0.5">
            <div className="px-3 py-1 font-semibold text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
              Полный отчет и все доски
            </div>

            <button
              onClick={handleDownloadCombined}
              className="w-full text-left px-3 py-2 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Скачать ВСЕ доски (Единый .md)</span>
            </button>

            <button
              onClick={handleDownloadAllSeparately}
              className="w-full text-left px-3 py-2 hover:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-purple-500" />
              <span>Скачать доски по отдельности (ZIP/файлы)</span>
            </button>

            {onOpenPdfModal && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPdfModal();
                }}
                className="w-full text-left px-3 py-2 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold flex items-center space-x-2 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-blue-500" />
                <span>Печать / Печать в PDF</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
