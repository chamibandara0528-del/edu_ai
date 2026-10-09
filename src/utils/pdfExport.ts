import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFMeta {
  userName: string;
  grade: string;
  subject: string;
  term: string;
  language: string;
}

/**
 * Parses simple Markdown text to HTML elements
 */
function parseMarkdownToHtml(markdown: string): string {
  // Replace headers
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 14px; font-weight: bold; color: #1e293b; margin-top: 12px; margin-bottom: 6px;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-top: 16px; margin-bottom: 8px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 20px; font-weight: 900; color: #1e3a8a; margin-top: 20px; margin-bottom: 10px;">$1</h1>');

  // Replace bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold; color: #0f172a;">$1</strong>');

  // Replace list items
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li style="margin-left: 15px; margin-bottom: 4px; list-style-type: disc;">$1</li>');
  html = html.replace(/^\s*\*\s+(.*$)/gim, '<li style="margin-left: 15px; margin-bottom: 4px; list-style-type: disc;">$1</li>');

  // Replace paragraphs (skipping lines that are headings/lists)
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<li') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) {
      return line;
    }
    return `<p style="margin-bottom: 10px; line-height: 1.6; color: #334155; font-size: 12px;">${line}</p>`;
  });

  return processedLines.join('\n');
}

export async function exportToPDF(
  title: string,
  contentMarkdown: string,
  meta: PDFMeta
): Promise<void> {
  // Create an offscreen container to construct the print document
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.width = '794px'; // Standard A4 width in pixels at 96 DPI
  container.style.fontFamily = '"Inter", "Sinhala", "Helvetica Neue", Arial, sans-serif';
  container.style.backgroundColor = '#ffffff';
  document.body.appendChild(container);

  try {
    // 1. Convert markdown to HTML
    const htmlContent = parseMarkdownToHtml(contentMarkdown);

    // 2. We will paginate the content dynamically.
    // We create a temporary content div to measure the heights of the parsed elements.
    const measureDiv = document.createElement('div');
    measureDiv.style.width = '644px'; // 794px - 150px (margins of 75px on left and right)
    measureDiv.style.visibility = 'hidden';
    measureDiv.style.position = 'absolute';
    measureDiv.innerHTML = htmlContent;
    container.appendChild(measureDiv);

    // Wait a frame for DOM to update
    await new Promise((r) => setTimeout(r, 50));

    const elements = Array.from(measureDiv.children) as HTMLElement[];
    const pages: HTMLElement[][] = [[]];
    let currentPageHeight = 0;
    const MAX_PAGE_HEIGHT = 800; // Leave room for margins, header (80px) and footer (60px) within 1123px total height

    elements.forEach((el) => {
      const clonedEl = el.cloneNode(true) as HTMLElement;
      // Append temporary element to container to measure accurate rendered height
      container.appendChild(clonedEl);
      const elHeight = clonedEl.getBoundingClientRect().height;
      container.removeChild(clonedEl);

      // If the item itself exceeds a blank page, or adding it fits in current page
      if (currentPageHeight + elHeight > MAX_PAGE_HEIGHT && pages[pages.length - 1].length > 0) {
        // Start a new page
        pages.push([clonedEl]);
        currentPageHeight = elHeight;
      } else {
        pages[pages.length - 1].push(clonedEl);
        currentPageHeight += elHeight;
      }
    });

    // Remove measurement div
    container.removeChild(measureDiv);

    // 3. Render the styled pages
    const totalPages = pages.length;
    
    pages.forEach((pageElements, index) => {
      const pageDiv = document.createElement('div');
      pageDiv.id = `pdf-page-${index + 1}`;
      pageDiv.style.width = '794px';
      pageDiv.style.height = '1123px'; // Standard A4 height at 96 DPI
      pageDiv.style.position = 'relative';
      pageDiv.style.backgroundColor = '#ffffff';
      pageDiv.style.boxSizing = 'border-box';
      pageDiv.style.padding = '80px 75px 80px 75px'; // Professional page margins
      pageDiv.style.display = 'flex';
      pageDiv.style.flexDirection = 'column';
      pageDiv.style.borderBottom = '1px dashed #e2e8f0'; // Visual guide for debugging

      // --- HEADER (Repeated on every page) ---
      const header = document.createElement('div');
      header.style.position = 'absolute';
      header.style.top = '30px';
      header.style.left = '75px';
      header.style.right = '75px';
      header.style.height = '40px';
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.borderBottom = '1.5px solid #3b82f6';
      header.style.paddingBottom = '5px';
      header.style.boxSizing = 'border-box';

      const headerTitle = document.createElement('div');
      headerTitle.style.fontSize = '9px';
      headerTitle.style.fontWeight = 'bold';
      headerTitle.style.color = '#3b82f6';
      headerTitle.style.textTransform = 'uppercase';
      headerTitle.style.letterSpacing = '1px';
      headerTitle.innerText = `${meta.subject} - ${meta.grade} | ${meta.term}`;

      const headerLogo = document.createElement('div');
      headerLogo.style.fontSize = '10px';
      headerLogo.style.fontWeight = '900';
      headerLogo.style.color = '#1e293b';
      headerLogo.innerHTML = 'Nanasala AI <span style="color: #3b82f6; font-style: italic;">නැණසල</span>';

      header.appendChild(headerTitle);
      header.appendChild(headerLogo);
      pageDiv.appendChild(header);

      // --- WATERMARK (Opacity 30%) ---
      const watermark = document.createElement('div');
      watermark.style.position = 'absolute';
      watermark.style.top = '50%';
      watermark.style.left = '50%';
      watermark.style.transform = 'translate(-50%, -50%) rotate(-30deg)';
      watermark.style.fontSize = '22px';
      watermark.style.fontWeight = '900';
      watermark.style.fontFamily = 'monospace';
      watermark.style.color = '#475569';
      watermark.style.opacity = '0.3';
      watermark.style.letterSpacing = '3px';
      watermark.style.pointerEvents = 'none';
      watermark.style.whiteSpace = 'nowrap';
      watermark.style.zIndex = '0';
      watermark.innerText = 'EDU.AI.DY.AI.EDUEDUCATION WITH AI';
      pageDiv.appendChild(watermark);

      // --- FIRST PAGE COVER BANNER ---
      if (index === 0) {
        const heroBanner = document.createElement('div');
        heroBanner.style.backgroundColor = '#f8fafc';
        heroBanner.style.borderLeft = '5px solid #3b82f6';
        heroBanner.style.padding = '18px';
        heroBanner.style.marginBottom = '20px';
        heroBanner.style.borderRadius = '0 12px 12px 0';
        heroBanner.style.boxSizing = 'border-box';

        const heroTitle = document.createElement('h1');
        heroTitle.style.fontSize = '22px';
        heroTitle.style.fontWeight = '900';
        heroTitle.style.color = '#0f172a';
        heroTitle.style.margin = '0 0 8px 0';
        heroTitle.style.lineHeight = '1.3';
        heroTitle.innerText = title;

        const heroMeta = document.createElement('div');
        heroMeta.style.display = 'flex';
        heroMeta.style.flexWrap = 'wrap';
        heroMeta.style.gap = '15px';
        heroMeta.style.fontSize = '10px';
        heroMeta.style.color = '#64748b';
        heroMeta.style.fontWeight = 'bold';
        heroMeta.innerHTML = `
          <span>👤 ශිෂ්‍යයා: ${meta.userName}</span>
          <span>📅 දිනය: ${new Date().toLocaleDateString()}</span>
          <span>🏫 ශ්‍රේණිය: ${meta.grade}</span>
        `;

        heroBanner.appendChild(heroTitle);
        heroBanner.appendChild(heroMeta);
        pageDiv.appendChild(heroBanner);
      }

      // --- PAGE CONTENT AREA ---
      const contentArea = document.createElement('div');
      contentArea.style.flex = '1';
      contentArea.style.display = 'flex';
      contentArea.style.flexDirection = 'column';
      contentArea.style.gap = '8px';
      contentArea.style.overflow = 'hidden';
      
      pageElements.forEach((el) => {
        contentArea.appendChild(el.cloneNode(true));
      });
      pageDiv.appendChild(contentArea);

      // --- FOOTER (Repeated with dynamic page numbers) ---
      const footer = document.createElement('div');
      footer.style.position = 'absolute';
      footer.style.bottom = '30px';
      footer.style.left = '75px';
      footer.style.right = '75px';
      footer.style.height = '30px';
      footer.style.display = 'flex';
      footer.style.justifyContent = 'space-between';
      footer.style.alignItems = 'center';
      footer.style.borderTop = '1px solid #e2e8f0';
      footer.style.paddingTop = '6px';
      footer.style.fontSize = '9px';
      footer.style.color = '#94a3b8';
      footer.style.fontWeight = '500';

      const footerLeft = document.createElement('span');
      footerLeft.style.opacity = '0.3';
      footerLeft.style.fontFamily = 'monospace';
      footerLeft.style.fontWeight = '700';
      footerLeft.innerText = 'EDU.AI.DY.AI.EDUEDUCATION WITH AI';

      const footerRight = document.createElement('span');
      footerRight.style.fontWeight = 'bold';
      footerRight.innerText = `Page ${index + 1} of ${totalPages}`;

      footer.appendChild(footerLeft);
      footer.appendChild(footerRight);
      pageDiv.appendChild(footer);

      container.appendChild(pageDiv);
    });

    // 4. Render to Canvas and generate PDF
    const pdfInstance = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // We process each page sequentially to preserve layout precision
    for (let i = 0; i < totalPages; i++) {
      const pageEl = document.getElementById(`pdf-page-${i + 1}`);
      if (!pageEl) continue;

      const canvas = await html2canvas(pageEl, {
        scale: 2, // High resolution retina scale
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      if (i > 0) {
        pdfInstance.addPage();
      }
      
      // A4 is 210mm x 297mm
      pdfInstance.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    }

    // Save the PDF file securely on student device
    const fileName = `${title.replace(/[^a-zA-Z0-9 සිංහල]/g, '_')}.pdf`;
    pdfInstance.save(fileName);

  } finally {
    // Always clean up offscreen DOM elements
    document.body.removeChild(container);
  }
}
