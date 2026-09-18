# 别名

## 目录

- [resolve.alias](#resolvealias)

[ 共享选项 | Vite 官方中文文档 下一代前端工具链 https://cn.vite.dev/config/shared-options.html#resolve-alias](https://cn.vite.dev/config/shared-options.html#resolve-alias " 共享选项 | Vite 官方中文文档 下一代前端工具链 https://cn.vite.dev/config/shared-options.html#resolve-alias")

## resolve.alias

- **类型：**
- `Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>`

将会被传递到`@rollup/plugin-alias`作为[entries 的选项](https://github.com/rollup/plugins/tree/master/packages/alias#entries "entries 的选项")。也可以**是一个对象，或一个**`{ find, replacement, customResolver }`**的数组。**

当使用文件系统路径的别名时 **，请始终使用绝对路径。相对路径的别名值会原封不动地被使用**，因此无法被正常解析。

更高级的自定义解析方法可以通过[插件](https://cn.vite.dev/guide/api-plugin.html "插件")实现。
