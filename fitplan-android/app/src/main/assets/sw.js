const CACHE='fitplan-uiux-v2';
const FILES=['./','./index.html','./app.js','./styles.css','./manifest.json','./icon.svg','./assets/movement.svg','./assets/Tajawal-Regular.ttf','./assets/Tajawal-Bold.ttf'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('fitplan-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request)));});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window'}).then(list=>list.length?list[0].focus():self.clients.openWindow('./index.html')));});
