# 继承：使用子类

\*\* 请凡事从简，并优先考虑组合（而非继承）。\*\* ​

[使用子类 | MobX中文文档 | MobX中文网 对使用子类的支持是有限制的。 最值得注意的一点是你只能重新定义原型中的 actions/flows/computeds——你不能重新定义字段声明 \_。 在子类中请使用 override 注释被重新定义的methods/getters - 见下例。 请凡事从简，并优先考虑组合（而非继承）。 <https://www.mobxjs.com/subclassing>](https://www.mobxjs.com/subclassing " 使用子类 | MobX中文文档 | MobX中文网 对使用子类的支持是有限制的。 最值得注意的一点是你只能重新定义原型中的 actions/flows/computeds——你不能重新定义字段声明_。 在子类中请使用 override 注释被重新定义的methods/getters - 见下例。 请凡事从简，并优先考虑组合（而非继承）。 https://www.mobxjs.com/subclassing")

**只有定义在原型上的函数可以被子类覆盖：**

```typescript 
class Parent {
    // on instance
    arrowAction = () => {}

    // on prototype
    action() {}
    boundAction() {}

    constructor() {
        makeObservable(this, {
            arrowAction: action
            action: action,
            boundAction: action.bound,
        })
    }
}
class Child extends Parent {
    // THROWS: TypeError: Cannot redefine property: arrowAction
    arrowAction = () => {}

    // OK
    action() {}
    boundAction() {}

    constructor() {
        super()
        makeObservable(this, {
            arrowAction: override,
            action: override,
            boundAction: override,
        })
    }
}
```


对使用子类的支持是有[限制](https://www.mobxjs.com/subclassing#limitations "限制")的。 最值得注意的一点是你只能**重新定义原型中的 actions/flows/computeds**——你不能重新定义\*\*\_**[**字段声明**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#field_declarations "字段声明")**\_**。 在子类中请使用 `override` 注释被重新定义的**methods/getters\*\* - 见下例。 **请凡事从简，并优先考虑组合（而非继承）。**

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
