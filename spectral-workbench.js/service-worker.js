// Minimal Service Worker for PWA installability
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('spectral-store').then((cache) => cache.addAll([
      './',
      './index.html',
      './examples/new-capture/mobile.css',
      './examples/new-capture/mobile-init.js',
      './examples/new-capture/asset/logo.png',
      './examples/vendor/bs-stepper.min.css',
      './examples/vendor/bs-stepper.min.js',
      './examples/vendor/adapter.min.js'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});