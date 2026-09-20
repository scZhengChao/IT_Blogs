# .npmrc

## 目录

- [什么是npmrc？](#什么是npmrc)
- [常见用法](#常见用法)
  - [1. 定义镜像源](#1-定义镜像源)
  - [2. 管理依赖的存储路径](#2-管理依赖的存储路径)
  - [3. 保存开发依赖](#3-保存开发依赖)
  - [4. 使用作用域包](#4-使用作用域包)
- [配置优先级](#配置优先级)

官网：

[   https://npm.nodejs.cn/cli/v11/configuring-npm/npmrc](https://npm.nodejs.cn/cli/v11/configuring-npm/npmrc "   https://npm.nodejs.cn/cli/v11/configuring-npm/npmrc")

## 什么是npmrc？

npmrc是npm（Node Package Manager）的配置文件，它位于用户主目录下的`.npmrc`文件或项目根目录下的`.npmrc`文件。npmrc文件由一系列键值对组成，用于配置npm在执行命令时的行为和参数。

**控制 npm 的行为，如注册表、代理、缓存路径等。**

```yaml 
# 包下载源
registry=https://registry.npmmirror.com

# 设置作用域包的私有仓库（如公司内部包）
@mycompany:registry=https://npm.mycompany.com

# 设置缓存目录路径（默认 ~/.npm）
cache=~/.custom-npm-cache

# 设置 HTTP 代理（根据实际情况替换）
proxy=http://127.0.0.1:8080

```


## 常见用法

### 1. 定义镜像源

在国内，由于网络限制，直接使用npm的官方源可能会导致依赖包下载速度缓慢或失败。通过在npmrc中配置镜像源，我们可以切换到国内镜像（淘宝镜像），提高依赖包的下载速度。例如，使用淘宝镜像源：

```markdown 
registry=https://registry.example.com/

```


同样的，有时候，我们可能需要将依赖包从私有源或其他第三方源获取，而不是默认的 npm 官方源。通过配置 `.npmrc`，可以指定特定的 registry 来获取依赖。

### 2. 管理依赖的存储路径

在默认情况下，npm将依赖安装到项目根目录下的`node_modules`文件夹中。但在某些情况下，我们可能希望将依赖安装到其他目录，例如统一管理全局依赖。这时，可以配置`prefix`来指定全局依赖的存储路径：

```yaml 
prefix=/path/to/global/node_modules

```


### 3. 保存开发依赖

当我们使用`npm install`安装一个开发依赖（如测试工具或构建工具）时，默认情况下npm不会将这些依赖保存到`package.json`的`devDependencies`中。如果希望自动保存这些依赖，可以开启`save-dev`配置：

```yaml 
save-dev=true

```


### 4. 使用作用域包

作用域包是一种有层次结构的npm软件包命名规范，通常用于将相关的模块组织在一起。如果我们希望将所有作用域包的下载路径指定到一个统一的目录，可以配置`@scope:registry`：

```yaml 
@myscope:registry=https://registry.example.com/

```


这在企业私有环境下也是非常常见的，比如需要安装cnpm镜像下的某个作用域包，可以指定其来源而不需要切换镜像。

## 配置优先级

npmrc的配置存在优先级，当我们在多个配置文件中定义相同的键时，npm将按照以下顺序查找和应用配置：

1. **项目级**（在项目的根目录下）
2. **用户级**（通常位于用户的家目录 `~/.npmrc`）
3. **全局级**（通常位于 `/etc/npmrc`或npm安装目录下）
4. **npm内置配置文件**

**注意：项目根目录下的**\*\*`.npmrc`\*\***文件优先级最高，它会覆盖用户主目录下的配置，而用户主目录下的配置又会覆盖npm的默认配置。**

在pnpm项目下，区分的更细致：

1. 每个项目的配置文件（`/path/to/my/project/.npmrc`）
2. 每个工作区的配置文件（包含 `pnpm-workspace.yaml` 文件的目录）
3. 每位用户的配置文件（ `~/.npmrc` ）
4. 全局配置文件（ `/etc/npmrc` ）
