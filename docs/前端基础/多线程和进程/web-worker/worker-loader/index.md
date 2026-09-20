# worker-loader

## 目录

- [选项](#选项)
  - [name](#name)
  - [inline](#inline)
  - [fallback](#fallback)
  - [publicPath](#publicPath)
- [Worker.js](#Workerjs)
  - [Cross-Origin Policy](#Cross-Origin-Policy)

[ worker-loader (Loaders) - Webpack 中文开发手册 - 开发者手册 - 腾讯云开发者社区-腾讯云  https://cloud.tencent.com/developer/section/1477547](https://cloud.tencent.com/developer/section/1477547 " worker-loader (Loaders) - Webpack 中文开发手册 - 开发者手册 - 腾讯云开发者社区-腾讯云  https://cloud.tencent.com/developer/section/1477547")

[   https://github.com/webpack-contrib/worker-loader](https://github.com/webpack-contrib/worker-loader "   https://github.com/webpack-contrib/worker-loader")

> **umi 以及 webpack 均提供配置和支持**

```markdown 
npm i -D worker-loader

```


```javascript title="App.js"
import Worker from 'worker-loader!./Worker.js';
```


```javascript title="webpack.config.js"
{
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  }
}
```


```javascript title="App.js"
import Worker from './file.worker.js';

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = function (event) {};

worker.addEventListener("message", function (event) {});
```


## 选项

| Name       | 类型        | 默认             | 描述             |
| ---------- | --------- | -------------- | -------------- |
| name       | {String}  | hash.worker.js | 为输出脚本设置一个自定义名称 |
| inline     | {Boolean} | false          | 将工作人员内联为BLOB   |
| `fallback` | {Boolean} | false          | 需要非工作人员支持环境的回退 |
| publicPath | {String}  | null           | 覆盖从中下载工作者脚本的路径 |

### `name`

要为输出脚本设置自定义名称，请使用`name`参数。该名称可能包含字符串`[hash]`，为了缓存目的，该字符串将替换为依赖于内容的哈希

```javascript title="webpack.config.js"
{
  loader: 'worker-loader',
  options: { name: 'WorkerName.[hash].js' }
}
```


### `inline`

您还可以使用该`inline`参数将工作人员内联为BLOB

```typescript title="webpack.config.js"
{
  loader: 'worker-loader',
  options: { inline: true }
}
```


> inline模式也会为浏览器创建块，而不支持内联，为了禁用此行为，只需将`fallback`参数设置为`false`

```javascript title="webpack.config.js"
{
  loader: 'worker-loader'
  options: { inline: true, fallback: false }
}
```


### `fallback`

需要非支持环境的回退

```javascript title="webpack.config.js"
{
  loader: 'worker-loader'
  options: { fallback: false }
}
```


### `publicPath`

覆盖下载工作程序脚本的路径。如果未指定，则使用与其他 webpack 相同的公共路径

```typescript title="webpack.config.js"
{
  loader: 'worker-loader'
  options: { publicPath: '/scripts/workers/' }
}
```


# **Worker.js**

worker 文件可以像任何其他文件一样导入依赖项

```javascript 
const _ = require('lodash')

const obj = { foo: 'foo' }

_.has(obj, 'foo')

// Post data to parent thread
self.postMessage({ foo: 'foo' })

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event))
```


> ℹ️如果您已[babel-loader](https://github.com/babel/babel-loader "babel-loader")配置，您甚至可以使用ES2015模块。

```typescript 
import _ from 'lodash'

const obj = { foo: 'foo' }

_.has(obj, 'foo')

// Post data to parent thread
self.postMessage({ foo: 'foo' })

// Respond to message from parent thread
self.addEventListener('message', (event) => console.log(event))
```


要与 TypeScript 集成，您需要为工作人员的导出定义一个自定义模块

```typescript title="typings/custom.d.ts"
declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}
```


```typescript title="Worker.ts"
const ctx: Worker = self as any;

// Post data to parent thread
ctx.postMessage({ foo: "foo" });

// Respond to message from parent thread
ctx.addEventListener("message", (event) => console.log(event));
```


```javascript title="app.js"

import Worker = require("worker-loader!./Worker");

const worker = new Worker();

worker.postMessage({ a: 1 });
worker.onmessage = (event) => {};

worker.addEventListener("message", (event) => {});

```


### `Cross-Origin Policy`

[WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API "WebWorkers")受到[同源策略的](https://en.wikipedia.org/wiki/Same-origin_policy "同源策略的")限制，因此如果您的`webpack`资产没有与您的应用程序源自同一来源，则其下载可能会被您的浏览器阻止。如果您托管 CDN 域下的资产，通常会出现这种情况。即使从这里下载`webpack-dev-server`也可能被阻止。有两种解决方法

首先，您可以将工作人员内联为 blob，而不是通过`inline`参数将其作为外部脚本下载

```javascript title="App.js"
import Worker from './file.worker.js';
```


```javascript title="webpack.config.js"
{
  loader: 'worker-loader'
  options: { inline: true }
}
```


其次，您可以通过`publicPath`选项覆盖您的工作脚本的基本下载 URL

```javascript title="App.js"
// This will cause the worker to be downloaded from `/workers/file.worker.js`
import Worker from './file.worker.js';
```


```typescript title="webpack.config.js"
{
  loader: 'worker-loader'
  options: { publicPath: '/workers/' }
}
```
