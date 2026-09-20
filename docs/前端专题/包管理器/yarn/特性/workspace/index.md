# workspace

## 目录

- [常用命令](#常用命令)
  - [添加依赖到指定 Workspace](#添加依赖到指定-Workspace)
  - [添加公共依赖（根目录）](#添加公共依赖根目录)
  - [删除依赖](#删除依赖)
  - [运行指定 Workspace 的脚本](#运行指定-Workspace-的脚本)
  - [全局运行所有 Workspaces 的脚本](#全局运行所有-Workspaces-的脚本)
  - [列出所有 Workspaces](#列出所有-Workspaces)
  - [添加依赖到指定 Workspace](#添加依赖到指定-Workspace)
  - [安装所有依赖（根目录）](#安装所有依赖根目录)
- [项目结构案例](#项目结构案例)
- [配置示例](#配置示例)
  - [根目录 package.json：](#根目录packagejson)
  - [子包 packages/utils/package.json：](#子包packagesutilspackagejson)

以下是 Yarn Workspace 的常用命令及使用案例，帮助你更好地管理多包项目：

### **常用命令**

##### **添加依赖到指定 Workspace**

```bash 
yarn workspace <workspace-name> add <package>
# 示例：为 `web-app` 包添加 lodash
yarn workspace web-app add lodash
```


##### **添加公共依赖（根目录）**

```markdown 
yarn add -W <package>
# 示例：根目录安装 TypeScript
yarn add -W typescript
```


##### **删除依赖**

```yaml 
yarn workspace <workspace-name> remove <package>
# 示例：删除 `utils` 包的 axios
yarn workspace utils remove axios
```


##### **运行指定 Workspace 的脚本**

```bash 
yarn workspace <workspace-name> run <script>
# 示例：运行 `admin` 包的 build 命令
yarn workspace admin run build
```


##### **全局运行所有 Workspaces 的脚本**

```bash 
yarn workspaces run <script>
# 示例：所有包执行 lint
yarn workspaces run lint
```


##### **列出所有 Workspaces**

```markdown 
yarn workspaces list
# 显示包名和路径
```


##### 添加依赖到指定 Workspace

```markdown 
yarn workspaces list
# 显示包名和路径
```


##### **安装所有依赖（根目录）**

```bash 
yarn install
# 自动链接 Workspace 之间的依赖
```


### **项目结构案例**

```markdown 
monorepo/
├── package.json          # 根目录，包含 workspaces 配置
├── packages/
│   ├── utils/            # 子包1
│   │   ├── package.json  # 名称: @monorepo/utils
│   │   └── src/index.ts
│   ├── web-app/          # 子包2
│   │   ├── package.json  # 名称: @monorepo/web-app
│   │   └── src/index.ts
│   └── admin/            # 子包3
│       ├── package.json  # 名称: @monorepo/admin
│       └── src/index.ts
```


### **配置示例**

##### **根目录 `package.json`**：

```json 
{
  "name": "monorepo",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "yarn workspaces run build",
    "dev": "yarn workspaces run dev"
  }
}
```


##### **子包 `packages/utils/package.json`**：

```json 
{
  "name": "@monorepo/utils",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21"  // 可被其他 Workspace 引用
  }
}
```
