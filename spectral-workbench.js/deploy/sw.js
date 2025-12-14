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
  '/vendor/jquery.min.js',
  '/vendor/bootstrap.min.css',
  '/vendor/font-awesome.min.css',
  '/examples/vendor/bs-stepper.min.css',
  '/examples/vendor/bs-stepper.min.js',
  '/examples/vendor/adapter.min.js',
  '/vendor/jquery.flot.js',
  '/vendor/jquery.flot.crosshair.js',
  '/vendor/jquery.flot.threshold.js',
  '/vendor/d3.js',
  '/vendor/nv.d3.js',
  '/vendor/nv.d3.css',
  '/vendor/moment.js'
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
