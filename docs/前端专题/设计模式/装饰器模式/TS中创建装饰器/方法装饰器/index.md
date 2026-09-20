# 方法装饰器

## 目录

- [方法装饰起](#方法装饰起)
- [方法装饰起](#方法装饰起)
- [创建方法装饰器](#创建方法装饰器)

类型声明：

```typescript 
type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

```


- @参数：
  1. `target`: 对于静态成员来说是类的构造器，对于实例成员来说是类的原型链。
  2. `propertyKey`: 属性的名称。
  3. `descriptor`: 属性的[描述器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor "描述器")。
- @返回： 如果返回了值，它**会被用于替代属性的描述器。**

方法装饰器不同于属性装饰器的地方在于`descriptor`参数。 通过这个参数我们可以修改方法原本的实现，添加一些共用逻辑。 例如我们可以给一些方法添加打印输入与输出的能力：

```typescript 
function logger(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args) {
    console.log('params: ', ...args);
    const result = original.call(this, ...args);
    console.log('result: ', result);
    return result;
  }
}

class C {
  @logger
  add(x: number, y:number ) {
    return x + y;
  }
}

const c = new C();
c.add(1, 2);
// -> params: 1, 2
// -> result: 3

```


# 方法装饰起

**对于方法的装饰本质是操作其描述符，可以把此时的装饰器理解成是 Object.defineProperty(obj, prop, descriptor)的语法糖。**

注意：方法不能是箭头函数；否者不生效

```typescript 
export function Before(target:object, key:string, descriptor:PropertyDescriptor):PropertyDescriptor {
    // console.log(target,key,descriptor,'---das--')
    const fn = descriptor.value;
    return {
        ...descriptor,
        value() {
            console.log('before')
            return fn.apply(this, arguments);
        }
    }
}
export function After(target, key, descriptor) {
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



@Bind()
@After
@Before
test(){
    console.log('func')
}

```


# 方法装饰起

方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：&#x20;

- **target：（对于类的静态方法）类的构造函数，或者（对于类的实例方法）类的原型。**
- **propertyKey：所装饰方法的方法名，类型为**\*\*`string|symbol`。\*\*​
- **descriptor：所装饰方法的描述对象。**

> 注意：如果代码输出目标版本小于ES5，*属性描述符*将会是undefined。 如果**方法装饰器返回一个值，它会被用作方法的*****属性描述符***\*\*。\*\*&#x20;
> 注意：如果代码输出目标版本小于ES5返回值会被忽略。&#x20;

方法**装饰器的返回值（如果有的话），就是修改后的该方法的描述对象，可以覆盖原始方法的描述对象。**

也可以没有返回值：

下面是一个方法装饰器（@enumerable）的例子，应用于Greeter类的方法上：&#x20;

```javascript 
 class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
```


我们可以用下面的函数声明来定义@enumerable装饰器：&#x20;

```javascript 
 function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}
```


这里的@enumerable(false)是一个[装饰器工厂](https://www.tslang.cn/docs/handbook/decorators.html#decorator-factories "装饰器工厂")。 当装饰器 @enumerable(false)被调用时，它会修改属性描述符的enumerable属性。&#x20;

# **创建方法装饰器**

让我们重用之前创建的同一个可枚举装饰器，但这次是在以下 Person 类的 getFullName 方法中：

```javascript 

const enumerable = (value: boolean) => {
  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    propertyDescriptor.enumerable = value;
  }
}
class Person {
  firstName: string = "Jon"
  lastName: string = "Doe"
  @enumerable(true)
  getFullName () {
    return `${this.firstName} ${this.lastName}`;
  }
}

```


如果我们从方法装饰器返回一个值，该值将成为该方法的新属性描述符。

让我们创建一个deprecated的装饰器，它在使用该方法时将传递的消息打印到控制台，记录一条消息说该方法已被弃用：

```javascript 

const deprecated = (deprecationReason: string) => {
  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
            propertyDescriptor.value.apply(this, args)
          }
          Object.defineProperty(this, memberName, {
            value: wrapperFn,
            configurable: true,
            writable: true
          });
          return wrapperFn;
        }
      }
  }
}

```


但是为什么不直接使用 Object.defineProperty 而不是为方法返回一个新的属性装饰器呢？这是必要的，因为，我们需要访问 this 的值，对于非静态类方法，它绑定到类实例。

如果，我们直接使用 Object.defineProperty ，将无法检索 this 的值，并且如果该方法以任何方式使用 this ，则当从装饰器实现中运行包装的方法时，装饰器会破坏我们的代码。

在这样情况下，getter 本身的 this 值绑定到非静态方法的类实例，并绑定到静态方法的类构造函数。

然后，在你的 getter 中创建一个本地包装函数，称为 wrapperFn，此函数使用 console.warn 将消息记录到控制台，传递从装饰器工厂收到的 deprecationReason，然后使用 propertyDescriptor.value 调用原始方法。&#x20;

apply(this, args)，以这种方式调用原始方法，并将其 this 值正确绑定到类实例，以防它是非静态方法。

然后，我们将使用 defineProperty 覆盖类中方法的值。这就像一种记忆机制，因为对同一方法的多次调用将不再调用 getter，而是直接调用 wrapperFn。

我们现在正在使用 Object.defineProperty 将类中的成员设置为将wrapperFn 作为其值。

让我们使用已弃用的装饰器：

```javascript 
const deprecated = (deprecationReason: string) => {
return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
  return {
      get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
            propertyDescriptor.value.apply(this, args)
          }
          Object.defineProperty(this, memberName, {
            value: wrapperFn,
            configurable: true,
            writable: true
          });
          return wrapperFn;
      }
    }
  }
}
class TestClass {
  static staticMember = true;
  instanceMember: string = "hello"
  @deprecated("Use another static method")
  static deprecatedMethodStatic() {
    console.log('inside deprecated static method - staticMember =', this.staticMember);
  }
  @deprecated("Use another instance method")
  deprecatedMethod () {
    console.log('inside deprecated instance method - instanceMember =', this.instanceMember);
  }
}
TestClass.deprecatedMethodStatic();
const instance = new TestClass();
instance.deprecatedMethod();

```


在这里，我们创建了一个具有两个属性的 TestClass：一个是静态的，一个是非静态的。 我们还创建了两种方法：一种是静态的，一种是非静态的。
