# 简略版

## 目录

- [index.tsx](#indextsx)
- [effects.tsx](#effectstsx)

### index.tsx

```javascript 
import EventEmiter from 'events';

let times = (fn, time) => () => --time === 0 ? fn() : times.bind(null, fn, time);

interface SagaMiddleware {
    (api: any): (next: any) => (action: any) => void,
    run: (rootSaga: any) => void
}

export default function createSagaMiddleware() {
    //@ts-ignore
    let sagaMiddleware: SagaMiddleware = function (api) {
        let { dispatch, getState } = api;

        let events = new EventEmiter();
        const run = function (gen, callback?: any) {

            let it = typeof gen == 'function' ? gen() : gen;
            let next = (val?: any) => {
                let { value: effects, done } = it.next(val);
                if (!done) {
                    if (effects instanceof Promise) {
                        effects.then(next);
                    } else if (typeof effects[Symbol.iterator] === 'function') {
                        run(effects);
                        next();
                    } else {
                        switch (effects.type) {
                            case 'TAKE':
                                events.once(effects.actionType, next);
                                break;
                            case 'PUT':
                                dispatch(effects.action);
                                next();
                                break;
                            case 'CALL':
                                {
                                    let { fn, context, args } = effects.payload;
                                    let promise = fn.apply(context, args);
                                    promise.then(next);
                                    break;
                                }
                            case 'FORK':
                                let _it = effects.gen();
                                run(_it);
                                next(_it);
                                break;
                            case 'CANCEL':
                                effects.task.return();
                                next();
                                break;
                            case 'CPS':
                                let { fn, args } = effects.payload;
                                fn(...args, (err, val) => {
                                    if (err) {
                                        throw new Error(err);
                                    }
                                    next(val);
                                })
                                break;
                            case 'ALL':
                                let fns = effects.fns;
                                let len = fns.length;
                                let cb = times(next, len);
                                fns.forEach(fn => run(fn, cb));
                                break;
                        }
                    }
                } else {
                    callback && callback();
                }
            }
            next();
        }
        sagaMiddleware.run = run;
        return function (next) {
            return function (action) {
                events.emit(action.type, action);
                next(action);
            }
        }
    }
    return sagaMiddleware;
}
```


### effects.tsx

```javascript 

export function take(actionType) {
    return {
        type: 'TAKE',
        actionType
    }
}
export function put(action) {
    return {
        type: 'PUT',
        action
    }
}
export function delay(ms, val?: any) {
    let delayP = function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(val);
            }, ms);
        });
    }
    return call(delayP, ms, val);
}
export function call(fn, ...args) {
    let context = null;
    if (Array.isArray(fn)) {
        [context, fn] = fn;
    }
    return {
        type: 'CALL',
        payload: {
            fn,
            context,
            args
        }
    }
}
export function cps(fn, ...args) {
    return {
        type: 'CPS',
        payload: {
            fn,
            args
        }
    }
}
export function fork(gen) {
    return {
        type: 'FORK',
        gen
    }
}
export function cancel(task) {
    return {
        type: 'CANCEL',
        task
    }
}
export function* takeEvery(actionType, task) {
    yield fork(function* () {
        while (true) {
            yield take(actionType);
            yield task();
        }
    })
}
export function all(fns) {
    return {
        type: 'ALL',
        fns
    }
}
```
