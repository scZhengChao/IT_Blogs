# 计数

## 目录

- [😇 加减运算](#-加减运算)

ts 类型是**无法进行数学加减运算的，有运算或者计数的诉求，都可以构建一个元组，用元组的 length 来计数**

```typescript 
type FlattenDepth<
  T extends unknown[],
  Depth extends number = 1,
  Count extends 1[] = []
> =
  Count['length'] extends Depth
  ? T
  : T extends [infer Head, ...infer Tail]
    ? Head extends unknown[]
      ? [
          ...FlattenDepth<Head, Depth, [...Count, 1]>,
          ...FlattenDepth<Tail, Depth, Count>
        ]
      : [
          Head,
          ...FlattenDepth<Tail, Depth, Count>
        ]
    : [];
    
type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> 
// [1, 2, 3, 4, [5]]. flattern 2 times

type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> 
// [1, 2, 3, 4, [[5]]]. Depth defaults to be 1

```


## 😇 加减运算

用上面计数相同的思想，我们甚至可以用类型计算斐波拉契数列：

```typescript 
type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [''],
  Prev extends any[] = [],
  Current extends any[] = ['']
> =
  CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<
      T,
      [...CurrentIndex, ''],
      Current,
      [...Prev, ...Current]
    >;
type ResultFibonacci1 = Fibonacci<3> // 2
type ResultFibonacci2 = Fibonacci<8> // 21

```
