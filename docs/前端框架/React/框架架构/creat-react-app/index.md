# creat-react-app

## 目录

- [配置路径别名](#配置路径别名)
- [引入Ant-Design组件库](#引入Ant-Design组件库)
- [引入react路由](#引入react路由)
  - [1.安装依赖](#1安装依赖)
  - [2.注册路由](#2注册路由)
  - [3.路由跳转例子](#3路由跳转例子)
- [关闭 eslint 提醒](#关闭-eslint-提醒)
  - [二、第一种方式](#二第一种方式)
  - [三、第二种方式](#三第二种方式)

[ 使用create-react-app构建react+ts项目(超详细)-CSDN博客 文章浏览阅读1.3w次，点赞48次，收藏98次。本文主要介绍的是如何通过create-react-app快速搭建一个react+ts的web项目，同时引入了ant-design作为UI组件库，路由(react-router-dom)以及使用redux作为状态管理库；希望通过结合一些简单案例的实践掌握react开发的基本基础以及帮助一些有需要的同学.\_create-react-app https://blog.csdn.net/qq\_52569656/article/details/130602732](https://blog.csdn.net/qq_52569656/article/details/130602732 " 使用create-react-app构建react+ts项目(超详细)-CSDN博客 文章浏览阅读1.3w次，点赞48次，收藏98次。本文主要介绍的是如何通过create-react-app快速搭建一个react+ts的web项目，同时引入了ant-design作为UI组件库，路由(react-router-dom)以及使用redux作为状态管理库；希望通过结合一些简单案例的实践掌握react开发的基本基础以及帮助一些有需要的同学._create-react-app https://blog.csdn.net/qq_52569656/article/details/130602732")

```bash 
create-react-app my-app --template typescript

```


- react项目默认隐藏了webpack相关配置文件，如果想要暴露在项目当中，需要执行`npm run eject,`并且此操作无法回退，此操作根据自行需要执行；

#### 配置路径别名

- 在引入文件时如果都是`../ ../../`这种相对路径方式引用可读性很差
- 安装依赖

```bash 
npm install react-app-rewired customize-cra --save-dev

```


- 在项目根路径下创建config-overrides.js文件，添加如下配置

```typescript 
const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')
module.exports = override(
  addWebpackAlias({
    // 指定@符指向src目录
    '@': path.resolve(__dirname, 'src'),
  })
)¡

```


- 修改package.json配置，重启项目`npm run serve`即可

![](./assets/image/image_iMKIm0lHgj.png)

- 页面组件引用方式由 …/方式可以改为@/方式

```typescript 
import About from '@/pages/About'
// 等价于
import Home from '../pages/About'

```


- 如果提示找不到类型声明，那么就检查tsconfig.json文件看看是否缺配置

```json 
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "src"
  ]
}

```


### 引入Ant-Design[组件](https://edu.csdn.net/cloud/houjie?utm_source=highword\&spm=1001.2101.3001.7020 "组件")库

```bash 
npm install antd --save

```


### 引入react路由

#### 1.安装依赖

```javascript 
npm i react-router-dom

```


#### 2.注册路由

- 进入index.tsx引入并注册路由，这里我们使用history模式

```typescript 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ConfigProvider locale={zhCN}>
              <App />
          </ConfigProvider>
      </BrowserRouter>
  </React.StrictMode>
);


```


#### 3.路由跳转例子

- 在src下新建pages文件夹创建两个路由组件；新建routes文件夹，创建index.tsx文件用于存放路由表，引入路由组件并且向外暴露，就像下面这样：
-

[ReactRouter——路由配置、路由跳转、带参跳转、新route配置项\_react router-CSDN博客 文章浏览阅读8.5k次，点赞38次，收藏48次。终于学到router了！今天主要是根据文档学的6.4相关的router，和现在常用的应该还是有点出入，肯定多看看就完事儿了！\_ react router <https://blog.csdn.net/DogEgg_001/article/details/139449907>](https://blog.csdn.net/DogEgg_001/article/details/139449907 " ReactRouter——路由配置、路由跳转、带参跳转、新route配置项_react router-CSDN博客 文章浏览阅读8.5k次，点赞38次，收藏48次。终于学到router了！今天主要是根据文档学的6.4相关的router，和现在常用的应该还是有点出入，肯定多看看就完事儿了！_react router https://blog.csdn.net/DogEgg_001/article/details/139449907")

# 关闭 eslint 提醒

### 二、第一种方式

在`react-scripts`依赖包下的`config`目录找到`webpack.config.js`配置文件，在`webpack.config.js`中注释掉以下代码：

```typescript 
{
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                // @remove-on-eject-begin
                ignore: isExtendingEslintConfig,
                baseConfig: isExtendingEslintConfig
                  ? undefined
                  : {
                      extends: [require.resolve('eslint-config-react-app')],
                    },
                useEslintrc: isExtendingEslintConfig,
                // @remove-on-eject-end
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc,
        },

```


### 三、第二种方式

在 `package.json` 中修改为以下：

```json 
eslintConfig": {
    "extends": "react-app",
    "rules": {
      "no-undef": "off",
      "no-restricted-globals": "off",
      "no-unused-vars": "off"
    }
  }

```


[修改配置](./修改配置/index.md "修改配置")
