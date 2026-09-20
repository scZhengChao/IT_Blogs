# qiankun接入vue3

## 目录

- [vue3子应用接入路由](#vue3子应用接入路由)

首先，新建一个vue项目

安装脚手架

```javascript 
npm install -g @vue/cli 

```


**创建vue3项目**

```javascript 
vue create qiankun-micro-vue3-app3

```


**安装typescript**

```javascript 
cd qiankun-micro-vue3-app3
vue add typescript

```


**进行配置：**

修改 vue.config.js 文件

```javascript 
// @ts-nocheck
const { name } = require('./package.json');
module.exports = {
  devServer:{
    port: 3013,
    headers:{
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    },
  },
}

```


在 src 文件夹下，新建 public-path.js 文件

```javascript 
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

```


修改 main.ts 入口文件

```javascript 
// @ts-nocheck
import "./public-path";
import { createApp } from "vue";
import Vue from "vue";
import App from "./App.vue";
let instance = null;

function render(props = {}) {
  const { container } = props;
  instance = createApp(App);
  instance.mount(container ? container.querySelector("#app") : "#app");
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

export async function mount(props) {
  console.log('vue3-app')
  console.log(props)
  render(props);
  instance.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = "";
  instance = null;
}

```


在 qiankun-base 主应用中，加载微应用

```javascript 
registerMicroApps([
  {
    name: "micro-app1", // app name registered
    entry: "//localhost:3011",
    container: "#micro-app1",
    activeRule: "/micro-app1",
    props: {
      niceBody: "malena",
      age: 32
    }
  },
  {
    name: "micro-app2",
    entry: "//localhost:3012",
    container: "#micro-app2",
    activeRule: "/micro-app2",
    props: {
      niceBody: "malena",
      age: 32
    }
  },
  {
    name: "micro-vue3-app3",
    entry: "//localhost:3013",
    container: "#micro-vue3-app3",
    activeRule: "/micro-vue3-app3",
    props: {
      niceBody: "malena",
      age: 32
    }
  }
]);

```


如你所愿，如下所示vue3应用

![](./assets/image/image_Sp8vFkhvuK.png)

## vue3子应用接入路由

第一步，当然也是安装路由

```javascript 
npm install vue-router --save

```


新建 src\router\index.ts 文件，新建两个页面，在路由文件中配置。

```javascript 

import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Mila from '../pages/Mila.vue';
import Malena from '../pages/Malena.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/mila',
    component: Mila
  },
  {
    path: '/malena',
    component: Malena
  }
];
const router = createRouter({
  history: createWebHistory(
    window.__POWERED_BY_QIANKUN__ ? "/micro-vue3-app3" : "/"
  ),
  routes
});
export default router;

```


然后，在 main.ts 文件中使用

```javascript 
import router from './router/index';

function render(props = {}) {
  const { container } = props;
  instance = createApp(App);
  instance.use(router)
  instance.mount(container ? container.querySelector("#app") : "#app");
}

```


入口页面 App.vue 中，加入 router-view

```javascript 
<template>
  <router-link to="/mila">mila</router-link> |
  <router-link to="/malena">malena</router-link>
  <router-view />
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';

@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```


vue3子应用，也成功接入路由。

[http://localhost:3010/micro-vue3-app3/malena](https://link.juejin.cn/?target=http://localhost:3010/micro-vue3-app3/malena "http://localhost:3010/micro-vue3-app3/malena")

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e69a9c1c951848fab0ebd0f207249d9f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
