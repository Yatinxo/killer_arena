const CACHE_NAME = 'killer-arena-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './TemplateData/style.css',
  './TemplateData/fullscreen-button.png',
  './TemplateData/progress-bar-empty-dark.png',
  './TemplateData/progress-bar-empty-light.png',
  './TemplateData/progress-bar-full-dark.png',
  './TemplateData/progress-bar-full-light.png',
  './TemplateData/unity-logo-dark.png',
  './icons/icon-192.png', // Updated path
  './icons/icon-512.png', // Added new icon path
  // Add Build files - adjust names if they differ
  './Build/KIller_Arena_Mobile_WebGl.data',
  './Build/KIller_Arena_Mobile_WebGl.framework.js',
  './Build/KIller_Arena_Mobile_WebGl.loader.js',
  './Build/KIller_Arena_Mobile_WebGl.wasm',
  './Build/KILLER_ARENA.data',
  './Build/KILLER_ARENA.framework.js',
  './Build/KILLER_ARENA.loader.js',
  './Build/KILLER_ARENA.wasm'
  // Add other essential assets if needed
];

// Install event: Cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use addAll for atomic caching
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Failed to cache one or more resources:', error);
          // Optional: Throw error to fail the installation if critical assets are missing
          // throw error;
        });
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve cached assets or fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});