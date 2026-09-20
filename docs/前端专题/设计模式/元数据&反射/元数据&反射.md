# 元数据&反射

## 目录

- [何时使用？](#何时使用)

在 Javascript 中，我们一般使用 [**reflect-metadata**](https://link.juejin.cn/?target=https://github.com/rbuckton/reflect-metadata "reflect-metadata") 来实现上述能力。 直接来看一个实例：

严格地说，元数据和装饰器是EcmaScript中两个独立的部分。 然而，如果你想实现像是[反射](https://zh.wikipedia.org/wiki/反射_\(计算机科学\) "反射")这样的能力，你总是同时需要它们。

如果我们回顾上一个例子，如果我们不想写各种不同的检查器呢？ 或者说，能否只写一个检查器能够通过我们编写的TS类型声明来自动运行类型检查？

有了[reflect-metadata](https://github.com/rbuckton/reflect-metadata "reflect-metadata")的帮助， 我们可以获取编译期的类型。

```typescript 
import 'reflect-metadata';

function validate(
  target: Object,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalFn = descriptor.value;

  // 获取参数的编译期类型
  const designParamTypes = Reflect
    .getMetadata('design:paramtypes', target, key);

  descriptor.value = function (...args: any[]) {
    args.forEach((arg, index) => {

      const paramType = designParamTypes[index];

       const result = arg.constructor === paramType
        || arg instanceof paramType;
 
      if (!result) {
        throw new Error(
          `Failed for validating parameter: ${arg} of the index: ${index}`
        );
      }
    });

    return originalFn.call(this, ...args);
  }
}

class C {
  @validate
  sayRepeat(word: string, x: number) {
    return Array(x).fill(word).join('');
  }
}

const c = new C();
c.sayRepeat('hello', 2); // pass
c.sayRepeat('', 'lol' as any); // throw an error
```


目前为止一共有三种编译期类型可以拿到：

- `design:type`: **属性的类型。**
- `desin:paramtypes`: **方法的参数的类型。**
- `design:returntype`: **方法的返回值的类型。**

这三种方式拿到的结果都是构造函数（例如`String`和`Number`）。规则是：

- number ->`Number`
- string ->`String`
- boolean ->`Boolean`
- void/null/never ->`undefined`
- Array/Tuple ->`Array`
- Class -> 类的构造函数
- Enum -> 如果是纯数字枚举则为`Number`, 否则是`Object`
- Function ->`Function`
- 其余都是`Object`

# 何时使用？

现在我们可以对于何时使用装饰器得出结论， 在阅读上面的代码中你可能也有所感觉。

我将例举一些常用的使用场景：

- Before/After钩子。
- 监听属性改变或者方法调用。
- 对方法的参数做转换。
- 添加额外的方法和属性。
- 运行时类型检查。
- 自动编解码。
- 依赖注入。
