# 开发插件

在官网有详细的教程，这里我们简单学会如何快速完成一个插件。

首先，我们需要对Rollup执行流程有一个完整的理解，如下图生命周期钩子函数所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd3ebc551f13414c981b7fad86ee9b4f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

Rollup对外提供的生命周期钩子函数：

- 读取配置项 options
- 开始构建 buildStart
- 解析代码 resolveId，这里可以自定义一个解析代码器
- 加载代码 load
- 加载缓存模块 shouldTransformCacheModule
- 转义代码中 transform
- 将代码解析ES模块化后 modulePared
- 解析异步加载，如：import(()=> xxx) resolveDynamicImport
- 构建结束 buildEnd
- 监听改变中 watchChange
- 关闭监听后 closeWatcher

接下来我们来完成一个插件，就是在代码构建前，将`__helloworld__`换成`"hello qborfy!"`，避免代码解析出错，代码如下：

```javascript 

// replaceHelloWorld.js
export default function replaceHelloWorld(){
    return {
        name: 'replace-helloworld', // 插件名称
        transform ( code, id ) { // 当进入转换的时候
            if (id === 'replace-helloworld') {
                // 
                code = code.replace(/__helloworld__/g, `"hello qborfy!"`)
                return {
                    code, 
                    map: null, // 这里不影响sourcemap生成 具体可以看https://rollupjs.org/plugin-development/#source-code-transformations
                };
            }
            return null; 
        }
    }
}

// 接下来在rollup.config.js中引用

import replaceHelloWorld from './replaceHelloWorld.js';
export default ({
  input: 'virtual-module', // resolved by our plugin
  plugins: [replaceHelloWorld()],
  output: [{
    file: 'bundle.js',
    format: 'es'
  }]
});

```


有两种方式去管理插件，一个是在项目直接管理维护，另外一种是通过发布npm包管理，这个取决插件是否有公用性即可。
