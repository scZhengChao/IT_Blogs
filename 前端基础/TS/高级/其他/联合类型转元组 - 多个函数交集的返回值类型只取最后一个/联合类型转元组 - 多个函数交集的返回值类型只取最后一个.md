# 联合类型转元组 - 多个函数交集的返回值类型只取最后一个

(()=>a) & (()=>b) & (()=>c)获得这些函数返回值会是c

```typescript 
// 需要了解性质：多个函数交集的返回值类型只取最后一个！(This is Important!)
// 例如：
// type Intersepted = (() => 'a') & (() => 'b') & (() => 'c')
// type Last = Intersepted extends () => infer R ? R : never // 'c'
// 参考：https://github.com/type-challenges/type-challenges/issues/21658#issue-1523555097

/**并集转交集 */
type UnionToIntersection<T> = (T extends T ? (args: T) => any : never) 
  extends (args: infer P) => any 
  ? P 
  : never;    
// a | b | c ==> a & b & c
  
/**联合类型最后一个 */
type UnionLast<T> = (UnionToIntersection<T extends T ? () => T : never>) 
  extends () => infer R ? R : never;           
// a | b | c ==> (()=>a) | (()=>b) | (()=>c) ==> (()=>a) & (()=>b) & (()=>c) ==> c

type UnionToTuple<T> = [T] extends [never] 
  ? [] 
  : [UnionLast<T>, ...UnionToTuple<Exclude<T, UnionLast<T>>>];
type TestUnionToTuple1 = UnionToTuple<1>           // [1]
type TestUnionToTuple2 = UnionToTuple<'any' | 'a'> // ['any','a']
Equal<UnionToTuple<any | 'a'>, UnionToTuple<any>>         // will always be a true
Equal<UnionToTuple<unknown | 'a'>,UnionToTuple<unknown>>     // will always be a true
Equal<UnionToTuple<never | 'a'>, UnionToTuple<'a'>>         // will always be a true
Equal<UnionToTuple<'a'|'a'|'a'>,UnionToTuple<'a'>>         // will always be a true  
```
