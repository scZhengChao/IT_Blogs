# npm owner

## 目录

- [npm owner add](#npm-owner-add)
- [npm owner ls](#npm-owner-ls)

# npm owner add

这个命令是用于将用户添加为 npm 包的拥有者(owner)。

用法：

```bash 
npm owner add <user> [<@scope>/]<pkg>
```


参数说明：

- `<user>`: 要添加为拥有者的 npm 用户名
- `[<@scope>/]<pkg>`: 包名，可以包含作用域(scope)

示例：

```bash 
npm owner add username package-name
npm owner add username @scope/package-name
```


这个命令需要你有当前包的发布权限才能执行。添加成功后，指定的用户将能够发布该包的新版本和管理包的其他拥有者。

# npm owner ls

```markdown 
# 查看包的所有者
npm owner ls @xxxx/xxxx-xxx

```
