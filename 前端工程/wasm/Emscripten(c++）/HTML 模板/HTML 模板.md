# HTML 模板

为了方便大家调试，emscripten 还很贴心地提供了额外生成 index.html 的方式，并会引用上编译出来的 js 文件。

我们需要不上`-o <文件名>.html`指定输出的 html。

```bash 
emcc hello.c  -o hello.html

```


会生成`hello.html`、`hello.js`和`hello.wasm`三个文件。

打开 hello.html，我们可以看到一个界面，中间是一个 Canvas，显示 wasm 的渲染结果。下面则是控制台的输出。

![](image_ymPeP1DjKJ.png)
