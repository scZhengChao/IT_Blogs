# only-allow限制项目使用特定的包管理器

## 目录

- [only-allow](#only-allow)
- [问题](#问题)
- [源码](#源码)
  - [which-pm-runs](#which-pm-runs)
  - [only-allow](#only-allow)

## only-allow

`pnpm`的作者写了一个库[only-allow github](https://link.juejin.cn/?target=https://github.com/pnpm/only-allow "only-allow github")，这个包的功能很简单，强制在项目上使用特定的包管理器

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2708070153b44aeb9e605f648f11b113~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56yo56yo54uX5ZCe5Zms6ICF:q75.awebp?rk3s=f64ab15b\&x-expires=1742480056\&x-signature=nRiyfVMzay4FtlKO6xm9kIr6L78%3D)

使用方法就更简单了

```javascript 
// package.json

{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}

```


`preinstall`是 npm的\*\*一个生命周期钩子，在`install`\*\***之前执行，**

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b84dfb3dbf944ae696b555fca2905909~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56yo56yo54uX5ZCe5Zms6ICF:q75.awebp?rk3s=f64ab15b\&x-expires=1742480056\&x-signature=36eUy7bLi9oBDYiGz1mhSqs29wU%3D)

## 问题

上述方法很好，**就是存在一个问题，拦不住高版本的npm，具体原因是 npm 的**\*\*`preinstall`\*\***钩子是在依赖安装之后执行的（**[**详情 github**](https://link.juejin.cn/?target=https://github.com/npm/cli/issues/2660 "详情 github")**）**

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7c1465a15d8d4a9c95132ea321132ecb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56yo56yo54uX5ZCe5Zms6ICF:q75.awebp?rk3s=f64ab15b\&x-expires=1742480056\&x-signature=habq%2FwOMDYXeaB1C0hNTiKrMtLA%3D)

也就是我们想在安装之前判断是什么包管理器，但是npm有些版本有bug，顺序反过来了

不过也找到了一个比较有意思的[解决办法 freecodecamp](https://link.juejin.cn/?target=https://www.freecodecamp.org/news/how-to-force-use-yarn-or-npm/ "解决办法 freecodecamp")，通过`engines`来限制包管理器

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9f751bedc0aa4d54973b164a0790d11b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56yo56yo54uX5ZCe5Zms6ICF:q75.awebp?rk3s=f64ab15b\&x-expires=1742480056\&x-signature=3YrCymQ2Jy8eHiJO6FutYwBGo6Y%3D)

## 源码

### which-pm-runs

这个库是`only-allow`的依赖库，用来**判断当前的包管理工具和包管理工具的版本**

```javascript 
'use strict'

module.exports = function () {
  if (!process.env.npm_config_user_agent) {
    return undefined
  }
  return pmFromUserAgent(process.env.npm_config_user_agent)
}

function pmFromUserAgent (userAgent) {
  const pmSpec = userAgent.split(' ')[0]
  const separatorPos = pmSpec.lastIndexOf('/')
  const name = pmSpec.substring(0, separatorPos)
  return {
    name: name === 'npminstall' ? 'cnpm' : name,
    version: pmSpec.substring(separatorPos + 1)
  }
}

```


`process.env.npm_config_user_agent`是一个在 Node.js 环境中可用的环境变量，**它存储了有关使用的 npm（Node Package Manager）或相关 CLI（命令行界面）工具的信息。** 具体来说，这个环境变量包含了当前环境中运行 npm 或其它兼容工具时使用的用户代理（User Agent）字符串。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/af2e518f8cdc445990394b6002b4a23b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56yo56yo54uX5ZCe5Zms6ICF:q75.awebp?rk3s=f64ab15b\&x-expires=1742480056\&x-signature=f15G%2FZrxKXzBZrd9%2B4bUAodFpbQ%3D)

### only-allow

```javascript 
#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')
const availablePMList = ['npm', 'cnpm', 'pnpm', 'yarn', 'bun']

// 美化输出
function box(s) {
  const lines = s.trim().split("\n")
  const width = lines.reduce((a, b) => Math.max(a, b.length), 0)
  const surround = x => '║   \x1b[0m' + x.padEnd(width) + '\x1b[31m   ║'
  const bar = '═'.repeat(width)
  const top = '\x1b[31m╔═══' + bar + '═══╗'
  const pad = surround('')
  const bottom = '╚═══' + bar + '═══╝\x1b[0m'
  return [top, pad, ...lines.map(surround), pad, bottom].join('\n')
}

// 获取输入的参数
const argv = process.argv.slice(2)
if (argv.length === 0) {
  console.log(`Please specify the wanted package manager: only-allow <${availablePMList.join('|')}>`)
  process.exit(1)
}

// 输入的内容不在指定的包管理器范围内
const wantedPM = argv[0]
if (!availablePMList.includes(wantedPM)) {
  const pmStr = `${availablePMList.slice(0, -1).join(', ')} or ${availablePMList[availablePMList.length - 1]}`
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: ${pmStr}.`)
  process.exit(1)
}

const usedPM = whichPMRuns()
const cwd = process.env.INIT_CWD || process.cwd()
const isInstalledAsDependency = cwd.includes('node_modules')
// 判断是不是指定的包管理器
if (usedPM && usedPM.name !== wantedPM && !isInstalledAsDependency) {
  switch (wantedPM) {
    case 'npm':
      console.log(box('Use "npm install" for installation in this project'))
      break
    case 'cnpm':
      console.log(box('Use "cnpm install" for installation in this project'))
      break
    case 'pnpm':
      console.log(box(`Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.io/`))
      break
    case 'yarn':
      console.log(box(`Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`))
      break

    case 'bun':
      console.log(box(`Use "bun install" for installation in this project.

If you don't have Bun, go to https://bun.sh/docs/installation and find installation method that suits your environment.`))
      break
  }
  process.exit(1)
}

```


中断程序执行用的是`process.exit(1)`([详情 node](https://link.juejin.cn/?target=https://nodejs.org/api/process.html#processexitcode "详情 node"))

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3eb7d9cb31764d14ba159a0ec985d003~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56yo56yo54uX5ZCe5Zms6ICF:q75.awebp?rk3s=f64ab15b\&x-expires=1742480056\&x-signature=DYiit%2FHoRKcejB5TTIz2lWPnnFw%3D)
