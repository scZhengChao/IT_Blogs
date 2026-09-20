# never

## 目录

- [其他类型求交集为自身，求并集不参与运算。](#其他类型求交集为自身求并集不参与运算)
- [never 在联合类型中会被过滤掉：](#never-在联合类型中会被过滤掉)
- [映射类型中所有 value 为指定类型的 key。](#映射类型中所有-value-为指定类型的-key)
- [防御性编程](#防御性编程)
- [判断 never](#判断-never)
- [T extends never的作用](#T-extends-never的作用)

**是其他任意类型的子类型的类型被称为底部类型(bottom type)。**

#### **其他类型求交集为自身**，**求并集不参与运算。**

在 TypeScript 中，never 类型便为空类型和底部类型。never 类型的**变量无法被赋值**，与**其他类型求交集为自身**，**求并集不参与运算。**

`never`**类型表示的是那些永不存在的值的类型**。

有些情况下值会永不存在，比如，

- 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值，因为抛出异常会直接中断程序运行。
- 函数中**执行无限循环的代码**，使得程序永远无法运行到函数返回值那一步。

```javascript 
const foo = () => { // foo 没有返回，被推断为 () => void
    doSomething();
};
const bar = () => { // bar 总执行不完，被推断为 () => never
    throw new Error();
};
// 异常
function fn(msg: string): never { 
  throw new Error(msg)
}

// 死循环 千万别这么写，会内存溢出
function fn(): never { 
  while (true) {}
}


```


![](./image/image_WVeX2aZkd4.png)

#### never 在联合类型中会被过滤掉：

```typescript 
type Exclude<T, U> = T extends U ? never : T;
// 相当于: type A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>
T | never // 结果为T
T & never // 结果为never
```


#### 映射类型中所有 value 为指定类型的 key。

取一个映射类型中所有 value 为指定类型的 key。例如，已知某个 React 组件的 props 类型，我需要“知道”（编程意义上）哪些参数是 function 类型。

```typescript 
interface SomeProps {
    a: string
    b: number
    c: (e: MouseEvent) => void
    d: (e: TouchEvent) => void
}
// 如何得到 'c' | 'd' ？ 
type GetKeyByValueType<T, Condition> = {
    [K in keyof T]: T[K] extends Condition ? K : never
} [keyof T];
type FunctionPropNames =  GetKeyByValueType<SomeProps, Function>;    // 'c' | 'd'
```


运算过程如下：

```typescript 
// 开始
{
    a: string
    b: number
    c: (e: MouseEvent) => void
    d: (e: TouchEvent) => void
}
// 第一步，条件映射
{
    a: never
    b: never
    c: 'c'
    d: 'd'
}
// 第二步，索引取值
never | never | 'c' | 'd'
// never的性质
'c' | 'd'
```


#### 防御性编程

举个具体点的例子，当你有一个 union type:

```typescript 
interface Foo {   type: 'foo' } 
interface Bar {   type: 'bar' } 
type All = Foo | Bar
```


在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：

```typescript 
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}
```


注意在 default 里面我们把被**收窄为 never 的 val 赋值给一个显式声明为 never 的变量**。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 All 的类型：

`type All = Foo | Bar | Baz`

然而他忘记了在 handleValue 里面加上针对 Baz 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。所以通过这个办法，你**可以确保 handleValue 总是穷尽 (exhaust) 了所有 All 的可能类型。**

## 判断 never

先来看一个反直觉的现象：

```typescript 
// 1.
type JudgeNever = never extends never ? true : false; // true
// 2.
type TryIsNever<T extends any> = T extends never ? true : false;
type testTryIsNever = TryIsNever<never> // never
// 3.
type IsNever<T extends any> = [T] extends [never] ? true : false;
type testIsNever = IsNever<never>  // true

```


非常难以理解是不

大概意思就是：never 是一个特殊的联合类型（它本身是一个底部类型），它没有任何一个成员，而根据 Distributive Conditional Types，联合类型作为泛型传入后，会分开计算，**因此当输入是 never 时，因为他一个成员都没有，自然也不需要计算了，直接返回 never**。而`[T]`是 ts 实现的一个特性，能够打破这种 Distributive Conditional Types 规则。

然后似乎范型默认是当联合类型处理条件语句？所以 1 和 2 的结构不同 

如果不能理解咱就记住：`[T] extends [never]`只能这么判断类型是否是 never

# T extends never的作用

解析：<https://github.com/type-challenges/type-challenges/issues/22792、><https://github.com/type-challenges/type-challenges/issues/1140>

```typescript 
type IsUnion<T, Copy = T> =
  [T] extends [never]
    ? false
    : T extends never
      ? false
      : [Copy] extends [T]
        ? false
        : true
;
type TestN<T, Copy = T> = T extends never
      ? false : [Copy] extends [T] ? false : true;
type TestNI = TestN<string | number> // true
type TestNC<T, Copy = T> = [Copy] extends [T] ? false : true;
type TestNCI = TestNC<string | number> // false


```


为什么 TestNI 和 TestNCI 如此不同， T extends never的作用究竟是什么？

让我们来看看：

```typescript 
type Hmm<T> = keyof T extends never ? true : false
// 如前人所说是true
// 1.
type testMapVal = Hmm<{ a: string } | { b: string }> // true
type testUnionMapKeyType = keyof ({ a: string } | { b: string }) // never
// 几个没有共同属性的映射类型的联合类型的keyof 是never
type TestUnkown<T> = T extends never ? true : false;
// 2.
type testUnionMapKey = TestUnkown<keyof ({ a: string } | { b: string })> // never

```


1 和 2 的差异乍一看很奇怪，但是看了上一张我们知道 1 中 keyof T extends never等同于\*\*` never extends never就是 true`**。2 中 keyof 是**先求值再作为范型传进\*\*去，按照联合类型分配律，never 这个底部类型组成的联合类型没有成员，不会执行条件语句，也就返回 never 了。

再回头看看这一段

```typescript 
type IsUnion<T, Copy = T> =
  [T] extends [never]
    ? false
    : T extends never
      ? false
      : [Copy] extends [T]
        ? false
        : true
;

```


- 第 1 个条件让 T 为 never 类型时返回 false
- 第 2 个条件是进行联合类型进行分配律拆解进入下一步骤的桥梁？并不是用来做条件判断的，上一步已经排除 never 类型后，这里都会判断为不成立。
- 第 3 个条件`[Copy] extends [T]`是要求**不使用分配律来判断结果**，大胆推测这里只是不对 copy 用分配律，copy 只能是联合类型，T 依旧可以是联合类型中的某一个，所以联合类型`[number|string] extends [string]`就会进入到为假的语句里返回 true，有且只有联合类型能做到这样

啊。。。我强行解释也解释不了了，谁能解释留言教教我 🐶。

回到这题不纠结 never，肯能换种写法更好理解

```typescript 
IsUnion<T, B = T> = [T] extends [never] 
  ? false 
  : (T extends T 
     ? [B] extends [T] 
      ? false 
      : true 
     : never
  );

```


这里还有一个技巧IsUnion\<T, B = T>**看上去 B 和 T 是一样**，但**其实当 T 为联合类型时，B 可能为其中任意一种子类型**，譬如T是string|number，B 可以是number
