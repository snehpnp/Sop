import * as Config from "./Config";

export function register(config) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${Config.base_url.replace(/\/backend\/?$/, '')}/service-worker.js`;
      navigator.serviceWorker.register(swUrl).then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Optional: Notify user about the update
                alert('A new version is available. Please refresh the page.');
              } else {
                // Content is cached for offline use
                alert('Content is cached for offline use.');
              }
            }
          };
        };
      }).catch((error) => {
        console.error('Error during service worker registration:', error);
      });
    });
  }
}
