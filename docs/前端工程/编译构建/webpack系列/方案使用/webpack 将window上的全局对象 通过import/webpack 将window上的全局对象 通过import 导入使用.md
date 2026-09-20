# webpack 将window上的全局对象 通过import 导入使用

## 目录

- [方法一：使用ProvidePlugin](#方法一使用ProvidePlugin)
  - [步骤](#步骤)
  - [示例代码](#示例代码)
- [方法二：创建封装模块](#方法二创建封装模块)
  - [步骤](#步骤)
  - [示例代码](#示例代码)
- [方法三：使用externals配置](#方法三使用externals配置)
  - [步骤](#步骤)
  - [示例代码](#示例代码)

在 Webpack 构建的项目里，你可以借助特定的配置，把`window`上的全局对象通过`import`语句来导入使用。以下是几种常见的实现方法：

### 方法一：使用`ProvidePlugin`

`ProvidePlugin`是 Webpack 内置的一个插件，它能够在模块中自动加载某些模块，而无需显式地使用`import`或`require`语句。你可以利用这个插件将`window`上的全局对象映射为模块中的变量。

#### 步骤

1. **安装依赖**：确保 Webpack 和相关的工具已经安装好。
2. **配置 Webpack**：在`webpack.config.js`中配置`ProvidePlugin`。
3. **在代码中使用**：直接在代码里使用映射后的变量。

#### 示例代码

```javascript title="webpack.config.js"
const webpack = require('webpack');

module.exports = {
  // 其他配置...
  plugins: [
    new webpack.ProvidePlugin({
      // 将 window.myGlobalObject 映射为 myGlobalObject 变量
      myGlobalObject: ['window', 'myGlobalObject']
    })
  ]
};
```


使用示例（在 React 组件中）

```javascript 
import React from 'react';

const MyComponent = () => {
  // 直接使用 myGlobalObject 变量
  if (myGlobalObject) {
    const result = myGlobalObject.someMethod();
    return <div>{result}</div>;
  }
  return <div>myGlobalObject 未找到</div>;
};

export default MyComponent;
```


### 方法二：创建封装模块

可以创建一个模块来导出`window`上的全局对象，然后在其他地方通过`import`语句导入该模块。

#### 步骤

1. **创建封装模块**：创建一个文件来导出`window`上的全局对象。
2. **在代码中导入使用**：在需要使用的地方通过`import`导入封装模块。

#### 示例代码

```javascript title="globalObject.js"
// 导出 window 上的全局对象
export const myGlobalObject = window.myGlobalObject;
```


**使用示例（在 React 组件中）**

```javascript 
import React from 'react';
import { myGlobalObject } from './globalObject';

const MyComponent = () => {
  if (myGlobalObject) {
    const result = myGlobalObject.someMethod();
    return <div>{result}</div>;
  }
  return <div>myGlobalObject 未找到</div>;
};

export default MyComponent;
```


### 方法三：使用`externals`配置

`externals`配置项可以让你在打包时排除某些模块，而是依赖外部的全局变量。这样可以将`window`上的全局对象作为外部依赖来处理。

#### 步骤

1. **配置 Webpack**：在`webpack.config.js`中配置`externals`。
2. **在代码中使用**：直接使用全局对象。

#### 示例代码

**webpack.config.js**

收起

```javascript 
module.exports = {
  // 其他配置...
  externals: {
    // 将 myGlobalObject 作为外部依赖
    myGlobalObject: 'myGlobalObject'
  }
};
```


**使用示例（在 React 组件中）**

```javascript 
import React from 'react';
// 直接导入 myGlobalObject，实际上它是 window 上的全局对象
import myGlobalObject from 'myGlobalObject';

const MyComponent = () => {
  if (myGlobalObject) {
    const result = myGlobalObject.someMethod();
    return <div>{result}</div>;
  }
  return <div>myGlobalObject 未找到</div>;
};

export default MyComponent;
```


通过以上方法，你就可以在 Webpack 项目中使用`import`语句来导入`window`上的全局对象了。

在`umi`中

然后，在`.umirc.ts`或者`config/config.ts`中配置`externals`：

```typescript 
import { defineConfig } from 'umi';

export default defineConfig({
  externals: {
    // 将 lodash 排除在打包之外，使用全局变量 _ 替代
    lodash: '_'
  },
});
```
