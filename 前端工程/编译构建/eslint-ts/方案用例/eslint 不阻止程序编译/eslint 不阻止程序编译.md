# eslint 不阻止程序编译

[eslint-webpack-plugin](eslint-webpack-plugin.md "eslint-webpack-plugin")

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
