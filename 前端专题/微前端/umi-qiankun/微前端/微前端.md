# 微前端

## 目录

- [微前端](#微前端)
  - [微前端示例](#微前端示例)
  - [开始使用](#开始使用)
    - [配置父应用](#配置父应用)
      - [插件注册子应用](#插件注册子应用)
      - [运行时注册子应用](#运行时注册子应用)
    - [配置子应用](#配置子应用)

# 微前端

`@umi/max` 内置了 **Qiankun 微前端**[插件](https://github.com/umijs/umi/blob/master/packages/plugins/src/qiankun.ts "插件")，它可以一键启用 Qiankun 微前端开发模式，帮助您轻松地在 Umi 项目中集成 Qiankun 微应用，构建出一个生产可用的微前端架构系统。

关于 Qiankun 微前端的更多介绍请参阅[此页面](https://qiankun.umijs.org/zh/guide "此页面")。

## 微前端示例

![](https://gw.alipayobjects.com/mdn/rms_655822/afts/img/A*TroZSp_cH0MAAAAAAAAAAAAAARQnAQ)

如上图所示：在父应用里，我们通过导航栏切换路由后，下方显示的内容来自于不同的子应用。**子应用支持单独打开；子应用之间也支持任意的嵌套。**

换一种更直观的理解方式：\*\*父应用和子应用其实都是独立的前端项目，\*\***父应用可以在内部引入子应用，子应用也可以在自己内部继续引入孙子应用，以此类推。**

当应用能够作为子应用被其它应用引入的时候，它就成为了我们所说的微应用。

## 开始使用

> 🏆︎本教程假设您对什么是微前端，什么是 Qiankun 微应用，以及如何使用 Qiankun 微应用已经有了基本的了解。

### 配置父应用

**首先需要配置父应用，注册子应用的相关信息，这样父应用才能识别子应用并在内部引入。**

注册子应用的方式主要有两种：

- 插件注册子应用。
- 运行时注册子应用。

#### 插件注册子应用

修改父应用的 Umi 配置文件，添加如下内容：

```javascript 
// .umirc.ts
export default {
  qiankun: {
    master: {
      apps: [
        {
          name: 'app1',
          entry: '//localhost:7001',
        },
        {
          name: 'app2',
          entry: '//localhost:7002',
        },
      ],
    },
  },
};
```


其中，`name` 为子应用的名称，在引入子应用时需要使用到它；`entry` 为子应用运行的 HTTP 地址；`master` 对象的完整 API 可[见此](https://umijs.org/docs/max/micro-frontend#masteroptions "见此")。

#### 运行时注册子应用

修改父应用的 Umi 配置文件，添加如下内容：

```javascript 
// .umirc.ts
export default {
  qiankun: {
    master: {},
  },
};
```


修改父应用的 `src/app.ts` 文件，导出 `qiankun` 对象：

```javascript 
// src/app.ts
export const qiankun = {
  apps: [
    {
      name: 'app1',
      entry: '//localhost:7001',
    },
    {
      name: 'app2',
      entry: '//localhost:7002',
    },
  ],
};
```


### 配置子应用

子应用**需要导出必要的生命周期钩子，供父应用在适当的时机调用。**

假设您的子应用项目**基于 Umi 开发**且\*\*引入了 ****`qiankun`**** \*\*[**插件**](https://github.com/umijs/umi/blob/master/packages/plugins/src/qiankun.ts "插件")。如果没有，可以按照[**此教程**](https://qiankun.umijs.org/zh/guide/getting-started#微应用 "此教程")进行配置。

修改子应用的 Umi 的配置文件，添加如下内容：

```javascript 
// .umirc.ts
export default {
  qiankun: {
    slave: {},
  },
};
```


这样，微前端插件会自动在项目中创建好 `Qiankun` 子应用所需的生命周期钩子和方法，Easy as a cake！
