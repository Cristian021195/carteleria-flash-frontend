export async function fetchDataWithCache(url:string, cacheName:string, min=1){
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(url);
    const now = Date.now();
    const timer = min * 20 * 1000;
    if (cachedResponse) {
        //console.log(`Serving from cache: ${url}`);
        const cachedData = await cachedResponse.json();
        const cachedTime = cachedData.exp;
        if (now - cachedTime < timer) {
            console.log(now - cachedTime)
            console.log(timer)
            return cachedData;
        }else{
            const deleted = await cache.delete(url);
            if(deleted) return fetchDataWithCache(url, cacheName, min);
        }
        
    } else {
        //console.log(`Fetching from network: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const date = new Date();
        const exp = new Date(date.getTime()+timer).getTime();
        await cache.put(url, new Response(JSON.stringify({...data, exp}), {
            headers: { 'Content-Type': 'application/json' }
        }));
        setTimeout(async () => {
            const cache = await caches.open(cacheName);
            await cache.delete(url); //console.log('Cache cleared.');
        }, timer);
        return data;
    }
}
