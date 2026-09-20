# packages

## 目录

- [yarn](#yarn)
  - [一、核心作用拆解](#一核心作用拆解)
    - [1. 定义工作区范围（最核心）](#1-定义工作区范围最核心)
    - [2. 实现「依赖共享」与「软链接」](#2-实现依赖共享与软链接)
    - [3. 统一管理脚本与命令](#3-统一管理脚本与命令)
    - [4. 约束发布与版本管理](#4-约束发布与版本管理)
  - [二、典型配置示例](#二典型配置示例)
    - [路径匹配规则说明：](#路径匹配规则说明)
  - [三、关键注意事项](#三关键注意事项)
  - [四、对比：没有workspaces.packages 会怎样？](#四对比没有workspacespackages-会怎样)
- [问题](#问题)

# yarn

在 Yarn Workspace（Yarn 工作区）的 monorepo 架构中，根目录`package.json`里的`workspaces.packages`是**核心配置项**，它的核心作用是**告诉 Yarn 哪些目录属于 monorepo 中的「工作区子包」**，Yarn 会基于这个配置识别、管理这些子包的依赖和脚本，是实现 monorepo 高效管理的关键。

### 一、核心作用拆解

#### 1. 定义工作区范围（最核心）

`workspaces.packages`是一个**路径匹配数组**，Yarn 会扫描这些路径下的所有包含`package.json` 的目录，将其标记为「工作区子包」。

- 比如配置`["packages/*"]`，Yarn 会识别`packages/`下的`packages/frontend`、`packages/utils`、`packages/components`等所有子目录（只要有`package.json`）；
- 未被匹配的目录不会被纳入工作区管理，Yarn 不会处理其依赖 / 脚本。

#### 2. 实现「依赖共享」与「软链接」

这是 monorepo 的核心优势，依赖`workspaces.packages` 才能实现：

- **内部包软链接**：如果子包 A 依赖子包 B（如`frontend`依赖`utils`），Yarn 不会去 npm 下载`utils`，而是直接在`node_modules`中创建`utils`的软链接（指向本地`packages/utils`），修改`utils` 代码会实时生效，无需手动发布 / 安装；
- **根目录依赖提升**：多个子包共用的依赖（如`react`、`eslint`）会被 Yarn 自动安装到根目录的`node_modules`，避免重复安装，节省磁盘空间。

#### 3. 统一管理脚本与命令

配置`workspaces.packages` 后，你可以在根目录执行跨子包的命令：

- 比如`yarn workspace @your-org/utils build`（只执行`utils`包的`build` 脚本）；
- 或`yarn workspaces run test`（执行所有子包的`test` 脚本）；
- Yarn 能精准识别哪些目录是子包，从而正确执行这些命令。

#### 4. 约束发布与版本管理

当使用`yarn publish`或版本管理工具（如`lerna`、`changesets`）时，工具会基于`workspaces.packages` 识别需要发布的子包，避免误操作非工作区目录。

### 二、典型配置示例

```json 
// 根目录 package.json
{
  "name": "your-monorepo-root",
  "private": true, // 必须设为 true，避免根包被意外发布
  "workspaces": {
    "packages": [
      "packages/*", // 匹配 packages/ 下所有子目录（核心）
      "apps/*",     // 可选：匹配 apps/ 下的应用项目（如前端应用、后端服务）
      "!packages/*/node_modules" // 排除不需要的目录（! 是排除符）
    ]
  }
}
```


#### 路径匹配规则说明：

- `packages/*`：匹配`packages/`下的一级子目录（如`packages/utils`，但不匹配`packages/utils/sub`）；
- `packages/**`：匹配`packages/` 下所有层级的子目录（递归匹配）；
- `!xxx`：排除指定路径（比如排除`node_modules`、`dist` 等非源码目录）。

### 三、关键注意事项

1. **必须设置**\*\*`private: true`\*\*：根目录的`package.json`一定要加`"private": true`，否则 Yarn 会提示错误（避免根包被发布到 npm）；
2. **子包必须有**\*\*`package.json`\*\*：只有包含`package.json` 的目录才会被 Yarn 识别为工作区子包；
3. **和 Yarn 版本的兼容**：
   - Yarn 1.x（Classic）：使用`workspaces`数组简写（如`"workspaces": ["packages/*"]`），也支持`workspaces.packages`；
   - Yarn 2+/3+（Berry）：推荐用`workspaces.packages`，支持更灵活的路径匹配；
4. **依赖安装逻辑**：执行`yarn install`时，Yarn 会先扫描`workspaces.packages` 定义的子包，解析所有子包的依赖，再统一安装 / 链接，而非逐个安装子包。

### 四、对比：没有`workspaces.packages` 会怎样？

- Yarn 无法识别子包，每个子包需要单独执行`yarn install`，无法共享依赖；
- 子包之间的相互依赖需要手动发布到 npm 或本地 link，开发效率极低；
- 无法在根目录执行跨子包的脚本命令，管理成本大幅增加。

# 问题

[不需要在子应用的package.json里显示声明其他子包；也可以直接在子应用导入使用吗；原理是什么](./不需要在子应用的package.json里显示声明其他子包；/不需要在子应用的package.json里显示声明其他子包；也可以直接在子应用导入使用吗；原理是什么.md "不需要在子应用的package.json里显示声明其他子包；也可以直接在子应用导入使用吗；原理是什么")
