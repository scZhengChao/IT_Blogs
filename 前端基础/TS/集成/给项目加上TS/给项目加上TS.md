# 给项目加上TS

## 目录

- [代码初始化](#代码初始化)
  - [全局安装TypeScript：](#全局安装TypeScript)
  - [初始化配置文件：](#初始化配置文件)
  - [编译ts代码：](#编译ts代码)
- [配置TSLint](#配置TSLint)
  - [使用TSLint初始化配置文件：](#使用TSLint初始化配置文件)
  - [tslint.json](#tslintjson)
  - [tsconfig.json](#tsconfigjson)

# 代码初始化

#### **全局安装TypeScript：**

```typescript 
// npm
npm install -g typescript
// yarm
yarn global add typescript
// 查看版本
tsc -v
npm i typescript -D 当前项目安装

```


#### **初始化配置文件：**

```text 
tsc --init
```


执行之后，项目根目录会出现一个 tsconfig.json 文件，里面包含ts的配置项（可能因为版本不同而配置略有不同）。

```text 
{
  "compilerOptions": {
    "target": "es5",                        // 指定 ECMAScript 目标版本: 'ES5'
    "module": "commonjs",                   // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "moduleResolution": "node",             // 选择模块解析策略
    "experimentalDecorators": true,         // 启用实验性的ES装饰器
    "allowSyntheticDefaultImports": true,   // 允许从没有设置默认导出的模块中默认导入。
    "sourceMap": true,                      // 把 ts 文件编译成 js 文件的时候，同时生成对应的 map 文件
    "strict": true,                         // 启用所有严格类型检查选项
    "noImplicitAny": true,                  // 在表达式和声明上有隐含的 any类型时报错
    "alwaysStrict": true,                   // 以严格模式检查模块，并在每个文件里加入 'use strict'
    "declaration": true,                    // 生成相应的.d.ts文件
    "removeComments": true,                 // 删除编译后的所有的注释
    "noImplicitReturns": true,              // 不是函数的所有返回路径都有返回值时报错
    "importHelpers": true,                  // 从 tslib 导入辅助工具函数
    "lib": ["es6", "dom"],                  // 指定要包含在编译中的库文件
    "typeRoots": ["node_modules/@types"],
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [                              // 需要编译的ts文件 *表示文件匹配 **表示忽略文件的深度问题
    "./src/**/*.ts"
  ],  
  "exclude": [                // 不需要编译的ts文件
    "node_modules",
    "dist",
    "**/*.test.ts",
  ]
}

```


可以在**package.json**中加入script命令：

```text 
{
  "name": "ts-demo",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.ts",
  "scripts": {
    "build": "tsc",     // 执行编译
    "build:w": "tsc -w" // 监听变化
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "TypeScript ": "^4.1.2"
  }
}

```


#### **编译ts代码：**

```text 
tsc index.ts
```


# 配置TSLint

TSLint 是一个通过tslint.json进行配置的插件，在编写TypeScript代码时，可以对代码风格进行检查和提示。如果对代码风格有要求，就需要用到TSLint了。其使用步骤如下：**（1）在全局安装TSLint：**

```text 
npm install tslint -g
npm install tslint -D
npm install tslint-react
npm i tslint-config-prettier
```


#### **使用TSLint初始化配置文件：**

```text 
tslint -i

```


执行之后，项目根目录下多了一个tslint.json文件，这就是TSLint的配置文件了，它会根据这个文件对代码进行检查，生成的tslint.json文件有下面几个字段：

```text 
{
  "defaultSeverity": "error",
  "extends": [
    "tslint:recommended"
  ],
  "jsRules": {},
  "rules": {},
  "rulesDirectory": []
}

```


这些字段的含义如下；

- **defaultSeverity**：提醒级别，如果为error则会报错，如果为warning则会警告，如果设为off则关闭，那TSLint就关闭了；
- Ty
- **extends：** 可指定继承指定的预设配置规则；
- **jsRules：** 用来配置对.js和.jsx文件的校验，配置规则的方法和下面的rules一样；
- **rules：** TSLint检查代码的规则都是在这个里面进行配置，比如当我们不允许代码中使用eval方法时，就要在这里配置"no-eval": true；
- **rulesDirectory：** 可以指定规则配置文件，这里指定相对路径。

## tslint.json

```bash 
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "linterOptions": {
    "exclude": ["config/**/*.js", "node_modules/**/*.ts"]
  },
  "rules": {
    // import 排序
    "ordered-imports": false,
    // 禁止使用 console
    "no-console": false,
    // 对象内熟悉排序
    "object-literal-sort-keys": false,
    // 一个文件内可包含最大的类
    "max-classes-per-file": false,
    // 设置成员对象的访问权限 （public,private,protect)
    "member-access": false,
    // 不执行没有意义的函数
    "no-unused-expression": false,
    // if 后面必须有 {，除非是单行 if
    "curly": [true, "ignore-same-line"],
    // 命名规则
    "variable-name": false,
    // 类的命名规则
    "class-name": false,
    // 优先使用接口
    "interface-over-type-literal": false,
    // 指定类成员的排序规则
    "member-ordering": false,
    // 禁止在分支条件判断中有赋值操作
    "no-conditional-assignment": false,
    // 不允许子作用域与外层作用域声明同名变量
    "no-shadowed-variable": false,
    // 定义过的变量必须使用
    "no-unused-variable": true,
    // jsx 内使用箭头函数
    "jsx-no-lambda": false,
    // 布尔值属性必须填上
    "jsx-boolean-value": false,
    // 弃用
    "no-unused-variable": false
  }
}

```


## tsconfig.json

```json 
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "jsx": "preserve", // 指定 jsx 格式
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}

```
