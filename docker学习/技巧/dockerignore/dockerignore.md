# dockerignore

## 目录

- [dockerignore](#dockerignore)

# `dockerignore`

添加`.dockerignore`文件实现排除不需要传入上下文的文件，这和 .gitignore 是类似的行为。

这是没有添加`.dockerignore`的上下文的大小以及加载时间，虽然花费的时间并不多，但是本着极致优化的原则，将原本不需要的文件排除出上下文：

```text 
.github/
.husky/
.vscode/
bin/
node_modules/
docs/
scripts/
```
