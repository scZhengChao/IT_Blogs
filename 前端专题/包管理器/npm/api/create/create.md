# create

通过[npm init 文档](https://link.juejin.cn?target=https://docs.npmjs.com/cli/v8/commands/npm-init#Synopsis "npm init 文档")我们可以知道，`create` 就是 `init` 的别名。所以上面的命令\*\*`pnpm create vite`****就相当于****`pnpm init vite`。\*\*​

继续通过[描述](https://link.juejin.cn?target=https://docs.npmjs.com/cli/v8/commands/npm-init#description "描述")了解到 `init` 命令会转换为 `npm` `exec`，所以`pnpm create vite`最终被转换为\*\*`pnpm exec create-vite`****，即****`npx create-vite`。\*\*​

[*关于 npx 与 npm exec 的对比*](https://link.juejin.cn/?target=https://docs.npmjs.com/cli/v7/commands/npx#npx-vs-npm-exec "关于 npx 与 npm exec 的对比")
