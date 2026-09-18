# ConnectedFn

- [https://github.com/LeetCode-OpenSource/hire/blob/master/typescript\_zh.md](https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md "https://github.com/LeetCode-OpenSource/hire/blob/master/typescript_zh.md")

```typescript 
type Origin = {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>
  syncMethod<T, U>(action: Action<T>): Action<U>
}
type Result = {
  asyncMethod<T, U>(input: T): Action<U>;
  syncMethod<T, U>(action: T): Action<U>;
}
type ExtractFun<T> = {
  [key in keyof T]: T[key] extends Function ? key: never;
}[keyof T];
type onlyFunKey<T> = ExtractFun<T>;  // 只获取fn 的部分key

// type test0 = onlyFunKey<Origin>;
type PickFun<T> = Pick<T, onlyFunKey<T>>; // 挑选出上一步 fn key 的值
type test0 = PickFun<Origin>;

type TmpAsyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>
type TransformAsyncFn<T> = T extends (input: Promise<infer P>) => Promise<Action<infer K>> ? (input: P) => Action<K>: never;
type test1<T,U> = TransformAsyncFn<TmpAsyncMethod<T,U>>;
type TmpSyncMethod<T, U> = (action: Action<T>) => Action<U>
type TransformSyncFn<T> = T extends (action: Action<infer P>) => Action<infer K> ? (action: P) => Action<K>: never;
type TransformFn<T> = T extends (input: Promise<infer P>) => Promise<Action<infer K>> ? (input: P) => Action<K>
: T extends (action: Action<infer P>) => Action<infer K> ? (action: P) => Action<K>
: never;
type test2<T,U> = TransformFn<TmpAsyncMethod<T,U>>;
type test3<T,U> = TransformFn<TmpSyncMethod<T,U>>;
type ConnectedFn<T> = {
  [key in keyof PickFun<T>]: TransformFn<PickFun<T>[key]>;
}
type test4<T, U> = ConnectedFn<Origin>;

```


- [https://juejin.cn/post/6994102811218673700#heading-14](https://juejin.cn/post/6994102811218673700#heading-14 "https://juejin.cn/post/6994102811218673700#heading-14")
