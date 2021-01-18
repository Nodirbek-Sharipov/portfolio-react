const cacheName = 'assets'
const cachedStuff = [

    '/icons/36x36.png',
    '/icons/48x48.png',
    '/icons/72x72.png',
    '/icons/96x96.png',
    '/icons/144x144.png',
    '/icons/192x192.png',
    '/icons/250x250.png',

    '/icons/images/bg_1.jpg',
    '/icons/images/fg_1.png',

    '/icons/svgs/mail.svg',
    '/icons/svgs/phone.svg',
    '/icons/svgs/github.svg',
    '/icons/svgs/twitter.svg',
    '/icons/svgs/instagram.svg',
    '/icons/svgs/telegram.svg',

    '/icons/fonts/SpaceGrotesk-Regular.woff',
    '/icons/fonts/SpaceGrotesk-Regular.woff2',
    '/icons/fonts/SpaceGrotesk-Bold.woff',
    '/icons/fonts/SpaceGrotesk-Bold.woff2',

    '/icons/images/home.png',
    '/icons/images/contacts.png',
    '/icons/images/projects.png',
    '/icons/images/skills.png',

    '/icons/favicon.ico',
    '/icons/favicon-32x32.png',

    '/offline.html',
]

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(cacheName).then(function(cache) {
      return cache.addAll(cachedStuff)
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

// If a request doesn't match anything in the cache, get it from the network,
// send it to the page and add it to the cache at the same time
self.addEventListener('fetch', (event) => {

    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
        try {
          // First, try to use the navigation preload response if it's supported.
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // catch is only triggered if an exception is thrown, which is likely
          // due to a network error.
          // If fetch() returns a valid HTTP response with a response code in
          // the 4xx or 5xx range, the catch() will NOT be called.
          console.log('Fetch failed; returning offline page instead.', error);

          const cache = await caches.open(cacheName);
          const cachedResponse = await cache.match('/offline.html');
          return cachedResponse;
        }
      })());
  } else {
      const url = new URL(event.request.url)

      if (cachedStuff.includes(url.pathname)) {
          event.respondWith(caches.open(cacheName).then((cache) => {
              return cache.match(event.request).then((response) => {
                  if(response){ console.log("From cache") } else { console.log("From server"); }
                  return response || fetch(event.request).then((response) => {
                          cache.put(event.request, response.clone())
                          return response
                      })
                  })
              })
          )
      }
  }
});
