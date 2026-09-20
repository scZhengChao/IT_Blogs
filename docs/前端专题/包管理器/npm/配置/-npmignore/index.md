# .npmignore

## 目录

- [内容语法格式](#内容语法格式)
- [设置白名单](#设置白名单)
- [优先级问题](#优先级问题)

npm publish发布一个npm包，发布的时候你希望只发布打包的文件，包的源码，单元测试等文件不希望发布； &#x20;
.npmignore中的文件不会被发布，**默认情况下，npm publish发布目录中的所有文件**，除了

- `.*.swp`
- `._*`
- `.DS_Store`
- `.git`
- `.hg`
- `.npmrc`
- `.lock-wscript`
- `.svn`
- `.wafpickle-*`
- `config.gypi`
- `CVS`
- `npm-debug.log`

**所以不需要把这些文件加入到.npmignore中也会忽略，** 如果没有.npmignore,有.gitignore，**那么.gitignore中的文件会从包中忽略，如果同时存在，那么.npmignore的优先级更好，**

**这些是默认发布的文件，加入.gitignore和.npmignore都是不会生效的：**

- `package.json`
- `README`(and its variants)
- `CHANGELOG`(and its variants)
- `LICENSE`/`LICENCE`

> 最近在看axios源码，看到项目根目录下有一个名为`.npmignore`的文件，查询文档发现它是一种`黑名单`机制，**在包发布时用于排除某些文件或目录。**

## 内容语法格式

跟.gitignore基本一样。下面是`axios`源码里的配置内容：

```markdown 
**/.*
*.iml
coverage/
examples/
node_modules/
typings/
sandbox/
test/
bower.json
CODE_OF_CONDUCT.md
COLLABORATOR_GUIDE.md
CONTRIBUTING.md
COOKBOOK.md
ECOSYSTEM.md
Gruntfile.js
karma.conf.js
webpack.*.js
sauce_connect.log

```


可以看到忽略了二级目录下的任何`.`文件，`examples`目录，`sandbox`目录，`test`目录，`webpack`、`grunt`、`karma`等配置文件.当然也必须有`node_modules`目录。

另 \*\*，如果没有指定该文件，npm默认会将`.gitignore`****视为****`.npmignore`\*\*

## 设置白名单

比如，我有一份非常全的`.npmignore`清单，我不**想去动它，可又想把清单上的一些文件放开并上传到npm**，怎么办呢？

答案是：**通过配置**\*\*`package.json`****里的****`files`\*\***字段来解决。** 比如，我的`.npmignore`清单忽略了`examples`整个目录：

```html 
examples

```


配置`package.json`里的`files`字段放开`examples`下的`white-label.txt`文件:

```json 
{
  "files": [
    "examples/white-label.txt"
  ],
}

```


## 优先级问题

如果项目同时存在`.gitignore`,`.npmignore`,并且配置了`files`字段,优先级如下： `files`>`.npmignore`>`.gitignore`。
