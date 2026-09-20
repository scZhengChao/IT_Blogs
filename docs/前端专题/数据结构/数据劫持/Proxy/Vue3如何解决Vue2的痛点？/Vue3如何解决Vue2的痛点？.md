# Vue3如何解决Vue2的痛点？

## 目录

- [3.1 Proxy只会代理对象的第一层，那么Vue3怎么对深层级进行监听呢？](#31-Proxy只会代理对象的第一层那么Vue3怎么对深层级进行监听呢)
- [3.2 监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？](#32-监测数组的时候可能触发多次getset那么如何防止触发多次呢)
- [3.3 Proxy属性讲解](#33-Proxy属性讲解)
- [3.4 Reflect属性讲解](#34-Reflect属性讲解)
- [四、扩展：阐述MVVM响应式原理？](#四扩展阐述MVVM响应式原理)
  - [4.1 原理](#41-原理)
  - [4.2 MVVM](#42-MVVM)

[ Vue3的响应式到底比Vue2优雅在哪 - 掘金 Object.defineProperty 和Proxy本质差别是，defineProperty 只能对属性进行劫持，所以出现了需要递归遍历，新增属性需要手动 Observe的问题，有多达13种拦截方 https://juejin.cn/post/7168274276787683341](https://juejin.cn/post/7168274276787683341 " Vue3的响应式到底比Vue2优雅在哪 - 掘金 Object.defineProperty 和Proxy本质差别是，defineProperty 只能对属性进行劫持，所以出现了需要递归遍历，新增属性需要手动 Observe的问题，有多达13种拦截方 https://juejin.cn/post/7168274276787683341")

小插曲细品，让我们回归正题。

接着，说一下Vue3的性能更好，怎么解决无法监听数组变化问题？

我们可以从以下几点回答：

- Vue2.x 通过给每个对象添加`getter setter`属性去改变对象，实现对数据的观测；
- Object.defineProperty 和 `Proxy` 本质差别是，**defineProperty 只能对属性进行劫持，所以出现了需要递归遍历，新增属性需要手动 ****`Observe`**** 的问题。**
- Vue3.x 通过 Proxy **代理目标对象,且一开始只代理最外层对象**,嵌套对象lazy by default（惰性监听） ,性能会更好（ Proxy可以直接监听对象而非属性）
- **数据响应式系统全语言特性支持**，添加数组索引修改监听，对象的属性增加和删除。（Proxy可以直接监听数组的变化）
- Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的。

### 3.1 Proxy只会代理对象的第一层，那么Vue3怎么对深层级进行监听呢？

判断当前`Reflect.get`的返回值是否为`Object`，如果是则再通过reactive方法做代理， 这样就实现了深度观测。

### 3.2 监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？

我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行触发。

### 3.3 Proxy属性讲解

```typescript 
const person = { name: '阿呱' }

const proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        console.log(target) // 原来的person
        console.log(key) // 属性名
        console.log(receiver) // 代理后的proxyPerson
    },
    set(target, key, value, receiver) {
        console.log(target) // 原来的person
        console.log(key) // 属性名
        console.log(value) // 设置的值
        console.log(receiver) // 代理后的proxyPerson
    }
})

proxyPerson.name // 访问属性触发get方法

proxyPerson.name = 'Dignity' // 设置属性值触发set方法
```


![](image_-Png-GBy6s.png)

**其实Proxy是搭配Reflect的。**

来个例子🌰，感受下Proxy的强大吧。

```typescript 
const data = { name: '阿呱' }

function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      console.log(`访问了${key}属性`)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      console.log(`${key}由->${target[key]}->设置成->${value}`)
      Reflect.set(target, key, value, receiver)
    }
  }

  return new Proxy(target, handler)
}

const proxyData = reactive(data)

console.log(proxyData.name)
// 访问了name属性
// 阿呱
proxyData.name = 'Dignity'
// name由->阿呱->设置成->Dignity
console.log(proxyData.name)
// 访问了name属性
// Dignity
```


关键的来了，那就是对象新增属性，来看看效果吧：

```typescript 
proxyData.do = '打羽毛球'
console.log(proxyData.do)
// 访问了do属性
// 打羽毛球
proxyData.do = '打篮球'
// do由->打羽毛球->设置成->打篮球
console.log(proxyData.do)
// 访问了do属性
// 打篮球
```


**可以看到，Proxy对新增的do属性也进行监听管理，一视同仁。**

**而**\*\*`Object.defineProperty`\*\***新来的不管，管不了那么多。**

### 3.4 Reflect属性讲解

在这列举Reflect的两个方法：

- get(target, key, receiver)：访问target的key属性，但是this是指向receiver，所以实际是访问的值是receiver的key的值，但是这可不是直接访问receiver\[key]属性
- set(target, key, value, receiver)：设置target的key属性为value

上面提到，不能直接receiver\[key]或者receiver\[key] = value，而是要通过Reflect.get和Reflect.set，绕个弯去访问属性或者设置属性，这是为啥呢？下面咱们举个反例

```typescript 
const person = { name: '阿呱' }

const proxyPerson = new Proxy(person, {
    get(target, key, receiver) {
        return Reflect.get(receiver, key) // 相当于 receiver[key]
    },
    set(target, key, value, receiver) {
        Reflect.set(receiver, key, value) // 相当于 receiver[key] = value
    }
})

console.log(proxyPerson.name)

proxyPerson.name = 'Dignity' 
// 会直接报错，栈内存溢出 Maximum call stack size exceeded
```


因为上面的get，返回`Reflect.get(receiver, key)`相当于`receiver[key]`，又触发到get方法，所以直接就死循环报错了。

🍅Proxy搭配Reflect主要是为了语义化，而且方法都一一对应。

- Proxy的get对应Reflect.get
- Proxy的set对应Reflect.set

🙋为啥尽量把this放在receiver上，而不放在target上？

🙋🏻‍♂️因为原**对象target有可能本来也是是另一个代理的代理对象，所以如果this一直放target上的话**，出bug的概率会大大提高。

## 四、扩展：阐述MVVM响应式原理？

### 4.1 原理

Vue 内部通过 `Object.defineProperty`方法属性拦截的方式，把`data` 对象里每个数据的读写转化成 `getter/setter`，当数据变化时通知视图更新。
🙋那他是怎么进行依赖收集的呢？
🙋🏻‍♂️其内部定义了一个依赖收集器叫Dep。

- vue将data初始化为一个Observer并对对象中的每个值，重写了其中的get、set，data中的每个key，都有一个独立的依赖收集器。
- 在get中，向依赖收集器添加了监听。
- 在mount时，实例了一个Watcher，将收集器的目标指向了当前Watcher。
- 在data值发生变更时，触发set，触发了依赖收集器中的所有监听的更新，来触发Watcher.update。

### 4.2 MVVM

MVVM 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。

![](image_eMQt90ZRN7.png)

即：

- 输入框内容变化时，`Data` 中的数据同步变化。即 `View => Data` 的变化。（通过事件监听的方式实现）
- `Data` 中的数据变化时，文本节点的内容同步变化。即 `Data => View` 的变化。

本文主要讨论如何根据 Data 变化更新 View。
我们会通过实现以下 4 个步骤，来实现数据的双向绑定：

- 实现一个监听器 Observer ，**用来劫持并监听所有属性，如果属性发生变化**，就通知订阅者；
- 实现一个订阅器 Dep，**用来收集订阅者，对监听器 Observer 和 订阅者 Watcher 进行统一管理**；
- 实现一个订阅者 Watcher，可以**收到属性的变化通知并执行相应的方法，从而更新视图；**
- 实现一个解析器 Compile，**可以解析每个节点的相关指令，对模板数据和订阅器进行初始化。**

![](image_1Ba-w9AB3m.png)
