# 执行时机和顺序

## 目录

- [时机](#时机)
- [执行顺序](#执行顺序)
- [多个装饰器的组合](#多个装饰器的组合)

## 时机

装饰器只在解释执行时应用一次，例如：

```javascript 
function f(C) {
  console.log('apply decorator')
  return C
}

@f
class A {}

// output: apply decorator

```


这里的代码会在终端中打印`apply decorator`，即便我们其实并没有使用类A。

## 执行顺序

不同类型的装饰器的执行顺序是明确定义的：

1. 实例成员：

参数装饰器 > 方法 >访问器 > 属性&#x20;

2\. 静态成员: &#x20;
参数装饰器 >方法 > 访问器 > 属性&#x20;

3\. 构造器:&#x20;

&#x20; 参数装饰器&#x20;

4\. 类装饰器

&#x20; 参数装饰器&#x20;

例如，考虑以下代码：

```typescript 
function f(key: string): any {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}

@f("Class Decorator")
class C {
  @f("Static Property")
  static prop?: number;

  @f("Static Method")
  static method(@f("Static Method Parameter") foo) {}

  constructor(@f("Constructor Parameter") foo) {}

  @f("Instance Method")
  method(@f("Instance Method Parameter") foo) {}

  @f("Instance Property")
  prop?: number;
}

```


它将会打印出以下信息：

```markdown 
evaluate:  Instance Method
evaluate:  Instance Method Parameter
call:  Instance Method Parameter
call:  Instance Method
evaluate:  Instance Property
call:  Instance Property
evaluate:  Static Property
call:  Static Property
evaluate:  Static Method
evaluate:  Static Method Parameter
call:  Static Method Parameter
call:  Static Method
evaluate:  Class Decorator
evaluate:  Constructor Parameter
call:  Constructor Parameter
call:  Class Decorator

```


你也许会注意到执行实例属性`prop`晚于实例方法`method`然而执行静态属性`static prop`早于静态方法`static method`。&#x20;

这是因为对于属性/方法/访问器装饰器而言，**执行顺序取决于声明它们的顺序。**

- 然而，**同一方法中不同参数的装饰器**的执行顺序是相反的， 最后一个参数的装饰器会最先被执行：

```typescript 
function f(key: string): any {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}

class C {
  method(
    @f("Parameter Foo") foo,
    @f("Parameter Bar") bar
  ) {}
}

```


这里的代码打印出的结果为：

```markdown 
evaluate:  Parameter Foo
evaluate:  Parameter Bar
call:  Parameter Bar
call:  Parameter Foo

```


## 多个装饰器的组合

你可以对同一目标应用多个装饰器。它们的组合顺序为：

1. 求值外层装饰器
2. 求值内层装饰器
3. 调用内层装饰器
4. 调用外层装饰器

```typescript 
function f(key: string) {
  console.log("evaluate: ", key);
  return function () {
    console.log("call: ", key);
  };
}

class C {
  @f("Outer Method")
  @f("Inner Method")
  method() {}
}

```


这里的代码打印出的结果为：

```markdown 
evaluate: Outer Method
evaluate: Inner Method
call: Inner Method
call: Outer Method

```
