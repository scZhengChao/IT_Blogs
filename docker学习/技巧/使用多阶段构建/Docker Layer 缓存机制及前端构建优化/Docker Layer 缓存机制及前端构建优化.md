# Docker Layer 缓存机制及前端构建优化

## 目录

- [Docker Layer 缓存机制](#Docker-Layer-缓存机制)
  - [1. 分层存储原理](#1-分层存储原理)
  - [2. 缓存工作流程](#2-缓存工作流程)
  - [3. 缓存失效条件](#3-缓存失效条件)
- [前端构建如何优化利用缓存](#前端构建如何优化利用缓存)
  - [1. 基本原则](#1-基本原则)
  - [2. 优化策略](#2-优化策略)
    - [示例优化后的 Dockerfile (React/Vue 项目为例)：](#示例优化后的-Dockerfile-ReactVue-项目为例)
  - [3. 具体优化技巧](#3-具体优化技巧)
- [高级缓存技术](#高级缓存技术)
- [验证缓存效果](#验证缓存效果)

## Docker Layer 缓存机制

### 1. 分层存储原理

Docker 镜像由**一系列只读层（Layer）组成**，每个层代表 Dockerfile 中的一条指令：

- **每个层只存储与上一层的差异部分**
- 层是堆叠的，最终形成完整的文件系统
- **层是内容寻址的，相同内容生成相同的哈希值**

### 2. 缓存工作流程

1. Docker 按顺序执行 Dockerfile 指令
2. 对每条指令，Docker 检查是否存在可重用的缓存层
3. 如果找到缓存层，直接使用而不重新执行
4. 当**某条指令不能使用缓存时，其后的所有指令都不会使用缓存**

### 3. 缓存失效条件

- `Dockerfile` **指令内容发生变化**
- 构建上下文**中的文件发生变化（如 COPY/ADD 的文件）**
- **基础镜像更新（FROM 指令）**
- **前一条指令的缓存失效导致后续指令失效**
- **明确使用**`--no-cache`参数

## 前端构建如何优化利用缓存

### 1. 基本原则

1. **将变化频率低的层放在前面**
2. **将变化频率高的层放在后面**
3. **合理拆分构建步骤**

### 2. 优化策略

#### 示例优化后的 Dockerfile (React/Vue 项目为例)：

```docker 
# 阶段1: 依赖安装 - 变化频率较低
FROM node:16-alpine as builder

# 先单独拷贝 package.json 文件
WORKDIR /app
COPY package.json package-lock.json ./

# 安装依赖 - 这层会被缓存直到package.json变化
RUN npm ci

# 阶段2: 构建应用 - 变化频率中等
COPY tsconfig.json vite.config.js ./
COPY src ./src
COPY public ./public

# 构建应用 - 这层会在源代码变化时重建
RUN npm run build

# 阶段3: 生产镜像 - 变化频率高
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制nginx配置 - 这层会在配置变化时重建
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```


### 3. 具体优化技巧

1. **多阶段构建**：
   - 分离开发依赖与运行时
   - 最终镜像只包含必要内容
2. **合理排序 COPY 指令**：

```docker 
# 错误的顺序 - 任何文件变化都会导致npm install重新执行
COPY . .
RUN npm install

# 正确的顺序 - 只有package.json变化才会触发npm install
COPY package.json package-lock.json ./
RUN npm install
COPY . .
```


1. **使用**\*\*`.dockerignore`\*\*：

```markdown 
node_modules
.git
.DS_Store
*.md
Dockerfile
.dockerignore
```


1. **锁定依赖版本**：
   - 使用`npm ci`而不是`npm install`
   - 确保`package-lock.json`或`yarn.lock`被正确复制
2. **利用构建工具缓存**：

```docker 
# 对于Webpack/Vite等工具，可以单独缓存依赖
ENV NODE_ENV=production

# 如果构建工具支持缓存目录
RUN --mount=type=cache,target=/app/node_modules/.cache npm run buil2
```


1. **基础镜像选择**：
   - 使用官方镜像的特定版本标签
   - 选择轻量级基础镜像如 alpine

## 高级缓存技术

1. **BuildKit 缓存**：

```markdown 
# 启用BuildKit
DOCKER_BUILDKIT=1 docker build --build-arg BUILDKIT_INLINE_CACHE=1 -t your-image .

# 后续构建可以重用缓存
docker build --cache-from your-image .
```


1. **缓存挂载**：

```docker 
RUN --mount=type=cache,target=/root/.npm \
    npm install
```


1. **远程缓存**：
   - 可以将缓存层推送到registry供团队共享
   - 使用`--cache-to`和`--cache-from`参数

## 验证缓存效果

1. 查看构建过程：

```docker 
docker build -t your-app .
```


1. 分析镜像层：

```docker 
docker history your-app
```


1. 测量构建时间：

```docker 
time docker build -t your-app .
```
