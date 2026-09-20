# module

`module` 字段指明 tsc **编译后的代码应该符合何种“模块化方案**”，可以指定的枚举值有：`none`, `commonjs`, `amd`, `system`, `umd`, `es2015`, `es2020`, 或 `ESNext`，默认值为 `none`。

&#x20;      在如今的前端开发趋势来讲，主要是使用 ESM、CommonJS、UMD、IIFE 四种模块化方案，未来会趋向于 ESM，当然我们会根据项目的应用场景来决定使用何种模块化方案，例如：NodeJS 使用 CommonJS，浏览器里可以使用 ESM，不过现在的打包工具，会自动处理 CommonJS 和 ESM 的差异，并包装成符合指定模块化规范的代码，

在 tsconfig.json 可以设置 `allowSyntheticDefaultImports` 字段为 `true`，来允许合成默认导入。

[esModuleInterop](./esModuleInterop/index.md "esModuleInterop")

[allowSyntheticDefaultImports ](./allowSyntheticDefaultImports/index.md "allowSyntheticDefaultImports ")
