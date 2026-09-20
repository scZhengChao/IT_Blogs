# `@types`，`typeRoots`和`types`

默认所有"`@types`"包会在编译过程中被包含进来。 `node_modules/@types`文件夹下以及它们子文件夹下的所有包都是； 也就是说， `./node_modules/@types/`，`../node_modules/@types/`和`../../node_modules/@types/`等等。

如果指定了`typeRoots`，*只有*`typeRoots`下面的包才会被包含进来。 比如：

```typescript 
{
   "compilerOptions": {
       "typeRoots" : ["./typings"]
   }
}

```


\*\*这个配置文件会包含\_所有\_​`./typings`****下面的包，而不包含****`./node_modules/@types`\*\***里面的包。**

如果指定了`types`，**只有被列出来的包才会被包含进来。 比如：**

```typescript 
{
   "compilerOptions": {
        "types" : ["node", "lodash", "express"]
   }
}

```


这\*\*个`tsconfig.json`****文件将\_仅会\_包含 ****`./node_modules/@types/node`****，****`./node_modules/@types/lodash`****和****`./node_modules/@types/express`。/@types/。 ​`node_modules/@types/*`\*\***里面的其它包不会被引入进来。**

**指定**\*\*`"types": []`****来禁用自动引入****`@types`\*\***包。**

注意，**自动引入只在你使用了全局的声明（相反于模块）时是重要的**。 如果你使用 `import "foo"`语句，TypeScript仍然会查找`node_modules`和`node_modules/@types`文件夹来获取`foo`包。

[ 规范 · 声明文件 · TypeScript中文网 · TypeScript——JavaScript的超集  https://www.tslang.cn/docs/handbook/declaration-files/do-s-and-don-ts.html](https://www.tslang.cn/docs/handbook/declaration-files/do-s-and-don-ts.html " 规范 · 声明文件 · TypeScript中文网 · TypeScript——JavaScript的超集  https://www.tslang.cn/docs/handbook/declaration-files/do-s-and-don-ts.html")
