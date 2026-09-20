# vue

## 目录

- [深度选择器](#深度选择器)
  - [Vue中的Scoped](#Vue中的Scoped)

# 深度选择器

## Vue中的Scoped

Vue中也有类似的样式隔离功能，使用Scoped标记CSS部分，使用也很简单👇：可以看到，它的原理和CSS Module不太一样，Vue的Scoped会使CSS选择器后加上一个中括号。

```javascript 
<style scoped>
.myWrapper{
  border: 5px solid black
}
</style>
...
<div class="myWrapper" >
  <Calendar />
</div>
...

//编译出来的代码如下👇：
<style>
.myWrapper[data-v-2fc5154c] {
  border: 5px solid black
}
</style>
<div class="myWrapper" data-v-2fc5154c>
  ...
</div>


```


这并不是Vue独创的语法，而是属性选择器。`.myWrapper[data-v-2fc5154c]`代表选择拥有data-v-2fc5154c这个属性的、同时是myButton类的HTML元素。只有这个文件内部的HTML元素才会被打上data-v-2fc5154c这个属性。其余文件的HTML元素即使是myWrapper类，这个样式也不会对他生效。

vue项目中，经常需要使用如elementUI等组件库，有些样式直接在组件中修改无效，因为scoped局限于当前组件，去掉scoped的话又会影响全局样式。

针对这种情况，可以使用深度作用选择器（即样式穿透）。

1. **>>>**

如果项目使用的是css原生样式，那么可以直接使用 >>> 穿透修改

```javascript 
<style scoped>
/*编译前*/
.a >>> .b { 
 /* ... */
}

/*编译后*/
.a[data-v-f3f3eg9] .b { /* ... */ }
</style>
```


1. **/deep/**

项目中用到了预处理器 scss 、sass、less 操作符 >>> 可能会因为无法编译而报错 。可以使用 /deep/**注意****：vue-cli3以上版本不可以**​

```javascript 
<style lang="scss" scoped>
/*用法1*/
.a {
 /deep/ .b { 
  /* ... */
 }
} 
/*用法2*/
.a /deep/ .b { 
  /* ... */
 }
</style>
```


1. **::v-deep**

如果使用了预处理器都可以使用 ::v-deep

```javascript 
<style lang="scss" scoped>
/*用法1*/
.a{
 ::v-deep .b { 
  /* ... */
 }
} 
/*用法2*/
.a ::v-deep .b {
  /* ... */
}
</style>
```
