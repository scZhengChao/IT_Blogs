# 懒加载/代码分割原理

## 目录

- [import() 原理](#import-原理)
- [React.lazy 原理](#Reactlazy-原理)

```react tsx 
import React, { Suspense } from 'react';
 
const OtherComponent = React.lazy(() => import('./OtherComponent'));
 
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```


如上代码中，通过 `import()` 、 `React.lazy` 和 `Suspense` 共同一起实现了 React 的[懒加载](https://so.csdn.net/so/search?q=懒加载\&spm=1001.2101.3001.7020 "懒加载")，也就是我们常说了运行时动态加载，即 OtherComponent 组件文件被拆分打包为一个新的包（bundle）文件，并且只会在 OtherComponent 组件渲染时，才会被下载到本地。

# import() 原理

[import()](https://github.com/tc39/proposal-dynamic-import "import()") 函数是由TS39提出的一种动态加载模块的规范实现 **，其返回是一个 promise。** 在浏览器宿主环境中一个 `import()` 的参考实现如下：

```react tsx 

function import(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const tempGlobal = "__tempModuleLoadingVariable" + Math.random().toString(32).substring(2);
    script.type = "module";
    script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m;`;
 
    script.onload = () => {
      resolve(window[tempGlobal]);
      delete window[tempGlobal];
      script.remove();
    };
 
    script.onerror = () => {
      reject(new Error("Failed to load module script with URL " + url));
      delete window[tempGlobal];
      script.remove();
    };
 
    document.documentElement.appendChild(script);
  });
}

```


**当 Webpack 解析到该 ****`import()`**** 语法时，会自动进行代码分割。**

# React.lazy 原理

以下 React 源码基于 16.8.0 版本

React.lazy 的源码实现如下：

```react tsx 
export function lazy<T, R>(ctor: () => Thenable<T, R>): LazyComponent<T> {
  let lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null,
  };
 
  return lazyType;
}
```
