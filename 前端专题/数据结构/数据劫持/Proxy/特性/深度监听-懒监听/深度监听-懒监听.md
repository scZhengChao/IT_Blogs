# 深度监听/懒监听

Proxy监听对象中嵌套对象的引用，在访问或修改嵌套对象时触发相应的代理处理器方法。这种特性通常称**为“深度监听”或“懒监听”**。

在 Proxy 的陷阱（trap）函数中，当你**尝试访问目标对象的某个属性，如果该属性值也是一个对象，你可以选择返回一个新的 Proxy 实例来代理这个嵌套对象，从而实现深度监听**。例如，在 get 陷阱中，你可以检查获取的属性是否为对象，如果是，则返回其对应的 Proxy。

示例：

```typescript 
const obj = {
  nestedObj: { foo: 'bar' }
}

const handler = {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver)
     if (typeof value === 'object' && value !== null) {
      return new Proxy(value, handler)
    }
     console.log('get', prop, target[prop])
    return value
  },
  set(target, property, value) {
    target[property] = value
    console.log(`Setting property '${property}' to '${value}'`)
    return true
  }
}

const proxyObj = new Proxy(obj, handler)
proxyObj.nestedObj.foo = 'baz' // 输出: Setting property 'foo' to 'baz'
```


这样一来，对于任何嵌套层次的对象属性访问或修改，只要涉及到的对象都被包装进了 Proxy，就可以全面地监听到对象内部的变化。不过需要注意的是，**这样的实现通常不会自动递归地对整个嵌套结构预先进行 Proxy 包装，而是在实际访问或修改时动态创建和返回 Proxy。这就是所谓的“懒监听”。**
