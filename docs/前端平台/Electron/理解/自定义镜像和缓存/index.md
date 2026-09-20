# 自定义镜像和缓存

## 目录

- [镜像](#镜像)
- [缓存](#缓存)

在安装过程中，`electron`模块将调用[@electron/get](https://github.com/electron/get "@electron/get")来**下载适合你平台的 Electron 预构建二进制文件**。它将通过联系 GitHub 的发布下载页面（`https://github.com/electron/electron/releases/tag/v$VERSION`，其中`$VERSION`是 Electron 的确切版本）来完成此操作。

如果你无法访问 `GitHub` 或者需要提供自定义构建，则可以**通过提供镜像或现有缓存目录来实现**。

#### 镜像

你可以使用环境变量来覆盖基本 `URL`、查找 `Electron` 二进制文件的路径以及二进制文件名。`@electron/get`使用的 URL 组成如下：

```python 
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```


以使用中国 CDN 镜像为例：

```bash 
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
```


默认情况下，`ELECTRON_CUSTOM_DIR`设置为`v$VERSION`。要更改格式，请使用`{{ version }}`占位符。例如，`version-{{ version }}`解析为`version-5.0.0`，`{{ version }}`解析为`5.0.0`，`v{{ version }}`相当于默认值。举个更具体的例子，使用中国非 CDN 镜像：

```bash 
ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"


```


上述配置将从`https://npmmirror.com/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`等 URL 下载。

如果你的镜像提供的工件具有与官方 Electron 版本不同的校验和，你可能必须直接设置`electron_use_remote_checksums=1`，或在`.npmrc`文件中配置它，以强制 Electron 使用远程`SHASUMS256.txt`文件而不是嵌入的校验和来验证校验和。

#### 缓存

或者，你可以覆盖本地缓存。`@electron/get`会将**下载的二进制文件缓存在本地目录中，以免给你的网络带来压力**。你可以使用该缓存文件夹来提供 `Electron` 的**自定义构建或完全避免与网络进行联系**。

- Linux：`$XDG_CACHE_HOME`或`~/.cache/electron/`
- 苹果系统：`~/Library/Caches/electron/`
- Windows：`$LOCALAPPDATA/electron/Cache`或`~/AppData/Local/electron/Cache/`

在使用旧版本 Electron 的环境中，你可能会发现缓存也在`~/.electron`中。

你还可以通过提供`electron_config_cache`**环境变量来覆盖本地缓存位置。**

缓存**包含该版本的官方 zip 文件以及校验和**，并存储为`[checksum]/[filename]`。**典型的缓存可能如下所示：**

```text 
├── a91b089b5dc5b1279966511344b805ec84869b6cd60af44f800b363bba25b915
│   └── electron-v15.3.1-darwin-x64.zip


```
