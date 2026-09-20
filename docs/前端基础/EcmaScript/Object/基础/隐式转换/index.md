# 隐式转换

如何让 `a == 1 && a == 2 && a == 3` 返回 true 呢

**方案一**

利用隐式转换会调用 valueOf

```javascript 
const a = {
  value: 1,
  valueOf() {
    return this.value++
  }
}
console.log(a == 1 && a == 2 && a == 3) // true
```


**方案二**

在对象 valueOf 函数不存在的情况下会调用 toString 方法

```javascript 
const a = {
  value: 1,
  toString() {
    returnthis.value++
  }
}

console.log(a == 1 && a == 2 && a == 3) // true
```


**方案三**

利用`Object.defineProperty` 在全局 window 上挂载一个 a 属性

```javascript 
let _a = 1
Object.defineProperty(window, 'a', {
  get() {
    return _a++
  }
})

console.log(a == 1 && a == 2 && a == 3)

```
