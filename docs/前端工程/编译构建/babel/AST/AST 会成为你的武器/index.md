# AST 会成为你的武器

## 目录

- [AST 是什么](#AST-是什么)

不知道大家有没有和我一样的经历，总是从同事的嘴里、掘金的文章里、各类面试题里听说这个东西：**AST** 。

对于这个所谓抽象语法树，我曾经一向认为了解即可，学他有什么用，难道我还能去真做一个什么牛逼的编译器之类的，所以一直不屑一顾。

直到老大说：**来，你来写几个 eslint 规则，处理掉项目中这些不统一的标准，不然太难看了。**

我当时的想法：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/642ae629e7e44efe8a2034e48f2f6e18~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=898\&h=526\&s=612622\&e=png\&b=3e4e60)

虽说如此，但老大发话了，就不能不干。在大佬指点下，我需要从 **AST** 入手，来试试这 *看了就忘看了就忘* 的 AST 到底好不好用吧。

# AST 是什么

要理解 AST 是什么，最好的方案还是直接看个 demo

> 以下的处理均是在\*\* **[**AST 转化工具**](https://link.juejin.cn?target=https://astexplorer.net/ "AST 转化工具")** \*\*网站实现的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7375c22bb74451ba9091aeadd1d2eed~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3578\&h=1888\&s=405623\&e=png\&b=f7f7f7)

可以看到，**左侧的 js 代码**，会被转化为**右侧庞大的 JSON 树结构**，这就是**AST 抽象语法树**。

这可能稍显复杂，但是别急，我们把这个庞大的树单独拿出来看（我删除了一些细枝末节来更方便理解）

```javascript 
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "text123456789"
          },
          "init": null
        }
      ],
      "kind": "let"
    },
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "operator": "=",
        "left": {
          "type": "Identifier",
          "name": "text"
        },
        "right": {
          "type": "Literal",
          "value": "变量名长一点方便辨识",
          "raw": "'变量名长一点方便辨识'"
        }
      }
    }
  ],
  "sourceType": "module"
}

```


如果仔细看这段代码，可以看到我们的 let text123456768 等代码，皆是以一定的规律进入了上面这个 ast 树中，其他可能可以简单看个七七八八。

唯一让人比较疑惑的就是这个 `type`，似乎有很多种不同类型，所以我找到了它的对照表大全：

```javascript 
Program: 代表整个 JavaScript 程序的根节点。
FunctionDeclaration / FunctionExpression: 代表函数声明和函数表达式。
VariableDeclaration / VariableDeclarator: 代表变量声明，其中 VariableDeclaration 是包含一个或多个 VariableDeclarator 的父节点。
Identifier: 代表标识符，如变量名、函数名等。
Literal: 代表字面量，如数字、字符串、布尔值等。
CallExpression: 代表函数调用。
MemberExpression: 代表成员访问，如 object.property 或 object[method]。
BinaryExpression: 代表二元表达式，如 a + b 或 a > b。
UnaryExpression: 代表一元表达式，如 !a 或 ++b。
AssignmentExpression: 代表赋值表达式，如 a = b 或 a += b。
BlockStatement: 代表代码块，通常由大括号 {} 包围。
IfStatement: 代表 if 条件语句。
ForStatement / WhileStatement: 代表 for 循环和 while 循环。
DoWhileStatement: 代表 do...while 循环。
SwitchStatement: 代表 switch 语句。
CaseClause / DefaultClause: 代表 switch 语句中的 case 和 default 分支。
ReturnStatement: 代表 return 语句。
BreakStatement / ContinueStatement: 代表 break 和 continue 语句，用于控制循环的执行。
TryStatement / CatchClause / FinallyBlock: 代表 try...catch...finally 异常处理结构。
ThrowStatement: 代表 throw 语句，用于抛出异常。
DebuggerStatement: 代表调试器语句，用于断点调试。
ThisExpression: 代表 this 关键字。
ArrayExpression: 代表数组字面量。
ObjectExpression: 代表对象字面量。
Property: 代表对象字面量中的属性。
SpreadElement: 代表在数组或对象字面量中的扩展操作符 ...。
TemplateLiteral: 代表模板字符串。
TaggedTemplateExpression: 代表标签模板字符串。
ArrowFunctionExpression: 代表箭头函数。
ClassDeclaration / ClassExpression: 代表类声明和类表达式。
Super: 代表 super 关键字，用于调用父类方法。
ImportDeclaration / ExportNamedDeclaration / ExportDefaultDeclaration: 代表 ES6 模块的导入和导出语句。

```


有了这些信息，我们就可以更清晰的理解上述代码了，来看一个详细注释的版本：

```javascript 
{
  "type": "Program", // 表示这是一个程序的抽象语法树（AST）的根节点
  "body": [
    {
      "type": "VariableDeclaration", // 表示一个变量声明
      "declarations": [
        {
          "type": "VariableDeclarator", // 表示一个变量声明的具体内容
          "id": {
            "type": "Identifier", // 表示一个变量的名称
            "name": "text123456789" // 变量名
          },
          "init": null // 表示该变量没有初始值
        }
      ],
      "kind": "let" // 表示使用了 'let' 关键字进行变量声明
    },
    {
      "type": "ExpressionStatement", // 表示一个表达式语句
      "expression": {
        "type": "AssignmentExpression", // 表示一个赋值表达式
        "operator": "=", // 赋值操作符
        "left": {
          "type": "Identifier", // 表示左侧是一个变量
          "name": "text" // 变量名 'text'
        },
        "right": {
          "type": "Literal", // 表示右侧是一个字面量
          "value": "变量名长一点方便辨识", // 字面量值
          "raw": "'变量名长一点方便辨识'" // 字面量的原始表示形式
        }
      }
    }
  ],
  "sourceType": "module" // 表示这是一个模块类型的源代码
}

```


这下就几乎完全能看懂了，也大致了解了什么是 AST，天赋异禀的读者可能还可以根据代码自己推导出一个 AST 树（~~而你，我的朋友，你才是真正的 AST 处理器~~）。

既然如此，我们再回过头来看看所谓 **AST的定义:**

> **抽象语法树**（Abstract Syntax Tree，简称AST）是**源代码的抽象语法结构的树状表现形式**。它**用树状的方式**表示编程语言的**语法结构**，树中的每个节点都表示源代码中的一种结构。
>
> 在编程语言的编译器中，抽象语法树是语法分析阶段的一个重要概念。它将源代码文本转换成一个树状的表示形式，**以便于后续的处理和分析**。
>
> 使用抽象语法树可以**方便地对源代码进行遍历和分析**。例如，可以通过遍历AST来检测代码中的语法错误、进行代码优化、生成中间代码或目标代码等。此外，抽象语法树也可以用于静态代码分析、代码格式化、代码高亮显示等。
>
> 在现代的编程语言处理工具中，抽象语法树是一个非常重要的组成部分，它为代码的分析和处理提供了一个清晰、结构化的方式。

只能说哈哈，太长，不看。

省流版就是：**把js代码解析成特定格式方便你处理**。

AST 怎么用
可能有部分读者可能有疑问了，说了这么多，到底怎么用啊？作者怎么才能按要求写出一段 eslint 啊？

来，还是让我来举个例子。就比如说我们需要将代码中所有 let 变成 const（先不考虑语法错误）。这时候最简单的想法多半是，使用批量替换：

```javascript 
`...一堆源码...`.replaceAll('let', 'const') 

```


但是其实挺容易出现这种情况

```javascript 
img = '...asdfletasdfg..'; // 某些字符串是包含 let 的
const letter = 123; // 某些变量是包含 let 的

```


所以大家对批量替换都非常谨慎，有没有什么办法，能识别出**定义变量时**所用的 let 关键字呢？

让我们回到上面那段解析过的 ast 树

```javascript 
{
  "type": "Program", // 表示这是一个程序的抽象语法树（AST）的根节点
  "body": [
    {
      "type": "VariableDeclaration", // 表示一个变量声明
      "declarations": [
        {
          "type": "VariableDeclarator", // 表示一个变量声明的具体内容
          "id": {
            "type": "Identifier", // 表示一个变量的名称
            "name": "text123456789" // 变量名
          },
          "init": null // 表示该变量没有初始值
        }
      ],
      "kind": "let" // 表示使用了 'let' 关键字进行变量声明
    },
    ...
  ],
  "sourceType": "module" // 表示这是一个模块类型的源代码
}

```


没错！我们完全可以利用 type === 'VariableDeclaration' && kind === 'let' 这个条件来筛选出所有的 let ，那么我们的思路就非常明确了：

1. 将源码转成 ast
2. 遍历树节点，当遇到 type === 'VariableDeclaration' && kind === 'let' 时，将其 kind 转为 'const'
3. 将 ast 转为源码

那我们就利用 **@babel/traverse** 包来完成这件事吧

```javascript 
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const code = `function example() {
  let a = 1;
  let b = 2;
  return a + b;
}`;

// 使用babel解析器解析源码为AST
const ast = parser.parse(code);

// 定义一个遍历AST的访问器对象，也就是访问到目标节点【这里是VariableDeclaration】的时候会做什么处理
const visitor = {
  VariableDeclaration(path) { // 这里的 path 是指当前的上下文，而不是路径
    if (path.node.kind === 'let') {
      path.node.kind = 'const';
    }
  }
};

// 使用traverse遍历AST并应用访问器，也就是遍历并应用刚才那个 visitor 规则
traverse(ast, visitor);

// 使用generate根据修改后的AST生成新的代码
const output = generate(ast, {});

// 打印修改后的代码
console.log(output.code);

```
