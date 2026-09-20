# Vuex应用

## 目录

- [mapState](#mapState)
  - [对象写法](#对象写法)
  - [字符串数组写法](#字符串数组写法)
  - [使用展开运算符](#使用展开运算符)

# mapState

## 对象写法

```javascript 
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  computed: mapState({
  
    // 传函数参数
    count: state => state.count, // 箭头函数可使代码更简练 映射为this.count
    userCount: state => state => state.user.count, // 模块化写法 箭头函数可使代码更简练 映射为this.userCount
    
    // 传字符串参数
    userName: 'name', // name等同于state => state.name，不支持模块化写法 映射为this.userName
    
    // 需要使用this局部状态，使用常规函数写法
    age(state) { // 映射为this.age
      return state.age + this.age // 可与局部状态组合
    }
  })
}

```


mapState同时传入全局state和modules模块局部state

![](./image/image_YtZzUJ-amn.png)

## [字符串](https://so.csdn.net/so/search?q=字符串\&spm=1001.2101.3001.7020 "字符串")数组写法

```javascript 
computed: mapState([
  'count', // 映射 this.count 为 store.state.count
  'name' // 映射 this.name为 store.state.name
])

```


此外如果是用到了module模块化，除了将对象作为参数传递之外,namespaced mapState还可以使用两个参数：namespace和表示模块成员的对象名称数组，像这样

```javascript 
computed: mapState('user', ['count', 'name']) // user 模块名称

```


## 使用展开运算符

mapState 函数返回的是一个对象，这样就造成无法与当前局部组件计算属性混合使用  ;以前我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。 &#x20;
自从有了展开运算符后，可以极大地简化写法

```javascript 
computed: {
  ...mapState([
    'count', // 映射 this.count 为 store.state.count
    'name' // 映射 this.name为 store.state.name
  ]),
  // 局部组件计算属性
  localComputed () {},
}

```
