# proxy

## 目录

- [关闭 Proxy 支持情况下的使用限制](#关闭-Proxy-支持情况下的使用限制)

默认情况下，MobX 使用 `Proxy` 代理方式来让数组以及纯对象可观察。`Proxy` 能够提供最佳的性能表现以及在不同环境下大多数行为的一致性。 但是如果你的目标环境不支持 `Proxy`，你也可以通过配置将 Proxy 支持关闭。 **这种情况大部分是由于你需要支持IE或在没有使用**\*\*`Hermes`\*\***引擎的React Native环境中开发。**

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

**注意:** 在MobX 6 之前，你需要面临 MobX 4（兼容历史老旧引擎） 还是 MobX 5(支持现代引擎)的选择，然而现在MobX 6 将根据你的引擎环境引入特定API的 `polyfill`，（比如在只支持ES5标准的环境中使用map方法)。`Proxy` 不能被 polyfilled，虽然目前确实已经有这样的垫片了，但**是他们并不能支持所有的场景，因此也不适用于 MobX，不要使用他们。**

### 关闭 Proxy 支持情况下的使用限制

1.可观察的数组不再是真正的数组，因此使用 `Array.isArray`方法时将会返回 `false`。实际场景中，你在传递数组给其他模块时需要先使用`.slice()`操作来为原始数组创建一份浅拷贝，举个例子，`concat`操作在可观察数组上时将不会生效，因此你需要先使用`.slice(）`。

2.在创建可观察的纯对象之后，对其**进行添加/删除的属性操作自动观察将不会**生效。如果你想通过index类数组下标的方式访问对象或者其他动态集合请使用可观察`maps`来替代。

在不支持Proxy情况下，也是有方法使这些（add/delete）动态操作观察生效的。**那就是通过**[**Collection utilities {🚀}**](https://www.mobxjs.com/collection-utilities "Collection utilities {🚀}")**工具集。** 你需要确保新属性的添加是通过工具集的`set`方法，使用工具集的 `values`/`keys`/`entries`来迭代对象，而不是 JavaScript内置方法。 但是由于这经常会被忘记，所以我们还是推荐尽量使用可观察的`maps`来替代
