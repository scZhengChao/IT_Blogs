# 声明文件

## 目录

- [declare](#declare)
- [.d.ts](#dts)
- [使用三方库](#使用三方库)
- [自己写声明文件](#自己写声明文件)
- [ts2304 cannot find name](#ts2304-cannot-find-name)
- [全局常量](#全局常量)
  - [模块化（CommonJS）](#模块化CommonJS)
  - [ES6的模块化方式（import export）](#ES6的模块化方式import-export)
  - [UMD](#UMD)
  - [其他](#其他)

[ 浅析Typescript类型声明文件定义、为什么需要声明文件、如何编写TS声明文件（如何自定义类型声明文件、如何给第三方库写声明文件） - 古兰精 - 博客园 一、为什么需要声明文件 1、创建 src/sum/index.js 文件，内容如下： 这是一个最普通不过的 js 文件，对外暴露 sum() 方法，在 nodejs 中运行。 function sum https://www.cnblogs.com/goloving/p/16157326.html](https://www.cnblogs.com/goloving/p/16157326.html " 浅析Typescript类型声明文件定义、为什么需要声明文件、如何编写TS声明文件（如何自定义类型声明文件、如何给第三方库写声明文件） - 古兰精 - 博客园 一、为什么需要声明文件 1、创建 src/sum/index.js 文件，内容如下： 这是一个最普通不过的 js 文件，对外暴露 sum() 方法，在 nodejs 中运行。 function sum https://www.cnblogs.com/goloving/p/16157326.html")

### declare

当使用第三方库时，很多三方库不是用 TS 写的，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

比如，在 TS 中直接使用 Vue，就会报错，

```javascript 
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

```


这时，我们可以使用 `declare` 关键字来定义 Vue 的类型，简单写一个模拟一下，

```javascript 
interface VueOption {
    el: string,
    data: any
}

declare class Vue {
    options: VueOption
    constructor(options: VueOption)
}

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

```


这样就不会报错了，使用 declare 关键字，相当于告诉 TS 编译器，这个变量（Vue）的类型已经在其他地方定义了，你直接拿去用，别报错。

需要注意的是，`declare class Vue` 并没有真的定义一个类，只是定义了类 `Vue` 的类型，仅仅会用于编译时的检查，在编译结果中会被删除。它编译结果是：

```typescript 
declare const IS_MOBILE = true;    // 编译后此行消失 
const wording = IS_MOBILE ? '移动端' : 'PC端'; 


用三斜线指令可以 一次性引入整个类型声明文件 。

/// <reference path="../typings/monaco.d.ts" /> 
const range = new monaco.Range(2, 3, 6, 7);
```


# .d.ts

通常我们会把声明语句放到一个单独的文件（`Vue.d.ts`）中，这就是声明文件，以 `.d.ts` 为后缀。

```javascript 
// src/Vue.d.ts

interface VueOption {
    el: string,
    data: any
}

declare class Vue {
    options: VueOption
    constructor(options: VueOption)
}
// src/index.ts

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

```


一般来说，ts 会解析项目中所有的 `*.ts` 文件，当然也包含以 `.d.ts` 结尾的文件。所以当我们将 `Vue.d.ts` 放到项目中时，其他所有 `*.ts` 文件就都可以获得 `Vue` 的类型定义了。

# 使用三方库

那么当我们使用三方库的时候，是不是所有的三方库都要写一大堆 decare 的文件呢？

答案是不一定，要看社区里有没有这个三方库的 TS 类型包（一般都有）。

社区使用 `@types` 统一管理第三方库的声明文件，是由 DefinitelyTyped\[11] 这个组织统一管理的

比如安装 lodash 的类型包，

```javascript 
npm install @types/lodash -D

```


只需要安装了，就可以在 TS 里正常使用 lodash 了，别的啥也不用做。

# 自己写声明文件

用到的文件的开头用「三斜线指令」表示引用了声明文件

```typescript 
/// <reference path="./jQuery.d.ts" />

```


```typescript 

import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

/**
 * redirect: noredirect        当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    hidden: true              当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)

    alwaysShow: true          当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式，
                              只有一个时，会将那个子路由当做根路由显示在侧边栏，
                              若你想不管路由下面的 children 声明的个数都显示你的根路由，
                              你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，
                              一直显示根路由(默认 false)

    title: 'title'            设置该路由在侧边栏和面包屑中展示的名字

    icon: 'svg-name'          设置该路由的图标

    noCache: true             如果设置为true，则不会被 <keep-alive> 缓存(默认 false)

    breadcrumb: false         如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)

    affix: true               如果设置为true，则会一直固定在tag项中(默认 false)

    noTagsView: true          如果设置为true，则不会出现在tag中(默认 false)

    activeMenu: '/dashboard'  显示高亮的路由路径

    followAuth: '/dashboard'  跟随哪个路由进行权限过滤

    canTo: true               设置为true即使hidden为true，也依然可以进行路由跳转(默认 false)
  }
 **/
declare module 'vue-router' {
    interface RouteMeta extends Record<string | number | symbol, unknown> {
        hidden?: boolean
        alwaysShow?: boolean
        title?: string
        icon?: string
        noCache?: boolean
        breadcrumb?: boolean
        affix?: boolean
        activeMenu?: string
        noTagsView?: boolean
        followAuth?: string
        canTo?: boolean
    }
}

type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

declare global {
    declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
        name: string
        meta: RouteMeta
        component?: Component | string
        children?: AppRouteRecordRaw[]
        props?: Recordable
        fullPath?: string
    }

    declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
        name: string
        meta: RouteMeta
        component: string
        path: string
        redirect: string
        children?: AppCustomRouteRecordRaw[]
    }
}

```


创建一个 `types` 目录，专门用来管理自己写的声明文件，将声明文件放到 types

```javascript 
//声明文件
 路径： //types/*.d.ts    注意不在src 在根目录下
 

// tsconfig.json
{
  "compilerOptions": {
     "typeRoots": ["./node_modules/@types/", "./types"]
   },
  " include": ["src/**/*", "types/**/*.d.ts", "mock/**/*.ts"],
   "exclude": ["dist", "node_modules"]
}


```


[ 「1.9W字总结」一份通俗易懂的 TS 教程，入门 + 实战！  https://mp.weixin.qq.com/s/pQNCLOZWsqXi6NScyWhdEg](https://mp.weixin.qq.com/s/pQNCLOZWsqXi6NScyWhdEg " 「1.9W字总结」一份通俗易懂的 TS 教程，入门 + 实战！  https://mp.weixin.qq.com/s/pQNCLOZWsqXi6NScyWhdEg")

# ts2304 cannot find name

```javascript 
"include": ["src/**/*", "types/**/*.d.ts", "mock/**/*.ts"],   //路径要写对

```


# 全局常量

```javascript 
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __TRUE__: 'true',
    __static:'asasf',
    __userApi:'asfasfas'
  },
})


//d.ts
declare const __static:String
declare const __userApi:String
```


### 模块化（CommonJS）

通过require的方式引入模块化的代码

```typescript 
// d.ts
declare module "ever" {
    export let a: number
    export function b(): number
    export namespace c{
        let c: string
    }
 }
 // 引用
 cosnt ever = require('ever)
 ever.a = 100
 ever.b = function() {
     return 100 + 300
 }
```


### ES6的模块化方式（import export）

```typescript 
export declare let a1: 1
export declare let a2: 2
// 或
declare let a1: 1
declare let a2: 2
export { a1,a2 }
```


### UMD

有一种代码，既可以通过全局变量访问到，也可以通过require的方式访问到。

```typescript 
declare namespace ${
    let a:number
}
 
declare module "$" {
    export = $
}

```


### 其他

有时候我们**扩展了一些内置对象。给Date的内置对象扩展方法**

```typescript 
interface Date {
    format(f: string): string
}

```
