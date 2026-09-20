# react搭建

## 目录

- [eslint](#eslint)
  - [初始化](#初始化)
  - [vscode 插件](#vscode-插件)
- [prettier](#prettier)
  - [配置](#配置)
  - [vscode 插件](#vscode-插件)
- [git hooks](#git-hooks)
  - [.git/hooks](#githooks)
  - [自定义文件下的hooks](#自定义文件下的hooks)
- [husky](#husky)
  - [配置](#配置)
  - [原理](#原理)
- [lint-staged](#lint-staged)
  - [配置](#配置)
- [commitlint](#commitlint)
  - [commit-msg钩子](#commit-msg钩子)
- [stylelint](#stylelint)
  - [配置](#配置)
  - [插件](#插件)
  - [commit](#commit)
- [总结](#总结)

因历史遗留原因，接手的项目没有代码提醒/格式化，包括 `eslint`、`pretttier`，也没有 `commit` 提交校验，如 `husky`、`commitlint`、`stylelint`，与其期待自己或者同事的代码写得完美无缺，不如通过一些工具来进行规范和约束。

### eslint

eslint 是一个代码校验工具，用来规范项目代码风格。

#### 初始化

通过 `npm install eslint` 后使用 `npx eslint --init` 来根据问答生成 `.eslintrc.js` 配置文件。我的项目是 React + JavaScript，这里选择了 Airbnd 的规则来校验，不同的项目类型可以进行其它的选择。配置详细介绍可以参考这一篇 [规范代码编写风格就用 eslint 和 prettier](https://segmentfault.com/a/1190000041847944 "规范代码编写风格就用 eslint 和 prettier") 。

![](image_Ges6rahsqV.png)

生成的 `.eslintrc.js` 文件包含当前 eslint 配置的规则，**在命令行中使用** `npx eslint ./xxx.js` 文件时，`eslint` 就会**读取项目的配置文件**对其内容进行匹配，如果没有配置文件，则会出现图中第一次执行的命令的回应。【Oops！Something went wrong! :( ，ESLint couldn't find a configuration file】

![](image_eRXL_X0v7r.png)

通过 `npx eslint` 可以检测出文件不符合规范的地方，增加 `--fix` 参数可以自动修复部分错误。但我们开发的过程中也很少会通过命令检测文件代码是否规范，如果有一个时刻检测代码，当代码出现问题标红提示，并且 ctrl + s 保存自动格式化的工具就好了！vscode 插件来满足你以上要求

#### vscode 插件

安装【eslint】插件

![](https://segmentfault.com/img/bVc88ME)

并在 `vscode` 的 `settings.json` 中进行增加配置，即可享受实时校验代码是否符合规范，并保存后自动修复的功能。

```json 
// settings.json
 "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
},

```


### prettier

`prettier` 也会对代码进行格式化，和 eslint\*\* 两者的区分在于\*\*，`eslint` 校验的范围会偏向于代码是否优雅，比如是否存在 console 语句、是否声明函数但未使用，而 `prettier` 更**侧重于格式**，比如一行展示多少个字符，使用单引号还是双引号。

#### 配置

首先通过 `npm install prettier` 安装依赖，然后再新增配置文件 `.prettierrc.js` ，在文件里定义需要的配置，详细字段可以参考[官网](https://link.segmentfault.com/?enc=BFSSuowuad6cwN4UMCIYZw==.wdsw8Zd6gbfyeXh9ltUZ5vfCZ0jifHWEJ+bX/EpCrgHhJTEJQdo+K22W1Q2jytdl "官网")。

```javascript 
// .prettierrc.js
module.exports = {
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
};

```


**判断是否生效**直接使用命令` npx prettier --write [指定文件] ，`查看文件是否根据 `prettier` 的规则格式化。

#### vscode 插件

同 `eslint` 一样，使用 `vscode` 插件 `prettier` 来**实现保存后自动格式化** &#x20;

![](https://segmentfault.com/img/bVc88MF)

在 `vscode` 配置文件 `settings.json` 中需要设置格式化的工具，默认使用 `prettier` 来执行。

```json 
// settings.json
"editor.defaultFormatter": "esbenp.prettier-vscode"

// 如果不生效，可能要针对每种类型的文件来执行格式化规则
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```


设置完之后按住 ctrl + s，自动保存为 .`prettier` 的文件版本，此时可能与 `eslint` 校验会存在**冲突**，在 `eslint` 插件的检查下，与 `eslint` **不一致的部分仍然会标红**。所以需要将 `eslint` 规则和 `prettier` 保持一致。

通过以上本地设置，可以规范自己的开发，但多人开发时难免会存在有些开发者提交的代码不规范，那我们可以在提交时设置一个关卡，通过 git 代码提交时的钩子来阻挡不规范的提交。

### git hooks

在网络上找到一张 git hooks 执行流程图示，从 `git commit` 开始有一**些卡点，我们主要应用的钩子**是 `pre-commit`（通过eslint检测下是否有报错代码）、`commit-msg`（提交的message格式是否正确）

![](image_FxSRcjkh7t.png)

#### .git/hooks

项目根**目录初始化时就会存在**`  .git  `文件夹，其中 `hooks` 文件夹包含了 `git` 整个流程的钩子，**当前文件后缀以 .sample 结尾**，**去除掉**\*\*`  .sample  `\*\***后缀并制定校验规则会直接生效。**

这里修改了 `pre-commit` 的规则，为了演示直接设置校验指定文件，正常应该是检测使用 git add 添加到暂存区的文件，没有通过 eslint 校验时，则不会执行 git commit。

![](image_L9HGGRMMqQ.png)

但我们发现，即使修改了 .git/hooks 文件夹下的文件，也不会显示文件修改，更没法将其添加到暂存区、本地仓库甚至到远程仓库，其他同事拉取代码后提交仍然不会有校验。

#### 自定义文件下的hooks

既然 .git 文件不会提交到远程仓库，那么我们可以**找一个代码可以被跟踪**的地方，并且告诉 git 执行工作流的时候来我指定的文件夹执行文件。

在项目根目录新增文件夹 `.myhooks`（其他的也可以），新增 `pre-commit` 文件，增加 `eslint` 的校验，并且通过命令&#x20;

`git config core.hooksPath .myhooks` **修改** `git` \*\*执行 \*\*`hooks` 的地址，可进入 `.git` 目录执行 `cat config` 查看配置是否修改。

将 .git/hooks 文件中的 .sample 后缀恢复，git commit 校验仍然是生效的，表示我们自定义的 hooks 是成功执行的（更换了hook地址）。

![](image_tQ7LGpVjt5.png)

如果希望达到共享的目的，将 .myhooks 文件夹推送到远程后，需要在协同开发者的笔记本都配置 `git config core.hooksPath .myhooks`，这一步无论是手动敲命令，还是通过工具都有些许麻烦，况且不同项目直接自定义的 `hooks` 文件还有可能不同，造成维护困难。

### husky

针对以上问题，`husky` 为我们提供了解决方案。

#### 配置

通过 `npm install husky` 以及 `npx husky install` 在项目根目录生成 .husky 文件夹，将 pre-commit 文件从自定义的文件夹中移过来。

增加 package.json 的配置，**在执行 npm install 之后会执行 npm run prepared** ，这样每次新增依赖时，会更新 husky。

```json 
// package.json
"script": {
  "prepared": "husky install"
}
```


#### 原理

此时再执行 `git commit` 操作时，和前面我们看到的校验是一致的。其实 `husky` 的实现原理和我们自定义 `hooks` 的一致，通过命令行去改变执行 `git hooks` 的位置。

![](image_TDgIjSb6Zo.png)

通过 `husky` **可以共享** `git hooks` 的校验规范，但是我们**应该对哪些文件进行校验呢？**

以上为了演示方便，使用 `eslint` 去校验指定文件，也可以指定文件夹，比如 `src` ，但这样的**校验方式会导致我明明只修改了一个文件，却需要去修复完src目录下所有文件的 bug 才能提交，极大增加了开发难度。**

正确的**方案应该是增量检测**，只检测使用 git add 添加到暂存区的文件，如果这部分文件有问题，修复即可提交。

### lint-staged

lint-staged 就可以实现**对于暂存区的检测。**

#### 配置

使用 `npm install lint-staged` 安装后，在 package.json 中配置 lint-staged 指令，因为需要使用到 `eslint` 和 `prettier` 的自动修复，所以还需要将他们添加到 `script` 属性中。

```javascript 
// package.json
"script": {
  "eslint-fix": "eslint --fix", // 新增eslint的规则， --fix 表示自动修复
  "prettier-format": "prettier --write", // 新增eslint的规则， --write 表示自动修复
}
"lint-staged": {
    "*.{js,jsx,,ts,tsx}": [
        "npm run eslint-fix",
        "npm run prettier-format"    
    ]
}
```


**然后在 ****`.husky/pre-commit`**** 将 ****`npx eslint`**** 修改成 ****`npx lint-staged`****，再次执行 ****`git commit`**** 就可以 ****`eslint`**** 只对暂存区的文件进行校验。**

![](image_5zJSpS79yf.png)

### commitlint

以上是执行 `commit` **操作之前**对于**暂存区代码**进行校验，防止不规范的代码提交，在提交时还有一项需要注意：提交的注释内容（git commit -m 后跟的引号中内容）是否清晰，回溯 git 提交记录时，不清晰的描述导致排查问题、寻找功能会非常低效。

为了保证提交注释的可阅读性，统一使用的规范格式为 `<type>: <subject>`（subject前面有一个空格）。

- type 代表标识，比如：feat（新特性）、fix（修复bug）、style（样式调整）、refactor（重构）、docs（文档说明）
- subject 对于此时提交的描述信息

首先安装提交校验规范所需要的依赖，`npm install @commitlint/cli @commitlint/config-conventional -D`

新增 `.commitlintrc.js` 配置文件，设置 `commit` 备注信息的校验方案。

```javascript 
// .commitlintrc.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};

```


#### commit-msg钩子

再回到这张图，commit-msg 的钩子 是提交到本地库之前执行的，在这个阶段来校验 commit 信息是否符合规范比较合适。

![](image_HXz7686M80.png)

在 `.husky` 文件夹下新增 `commit-msg` 文件，增加校验命令

```bash 
#!/bin/sh
npx --no -- commitlint --edit ${1}
```


- npx --no ：表示只使用项目 node\_modules 下的脚本，不允许找不到时下载
- commitment --edit <文件名>：执行 commitment 命令行工具，--edit 表示从文件中提取commmit内容
- \$1：指向 .git/COMMIT\_EDITMSG 文件，这里存放着最后一次 commit 信息

![](image_2bUefF0-y0.png)

以上便完成了对于 commit 注释内容的校验。我们在项目中常定义的文件类型，除了 js，\*\*还有 css \*\*，eslint 可以对 js / jsx / vue 等文件类型进行校验，**那么 css 也需要可以规范的工具。**

### stylelint

`stylelint` 可以完成对于 `css/scss/less` 等样式表文件的校验，功能类似于 `eslint` 对于 `js`文件。

#### 配置

因为项目使用的样式表为 `scss` 格式，所以安装处理 `scss` 文件的依赖，`npm install stylelint stylelint-scss stylelint-config-recommended-scss -D`，注意 `stylelint` **需要安装合适的版本**，因为版本不正确的报错 Error：Undefined rule annotation-no-unknow 而排查了很久。

新增 `stylelintrc.js` 文件，告诉 `stylelint` 校验规则

```javascript 
module.exports = {
  extends: ['stylelint-config-recommended-scss'],
};
```


#### 插件

和 `eslint / prettier` 相似，它也有 `vscode` 插件在编辑时 `css/scss` 文件时按住 ctrl+s 实现代码自动格式化

![](https://segmentfault.com/img/bVc88Nk)

vscode 需要增加一些配置

```javascript 
// settings.json
"editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
 },
 "stylelint.validate": ["css", "scss"],
```


#### commit

和 eslint 一样，在提交时**设置校验避免不规范的 css 代码提交到远程仓库，** 需要在`package.json` 中增加配置。

```javascript 
"script": {
  "eslint-fix": "eslint --fix",
  "prettier-format": "prettier --write",
  "stylelint-fix": "stylelint --fix"  // 新增stylelint的规则， --fix 表示自动修复
}
"lint-staged": {
    "*.{js,jsx,,ts,tsx}": [
        "npm run eslint-fix",
        "npm run prettier-format"
    ],
     "*.{css,scss}":[
      "npm run stylelint-fix" // 新增 stylelint 校验
    ]
}
```


`stylelint` 也同样是作用于暂存区的文件，和 `eslint`、`prettier` 一样，只是校验不同类型的文件，所以也配置在 因为之前在&#x20;

`lint-staged` 的规则中，在 `pre-commit` 文件中不需要增添新的命令。

在提交文件时就可以看到对于 `css/scss` 等样式表的检测，如果报错会终止提交。

![](image_OSPy7s7ELb.png)

### 总结

- eslint 用来规范 js/ts/jsx 等类型文件编码时语法
- prettier 保障 js/ts/jsx 等类型文件编码时格式
- husky 为执行 git commit 操作设置卡点，避免不规范提交
- lint-staged 保证校验的区域只在暂存区
- commlint 使得commit msg按照既定格式
- stylelint 确保 css/scss 类样式表文件也能易读统一
