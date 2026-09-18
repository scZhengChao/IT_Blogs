# unProxy

- 取消代理

```typescript 
namespace a {
  type Proxy<T> = {
    get(): T,
    set(value: T): void
  }

  type Proxity<T> = {
    [P in keyof T]: Proxy<T[P]>;
  }
  
  function unProxity<T>(t: Proxity<T>): T {
    let result: any = {} as T;
    for (const key in t) {
      result[key] = t[key];
    }
    return result;
  }

  let ret = unProxity<Props>(res);
  console.log(ret); // { name: '李四', age: 10 }
}

```
