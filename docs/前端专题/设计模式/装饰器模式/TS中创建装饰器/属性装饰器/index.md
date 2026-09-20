# 属性装饰器

## 目录

- [属性装饰器 ](#属性装饰器-)
- [属性装饰器](#属性装饰器)

类型声明：

```typescript 
type PropertyDecorator =
  (target: Object, propertyKey: string | symbol) => void;

```


- @参数:
  1. `target`: 对于静态成员来说是类的构造器，对于实例成员来说是类的原型链。
  2. `propertyKey`: 属性的名称。
- @返回: &#x20;

  **返回的结果将被忽略。**

除了用于收集信息外，属性装饰器也可以用来给类添加额外的方法和属性。 例如我们可以写一个装饰器来给某些属性添加监听器。

```typescript 
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function observable(target: any, key: string): any {
  // prop -> onPropChange
  const targetKey = "on" + capitalizeFirstLetter(key) + "Change";

  target[targetKey] =
    function (fn: (prev: any, next: any) => void) {
      let prev = this[key];
      Reflect.defineProperty(this, key, {
        set(next) {
          fn(prev, next);
          prev = next;
        }
      })
    };
}

class C {
  @observable
  foo = -1;

  @observable
  bar = "bar";
}

const c = new C();

c.onFooChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`))
c.onBarChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`))

c.foo = 100; // -> prev: -1, next: 100
c.foo = -3.14; // -> prev: 100, next: -3.14
c.bar = "baz"; // -> prev: bar, next: baz
c.bar = "sing"; // -> prev: baz, next: sing

```


## 属性装饰器&#x20;

声明在一个属性声明之前（紧靠着属性声明）。 属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里。&#x20;

属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：&#x20;

1. 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
2. 成员的名字。

> 注意 &#x20;
> ***属性描述符*****不会做为参数传入属性装饰器**，这与TypeScript是如何初始化属性装饰器的有关。 因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，并且没办法监视或修改一个属性的初始化方法。返回值也会被忽略。

因此，属性描述符**只能用来监视类中是否声明了某个名字的属性**。&#x20;

我们可以用它来记录这个属性的元数据，如下例所示：&#x20;

```javascript 
class Greeter {
     @format("Hello, %s")
    greeting: string;
 
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        let formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    }
}
```


然后定义@format装饰器和getFormat函数：&#x20;

```javascript 
 import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
    return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
```


# 属性装饰器

我们可以使用属性装饰器来覆盖被装饰的属性。这可以通过Object.defineProperty与属性的新 setter 和 getter 一起使用来完成。

让我们看看如何创建一个名为 的装饰器allowlist，它只允许将属性设置为静态允许列表中存在的值：

```javascript 
const allowlist = ["Jon", "Jane"];
const allowlistOnly = (target: any, memberName: string) => {
  let currentValue: any = target[memberName];
  Object.defineProperty(target, memberName, {
    set: (newValue: any) => {
        if (!allowlist.includes(newValue)) {
            return;
        }
        currentValue = newValue;
    },
    get: () => currentValue
  });
};

```


请注意，我们如何使用 any 作为目标的类型：

对于属性装饰器来说，目标参数的类型可以**是类的构造函数，也可以是类的原型**，在这种情况下使用any比较容易。

在装饰器实现的第一行中，我们将被装饰的属性的当前值存储到 currentValue 变量中：

Object.defineProperty 调用有一个 getter 和一个 setter。 getter 返回存储在 currentValue 变量中的值。&#x20;

如果 currentVariable 在允许列表中，setter 会将其值设置为 newValue。

让我们使用您刚刚编写的装饰器。 创建以下 Person 类：

```javascript 
class Person {
  @allowlistOnly
  name: string = "Jon";
}

```


我们现在将创建类的新实例，并测试设置并获取name实例属性：

```javascript 
const allowlist = ["Jon", "Jane"];
const allowlistOnly = (target: any, memberName: string) => {
let currentValue: any = target[memberName];
Object.defineProperty(target, memberName, {
  set: (newValue: any) => {
      if (!allowlist.includes(newValue)) {
        return;
      }
      currentValue = newValue;
    },
    get: () => currentValue
  });
};
class Person {
  @allowlistOnly
  name: string = "Jon";
}
const person = new Person();
console.log(person.name);
person.name = "Peter";
console.log(person.name);
person.name = "Jane";
console.log(person.name);

```


运行代码，我们应该看到以下输出：

```javascript 
OutputJon
Jon
Jane

```


该值永远不会设置为 Peter，因为 Peter 不在允许列表中。

如果我们想让代码更具可重用性，允许在应用装饰器时设置允许列表，该怎么办？ 这是装饰器工厂的一个很好的用例。&#x20;

让我们通过 allowlistOnly 装饰器变成装饰器工厂来做到这一点。

```javascript 

const allowlistOnly = (allowlist: string[]) => {
  return (target: any, memberName: string) => {
            let currentValue: any = target[memberName];
            Object.defineProperty(target, memberName, {
                set: (newValue: any) => {
                    if (!allowlist.includes(newValue)) {
                      return;
                    }
                    currentValue = newValue;
                },
                get: () => currentValue
          });
    };
}

```


在这里，我们将之前的实现包装到另一个函数中，即装饰器工厂。 装饰器工厂接收一个名为允许列表的参数，它是一个字符串数组。

现在，要使用的装饰器，我们必须通过许可名单，如以下突出显示的代码所示：

```javascript 
const allowlistOnly = (allowlist: string[]) => {
  return (target: any, memberName: string) => {
    let currentValue: any = target[memberName];
    Object.defineProperty(target, memberName, {
      set: (newValue: any) => {
        if (!allowlist.includes(newValue)) {
            return;
        }
        currentValue = newValue;
      },
       get: () => currentValue
    });
  };
}
class Person {
@allowlistOnly(["Claire", "Oliver"])
  name: string = "Claire";
}
const person = new Person();
console.log(person.name);
person.name = "Peter";
console.log(person.name);
person.name = "Oliver";
console.log(person.name);

```


显示它按预期工作，[person.name](http://person.name "person.name") 永远不会设置为 Peter，因为 Peter 不在给定的白名单中。

现在，我们已经使用普通装饰器函数和装饰器工厂创建了第一个属性装饰器，是时候看看如何为类访问器创建装饰器了。
