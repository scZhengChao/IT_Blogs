# 配置插件

## 目录

- [配置插件](#配置插件)
  - [插件 key 的默认命名规则](#插件-key-的默认命名规则)

## 配置插件

通过配置插件的 key 来配置插件，比如：

```javascript 
export default{
  mock: { exclude: ['./foo'] }
}

```


这里 `mock` 就是 `Umi` 内置插件 `mock` 的 `key`。

再比如我们安装一个插件 `umi-plugin-bar`, 其 key 默认是 `bar`, 就可以配置：

```javascript 
export default{
  bar: { ... }
}

```


### 插件 key 的默认命名规则

- 如果插件是一个包的话，key 的默认值将是**去除前缀的包名**。比如 `@umijs/plugin-foo` 的 key 默认为 `foo`， `@alipay/umi-plugin-bar` 的 key 默认为 `bar`。值得注意的是，该默认规则**要求你的包名符合 Umi 插件的命名规范**。
- 如果插件不是一个包的话，key 的默认值将是**插件的文件名**。比如 `./plugins/foo.js` 的 key 默认为 `foo`

为了避免不必要的麻烦，我们建议你为自己编写的插件**显示地声明其 key**。
