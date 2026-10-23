var C="ther-v2-6",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!=C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
// страница: сначала сеть (чтобы обновления приходили сразу), без сети — из кэша; остальное — из кэша
self.addEventListener("fetch",function(e){
  if(e.request.mode=="navigate"){e.respondWith(fetch(e.request).then(function(n){var c=n.clone();caches.open(C).then(function(x){x.put("./",c)});return n}).catch(function(){return caches.match("./")}));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||fetch(e.request).then(function(n){var c=n.clone();caches.open(C).then(function(x){x.put(e.request,c)});return n})}))});
