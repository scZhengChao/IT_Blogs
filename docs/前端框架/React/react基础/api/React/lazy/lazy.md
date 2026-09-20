# lazy

## 目录

- [lazy](#lazy)

# lazy

React.lazy() 允许你定义一个**动态加载的组件。这有助于缩减 bundle 的体积，** 并延迟加载在初次渲染时未用到的组件。

```vue 
 // 这个组件是动态加载的
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```


请注意，渲染\*\* lazy组件依赖该组件渲染树上层的 \<React.Suspense>组件\*\*。这是指定加载指示器（loading indicator）的方式。

注意 : 使用 React.lazy 的动态引入特性需要 JS 环境支持 Promise。在 IE11 及以下版本的浏览器中需要通过引入 polyfill 来使用该特性。&#x20;
