# 原型模式

原型模式（`Prototype Pattern`）是一种`创建型设计模式`，它可以用于**创建对象的成本相对较高**，但对于**由相同属性的对象可以通过克隆来创建**。原型模式**将对象的创建过程和对象的使用过程分离**，它通过克隆**已有对象来创建新的对象**，从而**避免了昂贵的对象创建过程**。在 `JavaScript`中，原型模式的实现很容易，因为它**天然支持对象的 clone（** 即`浅拷贝`）。

这是一个使用原型模式的示例代码：

```javascript 
// 创建一个原型对象
const carPrototype = {
  wheels: 4,
  color: 'red',
  start() {
    console.log('Starting the car...');
  },
  stop() {
    console.log('Stopping the car...');
  },
};

// 使用Object.create()方法克隆
const car1 = Object.create(carPrototype);
console.log(car1); // Output: {}

car1.wheels = 6;
console.log(car1.wheels); // Output: 6
console.log(car1.color); // Output: red

car1.start(); // Output: Starting the car...
car1.stop(); // Output: Stopping the car...

// 克隆另一个对象
const car2 = Object.create(carPrototype);
console.log(car2); // Output: {}

car2.color = 'blue'; 
console.log(car2.color); // Output: blue
console.log(car2.wheels); // Output: 4

car2.start(); // Output: Starting the car...
car2.stop(); // Output: Stopping the car...

```


在这个例子中，我们创建了一个名为 `carPrototype` 的原型对象。然后，我们通过 `Object.create()` 方法克隆了该原型对象。由于我们使用了浅拷贝，所以在使用前我们可以修改对象的属性，并且 `car2` 和 `car1` 对象的 `start()` 和 `stop()` 方法是相同的，**因为它们来自相同的原型对象。**

原型模式的一个优点是它\*\*`提供了一种简便的方式来创建具有相同属性的对象`**。它可以`减少重复代码，并且在创建对象时节省时间和资源`。当然，它也有一些缺点，例如在**使用深拷贝时可能会出现意想不到的问题 \*\*，因为**深拷贝将复制所有属性，而这些属性还可能引用其他对象。**

[原型模式（Prototype Pattern）](<./原型模式（Prototype Pattern）/index.md> "原型模式（Prototype Pattern）")
