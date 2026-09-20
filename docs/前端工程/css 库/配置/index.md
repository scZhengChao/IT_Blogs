# 配置

## 目录

- [less](#less)
  - [math用法](#math用法)
    - [作用](#作用)
    - [umi :](#umi-)
    - [vite](#vite)
  - [globalVars](#globalVars)
    - [vitejs](#vitejs)

# less

## **math用法**

- 官网：[less.bootcss.com/usage/#less…](https://link.juejin.cn?target=https://less.bootcss.com/usage/#lessjs-options-math "less.bootcss.com/usage/#less…")
- 命令行写法：lessc --math=\[option 或 lessc -m=\[option]
- 配置文件写法：{ math: '\[option]' }
- 可选参数：always、parens| strict。（具体示例参考官网）

##### 作用

```javascript 
width: 40 / 20px;
height: 25 / 1080 * 100vh;

编译成了

width: 2px;
height: 2.31481481vh;

```


这意味着我们在项目开发时，甚至可以不写**calc()，** 牛逼Plus啊。

##### umi :

```javascript 
lessLoader:{
  math:'always'
}
```


### vite

首先，我们需要给项目安装less，然后再vite.config.ts中配置

```javascript 
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  },
});

```


## globalVars

假设我们在某个文件定义了一个css全局变量;

```javascript 
// test.less
@blue:#1CC0FF;

```


我们在其他文件使用这个变量，必须引入这个文件才可以

```javascript 
<style scoped lang="less">
@import "./test.less";
.wrap{
  line-height: 1080 / 108vh;
  height: 1080 / 108vh;
  background: red;
  color: @blue;
}
</style>

```


如果这个变量的使用非常频繁，频繁引入会让人崩溃。less的globalVars配置项则可以完美解决这个问题。

##### vitejs

```javascript 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: "always",
        globalVars:{
          blue:"#1CC0FF"
        }
      },
    },
  },
});

```


此时，我们可以全局使用这个参数了

```javascript 
<style scoped lang="less">
.wrap{
  line-height: 1080 / 108vh;
  height: 1080 / 108vh;
  background: red;
  color: @blue;
}
</style>

```
