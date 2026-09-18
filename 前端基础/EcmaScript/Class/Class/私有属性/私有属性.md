# 私有属性

以前，我们一般用`_`表示私有属性，但它并不靠谱，还是会被外部修改。

**你可能不希望类内部的所有内容都是全局可用的。通过在变量或函数前面添加一个#可以将它们完全保留为类内部使用**

**只能在当前类内部访问**

```javascript 
class Person {
  constructor (name) {
    this._money = 1
    this.name = name
  }
  get money () {
    return this._money
  }
  set money (money) {
    this._money = money
  }
  showMoney () {
    console.log(this._money)
  }
}
const p1 = new Person('fatfish')
console.log(p1.money) // 1
console.log(p1._money) // 1
p1._money = 2 // 依旧可以从外部修改_money属性，所以这种做法并不安全
console.log(p1.money) // 2
console.log(p1._money) // 2

```


**使用“#”实现真正私有属性**

```javascript 
class Person {
  #money=1
  constructor (name) {
    this.name = name
  }
  get money () {
    return this.#money
  }
  set money (money) {
    this.#money = money
  }
  showMoney () {
    console.log(this.#money)
  }
}
const p1 = new Person('fatfish')
console.log(p1.money) // 1
// p1.#money = 2 // 没法从外部直接修改
p1.money = 2
console.log(p1.money) // 2
console.log(p1.#money) // Uncaught SyntaxError: Private field '#money' must be declared in an enclosing class

```
