# 路径相关

## 目录

- [base](#base)
- [publicPath](#publicPath)

## base

- 类型：`string`
- 默认值：`/`

要在非根目录下部署 umi 项目时，你可以使用 base 配置。

base 配置允许你为应用程序设置路由前缀。比如有路由 `/` 和 `/users`，设置 base 为 `/foo/` 后就可通过 `/foo/` 和 `/foo/users` 访问到之前的路由。

> 注意：base 配置必须在构建时设置，并且不能在不重新构建的情况下更改，因为该值内联在客户端包中。

## publicPath

- 类型：`string`
- 默认值：`/`

&#x20;配置 webpack 的 `publicPath`。当打包的时候，webpack 会在**静态文件路径前面添加** `publicPath` 的值，当你需要**修改静态文件地址时**，比如使用 CDN 部署，把 `publicPath` 的值设为\*\* CDN 的值\*\*就可以。如果使用一些特殊的文件系统，比如混合开发或者 cordova 等技术，可以尝试将 `publicPath` 设置成 `./` 相对路径。 &#x20;

如果你的应用部署在**域名的子路径**上，例如 `https://www.tiven.cn/admin/ ，你需要设置`publicPath`为`/admin/\`
