# 基于 Proxy 的沙箱环境实现\_副本

## 目录

- [with 关键字](#with-关键字)
  - [性能方面的利与弊](#性能方面的利与弊)
- [ES6 Proxy](#ES6-Proxy)
- [Symbol.unscopables](#Symbolunscopables)
- [沙箱实现](#沙箱实现)
  - [存在的问题](#存在的问题)

现在主流的另一种**沙箱使用的是 with + Proxy 来实现沙箱。该方法常用于 js 隔离，** 如微前端框架便是通过该方法实现 js 隔离，从而是微应用间不产生干扰。

### with 关键字

`JavaScript` 在查找某个未使用命名空间的变量时，会通过**作用于链来查找**，而 `with` 关键字，可以使得查找时，先从该对象的属性开始查找，若该对象没有要查找的属性，顺着上一级作用域链查找，若不存在要查到的属性，则会返回 `ReferenceError` 异常。

不推荐使用 `with`，在 ECMAScript 5 严格模式中该标签已被禁止。推荐的替代方案是声明一个临时变量来承载你所需要的属性。

#### 性能方面的利与弊

- **利**：with 语句可以在不造成性能损失的情況下，减少变量的长度。其造成的附加计算量很少。使用 'with' 可以减少不必要的指针路径解析运算。需要注意的是，很多情況下，也可以不使用 with 语句，而是使用一个临时变量来保存指针，来达到同样的效果。
- **弊**：with 语句使得程序在查找变量值时，都是先在指定的对象中查找。所以那些本来不是这个对象的属性的变量，查找起来将会很慢。如果是在对性能要求较高的场合，'with' 下面的 statement 语句中的变量，只应该包含这个指定对象的属性

相关文档：[developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with "developer.mozilla.org/zh-CN/docs/…")

### ES6 Proxy

`Proxy` 是 `ES6` 提供的新语法，`Proxy` 对象用于创建一个对象的代理，从而**实现基本操作的拦截和自定义**（如属性查找、赋值、枚举、函数调用等）。示例如下：

```javascript 
const handler = {
    get: function(obj, prop) {
        return prop in obj ? obj[prop] : 37;
    }
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b);      // 1, undefined
console.log('c' in p, p.c); // false, 37

```


### Symbol.unscopables

`Symbol.unscopables` 指用于**指定对象值**，其**对象自身和继承**的从关联对象的 `with` 环境绑定中排除的属性名称。`Symbol.unscopables` 设置了 `true` 的属性，会无视 `with` 的作用域直接到上级查找，从而造成逃逸。示例如下:

```javascript 
const property1 = 12
const object1 = {
  property1: 42
};

object1[Symbol.unscopables] = {
  property1: true
};

with (object1) {
  console.log(property1);
  // expected output: 12
}

```


在 JavaScript 中，有许多默认设置了 `Symbol.unscopables` 的属性。如：

```javascript 
Array.prototype[Symbol.unscopables]
/*{
  copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  flat: true,
  flatMap: true,
  includes: true,
  keys: true,
  values: true,
}*/

```


### 沙箱实现

通过上述对 `with` 和 `Proxy` 的了解，我们便可以构建一个可被拦截的对象，来防止沙箱内代码逃逸，对全局对象造成污染。代码如下：

```javascript 
function compileCode(code) {
    code = `with (sandbox) { ${code} }`
    const fn = new Function('sandbox', code);
    return (sandbox) => {
        const proxy = new Proxy(sandbox, {
            // 拦截所有属性，防止到 Proxy 对象以外的作用域链查找。
            has(target, key) {
                return true;
            },
            get(target, key, receiver) {
                // 加固，防止逃逸
                if (key === Symbol.unscopables) {
                    return undefined;
                }
                return Reflect.get(target, key, receiver);
            }
        });
        return fn(proxy);
    }
}

```


同时我们也可以使用 `Object.freeze` 来防止原型链被修改。

#### 存在的问题

- `code` 中可以提前关闭 `sandbox` 的 `with` 语境，如 `'} alert(this); {';`
- `code` 中可以使用 `eval` 和 `new Function` 直接逃逸

由于以上的问题目前并未找到较合适的解决方法，因此该方式并不适合执行 `不可信任的第三方代码`。

微前端框架 `qiankun` 的沙箱原理：

[juejin.cn/post/692011…](https://juejin.cn/post/6920110573418086413 "juejin.cn/post/692011…")
