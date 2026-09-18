# 参数装饰器

## 目录

- [参数装饰器 ](#参数装饰器-)
- [创建参数装饰器](#创建参数装饰器)

类型声明：

```typescript 
type ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => void;

```


- @参数：
  1. `target`: 对于静态成员来说是类的构造器，对于实例成员来说是类的原型链。
  2. `propertyKey`: 属性的名称(注意是方法的名称，而不是参数的名称)。
  3. `parameterIndex`: 参数在方法中所处的位置的下标。
- @返回： &#x20;

  **返回的值将会被忽略。**

单独的参数装饰器能做的事情很有限，它一般都被用于记录可被其它装饰器使用的信息。

## 参数装饰器&#x20;

参数装饰器表达式会在运行时当作函数被调用，传入下列3个参数：&#x20;

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。
3. 参数在函数参数列表中的索引。

注意 &#x20;

\*\*参数装饰器只能用来监视一个方法的参数是否被传入。 \*\*

\*\*参数装饰器的返回值会被忽略。 \*\*

```javascript 
 class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @validate
    greet(@required name: string) {
        return "Hello " + name + ", " + this.greeting;
    }
}
```


```javascript 
 import "reflect-metadata";

const requiredMetadataKey = Symbol("required");

function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    let method = descriptor.value;
    descriptor.value = function () {
        let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (let parameterIndex of requiredParameters) {
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }

        return method.apply(this, arguments);
    }
}
```


总结：

1.不是特别稳定；

2.最常用的就是类装饰器和方法装饰器

# **创建参数装饰器**

参数装饰器可以用在类方法的参数中。

在这里，我们将学习如何创建一个与参数一起使用的装饰器函数，

接收以下参数：

- **对于静态属性，类的构造函数。对于所有其他属性，类的原型。**
- **成员的姓名。**
- **方法参数列表中参数的索引。**

**无法更改与参数本身相关的任何内容，** 因此，此类装饰器仅对观察参数使用本身有用（除非您使用更高级的东西，例如反射元数据）。

这是一个装饰器的示例，它打印被装饰的参数的索引以及方法名称：

```javascript 
function print(target: Object, propertyKey: string, parameterIndex: number) {
    console.log(`Decorating param ${parameterIndex} from ${propertyKey}`);
}

```


然后，你可以像这样使用你的参数装饰器：

```javascript 
class TestClass {
  testMethod(param0: any, @print param1: any) {}
}

```


运行上述代码应在控制台中显示以下内容：

```javascript 
Decorating param 1 from testMethod
```


我们现在已经创建并执行了一个参数装饰器，并打印出返回装饰参数索引的结果。
