# npm dist-tag&#x20;

## 目录

- [1. 基本命令格式](#1-基本命令格式)
- [2. 你的具体场景](#2-你的具体场景)
  - [示例：](#示例)
- [3. 为什么需要这个操作？](#3-为什么需要这个操作)
  - [常见场景：](#常见场景)
  - [实际案例：](#实际案例)
- [4. npm 默认标签行为](#4-npm-默认标签行为)
  - [默认规则：](#默认规则)
  - [标签类型示例：](#标签类型示例)
- [5. 完整操作流程](#5-完整操作流程)
  - [步骤 1：查看当前标签](#步骤-1查看当前标签)
  - [步骤 2：更新标签](#步骤-2更新标签)
  - [步骤 3：验证结果](#步骤-3验证结果)
- [6. 权限要求](#6-权限要求)
  - [需要以下权限之一：](#需要以下权限之一)
  - [检查权限：](#检查权限)
- [7. 常见问题与解决方案](#7-常见问题与解决方案)
  - [问题 1：权限不足](#问题-1权限不足)
  - [问题 2：标签已存在](#问题-2标签已存在)
  - [问题 3：版本不存在](#问题-3版本不存在)
- [8. 自动化脚本示例](#8-自动化脚本示例)
  - [脚本 1：自动标记最新稳定版](#脚本-1自动标记最新稳定版)
  - [脚本 2：安全检查后标记](#脚本-2安全检查后标记)
- [9. 在 CI/CD 中的使用](#9-在-CICD-中的使用)
  - [GitHub Actions 示例：](#GitHub-Actions-示例)
- [10. 最佳实践](#10-最佳实践)
  - [标签策略建议：](#标签策略建议)
  - [常用标签约定：](#常用标签约定)
  - [验证命令：](#验证命令)
- [总结](#总结)

## 1. 基本命令格式

```markdown 
# 查看包的标签
npm dist-tag ls [<package-name>]

# 添加/设置标签
npm dist-tag add <package-name>@<version> <tag>

# 删除标签
npm dist-tag rm <package-name> <tag>
```


## 2. 你的具体场景

你想将最新正式版本标记为 `latest` 标签：

```markdown 
# 将指定版本标记为 latest
npm dist-tag add @xxxx/xxxx-xxx@x.x.x latest
```


### 示例：

```bash 
npm dist-tag add @myorg/mypackage@1.2.3 latest
```


## 3. 为什么需要这个操作？

### 常见场景：

1. **修复错误的标签**：之前错误地将测试版标记为 `latest`
2. **版本回滚后**：需要将旧稳定版重新标记为 `latest`
3. **多标签管理**：维护不同渠道的版本（如 `stable`、`beta`、`next`）

### 实际案例：

```markdown 
# 错误发布了 beta 版本作为 latest
$ npm publish --tag latest  # 不小心发布了 2.0.0-beta.1

# 需要纠正：将 1.2.3 设为 latest
$ npm dist-tag add mypackage@1.2.3 latest
```


## 4. npm 默认标签行为

### 默认规则：

- **`npm publish`**\*\* → 自动标记为 \*\*​**`latest`**
- `npm publish --tag beta` → 标记为 `beta`，不影响 `latest`
- **`npm install <package>`**\*\* → 默认安装 ****`latest`**** 标签的版本\*\*

### 标签类型示例：

```markdown 
# 发布稳定版（默认 latest）
npm publish

# 发布测试版（标记为 beta）
npm publish --tag beta

# 发布下一个主要版本预览
npm publish --tag next
```


## 5. 完整操作流程

### 步骤 1：查看当前标签

```markdown 
# 查看指定包的标签
npm dist-tag ls @xxxx/xxxx-xxx

# 输出示例：
latest: 1.2.3
beta: 2.0.0-beta.1
next: 2.0.0-alpha.3
```


### 步骤 2：更新标签

```markdown 
# 将指定版本设为 latest
npm dist-tag add @xxxx/xxxx-xxx@1.2.3 latest

# 如果需要，也可以设置其他标签
npm dist-tag add @xxxx/xxxx-xxx@2.0.0-beta.1 beta
npm dist-tag add @xxxx/xxxx-xxx@2.0.0-alpha.3 next
```


### 步骤 3：验证结果

```markdown 
# 再次查看确认
npm dist-tag ls @xxxx/xxxx-xxx

# 或使用 npm info 查看
npm info @xxxx/xxxx-xxx
```


## 6. 权限要求

### 需要以下权限之一：

1. **包的拥有者**（owner）
2. **包的维护者**（maintainer）
3. **组织的管理员**（对于 scoped package）

### 检查权限：

```markdown 
# 查看包的所有者
npm owner ls @xxxx/xxxx-xxx

# 添加协作者
npm owner add <username> @xxxx/xxxx-xxx
```


## 7. 常见问题与解决方案

### 问题 1：权限不足

```markdown 
# 错误：需要认证
npm ERR! need auth auth required for publishing
npm ERR! need auth You need to authorize this machine using `npm adduser`

# 解决：
npm login
# 输入用户名、密码、邮箱
```


### 问题 2：标签已存在

```markdown 
# 如果 latest 标签已指向其他版本
# 直接运行 add 命令会覆盖，无需先删除
npm dist-tag add @xxxx/xxxx-xxx@1.2.3 latest
```


### 问题 3：版本不存在

```markdown 
# 确保版本号正确且已发布
npm view @xxxx/xxxx-xxx versions
```


## 8. 自动化脚本示例

### 脚本 1：自动标记最新稳定版

```bash 
#!/bin/bash
# tag-latest.sh

PACKAGE="@xxxx/xxxx-xxx"

# 获取最新稳定版（排除预发布版本）
LATEST_STABLE=$(npm view $PACKAGE versions --json | \
  node -e "console.log(JSON.parse(require('fs').readFileSync(0, 'utf-8')).filter(v => !v.includes('-')).pop())")

if [ -z "$LATEST_STABLE" ]; then
  echo "没有找到稳定版本"
  exit 1
fi

echo "将 $PACKAGE@$LATEST_STABLE 标记为 latest"
npm dist-tag add $PACKAGE@$LATEST_STABLE latest
```


### 脚本 2：安全检查后标记

```bash 
#!/bin/bash
# safe-tag-latest.sh

PACKAGE="@xxxx/xxxx-xxx"
VERSION="$1"

if [ -z "$VERSION" ]; then
  echo "请指定版本号"
  echo "用法: $0 <version>"
  exit 1
fi

# 检查版本是否存在
if ! npm view $PACKAGE@$VERSION version > /dev/null 2>&1; then
  echo "错误：版本 $VERSION 不存在"
  exit 1
fi

# 确认操作
read -p "将 $PACKAGE@$VERSION 设为 latest？(y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  npm dist-tag add $PACKAGE@$VERSION latest
  echo "完成！"
  npm dist-tag ls $PACKAGE
fi
```


## 9. 在 CI/CD 中的使用

### GitHub Actions 示例：

```yaml 
# .github/workflows/tag-release.yml
name: Tag Release

on:
  release:
    types: [published]

jobs:
  tag-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Tag as latest
        if: github.event.release.prerelease == false
        run: |
          VERSION="${{ github.event.release.tag_name }}"
          npm dist-tag add @xxxx/xxxx-xxx@${VERSION#v} latest
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          
      - name: Tag as next (for pre-releases)
        if: github.event.release.prerelease == true
        run: |
          VERSION="${{ github.event.release.tag_name }}"
          npm dist-tag add @xxxx/xxxx-xxx@${VERSION#v} next
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```


## 10. 最佳实践

### 标签策略建议：

1. **保持 ****`latest`**** 为稳定版**：用户期望的行为
2. **预发布版本使用其他标签**：`beta`、`rc`、`next`
3. **定期清理旧标签**：删除不再需要的标签
4. **文档化标签策略**：团队内部明确约定

### 常用标签约定：

| 标签         | 用途        | 示例版本              |
| ---------- | --------- | ----------------- |
| \`latest\` | 最新稳定版     | \`1.2.3\`         |
| \`beta\`   | 测试版       | \`2.0.0-beta.1\`  |
| \`rc\`     | 发布候选      | \`2.0.0-rc.1\`    |
| \`next\`   | 下一个主要版本预览 | \`2.0.0-alpha.1\` |
| \`legacy\` | 旧版本维护分支   | \`0.9.x\`         |

### 验证命令：

```markdown 
# 查看用户安装时会得到哪个版本
npm info @xxxx/xxxx-xxx dist-tags

# 模拟用户安装
npm pack @xxxx/xxxx-xxx@latest --dry-run
```


## 总结

你需要的命令是：

```bash 
npm dist-tag add @xxxx/xxxx-xxx@x.x.x latest
```
