# env-cmd

## 目录

- [从默认.env文件加载变量](#从默认env文件加载变量)
- [指定自定义.env文件路径](#指定自定义env文件路径)
- [加载多个.env文件](#加载多个env文件)
- [使用环境变量目录](#使用环境变量目录)
- [忽略.env文件（仅用系统变量）](#忽略env文件仅用系统变量)
- [在跨平台脚本中使用](#在跨平台脚本中使用)
- [4. 与dotenv的区别](#4-与dotenv的区别)
- [5. 常见问题](#5-常见问题)
  - [变量未生效？](#变量未生效)
  - [安全提示](#安全提示)
- [6. 示例项目](#6-示例项目)
  - [文件结构](#文件结构)
  - [package.json配置](#packagejson配置)

[ env-cmd - npm Executes a command using the environment variables in an env file. Latest version: 10.1.0, last published: 5 years ago. Start using env-cmd in your project by running \`npm i env-cmd\`. There are 429 ot https://www.npmjs.com/package/env-cmd](https://www.npmjs.com/package/env-cmd " env-cmd - npm Executes a command using the environment variables in an env file. Latest version: 10.1.0, last published: 5 years ago. Start using env-cmd in your project by running `npm i env-cmd`. There are 429 ot https://www.npmjs.com/package/env-cmd")

`env-cmd`是一个 Node.js 工具，用于从`.env`文件加载环境变量并运行命令。它特别适合在开发环境中管理不同的环境配置（如开发、测试、生产）。以下是`env-cmd`的详细使用指南：

### **从默认**\*\*`.env`\*\***文件加载变量**

假设项目根目录有`.env`文件：

```yaml title="env"
API_KEY=12345
NODE_ENV=development
```


运行命令时加载这些变量：

```javascript 
npx env-cmd node app.js
```


或直接在`package.json`的脚本中使用：

```json 
{
  "scripts": {
    "start": "env-cmd node app.js"
  }
}
```


### **指定自定义**\*\*`.env`\*\***文件路径**

如果文件不是`.env`（例如`.env.production`），可通过`-f`指定：

```bash 
npx env-cmd -f .env.production node app.js
```


或在`package.json`中

```json 
{
  "scripts": {
    "start:prod": "env-cmd -f .env.production node app.js"
  }
}
```


### **加载多个**\*\*`.env`\*\***文件**

合并多个文件（优先级从右到左）

```bash 
npx env-cmd -f .env,.env.local node app.js
```


### **使用环境变量目录**

将变量分环境存储（如`envs/development.env`）：

```bash 
npx env-cmd -e development node app.js
```


文件结构：

```markdown 
envs/
  development.env
  production.env
```


### **忽略**\*\*`.env`\*\***文件（仅用系统变量）**

```bash 
npx env-cmd --no-env node app.js
```


### **在跨平台脚本中使用**

`Windows `和 `Unix `系统的变量语法不同，`env-cmd`可统一处理。例如：

```json 
{
  "scripts": {
    "start": "env-cmd react-scripts start"
  }
}
```


## **4. 与**\*\*`dotenv`\*\***的区别**

- `dotenv`：需在代码中调用`require('dotenv').config()`，仅适用于 Node.js 应用。
- `env-cmd`：直接在命令行中注入变量，适用于任何命令（如测试、构建工具等）。

## **5. 常见问题**

### **变量未生效？**

1. 检查文件路径是否正确（默认是项目根目录的`.env`）。
2. 确保变量名无拼写错误（如`API_KEY`不是`APIKEY`）。

### **安全提示**

- 不要将`.env`文件提交到 Git（添加到`.gitignore`）。
- 生产环境建议使用服务器环境变量（如 AWS Secrets Manager）。

## **6. 示例项目**

### **文件结构**

```text 
project/
  .env
  .env.production
  app.js
  package.json
```


### \*\*`package.json`\*\***配置**

```json 
{
  "scripts": {
    "dev": "env-cmd node app.js",
    "prod": "env-cmd -f .env.production node app.js"
  }
}
```


运行命令：

```javascript 
npm run dev   # 使用 .env
npm run prod  # 使用 .env.production
```


通过`env-cmd`，你可以灵活管理不同环境配置，避免硬编码敏感信息。适合现代 Node.js、React、Vue 等全栈项目。
