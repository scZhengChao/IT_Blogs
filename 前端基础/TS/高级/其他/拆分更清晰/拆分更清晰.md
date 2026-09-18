# 拆分更清晰

一个类型推导拆成几个步骤，实现几个中间态的推导类型，就类似把一个大函数拆散，并且还可以方便的拥有了存储的中间态类型，也能能有效减少条件语句的分支数量。

实现类型 PercentageParser。根据规则 `/^(\+|\-)?(\d*)?(\%)?$/` 匹配类型 T。

匹配的结果由三部分组成，分别是：\[正负号, 数字, 单位]，如果没有匹配，则默认是空字符串。

```typescript 
type Symbol = "+" | "-";
type PercentageParser<A extends string> =
  A extends `${infer F extends Symbol}${infer R}%`
    ? [F, R, "%"]
    : A extends `${infer F extends Symbol}${infer R}`
    ? [F, R, ""]
    : A extends `${infer R}%`
    ? ["", R, "%"]
    : ["", A, ""];


```


```typescript 
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'
type R1 = PercentageParser<PString1> // expected ['', '', '']
type R2 = PercentageParser<PString2> // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3> // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4> // expected ["", "85", "%"]
type R5 = PercentageParser<PString5> // expected ["", "85", ""]

```


```typescript 
type ParseSign<T extends string> =
  T extends `${infer Head}${string}`
    ? Head extends '+' | '-'
      ? Head
      : ''
    : '';
type ParsePercent<T extends string> =
  T extends `${string}%`
    ? '%'
    : '';
type ParseNumber<T extends string> =
  T extends `${ParseSign<T>}${infer N}${ParsePercent<T>}`
    ? N
    : '';
type PercentageParser<T extends string> = [
  ParseSign<T>,
  ParseNumber<T>,
  ParsePercent<T>,
];

```
