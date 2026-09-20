# peerDependencies

## 目录

- [--legacy-peer-deps](#--legacy-peer-deps)
  - [npm install xxxx --legacy-peer-deps命令是什么？为什么可以解决下载时候产生的依赖冲突呢？](#npm-install-xxxx---legacy-peer-deps命令是什么为什么可以解决下载时候产生的依赖冲突呢)
- [V6前的逻辑](#V6前的逻辑)
- [恢复旧行为的方法](#恢复旧行为的方法)

# `--legacy-peer-deps`

### `npm install xxxx --legacy-peer-deps`命令是什么？为什么可以解决下载时候产生的依赖冲突呢？

`npm install xxxx --legacy-peer-deps`命令与其说是告诉npm要去干什么，不如说是告诉npm不要去干什么。

`legacy`的意思：遗产/（软件或硬件）已过时但因使用范围广而难以替代的；而`npm install xxxx --legacy-peer-deps`命令用于绕过`peerDependency`**里依赖的自动安装**；它告诉`npm`**忽略项目中**引入的**各个依赖模块之间依赖相同但版本不同的问题**，以**npm v3-v6**的方式去继续执行安装操作。

所以其实该**命令并没有真的解决冲突，而是忽略了冲突，以“过时”（v3-v6）的方式进行下载操作。**

# V6前的逻辑

**npm v6 逻辑**：

1. 检查 peerDependencies
2. 如果不存在，**自动安装最新兼容版本**
3. 显示警告，但继续执行

**npm v7+ 逻辑**：

1. 检查 peerDependencies
2. 如果不存在，**直接报错失败**
3. 用户必须显式安装

# 恢复旧行为的方法

使用 `--legacy-peer-deps` 可以恢复到v6前的逻辑

```markdown 
# 临时恢复 v6 行为
npm install react-plugin --legacy-peer-deps

# 全局配置
npm config set legacy-peer-deps true
npm install react-plugin  # 现在会像 v6 一样自动安装
```


使用 `--force` 或 `--strict-peer-deps=false`

```markdown 
# 强制安装（不推荐）
npm install react-plugin --force

# 关闭严格模式
npm install --strict-peer-deps=false react-plugin
```


[版本冲突解决方案](./版本冲突解决方案/index.md "版本冲突解决方案")

[pnpm  Peer Dependency 处理方式的版本演进](<./pnpm对等依赖演进/index.md> "pnpm  Peer Dependency 处理方式的版本演进")

[核心价值和最佳实践](./核心价值和最佳实践/index.md "核心价值和最佳实践")

[如何强制子包安装  peerDependencies ？](<./强制安装对等依赖/index.md> "如何强制子包安装  peerDependencies ？")
