// sw.js – Basic Service Worker for Disco
const CACHE_NAME = 'discovr-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/everyone.html',
  '/posts.html',
  '/chat.html',
  '/profile.html',
  '/admin.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});