import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Check, Copy, Printer, Layers, ChevronDown, Image, ExternalLink, Loader2 } from 'lucide-react';
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
import { exportElementToPng, exportAllBoardElementsToPng } from '../utils/exportPng';

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
  const [isExportingPng, setIsExportingPng] = useState(false);
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

  const getElementIdForBoard = (type: BoardType): string => {
    switch (type) {
      case 'criteria': return 'board-criteria-view';
      case 'companies': return 'board-companies-view';
      case 'vacancies': return 'board-vacancies-view';
      case 'newsletters': return 'board-newsletters-view';
      case 'swot': return 'board-swot-view';
      case 'agile_track': return 'board-agile-view';
      case 'all': default: return 'board-doc-view';
    }
  };

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

  const handleDownloadSinglePng = async () => {
    setIsExportingPng(true);
    const targetId = getElementIdForBoard(boardType);
    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `${boardType}_board_${dateStr}.png`;
    
    // Fallback if full board element not found, export main content block
    await exportElementToPng(targetId, filename, { pixelRatio: 2 });
    setIsExportingPng(false);
    setIsOpen(false);
  };

  const handleDownloadAllPngs = async () => {
    setIsExportingPng(true);
    await exportAllBoardElementsToPng(state.appName);
    setIsExportingPng(false);
    setIsOpen(false);
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

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExportingPng}
        className={`
          flex items-center space-x-1.5 rounded-xl font-semibold cursor-pointer transition-all shadow-xs
          ${size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs'}
          ${variant === 'primary' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : ''}
          ${variant === 'secondary' ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
          ${variant === 'outline' ? 'bg-[var(--bg-card)] border border-[var(--color-border)] text-[var(--text-primary)] hover:bg-[var(--color-border)]/20' : ''}
          ${variant === 'ghost' ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--color-border)]/20' : ''}
        `}
      >
        {isExportingPng ? <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" /> : <Download className="w-4 h-4 text-emerald-500" />}
        <span>Экспорт {boardTitle ? `(${boardTitle})` : ''}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[var(--bg-card)] border border-[var(--color-border)] shadow-xl z-50 py-2 space-y-1 text-xs divide-y divide-[var(--color-border)]">
          <div className="px-3 py-1.5 font-bold text-[var(--text-primary)] flex items-center justify-between">
            <span>Экспорт доски & Отчета</span>
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">PNG / MD / PDF</span>
          </div>

          {/* PNG Section */}
          <div className="py-1 space-y-0.5">
            <div className="px-3 py-1 font-semibold text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
              Графический экспорт (PNG Картинки)
            </div>

            <button
              onClick={handleDownloadSinglePng}
              disabled={isExportingPng}
              className="w-full text-left px-3 py-2 hover:bg-blue-500/10 text-[var(--text-primary)] flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <Image className="w-3.5 h-3.5 text-blue-500" />
              <span>Скачать этой доски как PNG (Снимок)</span>
            </button>

            <button
              onClick={handleDownloadAllPngs}
              disabled={isExportingPng}
              className="w-full text-left px-3 py-2 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold flex items-center space-x-2 cursor-pointer transition-colors"
            >
              <Image className="w-3.5 h-3.5 text-indigo-500" />
              <span>Скачать ВСЕ доски как PNG (Пакетом)</span>
            </button>
          </div>

          {/* Markdown Section */}
          <div className="py-1 space-y-0.5">
            <div className="px-3 py-1 font-semibold text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
              Текстовый экспорт (Markdown)
            </div>

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
              <span>Скачать доски по отдельности (.md файлы)</span>
            </button>
          </div>

          {/* PDF Section */}
          {onOpenPdfModal && (
            <div className="py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPdfModal();
                }}
                className="w-full text-left px-3 py-2 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold flex items-center space-x-2 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-blue-500" />
                <span>Печать / Итоговый PDF отчёт</span>
              </button>
            </div>
          )}

          {/* Developer Attribution Footer */}
          <div className="px-3 py-2 bg-[var(--bg-main)] rounded-b-2xl border-t border-[var(--color-border)] text-[10px] space-y-0.5">
            <div className="text-[var(--text-secondary)] font-medium">Разработчик: <span className="font-bold text-[var(--text-primary)]">КАЛЫК ШЫНЫК</span></div>
            <a 
              href="https://kalyk-shynyk-web-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 font-semibold"
            >
              <span>WEB STUDIO & GAMIFICATION</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

