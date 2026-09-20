# 模块导出

模块可以**导出他们的内部提供者**。 而且，他们可以**再导出自己导入的模块**。

```typescript 
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}

```
