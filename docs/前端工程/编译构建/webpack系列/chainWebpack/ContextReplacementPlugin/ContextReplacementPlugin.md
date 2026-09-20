# ContextReplacementPlugin

## 目录

- [Usage](#Usage)
- [Content Callback](#Content-Callback)
- [Other Options](#Other-Options)
- [chainWebpack](#chainWebpack)

[ ContextReplacementPlugin | webpack 中文文档 webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换、打包或包裹任何资源。 https://webpack.docschina.org/plugins/context-replacement-plugin/](https://webpack.docschina.org/plugins/context-replacement-plugin/ " ContextReplacementPlugin | webpack 中文文档 webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换、打包或包裹任何资源。 https://webpack.docschina.org/plugins/context-replacement-plugin/")

上下文引用带有表达式的require，例如`require（'./locale/'+name+'.json'）`。

当遇到这样的表达式时，`webpack`会推断目录`（'./locale/'）`和正则表达式`（/^.*\.json$/）`。由于在编译时名称未知，因此`webpack`将每个文件都作为模块包含在捆绑包中。

`ContextReplacementPlugin`允许您覆盖推断的信息。有多种方法可以配置插件：

## Usage

```javascript 
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentResource?: string,
  newContentRecursive?: boolean,
  newContentRegExp?: RegExp
)
```


如果资源（目录）与resourceRegExp匹配，则插件将默认资源、递归标志或生成的正则表达式分别替换为newContentResource、newContentRecursive或newContextRegExp。如果newContentResource是相对的，则它是相对于上一个资源解析的。
下面是一个限制模块使用的小示例：

```javascript 
new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de|fr|hu/);

```


moment/locate上下文仅限于与/de|fr|hu/匹配的文件。因此，只包括这些区域设置（有关更多信息，请参阅本期）。

## Content Callback

```javascript 
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentCallback: (data) => void
);

```


`newContentCallback`函数被赋予`ContextModuleFactory`的数据对象，并且应该覆盖所提供对象的请求属性。使用此回调，我们可以动态地将请求重定向到新位置：

```javascript 
new webpack.ContextReplacementPlugin(/^\.\/locale$/, (context) => {
  if (!/\/moment\//.test(context.context)) return;

  Object.assign(context, {
    regExp: /^\.\/\w+/,
    request: '../../locale', // resolved relatively
  });
});
```


## Other Options

`newContentResource`和`newContentCreateContextMap`参数也可用：

```javascript 
new webpack.ContextReplacementPlugin(
  resourceRegExp: RegExp,
  newContentResource: string,
  newContentCreateContextMap: object // mapping runtime-request (userRequest) to compile-time-request (request)
);

```


这两个参数可以一起使用，以更有针对性的方式重定向请求。newContentCreateContextMap允许您将运行时请求映射为对象形式的编译请求：

```javascript 
new ContextReplacementPlugin(/selector/, './folder', {
  './request': './request',
  './other-request': './new-request',
});

```


# chainWebpack

```javascript 
config.plugin("replace")
.use(require(require('webpack').ContextReplacementPlugin)
.tap(()=>{
  return [/moment[/\\]locale$/,/zh-cn/]
})
```
