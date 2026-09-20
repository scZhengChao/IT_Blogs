# 迭代器

## 目录

- [symbol.Iterator迭代器](#symbolIterator迭代器)
- [定义](#定义)
- [默认的 Iterator 接口](#默认的-Iterator-接口)
- [Iterator 生成函数](#Iterator-生成函数)
- [内置](#内置)
  - [对象](#对象)
  - [数组](#数组)
  - [字符串](#字符串)
  - [map](#map)
  - [set](#set)
- [场景](#场景)
  - [for...of](#forof)
  - [解构赋值](#解构赋值)
  - [扩展运算符](#扩展运算符)
- [总结：](#总结)
- [案例](#案例)

## symbol.Iterator**迭代器**

# **定义**

[**Symbol**](https://so.csdn.net/so/search?q=Symbol\&spm=1001.2101.3001.7020 "Symbol")\*\*`.iterator `\*\***为每一个对象定义了默认的迭代器。该迭代器可以被 for…of 循环使用。**

# 默认的 Iterator 接口

&#x20;      当需要对一个**对象进行迭代时**（比如开始用于**一个for…of循环中**），它的@@iterator方法都会在不传参情况下被调用，返回的迭代器用于获取要迭代的值

哪些数据结构具有默认的 Iterator 接口，哪些数据结构没有呢？

- 对象（`Object`）是没有默认的 Iterator 接口；
- `Array`，`Map`，`Set`，`String`，`TypedArray`，函数的 `arguments` 对象，`NodeList` 对象是**具有默认的 Iterator 接口。**

**示例**：我们可以像下面这样创建自定义的迭代器：

```typescript 
var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...myIterable]); // [1, 2, 3]
```


**不符合标准的迭代器****:** 如果一个迭代器 @@iterator **没有返回一个迭代器对象，** 那么它就是一个不符合标准的迭代器，这样的迭代器将会在运行期抛出异常，甚至非常诡异的 Bug。

```typescript 
var nonWellFormedIterable = {}
nonWellFormedIterable[Symbol.iterator] = () => 1
[...nonWellFormedIterable] // TypeError: [] is not a function

```


# Iterator 生成函数

我们可以自己写一个 Iterator 生成函数，并模拟遍历过程：

```typescript 
function myIterator(array) {
    const nextIndex = 0;
    return {
        next: function() {
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} : 
                {value: undefined, done: true}
        }
    }
}

// 遍历器接口
const myIt = myIterator([1,2,3]);
myIt.next() // { value: 1, done: false }
myIt.next() // { value: 2, done: false }
myIt.next() // { value: 3, done: false }
myIt.next() // { value: undefined, done: true }
```


Iterator 对象的具体遍历过程是这样的：

- 第一次调用 next() 方法，返回数据结构中第一个元素的信息对象。
- 第二次调用 next() 方法，返回数据结构中第二个元素的信息对象。
- 不断调用 next() 方法，直到返回的信息对象中 done 属性为 true。

# 内置

**一些内置类型拥有默认的迭代器行为：**

```typescript 
{
  // ES6 Symbol.iterator迭代器
   // 数组身上天生具备Symbol.iterator 
  let arr = ['hello','world'];
  let map = arr[Symbol.iterator]();
  console.log(map.next()); //{value: "hello", done: false}
  console.log(map.next()); //{value: "world", done: false}
  console.log(map.next()); //{value: undefined, done: true} 
  //done为true时表示当前没有更多可返回数据
}
```


&#x20;         上面的代码中，变量arr是一个**数组**，**原生就具有遍历器接口**，部署**在arr的Symbol.iterator属性上面**，就得到遍历器对象。
&#x20;          对于**原生部署Iterator接口的**数据结构，**不用自己写遍历器生成函数，for…of循环会自动遍历他们**，除此之外，其他数据结构（主要是对象）的Iterator接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for…of循环遍历。

#### 对象

**下面是不正确的用法**：

```typescript 
//Object身上没有Symbol.iterator，当直接使用时会报错 
{
  let obj = {
    a:1,
    b:2,
    c:3
  }
  
  console.log([...obj]); // error obj is not iterable
  for(let key of obj) {
     console.log(key); //error obj is not iterable
   }
}
```


&#x20;        对象（Object）之所以没有默认部署Iterator接口，**是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者自己手动指定。**

&#x20;     本质上，遍历器是一种**线性处理，对于任何飞非线性结构的数据结构，部署遍历器接口，就等于部署一种线性转换**。不过，严格地说，对象部署遍历器接口并不是很必要的，因为这**是对象实际上被当做Map数据结构**使用，**ES5没有Map结构，而ES6原生提供了。**
下面是另一个为对象添加 Iterator 接口的例子：

```typescript 
//在Object上自定义Symbol.iterator接口部署
{
  let obj = {
    start:[1,3,2],
    end:[7,9,8],
     //声明格式
    [Symbol.iterator](){
      let self = this;
      let index = 0;
      let arr = self.start.concat(self.end);//数组拼接
      let len = arr.length;
      //必须返回一个next对象包含value和done
      return {
        next(){
          if(index < len) {
            return {
              value:arr[index++],
              done:false
            }
          }else {
            return {
              value:arr[index++],
              done:true
            }
          }
        }
      }
    }
   }

  for(let key of obj) {
    console.log(key); 
  }
  //打印结果 1,3,2,7,9,8
}
```


#### 数组

**一些内置类型拥有默认的迭代器行为，调用 Iterator 接口的例子**：

```typescript 
//数组拥有默认的迭代器行为
//for of背后应用的正是iterator接口
{
  let arr = ['hello','world'];
  for(let value of arr){
    console.log('value',value); //value hello , value world
  }
}

```


#### 字符串

```typescript 
//字符串拥有默认的迭代器行为 
{
  let str = 'abc';
  for(let a of str){
    console.log(a); //a b c
  }
}
```


#### map

#### set

```javascript 
// for 循环遍历 Set
const s = new Set([1,2,3])
for (let j = 0; j < s.size; j++) {
    console.log(s[j]); // undefined undefined undefined
}
```


```javascript 
const s = new Set(['a','b','c']);
const iter = s[Symbol.iterator]();
iter.next(); // { value: 'a', done: false }
iter.next(); // { value: 'b', done: false }
iter.next(); // { value: 'c', done: false }
iter.next(); // { value: undefined, done: true }
```


# 场景

### **`for...of`**

除了上文讲到 **`for...of`** 遍历会默认调用 Iterator 接口之外，还有两个常见的场景也有默认调用。

### 解构赋值

对数组和 `Set` 结构进行解构赋值时，会默认调用 Iterator 接口。

```typescript 
const s = new Set(['a','b','c']);
const [x,y,z] = set;
// x='a', y='b', z='c'
```


解构赋值的语法内部就是不断调用 Iterator 接口的 `next()` 方法，拿到 `value` 属性值（也就是该元素值）对解构赋值的变量进行一一对应的赋值。

### 扩展运算符

扩展运算符（…）也会调用默认的 Iterator 接口。

```typescript 
const str = 'hello';
[...str]  // ['h','e','l','l','o']

const arr = ['b', 'c'];
['a', ...arr, 'd']  // ['a', 'b', 'c', 'd']
```


扩展运算符其实可以看成是 `for...of` 遍历的语法糖。

# 总结：

- 当对一个对象进行迭代时，他的默认迭代器会自动调用，一些内置类型拥有默认的迭代器行为，除了Objet没有，需要开发者手动部署Symbol.iterator属性;
- 一个数据结构主要本身拥有默认的迭代器行为或者部署了Symbol.iterator属性，就可以使用for…of遍历和…(扩展运算符)操作;
- 自定义创建的迭代器返回的**一定需要是一个迭代器对象**。
- **一个数据结构只要部署了Symbol.iterator属性就能使用 for…of遍历 与 …运算符操作：**
- **一个对象如果要具备可被for…of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法**
- 当使用 `for...of` 进行遍历时，**内部原理每次都会调用 ****`next()`**** 方法**，
- 本质上，遍历器是一种**线性处理，对于任何飞非线性结构的数据结构，部署遍历器接口，就等于部署一种线性转换**。
- **一种统一的接口机制**，来**处理所有数据结构的遍历**，遍历器（Iterator）就是这样一种机制，它是**一个接口**，为**各种不同的数据结构提供统一的访问机制**，任何**数据结构**只要**有了 Iterator 接口**，就可以通过 `for...of` 进行遍历。

# 案例

[yocto-queue 链表队列](<../../../../../前端专题/数据结构/数据结构/链表/yocto-queue 链表队列/index.md> "yocto-queue 链表队列")

[如何让 var \[a, b\] = {a: 1, b: 2} 解构赋值成功？](<./如何让 var [a- b] = {a- 1- b- 2} /如何让 var [a- b] = {a- 1- b- 2} 解构赋值成功？.md> "如何让 var \[a, b] = {a: 1, b: 2} 解构赋值成功？")

[遍历](IT/前端基础/EcmaScript/Object/高级/迭代器/遍历/遍历.md "遍历")
