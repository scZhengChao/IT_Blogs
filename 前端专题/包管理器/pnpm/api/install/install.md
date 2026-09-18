# install

## 目录

- [将子项目安装为其它子项目的依赖
  ](#将子项目安装为其它子项目的依赖)
- [从当前已有的 node\_modules 中为子项目安装依赖](#从当前已有的-node_modules-中为子项目安装依赖)
- [安装子项目开发依赖](#安装子项目开发依赖)
- [安装子项目依赖](#安装子项目依赖)
- [安装为所有项目依赖](#安装为所有项目依赖)
- [安装root依赖](#安装root依赖)

将子项目安装为其它子项目的依赖

```bash 
pnpm install @ebee/common -r --filter @ebee/pc @ebee/mobile
```


# 从当前已有的 node\_modules 中为子项目安装依赖

```bash 

pnpm install react redux react-redux -r --filter @ebee/pc --prefer-offline


```


# 安装子项目开发依赖

```bash 
pnpm install react redux react-redux -r -D --filter @ebee/pc
```


# 安装子项目依赖

```bash 
pnpm install react redux react-redux -r --filter @ebee/pc
```


# 安装为所有项目依赖

```markdown 

pnpm install react redux react-redux -r

```


# 安装root依赖

```bash 
pnpm install rimraf -w
```
