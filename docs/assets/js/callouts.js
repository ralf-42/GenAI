/**
 * Callout Transformation Script
 * Converts Markdown-style callouts (> [!TYPE]) to styled HTML
 * Compatible with GitHub callout syntax
 */

(function() {
  'use strict';

  // Callout configuration
  const CALLOUT_CONFIG = {
    'NOTE': { icon: 'ℹ️', title: 'Hinweis', className: 'note' },
    'INFO': { icon: 'ℹ️', title: 'Information', className: 'info' },
    'TIP': { icon: '💡', title: 'Tipp', className: 'tip' },
    'TIPP': { icon: '💡', title: 'Tipp', className: 'tipp' },
    'WARNING': { icon: '⚠️', title: 'Warnung', className: 'warning' },
    'CAUTION': { icon: '⚠️', title: 'Achtung', className: 'caution' },
    'DANGER': { icon: '🚫', title: 'Gefahr', className: 'danger' },
    'EXAMPLE': { icon: '📝', title: 'Beispiel', className: 'example' },
    'QUOTE': { icon: '💬', title: 'Zitat', className: 'quote' },
    'SUCCESS': { icon: '✅', title: 'Erfolg', className: 'success' },
    'QUESTION': { icon: '❓', title: 'Frage', className: 'question' },
    'FAILURE': { icon: '❌', title: 'Fehler', className: 'failure' },
    'BUG': { icon: '🐛', title: 'Bug', className: 'bug' }
  };

  /**
   * Transform a blockquote into a callout if it matches the pattern
   */
  function transformCallout(blockquote) {
    const firstParagraph = blockquote.querySelector('p');
    if (!firstParagraph) return;

    const text = firstParagraph.textContent.trim();

    // Match pattern: [!TYPE] or [!TYPE] Custom Title
    const match = text.match(/^\[!(\w+)\](?:\s+(.+))?$/);
    if (!match) return;

    const calloutType = match[1].toUpperCase();
    const customTitle = match[2];

    // Check if this callout type is configured
    if (!CALLOUT_CONFIG[calloutType]) {
      console.warn(`Unknown callout type: ${calloutType}`);
      return;
    }

    const config = CALLOUT_CONFIG[calloutType];
    const title = customTitle || config.title;

    // Get all content paragraphs (excluding the first one with [!TYPE])
    const contentParagraphs = Array.from(blockquote.querySelectorAll('p')).slice(1);

    // Build content HTML
    let contentHTML = '';
    contentParagraphs.forEach(p => {
      contentHTML += p.outerHTML;
    });

    // If no additional paragraphs, use the rest of the first paragraph
    if (!contentHTML) {
      const textWithoutMarker = text.replace(/^\[!\w+\](?:\s+[^\n]*)?/, '').trim();
      if (textWithoutMarker) {
        contentHTML = `<p>${textWithoutMarker}</p>`;
      }
    }

    // Create callout HTML structure
    const calloutHTML = `
      <div class="callout" data-callout="${config.className}">
        <div class="callout-title">
          <div class="callout-icon">${config.icon}</div>
          <div class="callout-title-inner">${title}</div>
        </div>
        <div class="callout-content">
          ${contentHTML}
        </div>
      </div>
    `;

    // Replace blockquote with callout
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = calloutHTML;
    const calloutElement = tempDiv.firstElementChild;

    blockquote.parentNode.replaceChild(calloutElement, blockquote);
  }

  /**
   * Process all blockquotes on the page
   */
  function processCallouts() {
    const blockquotes = document.querySelectorAll('blockquote');
    blockquotes.forEach(transformCallout);
  }

  /**
   * Initialize when DOM is ready
   */
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', processCallouts);
    } else {
      processCallouts();
    }
  }

  init();
})();
