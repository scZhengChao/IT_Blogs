# es - stage3

## 目录

- [方法装饰器](#方法装饰器)
- [访问器装饰器](#访问器装饰器)
- [属性装饰器](#属性装饰器)
- [类装饰器](#类装饰器)
- [此外stage3对比legacy提案特有的两个用法](#此外stage3对比legacy提案特有的两个用法)

[   https://typescript.p6p.net/typescript-tutorial/decorator.html#%E6%96%B9%E6%B3%95%E8%A3%85%E9%A5%B0%E5%99%A8](https://typescript.p6p.net/typescript-tutorial/decorator.html#%E6%96%B9%E6%B3%95%E8%A3%85%E9%A5%B0%E5%99%A8 "   https://typescript.p6p.net/typescript-tutorial/decorator.html#%E6%96%B9%E6%B3%95%E8%A3%85%E9%A5%B0%E5%99%A8")

> 本次进入`stage3`提案的用法

装饰器函数签名如下：

```typescript 
type Decorator = (value: Input, context: {
  kind: string;
  name: string | symbol;
  access: {
    get?(): unknown;
    set?(value: unknown): void;
  };
  isPrivate?: boolean;
  isStatic?: boolean;
  addInitializer?(initializer: () => void): void;
}) => Output | void;

```


装饰器函数包含两个入参参数

1、被装饰的值本身

2、被装饰值的上下文信息

- kind :`"class"|"method"|"getter"|"setter"|"field"|"accessor"`。表示装饰器的类型
- name 装饰值的名称
- access 同个该属性读写值
- isStatic 是否静态属性
- isPrivate 是否私有属性
- addInitializer 用于执行一些初始化逻辑

各种不同类型的装饰器如下

#### 方法装饰器

```typescript 
type ClassMethodDecorator = (value: Function, context: {
  kind: "method";
  name: string | symbol;
  access: { get(): unknown };
  isStatic: boolean;
  isPrivate: boolean;
  addInitializer(initializer: () => void): void;
}) => Function | void;

```


方法装饰器接收被装饰的方法作为第一个参数并可选的返回一个函数。返回的函数将替代原先的函数。方法装饰器可作用于静态方法或者原型方法

#### 访问器装饰器

```typescript 
type ClassGetterDecorator = (value: Function, context: {
  kind: "getter";
  name: string | symbol;
  access: { get(): unknown };
  isStatic: boolean;
  isPrivate: boolean;
  addInitializer(initializer: () => void): void;
}) => Function | void;

type ClassSetterDecorator = (value: Function, context: {
  kind: "setter";
  name: string | symbol;
  access: { set(value: unknown): void };
  isStatic: boolean;
  isPrivate: boolean;
  addInitializer(initializer: () => void): void;
}) => Function | void;

```


访问器装饰器和方法装饰器类似，接收被装饰器的原始方法，可以返回一个函数替代原始方法

#### 属性装饰器

```typescript 
type ClassFieldDecorator = (value: undefined, context: {
  kind: "field";
  name: string | symbol;
  access: { get(): unknown, set(value: unknown): void };
  isStatic: boolean;
  isPrivate: boolean;
}) => (initialValue: unknown) => unknown | void;

```


- 和访问器装饰器、方法装饰器区别，属性装饰器的第一个参数为undefined。属性装饰器可以返回一个初始化函数，返回的初始化函数的入参为原始属性值，返回值为替代原始的属性值

#### 类装饰器

```typescript 
type ClassDecorator = (value: Function, context: {
  kind: "class";
  name: string | undefined;
  addInitializer(initializer: () => void): void;
}) => Function | void;

```


- 类装饰器第一个参数为被装饰的类，可以返回一个新的类去替代原有的类

#### 此外stage3对比legacy提案特有的两个用法

- 类自动访问器（Class Auto-Accessors） 类自动访问器是一种新定义的行为。通过在类属性名前加上`accessor`关键字进行使用

```typescript 
class C {
  accessor x = 1;
}
// 与常规字段不同，自动访问器在类原型上定义了 getter 和 setter。getter 和 setter 默认获取和设置私有字段上的值
// 等同如下代码
class C {
  #x = 1;

  get x() {
    return this.#x;
  }

  set x(val) {
    this.#x = val;
  }
}

```


类自动访问器也可以被装饰，装饰器函数签名如下

```typescript 
type ClassAutoAccessorDecorator = (
  value: {
    get: () => unknown;
    set(value: unknown) => void;
  },
  context: {
    kind: "accessor";
    name: string | symbol;
    access: { get(): unknown, set(value: unknown): void };
    isStatic: boolean;
    isPrivate: boolean;
    addInitializer(initializer: () => void): void;
  }
) => {
  get?: () => unknown;
  set?: (value: unknown) => void;
  initialize?: (initialValue: unknown) => unknown;
} | void;

```


- 和普通的属性访问器略有区别，装饰器函数第一个参数的入参是一个包含原型上get/set函数的对象。可以通过返回一个包含get/set函数的对象来取代被装饰值的行为。也可以通过`initialize`函数修改初始值

`addInitializer`初始化逻辑函数 stage3的装饰器函数中context参数入参会有一个`addInitializer`函数，它可以接收一个回调，用于执行一些初始化逻辑。一个实际的用法是例如注册web component。

```typescript 
function customElement(name) {
  (value, { addInitializer }) => {
    addInitializer(function() {
      customElements.define(name, this);
    });
  }
}

@customElement('my-element')
class MyElement extends HTMLElement {
  static get observedAttributes() {
    return ['some', 'attrs'];
  }
}
// 等同如下代码
class MyElement {
  static get observedAttributes() {
    return ['some', 'attrs'];
  }
}

let initializersForMyElement = [];

MyElement = customElement('my-element')(MyElement, {
  kind: "class",
  name: "MyElement",
  addInitializer(fn) {
    initializersForMyElement.push(fn);
  },
}) ?? MyElement;

for (let initializer of initializersForMyElement) {
  initializer.call(MyElement);
}

```


- 如果是`legacy`提案，我们是无法通过装饰器一步到位去注册web component的，必须手动调用`customElements.define(name, xxx)`

[差别](差别.md "差别")
