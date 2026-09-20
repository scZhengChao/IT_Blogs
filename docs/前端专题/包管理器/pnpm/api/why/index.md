# why

## 目录

- [🎯 作用](#-作用)
- [✅ 使用示例](#-使用示例)

用于查找某个依赖包被安装的原因，即它是由哪个直接依赖引入的，或者为什么它存在于当前项目中。

```markdown 
pnpm why <package-name>
# 或者
pnpm explain <package-name>
```


> `pnpm why`和`pnpm explain`是等价的，可以互换使用。

***

## 🎯 作用

- 查看某个包为什么被安装（是被哪个依赖引入的）
- 查看该包在依赖树中的位置
- 帮助分析依赖关系，排查“为什么这个包会出现在我的项目中”的问题

***

## ✅ 使用示例

假设你有一个项目，里面安装了很多依赖，你想知道`lodash`是怎么被引入的：

```bash 
pnpm why lodash
```


输出可能类似如下：

```yaml 
dependencies:
- react-scripts 5.0.1 [dev]
  - @pmmmwh/react-refresh-webpack-plugin 0.5.7 [dev]
    - react-refresh 0.14.0 [dev]
      - lodash 4.17.21
```


这表示：

- `lodash`是被`react-refresh`依赖的
- `react-refresh`是被`@pmmmwh/react-refresh-webpack-plugin`依赖的
- `@pmmmwh/react-refresh-webpack-plugin`是被`react-scripts`依赖的
- `react-scripts`是你项目的 devDependency
