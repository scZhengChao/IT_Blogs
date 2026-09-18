# Proxy

- 代理：将对象变为响应式

```typescript 
namespace a {
  type Proxy<T> = {
    get(): T,
    set(value: T): void
  }

  type Proxity<T> = {
    [P in keyof T]: Proxy<T[P]>;
  }

  function proxity<T>(obj: T): Proxity<T> {
    let result = <Proxity<T>>{};
    for (const key in obj) {
      Object.defineProperty(result, key, {
        enumerable: true,
        configurable: true,
        get: () => {
          return obj[key];
        },
        set: (value) => {
          obj[key] = value;
        }
      })
    }
    return result;
  }
  interface Props {
    name: string,
    age: number
  }
  let obj: Props = {
    name: '张三',
    age: 10
  }
  obj.name = '李四'
  let res = proxity<Props>(obj);
  console.log(res); // { name: [Getter/Setter], age: [Getter/Setter] }
}

```
