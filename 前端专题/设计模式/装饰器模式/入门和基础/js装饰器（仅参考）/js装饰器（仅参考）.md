# js装饰器（仅参考）

## 目录

- [工程化实现](#工程化实现)

ts装饰器语法很稳定，而且已经逐渐被大量使用了。

[前端装饰器模式快闪 装饰器模式是设计模式的一种，是为已有功能动态的添加更多功能的一种方式。重点体现了设计模式六大原则之中的单一职责原则和开闭原则。单一职责很好理解，就是专心，就是一个函数只做一件事情。开闭原则是指要对扩展开放，对修改关闭。 https://mp.weixin.qq.com/s?\_\_biz=MzAxODE2MjM1MA==\&mid=2651562932\&idx=1\&sn=098e11696e2c1b0789780f0f4a4104e6\&chksm=80257475b752fd632adaa504cd26c2a07a7bf760c40c93c86a37958ae723659397631d730797\&mpshare=1&](https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==\&mid=2651562932\&idx=1\&sn=098e11696e2c1b0789780f0f4a4104e6\&chksm=80257475b752fd632adaa504cd26c2a07a7bf760c40c93c86a37958ae723659397631d730797\&mpshare=1& "前端装饰器模式快闪 装饰器模式是设计模式的一种，是为已有功能动态的添加更多功能的一种方式。重点体现了设计模式六大原则之中的单一职责原则和开闭原则。单一职责很好理解，就是专心，就是一个函数只做一件事情。开闭原则是指要对扩展开放，对修改关闭。 https://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==\&mid=2651562932\&idx=1\&sn=098e11696e2c1b0789780f0f4a4104e6\&chksm=80257475b752fd632adaa504cd26c2a07a7bf760c40c93c86a37958ae723659397631d730797\&mpshare=1&")

```javascript 
 Function.prototype.before = function(fn){
    var _this = this;
    return function(){
        // this指向 windows ； 
        fn.apply(this,arguments);
        return _this.apply(this,arguments)
    }
}
Function.prototype.after = function(fn){
    var _this = this;
    return function(){
        var r = _this.apply(this,arguments);
        fn.apply(this,arguments);
        return r;
    }
}
var func_1 = function(){
    console.log(2)
}
func_1 = func_1.before(function(){
    console.log(1)
}).after(function(){
    console.log(3)
})
func_1()
```


# 工程化实现

```typescript 
/**
 * 工程化实现
 * webpack 和 babel；Object.defineProperty()
 * Object.defineProperty(Obj,prop,desc) 对象/对象的key/描述符
 * Babel 将我们的@函数名最终转换为：
 * Object["define" + "Property"](target, property, desc);
 * 由此可见，装饰方法本质上还是使用 Object.defineProperty()来实现的。
*/

function before(target, key, descriptor) {
  const fn = descriptor.value;
  return {
    ...descriptor,
    value() {
      console.log('before')
      return fn.apply(this, arguments);
    }
  }
}
function after(target, key, descriptor) {
  const fn = descriptor.value;
  return {
    ...descriptor,
    value() {
      let result = fn.apply(this, arguments);
      console.log('after');
      return result;
    }
  }
}
class Test {
  @after
  @before
  func(){
    console.log('func')
  }
}
const test = new Test();
test.func();
// 工程化
// 工程化的实现

// 此处以 webpack 打包项目为例，如果在一个 webpack 打包项目中你还没有使用装饰器，那么你的项目在开发效率和代码重构上就还有提升空间。
 //如果你使用 babel6，安装并配置 babel 插件 babel-plugin-transform-decorators-legacy，
//如果使用 babel7，安装并配置官方插件@babel/plugin-proposal-decorators。
//完成配置后，可以将项目中无关业务的功能尝试使用装饰器的方式实现，如登陆条件判断，防抖，节流，埋点统计等。
```
