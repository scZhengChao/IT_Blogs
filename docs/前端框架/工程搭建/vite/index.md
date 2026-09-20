# vite

## 目录

- [package.json](#packagejson)
- [模版](#模版)
- [主流程 init 函数拆分](#主流程-init-函数拆分)
  - [输出的目标路径](#输出的目标路径)
    - [延伸函数 formatTargetDir](#延伸函数-formatTargetDir)
  - [prompts 询问项目名、选择框架，选择框架变体等](#prompts-询问项目名选择框架选择框架变体等)
  - [重写已有目录/或者创建不存在的目录](#重写已有目录或者创建不存在的目录)
    - [延伸函数 emptyDir](#延伸函数-emptyDir)
  - [获取模板路径](#获取模板路径)
  - [执行创建函数](#执行创建函数)
    - [延伸函数 pkgFromUserAgent](#延伸函数-pkgFromUserAgent)
  - [写入文件函数](#写入文件函数)
    - [延伸函数 copy && copyDir](#延伸函数-copy--copyDir)
  - [根据模板路径的文件写入目标路径](#根据模板路径的文件写入目标路径)
  - [打印安装完成后的信息](#打印安装完成后的信息)
    - [延伸的 setupReactSwc 函数](#延伸的-setupReactSwc-函数)

[ vite 3.0 都发布了，经常初始化 vite 项目，却不知 create-vite 原理？揭秘！ - 掘金 这篇文章就来带领大家一起学习npm create vite原理，源码400行不到。 学会开发脚手架工具。 很多源码不是我们想象中的那么高深莫测。源码不应该成为我们的拦路虎，而应该是我们的良师益友 https://juejin.cn/post/7125199469796130853](https://juejin.cn/post/7125199469796130853 " vite 3.0 都发布了，经常初始化 vite 项目，却不知 create-vite 原理？揭秘！ - 掘金 这篇文章就来带领大家一起学习npm create vite原理，源码400行不到。 学会开发脚手架工具。 很多源码不是我们想象中的那么高深莫测。源码不应该成为我们的拦路虎，而应该是我们的良师益友 https://juejin.cn/post/7125199469796130853")

[ vite/index.ts at 896475dc6c7e5f1168e21d556201a61659552617 · vitejs/vite Next generation frontend tooling. It's fast! Contribute to vitejs/vite development by creating an account on GitHub. https://github.com/vitejs/vite/blob/896475dc6c7e5f1168e21d556201a61659552617/packages/create-vite/src/index.ts](https://github.com/vitejs/vite/blob/896475dc6c7e5f1168e21d556201a61659552617/packages/create-vite/src/index.ts " vite/index.ts at 896475dc6c7e5f1168e21d556201a61659552617 · vitejs/vite Next generation frontend tooling. It's fast! Contribute to vitejs/vite development by creating an account on GitHub. https://github.com/vitejs/vite/blob/896475dc6c7e5f1168e21d556201a61659552617/packages/create-vite/src/index.ts")

vite源码；400多行

[ vite/index.ts at d59e1acc2efc0307488364e9f2fad528ec57f204 · vitejs/vite Next generation frontend tooling. It's fast! Contribute to vitejs/vite development by creating an account on GitHub. https://github.com/vitejs/vite/blob/d59e1acc2efc0307488364e9f2fad528ec57f204/packages/create-vite/src/index.ts#L195](https://github.com/vitejs/vite/blob/d59e1acc2efc0307488364e9f2fad528ec57f204/packages/create-vite/src/index.ts#L195 " vite/index.ts at d59e1acc2efc0307488364e9f2fad528ec57f204 · vitejs/vite Next generation frontend tooling. It's fast! Contribute to vitejs/vite development by creating an account on GitHub. https://github.com/vitejs/vite/blob/d59e1acc2efc0307488364e9f2fad528ec57f204/packages/create-vite/src/index.ts#L195")

## package.json

```typescript 
{
  "name": "create-vite",
  "version": "3.0.0",
  "type": "module",
  "bin": {
    "create-vite": "index.js",
    "cva": "index.js"
  },
  "main": "index.js",
  "engines": {
    "node": "^14.18.0 || >=16.0.0"
  },
}

```


`type` 类型指定为 `module` 说明是 `ES Module`。 `bin` 可执行命令为 `create-vite` 或 别名 `cva`。 我们可以知道主文件 `index.js`。 代码限制了较高版本的`Nodejs`。

## 模版

```typescript 
const FRAMEWORKS: Framework[] = [
    {
        name: 'vanilla',
        display: 'Vanilla',
        color: yellow,
        variants: [
            {
                name: 'vanilla',
                display: 'JavaScript',
                color: yellow,
            },
            {
                name: 'vanilla-ts',
                display: 'TypeScript',
                color: blue,
            },
        ],
    },
    {
        name: 'vue',
        display: 'Vue',
        color: green,
        variants: [
            {
                name: 'vue',
                display: 'JavaScript',
                color: yellow,
            },
            {
                name: 'vue-ts',
                display: 'TypeScript',
                color: blue,
            },
            {
                name: 'custom-create-vue',
                display: 'Customize with create-vue ↗',
                color: green,
                customCommand: 'npm create vue@latest TARGET_DIR',
            },
            {
                name: 'custom-nuxt',
                display: 'Nuxt ↗',
                color: lightGreen,
                customCommand: 'npm exec nuxi init TARGET_DIR',
            },
        ],
    },
    {
        name: 'react',
        display: 'React',
        color: cyan,
        variants: [
            {
                name: 'react',
                display: 'JavaScript',
                color: yellow,
            },
            {
                name: 'react-ts',
                display: 'TypeScript',
                color: blue,
            },
            {
                name: 'react-swc',
                display: 'JavaScript + SWC',
                color: yellow,
            },
            {
                name: 'react-swc-ts',
                display: 'TypeScript + SWC',
                color: blue,
            },
        ],
    },
    {
        name: 'preact',
        display: 'Preact',
        color: magenta,
        variants: [
            {
                name: 'preact',
                display: 'JavaScript',
                color: yellow,
            },
            {
                name: 'preact-ts',
                display: 'TypeScript',
                color: blue,
            },
        ],
    },
    {
        name: 'lit',
        display: 'Lit',
        color: lightRed,
        variants: [
            {
                name: 'lit',
                display: 'JavaScript',
                color: yellow,
            },
            {
                name: 'lit-ts',
                display: 'TypeScript',
                color: blue,
            },
        ],
    },
    {
        name: 'svelte',
        display: 'Svelte',
        color: red,
        variants: [
            {
                name: 'svelte',
                display: 'JavaScript',
                color: yellow,
            },
            {
                name: 'svelte-ts',
                display: 'TypeScript',
                color: blue,
            },
            {
                name: 'custom-svelte-kit',
                display: 'SvelteKit ↗',
                color: red,
                customCommand: 'npm create svelte@latest TARGET_DIR',
            },
        ],
    },
    {
        name: 'others',
        display: 'Others',
        color: reset,
        variants: [
            {
                name: 'create-vite-extra',
                display: 'create-vite-extra ↗',
                color: reset,
                customCommand: 'npm create vite-extra@latest TARGET_DIR',
            },
        ],
    },
]
```


## 主流程 init 函数拆分

```typescript 
// 高版本的node支持，node 前缀
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// 解析命令行的参数 链接：https://npm.im/minimist
import minimist from 'minimist'
// 询问选择之类的  链接：https://npm.im/prompts
import prompts from 'prompts'
// 终端颜色输出的库 链接：https://npm.im/kolorist
import {
  blue,
  cyan,
  green,
  lightRed,
  magenta,
  red,
  reset,
  yellow
} from 'kolorist'

// Avoids autoconversion to number of the project name by defining that the args
// non associated with an option ( _ ) needs to be parsed as a string. See #4606
const argv = minimist(process.argv.slice(2), { string: ['_'] })
// 当前 Nodejs 的执行目录
const cwd = process.cwd()

// 主函数内容省略，后文讲述
async function init() {}
init().catch((e) => {
  console.error(e)
})
```


### 输出的目标路径

```typescript 
// 命令行第一个参数，替换反斜杠 / 为空字符串
let targetDir = formatTargetDir(argv._[0])

// 命令行参数 --template 或者 -t
let template = argv.template || argv.t

const defaultTargetDir = 'vite-project'
// 获取项目名
const getProjectName = () =>
targetDir === '.' ? path.basename(path.resolve()) : targetDir
```


#### 延伸函数 formatTargetDir

替换反斜杠 `/` 为空字符串。

```typescript 
function formatTargetDir(targetDir) {
  return targetDir?.trim().replace(/\/+$/g, '')
}

```


### prompts 询问项目名、选择框架，选择框架变体等

[prompts](https://link.juejin.cn/?target=https://npm.im/prompts "prompts") 根据用户输入选择，代码有删减。

```typescript 
let result: prompts.Answers<
        'projectName' | 'overwrite' | 'packageName' | 'framework' | 'variant'
        >

    try {
        result = await prompts(
            [
                {
                    type: argTargetDir ? null : 'text',
                    name: 'projectName',
                    message: reset('Project name:'),
                    initial: defaultTargetDir,
                    onState: (state) => {
                        targetDir = formatTargetDir(state.value) || defaultTargetDir
                    },
                },
                {
                    type: () =>
                        !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm',
                    name: 'overwrite',
                    message: () =>
                        (targetDir === '.'
                            ? 'Current directory'
                            : `Target directory "${targetDir}"`) +
                        ` is not empty. Remove existing files and continue?`,
                },
                {
                    type: (_, { overwrite }: { overwrite?: boolean }) => {
                        if (overwrite === false) {
                            throw new Error(red('✖') + ' Operation cancelled')
                        }
                        return null
                    },
                    name: 'overwriteChecker',
                },
                {
                    type: () => (isValidPackageName(getProjectName()) ? null : 'text'),
                    name: 'packageName',
                    message: reset('Package name:'),
                    initial: () => toValidPackageName(getProjectName()),
                    validate: (dir) =>
                        isValidPackageName(dir) || 'Invalid package.json name',
                },
                {
                    type:
                        argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
                    name: 'framework',
                    message:
                        typeof argTemplate === 'string' && !TEMPLATES.includes(argTemplate)
                            ? reset(
                                `"${argTemplate}" isn't a valid template. Please choose from below: `,
                            )
                            : reset('Select a framework:'),
                    initial: 0,
                    choices: FRAMEWORKS.map((framework) => {
                        const frameworkColor = framework.color
                        return {
                            title: frameworkColor(framework.display || framework.name),
                            value: framework,
                        }
                    }),
                },
                {
                    type: (framework: Framework) =>
                        framework && framework.variants ? 'select' : null,
                    name: 'variant',
                    message: reset('Select a variant:'),
                    choices: (framework: Framework) =>
                        framework.variants.map((variant) => {
                            const variantColor = variant.color
                            return {
                                title: variantColor(variant.display || variant.name),
                                value: variant.name,
                            }
                        }),
                },
            ],
            {
                onCancel: () => {
                    throw new Error(red('✖') + ' Operation cancelled')
                },
            },
        )
    } catch (cancelled: any) {
        console.log(cancelled.message)
        return
    }

    // user choice associated with prompts
    const { framework, overwrite, packageName, variant } = result
```


### 重写已有目录/或者创建不存在的目录

```typescript 
// user choice associated with prompts
const { framework, overwrite, packageName, variant } = result

// 目录
const root = path.join(cwd, targetDir)

if (overwrite) {
    // 删除文件夹
    emptyDir(root)
} else if (!fs.existsSync(root)) {
    // 新建文件夹
    fs.mkdirSync(root, { recursive: true })
}
```


#### 延伸函数 emptyDir

递归删除文件夹，相当于 `rm -rf xxx`。

```typescript 
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true })
  }
}
```


### 获取模板路径

[https://github.com/vitejs/vite/tree/d59e1acc2efc0307488364e9f2fad528ec57f204/packages/create-vite](https://github.com/vitejs/vite/tree/d59e1acc2efc0307488364e9f2fad528ec57f204/packages/create-vite "https://github.com/vitejs/vite/tree/d59e1acc2efc0307488364e9f2fad528ec57f204/packages/create-vite")

![](./assets/image/image_Pvp-TPcX1W.png)

```typescript 
// determine template
template = variant || framework || template

console.log(`\nScaffolding project in ${root}...`)

const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    '..',
    `template-${template}`
)
```


### 执行创建函数

```typescript 
const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent)
    const pkgManager = pkgInfo ? pkgInfo.name : 'npm'
    const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')

    const { customCommand } =
    FRAMEWORKS.flatMap((f) => f.variants).find((v) => v.name === template) ?? {}

    if (customCommand) {
        const fullCustomCommand = customCommand
            .replace('TARGET_DIR', targetDir)
            .replace(/^npm create/, `${pkgManager} create`)
            // Only Yarn 1.x doesn't support `@version` in the `create` command
            .replace('@latest', () => (isYarn1 ? '' : '@latest'))
            .replace(/^npm exec/, () => {
                // Prefer `pnpm dlx` or `yarn dlx`
                if (pkgManager === 'pnpm') {
                    return 'pnpm dlx'
                }
                if (pkgManager === 'yarn' && !isYarn1) {
                    return 'yarn dlx'
                }
                // Use `npm exec` in all other cases,
                // including Yarn 1.x and other custom npm clients.
                return 'npm exec'
            })

        const [command, ...args] = fullCustomCommand.split(' ')
        const { status } = spawn.sync(command, args, {
            stdio: 'inherit',
        })
        process.exit(status ?? 0)
    }
```


#### 延伸函数 pkgFromUserAgent

统一项目中包管理器的使用; npm/yarn   版本号

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


### 写入文件函数

```typescript 
const write = (file, content) => {
    // renameFile
    const targetPath = renameFiles[file]
        ? path.join(root, renameFiles[file])
        : path.join(root, file)
    if (content) {
        fs.writeFileSync(targetPath, content)
    } else {
        copy(path.join(templateDir, file), targetPath)
    }
}
```


这里的 `renameFiles`，是因为在某些编辑器或者电脑上不支持`.gitignore`。

```typescript 
const renameFiles = {
  _gitignore: '.gitignore'
}

```


#### 延伸函数 copy && copyDir

如果是文件夹用 copyDir 拷贝

```typescript 
function copy(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

/**
 * @param {string} srcDir
 * @param {string} destDir
 */
function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}
```


### 根据模板路径的文件写入目标路径

`package.json` 文件单独处理。 它的名字为输入的 `packageName` 或者获取。

```typescript 
const files = fs.readdirSync(templateDir)
for (const file of files.filter((f) => f !== 'package.json')) {
    write(file)
}

const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), 'utf-8')
)

pkg.name = packageName || getProjectName()

write('package.json', JSON.stringify(pkg, null, 2))
```


### 打印安装完成后的信息

```typescript 
if (isReactSwc) {
        setupReactSwc(root, template.endsWith('-ts'))
    }

    console.log(`\nDone. Now run:\n`)
    if (root !== cwd) {
        console.log(`  cd ${path.relative(cwd, root)}`)
    }
    switch (pkgManager) {
        case 'yarn':
            console.log('  yarn')
            console.log('  yarn dev')
            break
        default:
            console.log(`  ${pkgManager} install`)
            console.log(`  ${pkgManager} run dev`)
            break
    }
    console.log()
```


#### 延伸的 setupReactSwc 函数

```typescript 
function setupReactSwc(root: string, isTs: boolean) {
    editFile(path.resolve(root, 'package.json'), (content) => {
        return content.replace(
            /"@vitejs\/plugin-react": ".+?"/,
            `"@vitejs/plugin-react-swc": "^3.0.0"`,
        )
    })
    editFile(
        path.resolve(root, `vite.config.${isTs ? 'ts' : 'js'}`),
        (content) => {
            return content.replace('@vitejs/plugin-react', '@vitejs/plugin-react-swc')
        },
    )
}
function editFile(file: string, callback: (content: string) => string) {
    const content = fs.readFileSync(file, 'utf-8')
    fs.writeFileSync(file, callback(content), 'utf-8')
}

```
