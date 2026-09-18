# 插槽

## 目录

- [父组件：](#父组件)
  - [独占默认插槽的缩写语法](#独占默认插槽的缩写语法)
- [子组件：](#子组件)
  - [后备内容](#后备内容)
  - [具名插槽](#具名插槽)
  - [作用域插槽](#作用域插槽)
- [解构插槽 Prop](#解构插槽-Prop)
- [动态插槽名](#动态插槽名)

**插槽场景： 内容分发    组件复合 非常重要**

跟v-on和v-bind**一样，v-slot也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符#。例如v-slot:header可以被重写为#header：#default**

## **父组件：**

```javascript 
<template>
    <div>
        <Comp1>匿名插槽</Comp1>
        <Comp2>
              <!-- 默认插槽用default -->
            <template  v-slot:default>具名插槽</template>
            <!-- v-slot:插槽名 -->
            <template v-slot:content>内容...</template>
        </Comp2>
        <Comp3 ref="comp3">
             <!-- v-slot:插槽名="作用域上下文" -->
            <template v-slot:default="ctx">
                来自子组件数据：{{ctx.foo}}  <input type="button" value="change" @click='done'>
            </template>
        </Comp3>
    </div>

</template>
<script>
    import Comp1 from './Comp1.vue'
    import Comp2 from './Comp2.vue'
    import Comp3 from './Comp3.vue'
    export default {
        components: {
            Comp1, Comp2, Comp3
        },
        mounted() {

        },
        methods: {
            done(){
                this.$refs.comp3.change()
            }
        },
    }
</script>
```


***

作为一条规则，请记住：父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

### [独占默认插槽的缩写语法](https://cn.vuejs.org/v2/guide/components-slots.html#%E7%8B%AC%E5%8D%A0%E9%BB%98%E8%AE%A4%E6%8F%92%E6%A7%BD%E7%9A%84%E7%BC%A9%E5%86%99%E8%AF%AD%E6%B3%95 "独占默认插槽的缩写语法")

在上述情况下，当**被提供的内容*****只有*****默认插槽时**，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 v-slot直接用在组件上：

```javascript 
<current-user 
  v-slot:default="slotProps"
>
{{ slotProps.user.firstName }}
</current-user>
```


这种写法还可**以更简单**。就像假定未指明的内容对应默认插槽一样，不带参数的 v-slot被假定对应默认插槽：

```javascript 
<current-user 
  v-slot="slotProps"
 >
{{ slotProps.user.firstName }}
</current-user>
```


注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确：

## **子组件：**

### **后备内容**

有时为一个插槽设置具体的后备 (也就是默认的) 内容是很有用的，它只会在没有提供内容的时候被渲染我们可能希望这个\<button>内绝大多数情况下都渲染文本“Submit”。**为了将“Submit”作为后备内容，我们可以将它放在\<slot>标签内：**

```javascript 
<button type="submit">
  <slot>Submit</slot>
</button>
```


### **具名插槽**

有时我们需要多个插槽。对于这样的情况，**\<slot>元素有一个特殊的特性：name。这个特性可以用来定义额外的插槽**：

```javascript 
<div class="container">

<header>
  <!-- 我们希望把页头放这里 -->
  <slot name="header"></slot>
</header>
<main>
  <!-- 我们希望把主要内容放这里 -->
  <slot></slot>
</main>
<footer>
  <!-- 我们希望把页脚放这里-->
  <slot name="footer"></slot>
</footer>
</div>
```


一个不带name的\<slot>出口会带有隐含的名字“default”。注意v-slot只能添加在一个\<template>上(只有一种例外情况)，这一点和已经废弃的slot

&#x20;特性不同。

### [作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD "作用域插槽")

有时让插槽内容能够访问子组件中才有的数据是很有用的。例如，设想一个带有如下模板的 

```javascript 
<current-user>
 组件：
<span>
   <slot v-bind:user="user">{{ user.lastName }}</slot> 
</span>
```


## [解构插槽 Prop](https://cn.vuejs.org/v2/guide/components-slots.html#%E8%A7%A3%E6%9E%84%E6%8F%92%E6%A7%BD-Prop "解构插槽 Prop")

作用域插槽的内部工作原理是将你的插槽内容包裹在一个拥有单个参数的函数里：

```javascript 
function (slotProps) {
  // 插槽内容
}
```


这意味着 v-slot的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。所以在支持的环境下 ([单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html "单文件组件")或[现代浏览器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9 "现代浏览器"))，你也可以使用 [ES2015 解构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E8%A7%A3%E6%9E%84%E5%AF%B9%E8%B1%A1 "ES2015 解构")来传入具体的插槽 prop，如下：

```javascript 
<current-use r v-slot="{ user }"> 
  {{ user.firstName }}
</current-user>
```


这样可以使模板更简洁，尤其是在该插槽提供了多个 prop 的时候。它同样开启了 **prop 重命名**等其它可能，例如将 user重命名为 person：

```javascript 
<current-user
  v-slot="{ user: person }" 
>
  {{ person.firstName }}
</current-user>
```


你甚至**可以定义后备内容，用于**插槽 prop 是 undefined 的情形：

```javascript 
<current-user
  v-slot="{ user = { firstName: 'Guest' } }" 
>
  {{ user.firstName }}
</current-user>
```


## [动态插槽名](https://cn.vuejs.org/v2/guide/components-slots.html#%E5%8A%A8%E6%80%81%E6%8F%92%E6%A7%BD%E5%90%8D "动态插槽名")

[动态指令参数](https://cn.vuejs.org/v2/guide/syntax.html#%E5%8A%A8%E6%80%81%E5%8F%82%E6%95%B0 "动态指令参数")也可以用在 v-slot上，来定义动态的插槽名：

```javascript 
<base-layout>
   <template v-slot:[dynamicSlotName]> 
    ...
  </template>
</base-layout>
```
