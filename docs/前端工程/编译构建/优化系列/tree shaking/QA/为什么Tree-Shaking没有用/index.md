# 为什么Tree-Shaking没有用

## 目录

- [副作用](#副作用)
- [成也Babel，败也Babel](#成也Babel败也Babel)
- [不够屌的UglifyJS](#不够屌的UglifyJS)
- [那到底该怎么办？](#那到底该怎么办)
  - [如果是使用webpack打包JavaScript库](#如果是使用webpack打包JavaScript库)
  - [使用rollup打包JavaScript库](#使用rollup打包JavaScript库)
  - [使用webpack打包工程化项目](#使用webpack打包工程化项目)
- [总结](#总结)

[ GitHub - wuomzfx/tree-shaking-test: how to do tree-shaking best how to do tree-shaking best. Contribute to wuomzfx/tree-shaking-test development by creating an account on GitHub. https://github.com/wuomzfx/tree-shaking-test?tab=readme-ov-file](https://github.com/wuomzfx/tree-shaking-test?tab=readme-ov-file " GitHub - wuomzfx/tree-shaking-test: how to do tree-shaking best how to do tree-shaking best. Contribute to wuomzfx/tree-shaking-test development by creating an account on GitHub. https://github.com/wuomzfx/tree-shaking-test?tab=readme-ov-file")

如果懒得看文章，可以看下如下总结：

1. ES6的模块**引入是静态分析的**，故而**可以在编译时正确判断到底加载了什么代码。**
2. 分析程序流，**判断哪些变量未被使用、引用，进而删除此代码。**

很好，原理非常完美，那为什么我们的代码又删不掉呢？

**先说原因：都是副作用的锅！**

## 副作用

了解过函数式编程的同学对副作用这词肯定不陌生。它大致可以理解成：**一个函数会、或者可能会对函数外部变量产生影响的行为。**

举个例子，比如这个函数：

```javascript 
function go (url) {
  window.location.href = url
}
```


这个函数修改了全局变量location，甚至还让浏览器发生了跳转，这就是一个有副作用的函数。

现在我们了解了副作用了，但是细想来，我写的组件库也没有什么副作用啊，我每一个组件都是一个类，简化一下，如下所示：

```javascript 
// componetns.js
export class Person {
  constructor ({ name, age, sex }) {
    this.className = 'Person'
    this.name = name
    this.age = age
    this.sex = sex
  }
  getName () {
    return this.name
  }
}
export class Apple {
  constructor ({ model }) {
    this.className = 'Apple'
    this.model = model
  }
  getModel () {
    return this.model
  }
}
```


```javascript 
// main.js
import { Apple } from './components'

const appleModel = new Apple({
  model: 'IphoneX'
}).getModel()

console.log(appleModel)
```


用rollup在线repl尝试了下tree-shaking，也确实删掉了Person，[传送门](https://link.segmentfault.com/?enc=xlmh6roj8QCGBJqebRBkxw==.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 "传送门")

可是为什么当我通过webpack打包组件库，再被他人引入时，却没办法消除未使用代码呢？

因为我忽略了两件事情：babel编译 + webpack打包

## 成也Babel，败也Babel

Babel不用我多解释了，它**能把ES6/ES7的代码转化成指定浏览器能支持的代码。** 正是由于它，我们前端开发者才能有今天这样美好的开发环境，能够不用考虑浏览器兼容性地、畅快淋漓地使用最新的JavaScript语言特性。

然而也是由于它的编译 **，一些我们原本看似没有副作用的代码，便转化为了(可能)有副作用的。**

如果懒得点开链接，可以看下Person类被babel编译后的结果：

```javascript 
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _createClass = function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0,
      "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps),
    Constructor;
  };
}()

var Person = function () {
  function Person(_ref) {
    var name = _ref.name, age = _ref.age, sex = _ref.sex;
    _classCallCheck(this, Person);

    this.className = 'Person';
    this.name = name;
    this.age = age;
    this.sex = sex;
  }

  _createClass(Person, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }]);
  return Person;
}();
```


我们的Person类被封装成了一个IIFE(立即执行函数)，然后返回一个构造函数。那它怎么就产生副作用了呢？\*\*问题就出现在\_createClass这个方法上，\*\*你只要在上一个rollup的repl链接中，将Person的IIFE中的`_createClass`调用删了，Person类就会被移除了。至于`_createClass`为什么会产生副作用，我们先放一边。因为大家可能会产生另外一个疑问：**Babel为什么要这样去声明构造函数的？**

假如是我的话，我可能会这样去编译：

```javascript 
var Person = function () {
  function Person() {

  }
  Person.prototype.getName = function () { return this.name };
  return Person;
}();
```


因为我们以前就是这么写“类”的，那babel为什么要采用`Object.defineProperty`这样的形式呢，用原型链有什么不妥呢？自然是非常的不妥的，因为ES6的一些语法是有其特定的语义的。比如：

1. **类内部声明的方法，是不可枚举的，而通过原型链声明的方法是可以枚举的**。这里可以参考下阮老师介绍[Class 的基本语法](https://link.segmentfault.com/?enc=pDNM/J0GlPG1/ntLaob4Bw==.F59Rciebu41XKtQZvHOIXDkD0q0OyWc+jCokIyimJ0Ai7A/Cmw+kFWoqQrDnaqr7 "Class 的基本语法")
2. `for...of`的循环是通过遍历器(`Iterator`)迭代的，循环数组时并非是i++，然后通过下标寻值。这里依旧可以看下阮老师关于遍历器与for...of的介绍，以及一篇babel关于`for...of`编译的说明[transform-es2015-for-of](https://link.segmentfault.com/?enc=4xs8f5X7KGnqCLpSBOznTw==.z6tNq2E/iI6ywhsOIcowkzOVxzI5QoN2Ok1g4viwZy1IdBJM5Ldpfu5TeYQzLrihfjWOsrfP2T82f9xsW95qpg== "transform-es2015-for-of")

所以，babel为了符合ES6真正的语义，编译类时采取了`Object.defineProperty`来定义原型方法，于是导致了后续这些一系列问题。

眼尖的同学可能在我上述第二点中发的链接[transform-es2015-for-of](https://link.segmentfault.com/?enc=DorjpLasJE/5XRxyNDkL1A==.5nVnT6TZa1naU+IZDBlT1ObJOrINuOKu9ll0lcVN+4VHIgQVcu0OseehOS8mYprCT0xVV0ObPbT3aalFhVk2lA== "transform-es2015-for-of")中看到，**babel其实是有一个**\*\*`loose`\*\***模式的，直译的话叫做宽松模式。它是做什么用的呢**？它会不严格遵循ES6的语义，而采取更符合我们平常编写代码时的习惯去编译代码。比如上述的`Person`类的属性方法将会编译成直接在原型链上声明方法。

这个模式具体的babel配置如下：

```javascript 
// .babelrc
{
  "presets": [["env", { "loose": false }]]
}
```


同样的，我放个在线repl示例方便大家直接查看效果：[loose-mode](https://link.segmentfault.com/?enc=B1a8PKJFioPTy+frR5dC3Q==.mjI5KPs1SeuOdIXPH8VuZBej/DWOMTWzMhO2yeonx1xCdmoJnwsn8ChCuiplDeoEuHkwxNovLsugf0fSZePfScnLd3gU1nqlVZY1p2qqPPnEbD2oR/9ap0KqYGe6nq7vPxFFGDaqm7Demma+CnwK8SDbHjYrUf44OaqYMVl9C9gj5uXHs90q6FIDYsMdIz45cIb2NvQhW+uRGupya010wv2K7/1A0IXuEFXDSCKDRTCDmB+6AkBxAmE+PnkQpqEdNzhR2hTIohuU0jd/3t0+PZtv8J/TmuYD+5ZDq5r6b06nYijJu8Bf3wraosvS454kfoyhJ65FQq8vf+k3l0l+dBgYbummDW6rJgtrojHYyvPrjHunnrPdB5BjwXAWff5LzjHTrKVfdeRlQjNjB1kpnSFjU0ijSA7eOussKXB5Q9pSR8yE/vA8nS310S2cdPU8oTBBCn8wsF3f7qZiCmqx6ILv4BM6WLuDXsmpT3DSoXtrJm02231xiGmyXVjbxVzgsSDf0CikKgVzAXrOFaIti00IhpATbFZk8bM/5kVjyniFcruZSSyBvaKGd2USuMrIpiIc+gxRvosfPNAZuW/qKO7ERlT33hgjxhPxSQ05deY= "loose-mode")

咦，**如果我们真的不关心类方法能否被枚举，开启了**\*\*`loose`\*\***模式，这样是不是就没有副作用产生，就能完美tree-shaking类了呢？**

我们开启了`loose`模式，使用rollup打包，发现还真是如此！[传送门](https://link.segmentfault.com/?enc=Xj6HESi/RxIei90qSlb1Ow==.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 "传送门")

## 不够屌的UglifyJS

然而不要开心的太早，当我们用Webpack配合UglifyJS打包文件时，这个Person类的IIFE又被打包进去了？ What？？？

为了彻底搞明白这个问题，我搜到一条UglifyJS的issue：[Class declaration in IIFE considered as side effect](https://link.segmentfault.com/?enc=CetlZ1fH2hina/0TWWRDUQ==.a20uqxXCfCaXV7xyatCbvH/yTtzcyhr5APjQrMVHOphtzcVxAQgjVZmE2267CFN4 "Class declaration in IIFE considered as side effect")，仔细看了好久。对此有兴趣、并且英语还ok的同学，可以快速去了解这条issue，还是挺有意思的。我大致阐述下这条issue下都说了些啥。

> **issue楼主-**[**blacksonic**](https://link.segmentfault.com/?enc=0i8IpUXTihQYCAwPuIYPeg==.hc+6aZb05ieFrO/3gs1SvjoHQGe7r3yf06EsyYdBftM= "blacksonic")**好奇为什么UglifyJS不能**消除未引用的类。
>
> UglifyJS贡献者-[kzc](https://link.segmentfault.com/?enc=J046osuNGjEcZXqMUgvZ0g==.krQyZ4xFVNHh1usUZV/UhUIQvM7Bm6JGCaUkE6jlwt4= "kzc")说，uglify不进行程序流分析，所以不能排除有可能有副作用的代码。
>
> 楼主：我的代码没什么副作用啊。要不你们来个配置项，设置后，可以认为它是没有副作用的，然后放心的删了它们吧。
>
> 贡献者：我们没有程序流分析，我们干不了这事儿，实在想删除他们，出门左转 rollup 吼吧，他们屌，做了程序流分析，能判断到底有没有副作用。
>
> 楼主：迁移rollup成本有点高啊。我觉得加个配置不难啊，比如这样这样，巴拉巴拉。
>
> 贡献者：欢迎提PR。
>
> 楼主：别嘛，你们项目上千行代码，我咋提PR啊。我的代码也没啥副作用啊，您能详细的说明下么？
>
> 贡献者：变量赋值就是有可能产生副作用的！我举个例子：

```javascript 
var V8Engine = (function () {
  function V8Engine () {}
  V8Engine.prototype.toString = function () { return 'V8' }
  return V8Engine
}())
var V6Engine = (function () {
  function V6Engine () {}
  V6Engine.prototype = V8Engine.prototype // <---- side effect
  V6Engine.prototype.toString = function () { return 'V6' }
  return V6Engine
}())
console.log(new V8Engine().toString())
```


> 贡献者：`V6Engine`虽然没有被使用，**但是它修改了V8Engine原型链上的属性，这就产生副作用了**。你看`rollup`（楼主特意注明截至当时）目前就是这样的策略，直接把V6Engine 给删了，其实是不对的。
>
> 楼主以及一些路人甲乙丙丁，纷纷提出自己的建议与方案。最终定下，**可以在代码上通过**\*\*`/*@__PURE__*/`\*\***这样的注释声明此函数无副作用。**

这个issue信息量比较大，也挺有意思，其中那位uglify贡献者kzc，当时提出rollup存在的问题后还给rollup提了issue，rollup认为问题不大不紧急，这位贡献者还顺手给rollup提了个PR，解决了问题。。。

我再从这个issue中总结下几点关键信息：

1. **函数的参数若是引用类型，对于它属性的操作，都是有可能会产生副作用的**。因为首先它是引用类型，对它属性的任何修改其实都是改变了函数外部的数据。其次获取或修改它的属性，会触发`getter`或者`setter`，而`getter`、`setter`是不透明的，有可能会产生副作用。
2. uglify没有完善的程序流分析。**它可以简单的判断变量后续是否被引用、修改，但是不能判断一个变量完整的修改过程，不知道它是否已经指向了外部变量，所以很多有可能会产生副作用的代码，都只能保守的不删除。**
3. rollup有程序流分析的功能，可以更好的判断代码是否真正会产生副作用。

有的同学可能会想，连获取对象的属性也会产生副作用导致不能删除代码，这也太过分了吧！事实还真是如此，我再贴个示例演示一下：[传送门](https://link.segmentfault.com/?enc=nvMKS02hImV4PBH6meJAVQ==.570fIHK/a5HJN0y35ytoybZ8yGXdBy2eQ0gawVMvjKhKAETabV295Ux7pFDnHwwpXiuqdffjk+i9xhp2kkML+6g84uPfNJ7hAqbw8tcZ+3Z9Iduf4DCpsMRhTgUFb4RVTyEmDbZjFBuI0GlSzT59k3WBEeJsiVOdklD/kofLA1Q4wSM+eslRzqf3iZ93KgiC4VE2bXM3PKVe8656dWf8vXqLs4DAu7LwzBSsleG5T6Nbah5sbwDRdVo4Zhc2fyBatgB11UGdehqRcTGlbq4lsTobQxH5c3vEuvO0+MFpGMTZmQWuf8wwnuVY7B+IOJ7i6JjKRJXspmU8gfuOGl9o561sGIKMqNUfvFbF6ncBS/IwYLmDEkxxBYRs77a4fpeYgn+TRbKX4MGKKUBH/wUKSnbhOBJlu5GWoG7dGiFWzQl8YYNc9du89kubCATnKKNKU1HOsMd0by+AGKolOhCyB3phuk9+FxzcW6PevWyEe/Frbf8En3nxzAYr9ZLOMLy/GQOKiHp5rv6msmD1/KpQ54Zdgg9FzLmovHJb1+oJSOT7Py/cx7DModhvh4v5NHkOJg2nXKQXxGRFIpDnB2Urr8H71RqLorc4f75Qy05tzsSqXlefdqdtlV+1COiHZJuEDUmh/16xiWgx/lUjogKknjLBrF+eiunhsMZIvssohnY8C2vNMGFFXDclJ1+AlqlGMLgRAnFP7M4d81zBC3H6mGR+76OdWBGuWD7jYB0tFjOskuQlKCBfMYhglS3XXTj8baYwroTiaWe66ap5EMWfngsUs9GYydgrr6GEGfMmyCQDxmgB9MGRIjHgGCRK1+llcpkxddT5UjB04PyDdVJv2FG9d3HvbpJ0cBTxXVR8NC6r3seXNquovGKAiTpEzV8DTjpQy8uutoaLD/Uf7/S237O46wWwU4xauP6hhjc8RZhM8LCviJCA52JMfd1p9fbHCCKokyDBccP2W3PO85zVuO979bzRtHtIcGLDbJ6YOPC+F3iyeXkx+PBMAVjxRHRLdNhJrP0R/MQDEpuHkQs8Km+optUuSeEVQ7cXwRb1npryE7o9cLy8VfW1L1ZZyG0Z+T5Alc/JAZrAgqWY7Qe23rJcmDRyM8mUgV0gzy37eEHRC9zEluVmhjoq3VOdkMpt2StQIQSwYKi+a72Q4Ot7bnMVGgjGfhl5wOLBKjmvBF+a7WHA8zAQYsb09LIZRVIQnW3imqimJiyw8KA1LlNm6w== "传送门")

代码如下：

```javascript 
// maths.js
export function square ( x ) {
    return x.a
}
square({ a: 123 })

export function cube ( x ) {
    return x * x * x;
}
```


```javascript 
//main.js
import { cube } from './maths.js';
console.log( cube( 5 ) ); // 125

```


打包结果如下：

```javascript 
function square ( x ) {
  return x.a
}
square({ a: 123 });

function cube ( x ) {
    return x * x * x;
}
console.log( cube( 5 ) ); // 125
```


**而如果将**\*\*`square`****方法中的****`return x.a`****改为****`return x`****，则最终打包的结果则不会出现****`square`\*\***方法**。当然啦，如果不在`maths.js`文件中执行这个`square`方法，自然也是不会在打包文件中出现它的。

所以我们现在理解了，**当时babel编译成的**\*\*`_createClass`\*\***方法为什么会有副作用。现在再回头一看，它简直浑身上下都是副作用。**

查看uglify的具体配置，我们可以知道，目前uglify可以配置`pure_getters: true`来\*\*强制认为获取对象属性，是没有副作用的。这样可以通过它删除上述示例中的`square`****方法**。不过由于没有`pure_setters`这样的配置，**`_createClass`\*\***方法依旧被认为是有副作用的，无法删除。**

## 那到底该怎么办？

聪明的同学肯定会想，既然babel编译导致我们产生了副作用代码，**那我们先进行tree-shaking打包，最后再编译bundle文件不就好了嘛**。这确实是一个方案，然而可惜的是：这在处理项目自身资源代码时是可行的，处理外部依赖npm包就不行了。因为人家为了让工具包具有通用性、兼容性，大多是经过babel编译的。而最占容量的地方往往就是这些外部依赖包。

那先从根源上讨论，假如我们现在要开发一个组件库提供给别人用，该怎么做？

### 如果是使用webpack打包JavaScript库

先贴下webpack将项目打包为JS库的[文档](https://link.segmentfault.com/?enc=3WNXOosS4UZrtArfpzl3rQ==.fbTVa9cz1DmRrV9WX2YzV6dDH1HhukbU1yt7wynhY6x38r64UU7W/XMsWKl4VpeJIMGbZ+5wZx5xJQj3CGqQLw== "文档")。可以看到webpack有多种导出模式，一般大家都会选择最具通用性的`umd`方式，但是webpack却没支持导出ES模块的模式。

**所以，** ​**假如你把所有的资源文件通过webpack打包到一个bundle文件里的话，那这个库文件从此与Tree-shaking无缘。**

那怎么办呢？也不是没有办法。目前业界流行的组件库多是**将每一个组件或者功能函数，都打包成单独的文件或目录**。然后可以像如下的方式引入：

```javascript 
import clone from 'lodash/clone'

import Button from 'antd/lib/button';
```


但是这样呢也比较麻烦，而且不能同时引入多个组件。所以这些\*\*比较流行的组件库大哥如antd，element专门开发了babel插件，使得用户能以`import { Button, Message } form 'antd'`这样的方式去按需加载。\*\*​**本质上就是通过插件将上一句的代码又转化成如下：**

```javascript 
import Button from 'antd/lib/button';
import Message from 'antd/lib/button';
```


这样似乎是最完美的变相tree-shaking方案。唯一不足的是，对于组件库开发者来说，需要专门开发一个babel插件；对于使用者来说，需要引入一个babel插件，稍微略增加了开发成本与使用成本。

除此之外，其实还有一个比较前沿的方法。是**rollup的一个**[**提案**](https://link.segmentfault.com/?enc=A0HpZjO7VUBv0O3PULGTJw==.0Ww0zwn+MN8n5JR189aqWek9Et/JudQa9dmV/Mxaso2ywCIesjBzbqeCRbgjbcGM0aDhT0071kPDSOvLo5J6Rw== "提案")**，在package.json中增加一个key：module**，如下所示：

```json 
{
  "name": "my-package",
  "main": "dist/my-package.umd.js",
  "module": "dist/my-package.esm.js"
}
```


这样，当开发\*\*者以es6模块的方式去加载npm包时，会以`module`\*\***的值为入口文件**，这样就能够同时兼容多种引入方式，(rollup以及webpack2+都已支持)。但是webpack不支持导出为es6模块，所以webpack还是要拜拜。我们得上rollup!

(有人会好奇，那干脆把未打包前的资源入口文件暴露到`module`，让使用者自己去编译打包好了，那它就能用未编译版的npm包进行tree-shaking了。这样确实也不是不可以。但是，很多工程化项目的babel编译配置，为了提高编译速度，其实是会忽略掉`node_modules`内的文件的。所以为了保证这些同学的使用，我们还是应该要暴露出一份编译过的ES6 Module。)

### 使用rollup打包JavaScript库

吃了那么多亏后，我们终于明白，打包工具库、组件库，还是rollup好用，为什么呢？

1. 它支持导出ES模块的包。
2. 它支持程序流分析，能更加正确的判断项目本身的代码是否有副作用。

我们只要通过rollup打出两份文件，一份umd版，一份ES模块版，它们的路径分别设为`main`，`module`的值。这样就能方便使用者进行tree-shaking。

那么问题又来了，使用者并不是用rollup打包自己的工程化项目的，由于生态不足以及代码拆分等功能限制，一般还是用webpack做工程化打包。

### 使用webpack打包工程化项目

之前也提到了，我们**可以先进行tree-shaking，再进行编译**，减少编译带来的副作用，从而增加tree-shaking的效果。那么具体应该怎么做呢？

首先我们需要去掉babel-loader，然后webpack打包结束后，再执行babel编译文件。但是由于webpack项目常有多入口文件或者代码拆分等需求，我们又需要写一个配置文件，对应执行babel，这又略显麻烦。所以我们可以使用webpack的plugin，让这个环节依旧跑在webpack的打包流程中，就像[uglifyjs-webpack-plugin](https://link.segmentfault.com/?enc=GrR5Hr7dKFKE9jA7WGV+/Q==.Fv76xR2uWieDvr2S3GxQjPVKcy1CSZJKOHPrclJpOGXslRt/Ur/JrhiuItFWIMp2XzcAji3aCIE/RfUWHM1JKg== "uglifyjs-webpack-plugin")一样，**不再是以loader的形式对单个资源文件进行操作，而是在打包最后的环节进行编译。这里可能需要大家了解下webpack的**[**plugin机制**](https://link.segmentfault.com/?enc=Y6qpJA2yRatzALEbLEg8sw==.0V5nMLF5bceqJAFgd3ky5mZtJE9GpRHyJKLj5Dto7sXXbExJUYB6FIMeJ8QtaUJF "plugin机制")**。**

关于uglifyjs-webpack-plugin，这里有一个小细节，webpack默认会带一个低版本的，可以直接用`webpack.optimize.UglifyJsPlugin`别名去使用。具体可以看webpack的[相关说明](https://link.segmentfault.com/?enc=Tka4LfYy+tStINj9s/6fZg==.6d3x+MiRfoYx5W3QGIV11M2virsxKZhoEdN3uG4M4yh9I6MZhcBqkwoZ5uhd200bQUoOf/GxBLZoDBuGWsiIEA== "相关说明")

> webpack =< v3.0.0 currently contains v0.4.6 of this plugin under webpack.optimize.UglifyJsPlugin as an alias. For usage of the latest version (v1.0.0), please follow the instructions below. Aliasing v1.0.0 as webpack.optimize.UglifyJsPlugin is scheduled for webpack v4.0.0

而这个**低版本的uglifyjs-webpack-plugin**使用的依赖[uglifyjs](https://link.segmentfault.com/?enc=JuvPp2V7No+MnnjfWkVmFQ==.HNSXt6N3EqziyDpEbxL31yTkyrR7rnUpHjok5coRa1xog58IYnA/+/SLcwV09ia8 "uglifyjs")也是低版本的，它没有`uglify`ES6代码的能力，故而如果我们有这样的需求，需要在工程中重新`npm install uglifyjs-webpack-plugin -D`，安装最新版本的`uglifyjs-webpack-plugin`，重新引入它并使用。

这样之后，我们再使用webpack的babel插件进行编译代码。

问题又来了，这样的需求比较少，因此webpack和babel官方都没有这样的插件，只有一个第三方开发者开发了一个插件[babel-webpack-plugin](https://link.segmentfault.com/?enc=hlJBdY6C7VFpAyCJ8U//aQ==.ASorqahSczdOoSGZKJn6ix8pcCcJ2uUK5TUqGwEdsqb0G9FIc+fojPEOTvv39PmC "babel-webpack-plugin")。可惜的是这位作者已经近一年没有维护这个插件了，并且存在着一个问题，此插件不会用项目根目录下的`.babelrc`文件进行babel编译。有人对此提了[issue](https://link.segmentfault.com/?enc=JOY0X5qSE6m9dXQ81C5s0w==.WYlbsvpejklkrmyxGPW+0SVMMMC7pP8s35/uYGR6iR09Uhz2oWiSHKE03vt1pOGXgZKbPHDqSOPXM6olKGjDqA== "issue")，却也没有任何回应。

那么又没有办法，就我来写一个新的插件吧----[webpack-babel-plugin](https://link.segmentfault.com/?enc=ROscbcX9xUueBhx8PUXBAw==.ItbUHB9UKOEhu8BYVeSF351qONfeoEBBXXP1+b/+hgDpmCnGhrOKzir8DZEoGJmL "webpack-babel-plugin")，有了它之后我们就能让webpack在最后打包文件之前进行babel编译代码了，具体如何安装使用可以点开项目查看。注意这个配置需要在`uglifyjs-webpack-plugin`之后，像这样：

```javascript 
plugins: [
  new UglifyJsPlugin(),
  new BabelPlugin()
]
```


但是这样呢，有一个毛病，由于babel在最后阶段去编译比较大的文件，耗时比较长，所以建议区分下开发模式与生产模式。另外还有个更大的问题，`webpack`本身采用的编译器[acorn](https://link.segmentfault.com/?enc=0J49H4I8sIy7Z1cCKLIiyA==.ebNAxT2Db1P3uK20sR7ZwrWnRlaOJmToNaLVhHlU2es/jdjW9jjdhw7IIc68USB5 "acorn")不支持对象的扩展运算符(...)以及某些还未正式成为ES标准的特性，所以。。。。。

所以如果特性用的非常超前，还是需要`babel-loader`，但是`babel-loader`要做专门的配置，把还在es stage阶段的代码编译成ES2017的代码，以便于`webpack`本身做处理。

**感谢掘金热心网友的提示，还有一个插件**[**BabelMinifyWebpackPlugin**](https://link.segmentfault.com/?enc=wuxJkWxX6dWfpVPFHeeIoQ==.m79/OsclvvIKM9YHB3afnl5b6ez7iRrK0NzjssWGwJgSgaX5yYiuBqJg3pjS2oVRbOnc8XrPBosR/epg2FwK1ohMI76P7zkHifD/SS+mxVU= "BabelMinifyWebpackPlugin")**，它所依赖的**[**babel/minify**](https://link.segmentfault.com/?enc=E1MddR5LtRbgoYlDZKtf9A==.T0gsnebaXUpZOFJ0e6XCUijHc6UXHsNubScg6Loi7PQ= "babel/minify")**也集成了uglifyjs。使用此插件便等同于上述使用UglifyJsPlugin + BabelPlugin的效果，如若有此方面需求，建议使用此插件。**

## 总结

上面讲了这么多，我最后再总结下，在当下阶段，在tree-shaking上能够尽力的事。

1. 尽量不写带有副作用的代码。诸如编写了立即执行函数，在函数里又使用了外部变量等。
2. 如果对ES6语义特性要求不是特别严格，可以开启babel的`loose`模式，这个要根据自身项目判断，如：是否真的要不可枚举class的属性。
3. 如果是开发JavaScript库，请使用rollup。并且提供ES6 module的版本，入口文件地址设置到package.json的`module`字段。
4. 如果JavaScript库开发中 **，难以避免的产生各种副作用代码，可以将功能函数或者组件，打包成单独的文件或目录，以便于用户可以通过目录去加载。如有条件**，也可为自己的库开发单独的webpack-loader，便于用户按需加载。
5. 如果是工程项目开发，对于依赖的组件，只能看组件提供者是否有对应上述3、4点的优化。对于自身的代码，除1、2两点外，对于项目有极致要求的话，可以先进行打包，最终再进行编译。
6. 如果对项目非常有把握，可以通过uglify的一些[编译配置](https://link.segmentfault.com/?enc=VlpJ30dv/VFfI7k/1s2rvw==.XKm0UJ11JSZzIG70ZLfZOFj9p+N8Bu9mNeYpAOXFYgZ4SaEMee4pR+bA773vttwcS0d4MGglta4MIY4pCZom7Q== "编译配置")，如：`pure_getters: true`，删除一些强制认为不会产生副作用的代码。

故而，在当下阶段，依旧没有比较简单好用的方法，便于我们完整的进行tree-shaking。所以说，想做好一件事真难啊。不仅需要靠个人的努力，还需要考虑到历史的进程。
