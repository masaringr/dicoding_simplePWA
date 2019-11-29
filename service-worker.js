const CACHE_NAME = "smartdesav3";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/icon.png",
    "/icons-sm.png",
    "/icons-md.png",
    "/nav.html",
    "/index.html",
    "/pages/profile.html",
    "/pages/agenda.html",
    "/pages/umkm.html",
    "/pages/berita.html",
    "/css/materialize.min.css",
    "/css/mycss.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/images/profile_banner.jpeg",
    "/images/umkm2.jpg",
    "/images/umkm3.jpg"
];
 
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }
    
            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

//menghapus cache lama
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});