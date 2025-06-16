const CACHE_VERSION = '1.0.1';
const CACHE_NAME = `computerzone-cache-${CACHE_VERSION}`;
const BASE_PATH = '/computerzone';
const STATIC_ASSETS = [
  BASE_PATH + '/',
  BASE_PATH + '/placeholder-logo.png',
  BASE_PATH + '/site.webmanifest'
];

// Function to check if a URL is cacheable
const isCacheable = (url) => {
  // Don't cache API routes or dynamic routes
  if (url.includes('/api/') || url.includes('/admin/')) {
    return false;
  }
  return true;
};

// Clear all caches and reload everything on page refresh
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Force reload all pages
      return self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.navigate(client.url);
        });
      });
    })
  );
});

self.addEventListener('install', (event) => {
  // Skip waiting to activate the new service worker immediately
  event.waitUntil(self.skipWaiting());
  
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('Opened cache');
      
      // Cache static assets
      const results = await Promise.allSettled(
        STATIC_ASSETS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);
            await cache.put(url, response);
            console.log(`Cached ${url}`);
          } catch (error) {
            console.error(`Failed to cache ${url}:`, error);
          }
        })
      );

      const failures = results.filter(r => r.status === 'rejected');
      if (failures.length > 0) {
        console.warn('Some assets failed to cache:', failures);
      }
    })()
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  // Add base path to the request URL if it's a relative URL
  const url = new URL(event.request.url);
  if (!url.hostname) {
    event.respondWith(
      fetch(BASE_PATH + event.request.url, { cache: 'no-store' })
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Try to get from cache if fetch fails
          return caches.match(event.request).then((response) => {
            if (response) {
              return response;
            }

            if (event.request.mode === 'navigate') {
              return new Response(
                '<!DOCTYPE html>' +
                '<html lang="en">' +
                '<head>' +
                  '<meta charset="UTF-8">' +
                  '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                  '<title>Offline - ComputerZone</title>' +
                  '<style>' +
                    'body {' +
                      'font-family: system-ui, -apple-system, sans-serif;' +
                      'background: #000;' +
                      'color: #fff;' +
                      'display: flex;' +
                      'align-items: center;' +
                      'justify-content: center;' +
                      'min-height: 100vh;' +
                      'margin: 0;' +
                      'padding: 20px;' +
                      'text-align: center;' +
                    '}' +
                    '.container {' +
                      'max-width: 500px;' +
                    '}' +
                    'h1 {' +
                      'color: #3b82f6;' +
                      'margin-bottom: 1rem;' +
                    '}' +
                    'p {' +
                      'color: #9ca3af;' +
                      'margin-bottom: 2rem;' +
                    '}' +
                    '.retry-button {' +
                      'background: #3b82f6;' +
                      'color: white;' +
                      'border: none;' +
                      'padding: 12px 24px;' +
                      'border-radius: 6px;' +
                      'cursor: pointer;' +
                      'font-size: 1rem;' +
                      'transition: background 0.2s;' +
                    '}' +
                    '.retry-button:hover {' +
                      'background: #2563eb;' +
                    '}' +
                  '</style>' +
                '</head>' +
                '<body>' +
                  '<div class="container">' +
                    '<h1>You\'re Offline</h1>' +
                    '<p>Please check your internet connection and try again.</p>' +
                    '<button class="retry-button" onclick="window.location.reload()">' +
                      'Try Again' +
                    '</button>' +
                  '</div>' +
                '</body>' +
                '</html>',
                {
                  headers: {
                    'Content-Type': 'text/html',
                  },
                }
              );
            }
            return new Response('Network error', { status: 503 });
          });
        })
    );
  } else {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
}); 