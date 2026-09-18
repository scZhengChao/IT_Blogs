# 使用子类

## 目录

- [Limitations](#Limitations)

对使用子类的支持是有[限制](https://www.mobxjs.com/subclassing#limitations "限制")的。 最值得注意的一点是你只能重新定义原型中的 actions/flows/computeds——你不能重新定义\_[字段声明](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#field_declarations "字段声明")\_。 **在子类中请使用 ****`override`**** 注释被重新定义的methods/getters -** 见下例。\*\* 请凡事从简，并优先考虑组合（而非继承）。\*\*

```typescript 
import { makeObservable, observable, computed, action, override } from "mobx"

class Parent {
    // 被注释的实例字段不可被重新定义
    observable = 0
    arrowAction = () => {}

    // 未被注释的实例字段可以被重新定义
    overridableArrowAction = action(() => {})

    // 被注释的原型methods/getters可以被重新定义
    action() {}
    actionBound() {}
    get computed() {}

    constructor(value) {
        makeObservable(this, {
            observable: observable,
            arrowAction: action
            action: action,
            actionBound: action.bound,
            computed: computed,
        })
    }
}

class Child extends Parent {
    /* --- 继承来的定义 --- */
    // 抛出 - TypeError: Cannot redefine property
    // observable = 5
    // arrowAction = () = {}

    // OK - 未被注释的
    overridableArrowAction = action(() => {})

    // OK - 原型
    action() {}
    actionBound() {}
    get computed() {}

    /* --- 新的定义 --- */
    childObservable = 0;
    childArrowAction = () => {}
    childAction() {}
    childActionBound() {}
    get childComputed() {}

    constructor(value) {
        super()
        makeObservable(this, {
            // 继承来的
            action: override,
            actionBound: override,
            computed: override,
            // 新的
            childObservable: observable,
            childArrowAction: action
            childAction: action,
            childActionBound: action.bound,
            childComputed: computed,
        })
    }
}
```


## Limitations

1. 只有定义在**原型**上的 `action`, `computed`, `flow`, `action.bound` 可以在子类中被**重新定义**。
2. 不能在子类中重新注释字段（`override` 除外）。
3. `makeAutoObservable` 不支持在子类中使用。
4. 不支持扩展内置数据结构（ObservableMap, ObservableArray, 等）。
5. 你不能在子类中给`makeObservable`提供不同选项。
6. 你不能在单个继承链中混合使用注解/装饰器。
7. [所有其他限制均在此适用](https://www.mobxjs.com/observable-state#limitations "所有其他限制均在此适用")。
