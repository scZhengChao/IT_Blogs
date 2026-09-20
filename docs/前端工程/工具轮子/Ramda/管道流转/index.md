# 管道流转

## 目录

- [compose](#compose)
- [pipe](#pipe)
- [useWith](#useWith)
- [converge](#converge)
- [curry](#curry)

# compose

从右往左执行函数组合（右侧函数的输出作为左侧函数的输入）。**最后一个函数可以是任意元函数（参数个数不限），其余函数必须是一元函数。**

**注意：** compose 输出的函数不会自动进行柯里化。

```javascript 
const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
const yellGreeting = R.compose(R.toUpper, classyGreeting);
yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"

R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7

```


# `pipe`

从左往右执行函数组合。第一个函数可以是任意元函数 **（参数个数不限），其余函数必须是一元函数**。

在一些库中，此函数也被称为 `sequence`。

\*\* 注意：\*\* `pipe` 函数的结果不是自动柯里化的。

```javascript 
const f = R.pipe(Math.pow, R.negate, R.inc);

f(3, 4); // -(3^4) + 1

```


# useWith

接受一个函数 `fn` 和一个\*\* transformer 函数的列表\*\*，返回一个柯里化的新函数。当被调用时，新函数将每**个参数转发给对应位置的 transformer 函数**，然后将每个 transformer **函数的计算结果作为参数传递给 ****`fn`****，****`fn`**** 的计算结果即新函数的返回值。**

如果新函数传传入参数的数量比 transformer 函数的数量多，多出的参数会作为附加参数直接传给 `fn` 。如果不需要处理多出的那部分参数，除了忽略之外，也可以用 identity 函数来作为 transformer ，以保证新函数的参数数量是确定的。

```javascript 
R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32

```


# converge

接受一个 `converging` 函数和**一个分支函数列表**，返回一个新函数。新函数的元数（参数个数）**等于最长分支函数的元数**。当被调用时，新函数接受参数，**并将这些参数转发给每个分支函数**；然后将每个分支函数的计算结果作为参数传递给 `converging` 函数，`converging` 函数的计算结果即新函数的返回值。

```javascript 
const average = R.converge(R.divide, [R.sum, R.length])
average([1, 2, 3, 4, 5, 6, 7]) //=> 4

const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
strangeConcat("Yodel") //=> "YODELyodel"

```


# curry

对函数进行柯里化。柯里化函数与其他语言中的柯里化函数相比，有两个非常好的特性：

1. **参数不需要一次只传入一个**。如果 `f` 是三元函数，`g` 是 `R.curry(f)` ，则下列写法是等价的：

- `g(1)(2)(3)`
- `g(1)(2, 3)`
- `g(1, 2)(3)`
- `g(1, 2, 3)`

1. 占位符值 [R.\_\_](https://ramda.cn/docs/#__ "R.__") 可用于标记暂未传入参数的位置。**允许部分应用于任何参数组合，而无需关心它们的位置和顺序**。假设 `g` 定义如前所示，`_` 代表 [R.\_\_](https://ramda.cn/docs/#__ "R.__") ，则下列写法是等价的：

- `g(1, 2, 3)`
- `g(_, 2, 3)(1)`
- `g(_, _, 3)(1)(2)`
- `g(_, _, 3)(1, 2)`
- `g(_, 2)(1)(3)`
- `g(_, 2)(1, 3)`
- `g(_, 2)(_, 3)(1)`

```javascript 
const addFourNumbers = (a, b, c, d) => a + b + c + d;

const curriedAddFourNumbers = R.curry(addFourNumbers);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
g(4); //=> 10

```
