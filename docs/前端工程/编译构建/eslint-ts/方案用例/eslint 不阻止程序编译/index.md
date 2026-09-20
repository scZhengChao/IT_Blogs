# eslint 不阻止程序编译

[eslint-webpack-plugin](../../../webpack系列/chainWebpack/eslint-webpack-plugin/index.md "eslint-webpack-plugin")

```typescript 
chainWebpack(config) {
  config.plugin('eslint-webpack-plugin').use(
    new ESLintPlugin({
      failOnError:false,
      failOnWarning:false,
    }),
  );
}
```
