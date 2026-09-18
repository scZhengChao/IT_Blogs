# Webpack 模块替换

## 目录

- [Webpack Plugin](#Webpack-Plugin)
- [NormalModuleFactory](#NormalModuleFactory)
- [模块替换](#模块替换)
  - [路径替换](#路径替换)
  - [内容替换](#内容替换)

之前对 Webpack 大部分还是只是停留在配置，对 Webpack 提供的 Hooks 使用比较少。Webpack 的 Hooks 主要是通过 Plugin 的形式来使用的，如果对 Webpack 提供的 Hooks 了解比较多的话，基本上可以为所欲为了。

比如我们今天要说的：模块替换。他大概可以这样子工作：

- `import 'a.ts'` 的时候，把它替换成 `import 'b.ts'`
- 或者引入 `a.ts` 的时候替换 `a.ts` 里面的部分代码

## Webpack Plugin

说起 Webpack 插件大家肯定不陌生，他是这样子定义的:

```typescript 
abstract class Plugin implements Tapable.Plugin {
  apply(compiler: Compiler): void;
}

```


可以看到他的要求其实非常简单，只需要你提供一个 `apply` 方法。然后在调用 `apply` 方法的时候会传递一个 compiler 对象，拿到这个 compiler 就可以做非常多的事情了

```typescript 
import { Plugin, Compiler } from "webpack";

class CustomWebpackPlugin implements Plugin {
  public apply(compiler: Compiler) {
    // ...
  }
}

const webpackConfig = {
  // ...
  plugins: [new CustomWebpackPlugin()],
};

```


或者你只需要提供一个包含 `apply` 方法的对象就行

```typescript 
const webpackConfig = {
  // ...
  plugins: [
    {
      apply: (compiler) => {
        // ...
      },
    },
  ],
};

```


## NormalModuleFactory

[**NormalModuleFactory**](https://link.zhihu.com/?target=https://github.com/webpack/webpack/blob/master/lib/NormalModuleFactory.js "NormalModuleFactory")用来创建一个`NormalModule`，他同样提供了挺多 Hooks 给我们使用，这里模块替换我们简单的使用 `beforeResolve` 和 `afterResolve` 两个就够用了，看名字就可以知道，一个是解析前，一个是解析后

那么如何拿到 NormalModuleFactory？很简单，通过 compiler 的 Hooks 就可以（更多 Compiler Hooks 点[这里](https://link.zhihu.com/?target=https://webpack.js.org/api/compiler-hooks/ "这里")）

```typescript 
{
  apply: (compiler) => {
    compiler.hooks.normalModuleFactory.tap(
      pluginName,
      (nmf: webpack.compilation.NormalModuleFactory) => {
        // beforeResolve
        nmf.hooks.beforeResolve.tap(
          // ...
        )

        // afterResolve
        nmf.hooks.afterResolve.tap(
          // ...
        )
      }
    );
  };
}

```


`beforeResolve` 的时候会得到这样子一个对象

```typescript 
{
  // 上下文，项目目录
  context: '/path/to/project',
  // 请求的文件
  request: './index.ts',
  // ...
}

```


`afterResolve` 后大概会返回这样子的一个对象

```typescript 
{
  context: '/path/to/project',
  // 解析后的请求 (loader!absolutePath)
  request: '/path/to/loader/index.js!/path/to/project/index.ts',
  // 解析后的绝对路径
  userRequest: '/path/to/project/index.ts',
  rawRequest: './index.ts',
  loaders: [
    {
      loader: '/path/to/project/loader/index.js',
      options: // ...
    }
  ],
  // 请求的目标文件
  resource: '/path/to/project/index.ts',
  // ...
}

```


这里面 `request`，`loaders` 和 webpack 配置的关系大概是这样子的

```typescript 
// webpack config
const config = {
  entry: 'index.ts',
  module: {
    rules: [
      {
        test: // ...,
        loaders: ['loader1', 'loader2']
      }
    ]
  }
}

// NormalModule
{
  // loader1!loader2!file
  request: '/path/to/loader1!/path/to/loader2!/path/to/index.ts',
  loaders: [
    {
      loader: 'loader1',
      options: undefined
    },
    {
      loader: 'loader2',
      options: undefined
    }
  ]
}
```


## 模块替换

根据上面 `beforeResolve` 和 `afterResolve` 两个 Hooks 得到的对象我们大概就能知道怎么去进行模块替换了

### 路径替换

进行路径替换的话我们知道 `beforeResolve` 拿到的对象里面有个 `request` 字段，这个字段表示要请求文件的地址

那么我们把 `request` 的值修改一下就可以做到路径替换

```typescript 
{
  apply(compiler: webpack.Compiler) {
    compiler.hooks.normalModuleFactory.tap(
      pluginName,
      (nmf: webpack.compilation.NormalModuleFactory) => {
        nmf.hooks.beforeResolve.tap(pluginName, mod => {
          const isMatched = // 判断路径是否需要替换
          if (isMatched) {
            // 将请求重定向到新文件
            mod.request = newResource;
          }
        });
      }
  );
}

```


那么如果在 `afterResolve` 里面修改 `request` 可以做到路径替换吗？

答案是不行的，因为 `afterResolve` 的时候已经拿到了目标文件路径 `resource`，接下去的解析会使用 `resource` 而不是 `request`

嗯....那我在 `afterResolve` 里面修改 `resource` 不是也可以吗

```typescript 
nmf.hooks.afterResolve.tap(pluginName, mod => {
  const isMatched = // 判断路径是否需要替换
  if (isMatched) {
    // 将请求重定向到新文件
     mod.resource = newResource;
  }
});

```


### 内容替换

路径替换会将整个文件都替换的，我们也并没有在 `afterResolve` 里面看到任何文件解析后的内容，那么该如何进行内容替换？

虽然并没有跟内容相关的字段，但是我们看到了 `loaders` 这个字段。我们知道 webpack 依赖于 loader 来进行文件解析，比如解析 ES6 语法我们需要配置 `babel-loader`，解析 `ts` 文件我们用到了 `ts-loader` 或者其他 loader

知道了这个就简单了，我们给他加一个 loader 就好了

那么我们简单写个 webpack loader 见所有内容都替换成 console.log('replacement')

```typescript 
// loader.js
function customLoader(sourceCode) {
  return `console.log('replacement')`;
}

```


就这样，一个简单的 loader 就完成了，`sourceCode` 参数是用户[源代码](https://zhida.zhihu.com/search?content_id=125181932\&content_type=Article\&match_order=1\&q=源代码\&zhida_source=entity "源代码")或者是上一个 loader 处理后返回的结果

配置了数组的 loaders 的话，**loaders 的执行顺序是从下往上的**，有配置过解析 css 的同学应该比较清楚

```typescript 
const config = {
  module: {
    rules: [
      {
        test: /\.s?(c|a)ss$/,
        // 从下往上执行，依次是 sass-loader -> css-loader -> style-loader
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
```


所以我们可以把自定义的 loader 放在最后一个，或者直接将整个 loaders 换掉

```typescript 
nmf.hooks.afterResolve.tap(pluginName, mod => {
  mod.loaders = [
    {
      loader: path.resolve(__dirname, './loader.js'),
      // 可以传递个 options
      options: // ...
    }
  ]

```


这样子我们就完成了一个简单的内容替换
