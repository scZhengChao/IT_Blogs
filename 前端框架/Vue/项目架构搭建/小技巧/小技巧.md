# 小技巧

## 目录

- [显示隐藏](#显示隐藏)
- [全局属性](#全局属性)
  - [app.config.globalProperties](#appconfigglobalProperties)

# 显示隐藏

除了v-show； v-if；还有性能更好的技巧

```javascript 
& .child {
    visibility: hidden;
  }
  &:hover .child{
    visibility: visible;
   }
```


# 全局属性

## app.config.globalProperties

一个用于注册能够被应用内所有组件实例访问到的全局属性的对象

这是对 **Vue 2 中 ****`Vue.prototype`**** 使用方式的一种替代，此写法在 Vue 3 已经不存在了**。与任何全局的东西一样，应该谨慎使用。

**如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级。**

**用法**

```typescript 
app.config.globalProperties.msg = 'hello'

```


这使得 `msg` 在应用的任意组件模板上都可用，并且也可以通过任意组件实例的 `this` 访问到：

```typescript 
export default {
  mounted() {
    console.log(this.msg) // 'hello'
  }
}

```
