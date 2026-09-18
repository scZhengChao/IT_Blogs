# yorkie

## 目录

- [安装yorkie](#安装yorkie)
- [探究yorkie的实现原理](#探究yorkie的实现原理)

#### 安装`yorkie`

`yorkie`是Vue做者尤雨溪fork了`husky`并作了一些修改的工具，改善了一些使用体验，所这里咱们介绍一下[yorkie](http://www.javashuo.com/link?url=https://link.juejin.cn?target=https://github.com/yyx990803/yorkie "yorkie")。

```typescript 
$ npm install yorkie --save-dev
```


```typescript 
// package.json
{
    "gitHooks": {
      "pre-commit": "npm test",
      "commit-msg": "npm test",
      "...": "..."
    }
}
```


简单到看完配置就懂了吧，直接在`package.json`中增长`gitHooks`这一项，并**直接把想执行的shell语句写在里面便可**。

#### 探究`yorkie`的实现原理

在安装过yorkie以后，比对一下安装以前的hook文件，会发现yorkie直接重写了全部的hooks。因此咱们把`/.git/hooks/pre-commit`的核心代码贴出来看看yorkie作了什么：

```typescript 
has_hook_script () {
  [ -f package.json ] && cat package.json | grep -q "\"$1\"[[:space:]]*:"
}

cd "." 

# Check if pre-commit is defined, skip if not
has_hook_script pre-commit || exit 0

# Add common path where Node can be found
# Brew standard installation path /usr/local/bin
# Node standard installation path /usr/local
export PATH="$PATH:/usr/local/bin:/usr/local"

# Export Git hook params
export GIT_PARAMS="$*"

# Run hook
node "./node_modules/yorkie/src/runner.js" pre-commit || {
  echo
  echo "pre-commit hook failed (add --no-verify to bypass)"
  exit 1
}
```


忽略上面那些检查是否存在hook脚本的代码，最后执行了`node ./node_modules/yorkie/src/runner.js`：

```typescript 
const fs = require('fs')                                                                                                                                                                 
const path = require('path')
const execa = require('execa')

const cwd = process.cwd()
const pkg = fs.readFileSync(path.join(cwd, 'package.json'))
const hooks = JSON.parse(pkg).gitHooks // 将package.json重的hooks字段取出来
if (!hooks) { // 没有hook则退出
  process.exit(0)
}

const hook = process.argv[2] // 这里的process.argv[2]就是在hooks脚本里传过来的hook名称，如pre-commit
const command = hooks[hook]
if (!command) { // 不是当前hook则退出
  process.exit(0)
}

console.log(` > running ${hook} hook: ${command}`)
try {
  execa.shellSync(command, { stdio: 'inherit' }) // 使用execa.shellSync运行命令
} catch (e) {
  process.exit(1)
}
```


关于对`runner.js`的解析，我写到了注释中，应该都能看得懂。即经过（`npm install`时改写hooks --> 将hooks改成运行本身的runner --> runner依赖`package.json`）的方式，实现了将hooks信息保存在package.json中并能够经过git共享给全部项目成员。
