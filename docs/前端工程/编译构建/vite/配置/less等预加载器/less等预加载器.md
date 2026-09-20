# less等预加载器

[ 功能 | Vite 官方中文文档 下一代前端工具链 https://cn.vite.dev/guide/features.html#css-pre-processors](https://cn.vite.dev/guide/features.html#css-pre-processors " 功能 | Vite 官方中文文档 下一代前端工具链 https://cn.vite.dev/guide/features.html#css-pre-processors")

话虽如此，但 Vite 也同时提供了对`.scss`，`.sass`，`.less`，`.styl`和`.stylus`文件的**内置支持**。**没有必要为它们安装特定的 Vite 插件**，但**必须安装相应的预处理器依赖：**

```css 
# .scss 和 .sass
npm add -D sass-embedded # 或 sass

# .less
npm add -D less

# .styl 和 .stylus
npm add -D stylus
```


如果使用的是单文件组件，可以通过`<style lang="sass">`（或其他预处理器）自动开启。

Vite 为 Sass 和 Less 改进了`@import`解析，以保证 Vite 别名也能被使用。另外，`url()`中的相对路径引用的，与根文件不同目录中的 Sass/Less 文件会自动变基以保证正确性。

由于 Stylus API 限制，`@import`别名和 URL 变基不支持 Stylus。

你还可以通过在文件扩展名前加上`.module`来结合使用 CSS modules 和预处理器，例如`style.module.scss`。
