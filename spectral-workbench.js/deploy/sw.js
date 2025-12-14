const CACHE_NAME = 'spectral-capture-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/dist/spectral-workbench.js',
  '/dist/spectral-workbench.css',
  '/examples/new-capture/mobile.css',
  '/examples/new-capture/new-capture.css',
  '/examples/new-capture/mobile-init.js',
  '/node_modules/jquery/dist/jquery.min.js',
  '/node_modules/bootstrap/dist/css/bootstrap.min.css',
  '/node_modules/font-awesome/css/font-awesome.min.css',
  '/examples/vendor/bs-stepper.min.css',
  '/examples/vendor/bs-stepper.min.js',
  '/examples/vendor/adapter.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
