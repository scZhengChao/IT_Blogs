# compose

## 目录

- [或者](#或者)

**它是从右到左执行的。**

```typescript 
function compose(...funcs){
    if(funcs.length === 0){
        return arg=>arg
    }
    if(funcs.length === 1){
        return funcs[1]
    }
    return funcs.reduce((a,b)=>(...args)=>a(b(...args)))
}

```


# 或者

```typescript 
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);

```
