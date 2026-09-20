# 访问器装饰起

## 目录

- [访问器装饰器 ](#访问器装饰器-)
- [创建访问器装饰器](#创建访问器装饰器)

访问器装饰器总体上讲和方法装饰器很接近，唯一的区别在于描述器中有的key不同：

方法装饰器的描述器的key为：

方法装饰器的描述器的key为：

- `value`
- `writable`
- `enumerable`
- `configurable`

访问器装饰器的描述器的key为：

- `get`
- `set`
- `enumerable`
- `configurable`

例如，我们可以将某个属性设为不可变值：

```typescript 
function immutable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.set;

  descriptor.set = function (value: any) {
    return original.call(this, { ...value })
  }
}

class C {
  private _point = { x: 0, y: 0 }

  @immutable
  set point(value: { x: number, y: number }) {
    this._point = value;
  }

  get point() {
    return this._point;
  }
}

const c = new C();
const point = { x: 1, y: 1 }
c.point = point;

console.log(c.point === point)
// -> false

```


## 访问器装饰器&#x20;

声明在一个访问器的声明之前（紧靠着访问器声明）。 访问器装饰器应用于访问器的 *属性描述符*;并且可以用来监视，修改或替换一个访问器的定义。&#x20;

访问器装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里。&#x20;

> 注意  TypeScript不允许同时装饰一个成员的get和set访问器。取而代之的是 **，一个成员的所有装饰的必须应用在文档顺序的第一个访问器上。**

这是因为，在装饰器应用于一个*属性描述符*时，**它联合了get和set访问器，而不是分开声明的**

访问器装饰器表达式会在运行时当作函数被调用，传入下列3个参数：&#x20;

1. **对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。**
2. **成员的名字。**
3. **成员的*****属性描述符*****。** ​

注意  如果代码输出目标版本小于ES5，*Property Descriptor*将会是undefined。 如果访问器装饰器返回一个值，它会被用作方法的*属性描述符*。&#x20;

> 注意  如果代码输出目标版本小于ES5返回值会被忽略。&#x20;

下面是使用了访问器装饰器（@configurable）的例子，应用于Point类的成员上：&#x20;

```javascript 
class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

     @configurable(false)
     get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}
```


我们可以通过如下函数声明来定义@configurable装饰器：&#x20;

```javascript 
 function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

```


# **创建访问器装饰器**

在这里，我们将了解装饰类访问器。

就像属性装饰器一样，访问器中使用的装饰器接收以下参数：

- **对于静态属性，类的构造函数，对于所有其他属性，类的原型。**
- **成员的姓名。**
- **成员的属性描述符**

鉴于 Property Descriptors 包含特定**成员的 setter 和 getter，访问器装饰器只能应用于单个成员的 setter 或 getter，而不能同时应用于两者。**

如果我们从访问器装饰器返回一个值，该值将成为 getter 和 setter 成员的访问器的新属性描述符。

下面是一个可用于更改 getter/setter 访问器的可枚举标志的装饰器示例：

```javascript 

const enumerable = (value: boolean) => {
  return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
    propertyDescriptor.enumerable = value;
  }
}

```


请注意示例中，我们是如何使用装饰器工厂的。 这允许我们在调用装饰器时指定可枚举标志。&#x20;

以下是如何使用装饰器：

```javascript 
class Person {
  firstName: string = "Jon"
  lastName: string = "Doe"
  @enumerable(true)
  get fullName () {
    return `${this.firstName} ${this.lastName}`;
  }
}

```


访问器装饰器类似于属性装饰器。 唯一的区别是它们接收带有属性描述符的第三个参数。 现在，我们已经创建了第一个访问器装饰器。

接下来，我们将学习如何创建方法装饰器。
