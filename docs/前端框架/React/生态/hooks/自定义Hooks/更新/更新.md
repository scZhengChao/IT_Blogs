# 更新

## 目录

- [useUpdateEffect](#useUpdateEffect)

# useUpdateEffect

**TS版本**

```javascript 
import { DependencyList, EffectCallback, useEffect, useRef } from "react";

//是否时第一次
const isFirstRender = (): boolean => {
    const isFirst: React.MutableRefObject<boolean> = useRef(true); //不会因为重复 render 重复申明， 类似于类组件的 this.xxx
    const { current } = isFirst;
    //如果是第一次，改变状态并返回true
    if (current) {
        isFirst.current = false;
        return true;
    }
    return current;
}

//依赖更改时候生命周期
/**
 * @param effect 更新时所需要调用的函数
 * @param deps  更新的依赖
 */
const useUpdateEffect = (effect: EffectCallback, deps: DependencyList):void => {
    //是否是第一次更新
    const isFirst: boolean = isFirstRender();
    useEffect(() => {
        //如果不是第一次执行函数
        if (!isFirst) return effect();
    }, deps);
}

export {
    useUpdateEffect, //update生命周期
};
```


**JS版本**

```javascript 
import { useEffect, useRef } from "react";

//是否时第一次
const isFirstRender = () => {
    const isFirst = useRef(true); //不会因为重复 render 重复申明， 类似于类组件的 this.xxx
    const { current } = isFirst;
    //如果是第一次，改变状态并返回true
    if (current) {
        isFirst.current = false;
        return true;
    }
    return current;
}

//依赖更改时候生命周期
/**
 * @param effect 更新时所需要调用的函数
 * @param deps  更新的依赖
 */
const useUpdateEffect = (effect, deps) => {
    //是否是第一次更新
    const isFirst = isFirstRender();
    useEffect(() => {
        //如果不是第一次执行函数
        if (!isFirst) return effect();
    }, deps);
}

export {
    useUpdateEffect, //update生命周期
};

```


使用：

```javascript 
useUpdateEffect(fn,[deps])
```
