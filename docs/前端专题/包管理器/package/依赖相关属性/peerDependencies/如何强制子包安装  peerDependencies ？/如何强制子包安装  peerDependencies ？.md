# **如何强制子包安装 ****`peerDependencies`****？**

## 目录

- [方法 1：手动添加到子包的 dependencies](#方法-1手动添加到子包的dependencies)
- [方法 2：使用工具特定配置](#方法-2使用工具特定配置)
- [方法 3：通过 postinstall 脚本自动安装](#方法-3通过-postinstall-脚本自动安装)
- [monorepo](#monorepo)

#### 方法 1：手动添加到子包的 `dependencies`

```json 
{
  "dependencies": {
    "react": "^18.0.0"  # 将 peer 依赖显式声明为普通依赖
  }
}
```


- **缺点**：可能导致版本冲突（如主应用和子包各自安装不同版本）。

#### 方法 2：使用工具特定配置

- ∙**Yarn Berry**：在 `.yarnrc.yml` 中启用：

```yaml 
peerDependencyRules:
  autoInstall: true
```


​**​PNPM​**​：在 `.npmrc` 中设置（不推荐）：

```bash 
auto-install-peers=true
```


#### 方法 3：通过 postinstall 脚本自动安装

```json 
{
  "scripts": {
    "postinstall": "npm install react@^18.0.0"
  }
}
```


- **风险**：可能破坏主应用的依赖管理。

#### monorepo

1. **主应用统一管理**： &#x20;

   在根目录的 `package.json` 中显式声明所有 `peerDependencies`，确保子包共享同一版本。

```json 
{
  "dependencies": {
    "react": "^18.0.0"  # 主应用安装后，子包的 peer 依赖自动满足
  }
}
```


2.**子包声明为 `peerDependencies`**：
子包的 `package.json`：

```json 
{
  "peerDependencies": {
    "react": "^18.0.0"
  }
}
```
