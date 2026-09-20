# TS支持

## 目录

- [Typescript](#Typescript)
  - [tsconfig.json](#tsconfigjson)

```typescript 
import typescript from 'rollup-plugin-typescript2';
export default [{
    plugins:[
        typescript()
    ]
}]

```


# Typescript

在本文中不讨论Typescript的具体用法，我们将学习如何将Typescript代码转为JavaScript。

如何将一个Typescript代码转义为JavaScript呢？Typescript本身提供了一个工具`typescript`，因此我们针对其来学习一番。

如何使用typescript呢？ 可以到官网[TypeScript使用说明文档](https://link.juejin.cn/?target=https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html "TypeScript使用说明文档")。

我们这里简单总结一下，在项目中使用Typescript，构建工具一般有以下几个步骤：

- `npm install typescript -D` 安装Typescript工具
- `npm install @babel/core -D` 结合babel对Typescript进行转义
- 配置文件`tsconfig.json`，配置一些Typescript编译功能
- `npm install eslint -D`，结合`eslint`对代码语法做检测
- 配置文件`eslint.json`，配置代码检测标准

## tsconfig.json

tsconfig.json一般是放到项目根目录，如果放到其他目录，需要修改对应地址， 配置文件主要几个部分：

- `compilerOptions` 编译时的一些配置内容
- `watchOptions` 当监听文件变化时候需要配置一些内容
- `include` 哪些文件需要编译，如：`"include": ["src/**/*", "tests/**/*"]`
- `exclude` 对某些文件进行忽略，不做编译，如：`"exclude": ["src/js/*"]`
- `extends` 继承其他配置文件，如：`"extends": ["./base.json"]`

目前我们主要使用的还是`compilerOptions`，里面主要的配置项有：

- `paths` 将部分路径进行缩写，比如：`"@App/*": ["src/*"]`，后续使用`@App`，就会解析成`src`
- `target` 代码转义哪个ES标准下，如：ES2017,ES2018,ES2019等
- `module` 代码模块化遵循哪个标准，如：ESNext，CommonJS等
- `strict` 是否使用严格模式检测代码质量
- `lib` 编译的有时候需要依赖一些全局变量，比如：Document对象，这个时候需要设置为`DOM`，或者使用`Map`对象，这个时候需要`ESNext`
- `declaration` 是否给每个文件都生成 声明文件`.d.ts`
- `noImplicitOverride` 设置后可以提醒继承类`override`同名方法时候，需要标注`override`关键字
- `noUnusedLocals` 不允许有未使用的变量
- `esModuleInterop` 可以修复由于ES规范和其他规范混合使用导致的引用错误
- `useUnknownInCatchVariables` 支持catch中error设置为Unknown类型
- `resolveJsonModule` 支持json文件引入为一个模块

对`Rollup`和`Typescript`都有一定了解后，接下来我们就来实战`Rollup`+`Typescript`工程化项目。

```json 
{
  "include": ["./src/*"],
  "compilerOptions": {
    "target": "ES2019",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "noImplicitOverride": true,
    "noUnusedLocals": false, 
    "resolveJsonModule": true,
    "useUnknownInCatchVariables": false,
    "strictPropertyInitialization":false,
    "typeRoots": ["./types", "./node_modules/@types"]
     "declaration":true, // 输出d.ts
     "noImplicitAny"：true，
  },
  exclude:[],
  "types": ["jest"]
}
```


详细见：[tsconfig.json  例子](<../../../../../../前端基础/TS/tsconfig/tsconfig.json  例子/index.md> "tsconfig.json  例子")
