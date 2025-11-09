/**
 * Copilot Chat Widget boot script
 * - Renders your Copilot into <div id="copilot-chat"></div>
 * - Paste the official Copilot Studio SDK snippet where marked below.
 * - If the SDK isn’t pasted yet, you’ll see a friendly placeholder.
 */

(function () {
  // Prevent double-load if script is included twice
  if (window.__CCW_LOADED__) return;
  window.__CCW_LOADED__ = true;

  // Run when DOM is ready
  const onReady = (fn) =>
    document.readyState !== "loading"
      ? fn()
      : document.addEventListener("DOMContentLoaded", fn);

  onReady(async function init() {
    const mount = document.getElementById("copilot-chat");
    if (!mount) return;

    // --- ⬇⬇⬇ PASTE MICROSOFT COPILOT SDK SNIPPET BELOW THIS LINE ⬇⬇⬇
    // 1) Grab the mount element
    const root = document.getElementById('copilot-chat');
    if (!root) return;

    // 2) Your Copilot identifiers
    // Get these from Copilot Studio → your Copilot → Settings → Advanced → Metadata
    // They will be labeled like "Bot ID" and "Tenant ID".
    const botId = "15136286-698c-43c0-9d29-ffff20d35884";
    const tenantId = "f8f8a500-fb4e-413a-b047-f60fcffcfe8e";

    // 3) Initialize via the UMD bundle we built
    if (window.CCWidget && typeof window.CCWidget.init === "function") {
      await window.CCWidget.init({
        element: root,
        botId,
        tenantId,
        styleOptions: {
          // Match your outer UI:
          bubbleRadius: 12,
          bubbleBorderRadius: 12,
          bubbleBackground: "#ffffff",
          bubbleFromUserBackground: "#1154F7",
          bubbleFromUserTextColor: "#ffffff",
          primaryFont:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        }
      });
    } else {
      root.innerHTML = `
        <div style="font:14px/1.5 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Arial;padding:16px;">
          <strong>Widget bundle not loaded.</strong>
          <div style="margin-top:8px;">
            Ensure <code>ccwidget.umd.js</code> is loaded via
            <code>&lt;script src="./ccwidget.umd.js"&gt;</code> in &lt;head&gt; before <code>widget.js</code>.
          </div>
        </div>
      `;
    }
    // --- ⬆⬆⬆ STOP PASTING ABOVE THIS LINE ⬆⬆⬆

    // If the SDK snippet hasn’t been pasted (or failed), show a helpful note:
    const empty = mount.children.length === 0;
    if (empty) {
      mount.innerHTML = `
        <div style="font: 14px/1.5 ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial; padding:16px;">
          <strong>Copilot SDK not initialized yet.</strong>
          <div style="margin-top:8px;">
            Open <code>widget.js</code> and paste the SDK snippet from
            <em>Copilot Studio → Channels → Web app (SDK)</em> where indicated.
          </div>
        </div>
      `;
    }
  });
})();