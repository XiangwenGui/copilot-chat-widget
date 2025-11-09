/**
 * Copilot Chat Widget boot script
 * - Uses the built UMD bundle (ccwidget.umd.js)
 * - Renders Copilot Studio chat into <div id="copilot-chat"></div>
 */

(function () {
  // Prevent double-load if script is included twice
  if (window.__CCW_LOADED__) return;
  window.__CCW_LOADED__ = true;

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  onReady(async function () {
    const root = document.getElementById("copilot-chat");
    if (!root) return;

    // Use Agent App ID as botId, Tenant ID as tenantId
    const botId = "15136286-698c-43c0-9d29-ffff20d35884"; // Agent App ID
    const tenantId = "f8f8a500-fb4e-413a-b047-f60fcffcfe8e"; // Tenant ID

    if (window.CCWidget && typeof window.CCWidget.init === "function") {
      try {
        await window.CCWidget.init({
          element: root,
          botId,
          tenantId,
          styleOptions: {
            bubbleRadius: 12,
            bubbleBorderRadius: 12,
            bubbleBackground: "#ffffff",
            bubbleFromUserBackground: "#1154F7",
            bubbleFromUserTextColor: "#ffffff",
            primaryFont:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          }
        });
      } catch (err) {
        console.error("[CCWidget] init failed:", err);
        root.innerHTML = `
          <div style="font:14px/1.5 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Arial;padding:16px;">
            <strong>Chat failed to initialize.</strong>
            <div style="margin-top:8px;">Check the browser console for details.</div>
          </div>
        `;
      }
    } else {
      // Our UMD bundle or WebChat script didn't load
      root.innerHTML = `
        <div style="font:14px/1.5 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Arial;padding:16px;">
          <strong>Widget bundle not loaded.</strong>
          <div style="margin-top:8px;">
            Ensure <code>ccwidget.umd.js</code> is included in &lt;head&gt; before <code>widget.js</code>.
          </div>
        </div>
      `;
    }
  });
})();