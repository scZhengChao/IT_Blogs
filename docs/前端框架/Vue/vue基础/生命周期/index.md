# 生命周期

## 目录

- [activated ,deactivated](#activated-deactivated)
- [监听声明周期](#监听声明周期)
- [执行顺序](#执行顺序)

# **activated ,deactivated**

```纯文本 
 两个钩子都只在 keep-alive 里生效，第一次进入也会执行 
    因为:缓存了 非函数式组件的实列 所以组件 并不会销毁; 所以没有beforeDestory 和 destoryed; 并且 created 和 mounted 只在最开始执行一次. 并不会每次进入页面都执行
    所以: activated 代替了created 表示keep-alive 激活状态
            deactivated 代替了 destoryed  表示 keep-alive 销毁状态
在一些场景下: 十分有用
```


# 监听声明周期

```纯文本 
常规方式:
// Parent.vue
    <Child @mounted="doSomething"/>
    // Child.vue
    mounted() {
        this.$emit("mounted");
    }
极简方式:
    <Child @hook:mounted="doSomething"/>
 当然这里不仅仅是可以监听mounted，其它的生命周期事件，例如：created，updated等都可以，是不是特别方便~
```


![  ](./assets/image/b3251a15e5779fcfec925b78a149f5c8_858ubMdPdM.png "  ")

# 执行顺序

加载渲染过程：

1.父组件 beforeCreate

2.父组件 created

3.父组件 beforeMount

4.子组件 beforeCreate

5.子组件 created

6.子组件 beforeMount

7.子组件 mounted

8.父组件 mounted

更新过程：

1\. 父组件 beforeUpdate

2.子组件 beforeUpdate

3.子组件 updated

4.父组件 updated

销毁过程：

1\. 父组件 beforeDestroy

2.子组件 beforeDestroy

3.子组件 destroyed

4.父组件 destoryed
