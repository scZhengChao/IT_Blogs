# 给所有的async函数添加try/catch

## 目录

- [babel插件开发](#babel插件开发)
  - [插件的基本格式示例](#插件的基本格式示例)
  - [寻找await节点](#寻找await节点)
  - [向上查找 async 函数](#向上查找-async-函数)
  - [利用babel-template生成try/catch节点](#利用babel-template生成trycatch节点)
  - [async函数体替换成try语句](#async函数体替换成try语句)
  - [若函数已存在try/catch，则不处理](#若函数已存在trycatch则不处理)
  - [添加报错信息](#添加报错信息)
  - [添加用户选项](#添加用户选项)
  - [最终代码](#最终代码)

## babel插件开发

![](./image/image_eferabxeMK.png)

### 插件的基本格式示例

```typescript 
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       // 设置需要范围的节点类型
       CallExression: (path, state) => { 
         do soming ……
       }
     }
   }
 }
```


1）通过 `babel` 拿到 `types` 对象，操作 AST 节点，比如创建、校验、转变等

2）`visitor`：定义了一个访问者，可以设置需要访问的节点类型，当访问到目标节点后，做相应的处理来实现插件的功能

### 寻找await节点

回到业务需求，现在需要找到await节点，可以通过`AwaitExpression`表达式获取

```typescript 
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       // 设置AwaitExpression
       AwaitExpression(path) {
         // 获取当前的await节点
         let node = path.node;
       }
     }
   }
 }
```


### 向上查找 async 函数

通过`findParent`方法，在父节点中搜寻 async 节点

```typescript 
// async节点的属性为true
const asyncPath = path.findParent(p => p.node.async)
```


async 节点的AST结构

**这里要注意，async 函数分为4种情况：函数声明 、箭头函数 、函数表达式 、函数为对象的方法**

```typescript 
// 1️⃣：函数声明
async function fn() {
  await f()
}

// 2️⃣：函数表达式
const fn = async function () {
  await f()
};

// 3️⃣：箭头函数
const fn = async () => {
  await f()
};

// 4️⃣：async函数定义在对象中
const obj = {
  async fn() {
      await f()
  }
}

```


需要对这几种情况进行分别判断

```typescript 
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       // 设置AwaitExpression
       AwaitExpression(path) {
         // 获取当前的await节点
         let node = path.node;
         // 查找async函数的节点
         const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));
       }
     }
   }
 }
```


### 利用babel-template生成try/catch节点

[babel-template](https://link.juejin.cn/?target=https://babel.docschina.org/docs/en/babel-template/ "babel-template")可以用以字符串形式的代码来构建AST树节点，快速优雅开发插件

```typescript 
// 引入babel-template
const template = require('babel-template');

// 定义try/catch语句模板
let tryTemplate = `
try {
} catch (e) {
console.log(CatchError：e)
}`;

// 创建模板
const temp = template(tryTemplate);

// 给模版增加key，添加console.log打印信息
let tempArgumentObj = {
   // 通过types.stringLiteral创建字符串字面量
   CatchError: types.stringLiteral('Error')
};

// 通过temp创建try语句的AST节点
let tryNode = temp(tempArgumentObj);
```


### async函数体替换成try语句

```typescript 
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       AwaitExpression(path) {
         let node = path.node;
         const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));
         
         let tryNode = temp(tempArgumentObj);
         
         // 获取父节点的函数体body
         let info = asyncPath.node.body;

         // 将函数体放到try语句的body中
         tryNode.block.body.push(...info.body);

         // 将父节点的body替换成新创建的try语句
         info.body = [tryNode];
       }
     }
   }
 }
```


到这里，插件的基本结构已经成型，但还有点问题，如果函数已存在try/catch，该怎么处理判断呢？

### 若函数已存在try/catch，则不处理

```typescript 
// 示例代码，不再添加try/catch
async function fn() {
    try {
        await f()
    } catch (e) {
        console.log(e)
    }
}
```


通过`isTryStatement`判断是否已存在try语句

```typescript 
module.exports = function (babel) {
   let t = babel.type
   return { 
     visitor: {
       AwaitExpression(path) {
       
        // 判断父路径中是否已存在try语句，若存在直接返回
        if (path.findParent((p) => p.isTryStatement())) {
          return false;
        }
       
         let node = path.node;
         const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));
         let tryNode = temp(tempArgumentObj);
         let info = asyncPath.node.body;
         tryNode.block.body.push(...info.body);
         info.body = [tryNode];
       }
     }
   }
 }
```


### 添加报错信息

获取报错时的文件路径 `filePath` 和方法名称 `funcName`，方便快速定位问题

**获取文件路径**

```typescript 
// 获取编译目标文件的路径，如：E:\myapp\src\App.vue
const filePath = this.filename || this.file.opts.filename || 'unknown';
```


获取报错的方法名称

```typescript 
// 定义方法名
let asyncName = '';

// 获取async节点的type类型
let type = asyncPath.node.type;

switch (type) {
// 1️⃣函数表达式
// 情况1：普通函数，如const func = async function () {}
// 情况2：箭头函数，如const func = async () => {}
case 'FunctionExpression':
case 'ArrowFunctionExpression':
  // 使用path.getSibling(index)来获得同级的id路径
  let identifier = asyncPath.getSibling('id');
  // 获取func方法名
  asyncName = identifier && identifier.node ? identifier.node.name : '';
  break;

// 2️⃣函数声明，如async function fn2() {}
case 'FunctionDeclaration':
  asyncName = (asyncPath.node.id && asyncPath.node.id.name) || '';
  break;

// 3️⃣async函数作为对象的方法，如vue项目中，在methods中定义的方法: methods: { async func() {} }
case 'ObjectMethod':
  asyncName = asyncPath.node.key.name || '';
  break;
}

// 若asyncName不存在，通过argument.callee获取当前执行函数的name
let funcName = asyncName || (node.argument.callee && node.argument.callee.name) || '';
```


### 添加用户选项

用户引入插件时，可以设置`exclude`、`include`、 `customLog`选项

`exclude`： 设置需要排除的文件，不对该文件进行处理

`include`： 设置需要处理的文件，只对该文件进行处理

`customLog`： 用户自定义的打印信息

### 最终代码

**入口文件index.js**

```typescript 
// babel-template 用于将字符串形式的代码来构建AST树节点
const template = require('babel-template');

const { tryTemplate, catchConsole, mergeOptions, matchesFile } = require('./util');

module.exports = function (babel) {
  // 通过babel 拿到 types 对象，操作 AST 节点，比如创建、校验、转变等
  let types = babel.types;

  // visitor：插件核心对象，定义了插件的工作流程，属于访问者模式
  const visitor = {
    AwaitExpression(path) {
      // 通过this.opts 获取用户的配置
      if (this.opts && !typeof this.opts === 'object') {
        return console.error('[babel-plugin-await-add-trycatch]: options need to be an object.');
      }

      // 判断父路径中是否已存在try语句，若存在直接返回
      if (path.findParent((p) => p.isTryStatement())) {
        return false;
      }

      // 合并插件的选项
      const options = mergeOptions(this.opts);

      // 获取编译目标文件的路径，如：E:\myapp\src\App.vue
      const filePath = this.filename || this.file.opts.filename || 'unknown';

      // 在排除列表的文件不编译
      if (matchesFile(options.exclude, filePath)) {
        return;
      }

      // 如果设置了include，只编译include中的文件
      if (options.include.length && !matchesFile(options.include, filePath)) {
        return;
      }

      // 获取当前的await节点
      let node = path.node;

      // 在父路径节点中查找声明 async 函数的节点
      // async 函数分为4种情况：函数声明 || 箭头函数 || 函数表达式 || 对象的方法
      const asyncPath = path.findParent((p) => p.node.async && (p.isFunctionDeclaration() || p.isArrowFunctionExpression() || p.isFunctionExpression() || p.isObjectMethod()));

      // 获取async的方法名
      let asyncName = '';

      let type = asyncPath.node.type;

      switch (type) {
        // 1️⃣函数表达式
        // 情况1：普通函数，如const func = async function () {}
        // 情况2：箭头函数，如const func = async () => {}
        case 'FunctionExpression':
        case 'ArrowFunctionExpression':
          // 使用path.getSibling(index)来获得同级的id路径
          let identifier = asyncPath.getSibling('id');
          // 获取func方法名
          asyncName = identifier && identifier.node ? identifier.node.name : '';
          break;

        // 2️⃣函数声明，如async function fn2() {}
        case 'FunctionDeclaration':
          asyncName = (asyncPath.node.id && asyncPath.node.id.name) || '';
          break;

        // 3️⃣async函数作为对象的方法，如vue项目中，在methods中定义的方法: methods: { async func() {} }
        case 'ObjectMethod':
          asyncName = asyncPath.node.key.name || '';
          break;
      }

      // 若asyncName不存在，通过argument.callee获取当前执行函数的name
      let funcName = asyncName || (node.argument.callee && node.argument.callee.name) || '';

      const temp = template(tryTemplate);

      // 给模版增加key，添加console.log打印信息
      let tempArgumentObj = {
        // 通过types.stringLiteral创建字符串字面量
        CatchError: types.stringLiteral(catchConsole(filePath, funcName, options.customLog))
      };

      // 通过temp创建try语句
      let tryNode = temp(tempArgumentObj);

      // 获取async节点(父节点)的函数体
      let info = asyncPath.node.body;

      // 将父节点原来的函数体放到try语句中
      tryNode.block.body.push(...info.body);

      // 将父节点的内容替换成新创建的try语句
      info.body = [tryNode];
    }
  };
  return {
    name: 'babel-plugin-await-add-trycatch',
    visitor
  };
};

```


**util.js**

```typescript 
const merge = require('deepmerge');

// 定义try语句模板
let tryTemplate = `
try {
} catch (e) {
console.log(CatchError,e)
}`;

/*
 * catch要打印的信息
 * @param {string} filePath - 当前执行文件的路径
 * @param {string} funcName - 当前执行方法的名称
 * @param {string} customLog - 用户自定义的打印信息
 */
let catchConsole = (filePath, funcName, customLog) => `
filePath: ${filePath}
funcName: ${funcName}
${customLog}:`;

// 默认配置
const defaultOptions = {
  customLog: 'Error',
  exclude: ['node_modules'],
  include: []
};

// 判断执行的file文件 是否在 exclude/include 选项内
function matchesFile(list, filename) {
  return list.find((name) => name && filename.includes(name));
}

// 合并选项
function mergeOptions(options) {
  let { exclude, include } = options;
  if (exclude) options.exclude = toArray(exclude);
  if (include) options.include = toArray(include);
  // 使用merge进行合并
  return merge.all([defaultOptions, options]);
}

function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

module.exports = {
  tryTemplate,
  catchConsole,
  defaultOptions,
  mergeOptions,
  matchesFile,
  toArray
};

```
