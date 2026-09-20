# 闭包式写法

## 目录

- [闭包式写法](#闭包式写法)

## 闭包式写法

上面的插件使用时如果调用 `say` 方法，会打印方法中的欢迎字样，并显示初始化的 `name` 值：

```typescript 
var aFn = new MyPlugin('呀哈哈')
aFn.say() // 欢迎你: 呀哈哈
```


但由于属性能被直接访问，插件中的变量就可以随意修改，这可能是我们不想看到的：

```typescript 
var aFn = new MyPlugin('呀哈哈')
aFn.name = null
aFn.say() // 欢迎你: null
```


那么如果要创建**私有变量**，可以利用**JS闭包**原理来编写插件，我们使用**工厂模式**来创建函数，再举个栗子🌰，如下代码实现了一个简单正则校验的插件：

```typescript 
; (function (global) {
    "use strict";

    var MyPlugin = function (value) {
        var val = value
        var reg = {
            phone: /^1[3456789]\d{9}$/,
            number: /^-?\d*\.?\d+$/
        };
        return {
            getRegs() {
                return reg
            },
            setRegs(params) {
                reg = { ...reg, ...params }
            },
            isPhone() {
                reg.phone.test(val) && console.log('这是手机号')
                return this
            },
            isNumber() {
                reg.number.test(val) && console.log('这是数字')
                return this
            }
        };
    };

    // 函数自执行将 this（全局下为window）传入，并在其下面挂载方法
    global.MyPlugin = MyPlugin;
    // 兼容CommonJs规范导出
    if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin;
})(this);
```


这时我们再调用插件，其内部的变量是不可访问的，只能通过插件**内部的方法查看/修改**：

```typescript 
var aFn = new MyPlugin()

console.log( aFn.reg ) // undefined

var reg = aFn.getRegs()
console.log( reg ) // {"phone":{....},"number":{.....}}
```


上面代码中我们在 `isPhone` `isNumber` 方法的最后都返回了 `this`，这是为了实现如下的链式调用：

```typescript 
var aFn = new MyPlugin(13800138000)

aFn.isPhone().isNumber() // log: > 这是手机号 > 这是数字

```
