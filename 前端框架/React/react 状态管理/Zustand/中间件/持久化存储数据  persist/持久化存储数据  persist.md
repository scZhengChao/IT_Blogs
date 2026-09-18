# 持久化存储数据 persist

## 目录

- [简单示例](#简单示例)
- [选项](#选项)
  - [name](#name)
  - [storage](#storage)
  - [partialize](#partialize)
  - [onRehydrateStorage](#onRehydrateStorage)
  - [version](#version)
  - [migrate](#migrate)
  - [merge](#merge)
  - [skipHydration](#skipHydration)
- [API](#API)
  - [getOptions](#getOptions)
  - [setOptions](#setOptions)
  - [clearStorage](#clearStorage)
  - [rehydrate](#rehydrate)
  - [hasHydrated](#hasHydrated)
  - [onHydrate](#onHydrate)
  - [onFinishHydration](#onFinishHydration)
  - [createJSONStorage](#createJSONStorage)
- [水合和异步存储](#水合和异步存储)

Persist 中间件使您能够在存储中（例如，`localStorage`，`AsyncStorage`，`IndexedDB`等）存储您的 Zustand 状态，从而持久化其数据。

请注意，此中间件支持同步存储，如 `localStorage`，和异步存储，如 `AsyncStorage`，但使用异步存储确实有一定的代价。有关更多详细信息，请参阅[Hydration 和异步存储](https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data#hydration-and-asynchronous-storages "Hydration 和异步存储")。

[   https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data](https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data "   https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data")

## 简单示例

```javascript 
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useBearStore = create(
    persist(
        (set, get) => ({
            bears: 0,
            addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
            name: 'food-storage', // 存储中的项目名称（必须唯一）
            storage: createJSONStorage(() => sessionStorage), // (可选) 默认情况下，使用 'localStorage'
        },
    ),
)
```


## 选项

### `name`

这是唯一需要的选项。 给定的名称将用作存储您的 Zustand 状态的键，因此它必须是唯一的。

### `storage`

> StateStorage\`

可以通过以下方式导入 `StateStorage`：

```javascript 
import { StateStorage } from 'zustand/middleware'
```


> 默认值：`createJSONStorage(() => localStorage)`

使您能够使用自己的存储。只需传递一个返回您想要使用的存储的函数即可。建议使用 [createJSONStorage](https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data#createjsonstorage "createJSONStorage") 辅助函数创建符合 `StateStorage` 接口的 `storage` 对象。

示例：

```javascript 
import { persist, createJSONStorage } from 'zustand/middleware'

export const useBoundStore = create(
    persist(
        (set, get) => ({
            // ...
        }),
        {
            // ...
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)
```


### `partialize`

> 类型：`(state: Object) => Object`

> 默认值：(state) => state

使您能够**选择一些要存储在存储中的状态字**段。

您可以使用以下**方式省略多个字段**：

```javascript 
export const useBoundStore = create(
    persist(
        (set, get) => ({
            foo: 0,
            bar: 1,
        }),
        {
            // ...
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => !['foo'].includes(key)),
                ),
        },
    ),
)
```


或者，您可以**只允许特定字段使用以下方式**：

```javascript 
export const useBoundStore = create(
    persist(
        (set, get) => ({
            foo: 0,
            bar: 1,
        }),
        {
            // ...
            partialize: (state) => ({ foo: state.foo }),
        },
    ),
)
```


### `onRehydrateStorage`

> 类型：`(state: Object) => ((state?: Object, error?: Error) => void) | void`

此选项使您能够传递一个监听器函数，当存储被重新注入时，该函数将被调用。

示例：

```javascript 
export const useBoundStore = create(
    persist(
        (set, get) => ({
            // ...
        }),
        {
            // ...
            onRehydrateStorage: (state) => {
                console.log('hydration starts')

                // 可选
                return (state, error) => {
                    if (error) {
                        console.log('an error happened during hydration', error)
                    } else {
                        console.log('hydration finished')
                    }
                }
            },
        },
    ),
)
```


### `version`

> 类型：`number`

> 默认值：`0`

如果您想在**存储中引入破坏性更改（例如，重命名字段）**，您可以指定一个新的版本号。默认情况下，**如果存储中的版本与代码中的版本不匹配，则不会使用存储的值**。您可以使用下面的 [migrate](https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data#migrate "migrate") 函数来处理破坏性更改，以便持久化以前存储的数据。

### `migrate`

> 类型：(persistedState: Object, version: number) => Object | Promise\<Object>

> 默认值：`(persistedState) => persistedState`

您可以使用此选项来处理版本迁移。 迁移函数接收持久化的状态和版本号作为参数。 它必须返回一个符合最新版本（代码中的版本）的状态。

例如，如果您想重命名一个字段，可以使用以下方法：

```javascript 
export const useBoundStore = create(
    persist(
        (set, get) => ({
            newField: 0, // 假设此字段在版本0中有其他名称
        }),
        {
            // ...
            version: 1, // 如果存储中的版本与此版本不匹配，将触发迁移
            migrate: (persistedState, version) => {
                if (version === 0) {
                    // 如果存储的值是版本0，我们将字段重命名为新名称
                    persistedState.newField = persistedState.oldField
                    delete persistedState.oldField
                }

                return persistedState
            },
        },
    ),
)
```


### `merge`

> 类型：`(persistedState: Object, currentState: Object) => Object`

> 默认值：`(persistedState, currentState) => ({ ...currentState, ...persistedState })`

在某些情况下，您可能希望使用**自定义合并函数 将持久化的值与当前状态合并**。

默认情况下，中间件执行浅合并。 如果您部分持久化了嵌套对象，浅合并可能不够。 例如，如果存储包含以下内容：

```javascript 
{
    foo: {
        bar: 0,
    }
}
```


但是您的 Zustand 存储包含：

```javascript 
{
    foo: {
        bar: 0,
        baz: 1,
    }
}

```


浅合并将从 `foo` 对象中**擦除** `baz` 字段。 解决这个问题的一种方法是**提供一个自定义的深度合并函数：**

```javascript 
export const useBoundStore = create(
    persist(
        (set, get) => ({
            foo: {
                bar: 0,
                baz: 1,
            },
        }),
        {
            // ...
            merge: (persistedState, currentState) =>
                deepMerge(currentState, persistedState),
        },
    ),
)
```


### `skipHydration`

> 类型：`boolean | undefined`

> 默认值：`undefined`

默认情况下，存储将在初始化时进行填充。

在某些应用程序中，您**可能需要控制第一次填充何时发生。 例如，在服务器渲染的应用程序中。**

如果您设置了 `skipHydration`，则不会调用初始的填充调用， 并且您需要手动调用 `rehydrate()`。

```javascript 
export const useBoundStore = create(
    persist(
        () => ({
            count: 0,
            // ...
        }),
        {
            // ...
            skipHydration: true,
        },
    ),
)
```


```javascript 
import { useBoundStore } from './path-to-store';

export function StoreConsumer() {
    // 在挂载后填充持久化的存储
    useEffect(() => {
        useBoundStore.persist.rehydrate();
    }, [])

    return (
        //...
    )
}
```


## API

> 版本：>=3.6.3

Persist API 使您能够与 `Persist` 中间件进行多种交互 无论是在 React 组件内部还是外部。

### `getOptions`

> 类型：`() => Partial<PersistOptions>`

> 返回值：`Persist` 中间件的选项

例如，它可以用来获取存储名称：

```javascript 
useBoundStore.persist.getOptions().name

```


### `setOptions`

> 类型：`(newOptions: Partial<PersistOptions>) => void`

**更改中间件选项。 请注意，新选项将与当前选项合并。**

例如，这可以用来更改存储名称：

```javascript 
useBoundStore.persist.setOptions({
    name: 'new-name',
})
```


或者甚至更改存储引擎：

```javascript 
useBoundStore.persist.setOptions({
    storage: createJSONStorage(() => sessionStorage),
})
```


### `clearStorage`

> 类型：`() => void`

**清除存储在 **[**name**](https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data#name "name")** 键下的所有内容。**

```javascript 
useBoundStore.persist.clearStorage()
```


### `rehydrate`

> 类型：`() => Promise<void>`

在某些情况下，您可能希望**手动触发重新水合过程**。 这可以通过调用 `rehydrate` 方法来完成。

```javascript 
await useBoundStore.persist.rehydrate()
```


### `hasHydrated`

> 类型：`() => boolean`

这是**一个非反应性的 getter，** 用于检查 存储是否已经水合 （注意，当调用[rehydrate](https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data#rehydrate "rehydrate") 时，它会更新）。

```javascript 
useBoundStore.persist.hasHydrated()
```


### `onHydrate`

> 类型：`(listener: (state) => void) => () => void`

> 返回值：取消订阅函数

**当水合过程开始时，将调用此监听器。**

```javascript 
const unsub = useBoundStore.persist.onHydrate((state) => {
    console.log('hydration starts')
})

// 稍后...
unsub()
```


### `onFinishHydration`

> 类型：`(listener: (state) => void) => () => void`

> 返回值：取消订阅函数

**当水合过程结束时，将调用此监听器。**

```javascript 
const unsub = useBoundStore.persist.onFinishHydration((state) => {
    console.log('hydration finished')
})

// 稍后...
unsub()
```


### `createJSONStorage`

> 类型：`(getStorage: () => StateStorage, options?: JsonStorageOptions) => StateStorage`

> 返回值：`PersistStorage`

此辅**助函数使您能够创建**一个 [storage](https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data#storage "storage") 对象，这在您想要使用自定义存储引擎时非常有用。

`getStorage` 是一个返回具有 `getItem`、`setItem` 和 `removeItem` 属性的存储引擎的函数。

`options` 是一个可选对象，可用于自定义数据的序列化和反序列化。`options.reviver` 是传递给 `JSON.parse` 以反序列化数据的函数。`options.replacer` 是传递给 `JSON.stringify` 以序列化数据的函数。

```javascript 
import { createJSONStorage } from 'zustand/middleware'

const storage = createJSONStorage(() => sessionStorage, {
    reviver: (key, value) => {
        if (value && value.type === 'date') {
            return new Date(value)
        }
        return value
    },
    replacer: (key, value) => {
        if (value instanceof Date) {
            return { type: 'date', value: value.toISOString() }
        }
        return value
    },
})
```


## 水合和异步存储

要解释异步存储的"成本"是什么， 您需要理解什么是水合。

简而言之，水合是一个过程， 从存储中检索持久化状态 并将其与当前状态合并。

Persist 中间件执行两种类型的水合： 同步和异步。 如果给定的存储是同步的（例如，`localStorage`）， 水合将同步完成。 另一方面，如果给定的存储是异步的（例如，`AsyncStorage`）， 水合将异步完成（令人震惊，我知道！）。

但是有什么问题呢？ 对于同步水合， `Zustand` **存储在创建时已经被水合。 相反，对于异步水合， ****`Zustand`**** 存储将在稍后的微任务中被水合。**

这有什么关系呢？ **异步水合可能会导致一些意外的行为。** 例如，如果您在 React 应用程序中使用 Zustand， 存储在初始渲染时不会被水合。 在您的应用程序在页面加载时依赖于持久化值的情况下， **您可能希望等到 存储已经被水合后再显示任何内容。 例如，您的应用程序可能认为用户 因为这是默认的，所以没有登录， 但实际上存储还没有被水合。**

[   https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data](https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data "   https://ouweiya.github.io/zustand-zh/docs/integrations/persisting-store-data")
