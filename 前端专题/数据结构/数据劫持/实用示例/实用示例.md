# 实用示例

## 目录

- [实现数组的负索引](#实现数组的负索引)
- [数据验证](#数据验证)
- [关联属性](#关联属性)
- [私有属性](#私有属性)

什么是Proxy？它究竟是做什么的？在解释这一点之前，让我们看一个真实世界的开发例子。

我们每个人在日常生活中都有很多事情要做，比如看邮件、收快递等等。有时我们可能会感到有点焦虑：我们的邮件列表上有很多垃圾邮件，需要花费大量时间来筛选它们；收到的货物可能含有恐怖分子安放的炸弹，威胁到我们的安全。

那么，这时你可能需要一个忠诚的管家，您希望管家帮助您执行以下操作：在您开始阅读之前让其检查您的收件箱并删除所有垃圾邮件；当您收到包裹时，请它用专业设备检查包裹，确保里面没有炸弹。

在上面的例子中，管家就是我们的代理，当我们试图做某事时，管家为我们做了一些额外的事情。

现在让我们回到 JavaScript，我们知道 JavaScript 是一种面向对象的编程语言，没有对象我们就无法编写代码。但是 JavaScript 对象总是裸奔的，你可以用它们做任何事情。很多时候，这会降低我们的代码安全性。

所以在 ECMAScript2015 中引入了 Proxy 功能。有了Proxy，我们可以为物件找到忠实的管家，帮助我们增强物件原有的功能。

在最基本的层面上，使用 Proxy 的语法看起来像这样：

```javascript 
// This is a normal object
let obj = {a: 1, b:2}
// Configure obj with a housekeeper using Proxy
let objProxy = new Proxy(obj, handler)

```


这只是代码的示例，因为我们还没有写handler，所以这段代码暂时还不能正常运行。

对于一个人来说，我们可能有阅读邮件、取件等操作，管家可以为我们做这些。对于一个对象，我们可以读取属性、设置属性等等，这些也可以通过代理对象来增强。

在处理程序中，我们可以列出我们想要代理的操作。例如，如果我们想在获取对象属性的同时在控制台中打印出一条语句，我们可以这样写：

```javascript 

let obj = {a: 1, b:2}
// Use Proxy syntax to find a housekeeper for the object
let objProxy = new Proxy(obj, {
  get: function(item, property, itemProxy){
    console.log(`You are getting the value of '${property}' property`)
    return item[property]
  }
})

```


get 函数可以接受三个参数：

- item ：它是对象本身。
- proerty ：您要读取的属性的名称。
- itemProxy ：它是我们刚刚创建的管家对象。

你可能已经在其他地方阅读过有关 Proxy 的教程，并且您会注意到我对参数的命名与它们不同。我这样做是为了更接近我之前的示例，以帮助你理解。我希望它对你有用。

那么get函数的返回值就是读取这个属性的结果。因为我们还不想改变任何东西，所以我们只返回原始对象的属性值。

如果需要，我们也可以更改结果。例如，我们可以这样做：

```javascript 
let obj = {a: 1, b:2}
let objProxy = new Proxy(obj, {
  get: function(item, property, itemProxy){
    console.log(`You are getting the value of '${property}' property`)
    return item[property] * 2
  }
})

```


我们将跟进实际示例来说明此技巧的实际用途。

除了拦截对属性的读取，我们还可以拦截对属性的修改。像这样：

```javascript 

let obj = {a: 1, b:2}
let objProxy = new Proxy(obj, {
  set: function(item, property, value, itemProxy){
    console.log(`You are setting '${value}' to '${property}' property`)
    item[property] = value
  }
})

```


当我们尝试设置对象属性的值时，会触发 set 函数。

因为我们在设置属性值时需要传递一个额外的值，所以上面的 set 函数比 get 函数多了一个参数。

除了拦截对属性的读取和修改外，Proxy 总共可以拦截对对象的 13 种操作。

他们是：

1. get(item, propKey, itemProxy)：拦截对象属性的读取操作，如obj.a和ojb\['b']
2. set(item, propKey, value, itemProxy)：拦截对象属性的设置操作，如 obj.a = 1 。
3. has(item, propKey)：拦截objProxy中propKey的操作，返回一个布尔值。
4. deleteProperty(item, propKey)：拦截delete proxy\[propKey]的操作，返回一个布尔值。
5. ownKeys(item)：拦截Object.getOwnPropertyNames(proxy),Object.getOwnPropertySymbols(proxy),Object.keys(proxy),for...in等操作，返回一个数组。该方法返回目标对象自身所有属性的属性名，而 Object.keys() 的返回结果只包含目标对象自身的可枚举属性。
6. getOwnPropertyDescriptor(item, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)的操作，返回属性的描述符。
7. defineProperty(item, propKey, propDesc)：拦截这些操作：Object.defineProperty(proxy, propKey, propDesc）,Object.defineProperties(proxy, propDescs)，返回一个布尔值。
8. preventExtensions(item)：拦截Object.preventExtensions(proxy)的操作，返回一个布尔值。
9. getPrototypeOf(item)：拦截Object.getPrototypeOf(proxy)的操作，返回一个对象。
10. isExtensible(item)：拦截Object.isExtensible(proxy)的操作，返回一个布尔值。
11. setPrototypeOf(item, proto)：拦截Object.setPrototypeOf(proxy, proto)的操作，返回一个布尔值。
12. 如果目标对象是一个函数，还有两个额外的操作要intercept.s
13. apply(item, object, args)：拦截函数调用操作，如proxy(...args),proxy.call(object, ...args),proxy.apply(...)。
14. constructor(item, args)：拦截Proxy实例调用的操作作为构造函数，如new proxy(...args)。

有些拦截不常用，我就不细说了。现在让我们进入现实世界的例子，看看 Proxy 可以为我们做什么。

# **实现数组的负索引**

我们知道其他一些编程语言，例如 Python，支持对数组的负索引访问。

负索引以数组的最后一个位置为起点并向前计数。如：

- arr\[-1] 是数组的最后一个元素。
- arr\[-3] 是数组中倒数第三个元素。

许多人认为这是一个非常有用的功能，但不幸的是，JavaScript 目前不支持负索引语法。

但是 JavaScript 中强大的 Proxy 给了我们元编程的能力。

我们可以将数组包装为 Proxy 对象。当用户试图访问一个负数索引时，我们可以通过 Proxy 的 get 方法拦截这个操作。然后根据之前定义的规则将负索引转换为正索引，访问就完成了。

```javascript 

function negativeArray(array) {
  return new Proxy(array, {
    get: function(target, propKey){
      if (Number(propKey) != NaN && Number.isInteger(Number(propKey)) && Number(propKey) < 0) {
        propKey = String(target.length + Number(propKey));
      }
      return target[propKey]
    }
  })
}

```


# **数据验证**

众所周知，javascript 是一种弱类型语言。通常，创建对象时，它会裸运行。任何人都可以修改它。

但大多数时候，对象的属性值需要满足某些条件。例如，一个记录用户信息的对象，其age字段中应该有一个大于0的整数，通常小于150。

```javascript 

let person1 = {
  name: 'Jon',
  age: 23
}

person1.age = 9999
person1.age = 'hello world'


```


为了让我们的代码更安全，我们可以用 Proxy 包装我们的对象。我们可以截取对象的set操作，验证age字段的新值是否符合规则。

```javascript 
let ageValidate = {
  set (item, property, value) {
    if (property === 'age') {
      if (!Number.isInteger(value) || value < 0 || value > 150) {
        throw new TypeError('age should be an integer between 0 and 150');
      }
    }
    item[property] = value
  }
}

```


现在，我们尝试修改这个属性的值，可以看到我们设置的保护机制在起作用。

# **关联属性**

很多时候，一个对象的属性是相互关联的。例如，对于存储用户信息的对象，其邮政编码和位置是两个高度相关的属性，当用户的邮政编码确定后，他的位置也随之确定。

为了适应来自不同国家的读者，我在这里使用了一个虚拟示例。假设位置和邮编有如下关系：

```javascript 
const location2postcode = {
  'JavaScript Street': 232200,
  'Python Street': 234422,
  'Golang Street': 231142
}
const postcode2location = {
  '232200': 'JavaScript Street',
  '234422': 'Python Street',
  '231142': 'Golang Street'
}

```


然后看一个例子：

```javascript 
let person = {
  name: 'Jon'
}
person.postcode = 232200
当我们设置 person.postcode=232200 时，我们希望能够自动触发 
person.location='JavaScript Street'。

这是解决方案：

let postcodeValidate = {
  set(item, property, value) {
    if(property === 'location') {
      item.postcode = location2postcode[value]

    }
    if(property === 'postcode'){
      item.location = postcode2location[value]
    }
  }
}

```


因此，我们将postcode和location绑定在一起。

# **私有属性**

我们知道 JavaScript 从来不支持私有属性。这使得我们在编写代码时无法合理地管理访问权限。

为了解决这个问题，JavaScript 社区的约定是以字符 \_ 开头的字段被视为私有属性。

```javascript 

var obj = {
  a: 1,
  _value: 22
}

```


上面的 \_value 属性被认为是私有的。然而，重要的是要注意，这只是一个约定，在语言层面没有这样的规则。

现在我们有了Proxy，我们可以模拟私有属性特性。

与普通属性相比，私有属性具有以下特点：

- **无法读取此属性的值**
- **当用户尝试访问对象的键时，该属性不明显**

然后，我们可以查看前面提到的Proxy的13个拦截操作，看到有3个操作需要拦截。

然后，我们在模板中添加适当的判断语句：如果发现用户试图访问以\_开头的字段，则拒绝访问。

```javascript 

function setPrivateField(obj, prefix = "_"){
  return new Proxy(obj, {
    has: (obj, prop) => {
      if(typeof prop === "string" && prop.startsWith(prefix)){
        return false
      }
      return prop in obj
    },
    ownKeys: obj => {
      return Reflect.ownKeys(obj).filter(
        prop => typeof prop !== "string" || !prop.startsWith(prefix)
      )
    },
    get: (obj, prop) => {
      if(typeof prop === "string" && prop.startsWith(prefix)){
        return undefined
      }
      return obj[prop]
    }
  });
}

```
