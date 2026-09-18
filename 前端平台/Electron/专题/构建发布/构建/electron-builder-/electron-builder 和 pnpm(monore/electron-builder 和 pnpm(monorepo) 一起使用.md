# electron-builder 和 pnpm(monorepo) 一起使用

## 目录

- [Issues](#Issues)

一般使用 [pnpm](https://so.csdn.net/so/search?q=pnpm\&spm=1001.2101.3001.7020 "pnpm") 的 electron 项目结构如下：

```markdown 
+ packages/
  + app # electron 文件夹
  + web # web端的文件夹
  ...其他项目
.npmrc
package.json
pnpm-workspace.yaml

```


`pnpm-workspace.yaml` 设置如下

```yaml 
packages:
    # all packages in subdirs of packages/ and components/
    - "packages/**"
    # 排除 electron-builder 生成的 app
    - "!**/dist/**"

```


`.npmrc` 设置如下，详情请看： [https://www.electron.build/index.html#note-for-pnpm](https://www.electron.build/index.html#note-for-pnpm "https://www.electron.build/index.html#note-for-pnpm")

```yaml 
node-linker=hoisted

```


所以打包的步骤为：

1.`web项目` 打包生成到 `app项目`下的 `public` 文件夹
2.`app项目` 使用 `electron-builder` 打包

***

只要设置了 `node-linker=hoisted` ，pnpm 就会形成扁平化的结构，然后 electron-builder 会自动寻找依赖进行打包，不需要考虑会有冗余的包出现。

# Issues

[ Added package missing from workspace \`node\_modules\` when using \`node-linker\` set to \`hoisted\` · Issue #4834 · pnpm/pnpm · GitHub Potentially a duplicate/variant of #4642, not quite sure. When the node-linker setting is set to hoisted, when adding a dependency using pnpm add, the added dependency is not present in the workspace  https://github.com/pnpm/pnpm/issues/4834](https://github.com/pnpm/pnpm/issues/4834 " Added package missing from workspace `node_modules` when using `node-linker` set to `hoisted` · Issue #4834 · pnpm/pnpm · GitHub Potentially a duplicate/variant of #4642, not quite sure. When the node-linker setting is set to hoisted, when adding a dependency using pnpm add, the added dependency is not present in the workspace  https://github.com/pnpm/pnpm/issues/4834")

[ Issue with node-linker=hoisted and shared-workspace-lockfile=false · Issue #4222 · pnpm/pnpm · GitHub Unfortunately, I have found that this bug still can be reproduced using pnpm@6.25.1 with a slightly different configuration of .npmrc: node-linker = hoisted shared-workspace-lockfile = false Here is a https://github.com/pnpm/pnpm/issues/4222](https://github.com/pnpm/pnpm/issues/4222 " Issue with node-linker=hoisted and shared-workspace-lockfile=false · Issue #4222 · pnpm/pnpm · GitHub Unfortunately, I have found that this bug still can be reproduced using pnpm@6.25.1 with a slightly different configuration of .npmrc: node-linker = hoisted shared-workspace-lockfile = false Here is a https://github.com/pnpm/pnpm/issues/4222")

```yaml 
node-linker = hoisted
shared-workspace-lockfile = false

```
