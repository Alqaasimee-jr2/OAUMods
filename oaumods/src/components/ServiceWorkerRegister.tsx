'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    const scheduleRegistration = () => {
      // Clean up legacy caches without blocking initial paint
      if (typeof window !== 'undefined' && 'caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => {
            if (key !== 'oaumods-cache-v5') {
              caches.delete(key);
            }
          });
        }).catch(() => {});
      }

      // Register service worker
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            registration.update();
          })
          .catch(() => {
            // Registration failure handled silently
          });
      }
    };

    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
          .requestIdleCallback(scheduleRegistration, { timeout: 2500 });
        return () => {
          if ('cancelIdleCallback' in window) {
            (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
          }
        };
      } else {
        const timer = setTimeout(scheduleRegistration, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return null;
}
