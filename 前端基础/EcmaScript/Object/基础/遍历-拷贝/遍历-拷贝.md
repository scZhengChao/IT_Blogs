# 遍历/拷贝

## 目录

- [遍历](#遍历)
  - [遍历顺序：](#遍历顺序)
  - [for in](#for-in)
  - [for of](#for-of)
  - [Object.keys()](#Objectkeys)
  - [Object.getOwnPropertyNames](#ObjectgetOwnPropertyNames)
  - [Reflect.ownKeys(obj)](#ReflectownKeysobj)
  - [Object.getOwnPropertySymbols(obj)](#ObjectgetOwnPropertySymbolsobj)
  - [Object.entries](#Objectentries)
  - [fromEntries](#fromEntries)

* for...in循环：只遍历**对象自身属性**的和继承的除 Symbol 以外的**可枚举的属性。**
* JSON.stringify()：只串行化对象**自身**的可**枚举的属性。**
* Object.assign()： 忽略enumerable为false的属性，只拷贝对象**自身**的可枚举的属性。
* Object.keys()：返回对象**自身**的所有可枚举的属性的键名。
* object.values( )   对象的 value 形成的数组
* &#x20;Object.entries()   返回新数组，但是对象的每一项的值都是  \[key,value] 数组 （二维数组）

前三个是 ES5 就有的，最后一个Object.assign()是 ES6 新增的。其中，只有

for...in**会返回继承的属性，其他三个方法都会忽略继承的属性** **。** 总的来说，**操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。**

所以，尽量不要用for...in循环，而用Object.keys()代替。&#x20;

# 遍历

## 遍历顺序：

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。&#x20;

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

## for in

象自身的和继承的可枚举属性（不含 Symbol 属性）

使用for in会遍历数组所有的可枚举属性，包括原型。例如原型方法method和name属性  

所以for in更适合遍历对象，不要使用for in遍历数组

for of 跟适合遍历Map/set

```javascript 
 //对象自身的和继承的可枚举属性（不含 Symbol 属性）。 
Object.prototype.method=function(){
　　console.log(this);
}
var myObject={
　　a:1,
　　b:2,
　　c:3
}
for (var key in myObject) {
  console.log(key);
}
//for in 可以遍历到myObject的原型方法method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery方法可以判断某属性是否是该对象的实例属性

for (var key in myObject) {
　　if（myObject.hasOwnProperty(key)){
　　　　console.log(key);
　　}
}
```


## for of

- for in 和 for of 都可以循环数组，for in 输出的是数组的index下标，而for of 输出的是数组的每一项的值。

```typescript 
const arr = [1,2,3,4]
 
// for ... in
for (const key in arr){
    console.log(key) // 输出 0,1,2,3
    }
 
// for ... of
for (const key of arr){
    console.log(key) // 输出 1,2,3,4
    }
```


- for in 可以遍历对象，for of 不能遍历对象，只能遍历带有iterator接口的，例如Set,Map,String,Array

```typescript 
const object = { name: 'lx', age: 23 }
    // for ... in
    for (const key in object) {
      console.log(key) // 输出 name,age
      console.log(object[key]) // 输出 lx,23
    }
 
    // for ... of
    for (const key of object) {
      console.log(key) // 报错 Uncaught TypeError: object is not iterable
    }
```


## **Object.keys()**

返回一个数组,包括对象自身的(不含继承的)；所有可枚举属性(不含Symbol属性).

```javascript 
 //和for in 的区别 （不含继承）
//返回一个数组,包括对象自身的(不含继承的)所有可枚举属性(不含Symbol属性).

var obj = {'0':'a','1':'b','2':'c'};

Object.keys(obj).forEach(function(key){

     console.log(key,obj[key]);

});
```


## **Object.getOwnPropertyNames**

返回一个数组,包含对象自身的所有属性(不含Symbol属性,但是包括不可枚举属性). &#x20;

区别：不含Symbol属性  不含继承的   但是包括不可枚举属性

```javascript 
 
var obj = {'0':'a','1':'b','2':'c'};
Object.getOwnPropertyNames(obj).forEach(function(key){

    console.log(key,obj[key]);

});
```


## **Reflect.ownKeys(obj)**

返回一个数组,包含对象自身的所有属性,不管属性名是Symbol或字符串,也不管是否可枚举.  

区别：包括Symbol 包括不可枚举属性

```javascript 
 var obj = {'0':'a','1':'b','2':'c'};
Reflect.ownKeys(obj).forEach(function(key){

　　console.log(key,obj[key]);

});
```


## **Object.getOwnPropertySymbols(obj)**

- Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。&#x20;

## Object.entries

- 返回新数组，但是对象的每一项的值都是  \[key,value] 数组 （二维数组）

## fromEntries

- 从名字就能看出来，这是Object.entries()的逆过程。Object.fromEntries()可以将数组转化为对象。
