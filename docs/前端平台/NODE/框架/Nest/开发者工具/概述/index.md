# 概述

> **提示**本章介绍 Nest Devtools 与 Nest 框架的集成。如果你正在寻找 Devtools 应用，请访问 [开发者工具](https://devtools.nestjs.com/ "开发者工具") 网站。

要开始调试本地应用，请打开 `main.ts` 文件并确保在应用选项对象中将 `snapshot` 属性设置为 `true`，如下所示：

```typescript 
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  await app.listen(3000);
}
```


这将指示框架收集必要的元数据，让 Nest Devtools 可视化你的应用的图形。

接下来，让我们安装所需的依赖：

```bash 
npm i @nestjs/devtools-integration
```


> **警告**
> 如果你在应用中使用 `@nestjs/graphql` 软件包，请确保安装最新版本 (`npm i @nestjs/graphql@11`)。

有了这个依赖，让我们打开 `app.module.ts` 文件并导入我们刚刚安装的 `DevtoolsModule`：

```typescript 
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```


> **警告**
> 我们在这里检查 `NODE_ENV` 环境变量的原因是你永远不应该在生产中使用这个模块！

导入 `DevtoolsModule` 并且你的应用启动并运行 (`npm run start:dev`) 后，你应该能够导航到 [开发者工具](https://devtools.nestjs.com/ "开发者工具") URL 并查看内省图。

![](./image/image_Q3SWEb2Ar9.png)

> **提示**
> 正如你在上面的屏幕截图中看到的，每个模块都连接到 `InternalCoreModule`。`InternalCoreModule` 是一个全局模块，总是导入到根模块中。由于它已注册为全局节点，Nest 会自动在所有模块和 `InternalCoreModule` 节点之间创建边。现在，如果你想从图表中隐藏全局模块，你可以使用 "隐藏全局模块" 复选框（在边栏中）。

正如我们所看到的，`DevtoolsModule` 使你的应用公开了一个额外的 HTTP 服务器（在端口 8000 上），Devtools 应用将使用该服务器来检查你的应用。

只是为了仔细检查一切是否按预期工作，将图形视图更改为 "类"。你应该看到以下屏幕：

![](./image/image_7-IazhvENJ.png)

要关注特定节点，请单击矩形，图形将显示带有 "重点" 按钮的弹出窗口。你还可以使用搜索栏（位于边栏中）查找特定节点。

**提示**如果单击“检查”按钮，应用将带你进入 `/debug` 页面，并选择该特定节点。

更多见

[ NestJS 中文网 Nest 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。 它使用渐进式 JavaScript，使用 TypeScript 构建，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式反应式编程）的元素。 https://nest.nodejs.cn/devtools/overview](https://nest.nodejs.cn/devtools/overview " NestJS 中文网 Nest 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。 它使用渐进式 JavaScript，使用 TypeScript 构建，并结合了 OOP（面向对象编程）、FP（函数式编程）和 FRP（函数式反应式编程）的元素。 https://nest.nodejs.cn/devtools/overview")
