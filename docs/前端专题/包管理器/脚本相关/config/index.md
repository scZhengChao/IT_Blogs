# config

## 目录

- [port](#port)
- [--force或--legacy-peer-deps](#--force或--legacy-peer-deps)
- [--no-save](#--no-save)
- [--no-optional](#--no-optional)

# port

config 用于设置 scripts 里的脚本在运行时的参数。比如设置 port 为 3001：

```typescript 
"config": {
  "port": "3001"
}
```


在执行脚本时，我们可以通过 npm\_package\_config\_port 这个变量访问到 3001。

```typescript 
console.log(process.env.npm_package_config_port); // 3001
```


# `--force`或`--legacy-peer-deps`

如果错误是由于依赖冲突引起的，可以尝试使用`--force`或`--legacy-peer-deps`选项强制安装：

```bash 
npm install --force
```


或者：

```bash 
npm install --legacy-peer-deps
```


`--legacy-peer-deps`**会忽略 peer dependency 冲突，继续安装。**

# `--no-save`

如果你不想将包添加到`package.json`文件中，可以使用`--no-save`选项：

```bash 
npm install <package-name> --no-save
```


这样**即使安装过程中出现错误，** 包也会被安装到`node_modules`目录中。

# --no-optional

如果错误是由于可选依赖引起的，可以跳过可选依赖的安装：

```bash 
npm install --no-optional
```
