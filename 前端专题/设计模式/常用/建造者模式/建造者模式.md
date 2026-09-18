# 建造者模式

建造者模式是一种对象创建设计模式，它旨在`通过一步步的构建流程来创建复杂对象`。其代码示例如下：

```javascript 
// 创建 Product 类
class Sandwich {
  constructor() {
    this.ingredients = [];
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  toString() {
    return this.ingredients.join(', ');
  }
}

// 创建一个建造者类
class SandwichBuilder {
  constructor() {
    this.sandwich = new Sandwich();
  }

  reset() {
    this.sandwich = new Sandwich();
  }

  putMeat(meat) {
    this.sandwich.addIngredient(meat);
  }

  putCheese(cheese) {
    this.sandwich.addIngredient(cheese);
  }

  putVegetables(vegetables) {
    this.sandwich.addIngredient(vegetables);
  }

  get result() {
    return this.sandwich;
  }
}

// 创建用户（director）使用的 builder
class SandwichMaker {
  constructor() {
    this.builder = new SandwichBuilder();
  }

  createCheeseSteakSandwich() {
    this.builder.reset();
    this.builder.putMeat('ribeye steak');
    this.builder.putCheese('american cheese');
    this.builder.putVegetables(['peppers', 'onions']);
    return this.builder.result;
  }
}

// 建造一个三明治
const sandwichMaker = new SandwichMaker();
const sandwich = sandwichMaker.createCheeseSteakSandwich();
console.log(`Your sandwich: ${sandwich}`); 
// Output: Your sandwich: ribeye steak, american cheese, peppers, onions

```
