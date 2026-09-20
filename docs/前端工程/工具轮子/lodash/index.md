# lodash

## 目录

- [模块化引入](#模块化引入)
  - [一.引入单个函数](#一引入单个函数)
  - [二.借助 lodash-webpack-plugin，babel-plugin-lodash插件优化](#二借助-lodash-webpack-pluginbabel-plugin-lodash插件优化)
  - [三.lodash-es结合tree-shaking](#三lodash-es结合tree-shaking)
- [cloneDeep](#cloneDeep)
- [random  随机值](#random-随机值)
- [sample  ](#sample-)
- [includes：](#includes)
- [uniq](#uniq)
- [isEqual](#isEqual)
- [assign/merge ](#assignmerge-)
- [get ](#get-)
- [omit](#omit)
- [delay](#delay)
- [invert](#invert)
- [compact](#compact)
- [chunk(array, \[size=1\])](#chunkarray-size1)
- [\_.uniqBy(array, \[iteratee=\_.identity\])](#_uniqByarray-iteratee_identity)
- [ \_.unset](#-_unset)
- [\_.unionWith](#_unionWith)
- [\_.orderBy](#_orderBy)
- [\_.intersectionBy](#_intersectionBy)
- [intersection](#intersection)
- [\_.differenceWith(array, \[values\], \[comparator\])](#_differenceWitharray-values-comparator)

# 模块化引入

## **一.引入单个函数**

lodash整个安装完之后，引用方式： lodash/function 格式，单独引入某个函数，如

```typescript 
let _trim= require('lodash/trim') 
//或者 
import trim from 'lodash/trim' 
```


或者 lodash 中的每个函数在 NPM 都有一个单独的发布模块，单独安装并引用部分模块，然后按以下方式引用

```typescript 
let _trim= require('lodash.trim') 
//或者 
import trim from 'lodash.trim' 

trim(' 123123 ')
```


## **二.借助 lodash-webpack-plugin，babel-plugin-lodash插件优化**

使用上述两种方式，在使用较多个lodash中方法的情况下，不太美观，且并不方便。那么我们可以借助于lodash-webpack-plugin，去除未引入的模块，需要和babel-plugin-lodash插件配合使用。类似于webpack的tree-shaking。

1）安装插件：

```typescript 
npm i -S lodash-webpack-plugin babel-plugin-lodash
```


2）webpack.conf.js中

```typescript 
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

plugins: [ new LodashModuleReplacementPlugin()]
```


3）.babelrc中配置

```typescript 
 "plugins": ["transform-runtime","transform-vue-jsx","lodash"]
```


或者在webpack.conf.js的rules配置

```typescript 
{
  test: /\.(js|jsx)$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  include: [resolve('src'), resolve('test')]
  options: {plugins: ['lodash']}
}
```


## **三.lodash-es结合tree-shaking**

lodash-es 是着具备 ES6 模块化的版本，只需要直接引入就可以。

```typescript 
import {isEmpty,forIn, cloneDeep} from 'lodash-es'
```


**tree-shaking的作用，即移除上下文中未引用的代码（dead code）**

只有当函数给定输入后，产生相应的输出，且不修改任何外部的东西，才可以安全做shaking的操作

如何使用tree-shaking？

**1）.确保代码是es6格式,即 export，import**

**2）.package.json中，设置sideEffects**

3）.确保tree-shaking的函数没有副作用

4）.babelrc中设置presets \[\["env", { "modules": false }]] 禁止转换模块，交由webpack进行模块化处理

5）.结合uglifyjs-webpack-plugin

Loads 中文网

[Lodash 简介 | Lodash 中文文档 | Lodash 中文网 Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。 https://www.lodashjs.com/](https://www.lodashjs.com/ "Lodash 简介 | Lodash 中文文档 | Lodash 中文网 Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。 https://www.lodashjs.com/")

# **cloneDeep**

```javascript 
 深拷贝: var objB =_.cloneDeep(objA)
原生： JSON.parse(JSON.stringify( obj ) )   前提是对象里没有 函数  
```


# **random  随机值**

```javascript 
 随机值： let num = _.random(15, 20)     
        指定返回的结果为浮点数_.random(15,20,true)  
        你可以只传入一个参数作为最大值，
```


# \*\*sample  \*\*

```javascript 
 从列表中随机的选择列表项：
   var smartTeam = ["戈德斯文", "杨海月", "柴硕", "师贝贝"];
   console.log(_.sample(smartTeam));
   console.log(_.sampleSize(smartTeam,2));   //返回的是数组
```


# **includes：**

```javascript 
     var smartPerson = {
           'name': '戈德斯文',
           'gender': 'male'
       },
       smartTeam = ["戈德斯文", "杨海月", "柴硕", "师贝贝"];
   console.log(_.includes(smartPerson, 'male'));
   console.log(_.includes(smartTeam, '杨海月'));
   console.log(_.includes(smartTeam, '杨海月',2));
   _.includes()第一个参数是需要查询的对象，第二个参数是需要查询的元素，第三个参数是开始查询的下标
```


# **uniq**

\*\* 数组去重：\*\* ​

```javascript 
  _.uniq(arr2)  //[ 12, 14, 11, 1, 16, 17, 22, 2 ]  
    var a11 = Array.from(new Set(arr2))
     var a12 = [...new Set(arr2)]
```


# **isEqual**

```javascript 
 判断相等：
       var object = { 'a': 1, 'b':2};
       var other = { 'a': 1,'b':2 };
       var a15 = _.isEqual(object, other); //true
       console.log(object == other)  //false
```


# \*\*assign/merge \*\*

```javascript 
 合并对象：
console.log(_.assign(objA, objB));   类似Object.assign()
const aa = _.assign({},{a:1},{a:2},{b:3})
//{a:2,b:3}
const bb = _.merge({},{a:1},{a:2},{b:3})
//{a:2,b:3}
const a1 = _.assign({},{a:1},{b:{a:1,b:2}},{b:{a:3}})
//{a:1,b:{a:3}}
const a2 = _.merge({},{a:1},{b:{a:1,b:2}},{b:{a:3}})
//{a:1,b:{a:3,b:2}}
* 都可以用来合并对象
* 都会修改原来的对象 (如果原来的对象是作为函数的第一个参数的话)
不同之处
* assign 函数不会处理原型链上的属性，也不会合并相同的属性，而是用后面的属性值覆盖前面的属性值
* merge 遇到相同属性名的时候，如果属性值是纯对象或集合的时候，会合并属性值
```


# \*\*get \*\*

**根据 object对象的path路径获取值 \_.get  // 如果给的路劲解析出来时undefind 则会 返回第三个参数**

```javascript 
    var object = { 'a': [{ 'b': { 'c': 3 } }] };
   var data1 = _.get(object, 'a[0].b.c');  //3
   var data2 =  _.get(object, ['a', '0', 'b', 'c']);//3
   var data3 = _.get(object, 'a.b.c', 'default');  //default
```


# **omit**

```javascript 
 反向版_.pick; 这个方法一个对象，这个对象由忽略属性之外的object自身和继承的可枚举属性组成。（注：可以理解为删除object对象的属性）。
_.omit(object, [props])

var object = { 'a': 1, 'b': '2', 'c': 3 };
_.omit(object, ['a', 'c']);
// => { 'b': '2' }
```


# **delay**

```javascript 
 _.delay(func, wait, [args])
延迟 wait 毫秒后调用 func。 调用时，任何附加的参数会传给func。
添加版本
0.1.0
参数
1. func (Function): 要延迟的函数。
2. wait (number): 要延迟的毫秒数。
3. [args] (...*): 会在调用时传入到 func 的参数。

_.delay(function(text) {
console.log(text);
}, 1000, 'later');
// => 一秒后输出 'later'。
```


# **invert**

```javascript 
 const data= _.invert(result)
创建一个object键值倒置后的对象。 如果 object 有重复的值，后面的值会覆盖前面的值。
```


# **compact**

创建一个新数组，包含原数组中所有的非假值元素。例如false, null,0, "", undefined, 和 NaN 都是被认为是“假值”。

# **chunk(array, \[size=1])**

将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

# \_.uniqBy(array, \[iteratee=\_.identity])

```javascript 
 这个方法类似_.uniq ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 调用时会传入一个参数：(value)。
_.uniqBy([2.1, 1.2, 2.3], Math.floor);

// => [2.1, 1.2]
// The `_.property` iteratee shorthand.

_.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]

```


# &#x20;\_.unset

```javascript 
 移除object对象 path 路径上的属性。

注意: 这个方法会改变源对象 object。
var object = { 'a': [{ 'b': { 'c': 7 } }] };
_.unset(object, 'a[0].b.c');  
console.log(object);
// => { 'a': [{ 'b': {} }] };

_.unset(object, ['a', '0', 'b', 'c']);
console.log(object);
// => { 'a': [{ 'b': {} }] };
```


# \_.unionWith

这个方法类似[\_.union](https://www.lodashjs.com/docs/lodash.unionWith#union "_.union")， 除了它接受一个 comparator 调用比较arrays数组的每一个元素。 comparator 调用时会传入2个参数： *(arrVal, othVal)*。&#x20;

参数&#x20;

1. \[arrays] *(...Array)*: 要检查的数组。
2. \[comparator] *(Function)*: 比较函数，调用每个元素。

返回&#x20;

*(Array)*: 返回一个新的联合数组。&#x20;

```javascript 
 var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.unionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]

```


# \_.orderBy

```javascript 
 //此方法类似于_.sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序。 如果没指定 orders（排序），所有值以升序排序。 否则，指定为"desc" 降序，或者指定为 "asc" 升序，排序对应值。

var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// 以 `user` 升序排序 再  `age` 以降序排序。
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]

```


# \_.intersectionBy

这个方法类似[\_.intersection](https://www.lodashjs.com/docs/lodash.intersectionBy#intersection "_.intersection")，区别是它接受一个 iteratee调用每一个arrays的每个值以产生一个值，通过产生的值进行了比较。结果值是从第一数组中选择。iteratee 会传入一个参数：

*(value)*。

```javascript 
 _.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// => [2.1]
 
// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]


```


# intersection

创建唯一值的数组，这个数组包含所有给定数组都包含的元素，使用[SameValueZero](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero "SameValueZero")进行相等性比较。（注：可以理解为给定数组的交集）&#x20;

参数&#x20;

1. \[arrays] *(...Array)*: 待检查的数组。

返回值&#x20;

*(Array)*: 返回一个包含所有传入数组交集元素的新数组。&#x20;

```javascript 
 _.intersection([2, 1], [4, 2], [1, 2]);
// => [2]
```


# `_.differenceWith(array, [values], [comparator])`

这个方法类似[\_.difference](https://www.lodashjs.com/docs/lodash.differenceWith#difference "_.difference") ，除了它接受一个 `comparator` （注：比较器），它调用比较`array`，`values`中的元素。 结果值是从第一数组中选择。comparator 调用参数有两个：*(arrVal, othVal)*。

参数

1. `array` *(Array)*: 要检查的数组。
2. `[values]` *(...Array)*: 排除的值。
3. `[comparator]` *(Function)*: comparator 调用每个元素。

返回值

*(Array)*: 返回一个过滤值后的新数组。

```javascript 
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 
_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]

```
