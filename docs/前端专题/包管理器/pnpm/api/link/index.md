# link

## 目录

- [link](#link)
  - [参数](#参数)
    - [--dir \<dir>, -C](#--dir-dir--C)
    - [pnpm link \<dir>](#pnpm-link-dir)
    - [pnpm link --global](#pnpm-link---global)
    - [pnpm link --global \<pkg>](#pnpm-link---global-pkg)
- [unlink](#unlink)
  - [参数](#参数)
    - [--recursive, -r\[\]](#--recursive--r)
    - [--filter \<package\_selector>](#--filter-package_selector)
- [和 npm link 的区别](#和-npm-link-的区别)

# link

别名： `ln`

让当前目录下的软件包在系统范围内或其它位置都可访问

```纯文本 
pnpm link <dir>
pnpm link --global
pnpm link --global <pkg>
```


## 参数

### --dir \<dir>, -C

- **默认值**：当前工作目录
- **类型**：路径（字符串）

将链接的目标位置修改为 `<dir>`。

### `pnpm link <dir>`

将 `<dir>` **目录下的软件包**链接到**当前目录下**的 node\_modules 目录下，或者通过 `--dir` 参数指定的目录下。

### `pnpm link --global`

将当前工作目录或通过 `--dir` 参数指定的目录下的软件包**链接到全局环境下**的 `node_modules` 目录下，这样，该软件包就可以被其他软件包通过 `pnpm link --global <pkg>` 的方式引用了。

### `pnpm link --global <pkg>`

将**全局环境下**的 `node_modules` 目录中的指定的软件包（`<pkg>`）**链接到当前工作目录下**（或通过 `--dir` 参数指定的目录下）的 `node_nodules` 目录下。

# unlink

断开某个软件包在**全局范围内的**链接（与 [pnpm link](https://www.pnpm.cn/cli/link "pnpm link") 命令的功能相反）。

如果不指定参数的话，所有已经链接的依赖项都将被切断链接。

此命令与 `yarn unlink` 类似，但 pnpm **会在删除外部链接后重新安装**此依赖项。

## 参数

### --recursive, -r\[]

断开子**目录下的每个软件包中的**链接；如果在 [workspace](https://www.pnpm.cn/workspaces "workspace") 中执行此命令的话，将断开每个 wrokspace 下的软件包中的链接。

### --filter \<package\_selector>

[有关 filter 的更多内容。](https://www.pnpm.cn/filtering "有关 filter 的更多内容。")

# 和 npm link 的区别

1. npm link 需要一个bin 配置；可执行的命令； pnpm link 不需要
2. pnpm link —global 然后在全局去查；是查不到的；当你在另一个包里去使用了 pnpm link pkg —global;然后再去查；就找到了
3. 没有pnpm list -g 或者 —global : 找全局好像只有 npm list -g
