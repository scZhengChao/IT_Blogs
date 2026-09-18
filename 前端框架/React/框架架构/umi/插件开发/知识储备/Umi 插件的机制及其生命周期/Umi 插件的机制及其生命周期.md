# Umi 插件的机制及其生命周期

## 目录

- [生命周期](#生命周期)
- [register() 、 registerMethod() 以及 applyPlugins()](#register--registerMethod-以及-applyPlugins)
- [PluginAPI 的原理](#PluginAPI-的原理)
- [preset-umi](#preset-umi)

![](image_w3k9eLy4z0.png)

### 生命周期

- init stage: 该阶段 Umi 将加载各类配置信息。包括：加载 `.env` 文件； require `package.json` ；加载用户的配置信息； resolve 所有的插件（内置插件、环境变量、用户配置依次进行）。
- initPresets stage: 该阶段 Umi 将注册 `presets`。`presets` 在注册的时候可以通过 `return { presets, plugins }`**来添加额外的插件。** 其中 presets 将添加到`presets` **队列的队首**，而 `plugins` 将被添加到 `plugins` 队列的队尾。
- initPlugins stage: 该阶段 Umi 将注册 plugins。这里的 plugins 包括上个阶段由 presets 添加的额外的 plugins， 一个值得注意的点在于： 尽管 plugins 也可以 `return { presets, plugins }` ，但是 **Umi 不会对其进行任何操作**。插件的 init 其实**就是执行插件的代码**（但是插件的代码本质其实只是调用 api 进行各种 hook 的注册，而\*\* hook 的执行并非在此阶段执行\*\*，因此这里叫**插件的注册**）。
- resolveConfig stage: 该阶段 Umi 将整理各个插件中对于 `config schema` 的定义，然后执行插件的 `modifyConfig` 、`modifyDefaultConfig`、 `modifyPaths` 等 hook，**进行配置的收集**。
- collectionAppData stage: 该阶段 Umi 执行 `modifyAppData` hook，来**维护 App 的元数据**。（ `AppData` 是 `umi@4` 新增的 api ）
- onCheck stage: 该阶段 Umi 执行 `onCheck` hook。
- onStart stage: 该阶段 Umi 执行 `onStart` hook
- runCommand stage: 该阶段 Umi **运行当前 cli 要执行**的 command，（例如 `umi dev`, 这里就会执行 dev command）Umi 的各种核心功能都在 command 中实现。包括我们的插件调用 api 注册的绝大多数 hook。

以上就是 Umi 的插件机制的整体流程

### `register()` 、 `registerMethod()` 以及 `applyPlugins()`

`register()` 接收一个 `key` 和 一个 `hook`，它维护了一个 `key-hook[]` 的 map，每当调用 `register()` 的时候，就会为 key 额外注册一个 hook。

`register()` 注册的 `hooks` 供 `applyPlugins` 使用。 这些 hook 的**执行顺序参照** [tapable](https://github.com/webpack/tapable "tapable")

***

`registerMethod()` 接收一个 `key` 和 一个 `fn`，它会在 `api` 上**注册一个方法。**如果你**没有**向 `registerMethod()` 中传入 `fn`，那么 `registerMethod()` 会在 api 上注册一个"注册器"： 它会将 `register()` 传入` key` **并柯里化后的结果**作为 fn 注册到 api 上。这样就可以通过调用这个"注册器"，快捷地为 key 注册 hook 了。

关于上述 api 的更具体的使用，请参照[插件 API](https://umijs.org/docs/api/plugin-api "插件 API")

### PluginAPI 的原理

Umi 会为每个插件赋予一个 `PluginAPI` 对象，这个对象**引用了插件本身**和 `Umi` 的 `service`。

Umi 为 `PluginAPI` **对象的 get() 方法进行了 proxy**， 具体规则如下：

- pluginMethod: 如果 prop 是 Umi 所维护的 `pluginMethods[]` ( `通过 registerMethod()` 注册的方法 ）中的方法，则返回这个方法。
- service props: 如果 prop 是 serviceProps 数组中的属性（这些属性是 Umi 允许插件直接访问的属性），则返回 service 对应的属性。
- static props: 如果 prop 是参数 staticProps 数组中的属性（这些属性是静态变量，诸如一些类型定义和常量），则将其返回。
- 否则返回 api 的属性

因此，Umi 提供给插件的 api 绝大多数都是依靠 `registerMethod()` 来实现的，你可以直接使用我们的这些 api 快速地在插件中注册 hook。这也是 Umi 将框架和功能进行解耦的体现： Umi 的 service 只提供插件的管理功能，而 api 都依靠插件来提供。

### preset-umi

`umi-core` 提供了一套**插件的注册及管理机制**。而 Umi 的**核心功能**都靠 [preset-umi](https://github.com/umijs/umi/tree/master/packages/preset-umi "preset-umi") 来实现。

`preset-umi` 其实就是**内置的一个插件集**，它提供的插件分为三大类：

- registerMethods 这类插件注册了一些上述提到的"**注册器**"，以供开发者快速地**注册 hook**，这类方法也占据了 `PluginAPI` 中的**大多数。**
- features 这类插件为 Umi 提供了一些**特性**，例如 `appData`、`lowImport`、`mock` 等。
- commands 这类插件注册了各类 command， 提供了 Umi CLI 的各种功能。Umi 能够在**终端中正常运行**，**依靠的**就是 `command` 提供的功能。
