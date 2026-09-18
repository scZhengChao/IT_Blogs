# **在 TypeScript 中启用装饰器支持**

## 目录

- [TypeScript 编译器 CLI](#TypeScript-编译器-CLI)
- [tsconfig.json](#tsconfigjson)

目前，装饰器在 TypeScript 中仍然是一个实验性功能，因此，必须先启用它。在本节中，我们将了解如何在 TypeScript 中启用装饰器，具体取决于您使用 TypeScript 的方式。

## **TypeScript 编译器 CLI**

要在使用 TypeScript Compiler CLI (tsc) 时启用装饰器支持，唯一需要的额外步骤是传递一个附加标志 --experimentalDecorators：

```javascript 
tsc --experimentalDecorators

```


## **tsconfig.json**

在具有 tsconfig.json 文件的项目中工作时，要启用实验性装饰器，我们必须将实验性装饰器属性添加到 compilerOptions 对象：

```javascript 
{
  "compilerOptions": {
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  }
}

```


在 TypeScript Playground 中，装饰器默认启用。
