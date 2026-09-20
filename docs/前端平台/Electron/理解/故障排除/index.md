# 故障排除

一些用户在运行`npm install electron`时，偶尔会遇到安装错误。

在几乎所有情况下，这些错误都是网络问题造成的，而不是`electron`npm 包的实际问题。诸如`ELIFECYCLE`、`EAI_AGAIN`、`ECONNRESET`和`ETIMEDOUT`之类的错误**都表明此类网络问题**。最好的解决办法是尝试切换网络，或者稍等一下，然后再次尝试安装。

如果通过`npm`安装失败，你还可以尝试直接从[electron/electron/releases](https://github.com/electron/electron/releases "electron/electron/releases")下载 Electron。

如果安装失败并出现`EACCESS`错误，你可能需要[修复你的 npm 权限](https://npm.nodejs.cn/getting-started/fixing-npm-permissions "修复你的 npm 权限")。

如果上述错误仍然存在，则可能需要将[unsafe-perm](https://npm.nodejs.cn/misc/config#unsafe-perm "unsafe-perm")标志设置为 true：

```markdown 
sudo npm install electron --unsafe-perm=true


```


在较慢的网络上，建议使用`--verbose`标志来显示下载进度：

```bash 
npm install --verbose electron


```


如果你需要**强制重新下载资源**和 `SHASUM` 文件，请将`force_no_cache`**环境变量设置为**`true`。
