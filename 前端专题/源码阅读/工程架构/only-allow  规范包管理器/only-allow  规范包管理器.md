# only-allow  规范包管理器

## 目录

- [only-allow 源码](#only-allow-源码)
- [which-pm-runs 当前运行的是哪一个包管理器](#which-pm-runs-当前运行的是哪一个包管理器)

```typescript 
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```


同理可得：强制使用 `npm`、`pnpm`也是类似设置。

## only-allow 源码

```typescript 
// only-allow/bin.js
#!/usr/bin/env node
const whichPMRuns = require('which-pm-runs')
const boxen = require('boxen')

 const argv = process.argv.slice(2)
 if (argv.length === 0) {
  console.log('Please specify the wanted package manager: only-allow <npm|pnpm|yarn>')
  process.exit(1)
}
// 第一个参数则是 用户传入的希望使用的包管理器
// 比如 npx only-allow pnpm 
// 这里调试是 node bin.js pnpm
const wantedPM = argv[0]
// npm pnpm yarn 都不是，则报错
if (wantedPM !== 'npm' && wantedPM !== 'pnpm' && wantedPM !== 'yarn') {
  console.log(`"${wantedPM}" is not a valid package manager. Available package managers are: npm, pnpm, or yarn.`)
  process.exit(1)
}
// 使用的包管理器
 const usedPM = whichPMRuns()
 // 希望使用的包管理器 不相等，则报错。
// - npm  提示使用 npm install
// - pnpm 提示使用 pnpm install
// - yarn 提示使用 yarn install
// 最后退出进程
if (usedPM && usedPM.name !== wantedPM) {
  const boxenOpts = { borderColor: 'red', borderStyle: 'double', padding: 1 }
  switch (wantedPM) {
    case 'npm':
      console.log(boxen('Use "npm install" for installation in this project', boxenOpts))
      break
    case 'pnpm':
      console.log(boxen(`Use "pnpm install" for installation in this project.

If you don't have pnpm, install it via "npm i -g pnpm".
For more details, go to https://pnpm.js.org/`, boxenOpts))
      break
    case 'yarn':
      console.log(boxen(`Use "yarn" for installation in this project.

If you don't have Yarn, install it via "npm i -g yarn".
For more details, go to https://yarnpkg.com/`, boxenOpts))
      break
  }
  process.exit(1)
}
```


## which-pm-runs 当前运行的是哪一个包管理器

最终返回包管理器和版本号。

根据调试可知，`process.env.npm_config_user_agent` 是类似这样的字符串。

```typescript 
function pkgFromUserAgent(userAgent: string | undefined) {
    if (!userAgent) return undefined
    const pkgSpec = userAgent.split(' ')[0]
    const pkgSpecArr = pkgSpec.split('/')
    return {
        name: pkgSpecArr[0],
        version: pkgSpecArr[1],
    }
}

pkgFromUserAgent(process.env.npm_config_user_agent)
```
