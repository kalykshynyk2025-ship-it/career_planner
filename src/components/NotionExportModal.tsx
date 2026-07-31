import React, { useState } from 'react';
import { X, Copy, Check, FileText, Printer, Download, Layers, Image, ExternalLink } from 'lucide-react';
import { CareerState } from '../types';
import ReactMarkdown from 'react-markdown';
import { generateComprehensiveCareerMarkdown, downloadMarkdownFile } from '../utils/exportMarkdown';
import { exportElementToPng, exportAllBoardElementsToPng } from '../utils/exportPng';

interface NotionExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CareerState;
}

export const NotionExportModal: React.FC<NotionExportModalProps> = ({
  isOpen,
  onClose,
  state,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExportingPng, setIsExportingPng] = useState(false);

  if (!isOpen) return null;

  const fullMarkdown = generateComprehensiveCareerMarkdown(state);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMd = () => {
    const filename = `career_strategy_consolidated_${new Date().toISOString().slice(0, 10)}.md`;
    downloadMarkdownFile(filename, fullMarkdown);
  };

  const handleDownloadPngModal = async () => {
    setIsExportingPng(true);
    const dateStr = new Date().toISOString().slice(0, 10);
    await exportElementToPng('consolidated-modal-content', `Career_Strategy_Consolidated_${dateStr}.png`, {
      backgroundColor: '#020617',
      pixelRatio: 2
    });
    setIsExportingPng(false);
  };

  const handleDownloadAllBoardPngs = async () => {
    setIsExportingPng(true);
    await exportAllBoardElementsToPng(state.appName);
    setIsExportingPng(false);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl print:max-h-none print:shadow-none print:border-none print:w-full">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-white text-base">Экспорт единого карьерного документа</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-bold">
                  Все заполненные доски и блоки
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Разработчик: <strong className="text-slate-200">КАЛЫК ШЫНЫК</strong> (WEB STUDIO & GAMIFICATION)
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPngModal}
              disabled={isExportingPng}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              title="Скачать документ как изображение PNG"
            >
              <Image className="w-4 h-4" />
              <span>PNG Снимок</span>
            </button>

            <button
              onClick={handleDownloadAllBoardPngs}
              disabled={isExportingPng}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              title="Скачать все доски по отдельности в PNG"
            >
              <Image className="w-4 h-4" />
              <span>Все PNG</span>
            </button>
            
            <button
              onClick={handleDownloadMd}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              title="Скачать файл в формате Markdown (.md)"
            >
              <Download className="w-4 h-4 text-blue-400" />
              <span>Скачать .md</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Печать / PDF</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Скопировано!' : 'Скопировать'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div id="consolidated-modal-content" className="flex-1 overflow-y-auto p-6 bg-slate-950 text-slate-200 print:bg-white print:text-black">
          <div className="prose prose-invert print:prose prose-xs max-w-none space-y-3">
            <ReactMarkdown>{fullMarkdown}</ReactMarkdown>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 print:hidden">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Консолидировано: Доски №1-8, SWOT, Agile-трек 8 шагов и Профиль</span>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="https://kalyk-shynyk-web-studio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:underline flex items-center space-x-1 font-semibold"
            >
              <span>КАЛЫК ШЫНЫК WEB STUDIO & GAMIFICATION</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

