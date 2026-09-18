# css modules

## 目录

- [深度选择器](#深度选择器)
  - [React的CSS Module](#React的CSS-Module)
- [可辨识的  \[filename\].module.css/less](#可辨识的--filenamemodulecssless)
  - [localIdentName](#localIdentName)
  - [css module 作用域](#css-module-作用域)
  - [css module 高级使用](#css-module-高级使用)

# 深度选择器

## React的CSS Module

首先来了解一下CSS Module的原理。它的使用很简单，在CSS文件加一个后缀`.module`，然后当做一个变量引入到JS文件中。

```javascript 
// src/Demo.js
import styles from './demo.module.css';
export default function Demo() {
  return (
    <div className={styles.myWrapper}>
      <Calendar />
    </div>
  );
}

/* src/demo.module.css */
.myWrapper {
  border: 5px solid black;
}

//被编译后👇，插入的样式 表和元素的class属性都会加上一个哈希值作为命名空间。 
<style>
.demo_myWrapper__Hd9Qg {
  border: 5px solid black;
}
</style>
<div class="demo_myWrapper__Hd9Qg">
...
</div>


```


可以看到，原本的CSS选择器和HTML元素类名都从`myWrapper`变成了`demo_myWrapper__Hd9Qg`，前面加上了文件名，后面加上了哈希值，这样就能保障样式只在当前这个文件下生效了。

但是在这种样式隔离情况下，我们原本用作覆盖的CSS也被加上了哈希值，就像下图这样，这时没有办法选中UI组件，覆盖也就不会成功。

![](image_LriDDpTfoj.png)

所以，React给我们提供了一个语法:global。它生效范围内的样式会被当作全局CSS。

具体使用如下，在CSS文件中，使用:global包裹希望全局生效的样式

```javascript 
:global(.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today) {
  border-color:purple; /* 覆盖为紫色 */
}

```


SCSS或SASS中，还可以使用嵌套语法：

```javascript 
:global {
  .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today {
    border-color:purple;
  }
}

```


最后编译出来的代码如下：

```javascript 
/* 加上了哈希*/
.demo_myWrapper__Hd9Qg {
  border: 5px solid black;
}
/* :global作用域下都不会加上哈希*/
.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today {
  border-color:purple;
}

```


借助`:global`语法，即使使用CSS Module进行样式隔离也可以如愿实现覆盖功能。

![](image_XAg30XSO6R.png)

![](image_hhCJ_pmTZM.png)

# 可辨识的  \[filename].module.css/less

```javascript 
{ 
  loader: "css-loader",
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]'
  }
}

{
    loader: 'css-loader',
    options: {
        modules: true, // 开启模块化
        localIdentName: '[path][name]-[local]-[hash:base64:5]'
    }
}

```


#### localIdentName

介绍下 localIdentName 自定义生成的类名格式，可选参数有：

- \[path]表示样式表相对于项目根目录所在的路径(默认不拼接)
- \[name] 表示样式表文件名称
- \[local] 表示样式表的类名定义名称
- \[hash:length] 表示 32 位的 hash 值

#### css module 作用域

- 作用域默认为 local 即只在当前模块生效
- global：被 `:global` 包裹起来的类名，不会被模块化

```javascript 
/* 加上 :global 会全局样式 */
:global(.global-color) {
  color: blue;
  :global(.common-width) {
    width: 200px;
  }
}
```


#### css module 高级使用

- 和外部样式混用

```javascript 
import classNames from 'classnames';
 
// 使用classNames
const wrapperClassNames = classNames({
  'common-show': visible,
  'common-hide': !visible,
  [styles1['view-wrapper']]: true
});
<div className={wrapperClassNames}></div>;
 
// 使用模板字符串
<div className={`${styles1.content} ${styles1.color} common-show`}>
  我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容我是文章内容
</div>;
```


- 覆盖第三方 UI 库

```javascript 
{/* 覆盖第三方UI库 样式*/}
<div className={styles1['am-button-custom-wrapper']}>
  <Button type={'primary'} onClick={() => toggle()}>
     {visible ? '隐藏' : '显示'}
  </Button>
</div>
 
//  覆盖第三方UI库的 样式
.am-button-custom-wrapper {
  :global {
    .am-button-primary {
      color: red;
    }
  }
}
```


[模块化引入css/less不生效](模块化引入css-less不生效.md "模块化引入css/less不生效")

[ React中使用less(use CSS Modules)的两种配置方法 创建日期: 2020年3月2日Demo源码下载参考链接：链接1链接2customize-cra API 前言：如果你想通过不暴露webpack，配置less，并且只想知道步骤... https://www.jianshu.com/p/94ac7250ccf0](https://www.jianshu.com/p/94ac7250ccf0 " React中使用less(use CSS Modules)的两种配置方法 创建日期: 2020年3月2日Demo源码下载参考链接：链接1链接2customize-cra API 前言：如果你想通过不暴露webpack，配置less，并且只想知道步骤... https://www.jianshu.com/p/94ac7250ccf0")
