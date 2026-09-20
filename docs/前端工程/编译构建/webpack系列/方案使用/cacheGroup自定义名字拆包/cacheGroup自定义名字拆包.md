# cacheGroup自定义名字拆包

## 目录

- [背景](#背景)
- [cacheGroup](#cacheGroup)
- [nginx配置不缓存environment.bundle.js文件](#nginx配置不缓存environmentbundlejs文件)
- [插件](#插件)
- [使用](#使用)

### 背景

**自定义打包后的文件名字；方便容器动态覆盖 文件；比如k8s的config Map**

### cacheGroup

splitChunks拆包中新增cacheGroup。

注：

- 生产环境的priority比其他环境的优先级高
- minSize需要设置为最小
- minChunks为1

以下为实例代码：

```javascript 
chainWebpack: function (config: any) {
    ....
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
          minChunks: 2, //最小使用到次数，超过2次执行
          automaticNameDelimiter: '.', //连接符
          cacheGroups: {
            ...
            environment: {
              name: 'environment',
              test: /[\\/]packages[\\/]common[\\/]environment[\\/](.*?)environment.prod(.*?)\.ts/,
              chunks: 'initial',
              priority: 10,
              minSize: 0.0001,
              minChunks: 1
            },
            environment1: {
              name: 'environment1',
              test: /[\\/]packages[\\/]common[\\/]environment[\\/](.*?)environment(.*?)\.ts/,
              chunks: 'initial',
              priority: 9,
              minSize: 0.0001,
              minChunks: 1,
              filename: 'environment.bundle.js'
            }
          },
        },
      },
    });
  },
```


### nginx配置不缓存environment.bundle.js文件

```javascript 
location ~ .*\/environment\.bundle\.js$ {  
    root /opt/public;  
    add_header Cache-Control no-store;  
}

```


### 插件

```javascript 
const path = require('path');

class ModifyModuleAndChunkIdPlugin {
  geChunkId(chunk) {
    const newChunkId = `custom-${chunk.name}`;
    chunk.id = newChunkId;
    if (!Array.isArray(chunk.ids)) {
      chunk.ids = [];
    }

    if (!chunk.ids.includes(newChunkId)) {
      chunk.ids.push(newChunkId);
    }
  }

  apply(compiler) {
    const pluginName = ModifyModuleAndChunkIdPlugin.name;
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      // 监听 'beforeChunkIds' 阶段
      compilation.hooks.beforeChunkIds.tap(pluginName, (chunks) => {
        chunks.forEach((chunk) => {
          // 修改每个 chunk 的 id
          if (chunk.name === 'environment') {
            this.geChunkId(chunk);
          }
          if (chunk.name === 'environment1') {
            this.geChunkId(chunk);
          }
        });
      });

      // 监听 'beforeModuleIds' 阶段
      compilation.hooks.beforeModuleIds.tap(pluginName, (modules) => {
        modules.forEach((module) => {
          // 修改每个 module 的 id
          if (/[\\/]packages[\\/]common[\\/]environment[\\/](.*?)environment(.*?)\.ts/.test(module.resource)) {
            const fileName = path.parse(module.resource).name;
            const newModuleId = `custom-module-id-${fileName}`;
            module.id = newModuleId;
          }
        });
      });
    });
  }
}

module.exports = ModifyModuleAndChunkIdPlugin;
```


### 使用

```javascript 
chainWebpack: function (config: any) {
  ...
  config  
    .plugin('modifyModuleAndChunkId')  
    .use(modifyModuleAndChunkId);
}
```
