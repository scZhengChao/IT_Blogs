# ESNext

本文探讨了`ESNext`在`tsconfig.json`配置文件中的含义，指出`ESNext`并不是ES6，而是**指未来的**`ECMAScript`版本，包括已发布和未发布的特性。配置中的`target: ESNext`意味着编译时会包含**ES6及后续版本的语法**。同时，文章提到了TypeScript配置文件的其他关键选项，如`module`和`strict`，强调了它们在项目中的重要性。

我们的项目中有很多[配置文件](https://so.csdn.net/so/search?q=配置文件\&spm=1001.2101.3001.7020 "配置文件")比如说`tsconfig.json`，就是关于`typescript`的配置，之前我都是机械性的复制粘贴已经配置好的项目的配置文件，今天我们不谈论别的，就单纯的看一下这个`eslint`到底是个啥？

> 假设我们有一个这样的配置文件

> [npm](https://so.csdn.net/so/search?q=npm\&spm=1001.2101.3001.7020 "npm")` i typescript` 之后，可以使用`tsc --init` 初始化`tsconfig.json`

```json 
{
  "compilerOptions": {
     "target": "ESNext", 
    "useDefineForClassFields": true,
     "module": "ESNext", 
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    " lib": ["ESNext", "DOM"],
     "skipLibCheck": true,
    "baseUrl": "",
    "paths": {
      "@/*": ["./src/*"]
    },
    "types": ["vite/client", "vite-plugin-svg-icons/client", "node", "jest"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "__tests__/unit/*.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```


其中`target: ESNext，module: ESNext`

好多地方有ESNext，那么他到底是啥，以前我一直以为是es6就叫做ESNext，但是其实不然，我们看一下vscode的提示

![](./assets/image/image_NFeqQt5vJ3.png)

ECMAScript 6（简称ES6）是于2015年6月正式发布的JavaScript语言的标准，正式名为ECMAScript 2015（ES2015）。 它的目标是使得JavaScript语言可以用来编写复杂的大型应用程序，成为企业级开发语言 。
ESNext 是一个动态的概念，指的是 ECMAScript 的下一个版本。就是将来即将发布的，尚未正式确定的 ECMAScript 版本，可能包含了新的语言特性，语法，API等。所以我们在配置中写ESNext肯定是包含ES6的语法，因为ES6早就发布了。开发者使用 ESNext 来指代当前和未来 ECMAScript 版本的集合
