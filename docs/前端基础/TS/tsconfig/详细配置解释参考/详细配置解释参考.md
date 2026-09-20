# 详细配置解释参考

## 目录

- [2.1 files](#21-files)
- [2.2 include](#22-include)
- [2.3 exclude](#23-exclude)
- [2.4 compileOnSave](#24-compileOnSave)
- [2.5 extends](#25-extends)

* tsconfig 的详细配置：[https://www.typescriptlang.org/tsconfig](https://www.typescriptlang.org/tsconfig "https://www.typescriptlang.org/tsconfig")
* tsconfig 的协议描述网址：[http://json.schemastore.org/tsconfig](http://json.schemastore.org/tsconfig "http://json.schemastore.org/tsconfig")

## 2.1 files

`files` 字段用于指明需要 tsc 编译的一个或多个 ts 文件，例如：

```typescript 
{
  "files": ["index.ts", "global.d.ts"],
}

```


当指定的文件或文件夹不存在时，会提示 ❌ 错误！

## 2.2 include

`include` 字段用于指明需要被 tsc 编译的文件或文件夹列表，例如：

```typescript 
{
  "include": [
    "src",
    "global.d.ts"
  ],
}
"include": ["src/**/*", "types/**/*.d.ts", "mock/**/*.ts"],

```


## 2.3 exclude

`exclude` 字段用于排除不需要 tsc 编译的文件或文件夹列表，例如：

```typescript 
{
  "exclude": ["test.ts", "src/test.ts"],
}
"exclude": ["dist", "node_modules"]

```


**注意：** `exclude` 字段中的声明只对 `include` 字段有排除效果，对 `files` 字段无影响，即与 `include` 字段中的值互斥。

如果 tsconfig.json 文件中 `files` 和 `include` 字段都不存在，则默认包含 tsconfig.json 文件所在目录及子目录的所有文件，且排除在 `exclude` 字段中声明的文件或文件夹。

## 2.4 compileOnSave

`compileOnSave` 是声明**是否需要在保存时候自动触发 tsc 编译的字段**，一般来说，我们的代码编译过程会通过 Rollup、Webpack 等打包构建工具，并且使用热更新，因此无需配置该项，保持缺省即可。

```typescript 
{
  "compileOnSave": false,
}
```


## 2.5 extends

`extends` 字段用于指明**继承已有的 tsconfig 配置规则文件。**

该字段可以说是非常有用了，因为我们的 tsconfig 配置其实各个项目之间大同小异，因此完全可以结合自己团队的情况，抽离一个基础且公共的 tsconfig 配置，并将其发包，然后作为 `extends` 字段的值来继承配置。

tsconfig 推荐默认配置可以参考官方的包：[https://www.npmjs.com/package/@tsconfig/recommended](https://www.npmjs.com/package/@tsconfig/recommended "https://www.npmjs.com/package/@tsconfig/recommended")

`@tsconfig/recommended` 的配置如下：

```typescript 
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Recommended"
}
```


例如继承一个发包后的 tsconfig 基础配置，并通过**显示声明编译的目标代码版本为 ****`ES2016`**** 来覆盖覆盖** `@tsconfig/recommended` 中对应配置项。

```typescript 
{
  "extends": "@tsconfig/recommended/tsconfig.json",
  "compilerOptions": {
    "target": "ES2016"
  }
}
```


作为一些实践经验，社区也提供了一些常见环境（例如：Nuxt、Vite、Node 等）**最佳实践后的基础配置，**

推荐参阅[https://github.com/tsconfig/bases/\[3\]](https://github.com/tsconfig/bases/\[3] "https://github.com/tsconfig/bases/\[3]")
