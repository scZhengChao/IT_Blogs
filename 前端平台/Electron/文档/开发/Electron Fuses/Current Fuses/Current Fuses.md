# Current Fuses

## 目录

- [runAsNode](#runAsNode)
- [cookieEncryption](#cookieEncryption)
- [nodeOptions](#nodeOptions)
- [nodeCliInspect](#nodeCliInspect)
- [embeddedAsarIntegrityValidation](#embeddedAsarIntegrityValidation)
- [onlyLoadAppFromAsar](#onlyLoadAppFromAsar)
- [loadBrowserProcessSpecificV8Snapshot](#loadBrowserProcessSpecificV8Snapshot)
- [grantFileProtocolExtraPrivileges](#grantFileProtocolExtraPrivileges)

### `runAsNode`

**默认值：** 已启用 **@electron/fuses:** `FuseV1Options.RunAsNode`

runAsNode保险丝切换是否遵守ELECTRON\_RUN\_AS\_NODE环境变量。请注意，如果此保险丝被禁用，则主进程中的process.fork将无法按预期运行，因为它取决于此环境变量的运行。相反，我们建议您使用实用程序进程，它适用于许多需要独立Node.js进程的用例（如Sqlite服务器进程或类似场景）。

### `cookieEncryption`

**默认值：** 已禁用 **@electron/fuses:** `FuseV1Options.EnableCookieEncryption`

cookieEncryption保险丝切换磁盘上的cookie存储是否使用操作系统级别的加密密钥进行加密。默认情况下，Chromium用于存储cookie的sqlite数据库以明文形式存储值。如果你想确保你的应用程序cookie以Chrome相同的方式加密，那么你应该启用这个保险丝。请注意，这是一个单向转换，如果您启用此保险丝，现有的未加密cookie将在写入时加密，但如果您再次禁用保险丝，您的cookie存储将有效地损坏和无用。大多数应用程序都可以安全地启用此保险丝。

### `nodeOptions`

**默认值：** 已启用 **@electron/fuses:** `FuseV1Options.EnableNodeOptionsEnvironmentVariable`

nodeOptions保险丝用于切换是否尊重NODE\_OPTIONS和NODE\_EXTRA\_CA\_CERTS环境变量。NODE\_OPTIONS环境变量可用于将各种自定义选项传递到NODE.js运行时，通常不由生产中的应用程序使用。大多数应用程序都可以安全地禁用此保险丝。

### `nodeCliInspect`

**默认值：** 已启用 **@electron/fuses:** `FuseV1Options.EnableNodeCliInspectArguments`

nodeCliInspect保险丝切换是否遵守--inspect、--inspect-brk等标志。当被禁用时，它还确保SIGUSR1信号不会初始化主过程检查器。大多数应用程序都可以安全地禁用此保险丝。

### `embeddedAsarIntegrityValidation`

**默认值：** 已禁用 **@electron/fuses:** `FuseV1Options.EnableEmbeddedAsarIntegrityValidation`

embeddedAsarIntegrityValidation保险丝切换macOS上的一个实验功能，该功能在加载app.asar文件时验证其内容。此功能旨在将性能影响降至最低，但可能会略微降低从app.asar存档内部读取文件的速度。
有关如何使用asar完整性验证的更多信息，请阅读asar完整性文档。

### `onlyLoadAppFromAsar`

**默认值：** 已禁用 **@electron/fuses:** `FuseV1Options.OnlyLoadAppFromAsar`

唯一的`LoadAppFromAsar`保险丝会更改`Electron`用于定位应用程序代码的搜索系统。默认情况下，Electron将按以下顺序搜索app.asar->app-app->default\_app.asar。启用此保险丝后，搜索顺序将变为单个条目app.asar，从而确保与embeddedAsarIntegrityValidation保险丝组合时，无法加载未验证的代码。

### `loadBrowserProcessSpecificV8Snapshot`

**默认值：** 已禁用 **@electron/fuses:** `FuseV1Options.LoadBrowserProcessSpecificV8Snapshot`

loadBrowserProcessSpecificV8Snapshot融合会更改浏览器进程使用的V8快照文件。默认情况下，Electron的进程都将使用相同的V8快照文件。启用此fuse后，浏览器进程将使用名为browser\_v8\_context\_snapshot.bin的文件作为其v8快照。其他进程将使用它们通常使用的V8快照文件。

### `grantFileProtocolExtraPrivileges`

**默认值：** 已启用 **@electron/fuses:** `FuseV1Options.GrantFileProtocolExtraPrivileges`

grantFileProtocolExtraPrivileges融合会更改从file://协议加载的页面是否被授予超出传统web浏览器中权限的权限。这种行为是Electron原始版本中Electron应用程序的核心，但不再需要，因为应用程序现在应该从自定义协议提供本地文件。如果您不提供file://中的页面，则应该禁用此保险丝。

此熔断器授予文件：//协议的额外权限未完整记录如下：

- `file://` protocol pages can use `fetch` to load other assets over `file://`
- `file://` protocol pages can use service workers
- `file://` protocol pages have universal access granted to child frames also running on `file://` protocols regardless of sandbox settings
