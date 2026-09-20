# commit-msg

## 目录

- [配置 commitlint](#配置-commitlint)
- [配置 husky](#配置-husky)
- [commitlint 规则配置](#commitlint-规则配置)
- [使用 commitizen 添加带提示的 commit 编辑](#使用-commitizen-添加带提示的-commit-编辑)

## 配置 commitlint

commitlint 可以检查你的 git commit 日志是否符合你配置的规则，这跟规范 JavaScript 格式的 Eslint 非常像。commitlint 是一个 npm 上的工具，所以需要在 `npm init` 初始化之后的项目才能使用。

在需要限制 git commit 的项目下安装 commitlint ：

```typescript 
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```


安装完成后，在项目根目录下，新建一个 `.commitlintrc.json` 文件，写入如下配置。

```typescript 
{ "extends": ["@commitlint/config-conventional"] }
```


`extends` 属性，代表继承某个配置，上边继承了 `@commitlint/config-conventional` 这个配置文件，把它当成默认配置文件即可。

## 配置 husky

husky 是一个 git hook 工具，这个工具，可以在 git 执行某些命令之前或者之后再添加一些我们自己的命令，学过 vue 的，可以理解为是 git 的生命周期函数工具。

在当前项目下安装 husky ：

```typescript 
npm install husky --save-dev
```


激活 hook ，执行完下面的命令后，会在项目根目录下创建出一个名字 `.husk` 我文件夹，里边是存放 hook 脚本的地方：

```typescript 
npx husky install
```


添加一个 hook，就跟 vue 写了个 `onMounted` 方法类似，执行完后，`.husky` 文件夹下边会多出一个 `commit-msg` 的脚本文件：

```typescript 
npx husky add .husky/commit-msg  'npx --no -- commitlint --edit ${1}'
```


这句命令大概意思就是，在执行 git commit -m 'xxx' 这句命令时，使用 commitlint 检查 'xxx' 的内容格式是否符合规则。不符合规则，会停止 git commit -m 并输出错误提示。
这样一个基础的 git commit 格式校验就配置好了，随便 git add 一些文件，然后执行 git commit -m 'xxx' 试试效果，下边我就放的官方例子：

```typescript 
saltedfish@DESKTOP-623RCE5 MINGW64 /d/code/commitlint-demo (master)
$ git add .

saltedfish@DESKTOP-623RCE5 MINGW64 /d/code/commitlint-demo (master)
$ git commit -m "foo: this will fail"
⧗   input: foo: this will fail
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```


第 6 行开始就是提交时的报错，先提示你提交的内容是啥，然后告诉你 `type` 只能是中括号内的那些，你写的 `foo` 是不符合规则的。当把 `foo` 改成中括号内的 `build` 、`chore` 或 `ci` 等，即可通过格式校验，并正常提交 `commit` 。

```typescript 
saltedfish@DESKTOP-623RCE5 MINGW64 /d/code/commitlint-demo (master)
$ git commit -m "chore: lint on commitmsg"
[master (root-commit) af3dffd] chore: lint on commitmsg
 5 files changed, 2224 insertions(+)
 create mode 100644 .commitlintrc.json
 create mode 100644 .gitignore
 create mode 100644 .husky/commit-msg
 create mode 100644 package-lock.json
 create mode 100644 package.json
```


## commitlint 规则配置

有时候，默认的规则配置，并不适合我们的项目使用，这时，就可以使用相关配置属性，配置适合我们自己的提交规则。在了解规则怎么配置之前，需要先了解提交 commit 格式的一些概念。

```typescript 
type(scope?): subject
body?
footer?
```


默认规则中，配置了五种在日志使用的内容，type 、scoped 、subject 、body 和 footer 。其中，type 和 subject 是必填项。

- type 是一些可以自定义的提交类型，如新功能（feat）、修复 Bug（fix）等，需要怎样的格式可以自己配置。
- subject 是简要描述，其实就是平时我们 git commit -m 'xxx' 输入的内容。

`scope` 我不怎么使用，大概就是用来填写一些修改了什么文件的标记之类的，`body` 是详细表述，就是 `git commit -m 'xxx'` 时，换行之后写一些详细描述，一般我也不写，有 `subject` 我就够用了。`footer` 这个我也不怎么用，具体写些啥也不是很清楚。

了解完概念后，就可以开始进行我们的配置了，只介绍一些比较常用的配置，如果提交时，遇到一些自己不喜欢的配置，**可以看**[**官方文档**](https://link.juejin.cn/?target=https://commitlint.js.org/#/reference-configuration "官方文档")**对应配置**进行关闭。

一开始我们就配置了一个 `extends` 属性，这个就是继承别人写好的配置。

```typescript 
{ "extends": ["@commitlint/config-conventional"] }
```


如果我们要覆盖 `extends` 的规则配置，这时候，就需要用到 `rules` 属性，`rules` 接收的一个对象（`{}`） ，key 对应规则名，value 对应规则，是一个长度为 3 的数组（`[Level, Applicable, Value]`） 。

- Level 有三个值，为 0 时，代表关闭此规则，1 时，是警告，2 是错误。
- Applicable 的值为 always | never ，为 never 时，反转规则，应该是 Level 三个值反过来的意思吧。
- Value 就不多说了，就是配置的值。

接下来演示一个最常用的配置 `rules['type-enum']` ，默认值是 `['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert']`，就是上边说到的 `type` 只能填哪些值。

```typescript 
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "✨ 新功能",
        "🐛 修复",
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "revert"
      ]
    ],
    "type-empty": [0],
    "subject-empty": [0]
  }
}
```


这个 `type` 不仅仅只是可以中文或者英文，还可以加上自己喜欢的，emoji 表情包，当用了 emoji 表情包后，`type-empty` 和 `subject-empty` 就只能关闭，才能正常通过校验（经验之谈）。

这样，就覆盖了我们继承的规则，详细规则配置可查看**对应**[**文档**](https://link.juejin.cn?target=https://commitlint.js.org/#/reference-rules "文档")**。**

## 使用 commitizen 添加带提示的 commit 编辑

在上边的配置中，我们给我们的 `type` 添加了一些 emoji 表情包，当我们提交 commit 的时候，还要找半天表情包，那也太麻烦了。这时，就需要轮到 `commitizen` 出场了，它可以以命令行的形式编写我们的 commit。

在当前项目下安装 `commitizen` ：

```typescript 
npm i --save-dev commitizen
```


安装完成后，在 `package.json` 添加一个 `script` 命令配置：

```typescript 
···
"scripts": {
  ···
  "commit": "cz"
  ···
},
···
```


`commitizen` 只是一个基础，还需要安装 `@commitlint/cz-commitlint` 才能使用：

```typescript 
npm install --save-dev @commitlint/cz-commitlint
```


`package.json` 添加相关 `config` 配置：

```typescript 
···
"config": {
  "commitizen": {
    "path": "@commitlint/cz-commitlint"
  }
}
···
```


现在，执行 `npm run commit` 看看，是否会弹出一个命令行交互，如果正常，则安装成功。

```typescript 
saltedfish@DESKTOP-623RCE5 MINGW64 /d/code/commitlint-demo (master)
$ npm run commit

> commitlint-demo@1.0.0 commit
> cz

cz-cli@4.2.5, @commitlint/cz-commitlint@17.3.0

? Select the type of change that you're committing: 
> ✨ 新功能
  🐛 修复
  ──────────────
  empty
```


按提示完成交互后，会自动帮你执行 `git commit -m 'xxx'` 提交，提交的时候，又会触发 `husky` 的 hook 进行格式校验，校验通过后正常提交 commit 。

`@commitlint/cz-commitlint` 是一个插件，如果觉得不合适，可以自己研究 `commitizen` 的官方仓库文档，也可以自己实现自己的命令行工具来辅助提交 commit 。想要汉化上边的提示，可以参考此[文档](https://link.juejin.cn?target=https://commitlint.js.org/#/reference-prompt "文档")。
