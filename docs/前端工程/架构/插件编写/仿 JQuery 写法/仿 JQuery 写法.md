# 仿 JQuery 写法

## 目录

- [仿 JQuery 写法](#仿-JQuery-写法)

# 仿 JQuery 写法

这种写法是仿造**JQ**实现的一种编写模式，**可以省去调用时**\*\*`new`****实例化的步骤**，并实现类似 `$(xxx).someFn(....)` 这样的调用方法，在需要频繁**DOM**操作的时候就很适合这么编写插件。笔者以前会在小项目中自己实现一些类**JQ**选择器操作的功能插件，来避免引入整个**JQ \*\*，实现插件的核心思路如下：

```typescript 
var Fn = Function(params) {
    return new Fn.prototype.init(params)
}

Fn.prototype = {
    init: function() {}
}

Fn.prototype.init.prototype = Fn.prototype
```


可以看出核心是对**JS原型链**的极致利用，首先主动对其原型上的`init`方法进行实例化并返回，`init`相当于构造函数的效果，而此时返回的实例里并没有包含`Fn`的方法，我们调用时**JS**自然就会从`init`的原型对象上去查找，于是最终`init`下的原型才又指向了`Fn`的原型，通过这种"套娃"的手法，使得我们能够不通过实例化`Fn`又能正确地访问到`Fn`下的原型对象

说了这么多，还是举个栗子🌰，以下代码实现了一个简单的样式操作插件：

```typescript 
;(function (global) {
  "use strict";

  var MyPlugin = function (el) {
    return new MyPlugin.prototype.init(el)
  };

  MyPlugin.prototype = {
    init: function (el) {
      this.el = typeof el === "string" ? document.querySelector(el) : el;
    },
    setBg: function (bg) {
      this.el.style.background = bg;
      return this
    },
    setWidth: function (w) {
      this.el.style.width = w;
      return this
    },
    setHeight: function (h) {
      this.el.style.height = h;
      return this
    }
  };

  MyPlugin.prototype.init.prototype = MyPlugin.prototype
  // script标签引入插件后全局下挂载一个_$ 的方法
  global._$ = MyPlugin;
})(this || window);
```


使用演示：

```typescript 
<!-- 页面元素 -->
<div id="app">hello world</div>

为元素设置背景：
_$('#app').setBg('#ff0')
为元素设置背景并改变宽高：
_$('#app').setBg('#ff0').setHeight('100px').setWidth('200px')

```
