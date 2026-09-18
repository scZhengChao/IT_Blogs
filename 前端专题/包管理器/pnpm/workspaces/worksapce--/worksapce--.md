# worksapce:\*

## 目录

- [1. dependencies中的 workspace:\*](#1dependencies中的workspace)
  - [示例](#示例)
- [2. devDependencies中的 workspace:\*](#2devDependencies中的workspace)
  - [示例](#示例)
- [3. 为什么会有这种差异？](#3-为什么会有这种差异)
- [4. 如何控制 workspace:\*的替换行为？](#4-如何控制workspace的替换行为)
  - [（1）强制替换 devDependencies中的 workspace:\*](#1强制替换devDependencies中的workspace)
  - [（2）保持 dependencies中的 workspace: \*（不替换）](#2保持dependencies中的workspace不替换)
- [5. 最佳实践](#5-最佳实践)

是的，在 **pnpm monorepo** 项目中，`devDependencies`和 `dependencies`对 `workspace:*`的处理方式确实有所不同：

***

## \*\*1. ​`dependencies`中的 \*\*​**`workspace:*`**

- **打包（** \*\*​`pnpm publish`\*\***或 ****`pnpm pack`****）时**：
  - `workspace:*`**会被替换成实际的版本号**（如 `"^1.0.0"`）。
  - **最终发布的包** 会从 **npm registry** 安装依赖（而不是本地 workspace）。
- **适用场景**：
  - 适用于 **正式发布的包**，确保用户安装时能正确解析依赖。

### **示例**

```json 
{
  "dependencies": {
    "shared-lib": "workspace:*"  // 打包时变成 "shared-lib": "^1.0.0"
  }
}
```


**打包后​**​：

```json 
{
  "dependencies": {
    "shared-lib": "^1.0.0"  // 从 npm 安装
  }
}
```


## \*\*2. ​`devDependencies`中的 \*\*​**`workspace:*`**

- **打包（** \*\*​`pnpm publish`\*\***或 ****`pnpm pack`****）时**：
  - `workspace:*`**不会被替换**，仍然保持原样。
  - **最终发布的包** 仍然依赖本地 workspace 的版本（可能导致问题，因为用户无法访问你的本地包）。
- **适用场景**：
  - 适用于 **本地开发**，但不适合发布到 npm（除非配合 `publishConfig`特殊配置）。

### **示例**

```json 
{
  "devDependencies": {
    "shared-lib": "workspace:*"  // 打包后仍然是 "workspace:*"
  }
}
```


**打包后​**​：

```json 
{
  "devDependencies": {
    "shared-lib": "workspace:*"  // 仍然指向本地 workspace
  }
}
```


## **3. 为什么会有这种差异？**

- **`dependencies`**：pnpm 假设你要发布到 npm，所以自动替换 `workspace:*`为具体版本，确保用户能正确安装。
- **`devDependencies`**：pnpm 认为 `devDependencies`主要用于开发环境，所以不自动替换 `workspace:*`（避免影响本地开发）。

***

## \*\*4. 如何控制 ​`workspace:*`\*\***的替换行为？**

### \*\*（1）强制替换 ​`devDependencies`中的 \*\*​**`workspace:*`**

如果你希望 `devDependencies`的 `workspace:*`也被替换（例如，某些 CI/CD 场景），可以：

- **手动修改 `package.json`**，或
- **使用 `pnpm publish --no-git-checks`**（但可能仍有默认行为）。

### （\*\*2）保持 `dependencies`\*\***中的 ****`workspace:*`****（不替换）**

如果你希望 `dependencies`仍然指向本地 workspace（例如，私有 monorepo），可以：

```json 
{
  "publishConfig": {
    "workspace": true  // 阻止自动替换 workspace:*
  }
}

```


这样，无论是 `dependencies`还是 `devDependencies`，`workspace:*`都不会被替换。

***

## **5. 最佳实践**

| 场景                      | 推荐做法                                                                 |
| ----------------------- | -------------------------------------------------------------------- |
| **发布到公共 npm**​          | 让 `dependencies`自动替换 `workspace: *`，`devDependencies`可保持原样（通常不影响用户）。 |
| **私有 monorepo（内部依赖）** ​ | 使用 `"publishConfig": { "workspace": true }`保持 `workspace: *`不变。      |
| **CI/CD 构建**​           | 检查 \`devDependencies\`是否影响构建，必要时手动替换版本号。                             |
