# 类装饰器

## 目录

- [例一](#例一)
- [例二](#例二)
- [例三](#例三)

类型声明：

```typescript 
type ClassDecorator = <TFunction extends Function>
  (target: TFunction) => TFunction | void;

```


- @参数:
  1. `target`: 类的构造器。
- @返回: &#x20;

  如果**类装饰器返回了一个值，她将会被用来代替原有的类构造器的声明。**

因此，类装饰器适合用于继承一个现有类并添加一些属性和方法。

# 例一

> 注意  如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些。&#x20;

```javascript 
 @sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

我们可以这样定义@sealed装饰器：
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

```


# 例二

下面是一个重载构造函数的例子。&#x20;

```javascript 
 function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class FF extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}
@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}
console.log(new Greeter("world"));
```


# 例三

例如我们可以添加一个`toString`方法给所有的类来覆盖它原有的`toString`方法。

```typescript 
type Consturctor = { new (...args: any[]): any };

function toString<T extends Consturctor>(BaseClass: T) {
  return class extends BaseClass {
    toString() {
      return JSON.stringify(this);
    }
  };
}

@toString
class C {
  public foo = "foo";
  public num = 24;
}

console.log(new C().toString())
// -> {"foo":"foo","num":24}

```


遗憾的是装饰器并没有类型保护，这意味着：

```typescript 
declare function Blah<T>(target: T): T & {foo: number}

@Blah
class Foo {
  bar() {
    return this.foo; // Property 'foo' does not exist on type 'Foo'
  }
}

new Foo().foo; // Property 'foo' does not exist on type 'Foo'

```


这是[一个TypeScript的已知的缺陷](https://github.com/microsoft/TypeScript/issues/4881 "一个TypeScript的已知的缺陷")。 目前我们能做的只有额外提供一个类用于提供类型信息：

```typescript 
declare function Blah<T>(target: T): T & {foo: number}

class Base {
  foo: number;
}

@Blah
class Foo extends Base {
  bar() {
    return this.foo;
  }
}

new Foo().foo;

```
