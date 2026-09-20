# 模块

## 目录

- [run，载入配置](#run载入配置)

![](./image/image_OHpL6CEtJw.png)

在concent里，提供一个全局唯一的`store`，而`store`是由多个模块一起组成的，**模块**是一个非常重要的概念，每个模块又分别由`state`、`reducer`、`computed`、`watch`、`lifecycle`组成。

## run，载入配置

定义好各个模块后，传递给`run`接口第一位参数作为启动concent的store配置项，concent启动后会维护这一个全局唯一的`ConcentContext`对象，里面负责存储各种配置信息，以及暴露底层api接口。

> **必需先启动concent，才能开始渲染你的react应用根节点**，除了`run`的调用时机的限制，concent并不需要在你的根app外面包一层`Provider`来提供store上下文等其他信息，所有的concent组件实例化后都会创建一个`RefContext`实例上下文对象，所有的实例接口都由\*\*`RefContext`\*\***提供**。

一个典型的concent应用启动流程如下图所示

![](./image/image_3U7b41L_Ri.png)
