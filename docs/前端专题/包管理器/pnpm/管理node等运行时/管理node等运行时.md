# 管理node等运行时

## 目录

- [1.引入devEngines.runtime](#1引入devEnginesruntime)
- [2.深入底层：lockfile](#2深入底层lockfile)
  - [总结](#总结)

升级[pnpm 10.14](https://pnpm.io/blog/releases/10.14 "pnpm 10.14")，即可将 node/deno/bun 等 runtime 视作为项目 devDependencies 写入 lockfile 来进行管理 node 版本

```json 
{
  "devEngines": {
    "runtime": {
      "name": "node",
      "version": "^24.4.0",
      "onFail": "download"
    }
  }
}
```


```json 
{
  "devEngines": {
    "runtime": {
      "name": "bun",
      "version": "^1.2.0",
      "onFail": "download"
    }
  }
}
```


如果每个项目都采用 pnpm 并配置好了 devEngines，基本可以不使用 nvm/fnm，并且也不用频繁通过命令切换 node 版本，新人上手也不用再因为 node 版本不对而“屡屡踩坑”

# 1.引入`devEngines.runtime`

从 pnpm 10.14 版本开始，你可以在`package.json` 文件中使用这个新特性。其语法清晰明了：

```json 
// 在你的 package.json 文件中
{
  "name": "my-next-gen-project",
  "version": "1.0.0",
  // 用于声明开发时工具的新字段
  "devEngines": {
    "runtime": {
      "name": "node",        // 指定运行时："node"、"deno" 或 "bun"
      "version": "^20.11.0",  // 可以使用任何有效的 semver 范围
      "onFail": "download"  // 关键所在：告知 pnpm 在缺失时自动下载
    }
  }
}
```


这种配置带来了“零配置”的开发体验。开发者克隆仓库后，只需运行一个命令：`pnpm install`。仅此而已，没有第二步。pnpm 会读取`devEngines`块，获取正确的运行时，并使其可用。之后任何`pnpm run <script>` 命令都会自动使用这个由 pnpm 管理的、项目本地的 Node.js 版本来执行。对外部工具和 Shell 配置的需求被彻底消除了。

# 2.深入底层：lockfile

当执行`pnpm install` 时，会发生一系列精确的事件：

1. pnpm 解析`package.json`并识别出`devEngines.runtime` 字段。
2. 它将指定的语义化版本范围（例如`^20.11.0`）解析为当时 Node.js 官方发行版中可用的最新匹配版本（例如`20.15.1`）。
3. 它将相应的运行时二进制文件下载到 pnpm 管理的一个位置。
4. **关键步骤**：pnpm 将*确切*的解析后版本（`20.15.1`）和一个该二进制文件的加密校验和（完整性哈希）直接记录到`pnpm-lock.yaml` 文件中。

这正是该功能的核心。锁文件将运行时版本从`.nvmrc`文件中的一个模糊建议，转变为一个确定性的、可验证的项目依赖。`.nvmrc`文件相当于在说：“你应该使用某个 20.x 版本的 Node.js。” 而`pnpm-lock.yaml`文件则做出了一个具有约束力的声明：“你**必须**使用 Node.js 版本 20.15.1，并且这里是它的确切校验和，以证明你拥有的二进制文件与我生成此锁文件时所用的文件逐位相等。”

这种机制提供了外部管理器模型根本无法企及的可复现性。它完全消除了开发者之间、本地机器与 CI 服务器之间，甚至是同一台机器上相隔数月的两次`pnpm install` 之间的版本漂移。锁文件成为了整个项目环境（包括运行它的引擎）的唯一且不容置疑的真相来源。

**💡优势**

1. **铁板钉钉的可复现性**：锁文件保证了团队中的每个成员和每个 CI/CD 流水线都使用逐位相同的 Node.js 版本，从而消除了“在我机器上可以运行”这一整类令人头疼的 bug。
2. **增强的安全性**：存储在锁文件中的完整性校验和充当了一种安全机制。它确保了下载的运行时二进制文件在传输过程中没有被损坏或被恶意篡改，为软件供应链安全提供了传统外部管理器所不具备的关键保护层 (19)。
3. **极致的简洁性与深度集成**：这种方法移除了整整一类工具（`nvm`,`fnm`）以及与之相关的 Shell 设置和配置的复杂性。版本管理机制被无缝地集成到开发者已经用于管理所有其他依赖项的包管理器中。这极大地简化了新开发者的入职流程和 CI/CD 流水线的配置。
4. **固有的灵活性与面向未来**：该功能支持 semver 范围，允许项目以受控的方式自动接收非破坏性的补丁更新。它从设计之初就支持 Deno 和 Bun 等其他 JavaScript 运行时。更重要的是，它允许在 pnpm 工作空间（workspace）内为每个包指定不同的运行时版本，这是在仓库根目录使用单一`.nvmrc` 文件所无法实现的粒度。

## 总结

> 该特性起源于[devengines-field-proposal](https://github.com/openjs-foundation/package-metadata-interoperability-collab-space/blob/main/devengines-field-proposal.md "devengines-field-proposal")，npm 中也有相关介绍[devEngines | npm](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devengines "devEngines | npm")，但 pnpm 将其实现的很完美！
