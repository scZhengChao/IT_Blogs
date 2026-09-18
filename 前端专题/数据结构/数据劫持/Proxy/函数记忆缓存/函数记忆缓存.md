# 函数记忆缓存

```javascript 
const memoize = fn => new Proxy(fn, {
  cache: new Map(),
  apply (target, thisArg, argsList) {
    let cacheKey = argsList.toString();
    if(!this.cache.has(cacheKey)). this.cache.set(cacheKey, target.apply(thisArg, argsList));
    return this.cache.get(cacheKey);
  }
});
 
const fibonacci = n => (n <= 1 ? 1 : fibonacci(n - 1) + fibonacci(n - 2));
const memoizedFibonacci = memoize(fibonacci);
 
for (let i = 0; i < 100; i ++)
  fibonacci(30);                      // ~5000ms
for (let i = 0; i < 100; i ++)
  memoizedFibonacci(30);              // ~50ms
 
```


或者再加上时间段：

```javascript 
const memoize = (fn,outTime) => new Proxy(fn, {
        cache: new Map(),
        apply (target, thisArg, argsList) {
            let cacheKey = argsList.toString();
            const currentTime = Date.now()
            if(!this.cache.has(cacheKey) ||  currentTime - this.cache.get(cacheKey).cacheTime>outTime ){
                //  this.cache.clear()   // only one cache
                this.cache.set(cacheKey, {
                    value:target.apply(thisArg, argsList),
                    cacheTime:currentTime
                });
            }
            return this.cache.get(cacheKey);
        }
    });

    const test = (a,b,c)=>{
        console.log('rrrr')
        return (a+b+c)
    }
    const memoizedFibonacci = memoize(test,3);

    for(let i = 0; i<=10000;i++)
        memoizedFibonacci(30,50,100);              // ~50ms
```
