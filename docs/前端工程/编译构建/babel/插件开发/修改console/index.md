# 修改console

## 目录

- [封装成 Babel 插件](#封装成-Babel-插件)

知道了 babel 的编译流程、AST、api 之后，我们已经可以做一些有趣的事情了。比如我们在开发的时候经常会使用 console 来调试代码，为了让打印信息更清晰，我们可以在 console.log 等 api 中插入文件名和行列号的参数，方便定位到代码。如：

```typescript 
console.log(1); -> console.log('文件名（行号，列号）：', 1);
```


我们可以先看下\*\* console.log(1) 的 AST 结构\*\*

![](./assets/image/image_NJKFmfRRN-.png)

调用表达式的 AST 是 CallExpression。

那我们要做的是在遍历 AST 的时候对 console.log、[console.info](http://console.info "console.info") 等 api 自动插入一些参数，也就是要通过 visitor 指定对 CallExpression 的 AST 做一些修改。

CallExrpession 节点有两个属性，callee 和 arguments，分别对应调用的函数名和参数， 所以我们要判断当 callee 是 console.xx 时，在 arguments 的数组中插入一个 AST 节点。如：

```typescript 
const parser = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types')
const path = require("path")

/**
 * 给console插入行列序号
 */
const sourceCode = `function func() {
    console.info(2);
}`

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
})
const stringCode = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`)
const fileName = path.basename(__dirname)
traverse(ast, {
    CallExpression(path, state){
        if(t.isMemberExpression(path.node.callee) && path.node.callee.object.name === 'console' && ['log', 'info', 'error', 'debug'].includes(path.node.callee.property.name)) {
            const {line, column} = path.node.loc.start 
            path.node.arguments.unshift(t.stringLiteral(`${fileName}: (${line},${column})`))
        }
    }
})

const {code} = generate(ast)

console.log(code)
// 输出结果为：
// function func() {
//   console.info("fileName: (2,4)", 2);
// }

```


虽然结果是符合预期的，但是我们可以发现 if 的判断条件过于复杂，我们可以优化一下。可以通过path.toString() 把 callee 的 AST 转换成代码字符串再进行判断，如：

```typescript 
traverse(ast, {
    CallExpression(path, state){
        if (stringCode.includes(path.get('callee').toString())) {
            const {line, column} = path.node.loc.start 
            path.node.arguments.unshift(t.stringLiteral(`${fileName}: (${line},${column})`))
        }
    }
})

```


如果我们想在 console 之前打印行列号，如：

```typescript 
console.log(1);

// 转换成
console.log('文件名（行号，列号）：');
console.log(1);
```


基本逻辑是差不多的，不过这里需要插入 AST，会用到 path.insertBefore 的 api。而且要跳过新的节点的处理，**就需要在节点上加一个标记，如果有这个标记的就跳过。如：**

```typescript 
const parser = require('@babel/parser');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const t = require('@babel/types')
const template = require("@babel/template").default;
const path = require("path")

/**
 * 给console插入行列序号
 */
const sourceCode = `function func() {
    console.info(2);
}`

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous'
})
const stringCode = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`)
const fileName = path.basename(__dirname)
traverse(ast, {
    CallExpression(path, state){
        if (path.node.isNew) {
            return
        }
        if (stringCode.includes(path.get('callee').toString())) {
            const {line, column} = path.node.loc.start 
            const newAst = template.expression(`console.log("${fileName}: (${line},${column}")`)()
            newAst.isNew = true
            path.insertBefore(newAst)
        }
    }
})

const {code} = generate(ast)

console.log(code)

// 输出结果
// function func() {
//   console.log("babel-1: (2,4")
//   console.info(2);
// }

```


## 封装成 Babel 插件

**babel 插件的形式就是函数返回一个对象，对象有 visitor 属性。**

**函数的第一个参数可以拿到 types、template 等常用包的 api，这样我们就不需要单独引入这些包了。 而且作为插件用的时候，并不需要自己调用 parse、traverse、generate，这些都是通用流程，babel 会做，我们只需要提供一个 visitor 函数，在这个函数内完成转换功能就行**了。

函数的第二个参数 **state 中可以拿到插件的配置信息 options** 等，比如 filename 就可以通过 state.filename 来取。

```typescript 
const stringCode = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`)

module.exports = function({types, template}) {
    return {
        name: 'parameters-insert-plugin',
        visitor: {
            CallExpression(path, state) {
                if (path.node.isNew) {
                    return;
                }

                if (stringCode.includes(path.get('callee').toString())) {
                    const {line, column} = path.node.loc.start 
                    const newAst = template.expression(`console.log("${state.filename}: (${line},${column}")`)()
                    newAst.isNew = true
                    path.insertBefore(newAst)
                }
            }
        }
    }
}
```


然后通过 @babel/core 的 transformSync 方法来编译代码，并引入上面的插件：

```typescript 
const { transformFileSync } = require('@babel/core');
const insertParametersPlugin = require('./plugin/parameters-insert-plugin');
const path = require('path');

const { code } = transformFileSync(path.join(__dirname, './sourceCode.js'), {
    plugins: [insertParametersPlugin],
    parserOpts: {
        sourceType: 'unambiguous'    
    }
});

console.log(code);
```


这样我们就成功的把前面调用 parse、traverse、generate 的代码改造成了 babel 插件的形式。
