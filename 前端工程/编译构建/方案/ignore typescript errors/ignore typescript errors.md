# ignore typescript errors

在执行 `npm run build` 时忽略 TypeScript 错误，有几种方法可以尝试：

1. 在 TypeScript 配置文件 (tsconfig.json) 中设置 `noEmitOnError` 选项为 `true`，这样 TypeScript 编译器在遇到错误时就不会生成输出文件。

```javascript 
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}

```


1. 在 npm 脚本中使用 `--force` 参数强制执行命令，即使命令执行失败。

```javascript 
{
  "scripts": {
    "build": "tsc --force"
  }
}

```


1. 使用 `try-catch` 语句包裹命令，在发生错误时进行特殊处理。

```javascript 
{
  "scripts": {
    "build": "try-catch 'tsc' 'echo Build failed but continuing'"
  }
}

```
