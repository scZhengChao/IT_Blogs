# umi4

## 目录

- [1.worker 代码](#1worker-代码)
- [2.前端调用worker](#2前端调用worker)
- [3.重型数据传递](#3重型数据传递)
- [4.使用三方库
  ](#4使用三方库)
- [参考：](#参考)

umi4之后，自带webpack5，什么配置都不需要，直接上代码

### 1.worker 代码

```typescript 
// src/workers/testworker.ts
 
function add(num0:number,num1:number){
    let sum = num0+num1;
    self.postMessage(sum);
}
 
self.addEventListener('message',event=>{
    const {num0,num1} = event.data;
    console.log(event);
    add(num0,num1);
})
```


### 2.前端调用worker

```typescript 
const testWkr = new Worker(new URL('@/workers/testworker.ts', import.meta.url));;
testWkr.postMessage({num0:5,num1:6});
testWkr.addEventListener('message',event=>{
    console.log(event.data);
    testWkr.terminate();
 });
```


或者封装一下，当成普通的函数执行。一般发现前台卡顿后才去考虑worker，这样worker 简单调用之前的处理代码，然后把调用worker过程新文件封装成之前的函数，就基本不用大动代码。

### 3.重型数据传递

如果要传向worker传递文件/bolb等数据，普通[消息传递](https://so.csdn.net/so/search?q=消息传递\&spm=1001.2101.3001.7020 "消息传递")会影响效率，可以传递[transfer](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage#transfer "transfer")

```typescript 
//前台
let image:File= ... ;
image.arrayBuffer().then(arrbuf=>{
    const testWkr = new Worker(new URL('@/workers/testworker.ts', import.meta.url));
    //传递，传递之后就不能再访问arrbuf了，因为这个对象内存已经交给worker线程了
    testWkr.postMessage({ sth: "sth",data:arrbuf,type:image.type,filename:image.name},[arrbuf] );
})
 
//worker
self.addEventListener('message',event=>{
    //接收主线程的transfer数据并封装还原File
    let image=new File([event.data.data as ArrayBuffer],event.data.filename,
{type:event.data.type});
    //处理之后可以像前台一样postMessage,把数据内存交给前台
     //注意transfer数据交给前台之后，worker线程也是不能访问这个数据了 
})
```


4.使用三方库

在Umi框架**中,如果worker要使用三方库的话,需要配置mfsu,排除三方库,不然会报错.**

需要注意的是，不是**所有函数和构造函数** (或者说…类) 都可以在 Worker 中使用。具体参考页面 Worker 所支持的函数和类。

也就是说如果三方库用到了`worker`不支持的函数和类，就不能在`worker`中运行，比如我踩过的图片压缩库 `compressorjs` ，就使用了`HTMLCanvasElement: toBlob()，`前台运行尚可，worker直接报错。

```typescript 
// .umirc.ts
// 这里排除了两个前端加密库
export default defineConfig({
  ...
  mfsu:{
    exclude:['crypto-js','jsrsasign']
  },
  ...
});
```


# 参考：

1. [webpack 5 Web Workers](https://webpack.js.org/guides/web-workers/ "webpack 5 Web Workers")

里面写了一句话：

> As of webpack 5, you can use Web Workers without worker-loader.

1. [umi MFSU worker](https://umijs.org/docs/guides/mfsu#worker-%E5%85%BC%E5%AE%B9%E9%97%AE%E9%A2%98 "umi MFSU worker") 兼容问题&#x20;
2. [umi MFSU](https://umijs.org/docs/api/config#mfsu "umi MFSU") 配置
3. [Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API "Web Workers API")

[ 在Umi (UmiJS) 脚手架中使用 Webworker TypeScript\_umi中使用worker-CSDN博客 文章浏览阅读932次，点赞8次，收藏11次。本文讲述了在umi4更新后，如何在无需worker-loader的情况下利用webpack5内置的WebWorkers进行编程，包括worker的编写、前端调用、重型数据传递以及处理第三方库的兼容性问题，如MFSU配置。 https://blog.csdn.net/weixin\_42780086/article/details/135775532](https://blog.csdn.net/weixin_42780086/article/details/135775532 " 在Umi (UmiJS) 脚手架中使用 Webworker TypeScript_umi中使用worker-CSDN博客 文章浏览阅读932次，点赞8次，收藏11次。本文讲述了在umi4更新后，如何在无需worker-loader的情况下利用webpack5内置的WebWorkers进行编程，包括worker的编写、前端调用、重型数据传递以及处理第三方库的兼容性问题，如MFSU配置。 https://blog.csdn.net/weixin_42780086/article/details/135775532")
