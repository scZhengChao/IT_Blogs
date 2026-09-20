# CSS变量

## 目录

- [CSS变量](#CSS变量)
  - [局部变量](#局部变量)
  - [全局变量](#全局变量)
  - [兼容性：](#兼容性)
  - [变量的声明](#变量的声明)
  - [var() 函数](#var-函数)
  - [默认值](#默认值)
  - [变量值的类型](#变量值的类型)
  - [作用域](#作用域)
  - [响应式布局](#响应式布局)
  - [兼容性处理](#兼容性处理)
  - [JavaScript 操作](#JavaScript-操作)

# CSS变量

## 局部变量

```javascript 
<div class="box">
    <div class="a">测试a</div>
    <div class="b">测试b</div>
    <div class="c">测试c</div>
</div>
.box {
        --color: red;
        color: var(--color);
    }
    .a {
        --color: green;
        color: var(--color);
    }
    .b {
        --color: blue;
        color: var(--color);
    }
    .c {
        --color: yellow;
    }
```


**虽然整个CSS公用一个上下文文档，但是，****对于CSS变量，却是有作用域概念的，变量只能作用于自身以及后代元素****，兄弟元素，祖先元素都不能享用。**

## 全局变量

所以，如果**你的变量是全局享用的，则建议放在:root上，例如：**

```javascript 
:root {
    --color: red;
}
```


也可以使用body或者html标签

```javascript 
body {
    --color: red;
}
```


实际上，抛开变量这个词。我们可以理解为具有继承特性的自定义CSS属性。

## 兼容性：

![  ](d0acd4a041dcfe70dafa1ab27ecfa153_qRQ5jJY6bg.png "  ")

## 变量的声明

**变量名前面要加两根连词线–，变量名大小写敏感。**

```javascript 
:root {
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;
  --header-height: 68px;
  --content-padding: 10px 20px;
  --base-color: var(----main-color); 
}
```


## var() 函数

var()函数用于**读取变量**。

```javascript 
.box {
  color: var(--main-color);
  height: var(--header-height);
}

```


## 默认值

var()函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

```javascript 
.box {
  color: var(--main-color, #000);
  height: var(--header-height, 80px);
}

```


## 变量值的类型

**如果变量值是一个字符串，可以与其他字符串拼接。 &#x20;
如果变量是数值，必须使用calc()函数，将它们连接(添加单位)。**

```javascript 
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```


## 作用域

```javascript 
<style>
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>

<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div>

```


三个选择器都声明了–color变量。不同元素读取这个变量的时候，会采用**优先级最高的规则**，因此三段文字的颜色是不一样的。

## 响应式布局

响应式布局的media命令里面声明变量，使得不同的屏幕宽度有不同的变量值。

```javascript 
:root {
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
}
body {
}
@media screen and (min-width: 768px) {
  :root {
    --main-color: #ffffff;
    --main-bg: rgb(255, 134, 255);
  }
  body {
  }
}

```


## 兼容性处理

使用@support命令进行检测。

```javascript 
a {
  color: #7F583F;
  color: var(--primary);
}

@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}

```


## JavaScript 操作

```javascript 
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');

// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary');


// 使用
 wrapperRef.current?.style?.setProperty('--height', `${document.body.clientHeight}px`);
.pc-index {
  @wrapperHeight: var(--height);

  height: @wrapperHeight;

}
```
