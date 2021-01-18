const cacheName = 'assets'
const cachedStuff = [

    '/icons/36x36.png',
    '/icons/48x48.png',
    '/icons/72x72.png',
    '/icons/96x96.png',
    '/icons/144x144.png',
    '/icons/192x192.png',
    '/icons/250x250.png',

    'bg_1.png',
    'fg_1.png',

    '/icons/svgs/mail.svg',
    '/icons/svgs/phone.svg',
    '/icons/svgs/github.svg',
    '/icons/svgs/twitter.svg',
    '/icons/svgs/instagram.svg',
    '/icons/svgs/telegram.svg',
    '/offline.html',

    '/icons/fonts/SpaceGrotesk-Regular.woff',
    '/icons/fonts/SpaceGrotesk-Regular.woff2',
    '/icons/fonts/SpaceGrotesk-Bold.woff',
    '/icons/fonts/SpaceGrotesk-Bold.woff2',

    '/icons/images/home.png',
    '/icons/images/contacts.png',
    '/icons/images/projects.png',
    '/icons/images/skills.png',
]

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(cacheName).then(function(cache) {
      return cache.addAll(cachedStuff)
    })
  )
})

// If a request doesn't match anything in the cache, get it from the network,
// send it to the page and add it to the cache at the same time
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url)

    if (cachedStuff.includes(url.pathname)) {
        event.respondWith(caches.open(cacheName).then((cache) => {
            return cache.match(event.request).then((response) => {
                return response || fetch(event.request).then((response) => {
                        cache.put(event.request, response.clone())
                        return response
                    })
                })
            })
        )
    }
})
