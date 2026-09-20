# 清楚缓存

## 目录

- [一、Npm](#一Npm)
  - [1、查看缓存路径](#1查看缓存路径)
  - [2、清除缓存](#2清除缓存)
- [二、Yarn](#二Yarn)
  - [1、查看缓存列表](#1查看缓存列表)
  - [2、查看缓存路径](#2查看缓存路径)
  - [3、清除缓存](#3清除缓存)
- [三、Pnpm](#三Pnpm)
  - [1、缓存路径](#1缓存路径)
  - [2、清除缓存](#2清除缓存)

### **一、Npm**

#### 1、查看缓存路径

要查看[npm](https://so.csdn.net/so/search?q=npm\&spm=1001.2101.3001.7020 "npm")的缓存路径，您可以执行以下命令：

```javascript 
npm config get cache
```


#### 2、清除缓存

要清除npm的缓存，可以执行以下命令：

```bash 
npm cache clean --force
```


> 注：这将清除npm缓存目录中的所有文件。需要注意的是，这可能会导致重新下载项目的依赖，因此在执行此命令之前，请确保您已备份了重要的依赖信息。

### 二、Yarn

![](https://i-blog.csdnimg.cn/blog_migrate/a48cd85c0eb274e813982176dc595323.png)

#### 1、查看缓存列表

要查看yarn的缓存列表，可以执行以下命令：

```bash 
yarn cache list
```


#### 2、查看缓存路径

要查看yarn的缓存路径，可以执行以下命令：

```bash 
yarn cache dir
```


#### 3、清除缓存

要清除yarn的缓存，可以执行以下命令：

```bash 
yarn cache clean
```


> 注：这将清除yarn缓存目录中的所有文件。和清除npm缓存一样，在执行此命令之前，请确保您已备份了重要的依赖信息。Yarn缓存文档

### 三、Pnpm

![](https://i-blog.csdnimg.cn/blog_migrate/094e4e2d56ee4c58eeb55e742394686d.png)

#### 1、缓存路径

要查看pnpm的缓存路径，可以执行以下命令：

```bash 
pnpm store path
```


> 您可以手动删除该路径下的文件，以清除pnpm的缓存。 注: 请注意，删除缓存文件后，pnpm可能会在未来的安装过程中速度变慢，因为它需要重新下载被删除的文件。

#### 2、清除缓存

要清除pnpm的缓存，可以执行以下命令：

```bash 
pnpm store prune
```


> 注：从存储中删除未引用的（无关的、孤立的）包。修剪商店无害，但可能降低未来安装的速度。有关未引用包的更多信息以及原因，请访问[Pnpm store文档](https://www.chengzz.com/?golink=aHR0cHM6Ly9wbnBtLmlvL2NsaS9zdG9yZQ== "Pnpm store文档")
