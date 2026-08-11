const CACHE_NAME = "mara-os-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./looc-screen.html",
    "./home-screen.html",
    "./app-drawer.html",
    "./mara-os1png.png",
    "./mara-os2png.png",
    "./walpaperhp.jpg",
    "./wallpaper1.png",
    "./manifest.json"
];
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );

    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});