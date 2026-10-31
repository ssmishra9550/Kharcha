// Kharcha service worker: lets the app work offline.
// Change VERSION on every release so the old cache is removed.
const VERSION = 'kharcha-v5';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

// cache:'reload' makes sure the browser's HTTP cache never hands us an old file.
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Show the cached copy immediately, and refresh it from the network in the background.
// Requests to other origins (the Supabase API) are never touched.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const hit = caches.match(req, { ignoreSearch: true });
  const net = fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); return caches.open(VERSION).then(c => c.put(req, copy)).then(() => res); }
    return res;
  });
  e.respondWith(hit.then(h => h || net.catch(() => caches.match('index.html'))));
  e.waitUntil(net.catch(() => {}));
});
