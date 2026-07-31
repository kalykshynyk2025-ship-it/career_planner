import React, { useState } from 'react';
import { X, Copy, Check, FileText, Printer, Download, Layers } from 'lucide-react';
import { CareerState } from '../types';
import ReactMarkdown from 'react-markdown';
import { generateComprehensiveCareerMarkdown, downloadMarkdownFile } from '../utils/exportMarkdown';

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

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm print:p-0 print:bg-white print:static">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl print:max-h-none print:shadow-none print:border-none print:w-full">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-bold text-white text-base">Экспорт единого карьерного документа</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-bold">
                  Все 13 досок и блоков
                </span>
              </div>
              <p className="text-xs text-slate-400">Форматированный стратегический отчет со всеми обновленными данными досок</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            
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
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 text-slate-200 print:bg-white print:text-black">
          <div className="prose prose-invert print:prose prose-xs max-w-none space-y-3">
            <ReactMarkdown>{fullMarkdown}</ReactMarkdown>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between print:hidden">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Консолидировано: Доски №1-8, SWOT, Agile-трек 13 шагов и Профиль</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};

