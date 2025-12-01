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

    let text = firstParagraph.innerHTML.trim();

    // Match pattern: [!TYPE] at start (may include newline/br after it)
    const match = text.match(/^\[!(\w+)\](<br\s*\/?>\s*|\s+)/);
    if (!match) return;

    const calloutType = match[1].toUpperCase();

    // Check if this callout type is configured
    if (!CALLOUT_CONFIG[calloutType]) {
      console.warn(`Unknown callout type: ${calloutType}`);
      return;
    }

    const config = CALLOUT_CONFIG[calloutType];
    let title = config.title;
    let contentHTML = '';

    // Remove the [!TYPE] marker and any following br or whitespace
    text = text.replace(/^\[!\w+\](<br\s*\/?>\s*|\s+)/, '').trim();

    // Check if remaining text looks like a custom title (short, no punctuation at end, single line)
    const lines = text.split(/<br\s*\/?>/);

    if (lines.length > 0 && lines[0].trim()) {
      const firstLine = lines[0].trim();

      // If first line is short and doesn't end with punctuation, treat as title
      if (firstLine.length < 50 && !firstLine.match(/[.!?]$/)) {
        title = firstLine;
        // Remaining lines are content
        if (lines.length > 1) {
          contentHTML = '<p>' + lines.slice(1).join('<br>') + '</p>';
        }
      } else {
        // All remaining text is content
        contentHTML = '<p>' + text + '</p>';
      }
    }

    // Remove the first paragraph with [!TYPE]
    firstParagraph.remove();

    // Add remaining blockquote content if any
    const remainingHTML = blockquote.innerHTML.trim();
    if (remainingHTML) {
      contentHTML += remainingHTML;
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
