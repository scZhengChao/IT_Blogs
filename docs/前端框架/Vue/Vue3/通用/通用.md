# 通用

## 目录

- [defineComponent](#defineComponent)

# defineComponent

在定义 Vue 组件时提供类型推导的辅助函数。

类型

```typescript 
function defineComponent(
  component: ComponentOptions | ComponentOptions['setup']
): ComponentConstructor1`m m kk p[]\ b

```


**详细信息**

第一个参数是**一个组件选项对象。返回值将是该选项对象本身**，因为该函数实际上在**运行时没有任何操作，仅用于提供类型推导。**

注意返回值的类型有一点特别：它会是一个构造函数类型，**它的实例类型是根据选项推断出的组件实例类型**。这是为了能让该返回值在 TSX 中用作标签时提供类型推导支持。

你可以像这样从 `defineComponent()` 的返回类型中提取出一个组件的实例类型 (与其选项中的 `this` 的类型等价)：

```typescript 
const Foo = defineComponent(/* ... */)

type FooInstance = InstanceType<typeof Foo>

```
