---
layout: null
---
// PWA Service Worker Registration and Installation
(function() {
    'use strict';

    // Check if service workers are supported
    if (!('serviceWorker' in navigator)) {
        console.warn('Service workers are not supported in this browser');
        return;
    }

    // Configuration - uses Jekyll baseurl (works for both GitHub Pages and Vercel)
    const BASE_PATH = '{{ site.baseurl }}/';
    const SW_PATH = `{{ site.baseurl }}/assets/pwa/serviceWorker.js`;
    
    // Service Worker Registration
    function registerServiceWorker() {
        navigator.serviceWorker.register(SW_PATH, { 
            scope: BASE_PATH,
            updateViaCache: 'none' // Always check for updates
        })
        .then((registration) => {
            console.log('Service Worker registered successfully:', registration);
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
                console.log('New service worker version available');
                const newWorker = registration.installing;
                
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New update available
                        if (confirm('A new version is available. Reload to update?')) {
                            window.location.reload();
                        }
                    }
                });
            });
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    }
    
    // PWA Installation Prompt
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (event) => {
        console.log('PWA install prompt available');
        // Prevent the mini-infobar from appearing on mobile
        event.preventDefault();
        // Save the event to trigger it later
        deferredPrompt = event;
        
        // Show install button or banner
        showInstallPrompt();
    });
    
    function showInstallPrompt() {
        // Create install button if it doesn't exist
        if (!document.getElementById('pwa-install-btn')) {
            const installBtn = document.createElement('button');
            installBtn.id = 'pwa-install-btn';
            installBtn.innerHTML = '📱 Install App';
            installBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #3367D6;
                color: white;
                border: none;
                border-radius: 25px;
                padding: 12px 20px;
                font-size: 14px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1000;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            `;
            
            installBtn.addEventListener('click', installPWA);
            document.body.appendChild(installBtn);
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (installBtn.parentNode) {
                    installBtn.style.opacity = '0.7';
                }
            }, 10000);
        }
    }
    
    function installPWA() {
        const installBtn = document.getElementById('pwa-install-btn');
        
        if (deferredPrompt) {
            // Show the install prompt
            deferredPrompt.prompt();
            
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        }
        
        // Hide the install button
        if (installBtn) {
            installBtn.remove();
        }
    }
    
    // Handle successful installation
    window.addEventListener('appinstalled', (event) => {
        console.log('PWA was installed successfully');
        deferredPrompt = null;
        
        // Hide install button if still visible
        const installBtn = document.getElementById('pwa-install-btn');
        if (installBtn) {
            installBtn.remove();
        }
        
        // Optional: Show success message
        showMessage('App installed successfully! You can now use it offline.', 'success');
    });
    
    // Simple message display function
    function showMessage(text, type = 'info') {
        const msg = document.createElement('div');
        msg.textContent = text;
        msg.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            z-index: 1001;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        `;
        
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 4000);
    }
    
    // Register service worker when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerServiceWorker);
    } else {
        registerServiceWorker();
    }
    
    // Handle online/offline status
    function updateOnlineStatus() {
        const status = navigator.onLine ? 'online' : 'offline';
        console.log(`PWA is now ${status}`);
        
        if (!navigator.onLine) {
            showMessage('You are offline. Cached content will be served.', 'info');
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
})();
