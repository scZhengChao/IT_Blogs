# WeakSet  WeakMap&#x20;

## 目录

- [WeakSet ](#WeakSet-)
  - [与Set 有两个区别:](#与Set-有两个区别)
  - [用途：](#用途)
- [WeakMap ](#WeakMap-)
  - [什么是弱引用呢？](#什么是弱引用呢)
  - [与Map的区别有两点：](#与Map的区别有两点)
  - [用途：](#用途)
    - [DOM 节点作为键名](#DOM-节点作为键名)
    - [部署私有属性： ](#部署私有属性-)
  - [api 区别：](#api-区别)

# WeakSet&#x20;

WeakSet 结构与 Set 类似，也是不重复的值的集合。

## 与Set 有两个区别:

1. 首先，WeakSet 的**成员只能是对象，而不能是其他类型的值**。&#x20;

```javascript 
 const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
```


1. 成员对象都是弱引用，

         另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，

- \*\*因此 ES6 规定 WeakSet 不可遍历。 \*\*  &#x20;
- **WeakSet 没有size**

属性，没有办法遍历它的成员

## 用途：

是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。&#x20;

```javascript 
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
//上面代码保证了Foo的实例方法，只能在Foo的实例上调用。
//这里使用 WeakSet 的好处是，foos对实例的 引用 ， 不会被计入内存回收机制 ，
//所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。
```


# WeakMap&#x20;

> WeakMap 对象是一组键/值对的集合，**其中的键是弱引用的。其键必须是对象**，而值可以是任意的。

#### 什么是弱引用呢？

> 在计算机程序设计中，**弱引用与强引用相对**，是指**不能确保其引用的对象不会被垃圾回收器回收的引用**。 一个对象若只被弱引用所引用，则被认为是**不可访问（或弱可访问）的**，并因此**可能在任何时刻被回收**。

我们默认创建一个对象：`const obj = {}`，**就默认创建了一个强引用的对象，我们只有手动将**\*\*`obj = null`，它才会被垃圾回收机制进行回\*\*收，如果是弱引用对象，垃圾回收机制会自动帮我们回收。

## 与Map的区别有两点：

首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。

```javascript 
 const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```


其次，WeakMap的**键名所指向的对象，不计入垃圾回收机制**。

```javascript 
 //WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
//上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
//一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。

// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```


WeakMap 就是为了解决这个问题而诞生的，它的**键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。**因此，**只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存****。**也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的**键值对会自动消失**，不用手动删除引用。&#x20;

## 用途：

### DOM 节点作为键名

WeakMap 应用的典型场合就是 DOM 节点作为键名

```javascript 
 const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element)  // "some information"

```


上面代码中，先新建一个 Weakmap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。 也就是说，上面的DOM 节点对象的引用计数是1，而不是2。这时，\*\*一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。 \*\*

总之，WeakMap的专用场合就是，它**的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。**&#x20;

注意，WeakMap\*\* 弱引用的只是键名\*\*，而不是键值。键值依然是正常引用。

### 部署私有属性：&#x20;

```javascript 
 const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```


## api 区别：

一是: 没有遍历操作（**即没有keys()、values()和entries()方法）**，也**没有size属性**。

原因：

&#x20;       因为没有办法列出所有键名，**某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关**。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。

二是无法清空，即**不支持clear方法**。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。&#x20;

```javascript 
 const wm = new WeakMap();

// size、forEach、clear 方法都不存在
wm.size // undefined
wm.forEach // undefined
wm.clear // undefined

```
