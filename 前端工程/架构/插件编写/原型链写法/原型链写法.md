# 原型链写法

## 目录

- [原型链写法](#原型链写法)

## 原型链写法

要开始编写插件就得先了解**JS模块化**，早期的模块化是利用了**函数自执行**来实现的，在单独的函数作用域中执行代码可以避免插件中定义的变量污染到全局变量，举个栗子🌰，以下代码实现了一个简单随机数生成的插件：

```typescript 
;(function (global) {
    "use strict";

    var MyPlugin = function (name) {
        this.name = name
    };

    MyPlugin.prototype = {
        say: function () {
            console.log('欢迎你：', this.name)
        },
        random: function (min = 0, max = 1) {
            if (min <= Number.MAX_SAFE_INTEGER && max <= Number.MAX_SAFE_INTEGER) {
                return Math.floor(Math.random() * (max - min + 1)) + min
            }
        }
    };
    
    // 函数自执行将 this（全局下为window）传入，并在其下面挂载方法
    global.MyPlugin = MyPlugin;
    // 兼容CommonJs规范导出
    if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin; 
})(this);

```


直接使用 **script** 标签引入该插件，接着 `new` 一个实例就能使用插件啦：

```typescript 
var aFn = new MyPlugin()

var num = aFn.random(10, 20)
console.log(num) // 打印一个 10~20 之间的随机数
```
