# 转换

## 目录

- [pluck](#pluck)
- [toPairs](#toPairs)

# `pluck`

`pluck` 函数通过从提供的列表中的所有对象中提取指定属性来返回一个新列表。

```javascript 
import * as R from 'ramda';

const users = [
  { name: 'John', age: 25 },
  { name: 'Lenny', age: 51 },
  { name: 'Andrew', age: 43 },
  { name: 'Peter', age: 81 },
  { name: 'Anna', age: 43 },
  { name: 'Albert', age: 76 },
  { name: 'Adam', age: 47 },
  { name: 'Robert', age: 72 }
];

console.log(R.pluck('age', users));
console.log(R.pluck('name', users));

```


从列表内的每个对象元素中取出特定名称的属性，组成一个新的列表。

`pluck` 可以作用于任何 [functor](https://github.com/fantasyland/fantasy-land#functor "functor") ，包括 `Array`，因为它等价于 `R.map(R.prop(k), f)`。

```r 
var getAges = R.pluck('age');
getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]

R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
```


# toPairs

Converts an object into an array of key, value arrays. Only the object's own properties are used. Note that the order of the output array is not guaranteed to be consistent across different JS platforms.

See also[fromPairs](https://ramdajs.com/docs/#fromPairs "fromPairs"),[keys](https://ramdajs.com/docs/#keys "keys"),[values](https://ramdajs.com/docs/#values "values").

```typescript 
R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]

```
