const staticCacheName = 'ch-1'

const assetsUrl = [
  'index.html',
  './outline_article_black_24dp.png'
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetsUrl);
})

self.addEventListener('fetch', event => {
  const { request } = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  }
})

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? await fetch(request)
}
