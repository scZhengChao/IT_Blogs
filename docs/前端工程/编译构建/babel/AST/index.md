# AST

## 目录

- [什么是AST ？](#什么是AST-)
  - [babel的核心：AST](#babel的核心AST)
    - [词法分析](#词法分析)
    - [语法分析](#语法分析)
  - [常用的 AST 节点类型对照表](#常用的-AST-节点类型对照表)
  - [await节点对应的AST结构](#await节点对应的AST结构)

# **什么是AST ？**

`AST`是源代码的抽象语法结构的树状表现形式

**在js世界中，可以认为**\*\*`抽象语法树(AST)是最底层`\*\*

## babel的核心：AST

AST是代码的树形结构，生成 AST 分为两个阶段：[**词法分析**](https://link.juejin.cn/?target=https://en.wikipedia.org/wiki/Lexical_analysis "词法分析")和 [**语法分析**](https://link.juejin.cn/?target=https://en.wikipedia.org/wiki/Parsing "语法分析")

### **词法分析**

词法分析阶段把字符串形式的代码转换为**令牌（tokens）** ，可以把tokens看作是一个扁平的语法片段数组，描述了代码片段在整个代码中的位置和记录当前值的一些信息

比如`let a = 1`，对应的AST是这样的

![](./image/image_dLZp1dMwO0.png)

### **语法分析**

语法分析阶段会把token转换成 AST 的形式，这个阶段会使用token中的信息把它们转换成一个 AST 的表述结构，使用type属性记录当前的类型

例如 let 代表着一个变量声明的关键字，所以它的 type 为 `VariableDeclaration`，而 a = 1 会作为 let 的声明描述，它的 type 为`VariableDeclarator`

**AST在线查看工具：**[**AST explorer**](https://link.juejin.cn?target=https://astexplorer.net/ "AST explorer")

**再举个🌰，加深对AST的理解**

```typescript 
function demo(n) {
  return n * n;
}


```


转化成AST的结构

```typescript 
{
  "type": "Program", // 整段代码的主体
  "body": [
    {
      "type": "FunctionDeclaration", // function 的类型叫函数声明；
      "id": { // id 为函数声明的 id
        "type": "Identifier", // 标识符 类型
        "name": "demo" // 标识符 具有名字 
      },
      "expression": false,
      "generator": false,
      "async": false, // 代表是否 是 async function
      "params": [ // 同级 函数的参数 
        {
          "type": "Identifier",// 参数类型也是 Identifier
          "name": "n"
        }
      ],
      "body": { // 函数体内容 整个格式呈现一种树的格式
        "type": "BlockStatement", // 整个函数体内容 为一个块状代码块类型
        "body": [
          {
            "type": "ReturnStatement", // return 类型
            "argument": {
              "type": "BinaryExpression",// BinaryExpression 二进制表达式类型
              "start": 30,
              "end": 35,
              "left": { // 分左 右 中 结构
                "type": "Identifier", 
                "name": "n"
              },
              "operator": "*", // 属于操作符
              "right": {
                "type": "Identifier",
                "name": "n"
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```


## 常用的 AST 节点类型对照表

| 类型原名称                     | 中文名称      | 描述                                         |
| ------------------------- | --------- | ------------------------------------------ |
| Program                   | 程序主体      | 整段代码的主体                                    |
| VariableDeclaration       | 变量声明      | 声明一个变量，例如 var let const                    |
| `FunctionDeclaration`     | 函数声明      | 声明一个函数，例如 function                         |
| ExpressionStatement       | 表达式语句     | 通常是调用一个函数，例如 console.log()                 |
| BlockStatement            | 块语句       | 包裹在 {} 块内的代码，例如 if (condition){var a = 1;} |
| BreakStatement            | 中断语句      | 通常指 break                                  |
| ContinueStatement         | 持续语句      | 通常指 continue                               |
| ReturnStatement           | 返回语句      | 通常指 return                                 |
| SwitchStatement           | Switch 语句 | 通常指 Switch Case 语句中的 Switch                |
| IfStatement               | If 控制流语句  | 控制流语句，通常指 if(condition){}else{}            |
| Identifier                | 标识符       | 标识，例如声明变量时 var identi = 5 中的 identi        |
| CallExpression            | 调用表达式     | 通常指调用一个函数，例如 console.log()                 |
| BinaryExpression          | 二进制表达式    | 通常指运算，例如 1+2                               |
| MemberExpression          | 成员表达式     | 通常指调用对象的成员，例如 console 对象的 log 成员           |
| ArrayExpression           | 数组表达式     | 通常指一个数组，例如 \[1, 3, 5]                      |
| `FunctionExpression`      | 函数表达式     | 例如const func = function () {}              |
| `ArrowFunctionExpression` | 箭头函数表达式   | 例如const func = ()=> {}                     |
| `AwaitExpression`         | await表达式  | 例如let val = await f()                      |
| `ObjectMethod`            | 对象中定义的方法  | 例如 let obj = { fn () {} }                  |
| NewExpression             | New 表达式   | 通常指使用 New 关键词                              |
| AssignmentExpression      | 赋值表达式     | 通常指将函数的返回值赋值给变量                            |
| UpdateExpression          | 更新表达式     | 通常指更新成员值，例如 i++                            |
| Literal                   | 字面量       | 字面量                                        |
| BooleanLiteral            | 布尔型字面量    | 布尔值，例如 true false                          |
| NumericLiteral            | 数字型字面量    | 数字，例如 100                                  |
| StringLiteral             | 字符型字面量    | 字符串，例如 vansenb                             |
| SwitchCase                | Case 语句   | 通常指 Switch 语句中的 Case                       |

## await节点对应的AST结构

1）原始代码

```typescript 
async function fn() {
  await f()
}
```


对应的AST结构

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/334884dd289b4a85ab9584465e459135~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

2）增加try catch后的代码

```typescript 
async function fn() {
    try {
        await f()
    } catch (e) {
        console.log(e)
    }
}
```


对应的AST结构

![](./image/image_4TyVfoxaBL.png)

**通过AST结构对比，插件的核心就是将原始函数的body放到try语句中**

[AST 会成为你的武器](<./AST 会成为你的武器/index.md> "AST 会成为你的武器")

[type对照表](./type对照表/index.md "type对照表")
