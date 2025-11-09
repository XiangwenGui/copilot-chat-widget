// sdk-widget/src/widget.js

import {
  CopilotStudioClient,
  CopilotStudioWebChat
} from '@microsoft/agents-copilotstudio-client';

/**
 * Initialize Copilot Studio WebChat in a given DOM element.
 *
 * This will be bundled by Vite into a UMD file exposing:
 *    window.CCWidget.init({...})
 *
 * Requirements on the page that uses it:
 *  - <script src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>
 *    so window.WebChat.renderWebChat is available.
 */
export async function init({
  element,
  botId,
  tenantId,
  webChatOptions = {},
  styleOptions = {}
}) {
  if (!element) {
    throw new Error('[CCWidget] "element" is required');
  }
  if (!botId || !tenantId) {
    throw new Error('[CCWidget] "botId" and "tenantId" are required. Get them from Copilot Studio: Settings → Advanced → Metadata.');
  }
  if (!window.WebChat || typeof window.WebChat.renderWebChat !== 'function') {
    throw new Error('[CCWidget] Bot Framework Web Chat script not loaded. Add <script src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script> before this widget.');
  }

  // Create a Copilot Studio client.
  // This uses the basic sample pattern from Microsoft’s docs.
  const client = new CopilotStudioClient({
    botId,
    tenantId
    // If your scenario requires auth / tokens, that wiring comes here.
    // (Their preview docs are… terse.)
  });

  // Create a Web Chat compatible connection to Copilot Studio.
  const directLine = CopilotStudioWebChat.createConnection(client, {
    showTyping: true,
    ...webChatOptions
  });

  // Render Web Chat into your element.
  window.WebChat.renderWebChat(
    {
      directLine,
      styleOptions: {
        // Defaults tuned to feel modern; override via styleOptions argument.
        hideUploadButton: true,
        bubbleRadius: 12,
        bubbleBorderRadius: 12,
        bubbleBackground: '#ffffff',
        bubbleFromUserBackground: '#1154F7',
        bubbleFromUserTextColor: '#ffffff',
        primaryFont: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        // allow caller overrides:
        ...styleOptions
      }
    },
    element
  );
}

// Make it usable from a plain <script> as window.CCWidget.init(...)
if (typeof window !== 'undefined') {
  window.CCWidget = window.CCWidget || {};
  window.CCWidget.init = init;
}