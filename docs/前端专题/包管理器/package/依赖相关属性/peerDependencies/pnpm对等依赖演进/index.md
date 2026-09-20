# pnpm  Peer Dependency 处理方式的版本演进

## 目录

- [1. pnpm v4 及更早版本（核心：严格模式，无自动安装）](#1-pnpm-v4-及更早版本核心严格模式无自动安装)
- [2. pnpm v5 - v6（核心：引入自动安装，可配置）](#2-pnpm-v5---v6核心引入自动安装可配置)
- [3. pnpm v7+（核心：默认关闭自动安装，更严格）](#3-pnpm-v7核心默认关闭自动安装更严格)
- [关键配置与实操示例](#关键配置与实操示例)
  - [1. 全局配置（.npmrc）](#1-全局配置npmrc)
  - [2. 命令行临时覆盖](#2-命令行临时覆盖)
  - [3. 手动解决 Peer Dependency 冲突](#3-手动解决-Peer-Dependency-冲突)
- [总结](#总结)

pnpm 对 Peer Dependency 的处理逻辑经历了几次重要调整，核心变化集中在**自动安装行为**和**冲突处理** 上，以下按版本阶段梳理：

#### 1. pnpm v4 及更早版本（核心：严格模式，无自动安装）

- **核心规则**：完全遵循 npm\@3+ 的 Peer Dependency 规范，**不会自动安装 Peer Dependency**。
- **行为表现**：
  - 如果项目未显式安装某个包的 Peer Dependency，pnpm 会直接抛出清晰的警告（如`UNMET PEER DEPENDENCY`），但不会主动安装缺失的依赖。
  - 要求开发者手动在项目的`package.json` 中声明所有需要的 Peer Dependency，否则依赖可能无法正常工作。
  - 示例：若包 A 声明`peerDependencies: { react: ">=16.8.0" }`，而你的项目未安装 react，pnpm v4 会警告，但不会自动下载 react。

#### 2. pnpm v5 - v6（核心：引入自动安装，可配置）

- **核心规则**：默认开启 Peer Dependency 自动安装，但保留配置项可关闭，同时优化了依赖解析逻辑。
- **行为表现**：
  - **自动安装**：默认情况下，pnpm 会自动安装满足 Peer Dependency 版本要求的依赖（优先选最新兼容版本），无需手动声明。
  - **冲突处理**：如果多个包对同一个 Peer Dependency 有版本冲突（如 A 要求 react\@17，B 要求 react\@18），pnpm 会抛出错误，要求手动解决版本冲突（需在项目中显式声明统一版本）。
  - **配置项**：可通过`.npmrc`中的`auto-install-peers`配置控制：
    - `auto-install-peers=true`（默认）：自动安装 Peer Dependency；
    - `auto-install-peers=false`：退回 v4 的严格模式，仅警告不安装。
  - 示例：包 A 依赖 react@>=16.8.0，项目未安装 react 时，pnpm v5 会自动安装最新的 react\@18（若兼容）。

#### 3. pnpm v7+（核心：默认关闭自动安装，更严格）

- **核心规则**：**默认关闭自动安装 Peer Dependency**，回归严格模式，但保留手动开启的选项，同时优化了警告信息和冲突提示。
- **行为表现**：
  - **默认行为**：和 v4 一致，仅抛出警告，不自动安装 Peer Dependency。
  - **手动开启**：如需自动安装，需显式在`.npmrc`中设置`auto-install-peers=true`。
  - **优化点**：
    - 警告信息更详细，会明确指出哪个包依赖了哪个未安装的 Peer Dependency，以及版本要求；
    - 对 Peer Dependency 版本冲突的提示更清晰，给出具体的版本冲突原因和解决建议。
  - **特殊场景**：如果 Peer Dependency 是`optional`（可选对等依赖），pnpm 不会抛出警告，也不会安装。

### 关键配置与实操示例

#### 1. 全局配置（.npmrc）

```yaml 
# pnpm v7+ 默认关闭自动安装，开启需手动设置
auto-install-peers=true

# 可选：强制忽略 Peer Dependency 警告（不推荐）
strict-peer-dependencies=false
```


#### 2. 命令行临时覆盖

```markdown 
# 临时开启自动安装 Peer Dependency（单次命令）
pnpm install --auto-install-peers

# 临时关闭严格模式（忽略冲突警告）
pnpm install --strict-peer-dependencies=false
```


#### 3. 手动解决 Peer Dependency 冲突

若项目中包 A 要求`react@^17`，包 B 要求`react@^18`，pnpm 会报错，解决方式：

```json 
// 项目 package.json 中显式声明统一版本
{
  "dependencies": {
    "react": "^18.0.0" // 强制所有包使用此版本
  }
}
```


### 总结

1. **核心变化**：pnpm 对 Peer Dependency 的处理从「严格不自动安装」（v4）→「默认自动安装」（v5-v6）→「默认严格不自动安装」（v7+），核心是回归更严谨的依赖管理，避免自动安装导致的版本混乱。
2. **关键配置**：`auto-install-peers`是控制自动安装的核心开关，v7+ 需手动开启；`strict-peer-dependencies` 控制是否忽略冲突警告（不推荐关闭）。
3. **最佳实践**：优先手动在项目`package.json`中声明 Peer Dependency，明确版本，避免依赖自动安装带来的不可控问题；仅在简单项目中临时开启`auto-install-peers`。
