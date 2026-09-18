# --legacy-peer-deps

## 目录

- [1. npm 版本核心差异（v6 vs v7+）](#1-npm-版本核心差异v6-vs-v7)
- [2.--legacy-peer-deps 在 npm v7+ 中的具体行为](#2--legacy-peer-deps-在-npm-v7-中的具体行为)
  - [(1) 关闭自动安装 Peer Dependency](#1-关闭自动安装-Peer-Dependency)
  - [(2) 忽略 Peer Dependency 版本冲突](#2-忽略-Peer-Dependency-版本冲突)
  - [npm vs pnpm 中--legacy-peer-deps 的对比](#npm-vs-pnpm-中--legacy-peer-deps-的对比)

`--legacy-peer-deps`是 npm v7 引入的专属参数（npm v6 及更早无此参数），核心目的是让 npm v7+ 退回**npm v6 的 Peer Dependency 处理逻辑**，解决 npm v7 升级后因严格校验 Peer Dependency 导致的大量安装失败问题。

### 1. npm 版本核心差异（v6 vs v7+）

先明确 npm 原生对 Peer Dependency 的处理逻辑，这是理解`--legacy-peer-deps` 的基础：

| 版本      | 默认 Peer Dependency 处理逻辑                                              |
| ------- | -------------------------------------------------------------------- |
| npm v6  | 1\\. 不自动安装 Peer Dependency；2. 版本冲突仅警告，不中断安装；3. 校验宽松，兼容性优先            |
| npm v7+ | 1\\. 自动安装 Peer Dependency（核心变化）；2. 版本冲突直接抛出错误，中断安装；3. 严格遵循 semver 校验 |

### 2.`--legacy-peer-deps` 在 npm v7+ 中的具体行为

当你在 npm v7/v8/v9/v10 中使用`--legacy-peer-deps` 时，npm 会完全切换到 v6 的逻辑，具体表现为：

#### (1) 关闭自动安装 Peer Dependency

npm v7+ 默认会自动安装满足 Peer Dependency 版本要求的依赖，使用该参数后：

- 不再自动安装任何 Peer Dependency；
- 即使项目未声明某个包的 Peer Dependency，也仅输出警告（如`UNMET PEER DEPENDENCY`），不中断安装。

#### (2) 忽略 Peer Dependency 版本冲突

- 多个包对同一 Peer Dependency 要求不同版本（如 A 要 react\@17，B 要 react\@18）时，**不抛出错误**，仅输出警告；
- 跳过严格的 semver 版本校验，允许 “不兼容” 版本共存，优先保证依赖安装成功。

为了帮你区分，这里列出 npm 中与 Peer Dependency 相关的其他参数：

| 参数                     | 作用                                                    |   |
| ---------------------- | ----------------------------------------------------- | - |
| \`--legacy-peer-deps\` | 核心：退回 npm v6 逻辑，忽略版本冲突、不自动安装 Peer Dependency          |   |
| \`--strict-peer-deps\` | 强化校验：即使是可选 Peer Dependency，版本冲突也会报错（npm v8+ 支持）       |   |
| \`--force\`            | 强制安装：覆盖现有依赖，即使有冲突，但会修改锁文件，风险更高                        |   |
| \`--no-optional\`      | 不安装可选依赖，仅影响 optionalDependencies，与 Peer Dependency 无关 |   |

#### npm vs pnpm 中`--legacy-peer-deps` 的对比

1. **核心作用**：npm 中的`--legacy-peer-deps` 仅适用于 v7+ 版本，核心是让 npm 退回 v6 的宽松逻辑，关闭自动安装 Peer Dependency、忽略版本冲突，解决安装时的依赖树解析错误。
2. **使用场景**：和 pnpm 一致，仅适合老项目迁移、临时测试等场景，长期使用易导致运行时兼容性问题。
3. **与 pnpm 对比**：两者对该参数的实现逻辑基本对齐（均模拟 npm v6 行为）**，差异仅源于各自默认的 Peer Dependency 处理规则（如 pnpm v7+ 默认不自动安装，npm v7+ 默认自动安装）。**
