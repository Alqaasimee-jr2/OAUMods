'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'caches' in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => {
          if (key !== 'oaumods-cache-v3') {
            caches.delete(key);
          }
        });
      });
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            registration.update();
          })
          .catch(() => {
            // Registration failure handled silently
          });
      });
    }
  }, []);

  return null;
}
