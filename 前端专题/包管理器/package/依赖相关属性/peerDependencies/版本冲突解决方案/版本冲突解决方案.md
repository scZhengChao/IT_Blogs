# 版本冲突解决方案

## 目录

- [解决方法：](#解决方法)
  - [使用pnpm.overrides强制统一版本（推荐）](#使用pnpmoverrides强制统一版本推荐)

你遇到的错误 ​**​`ERR_PNPM_PEER_DEP_ISSUES: Unmet peer dependencies`​**​ 是 ​**​pnpm​**​ 在安装依赖时检测到 ​**​Peer Dependencies（对等依赖）****版本不匹配****​**​ 的警告。与 npm/yarn 不同，​**​pnpm 对 Peer Dependencies 的检查更严格​**​，默认情况下会直接报错（而不是像 npm v7+ 那样自动安装或仅警告）

**pnpm 默认严格检查 Peer Dependencies**，如果宿主项目（你的项目）没有安装声明的 Peer Dependency，或者版本不匹配，就会直接报错：

## **解决方法：**

第一种：

在项目的 package.json 中配置 peerDependencyRules 忽略对应的警告提示：

```javascript 
 "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": ["react"]
    }
  }
```


第二种：

如果确认版本差异不会导致问题，可以通过`--shamefully-hoist`或`--strict-peer-dependencies=false`临时忽略检查：

在 .npmrc 配置文件中添加 strict-peer-dependencies=false ，这意味着将关闭严格的对等依赖模式。操作命令如下：

```javascript 
npm config set strict-peer-dependencies=false
```


### **使用**\*\*`pnpm.overrides`\*\***强制统一版本（推荐）**

如果依赖冲突复杂（如多个库要求不同版本的`react`），可以在`package.json`中使用`pnpm.overrides`强制所有依赖使用同一版本：

```json 
{
  "pnpm": {
    "overrides": {
      "react": "18.2.0",  # 强制所有依赖使用 react@18.2.0
      "react-dom": "18.2.0"
    }
  }
}
```


然后重新安装依赖：`pnpm install`
