# 安装

## 目录

- [cli安装](#cli安装)
- [git安装](#git安装)
- [手动安装](#手动安装)

##### cli安装

开始之前，你可以使用 [Nest CLI](https://nestjs.bootcss.com/cli/overview.html "Nest CLI") 创建项目，也可以克隆一个 `starter project`（两者的结果是一样的）。

若要使用 `Nest CLI` 构建项目，请运行以下命令。这将创建一个新的项目目录，并使用核心的 Nest 文件和支撑模块填充该目录，从而为项目创建一个传统的基本结构。建议初学者使用 **`Nest CLI`**` `创建新项目。我们将 [第一步](https://nestjs.bootcss.com/first-steps.html "第一步") 章节中继续采用这种方法。

```typescript 
$ npm i -g @nestjs/cli
$ nest new project-name
```


##### git安装

或者，使用 **Git** 安装采用 TypeScript 开发的 starter 项目：

```typescript 
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```


打开浏览器并导航到 [http://localhost:3000/](http://localhost:3000/ "http://localhost:3000/") 地址。

若要安装基于 JavaScript 的 starter project，请在执行上面的命令时使用 `javascript-starter.git` 。

##### 手动安装

你还可以通过 **npm** （或 **yarn**）来安装的核心和支撑文件，从头开始手动创建一个新项目。当然，在这种情况下，你将自己担负起创建项目样板文件的工作。

```typescript 
npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```
