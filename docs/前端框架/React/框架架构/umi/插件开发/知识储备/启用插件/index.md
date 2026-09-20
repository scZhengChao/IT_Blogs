# 启用插件

## 目录

- [环境变量](#环境变量)
- [配置](#配置)
- [插件的顺序](#插件的顺序)
- [禁用插件](#禁用插件)
  - [配置 key 为 false](#配置-key-为-false)
  - [在插件中禁用其他插件](#在插件中禁用其他插件)
- [查看插件注册情况](#查看插件注册情况)
  - [命令行](#命令行)

&#x20;    插件有两种启用方式： **环境变量中启用**和**配置中启用**。（与 `umi@3` 不同，我们不再支持对 `package.json` 中依赖项的插件实现自动启用）

> 注意：这里的插件指的是第三方插件，Umi 的内置插件统一在配置中通过对其 key 进行配置来启用。

### 环境变量

还可以通过环境变量 `UMI_PRESETS` 和 `UMI_PLUGINS` 注册额外插件。 比如：

```javascript 
$ UMI_PRESETS = foo/preset.js umi dev

```


> 注意： 项目里不建议使用，通常用于基于 Umi 的框架二次封装。

### 配置

在配置里通过 `presets` 和 `plugins` 配置插件，比如：

```javascript 
export default {
  presets: ['./preset/foo','bar/presets'],
  plugins: ['./plugin', require.resolve('plugin_foo')]
}
```


配置的内容为插件的路径。

### 插件的顺序

Umi 插件的注册遵循一定的顺序：

- 所有的 presets 都先于 plugins 被注册。
- 内置插件 -> 环境变量中的插件 -> 用户配置中的插件
- 同时注册（同一个数组里）的插件按顺序依次注册。
- preset 中注册的 preset 立即执行， 注册的 plugin 最后执行。

## 禁用插件

有两种方式禁用插件

### 配置 key 为 false

比如：

会禁用 Umi 内置的 mock 插件。

### 在插件中禁用其他插件

可通过 `api.skipPlugins(pluginId[])` 的方式禁用，详见[插件 API](https://umijs.org/docs/api/plugin-api "插件 API")。

## 查看插件注册情况

### 命令行

```javascript 
$ umi plugin list

```
