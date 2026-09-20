# 写给前端同学的依赖注入(DI) 介绍

## 目录

- [一、依赖注入的基础知识介绍](#一依赖注入的基础知识介绍)
  - [1.1 Decorator](#11-Decorator)
    - [1.1.1 Object.defineProperty()](#111-ObjectdefineProperty)
    - [1.1.2 Decorator 的作用范围](#112-Decorator-的作用范围)
      - [1.1.2.1 作用在属性上](#1121-作用在属性上)
      - [1.1.2.1 作用在类上](#1121-作用在类上)
  - [1.2 Reflect Metadata](#12-Reflect-Metadata)
- [二、什么是依赖注入](#二什么是依赖注入)
- [三、简易DI实现](#三简易DI实现)
- [四、更多](#四更多)

要了解依赖注入，首先要知道这个概念的缘由是哪里。

众所周知，javascript 作为一门面向对象的语言，本质上是函数跟原型的组合，我们通常所说的 this 指向的是函数的轨迹，其面向对象的封装、多态跟继承，是在原型的基础上实现的。

es6 为 javascript 赋予了类 (class) 的属性，虽然我们知道这只是函数的语法糖，但是它确实实现了传统意义上的类，因此其让类的特性得以应用。类能够实现的依赖注入，也就能在我们代码的实现得以应用。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8625aa7486a8464082d0f30652725294~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

在类的基础上，我们又通过装饰器实现了依赖注入。下面我们先来简单了解一些基础知识。

# 一、依赖注入的基础知识介绍

## 1.1 Decorator

### 1.1.1 Object.defineProperty()

语法： Object.defineProperty(obj, prop, descriptor)

参数

- `obj`

  要定义属性的对象。
- `prop`

  要定义或修改的属性的名称或 [Symbol](https://link.juejin.cn?target=https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol "Symbol") 。
- `descriptor`

  要定义或修改的属性描述符。

属性描述符是一个对象，具有以下可以修改的属性。

- `configurable`

  当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。 **默认为** **`false`**。
- `enumerable`

  当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。 **默认为`false`**。
- `value`

  该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 **默认为 undefined**。
- `writable`

  当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被[赋值运算符](https://link.juejin.cn?target=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#assignment_operators "赋值运算符")[ (en-US)](https://link.juejin.cn?target=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#assignment_operators " (en-US)")改变。 **默认为 ****`false`****。**
- `get`

  属性的 getter 函数，如果没有 getter，则为 `undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。 \*\*默认为 undefined \*\*。
- `set`

  属性的 setter 函数，如果没有 setter，则为 `undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的 `this` 对象。 \*\*默认为 undefined \*\*。

`Decorator` **其实就是一个语法糖，背后其实就是利用** `es5` 的 `Object.defineProperty`， **其本质是一个普通的函数，用于扩展类属性和类方法**。其接收三个参数(`target`, `name`, `descriptor`)， 参数指代的含义也跟 `Object.defineProperty` 一样。

```typescript 
@eat
class Pig {
  constructor() {}
}

function eat(target, key, descriptor) {
  console.log('吃饭');
  console.log(target);
  console.log(key);
  console.log(descriptor);
  target.prototype.eat = '吃吃吃';
}

const peppa = new Pig();
console.log(peppa.eat);

// 吃饭
// [Function: Pig]
// undefined
// undefined
// 吃吃吃


```


上面是一个最简单的装饰器的运用，我们首先声明一个类 `Pig`，然后在声明一个装饰器函数 `eat`， 在`eat`中将传入的三个参数分别打印出来，并将第一个参数 `target` 的原型 `prototype` 上添加一个属性 `eat`，并赋值为'吃吃吃'，然后将函数 `eat` 作为装饰在 `Person` 这个类本身上。最后，构造一个`Pig`的实例`peppa`，并打印 `peppa` 上的`eat`属性。

然后从下面的运行结果中我们可以看出，代码中会先打印出'吃饭'，然后是参数`target`，其次是参数`key`，再然后是参数`descriptor`，最后才是`peppa`的`eat`属性。这是因为装饰器对类的行为的改变，是代码**编译时**发生的，而不是在运行时。这意味着，**装饰器能在编译阶段运行代码。也就是说，装饰器本质就是编译时执行的函数。**

综上， `Decorator` 有如下特点：

- 使用简单，易于理解
- 在不改变原有代码情况下，扩展类属性和类方法
- 是一个编译时执行的函数

### 1.1.2 Decorator 的作用范围

Decorator 可以**作用在类、类的属性上，不能直接作用在函数上。**

#### 1.1.2.1 作用在属性上

以一个logger为例：

```typescript 
class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  var originalMethod = descriptor.value;

  descriptor.value = function() {
    console.log(`Calling "${name}" with`, arguments);
    return originalMethod.apply(null, arguments);
  };

  return descriptor;
}

const math = new Math();

// 传递的参数将被打印
math.add(2, 4); // Calling "add" with 2, 4

```


#### 1.1.2.1 作用在类上

```typescript 
function Car(brand, price) {
  return function(target) {
    target.brand = brand;
    target.price = price;
  }
}

@Car('benz', '1000000')
class Benz() { }

@Car('BMW', '600000')
class BMW() { }

@Car('audi', '400000')
class Audi() { }

```


## 1.2 Reflect Metadata

Reflect Metadata 是 ES7 的一个提案，它主要用来**在声明的时候添加和读取元数据，可以被用于类，类成员以及参数。**

简单来说，你可以通过装饰器来给类添加一些自定义的信息。然后通过反射将这些信息提取出来。当然你也可以通过反射来添加这些信息。

TypeScript 在 1.5+ 的版本已经支持它，你只需要：

- `npm i reflect-metadata --save`。
- 在 `tsconfig.json` 里配置 `emitDecoratorMetadata` 选项。
- 在代码的第一行引入 `'relfect-metadata'`

```typescript 
/**
* @param metadataKey 元数据入口的 key
* @param metadataValue 元数据入口的 value
* @returns 装饰器函数
*/
function metadata(metadataKey: any, metadataValue: any): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
};

```


`Reflect.metadata` 当作 `Decorator` 使用，当修饰类时，在类上添加元数据，当修饰类属性时，在类原型的属性上添加元数据，如：

```typescript 
@Reflect.metadata('inClass', 'A')
class Test {
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world';
  }
}

console.log(Reflect.getMetadata('inClass', Test)); // 'A'
console.log(Reflect.getMetadata('inMethod', new Test(), 'hello')); // 'B'

```


然后我们需要实现我们自己的装饰器并使用可用的**反射元数据设计键之一**。目前只有三个可用：

- **类型元数据**使用元数据键 `"design:type"`。
- **参数类型 metadata**使用 metadata key `"design:paramtypes"`。
- **返回类型元数据**使用元数据键 `"design:returntype"`。

# 二、什么是依赖注入

众所周知，javascript 是一门面向对象(Object-oriented programming，OOP)的语言，依赖注入(DI)和控制反转(IoC)是具体的手段，是OOP理论中**依赖倒置原则**的体现形式，通过**信息隐藏**来**降低对象之间的耦合**。

**将创建对象的任务转移给其他 class，并直接使用依赖项的过程，被称为“依赖项注入”。**（DI）

IOC（Inversion of Control， 控制反转）就是一个可以自动实例化具体类并且管理各对象之间关系的**容器**，有了这个自动化的容器，我们关注的就不是具体的关系，**而是上升到只需关注抽象之间的关系，而且还可以省去手动实例化。**

当需求达到一定复杂的程度时，我们不能为了能穿上衣服去从布从纽扣开始从头实现，最好能把一些操作封装起来，放到一个工厂或者是仓库，我们需要什么直接从工厂的仓库里面直接拿。

这个时候就**需要依赖注入**了，我们实现一个 IOC 容器（仓库`）`，然后需要衣服就从仓库里面直接拿实例好的衣服给人作为属性穿上去。

`IOC` 是一种很好的解耦合思想，在开发中，`IoC` 意味着你设计好的对象交给容器控制，而不是使用传统的方式，在对象内部直接控制。

比较显示使用依赖注入的模块有：

```typescript 
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}

```


（该代码截取自 nest 官网）

或者是这样的代码：

```typescript 
import { Component } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: `
    <h2>Hello World</h2>
    <p>This is my first component!</p>
    `,
})
export class HelloWorldComponent {
  // The code in this class drives the component's behavior.
}

```


（该代码截取自 Angular 官网）

# 三、简易DI实现

(该部分内容来自于 [十几行代码实现一个ts依赖注入](https://juejin.cn/post/6844903768815828999 "十几行代码实现一个ts依赖注入"))

1、实现一个 IoC 容器 `Injector` ，并实例化一个根容器 `rootInjector`（用于存放各个依赖的工厂容器）

2、实现一个依赖注入方法 `Injectable(...)`（用于将各个依赖类注入根容器）

3、实现基于注解的属性注入方法 `Inject(...)`（将类需要用到的依赖从根容器取出来并注入到类中，若根容器不存在则创建此依赖）

```typescript 
import 'reflect-metadata';

// 工厂里面的各种操作
export class Injector {
  private readonly providerMap: Map<any, any> = new Map();
  private readonly instanceMap: Map<any, any> = new Map();

  public setProvider(key: any, value: any): void {
    if (!this.providerMap.has(key)) {
      this.providerMap.set(key, value);
    }
  }
  
  public getProvider(key: any): any {
    return this.providerMap.get(key);
  }

  public setInstance(key: any, value: any): void {
    if (!this.instanceMap.has(key)) {
      this.instanceMap.set(key, value);
    }
  }
  
  public getInstance(key: any): any {
    if (this.instanceMap.has(key)) {
      return this.instanceMap.get(key);
    }
    return null;
  }
}

// 表示根注入器(用于存放各个依赖的根容器)
export const rootInjector = new Injector();

// 将类注入到工厂中 类装饰器返回一个值，它会使用提供的构造函数来替换原来类的声明
export function Injectable(): (_constructor: any) => any {
  return function (_constructor: any): any {
    rootInjector.setProvider(_constructor, _constructor);
    return _constructor;
  };
}

// 将依赖注入到生产者
export function Inject(): (_constructor: any, propertyName: string) => any {
  return function (_constructor: any, propertyName: string): any {
    /* 
    ** 获取属性定义时的类型
    ** 使用 Reflect 的元数据 Reflect.getMetadata('design:type') 获取属性的类型，并作为唯一标识去           
    ** injector.getInstance 查询对应的实例，如果有则直接将属性映射为查找到的实例。这样就保证我们每次使用
    ** 装饰器的属性都会获得单例。
    */
    const propertyType: any = Reflect.getMetadata('design:type', _constructor, propertyName);
    const injector: Injector = rootInjector;
    let providerInsntance = injector.getInstance(propertyType);
    if (!providerInsntance) {
      const providerClass = injector.getProvider(propertyType);
      providerInsntance = new providerClass();
      injector.setInstance(propertyType, providerInsntance);
    }
    _constructor[propertyName] = providerInsntance;
  };
}

@Injectable()
class Cloth {
  name: string = '麻布';
}

@Injectable()
class Clothes {
  // 为类 Clothes 注入类 Cloth 之后类 Clothes 就拥有了使用类 Cloth 的能力
  @Inject()
  cloth: Cloth;
  clotheName: string;
  constructor() {
    this.cloth = this.cloth;
    this.clotheName = this.clotheName;
  }
  updateName(name: string) {
    this.clotheName = name;
  }
}

class Humanity {
  @Inject() 
  clothes: Clothes;
  name: string;
  constructor(name: string) {
    this.clothes = this.clothes;
    this.name = name;
  }
  update(name: string) {
    this.clothes.updateName(name);
  }
}

// 单例：用于数据状态的维护(一个变 所有变)
const people = new Humanity('syz');
console.log(people);
// Humanity {
//   clothes: Clothes { cloth: Cloth { name: '麻布' }, clotheName: undefined }
// }

people.update('耐克');
console.log(people);
// Humanity {
//   clothes: Clothes { cloth: Cloth { name: '麻布' }, clotheName: '耐克' }
// }

```


DI 还可以与 Rxjs 结合做响应式编程，这里就不展开说了。

# 四、更多

[什么是IOC(控制反转)、DI(依赖注入)](https://link.juejin.cn?target=https://www.huaweicloud.com/articles/9fafbcda1b487e833fa1cf6cfd283c7d.html "什么是IOC(控制反转)、DI(依赖注入)")

[深入理解 JavaScript 原型](https://juejin.cn/post/6901494216074100750 "深入理解 JavaScript 原型")

[十几行代码实现一个ts依赖注入](https://juejin.cn/post/6844903768815828999 "十几行代码实现一个ts依赖注入")

[Reflect Metadata](https://link.juejin.cn?target=https://jkchao.github.io/typescript-book-chinese/tips/metadata.html#%E5%9F%BA%E7%A1%80 "Reflect Metadata")

[JavaScript Reflect Metadata 详解](https://link.juejin.cn?target=https://www.jianshu.com/p/653bce04db0b "JavaScript Reflect Metadata 详解")

[Typescript: reflect metadata api](https://link.juejin.cn?target=https://www.youtube.com/watch?v=FvjAdDJPsWs "Typescript: reflect metadata api")

[React 的新范式 - DI, RxJS & Hooks](https://link.juejin.cn?target=https://github.com/wendellhu95/blog/issues/33# "React 的新范式 - DI, RxJS & Hooks")
