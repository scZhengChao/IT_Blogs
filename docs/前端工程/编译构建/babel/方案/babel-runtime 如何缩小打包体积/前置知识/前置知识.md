# 前置知识

## 目录

- [前置知识——Babel](#前置知识Babel)

# 前置知识——Babel

`Babel` 是一个被广泛使用的 JS 编译器，用于将新语法转换为向后兼容的 JS 代码。一般情况下，我们可以通过**安装预设和插件控制** Babel 的代码转译，比如：

**预设（Presets 一组预定义的转换规则的集合）**

1. **@babel/preset-env**：这是 `Babel` 官方推荐的预设之一，用于根据目标环境自动确定所需的转换和 polyfill。
2. **@babel/preset-react**：用于支持 React 项目中的 JSX 和其他相关特性的预设。·
3. **@babel/preset-typescript**：用于支持 TS 项目中的预设，能够将 TS 代码转换为 JS 代码。

**插件（Plugins 单个转换规则的集合）**

1. **@babel/plugin-proposal-class-properties**：用于支持 JS 类的属性初始化器，包括静态属性和实例属性。
2. **@babel/plugin-transform-arrow-functions**：将箭头函数转换为普通函数表达式，以提供更广泛的兼容性。
3. **@babel/plugin-transform-runtime**：将 `Babel` **编译时注入的辅助函数转换****为****引用运行时公共函数的方式**，以**减小输出文件的体积。**

此处我们先对 `@babel/preset-env` 做重点介绍
