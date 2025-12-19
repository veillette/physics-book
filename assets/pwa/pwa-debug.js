// PWA Debug Utilities
// This script helps debug PWA installation and caching issues

(function () {
  'use strict';

  // Only enable debug mode if localStorage flag is set
  const DEBUG_MODE = localStorage.getItem('pwa-debug') === 'true';

  if (!DEBUG_MODE) {
    // Add easy way to enable debug mode
    window.enablePWADebug = () => {
      localStorage.setItem('pwa-debug', 'true');
      console.log('PWA Debug mode enabled. Reload the page to see debug info.');
    };
    return;
  }

  console.log('🔍 PWA Debug Mode Enabled');

  // Debug panel styles
  const debugPanelCSS = `
        position: fixed;
        top: 10px;
        left: 10px;
        background: rgba(0,0,0,0.9);
        color: #00ff00;
        padding: 15px;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
        line-height: 1.4;
        z-index: 10000;
        max-width: 400px;
        max-height: 300px;
        overflow-y: auto;
        border: 2px solid #333;
    `;

  // Create debug panel
  const debugPanel = document.createElement('div');
  debugPanel.id = 'pwa-debug-panel';
  debugPanel.style.cssText = debugPanelCSS;

  const debugContent = document.createElement('div');
  debugContent.innerHTML = `
        <div style="border-bottom: 1px solid #333; margin-bottom: 10px; padding-bottom: 5px;">
            <strong>🔧 PWA Debug Panel</strong>
            <button onclick="document.getElementById('pwa-debug-panel').remove(); localStorage.removeItem('pwa-debug');" style="float: right; background: #ff4444; color: white; border: none; padding: 2px 8px; border-radius: 3px; cursor: pointer;">✕</button>
        </div>
        <div id="debug-info">Loading debug info...</div>
    `;

  debugPanel.appendChild(debugContent);

  // Add panel to page when DOM is ready
  function addDebugPanel() {
    if (document.body) {
      document.body.appendChild(debugPanel);
      updateDebugInfo();
    } else {
      setTimeout(addDebugPanel, 100);
    }
  }

  // Update debug information
  function updateDebugInfo() {
    const debugInfo = document.getElementById('debug-info');
    if (!debugInfo) return;

    const info = [];

    // Service Worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        info.push(`🔧 Service Workers: ${registrations.length} registered`);
        registrations.forEach((reg, index) => {
          info.push(`   SW${index + 1}: ${reg.scope}`);
          info.push(
            `   State: ${reg.installing ? 'Installing' : reg.waiting ? 'Waiting' : reg.active ? 'Active' : 'Unknown'}`
          );
        });
        updateInfoDisplay();
      });
    } else {
      info.push('❌ Service Workers: Not supported');
    }

    // Cache information
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        info.push(`💾 Caches: ${cacheNames.length} found`);
        cacheNames.forEach(name => {
          info.push(`   📦 ${name}`);
        });
        updateInfoDisplay();
      });
    }

    // Network status
    info.push(`🌐 Online: ${navigator.onLine ? 'Yes' : 'No'}`);

    // PWA installation status
    if (window.matchMedia('(display-mode: standalone)').matches) {
      info.push('📱 PWA: Installed (standalone mode)');
    } else if (window.navigator.standalone) {
      info.push('📱 PWA: Installed (iOS standalone)');
    } else {
      info.push('🌐 PWA: Running in browser');
    }

    // Manifest information
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
      info.push(`📋 Manifest: Found at ${manifestLink.href}`);
    } else {
      info.push('❌ Manifest: Not found');
    }

    // Current page info
    info.push(`📄 Current: ${location.pathname}`);
    info.push(`🔗 Base URL: ${location.origin}`);

    function updateInfoDisplay() {
      if (debugInfo) {
        debugInfo.innerHTML = info.join('<br>');
      }
    }

    updateInfoDisplay();
  }

  // Utility functions for console
  window.pwaDebug = {
    clearCaches: async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('All caches cleared');
      location.reload();
    },

    unregisterSW: async () => {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(reg => reg.unregister()));
      console.log('All service workers unregistered');
      location.reload();
    },

    reinstallPWA: async () => {
      await window.pwaDebug.clearCaches();
      await window.pwaDebug.unregisterSW();
    },

    testOffline: () => {
      // Simulate offline mode for testing
      console.log('Simulating offline mode...');
      const originalFetch = window.fetch;
      window.fetch = () => Promise.reject(new Error('Simulated offline'));

      setTimeout(() => {
        window.fetch = originalFetch;
        console.log('Online mode restored');
      }, 10000);
    },

    cacheStatus: async () => {
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        console.log(`Cache "${name}": ${keys.length} items`);
        keys.forEach(request => console.log(`  - ${request.url}`));
      }
    },
  };

  // Add debug panel when page loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDebugPanel);
  } else {
    addDebugPanel();
  }

  // Update debug info every 5 seconds
  setInterval(updateDebugInfo, 5000);

  console.log('🛠️ PWA Debug tools loaded. Use pwaDebug.* functions in console:');
  console.log('  - pwaDebug.clearCaches()');
  console.log('  - pwaDebug.unregisterSW()');
  console.log('  - pwaDebug.reinstallPWA()');
  console.log('  - pwaDebug.cacheStatus()');
  console.log('  - pwaDebug.testOffline()');
})();
