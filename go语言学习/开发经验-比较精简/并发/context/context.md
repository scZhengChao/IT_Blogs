# context

## 目录

- [context.Background()](#contextBackground)
  - [一、先搞懂核心特性（关键）](#一先搞懂核心特性关键)
  - [二、它的本质：一个空的 Context 实现](#二它的本质一个空的-Context-实现)
  - [三、和context.TODO() 的区别（新手易混）](#三和contextTODO-的区别新手易混)
  - [四、为什么必须用它做根？（核心设计思想）](#四为什么必须用它做根核心设计思想)

# `context.Background()`

`context.Background()`是 Go 语言`context`包的**根上下文（根 Ctx）**，也是所有自定义上下文的「基础父级」，你可以把它理解成所有上下文的**源头 / 根节点**，是创建其他上下文的起点，本身是一个**永远不会被取消、没有超时时间、不携带任何值**的空上下文。

简单说：**所有业务场景的上下文，最终都继承自**\*\*`context.Background()`\*\*，你的代码里`context.WithCancel(context.Background())` 就是基于这个根上下文，创建了第一个可取消的子上下文。

### 一、先搞懂核心特性（关键）

`context.Background()`是`context.Context` 类型的常量级实现，核心特性只有 4 个，也是它作为「根」的原因：

1. **永不取消**：没有对应的`cancel`函数，永远不会触发`Done()` 信号，生命周期和程序一致；
2. **无超时 / 截止时间**：`Deadline()`方法返回`ok=false`，表示没有超时限制；
3. **不携带任何值**：`Value(key)`方法永远返回`nil`，本示例也没用到上下文的值传递能力；
4. **全局唯一（概念上）**：整个程序中所有基于它创建的上下文，都属于同一个根分支，是 Go 官方推荐的「全局根上下文」。

### 二、它的本质：一个空的 Context 实现

Go 源码中`context.Background()`的实现非常简单（简化后），本质是一个**空的结构体实例**，仅实现了`Context` 接口的 4 个方法，且所有方法都返回「无状态」结果：

```go 
// 空的结构体，无任何字段
type backgroundCtx struct{}

// 实现Context接口的Deadline方法：无截止时间
func (*backgroundCtx) Deadline() (time.Time, bool) { return time.Time{}, false }

// 实现Context接口的Done方法：永不关闭的通道（永远不会收到取消信号）
func (*backgroundCtx) Done() <-chan struct{} { return nil }

// 实现Context接口的Err方法：无错误（因为永不取消）
func (*backgroundCtx) Err() error { return nil }

// 实现Context接口的Value方法：不携带任何值
func (*backgroundCtx) Value(key any) any { return nil }

// 对外暴露的根上下文，全局唯一实例
var background = &backgroundCtx{}

func Background() Context {
    return background
}
```


核心细节：它的`Done()`方法返回`nil`，所以**永远无法通过`select <-ctx.Done()`监听它的取消信号**（这也是为什么它只能做根，不能直接用于业务协程控制）。

### 三、和`context.TODO()` 的区别（新手易混）

Go 包中还有一个和`Background()`几乎一样的方法`context.TODO()`，两者源码实现完全相同（都是空上下文），**唯一的区别是「语义 / 使用场景」**，官方做这个区分是为了**代码的可读性和可维护性**：

| 方法                       | 语义 / 使用场景                                                                       |
| ------------------------ | ------------------------------------------------------------------------------- |
| \`context.Background()\` | \*\*正式根上下文\*\*：所有业务场景的「标准根节点」，明确知道这是上下文的起点，用于生产代码的正常逻辑；                         |
| \`context.TODO()\`       | \*\*临时占位上下文\*\*：当你还没想好传什么上下文（比如函数参数需要 Ctx，但暂时不知道父 Ctx 是谁），用它做临时占位，后续再替换为真实的上下文； |

### 四、为什么必须用它做根？（核心设计思想）

Go 官方强制要求「所有上下文必须有父级」，不允许直接实现`Context`接口创建自定义根上下文，而是要求基于`Background()`/`TODO()` 派生，核心原因有 2 个：

1. **统一上下文体系**：让所有上下文形成「父子树形结构」，保证**取消信号能从根到叶单向传播**（比如你代码中 main 的根 Ctx 取消，所有子 Ctx 都能收到信号）；
2. **避免上下文泄漏**：树形结构的上下文，父级取消会带动所有子级取消，结合`defer cancel()` 能确保所有派生的上下文最终都被释放，不会出现僵尸上下文；
3. **简化开发**：**开发者无需关心根上下文的实现，只需基于官方根上下文派生所需的子上下文（可**取消、带超时、带值），符合 Go 的「简洁性」设计。
