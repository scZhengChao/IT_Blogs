# workspace协议

## 目录

- [link-workspace-packages](#link-workspace-packages)
- [通过别名引用工作空间包](#通过别名引用工作空间包)
- [通过相对路径引用工作空间包](#通过相对路径引用工作空间包)
- [发布工作空间包](#发布工作空间包)

### link-workspace-packages

- 默认值：**false**
- 类型：**true**、**false**、**deep**

启用该选项后，本地可用的软件包将被链接到`node_modules`中而不是从注册源下载。 这在 monorepo 中非常方便。 如果你需要本地包也链接到子依赖项，可以使用`deep`设置。

否则，软件包将全部从注册源下载并安装。 然而，工作空间包仍然可以通过使用`workspace:`范围协议进行链接。

如果[link-workspace-packages](https://www.pnpm.cn/npmrc#link-workspace-packages "link-workspace-packages")设置为`true`，则 `pnpm` 将在**可用包与声明的范围匹配时链接工作区中的包**。 例如，如果`bar`在其依赖项中具有`"foo": "^1.0.0"`并且`foo@1.0.0`在工作区中，则`foo@1.0.0`会链接到`bar`。 但是，如果`bar`的依赖项中有`"foo": "2.0.0"`，而工作区中没有`foo@2.0.0`，则会从源中安装`foo@2.0.0`。 这种行为带来了一些不确定性。

幸运的是， pnpm 支持`workspace:`协议。 当使用此协议时，**pnpm 将拒绝解析除本地工作空间所包含包之外的任何内容**。 因此，如果设置`"foo": "workspace:2.0.0"`，那么此时 安装将失败，因为工作空间中不存在`"foo@2.0.0"`。

当[link-workspace-packages](https://www.pnpm.cn/npmrc#link-workspace-packages "link-workspace-packages")选项被设置为`false`时，这个协议特别有用。 在这种情况下 \*\*，如果使用`workspace:`\*\***协议，pnpm 将仅链接来自工作区的包。**

### 通过别名引用工作空间包

假设你在 `workspace` 中有一个名为`foo`的包， 通常，你会将其引用为`"foo"："workspace:*"`。

如果你想使用不同的别名，以下语法也将起作用：`"bar": "workspace:foo@*"`。

在发布之前，别名被转换为常规名称。 上述示例将变成：`"bar": "npm:foo@1.0.0"`。

### 通过相对路径引用工作空间包

假如工作空间中有 2 个包：

```markdown 
+ packages
  + foo
  + bar
```


`bar`的依赖项中可能有`foo`，声明为`"foo": "workspace:../foo"`。 在发布之前，这些将转换为所有包管理器支持的常规版本规范。

### 发布工作空间包

**当一个工作空间包被打包为归档** ( 无论是通过`pnpm pack`还是一个发布命令如`pnpm publish`) 时，我们动态地 替换任何 "workspace:\` 依赖为：

- 目标工作空间中的对应版本（如果使用`workspace:*`、`workspace:~`或`workspace:^`）
- 相关的语义化版本范围（对于任何其他范围类型）

如此例，如果我们在工作空间中有`foo`，`bar`，`qar`，`zoo ' ，它们都是版本`1.5.0\`，如下所示 :

```json 
{
  "dependencies": {
    "foo": "workspace:*",
    "bar": "workspace:~",
    "qar": "workspace:^",
    "zoo": "workspace:^1.5.0"
  }
}
```


将会被转化为：

```json 
{
  "dependencies": {
    "foo": "1.5.0",
    "bar": "~1.5.0",
    "qar": "^1.5.0",
    "zoo": "^1.5.0"
  }
}
```


这个功能**允许你发布转化之后的包到远端，并且可以正常使用本地工作空间的包，而不需要其它中间步骤**。包的使用者也可以像常规的包那样正常使用，且仍然可以受益于语义化版本。

- `~` 会匹配最近的小版本依赖包，保持前两位不变，后续找最新；比如 \~1.2.3 会匹配所有 1.2.x 版本，但是不包括 1.3.0
- `^` 会匹配最新的大版本依赖包，约束主版本，后续找最新；比如 ^1.2.3 会匹配所有 1.x.x 的包，包括 1.3.0，但是不包括 2.0.0
- `*` 安装最新版本的依赖包，比如 \*1.2.3 会匹配 x.x.x，
- `指定特定的版本号`，直接写1.2.3，前面**什么前缀都没有**，这样固然没问题，但是如果依赖包发布新版本修复了一些小bug，那么需要手动修改package.json文件；`~` 和 `^` 则可以解决这个问题。
