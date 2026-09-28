// Prep Guide service worker.
// Same-origin requests: network first, fall back to cache (so pushes reach users, and everything works offline).
// Cross-origin (Google Fonts, sql.js): cache first, then network.
// Bump CACHE when you want old entries purged; add new trackers to SHELL.
// All same-origin fetches use cache:"reload"/"no-cache" so GitHub Pages' 10-minute HTTP cache never hides a push.
const CACHE = "prep-guide-v2";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest",
  "./trackers/dsa.html", "./trackers/sql.html", "./trackers/pyspark.html",
  "./trackers/system-design.html", "./trackers/kafka.html",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-512-maskable.png", "./icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const sameOrigin = new URL(req.url).origin === self.location.origin;
  if (sameOrigin) {
    e.respondWith(
      fetch(req, { cache: "no-cache" }).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then(hit => hit || (req.mode === "navigate" ? caches.match("./index.html") : Response.error())))
    );
  } else {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
      }))
    );
  }
});
