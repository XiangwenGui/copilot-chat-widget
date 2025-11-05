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
    // --- PASTE THIS WHERE INDICATED IN widget.js ---

    // 1) Your connection string (the long URL you copied)
    const connectionString = "https://61f038cd782ce2a9b393e0ba817546.03.environment.api.powerplatform.com/copilotstudio/dataverse-backed/authenticated/bots/cr6d0_internalAgent/conversations?api-version=2022-03-01-preview";

    // 2) Try to initialize the Microsoft 365 Agents SDK (browser build)
    if (window.MicrosoftAgents && typeof window.MicrosoftAgents.createClient === "function") {
    const client = await window.MicrosoftAgents.createClient({ connectionString });

    await client.renderWebChat({
        element: mount, // <div id="copilot-chat">
        // OPTIONAL: pass theme/style options here when you’re ready
    });
    } else {
    // If the global isn’t present, the SDK script wasn’t loaded yet.
    // Add the SDK <script> tag from Copilot Studio docs into your index.html <head>
    mount.innerHTML = `
        <div style="font:14px/1.5 ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,Arial;padding:16px;">
        <strong>SDK script not loaded.</strong>
        <div style="margin-top:8px;">
            In <code>index.html</code>, add the Microsoft 365 Agents SDK &nbsp;<code>&lt;script src="..."&gt;</code>
            (the one Copilot Studio shows above the connection string), <em>above</em> <code>widget.js</code>.
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