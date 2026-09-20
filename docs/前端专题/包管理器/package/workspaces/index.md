# workspaces

## 目录

- [npm](#npm)
- [pnpm](#pnpm)

在项目过大的时候，最近越来越流行`monorepo`。

提到monorepo就绕不看workspaces，早期我们会用yarn workspaces，现在npm官方也支持了workspaces.    

### npm

 **workspaces解决了本地文件系统中如何在一个顶层root package下管理多个子packages的问题**，**在workspaces声明目录下的package会软链到最上层root package的node\_modules中。**

### pnpm

**pnpm对于子packages的处理稍有不同，子项目会将依赖的其它子项目添加到自己的node\_modules路径下。**

[packages](./packages/index.md "packages")
