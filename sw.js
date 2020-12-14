self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("cacheName").then(function (cache) {
      return cache.addAll([
        "./",
        "./index.html",
        "./lib/manifest.json",
        "./ticTacToe.css",
        "./ticTacToe.js",
      ]);
    })
  );
});

self.addEventListener("fetch", () => console.log("fetch"));
