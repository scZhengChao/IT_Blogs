# 拷贝

## 目录

- [拷贝](#拷贝)
  - [01、递归方式（推荐，项目中最安全最常用）](#01递归方式推荐项目中最安全最常用)
  - [02、JSON.stringify() ；(这个不推荐使用，有坑)](#02JSONstringify-这个不推荐使用有坑)
  - [03、Object.assign()](#03Objectassign)
  - [04、使用第三方库lodash中的cloneDeep()方法](#04使用第三方库lodash中的cloneDeep方法)
  - [05、jquery的extend()方法进行深拷贝（推荐在JQ中使用）](#05jquery的extend方法进行深拷贝推荐在JQ中使用)
  - [06、immer（不可变数据方案）：](#06immer不可变数据方案)
  - [总结：](#总结)
- [健全深拷贝](#健全深拷贝)

# 拷贝

- 深拷贝：在堆内存中重新开辟一个存储空间，完全克隆一个一模一样的对象；
- 浅拷贝：不在堆内存中重新开辟空间，只复制栈内存中的引用地址。本质上两个对象（数组）依然指向同一块存储空间

#### **01、递归方式（推荐，项目中最安全最常用）**

使用递归的方式进行对象（数组）的深拷贝，奉上已封装的深拷贝函数：

***就是只对Object和Array做深copy***

```javascript 
//函数拷贝
const copyObj = (obj = {}) => {            //变量先置空
    let newobj = null;  
    //判断是否需要继续进行递归
    if (typeof (obj) == 'object' && obj !== null) {
        newobj = obj instanceof Array ? [] : {};                //进行下一层递归克隆
        for (var i in obj) {
            newobj[i] = copyObj(obj[i])
        }                //如果不是对象直接赋值
    } else newobj = obj;            
    return newobj;    
}

//或者
function copy(dest){
  if(typeof dest === 'object'){
    if(!dest) return dest; // null
    var obj = dest.constructor();  // Object/Array
    for(var key in dest){
      obj[key] = copy(dest[key])
    }
    return obj;
  } else {
    return dest;
  }
}

```


上方函数的使用方式：

```javascript 
//模拟对象
let obj = {  
  numberParams:1,  
  functionParams:() => {    
    console.log('昨天基金全是绿的，只有我的眼睛是红的');
  },  
  objParams:{    
    a:1,    
    b:2
  }
}
const newObj = copyObj(obj); //这样就完成了一个对象的递归拷贝
obj.numberParams = 100;  //更改第一个对象的指
console.log(newObj.numberParams); //输出依然是1 不会跟随obj去改变
```


#### **02、JSON.stringify() ；(这个不推荐使用，有坑)**

这个方法有坑，详细讲解请看我另一篇文章 “使用JSON.stringify进行深拷贝的坑” 以下是代码示例：

```javascript 
let obj = {  
  a:1,  
  b:"基金亏太多，终有一天，你站上了天台，我卧上了轨道。来生我们有说有笑。"
 }
 //先转为json格式字符，再转回来
 let newObj = JSON.parse(JSON.stringify(obj));

obj.a = 50;console.log(newObj.a); //输出 1  

```


普通的对象也可以进行深拷贝，但是！！！当对象内容项为number,string.boolean的时候，是没有什么问题的。

但是，如果对象内容项为`undefined,null,Date,RegExp,function，error`的时候。使用`JSON.stringify()`进行拷贝就会出问题了。

#### 03、Object.assign()

只能**copy一层，嵌套的对象类型则不行**

#### **04、使用第三方库lodash中的cloneDeep()方法**

是否推荐使用，看情况吧。如果我们的项目中只需要一个深拷贝的功能，这种情况下为了一个功能引入整个第三方库就显得很不值得了。不如写一个递归函数对于项目来说性能更好。

lodash.cloneDeep()代码示例：

```javascript 
import lodash from 'lodash';
let obj = {  
  a: {      
    c: 2,      
    d: [1, 3, 5],      
    e:'阿巴阿巴'
  },   
  b: 4
}
const newObj = lodash.cloneDeep(obj);
obj.b = 20;
console.log(newObj.b); //输出 4； 不会改变
```


实际上，cloneDeep()方法底层使用的本来就是递归方法。只是在外层又封装了一层而已。

所以，如果不是原先项目中有使用 lodash 这个库的话，大可不必为了这一个功能而去引入它。

文章上方有提供进行深拷贝的函数，推荐使用。大家可自取。

#### **05、jquery的extend()方法进行深拷贝（推荐在JQ中使用）**

这个方法仅适用于JQuery构建的项目。JQuery自身携带的extend()方法可以进行深拷贝，不用自己写递归也不用引入第三方库还没什么坑。

在JQuery项目中的使用方式：

```javascript 

let obj = {  
  a: {      
    c: 2,      
    d: [1, 3, 5],      
    e:'阿巴阿巴'
  },
  b: 4
}
let newObj= $.extend(true, {}, obj1);  //拷贝完成
obj.b = 20;
console.log(newObj.b); //输出 4 

```


#### **06、immer**（不可变数据方案）：

```typescript 
import produce from 'immer';
const cloned = produce(objA, draft => {});
```


#### 总结：

进行深拷贝的方法：

- 递归函数 （推荐使用，项目中使用的更多，更小，更安全）
- JSON.stringify() 和JSON.parse() ; (不推荐使用,如果遇到Function,Date等类型的变量容易出现一些意料之外的问题)
- 第三方库lodash的cloneDeep()方法 （就情况而定，如果项目中原先就有lodash这个第三方库，可以使用，否则还是推荐使用递归函数。不然成本太高。）
- JQuery的extend()函数 (推荐在JQuery项目中使用，其他项目依然推荐是用递归函数)

# 健全深拷贝

```typescript 
// 获取数据类型
function typeOf(any) {
  return Object.prototype.toString.call(any).split(' ')[1].slice(0, -1)
}


// 复制from的属性到to上，cache保存已复制属性引用，防止重复引用
function copyOwnProperties(from, to, cache) {
  const names = Object.getOwnPropertyNames(from)
  for (let name of names) {
    const descriptor = Object.getOwnPropertyDescriptor(from, name)
    Object.defineProperty(to, name, { ...descriptor, value: recursionClone(descriptor.value, cache) })
  }

  return to
}


// 根据不同类型的数据进行不同的拷贝方式，cache保存已复制属性引用，防止重复引用
function recursionClone(any, cache) {
  const typ = typeOf(any)

  if (['String', 'Number', 'Null', 'Boolean', 'Undefined'].includes(typ)) {
    return any
  }

  if (!cache) {
    cache = new Map()
  }

  if (cache.get(any)) {
    return cache.get(any)
  }

  if (typ === 'RegExp') {
    return new RegExp(any)
  }

  if (typ === 'Date') {
    return new Date(any)
  }

  let O
  if (typ === 'Function') {
    O = (new Function('return ' + any.toString()))()
  }

  if (typ === 'Array') {
    O = new Array()
  }

  if (typ === 'Object') {
    O = new Object()
  }

  if (O) {
    cache.set(any, O)
    copyOwnProperties(any, O, cache)
    return O
  }

  return null
}
```
