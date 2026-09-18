# plugin & preset

## 目录

- [plugin 和 preset](#plugin-和-preset)
- [约定的 plugin 入口](#约定的-plugin-入口)

### plugin 和 preset

preset 的作用是**预设一些插件**，它通常用来注册一批 `presets` 和 `plugins`。在 `preset` 中，上述提到的接受 `api` 的方法**可以有返回值**，该返回值是一个包含 `plugins` 和 `presets`**属性的对象，** 其作用就是注册相应的插件或者插件集。

比如：

```javascript 
import { IApi } from 'umi';
 
export default (api: IApi) => {
  return {
    plugins: ['./plugin_foo','./plugin_bar'],
    presets: ['./preset_foo']
  }
};

```


它们的注册顺序是值得注意的： **presets 始终先于 plugins 注册**。Umi 维护了两个队列分别用来依次注册 presets 和 plugins，这个例子中的注册的 `preset_foo` 将被置于 presets 队列队首，而 `plugin_foo` 和 `plugin_bar` 将被依次置于 plugins 队列队尾。这里把 preset 放在队首的目的在于保证 presets 之间的顺序和关系是可控的。

另外一个值得注意的点是：在 `plugin` 中，你也可以 `return` 一些 `plugins` 或者 presets，但是 Umi 不会对它做任何事情。

### 约定的 plugin 入口

- Umi 体系中约定了根目录下存在 `plugin` 文件，作为本地插件的约定入口，只要存在这个文件，就会被挂载。
