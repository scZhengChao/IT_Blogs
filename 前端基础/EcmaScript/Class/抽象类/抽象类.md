# 抽象类

## 目录

- [new.target 属性](#newtarget-属性)
  - [实现抽象类的步骤](#实现抽象类的步骤)
  - [关键点](#关键点)
  - [注意事项](#注意事项)
- [ts实现](#ts实现)
  - [TypeScript 抽象类的特点](#TypeScript-抽象类的特点)
  - [实现抽象类的步骤](#实现抽象类的步骤)
  - [代码示例](#代码示例)
  - [关键点](#关键点)
  - [适用场景](#适用场景)

# **new\.target 属性**

Class 内部调用 **new\.target，返回当前 Class**;且子类继承父类时，**new\.target 会返回子类。**

**因此利用这个特点，可以**写出不能独立使用必须继承后才能使用的类。(不是实例)

### **实现抽象类的步骤**

1. **定义抽象类**：
   - 使用`class`关键字定义一个类。
   - 在类中定义具体的逻辑方法（已实现的方法）。
   - 定义抽象方法（未实现的方法），通常抛出错误以提示子类必须实现。
2. **子类继承抽象类**：
   - 使用`extends`关键字继承抽象类。
   - 实现抽象方法。

```javascript 
// 定义抽象类
class Animal {
  constructor(name) {
    if (new.target === Animal) {
      throw new Error("抽象类不能直接实例化");
    }
    this.name = name;
  }

  // 具体逻辑方法（已实现）
  eat() {
    console.log(`${this.name} 正在吃东西。`);
  }

  // 抽象方法（未实现，要求子类必须实现）
  makeSound() {
    throw new Error("子类必须实现 makeSound 方法");
  }
}

// 子类继承抽象类
class Dog extends Animal {
  constructor(name) {
    super(name);
  }

  // 实现抽象方法
  makeSound() {
    console.log(`${this.name} 正在汪汪叫。`);
  }
}

// 使用子类
const dog = new Dog("小黑");
dog.eat();       // 输出: 小黑 正在吃东西。
dog.makeSound(); // 输出: 小黑 正在汪汪叫。

// 尝试实例化抽象类会报错
// const animal = new Animal("未知"); // Error: 抽象类不能直接实例化
```


### **关键点**

1. **抽象类不能直接实例化**：
   - 在构造函数中检查`new.target`，如果直接实例化抽象类，则抛出错误。
2. **抽象方法**：
   - 在抽象类中定义未实现的方法，抛出错误以提示子类必须实现。
3. **具体逻辑方法**：
   - 抽象类可以包含已实现的方法，子类可以直接继承和使用。

### **注意事项**

- JavaScript 本身没有对抽象类的原生支持，因此需要开发者通过代码逻辑来模拟。
- 抽象类的设计应尽量简单，避免过度复杂化。

# ts实现

### **TypeScript 抽象类的特点**

1. **抽象类不能直接实例化**：
   - 只能通过子类继承并实例化子类。
2. **可以包含抽象方法**：
   - 抽象方法只有声明，没有实现，子类必须实现。
3. **可以包含具体逻辑方法**：
   - 抽象类中可以包含已实现的方法，子类可以直接继承和使用。

### **实现抽象类的步骤**

1. 使用`abstract`关键字定义抽象类。
2. 在抽象类中定义抽象方法（使用`abstract`关键字）。
3. 在抽象类中定义具体逻辑方法（不需要`abstract`关键字）。
4. 子类继承抽象类，并实现抽象方法。

### **代码示例**

```typescript 
// 定义抽象类
abstract class Animal {
  constructor(public name: string) {}

  // 具体逻辑方法（已实现）
  eat(): void {
    console.log(`${this.name} 正在吃东西。`);
  }

  // 抽象方法（未实现，要求子类必须实现）
  abstract makeSound(): void;
}

// 子类继承抽象类
class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  // 实现抽象方法
  makeSound(): void {
    console.log(`${this.name} 正在汪汪叫。`);
  }
}

// 使用子类
const dog = new Dog("小黑");
dog.eat();       // 输出: 小黑 正在吃东西。
dog.makeSound(); // 输出: 小黑 正在汪汪叫。

// 尝试实例化抽象类会报错
// const animal = new Animal("未知"); // Error: 无法创建抽象类的实例
```


### **关键点**

1. **抽象类定义**：
   - 使用`abstract class`定义抽象类。
2. **抽象方法**：
   - 使用`abstract`关键字定义抽象方法，不能有具体实现。
3. **具体逻辑方法**：
   - 可以在抽象类中直接实现具体方法，子类可以直接继承和使用。
4. **子类继承**：
   - 子类必须实现抽象方法，否则会报错。

***

### **适用场景**

- 当多个类有共同的行为，但某些行为需要子类具体实现时。
- 当需要强制子类实现某些方法时。

***
