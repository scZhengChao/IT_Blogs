# 变异与副作用

## 目录

- [变异数组和 React](#变异数组和-React)
- [新方法可随副本变化](#新方法可随副本变化)
  - [Array.prototype.toSorted](#ArrayprototypetoSorted)
  - [Array.prototype.toReversed](#ArrayprototypetoReversed)
  - [Array.prototype.toSpliced](#ArrayprototypetoSpliced)
  - [Array.prototype.with](#Arrayprototypewith)
- [不只是数组](#不只是数组)
- [注意事项](#注意事项)

Array 对象总是有点自我分裂。sort、reverse 和 splice 等方法会就地更改数组，

concat、map 和 filter 等其他方法则是先创建数组副本，再对副本执行操作。当我们通过操作让对象产生变异时，则会产生一种副作用，导致系统其他位置发生意外行为。

举例来说，当 reverse 一个数组时会发生如下情况。

```typescript 
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const reversed = languages.reverse();
console.log(reversed);
// => [ 'CoffeeScript', 'TypeScript', 'JavaScript' ]
console.log(languages);
// => [ 'CoffeeScript', 'TypeScript', 'JavaScript' ]
console.log(Object.is(languages, reversed));
// => true

```


可以看到，原始数组已经反转，但即使我们将反转数组的结果分配给一个新变量，两个变量也仍指向同一数组。

## 变异数组和 React

数组变异方法中一个最著名的问题，就是在 React 组件中使用时的异常。我们无法变异数组，之后尝试将其设置为新状态，因为数组本身是同一个对象且不会触发新的渲染。相反，我们需要先复制该数组，然后改变副本再将其设置为新状态。因此，React 文档专门有一整页解释了如何更新状态数组。

先复制，后变异

解决这个问题的方法，是先复制数组，之后再执行变异。我们可以通过几种不同方法来生成数组副本，包括：Array.from，展开运算符，或者调用不带参数的 slice 函数。

```typescript 
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const reversed = Array.from(languages).reverse();
// => [ 'CoffeeScript', 'TypeScript', 'JavaScript' ]
console.log(languages);
// => [ 'JavaScript', 'TypeScript', 'CoffeeScript' ]
console.log(Object.is(languages, reversed));
// => false

```


有办法能解决当然很好，总之请千万**注意不同复制操作间是有区别**的。

## 新方法可随副本变化

此次公布的新方法正是为此而生。toSorted、toReversed、toSpliced 和 with 都能复制原始数组、变更副本再返回结果。如此一来，每项操作都更易于编写，开发者只需调用一个函数即可，代码阅读起来也更容易、不必预先考虑到底要用具体哪种数组复制方法。下面，我们来看这几种新方法的区别。

### Array.prototype.toSorted

其中 toSorted 函数会返回一个新的、经过排序的数组。

```typescript 

const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const sorted = languages.toSorted();
console.log(sorted);
// => [ 'CoffeeScript', 'JavaScript', 'TypeScript' ]
console.log(languages);
// => [ 'JavaScript', 'TypeScript', 'CoffeeScript' ]

```


除了复制之外，sort 函数还会引发一些意想不到的行为，toSorted 也继承了这种特点。所以在对带有重音字符的数字或字符串进行排序时，大家仍然要小心。比如准备一个 comparator 比较器函数（例如 String's localeCompare）来生成当前查找的结果。

```typescript 

const numbers = [5, 3, 10, 7, 1];
const sorted = numbers.toSorted();
console.log(sorted);
// => [ 1, 10, 3, 5, 7 ]
const sortedCorrectly = numbers.toSorted((a, b) => a - b);
console.log(sortedCorrectly);
// => [ 1, 3, 5, 7, 10 ]

```


```typescript 

const strings = ["abc", "äbc", "def"];
const sorted = strings.toSorted();
console.log(sorted);
// => [ 'abc', 'def', 'äbc' ]
const sortedCorrectly = strings.toSorted((a, b) => a.localeCompare(b));
console.log(sortedCorrectly);
// => [ 'abc', 'äbc', 'def' ]

```


### Array.prototype.toReversed

使用 toReversed 函数，会返回一个按相反顺序排序的新数组。

```typescript 
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const reversed = languages.toReversed();
console.log(reversed);
// => [ 'CoffeeScript', 'TypeScript', 'JavaScript' ]

```


之前将 reverse 的结果分配给新变量时会出问题，因为原始数组也发生了变异。但现在，大家可以使用 toReversed 或者 toSorted 来复制数组并更改副本。

### Array.prototype.toSpliced

toSpliced 函数与原始版本的 splice 略有不同。splice 是在提供的索引处删除和添加元素来更改现有数组，再返回一个包含数组中所删除元素的数组。toSpliced 则直接返回一个新数组，其中不含被删除的元素，且包含所添加的元素。其工作方式如下：

```typescript 
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const spliced = languages.toSpliced(2, 1, "Dart", "WebAssembly");
console.log(spliced);
// => [ 'JavaScript', 'TypeScript', 'Dart', 'WebAssembly' ]

```


如果我们使用 splice 作为返回值，那么 toSpliced 就不能直接作为替代使用。换言之，如果大家想在不改变原始数组的情况下知晓被删除的元素是什么，就应使用 slice 复制方法。

更麻烦的是，splice 和 slice 使用的参数也有不同。splice 使用的是一个索引加该索引之后待删除的元素数量；slice 则使用两个索引，分别对应开始和结束。如果要使用 toSpliced 代替 splice，但又想获取被删除的元素，则可对原始数组应用 toSpliced 和 slice，如下所示：

```typescript 

const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
const startDeletingAt = 2;
const deleteCount = 1;
const  spliced = languages.toSpliced(startDeletingAt, deleteCount, "Dart", "WebAssembly");
 const removed  = languages.slice(startDeletingAt, startDeletingAt + deleteCount);
 console.log(spliced);
// => [ 'JavaScript', 'TypeScript', 'Dart', 'WebAssembly' ]
console.log(removed);
// => [ 'CoffeeScript' ]
```


### Array.prototype.with

with 函数所代表的复制方法，等同于使用**方括号表示方来更改数组内的一个元素**。因此，与其通过以下方式直接更改数组：

```typescript 
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
languages[2] = "WebAssembly";
console.log(languages);
// => [ 'JavaScript', 'TypeScript', 'WebAssembly' ]

```


可以复制该数组再执行更改：

```typescript 
const languages = ["JavaScript", "TypeScript", "CoffeeScript"];
 const updated = languages.with(2, "WebAssembly"); 
console.log(updated);
// => [ 'JavaScript', 'TypeScript', 'WebAssembly' ]
console.log(languages);
// => [ 'JavaScript', 'TypeScript', CoffeeScript' ]
```


## 不只是数组

此次发布的新方法不仅适用于常规的数组对象。您可以在任意 TypedArray 上使用 toSorted、toReversed 和 with 方法，包括 Int8Array 到 BigUint64Array 等各种类型。但因为 TypedArrays 没有 splice 方法，因此无法使用 toSpliced 方法。

# 注意事项

前文提到，map、filter 和 concat 等方法也都采取**先复制再更改**的思路，但这些方法与新的复制方法间仍有不同。如果对内置的 Array 对象进行扩展，并在实例上使用 map、flatMap、filter 或 concat，则会返回相同类型的新实例。但如果您扩展一个 Array 并使用 toSorted、toReversed、toSpliced 或者 with，则返回的仍是普通 Array。
