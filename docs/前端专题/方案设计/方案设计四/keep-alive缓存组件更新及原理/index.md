# keep-alive缓存组件更新及原理

## 目录

- [一、问题剖析](#一问题剖析)
- [二、回](#二回)
  - [第一](#第一)
  - [第二](#第二)
    - [面试官有一次问我，Vue中用到哪些算法？](#面试官有一次问我Vue中用到哪些算法)
  - [第三](#第三)
    - [beforeRouteEnter](#beforeRouteEnter)
  - [keep-alive是什么？](#keep-alive是什么)
    - [参数](#参数)
    - [生命周期](#生命周期)
    - [动态组件](#动态组件)
    - [路由组件](#路由组件)
  - [底层原理](#底层原理)
    - [keep-alive源码](#keep-alive源码)
    - [pruneCacheEntry函数](#pruneCacheEntry函数)
    - [render函数](#render函数)
    - [渲染](#渲染)
    - [keep-alive本身渲染](#keep-alive本身渲染)
    - [包裹组件渲染](#包裹组件渲染)
- [LRU缓存函数（超出max）](#LRU缓存函数超出max)
- [总结](#总结)

## 一、问题剖析

keep-alive怎么缓存组件的，缓存后又是怎么更新的？

其实这个问题在项目实战中很常见，因为`keep-alive`可以很好的缓存我们的组件，是性能优化常见的一点，面试中我们怎么去回答比较好✍，我个人觉得可以从以下四个方面去回答这个面试题。

- 缓存可用keep-alive，说一下它的作用与用法
- 使用细节，如缓存指定/排除、结合router和transition
- 组件缓存后更新可以利用activated或者beforeRouteEnter
- 原理阐述

## 二、回

### 第一

开发中缓存组件使用keep-alive组件，keep-alive是vue内置组件，keep-alive包裹动态组件`component`时，***会缓存不活动的组件实例，而不是销毁它们，这样在组件切换过程中将状态保留在内存中，防止重复渲染DOM***。

用法如下：

```typescript 
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```


### 第二

结合属性`include`和`exclude`可以明确指定缓存哪些组件或排除缓存指定组件。vue3中结合vue-router时变化较大，之前是keep-alive包裹router-view，现在需要反过来用router-view包裹keep-alive。

```typescript 
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component"></component>
  </keep-alive>
</router-view>
```


keep-alive的中缓存的时候还运用了`LRU`(Least Recently Used)算法。

#### 面试官有一次问我，Vue中用到哪些算法？

在这里就可以说：在keep-alive中，他底层实现用到LRU算法进行组件的缓存机制。

### 第三

缓存后如果要获取数据，解决方案可以有以下两种：

#### beforeRouteEnter

在有vue-router的项目，每次进入路由的时候，都会执行beforeRouteEnter。

```typescript 
beforeRouteEnter(to, from, next){
  next(vm=>{
    console.log(vm)
    // 每次进入路由执行
    vm.getData()  // 获取数据
  })
}
```


actived
在keep-alive缓存的组件被激活的时候，都会执行actived钩子。

```typescript 
activated(){
   this.getData() // 获取数据
}
```


### keep-alive是什么？

- keep-alive***本身不会渲染出来，也不会出现在父组件链中***
- keep-alive包裹动态组件时\*\* *，会缓存不活动的组件，而不是销毁它们*\*\*
- **缓存组件**，可***提升性能（*** 比如某宝的宝贝，进入详情页，每次都是同一个物品，那不需要请求接口，直接缓存组件，当然，如果不是同一个就调接口）

#### 参数

keep-alive接收三个参数：

- `include`：可传字符串、正则表达式、数组，名称匹配成功的组件会被缓存
- `exclude`：可传字符串、正则表达式、数组，名称匹配成功的组件不会被缓存
- `max`：可传数字，限制缓存组件的最大数量，超过max则按照LRU算法进行置换

include和exclude，传数组情况居多

#### 生命周期

生命周期有：`activated`激活、`deactivated`离开

- activated： 页面第一次进入的时候

钩子触发的顺序是created->mounted->activated

- deactivated: 页面退出的时候会触发deactivated

当再次前进或者后退的时候只触发activated。

使用`keep-alive`会将数据保留在**内存中**，如果要在每次进入页面的时候获取最新的数据，需要在activated阶段获取数据，承担原来`created`钩子中获取数据的任务。

那么，我们一般会在动态组件、路由组件去用到keep-alive组件。

#### 动态组件

```typescript 
<keep-alive :include="allowList" :exclude="noAllowList" :max="amount"> 
    <component :is="currentComponent"></component> 
</keep-alive>
```


#### 路由组件

```typescript 
<keep-alive :include="allowList" :exclude="noAllowList" :max="amount">
    <router-view></router-view>
</keep-alive>
```


### 底层原理

先说一下，keep-alive在各个生命周期里都做了啥吧。

- created：初始***化一个cache、keys，cache用来存缓存组件的虚拟dom集合，keys用来存缓存组件的key集合。***
- mounted：实时***监听include、exclude这两个的变化***，并执行相应操作。
- destroyed：***删除掉所有缓存相关***的东西。

> 之前说了，keep-alive不会被渲染到页面上，所以abstract这个属性至关重要！

#### keep-alive源码

```typescript 
// src/core/components/keep-alive.js

export default {
  name: 'keep-alive',
  abstract: true, // 判断此组件是否需要在渲染成真实DOM
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created() {
    this.cache = Object.create(null) // 创建对象来存储  缓存虚拟dom
    this.keys = [] // 创建数组来存储  缓存key
  },
  mounted() {
    // 实时监听include、exclude的变动
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },
  destroyed() {
    for (const key in this.cache) { // 删除所有的缓存
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },
  render() {
      // 下面讲
  }
}
```


上段代码，结合前面分析的：keep-alive在各个生命周期里都做了啥。不难理解😁。

#### pruneCacheEntry函数

上面**keep-alive源码**中，在`destroyed`销毁生命周期中for循环执行pruneCacheEntry函数，看看该函数内部做了什么？

```typescript 
// src/core/components/keep-alive.js

function pruneCacheEntry (
  cache: VNodeCache,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy() // 执行组件的destory钩子函数
  }
  cache[key] = null  // 设为null
  remove(keys, key) // 删除对应的元素
}
```


- 1：遍历集合，执行所有缓存组件的\$destroy方法
- 2：将cache对应key的内容设置为null
- 3：删除keys中对应的元素

#### render函数

上面**keep-alive源码**中，在最后保留了render空函数，我们在这里分析。

以下称`include`为白名单，`exclude`为黑名单。

`render`函数里主要做了这些事：

- 第一步：获取到keep-alive包裹的第一个组件以及它的**组件名称**
- 第二步：判断此**组件名称**是否能被**白名单、黑名单**匹配，如果**不能被白名单匹配 || 能被黑名单匹配**，则直接返回`VNode`，不往下执行，如果不符合，则往下执行**第三步**
- 第三步：根据组件`ID、tag`生成缓存key，并在缓存集合中查找是否已缓存过此组件。如果已缓存过，直接取出缓存组件，并更新**缓存key**在keys中的位置（这是LRU算法的关键），如果没缓存过，则继续**第四步**
- 第四步：分别在`cache、keys`中保存**此组件**以及他的**缓存key**，并检查数量是否超过`max`，超过则根据LRU算法进行删除
- 第五步：将此组件实例的keepAlive属性设置为true，这很重要哦，下面会讲到的！

#### 渲染

咱们先来看看Vue一个组件是怎么渲染的，咱们从render开始说：

- `render`：此函数会将组件转成`VNode`
- `patch`：此函数在初次渲染时会直接渲染根据拿到的`VNode`直接渲染成**真实DOM**，第二次渲染开始就会拿`VNode`会跟**旧VNode**对比，打补丁（diff算法对比发生在此阶段），然后渲染成**真实DOM**

new Vue阶段图解（可以看看这篇[面试官问我new Vue阶段做了什么？](https://juejin.cn/post/7164563220714225695 "面试官问我new Vue阶段做了什么？")）：包括咱这里提到的渲染。

![](./assets/image/image_2T_I2scF0L.png)

#### keep-alive本身渲染

刚刚说了，`keep-alive`自身组件不会被渲染到页面上，那是怎么做到的呢？**其实就是通过判断组件实例上的**\*\*`abstract`的属性值，\*\*如果是true的话，就跳过该实例，该实例也不会出现在父级链上。

```typescript 
// src/core/instance/lifecycle.js

export function initLifecycle (vm: Component) {
  const options = vm.$options
  // 找到第一个非abstract的父组件实例
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  vm.$parent = parent
  // ...
}
```


#### 包裹组件渲染

咱们再来说说被keep-alive包裹着的组件是如何使用缓存的吧。

刚刚说了**VNode -> 真实DOM**是发生在`patch`的阶段，而其实这也是要细分的：**VNode -> 实例化 -> \_update -> 真实DOM**，而组件使用缓存的判断就发生在**实例化**这个阶段，而这个阶段调用的是`createComponent`函数，那我们就来说说这个函数吧：

## LRU缓存函数（超出max）

```typescript 
/**
 * LRU缓存函数
 * 
 * 运用你所掌握的数据结构，设计和实现一个LRU(最近最少使用)缓存机制。它应该支持以下操作：
 * 获取数据get和写入数据put
 * 获取数据get(key)如果密钥(ky)存在于缓存中，则获取密钥的值（总是正数），否则返回-1。
 * 写入数据put(key,value)如果密钥已经存在，则变更其数据值；如果密钥不存在，则插入该组「密钥/数据值」。
 * 当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 * 进阶：
 * 你是否可以在O(1)时间复杂度内完成这两种操作？
 * 示例
    LRUCache cache=new LRUCache(2) //缓存容量
    cache.put(1,1);
    cache.put(2,2);
    cache.get(1);   //1返回1
    cache.put(3,3); //该操作会使得密钥2作废
    cache.get(2);   //返回-1未找到)
    cache.put (4,4);    //该操作会使得密钥1作废
    cache.get(1);   //返回-1（未找到）
    cache.get(3);   //返回3
    cache.get(4);   //返回4
 *
 * @class LRUCache
 */
class LRUCache {
  /**
   * @description 打印开始点
   *
   * @memberof LRUCache
   */
  start() {
    console.log("LRU缓存函数类 start^_^_^_^_^_^_^_^_^_^")
  }

  /**
   * @description 打印结束点
   *
   * @memberof LRUCache
   */
  end() {
    console.log("LRU缓存函数类 end^_^_^_^_^_^_^_^_^_^")
  }

  constructor(size) {
    this.size = size
    this.cache = new Map()
  }

  /**
   * @description 获取数据
   *
   * @param {*} key
   * @return {*} 
   * @memberof LRUCache
   * @example
   * lRUCache.get(2)
   */
  get(key) {
    const hasKey = this.cache.has(key)
    if (hasKey) {
      const val = this.cache.get(key)
      // 每次get一下，这个key就会往前排一下，因为要遵循【最近少使用的移除】
      this.cache.delete(key)
      this.cache.set(key, val)
      return val
    } else {
      return -1
    }
  }

  /**
   * @description 为什么要先删除再set，因为Map要保证唯一性
   * @description 获取第一个map的key：this.cache.keys().next()
   *
   * @description 写入数据
   * 
   * @param {*} key
   * @param {*} val
   * @memberof LRUCache
   * @example
   * lRUCache.put(2, 2)
   */
  put(key, val) {
    const hasKey = this.cache.has(key)
    if (hasKey) {
      this.cache.delete(key)
    }
    this.cache.set(key, val)
    if (this.cache.size > this.size) {
      this.cache.delete(this.cache.keys().next().value)
    }
  }
}

export default LRUCache
```


## 总结

我们再来总结一下回答：

🙋🏻‍♂️我个人主要从四个方面回答

- 缓存用keep-alive，它的作用与用法
  - keep-alive包裹动态组件component时，会***缓存不活动的组件实例，而不是销毁它们***，这样在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
- 使用细节，例如缓存指定/排除、结合router和transition
  - 结合属性***include和exclude***可以明确指定缓存哪些组件或排除缓存指定组件。vue3中结合vue-router时变化较大，之前是keep-alive包裹router-view，现在相反。
- 组件缓存后更新可***以利用activated或者beforeRouteEnter***
- 原理阐述
  - 它内部定义了一个map，缓存创建过的组件实例，它返回的***渲染函数内部会查找内嵌的component组件对应组件的vnode***，如果该组*件在map中存在就直接返回它。* 由于component的is属性是个**响应式**数据，因此只要它变化，keep-alive的render函数就会重新执行。
