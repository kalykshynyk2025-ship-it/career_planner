import { toPng } from 'html-to-image';

export interface PngExportOptions {
  filename?: string;
  backgroundColor?: string;
  pixelRatio?: number;
}

export const exportElementToPng = async (
  elementIdOrEl: string | HTMLElement,
  filename: string = 'board_export.png',
  options?: PngExportOptions
): Promise<boolean> => {
  try {
    const node = typeof elementIdOrEl === 'string' 
      ? document.getElementById(elementIdOrEl) 
      : elementIdOrEl;

    if (!node) {
      console.warn(`Element with ID "${elementIdOrEl}" not found for PNG export.`);
      return false;
    }

    // Determine background color based on theme
    const isDark = document.documentElement.classList.contains('dark') || 
                   document.body.classList.contains('dark') ||
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultBg = options?.backgroundColor || (isDark ? '#0f172a' : '#f8fafc');

    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: options?.pixelRatio || 2,
      backgroundColor: defaultBg,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left'
      },
      filter: (domNode) => {
        // Exclude elements marked with data-export-ignore or buttons with print:hidden
        if (domNode instanceof HTMLElement) {
          if (domNode.hasAttribute('data-export-ignore') || domNode.classList.contains('print:hidden')) {
            return false;
          }
        }
        return true;
      }
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.error('Failed to export element to PNG:', err);
    return false;
  }
};

export const exportAllBoardElementsToPng = async (stateAppName?: string): Promise<number> => {
  const boardIds: Array<{ id: string; filename: string }> = [
    { id: 'board-criteria-view', filename: 'Board1_Criteria.png' },
    { id: 'board-companies-view', filename: 'Board2_Companies.png' },
    { id: 'board-vacancies-view', filename: 'Board3_Vacancies.png' },
    { id: 'board-newsletters-view', filename: 'Board4_Newsletters.png' },
    { id: 'board-swot-view', filename: 'Board5_SWOT.png' },
    { id: 'board-agile-view', filename: 'Board6_AgileTrack.png' },
    { id: 'board-doc-view', filename: 'Board7_FullDocument.png' },
  ];

  let exportedCount = 0;
  for (const board of boardIds) {
    const el = document.getElementById(board.id);
    if (el) {
      const success = await exportElementToPng(el, board.filename);
      if (success) exportedCount++;
      // Give small gap between downloads
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  }

  return exportedCount;
};
