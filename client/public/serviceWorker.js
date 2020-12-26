const CACHE_NAME = "v1";
const urlsToCache = [
  "./index.html",
  "./offline.html",
  "./images/favicon.png",
  "./images/question-circle-solid.svg",
];

const self = this;

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache opened");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.log(err))
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(() => {
        return fetch(event.request).catch((err) =>
          caches.match("offline.html")
        );
      })
      .catch((err) => console.log(err))
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
          return null;
        })
      )
    )
  );
});
