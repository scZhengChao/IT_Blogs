# 配置 {🚀}

## 目录

- [Proxy 选项](#Proxy-选项)
  - [关闭 Proxy 支持情况下的使用限制](#关闭-Proxy-支持情况下的使用限制)
- [装饰器支持](#装饰器支持)
- [代码Lint选项](#代码Lint选项)
  - [enforceActions](#enforceActions)
  - [computedRequiresReaction: boolean](#computedRequiresReaction-boolean)
  - [observableRequiresReaction: boolean](#observableRequiresReaction-boolean)
  - [reactionRequiresObservable: boolean](#reactionRequiresObservable-boolean)
  - [disableErrorBoundaries: boolean](#disableErrorBoundaries-boolean)
  - [safeDescriptors: boolean](#safeDescriptors-boolean)
- [更多配置](#更多配置)
  - [isolateGlobalState: boolean](#isolateGlobalState-boolean)
  - [reactionScheduler: (f: () => void) => void](#reactionScheduler-f---void--void)

根据你的使用偏好，目标`JavaScript`引擎以及是否需要`MobX`达到最佳表现，`MobX`提供了一系列的配置项。绝大部分配置项都可以使用 `configure`方法控制。

## Proxy 选项

默认情况下，MobX 使用 `Proxy` 代理方式来让数组以及纯对象可观察。`Proxy` **能够提供最佳的性能表现以及在不同环境下大多数行为的一致性。** 但是如果你的目标环境不支持 `Proxy`，你也可以通过配置将 Proxy 支持关闭。 这种情况\*\*大部分是由于你需要支持IE或在没有使用`Hermes`\*\***引擎的React Native环境中开发。**

使用`configure`方法来关闭Proxy支持

```typescript 
import { configure } from "mobx"

configure({
    useProxies: "never"
})
```


`useProxies`属性可被设置的值如下:

- `"always"` (**默认值**): MobX 只能运行在支持 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy "Proxy")的环境中，如果环境不支持 `Proxy` 将报错。
- `"never"`: `Proxy`将不会被使用，MobX降级到`non-proxy`替代方案。 兼容 ES5 环境， 但是会带来一些限制 [limitations](https://www.mobxjs.com/configuration#limitations-without-proxy-support "limitations").
- `"ifavailable"` (实验阶段): 如果环境支持则启用 `Proxy`，否则 降级到`non-proxy`替代方案。这个模式的优势是:MobX将对不能在ES5环境中使用的API以及语言特性发出警告，触发ES5标准限制时抛出错误。

**注意:** 在MobX 6 之前，你需要面临 MobX 4（兼容历史老旧引擎） 还是 MobX 5(支持现代引擎)的选择，然而现在MobX 6 将根据你的引擎环境引入特定API的 `polyfill`，（比如在只支持ES5标准的环境中使用map方法)。`Proxy` 不能被 polyfilled，虽然目前确实已经有这样的垫片了，**但是他们并不能支持所有的场景，因此也不适用于 MobX，不要使用他们。**

### 关闭 Proxy 支持情况下的使用限制

1.可观察的数组不再是真正的数组，因此使用 `Array.isArray`方法时将会返回 `false`。实际场景中，你在传递数组给其他模块时需要先使用`.slice()`操作来为原始数组创建一份浅拷贝，举个例子，`concat`操作在可观察数组上时将不会生效，因此你需要先使用`.slice(）`。

2.在创建可观察的纯对象之后，对其进行添加/删除的属性操作自动观察将不会生效。如果你想通过index类数组下标的方式访问对象或者其他动态集合请使用可观察`maps`来替代。

在不支持Proxy情况下，也是有方法使这些（add/delete）动态操作观察生效的。那就是通过[Collection utilities {🚀}](https://www.mobxjs.com/collection-utilities "Collection utilities {🚀}")工具集。你需要\*\*确保新属性的添加是通过工具集的`set`****方法，使用工具集的 ****`values`****/****`keys`****/****`entries`\*\***来迭代对象，而不是** JavaScript内置方法。 但是由于这经常会被忘记，所以我们还是推荐尽量使用可观察的`maps`来替代。

## 装饰器支持

开启装饰器支持(实验性功能)请查看 [Enabling decorators {🚀}](https://www.mobxjs.com/enabling-decorators "Enabling decorators {🚀}") 章节。

## 代码Lint选项

为了帮助你更好地接受MobX所倡导的代码规范：严格地区分 `actions`，`state`以及`derivations`，当你的代码触发某些规则时，MobX可以在运行时对其进行"格式化"。 请确保你的MobX代码规范尽可能严格，采取下面的设置并仔细阅读对应说明。

```typescript 
import { configure } from "mobx"

configure({
    enforceActions: "always",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
})
```


有时你会发现这个级别的严格程度会带来一些困扰，出于提高生产力的目的，在确保你(或者你的团队，公司)足够了解MobX的心智模型之后，适当禁用某些规则也是可以的。

也有一些情况之下，你想要去除这些规则带来的警告（比如当你的代码包含于`runInAction`时），对于推荐规范来说这也是没问题的。 不用过于死板。

#### `enforceActions`

*enforceActions* 配置的目的是让你不会忘记使用 [action](https://www.mobxjs.com/actions "action") 包裹事件处理函数。

可供选择的配置:

- `"observed"` (**默认值**): 可观察状态必须通过`actions`来修改。 这是默认选项，对于有一定复杂度的应用来说这是推荐的严格模式。
- `"never"`: 状态可以在任何地方被修改。
- `"always"`: 任何状态都能只能通过`actions`来修改，在实际开发中也包括新建状态。

`"observed"`**带来的好处是**它允许你可以在`actions`外部创建可观察的对象然后自由地修改，即使这些对象还没有被使用。 由于状态在原则上总是被一些事件处理函数所创建，并且事件处理函数总是要被另外一个函数再包一层，因此设置本字段为`always`是理论上最优的。但是，你大概率不会想在单元测试中使用它。 在极少数情况下，你可能惰性创建了某些可被观察的对象，比如说在一个计算属性中，你可以使用`runInAction`将创建可观察对象的高阶`ad-hoc`函数包起来。

#### `computedRequiresReaction: boolean`

禁止在`action`或者`reaction`**之外，直接获取未被观察的计算属性的值**。 这保证你将不会使用某个MobX未缓存的响应计算的值。**默认值:`false`**。 在下面这个例子中，MobX在第一个代码块中将不会缓存响应计算的值，但是会在第二以及第三个代码块中缓存结果：

```typescript 

class Clock {
    seconds = 0

    get milliseconds() {
        console.log("computing")
        return this.seconds * 1000
    }

    constructor() {
        makeAutoObservable(this)
    }
}

const clock = new Clock()
{
    // This would compute twice, but is warned against by this flag.
    console.log(clock.milliseconds)
    console.log(clock.milliseconds)
}
{
    runInAction(() => {
        // Will compute only once.
        console.log(clock.milliseconds)
        console.log(clock.milliseconds)
    })
}
{
    autorun(() => {
        // Will compute only once.
        console.log(clock.milliseconds)
        console.log(clock.milliseconds)
    })
}

```


#### `observableRequiresReaction: boolean`

**当未被观察对象以可观察方式访问时发出警告**。 这可以帮助你检测是否在“MobX 上下文”中使用可观察对象。 这是一个非常好的方式去发现被遗忘的`observer`包裹函数 ，比如在一个React组件中。此外它也会发现那些缺少可观察对象的`actions`。\*\*默认值: \*\***`false`**

```javascript 

configure({ observableRequiresReaction: true })



```


**注意:** 当使用`observer`处理组件`propTypes`时，这条规则可能会带来一些副作用。

#### `reactionRequiresObservable: boolean`

当一个`reaction`(比如:`autorun`)被创建时不包含任何`observable`对象发出警告。 使用和这个设置可以帮助你检查是否有必要用`observer`包裹React组件，用`action`包裹函数，以及发现那些单纯忘记将某些数据结构或者对象属性`observer`化的场景。 \*\*默认着: \*\***`false`**

```javascript 
configure({ reactionRequiresObservable: true })
```


#### `disableErrorBoundaries: boolean`

默认情况下，MobX会**捕获并重新抛出那些发生在你代码中的异常来确保一个异常**中的`reaction`不会阻止其他调度的执行，大多数情况下是指不相关的其他`reaction`。这意味着这些**异常无法追溯到源代码，因此你无法通过try/catch的方式来捕获它们。**

通过禁用错误边界处理，异常能够逃逸被捕获，这也许有利于debug，但是可能会使你MobX进一步扩展到你的应用到一个无法复原的错误状态。**默认值:`false`**。

这个选项对于单元测试来说是非常好的，但是在每一个测试case之后记得调用`_resetGlobalState`，比如说在jest中使用`afterEach`:

```typescript 
import { _resetGlobalState, observable, autorun, configure } from "mobx"

configure({ disableErrorBoundaries: true })

test("Throw if age is negative", () => {
    expect(() => {
        const age = observable.box(10)
        autorun(() => {
            if (age.get() < 0) throw new Error("Age should not be negative")
        })
        age.set(-1)
    }).toThrow("Age should not be negative")
})

afterEach(() => {
    _resetGlobalState()
})
```


#### `safeDescriptors: boolean`

MobX让某些字段不可枚举(**non-configurable** )或不可写(**non-writable**)来阻止你做一些不支持的可能会导致代码问题的行为。 但是这也阻止了你测试中的**spying/mocking/stubbing**。 `configure({ safeDescriptors: false })`这样设置可以禁用安全策略，使得所有对象都是可枚举(**configurable**)和可写的(**writable**)。 需要注意的是这个配置更改并不会影响已有的`observable`，仅针对配置过后被创建的`observable`。 **使用须知** 除非必要，在你的测试用例中请不要全局关闭这个配置，否则你将有面对错误情况的风险(明明代码有问题却通过了测试用例)。\*\*默认值: \*\***`true`**

```javascript 
configure({ safeDescriptors: false })
```


## 更多配置

#### `isolateGlobalState: boolean`

当有多个活跃的MobX实例在同一个运行环境时，分离MboX的全局状态。在同一个应用的同一个页面，如果你的页面使用了MobX，而且还包含了一个同样使用了MobX的第三方模块，这这种情况下本配置会非常有用。 当你使用`configure({ isolateGlobalState: true })`时，第三方模块的可响应`reactivity`部分是自洽的不会影响外部。 使用这个选项，如果有多个活跃的MobX实例同时存在，他们的内部状态是被共享的。这样的好处是，来自不同实例的`observable`可以共同使用，负面影响是你必须确保这些实例的MobX版本是一致的。\*\*默认值: \*\***`false`**

```javascript 
configure({ isolateGlobalState: true })
```


#### `reactionScheduler: (f: () => void) => void`

设置一个新的函数来执行所有MobX中的`reactions`。 在默认情况下`reactionScheduler`只会执行`f`函数而不发生其他行为。 这\*\*对于基础的debug需求或者减慢`reactions`\*\***来优先建立应用视图更新来说非常有用。****默认值:****`f => f()`**

```typescript 
configure({
    reactionScheduler: (f): void => {
        console.log("Running an event after a delay:", f)
        setTimeout(f, 100)
    }
})
```
