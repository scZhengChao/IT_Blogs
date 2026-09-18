# layout

## 目录

- [介绍](#介绍)
- [配置](#配置)
  - [构建时配置](#构建时配置)

[ @umijs/plugin-layout  https://v3.umijs.org/zh-CN/plugins/plugin-layout](https://v3.umijs.org/zh-CN/plugins/plugin-layout " @umijs/plugin-layout  https://v3.umijs.org/zh-CN/plugins/plugin-layout")

配置开启。

## 介绍

为了进一步降低研发成本，我们尝试将布局通过 umi 插件的方式内置，只需通过简单的配置即可拥有 Ant Design 的 Layout，包括导航以及侧边栏。从而做到用户无需关心布局。

- 默认为 Ant Design 的 Layout [@ant-design/pro-layout](https://www.npmjs.com/package/@ant-design/pro-layout "@ant-design/pro-layout")，支持它全部配置项。
- 侧边栏菜单数据根据路由中的配置自动生成。
- 默认支持对路由的 `403/404 `处理和 `Error Boundary`。
- 搭配 `@umijs/plugin-access `插件一起使用，可以完成对路由权限的控制。
- 搭配 `@umijs/plugin-initial-state` 插件和 `@umijs/plugin-model` 插件一起使用，可以拥有默认用户登陆信息的展示。

> 想要动态菜单？查看这里 [*菜单的高级用法*](https://beta-pro.ant.design/docs/advanced-menu-cn "菜单的高级用法")

## 配置

### 构建时配置

可以通过配置文件配置 `layout` 的主题等配置, 在 [config/config.ts](https://github.com/ant-design/ant-design-pro/blob/4a2cb720bfcdab34f2b41a3b629683329c783690/config/config.ts#L15 "config/config.ts") 中这样写：

```typescript 
import { defineConfig } from 'umi';

export const config = defineConfig({
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: 'Ant Design',
    locale: true,
    layout: 'side',
  },
});
```
