// Service Worker for AMZL WHS Quest - Android Version
// Uses NETWORK-FIRST strategy for HTML/JS/CSS to ensure latest version always loads
const CACHE_NAME = 'whs-quest-v2';

// Only cache audio files (large, rarely change)
const urlsToCache = [
  './1st level gameplay.mp3',
  './2nd level gameplay.mp3',
  './Bezos Battle.mp3',
  './BossBattle.mp3',
  './Credit Roll.mp3',
  './Intro.mp3',
  './Outdoor Level.mp3',
  './Title_Select.mp3',
  './Victory.mp3'
];

// Files that should ALWAYS be fetched from network (never cached)
const networkOnlyPatterns = [
  /\.html$/,
  /\.js$/,
  /\.css$/,
  /localization\.js/,
  /manifest\.json/
];

// Check if URL should bypass cache entirely
function shouldBypassCache(url) {
  const pathname = new URL(url).pathname;
  return networkOnlyPatterns.some(pattern => pattern.test(pathname));
}

// Install event - cache only audio resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching audio files only');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.log('Cache failed:', err);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up ALL old caches to force fresh load
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - NETWORK-FIRST for code files, cache for audio
self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;

  // For HTML/JS/CSS files: ALWAYS fetch from network
  if (shouldBypassCache(requestUrl)) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Only fallback to cache if network completely fails
          return caches.match(event.request);
        })
    );
    return;
  }

  // For audio and other assets: Try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});
