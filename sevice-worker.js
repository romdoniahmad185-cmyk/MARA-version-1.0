const CACHE_NAME = "mara-os-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./mara-os1png.png",
    "./mara-os2png.png",
    "./wallpaper1.png",
    "./walpaperhp.png",
    "./manifest.json"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => {
                return self.skipWaiting();
            })
            .catch(error => {
                console.error("MARA OS cache gagal:", error);
                throw error;
            })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});