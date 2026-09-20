# InterSection

- 交集
- 返回 T 和 U 中共有的属性

```typescript 
namespace e {
  // 注意：下面这三种写法都可以
  // Extract<keyof T, keyof U> & Extract<keyof U, keyof T>
  // Extract<keyof T, keyof U>
  // Extract<keyof U, keyof T>
  type InterSection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;
  type Props = { name: string, age: number, isMan: boolean };
  type DefaultProps = { age: number };
  type DuplicateProps = InterSection<Props, DefaultProps>; // { age: number }
}


```
