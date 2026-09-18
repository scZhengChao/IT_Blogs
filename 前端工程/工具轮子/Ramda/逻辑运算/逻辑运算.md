# 逻辑运算

## 目录

- [reduce](#reduce)
- [allPass](#allPass)
- [anyPass](#anyPass)

# `reduce`

左折叠操作。

遍历列表，相继调用二元迭代函数（参数为累积值和从数组中取出的当前元素），将本次迭代结果作为下次迭代的累积值。返回最终累积值。

可以用 [R.reduced](https://ramda.cn/docs/#reduced "R.reduced") 提前终止遍历操作。

`reduce` 的迭代函数接收两个参数 *(acc, value)*，[reduceRight](https://ramda.cn/docs/#reduceRight "reduceRight") 的迭代函数的参数顺序为 *(value, acc)*

注意：`R.reduce` 与原生 `Array.prototype.reduce` 方法不同，它不会跳过删除或未分配的索引项（稀疏矩阵）。更多关于原生 reduce 的行为，请参考：[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Array/reduce#Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description")

如果第三个参数自身有 `reduce` 方法，则调用自身的 `reduce` 方法。如果进行该步操作，则由用户自己来处理 [R.reduced](https://ramda.cn/docs/#reduced "R.reduced") 短路操作，因为自身 `reduce` 方法的实现可能与 Ramda 中的 `reduce` 不同。

```r 
R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
//          -               -10
//         / \              / \
//        -   4           -6   4
//       / \              / \
//      -   3   ==>     -3   3
//     / \              / \
//    -   2           -1   2
//   / \              / \
//  0   1            0   1

```


`either`：接受两个函数作为参数，只要有一个返回`true`，就返回`true`，否则返回`false`。相当于`||`运算。

```javascript 
var gt10 = x => x > 10;
var even = x => x % 2 === 0;

var f = R.either(gt10, even);
f(101) // true
f(8) // true

```


`both`：接受两个函数作为参数，只有它们都返回`true`，才返回`true`，否则返回`false`，相当于`&&`运算。

```javascript 
var gt10 = x => x > 10;
var even = x => x % 2 === 0;

var f = R.both(gt10, even);
f(15) // false
f(30) // true

```


# `allPass`

`allPass`：接受一个函数数组作为参数，只有它们都返回`true`，才返回`true`，否则返回`false`。

```javascript 
var gt10 = x => x > 10;
var even = x => x % 2 === 0;

var isEvenAndGt10 = R.allPass([gt10, even]);
isEvenAndGt10(15) // false
isEvenAndGt10(30) // true

```


# [anyPass](https://ramdajs.com/docs/#anyPass "anyPass")

任何一个返回true；就返回true

```javascript 
const isClub = R.propEq('♣', 'suit');
const isSpade = R.propEq('♠', 'suit');
const isBlackCard = R.anyPass([isClub, isSpade]);

isBlackCard({rank: '10', suit: '♣'}); //=> true
isBlackCard({rank: 'Q', suit: '♠'}); //=> true
isBlackCard({rank: 'Q', suit: '♦'}); //=> false

```
