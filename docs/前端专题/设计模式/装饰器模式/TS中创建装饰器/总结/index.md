# 总结

对于一些复杂场景， 我们可能需要结合使用不同的装饰器。 例如如果我们不仅想给我们的**接口添加静态检查，还想加上运行时检查的能力。**

我们可以用3个步骤来实现这个功能：

1. 标记需要检查的参数 (因为参数装饰器先于方法装饰器执行)。
2. 改变方法的`descriptor`的`value`的值，先运行参数检查器，如果失败就抛出异常。
3. 运行原有的接口实现。

以下是代码:

```typescript 
type Validator = (x: any) => boolean;

// save the marks
const validateMap: Record<string, Validator[]> = {};

// 1. 标记需要检查的参数
function typedDecoratorFactory(validator: Validator): ParameterDecorator {
  return (_, key, index) => {
    const target = validateMap[key as string] ?? [];
    target[index] = validator;
    validateMap[key as string] = target;
  }
}

function validate(_: Object, key: string, descriptor: PropertyDescriptor) {
  const originalFn = descriptor.value;
  descriptor.value = function(...args: any[]) {

    // 2. 运行检查器
    const validatorList = validateMap[key];
    if (validatorList) {
      args.forEach((arg, index) => {
        const validator = validatorList[index];

        if (!validator) return;

        const result = validator(arg);

        if (!result) {
          throw new Error(
            `Failed for parameter: ${arg} of the index: ${index}`
          );
        }
      });
    }

    // 3. 运行原有的方法
    return originalFn.call(this, ...args);
  }
}

const isInt = typedDecoratorFactory((x) => Number.isInteger(x));
const isString = typedDecoratorFactory((x) => typeof x === 'string');

class C {
  @validate
  sayRepeat(@isString word: string, @isInt x: number) {
    return Array(x).fill(word).join('');
  }
}

const c = new C();
c.sayRepeat('hello', 2); // pass
c.sayRepeat('', 'lol' as any); // throw an error

```
