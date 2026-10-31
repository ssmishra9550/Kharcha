// Kharcha service worker: offline chalne ke liye.
// App update karne par VERSION badal do taaki purana cache hat jaye.
const VERSION = 'kharcha-v3';
const ASSETS = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

// cache:'reload' taaki browser ke HTTP cache se purani file na uthe.
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

// Pehle cache se turant dikhao, peeche se network se naya version le aao.
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
