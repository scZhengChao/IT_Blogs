# 和SameSite的区别

## 目录

- [1. 核心差异对比表](#1-核心差异对比表)
- [2. 工作方式对比](#2-工作方式对比)
  - [SameSite=Strict 的工作方式](#SameSiteStrict的工作方式)
  - [Partitioned 的工作方式](#Partitioned的工作方式)
- [3. 具体场景示例](#3-具体场景示例)
  - [场景：在线文档编辑器（如 Google Docs）](#场景在线文档编辑器如-Google-Docs)
    - [使用 SameSite=Strict](#使用SameSiteStrict)
    - [使用 Partitioned](#使用Partitioned)
- [4. 关键区别详解](#4-关键区别详解)
  - [4.1 本质不同](#41本质不同)
  - [4.2 使用前提不同](#42使用前提不同)
  - [4.3 覆盖范围不同](#43覆盖范围不同)
  - [4.4 实际效果矩阵](#44实际效果矩阵)
- [5. 为什么需要 Partitioned？](#5-为什么需要-Partitioned)
  - [传统方案的困境](#传统方案的困境)
  - [Partitioned 的平衡](#Partitioned-的平衡)
- [6. 实际应用决策树](#6-实际应用决策树)
- [8. 总结](#8-总结)

## 1. 核心差异对比表

| 特性        | \`SameSite=Strict\`     | \`Partitioned\`        |
| --------- | ----------------------- | ---------------------- |
| **主要目的**​ | 防止 CSRF 攻击，限制 Cookie 发送 | 隐私保护，防止跨站追踪            |
| **作用机制**​ | 控制 Cookie \*\*何时发送\*\*  | 控制 Cookie \*\*如何存储\*\* |
| **默认行为**​ | 完全不发送跨站请求               | 允许发送但存储隔离              |
| **使用场景**​ | 第一方 Cookie，用户直接访问       | 第三方 Cookie，嵌入内容        |
| **兼容性**​  | 主流浏览器都支持                | Chrome 115+，逐步推广中      |

## 2. 工作方式对比

### `SameSite=Strict` 的工作方式

```http 
Set-Cookie: session=abc; SameSite=Strict; Secure
```


- **严格限制**：Cookie 仅在同站请求中发送
- **完全不发跨站**：即使是用户点击链接的导航请求也不发送
- **结果**：如果用户从 email 点击链接访问你的站点，该 Cookie 不会被发送

### `Partitioned` 的工作方式

```http 
Set-Cookie: widget_session=xyz; SameSite=None; Secure; Partitioned
```


- **存储分区**：Cookie 按顶级站点分区存储
- **允许发送**：在同一顶级站点的跨站上下文中可以发送
- **结果**：你的小部件可以在不同站点的 iframe 中工作，但数据隔离

## 3. 具体场景示例

### 场景：在线文档编辑器（如 Google Docs）

假设：

- 文档服务：`docs.example.com`
- 用户访问：`school.edu`（该站点嵌入了文档编辑器）

#### 使用 `SameSite=Strict`

```html 
Set-Cookie: doc_session=123; SameSite=Strict; Secure
```


**问题**：

- 当 `school.edu` 嵌入 `docs.example.com` 的 iframe 时
- 浏览器**不会发送**这个 Cookie
- **结果**：编辑器无法识别用户，功能失效 ❌

#### 使用 `Partitioned`

```http 
Set-Cookie: doc_session=123; SameSite=None; Secure; Partitioned
```


**工作原理**：

1. Cookie 存储在 `school.edu` 的分区中
2. 仅在 `school.edu` 站点的 iframe 中可用
3. `docs.example.com` 可以读取此 Cookie
4. **结果**：编辑器能识别用户，但不能跨站点追踪 ✅

## 4. 关键区别详解

### 4.1 **本质不同**

- `SameSite`：**发送策略**（要不要发这个 Cookie）
- `Partitioned`：**存储策略**（这个 Cookie 存在哪里）

### 4.2 **使用前提不同**

```markdown 
# SameSite=Strict - 自相矛盾，无意义
Set-Cookie: example=1; SameSite=Strict; SameSite=None ❌

# Partitioned - 必须配合 SameSite=None
Set-Cookie: example=1; SameSite=None; Partitioned ✅
```


### 4.3 **覆盖范围不同**

![](./image/image_7Yo0GEFnAN.png)

### 4.4 **实际效果矩阵**

| 用户场景                                                       | SameSite=Strict | SameSite=None (传统) | SameSite=None + Partitioned |
| ---------------------------------------------------------- | --------------- | ------------------ | --------------------------- |
| 直接访问 \[example.com]\(<https://example.com/> "example.com") | ✅ Cookie 发送     | ✅ Cookie 发送        | ✅ Cookie 发送                 |
| 从其他站点点击链接访问                                                | ❌ \*\*不发送\*\*   | ✅ 发送               | ✅ 发送                        |
| 在其他站点的 iframe 中                                            | ❌ \*\*不发送\*\*   | ✅ 发送，\*\*全局共享\*\*  | ✅ 发送，\*\*分区隔离\*\*           |
| 隐私保护效果                                                     | 好（但功能受限）        | 差（可跨站追踪）           | 好（平衡功能与隐私）                  |

## 5. 为什么需要 Partitioned？

### 传统方案的困境

```javascript 
// 问题：要么完全禁止，要么完全放开
if (useThirdPartyCookie) {
    // 方案1: SameSite=None（隐私风险）
    // 方案2: SameSite=Strict（功能失效）
}
```


### Partitioned 的平衡

```javascript 
// 新方案：平衡功能与隐私
setCookie({
    value: 'user_data',
    sameSite: 'none',    // 允许跨站使用
    partitioned: true,   // 但存储隔离
    secure: true
});
```


## 6. 实际应用决策树

![](./image/image_Cj6IGujeOx.png)

## 8. 总结

**`SameSite=Strict`**：

- **优点**：安全性高，防止 CSRF
- **缺点**：**完全阻断**第三方上下文的功能
- **适用**：纯第一方应用，不需要嵌入的场景

**`Partitioned`**：

- **优点**：**既允许功能**，又**防止追踪**
- **缺点**：浏览器支持仍在推广中
- **适用**：需要在不同站点嵌入的服务

**简单来说**：

- 如果你的服务**永远不被嵌入** → 用 `SameSite=Strict`
- 如果你的服务**需要被嵌入**且要**保护隐私** → 用 `Partitioned`
- `Partitioned` 不是替代 `SameSite`，而是**补充和完善**第三方 Cookie 的安全模型
