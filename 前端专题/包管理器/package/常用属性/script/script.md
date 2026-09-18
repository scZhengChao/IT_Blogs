# script

在npm中使用script标签来定义脚本，每当制定**npm run**的时候，就会自动创建一个shell脚本，这里需要注意的是，npm run新建的这个 Shell，会将本地目录的node\_modules/.bin子目录加入PATH变量。

这意味着，当前目录的node\_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 esbuild，只要直接写esbuild xxx 就可以了。

```react tsx 
`{`
  `//` `...`
  `"scripts"``: {`
  `"build"``:` `"esbuild index.js"``,`
  `}`
`}`
```
