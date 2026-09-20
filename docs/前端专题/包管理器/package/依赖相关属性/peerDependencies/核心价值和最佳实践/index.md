# **核心价值和最佳实践**

## 目录

- [核心价值：](#核心价值)
- [最佳实践](#最佳实践)

# **核心价值**：

1. **避免重复安装**
   - 声明"**我的库需要宿主环境已安装的依赖**"
   - **防止宿主项目和你库中的 React 同时存在两份**
2. **版本冲突预防**
   - **明确兼容版本范围**（如`^16.8.0`）
   - **如果宿主环境不满足会显示警告**
3. **框架插件场景**
   - Vue/React 插件必须与主框架同版本
   - 比如 Vuex 需要与 Vue 主版本匹配

`peerDependencies`是`package.json`中的依赖项,可以**解决核心库被下载多次**，以及**统一核心库版本的问**题。

`peerDependencies`的存在，**主要是期望宿主应用安装这些依赖**，让**相同依赖不会在宿主应用和库中被重复安装。**

**同伴依赖**，一种特殊的依赖，**不会被自动安装**，通常用于表示**与另一个包的依赖与兼容性关系来警示使用者。**

比如我们安装 A，A 的正常使用依赖 [B@2.x](https://link.juejin.cn?target=mailto:B@2.x "B@2.x") 版本，那么 [B@2.x](https://link.juejin.cn?target=mailto:B@2.x "B@2.x") 就应该被列在 A 的 `peerDependencies` 下，**表示“如果你使用我，那么你也需要安装 B，并且至少是 2.x 版本”。**

比如 React 组件库 Ant Design，它的 package.json 里 peerDependencies 为

```typescript 
"peerDependencies": {
  "react": ">=16.9.0",
  "react-dom": ">=16.9.0"
}
```


表示如果你使用 Ant Design，那么你的项目也应该安装 react 和 react-dom，并且版本需要大于等于 16.9.0。

# 最佳实践

1. **库开发使用 peerDependencies**

```json 
{
  "peerDependencies": {
    "react": ">=16.8.0"
  },
  "peerDependenciesMeta": {
    "react": { "optional": true } // 可选依赖
  }
}
```


1. **Monorepo 项目使用 pnpm**

```markdown 
# 根目录安装，所有子包共享
pnpm add lodash -w

```


1. **版本控制技巧**

```json 
// 子包的 package.json
{
  "dependencies": {
    "shared-utils": "workspace:*" // 直接引用本地包
  }
}
```


正确使用共享依赖机制可以显著提升项目管理效率，避免常见的依赖地狱问题。
